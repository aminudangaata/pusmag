import frappe
from frappe.utils import now_datetime, add_to_date
import json
import random
import string

@frappe.whitelist(allow_guest=True)
def send_2fa_code(email):
    # Running as Administrator to bypass guest email sending restrictions
    frappe.set_user("Administrator")
    
    # Resolve user and real email
    user_name = frappe.db.get_value("User", email, "name")
    if not user_name:
        user_name = frappe.db.get_value("User", {"email": email}, "name")
        
    if not user_name:
        frappe.throw("User not found")
        
    real_email = frappe.db.get_value("User", user_name, "email")
    if not real_email:
         frappe.throw("User has no email address configured")
    
    # Check 2FA method from settings
    method = frappe.db.get_single_value("PS Portal Settings", "two_factor_method") or "Email"
    
    # Generate 6-digit code
    code = ''.join(random.choices(string.digits, k=6))
    
    # Store in a temporary cache using the INPUT identifier to match verification step
    frappe.cache().set_value(f"2fa_code_{email}", code, expires_in_sec=600)
    
    if method == "SMS":
        mobile_no = frappe.db.get_value("User", user_name, "mobile_no")
        if not mobile_no:
            frappe.throw("Mobile number not found for this user. Please use Email method or update user profile.")
        
        from frappe.core.doctype.sms_settings.sms_settings import send_sms
        try:
            send_sms(receiver_list=[mobile_no], msg=f"Your PuSMAG Portal verification code is: {code}")
        except Exception as e:
            frappe.log_error(f"SMS Sending Failed: {str(e)}")
            frappe.throw("Failed to send 2FA code via SMS. Please contact administrator.")
    else:
        # Send Email to the REAL email
        frappe.sendmail(
            recipients=real_email,
            subject="Your PuSMAG Portal Verification Code",
            content=f"""
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <p>Your PuSMAG Portal verification code is:</p>
                    <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; color: #0ea5e9;">
                        {code}
                    </div>
                    <p style="font-size: 14px; color: #666;">This code expires in 10 minutes.</p>
                </div>
            """,
            now=True
        )
    
    return {
        "status": "success",
        "method": method,
        "email": real_email, # Return real email for masking
        "mobile_no": mobile_no if method == "SMS" else None
    }

@frappe.whitelist(allow_guest=True)
def verify_2fa_code(email, code):
    if not email or not code:
        frappe.throw("Email and code are required")
        
    cached_code = frappe.cache().get_value(f"2fa_code_{email}")
    
    if not cached_code:
        frappe.throw("Invalid or expired code. Please request a new one.")
        
    if str(code) != str(cached_code):
        frappe.throw("Invalid code. Please try again.")
        
    # Code is valid
    frappe.cache().delete_value(f"2fa_code_{email}")
    
    # Log the user in
    user = frappe.get_doc("User", email)
    frappe.local.login_manager.login_as(user.name)
    
    return {"status": "success", "message": "Logged in successfully"}

@frappe.whitelist(allow_guest=True)
def reset_password(email):
    # Always return success to prevent user enumeration
    try:
        if frappe.db.exists("User", email):
            # Run as Administrator to ensure we can trigger the reset email
            frappe.set_user("Administrator")
            
            user = frappe.get_doc("User", email)
            # Generate the link without sending the default email
            default_link = user.reset_password(send_email=False)
            
            # Replace /update-password with /ps/update-password
            # link = default_link.replace('/update-password', '/ps/update-password')
            
            # Prepare context for the template
            context = {
                "user": user,
                "link": default_link
            }
            
            # Render the custom template
            email_content = frappe.render_template("pusmag/templates/emails/reset_password.html", context)
            
            # Send the email
            frappe.sendmail(
                recipients=email,
                subject="Reset Your Password - PuSMAG",
                content=email_content,
                now=True
            )
            
    except Exception as e:
        # Log error but don't expose it
        frappe.log_error(f"Password Reset Error: {str(e)}")
        
    return {"status": "success", "message": "If an account exists for this email, you will receive password reset instructions shortly."}

@frappe.whitelist()
def get_member_directory(filters=None, limit=12, offset=0):
    roles = frappe.get_roles()
    if "PuSMAG Member" not in roles and "PuSMAG Admin" not in roles:
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
        fields=["name", "first_name", "surname", "email_address", "institution", "designation", "DATE(creation) as creation"],
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
def publish_blog_post(name, verified=None, published=None):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)

    post = frappe.get_doc("PS Blog Post", name)

    if verified is not None:
        post.verified = frappe.utils.cint(verified)
    if published is not None:
        post.published = frappe.utils.cint(published)

    post.save()
    return {"status": "success", "verified": post.verified, "published": post.published}

@frappe.whitelist()
def get_member_details(member_name):
    roles = frappe.get_roles()
    if "PuSMAG Member" not in roles and "PuSMAG Admin" not in roles:
        frappe.throw("Not authorized", frappe.PermissionError)

    member = frappe.get_doc("PS Member", member_name)
    res = member.as_dict()

    viewer = frappe.session.user
    is_admin = "PuSMAG Admin" in roles
    viewer_email = frappe.db.get_value("User", viewer, "email")
    is_self = (member.email_address == viewer_email)

    if is_admin or is_self:
        res["contact_access"] = "self_or_admin"
        return res

    # Determine access state from most recent request
    latest = frappe.db.sql("""
        SELECT name, status, expiry_datetime, modified
        FROM `tabPS Contact Access Request`
        WHERE requester = %s AND member = %s
        ORDER BY requested_datetime DESC
        LIMIT 1
    """, (viewer, member_name), as_dict=True)

    contact_access = "none"
    if latest:
        req = latest[0]
        now = now_datetime()
        if req.status == "Approved":
            if req.expiry_datetime and now < req.expiry_datetime:
                contact_access = "approved"
            # else expired → "none"
        elif req.status == "Pending":
            contact_access = "pending"
        elif req.status == "Rejected":
            cooldown_until = add_to_date(req.modified, days=1)
            contact_access = "rejected_cooldown" if now < cooldown_until else "rejected"

    res["contact_access"] = contact_access

    # Strip private contact fields unless access is granted
    if contact_access != "approved":
        res.pop("email_address", None)
        res.pop("mobile_number", None)

    return res

@frappe.whitelist(allow_guest=True)
def get_user_info():
    # Return minimal info for guest users to avoid 403 error on page refresh
    # and provide CSRF token for POST requests
    if frappe.session.user == "Guest":
        return {
            "session_user": "Guest",
            "csrf_token": frappe.sessions.get_csrf_token()
        }
    
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
        "user_image": user.user_image,
        "csrf_token": frappe.sessions.get_csrf_token()
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

# ── Contact Access Request flow ────────────────────────────────────────────────

@frappe.whitelist()
def request_contact_access(member_name):
    roles = frappe.get_roles()
    if "PuSMAG Member" not in roles:
        frappe.throw("Not authorized", frappe.PermissionError)
    if "PuSMAG Admin" in roles:
        frappe.throw("Admins can view contact info directly")

    viewer = frappe.session.user
    viewer_email = frappe.db.get_value("User", viewer, "email")
    member = frappe.get_doc("PS Member", member_name)

    if member.email_address == viewer_email:
        frappe.throw("You cannot request access to your own contact info")

    now = now_datetime()

    latest = frappe.db.sql("""
        SELECT name, status, expiry_datetime, modified
        FROM `tabPS Contact Access Request`
        WHERE requester = %s AND member = %s
        ORDER BY requested_datetime DESC
        LIMIT 1
    """, (viewer, member_name), as_dict=True)

    if latest:
        req = latest[0]
        if req.status == "Approved" and req.expiry_datetime and now < req.expiry_datetime:
            return {"status": "already_approved"}
        if req.status == "Pending":
            return {"status": "already_pending"}
        if req.status == "Rejected":
            cooldown_until = add_to_date(req.modified, days=1)
            if now < cooldown_until:
                return {"status": "cooldown", "cooldown_until": str(cooldown_until)}

    member_owner = frappe.db.get_value("User", {"email": member.email_address}, "name")
    if not member_owner:
        frappe.throw("This member has no linked user account")

    req_doc = frappe.new_doc("PS Contact Access Request")
    req_doc.requester = viewer
    req_doc.member = member_name
    req_doc.member_owner = member_owner
    req_doc.status = "Pending"
    req_doc.requested_datetime = now
    req_doc.save(ignore_permissions=True)

    _notify_contact_request(member_owner, viewer, member)

    return {"status": "requested"}


@frappe.whitelist()
def get_contact_access_requests():
    user = frappe.session.user
    user_email = frappe.db.get_value("User", user, "email")
    member_name = frappe.db.get_value("PS Member", {"email_address": user_email}, "name")
    if not member_name:
        return []

    requests = frappe.get_all(
        "PS Contact Access Request",
        fields=["name", "requester", "status", "requested_datetime"],
        filters={"member": member_name, "status": "Pending"},
        order_by="requested_datetime desc"
    )

    for req in requests:
        req.requester_name = frappe.db.get_value("User", req.requester, "full_name") or req.requester

    return requests


@frappe.whitelist()
def respond_to_contact_request(request_name, action, reason=None):
    req = frappe.get_doc("PS Contact Access Request", request_name)

    user = frappe.session.user
    user_email = frappe.db.get_value("User", user, "email")
    member = frappe.get_doc("PS Member", req.member)

    if member.email_address != user_email:
        frappe.throw("Not authorized to respond to this request", frappe.PermissionError)

    if action == "approve":
        expiry_days = frappe.utils.cint(
            frappe.db.get_single_value("PS Portal Settings", "contact_access_expiry_days") or 7
        )
        req.status = "Approved"
        req.expiry_datetime = add_to_date(now_datetime(), days=expiry_days)
    elif action == "reject":
        req.status = "Rejected"
        req.rejection_reason = reason or ""
    else:
        frappe.throw("Invalid action")

    req.save(ignore_permissions=True)
    _notify_contact_response(req.requester, action, member, req)

    return {"status": "success"}


def _notify_contact_request(member_owner, requester, member):
    method = frappe.db.get_single_value("PS Portal Settings", "two_factor_method") or "Email"
    requester_name = frappe.db.get_value("User", requester, "full_name") or requester
    member_full_name = f"{member.first_name} {member.surname}"

    msg = f"{requester_name} has requested access to your contact information on the PuSMAG Portal. Log in to approve or decline."

    try:
        if method == "SMS":
            mobile = frappe.db.get_value("User", member_owner, "mobile_no")
            if mobile:
                from frappe.core.doctype.sms_settings.sms_settings import send_sms
                send_sms([mobile], msg)
        else:
            owner_email = frappe.db.get_value("User", member_owner, "email")
            frappe.sendmail(
                recipients=owner_email,
                subject="Contact Info Access Request – PuSMAG Portal",
                content=f"""
                    <div style="font-family:sans-serif;padding:20px;color:#333;">
                        <p>Hello {member_full_name},</p>
                        <p><strong>{requester_name}</strong> has requested access to your contact information on the PuSMAG Portal.</p>
                        <p>Log in to your portal to approve or decline this request.</p>
                        <p style="font-size:12px;color:#888;margin-top:24px;">PuSMAG Portal &mdash; Contact Access System</p>
                    </div>
                """,
                now=True
            )
    except Exception as e:
        frappe.log_error(f"Contact request notification failed: {str(e)}")


def _notify_contact_response(requester, action, member, req):
    method = frappe.db.get_single_value("PS Portal Settings", "two_factor_method") or "Email"
    requester_user = frappe.get_doc("User", requester)
    member_full_name = f"{member.first_name} {member.surname}"

    if action == "approve":
        expiry_str = frappe.utils.format_datetime(req.expiry_datetime, "MMMM d, yyyy")
        subject = f"Contact Access Approved – {member_full_name}"
        body = f"Your request to view {member_full_name}'s contact information has been approved. Access expires on {expiry_str}."
        html_body = f"""
            <div style="font-family:sans-serif;padding:20px;color:#333;">
                <p>Hello {requester_user.full_name},</p>
                <p>Your request to view <strong>{member_full_name}</strong>'s contact information has been <strong style="color:#16a34a;">approved</strong>.</p>
                <p>Access expires on <strong>{expiry_str}</strong>. After that you will need to request access again.</p>
                <p style="font-size:12px;color:#888;margin-top:24px;">PuSMAG Portal &mdash; Contact Access System</p>
            </div>
        """
    else:
        reason_line = f"<p>Reason: {req.rejection_reason}</p>" if req.rejection_reason else ""
        subject = f"Contact Access Request Declined – {member_full_name}"
        body = f"Your request to view {member_full_name}'s contact information was not approved.{' Reason: ' + req.rejection_reason if req.rejection_reason else ''}"
        html_body = f"""
            <div style="font-family:sans-serif;padding:20px;color:#333;">
                <p>Hello {requester_user.full_name},</p>
                <p>Your request to view <strong>{member_full_name}</strong>'s contact information was <strong style="color:#dc2626;">not approved</strong>.</p>
                {reason_line}
                <p style="font-size:12px;color:#888;margin-top:24px;">PuSMAG Portal &mdash; Contact Access System</p>
            </div>
        """

    try:
        if method == "SMS":
            if requester_user.mobile_no:
                from frappe.core.doctype.sms_settings.sms_settings import send_sms
                send_sms([requester_user.mobile_no], body)
        else:
            frappe.sendmail(
                recipients=requester_user.email,
                subject=f"PuSMAG Portal – {subject}",
                content=html_body,
                now=True
            )
    except Exception as e:
        frappe.log_error(f"Contact response notification failed: {str(e)}")
