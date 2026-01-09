import frappe
from frappe.utils import now_datetime, add_to_date
import json
import random
import string

@frappe.whitelist(allow_guest=True)
def send_2fa_code(email):
    # Running as Administrator to bypass guest email sending restrictions
    frappe.set_user("Administrator")
    
    if not frappe.db.exists("User", email):
        frappe.throw("User not found")
    
    # Check 2FA method from settings
    method = frappe.db.get_single_value("PS Portal Settings", "two_factor_method") or "Email"
    
    # Generate 6-digit code
    code = ''.join(random.choices(string.digits, k=6))
    
    # Store in a temporary cache
    frappe.cache().set_value(f"2fa_code_{email}", code, expires_in_sec=600)
    
    if method == "SMS":
        mobile_no = frappe.db.get_value("User", email, "mobile_no")
        if not mobile_no:
            frappe.throw("Mobile number not found for this user. Please use Email method or update user profile.")
        
        from frappe.core.doctype.sms_settings.sms_settings import send_sms
        try:
            send_sms(receiver_list=[mobile_no], msg=f"Your PuSMAG Portal verification code is: {code}")
        except Exception as e:
            frappe.log_error(f"SMS Sending Failed: {str(e)}")
            frappe.throw("Failed to send 2FA code via SMS. Please contact administrator.")
    else:
        # Send Email
        frappe.sendmail(
            recipients=email,
            subject="Your PuSMAG Portal Verification Code",
            content=f"Your verification code is: {code}. It expires in 10 minutes.",
            now=True
        )
    
    # return {"status": "success", "message": f"Code sent via {method}"}
    return {
        "status": "success",
        "method": method,
        "email": email,
        "mobile_no": mobile_no if method == "SMS" else None
    }

@frappe.whitelist(allow_guest=True)
def verify_2fa_code(email, code):
    stored_code = frappe.cache().get_value(f"2fa_code_{email}")
    if stored_code and str(stored_code) == str(code):
        frappe.cache().delete_value(f"2fa_code_{email}")
        return {"status": "success"}
    else:
        frappe.throw("Invalid or expired code")

@frappe.whitelist()
def get_member_directory(filters=None, limit=12, offset=0):
    if "PuSMAG Member" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    query_filters = {}
    or_query_filters = []
    
    if filters:
        if isinstance(filters, str):
            filters = json.loads(filters)
        
        if "search" in filters:
            search_str = filters.pop("search")
            if search_str:
                or_query_filters = [
                    ["first_name", "like", f"%{search_str}%"],
                    ["middle_name", "like", f"%{search_str}%"],
                    ["surname", "like", f"%{search_str}%"],
                    ["institution", "like", f"%{search_str}%"],
                    ["designation", "like", f"%{search_str}%"],
                    ["email_address", "like", f"%{search_str}%"]
                ]
        
        query_filters.update(filters)
    
    members = frappe.get_all("PS Member",
        fields=["name", "first_name", "middle_name", "surname", "photo", "designation", "institution", "region"],
        filters=query_filters,
        or_filters=or_query_filters,
        limit_start=offset,
        limit_page_length=limit,
        order_by="creation desc"
    )
    
    # frappe.db.count doesn't support or_filters, so we use get_all to get names for counting
    if or_query_filters:
        total = len(frappe.get_all("PS Member", filters=query_filters, or_filters=or_query_filters, pluck="name"))
    else:
        total = frappe.db.count("PS Member", query_filters)
    
    return {
        "members": members,
        "total": total
    }

@frappe.whitelist()
def get_pending_registrations():
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    return frappe.get_all("PS Member Registration",
        fields=["name", "first_name", "surname", "email_address", "institution", "designation", "creation"],
        filters={"status": ""},
        order_by="creation desc"
    )

@frappe.whitelist()
def get_user_blog_posts(search=None):
    user = frappe.session.user
    roles = frappe.get_roles()
    
    filters = {}
    if "PuSMAG Admin" not in roles:
        if "PuSMAG Blogger" in roles:
            filters["post_author"] = user
        else:
            frappe.throw("Not authorized", frappe.PermissionError)
    
    if search:
        filters["post_title"] = ["like", f"%{search}%"]
        
    posts = frappe.get_all("PS Blog Post", fields=["*"], filters=filters, order_by="creation desc")
    
    # Add full name for each author
    for post in posts:
        post.author_name = frappe.db.get_value("User", post.post_author, "full_name") or post.post_author
        
    return posts

@frappe.whitelist()
def get_blog_post_details(post_id):
    if not frappe.db.exists("PS Blog Post", post_id):
        frappe.throw("Blog post not found")
    
    post = frappe.get_doc("PS Blog Post", post_id)
    # Check permissions if not admin
    if "PuSMAG Admin" not in frappe.get_roles() and post.post_author != frappe.session.user:
         frappe.throw("Not authorized to view this post", frappe.PermissionError)
    
    res = post.as_dict()
    res['author_name'] = frappe.db.get_value("User", post.post_author, "full_name") or post.post_author
    return res

@frappe.whitelist()
def save_blog_post(post_data):
    if isinstance(post_data, str):
        post_data = json.loads(post_data)
        
    name = post_data.get("name")
    
    if name:
        # Update
        post = frappe.get_doc("PS Blog Post", name)
        if "PuSMAG Admin" not in frappe.get_roles() and post.post_author != frappe.session.user:
            frappe.throw("Not authorized to edit this post", frappe.PermissionError)
            
        post.update(post_data)
        post.save()
    else:
        # Create
        post = frappe.new_doc("PS Blog Post")
        post.update(post_data)
        post.post_author = frappe.session.user
        post.published_date = now_datetime().date()
        post.save()
        
    return post.name

@frappe.whitelist()
def delete_blog_post(name):
    post = frappe.get_doc("PS Blog Post", name)
    roles = frappe.get_roles()
    
    if "PuSMAG Admin" in roles:
        # Admins can always delete permanently
        frappe.delete_doc("PS Blog Post", name)
        return {"status": "deleted", "message": "Post permanently deleted"}
    
    if "PuSMAG Blogger" in roles and post.post_author == frappe.session.user:
        # Bloggers request deletion
        post.delete_requested = 1
        post.save()
        return {"status": "requested", "message": "Deletion request sent to administrator"}
        
    frappe.throw("Not authorized to delete this post", frappe.PermissionError)

@frappe.whitelist()
def cancel_delete_request(name):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
        
    post = frappe.get_doc("PS Blog Post", name)
    post.delete_requested = 0
    post.save()
    return {"status": "success", "message": "Deletion request cancelled"}

@frappe.whitelist()
def get_member_details(member_name):
    if "PuSMAG Member" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
        
    member = frappe.get_doc("PS Member", member_name)
    return member

@frappe.whitelist()
def get_user_info():
    user = frappe.get_doc("User", frappe.session.user)
    roles = frappe.get_roles()
    
    # Try to find associated PS Member
    member = frappe.db.get_value("PS Member", {"email_address": user.email}, ["name", "photo"], as_dict=1)
    
    return {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "roles": roles,
        "member_name": member.name if member else None,
        "photo": member.photo if member else None,
        "user_image": user.user_image
    }

@frappe.whitelist()
def get_portal_stats():
    user = frappe.session.user
    
    total_members = frappe.db.count("PS Member")
    active_programmes = frappe.db.count("PS Programme", {"published": 1})
    
    your_posts = 0
    roles = frappe.get_roles()
    if "PuSMAG Blogger" in roles or "PuSMAG Admin" in roles:
        filters = {}
        if "PuSMAG Admin" not in roles:
            filters["post_author"] = user
        your_posts = frappe.db.count("PS Blog Post", filters)
        
    return {
        "total_members": total_members,
        "active_programmes": active_programmes,
        "your_posts": your_posts
    }
@frappe.whitelist()
def get_portal_programmes():
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    return frappe.get_all("PS Programme", fields=["*"], order_by="start_date desc")

@frappe.whitelist()
def save_programme(programme_data):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
        
    if isinstance(programme_data, str):
        programme_data = json.loads(programme_data)
        
    name = programme_data.get("name")
    
    if name:
        doc = frappe.get_doc("PS Programme", name)
        doc.update(programme_data)
        doc.save()
    else:
        doc = frappe.new_doc("PS Programme")
        doc.update(programme_data)
        if not doc.route and doc.title:
            import re
            doc.route = re.sub(r'[^a-zA-Z0-9]', '-', doc.title.lower()).strip('-')
            # Ensure uniqueness
            if frappe.db.exists("PS Programme", {"route": doc.route}):
                doc.route = f"{doc.route}-{random.randint(1000, 9999)}"
        doc.save()
        
    return doc.name

@frappe.whitelist()
def delete_programme(name):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    frappe.delete_doc("PS Programme", name)
    return True

@frappe.whitelist()
def get_portal_gallery():
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    return frappe.get_all("PS Gallery", fields=["*"], order_by="modified desc")

@frappe.whitelist()
def save_gallery_image(image_data):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
        
    if isinstance(image_data, str):
        image_data = json.loads(image_data)
        
    name = image_data.get("name")
    
    if name:
        doc = frappe.get_doc("PS Gallery", name)
        doc.update(image_data)
        doc.save()
    else:
        doc = frappe.new_doc("PS Gallery")
        doc.update(image_data)
        doc.save()
        
    return doc.name

@frappe.whitelist()
def delete_gallery_image(name):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    frappe.delete_doc("PS Gallery", name)
    return True
