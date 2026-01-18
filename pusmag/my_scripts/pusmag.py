"""
API endpoints for PUSMAG website
All methods are whitelisted for public access via AJAX
"""

from __future__ import unicode_literals
import frappe
from frappe import _
import json

# Homepage APIs

@frappe.whitelist(allow_guest=True)
def get_homepage_slides():
    """Returns slider data for homepage hero section"""
    try:
        slides = frappe.get_all(
            "Image Gallery",
            fields=["title", "button_text", "background_image"],
            filters={
                "parent": "P00001",
                "parenttype": "PuSMAG Asset"
            },
            order_by="idx"
        )
        return slides
    except Exception as e:
        frappe.log_error(f"Error fetching homepage slides: {str(e)}")
        return []

@frappe.whitelist(allow_guest=True)
def get_services():
    """Returns services/features data"""
    try:
        # Return default services for now
        # TODO: Create a doctype for services if needed
        return [
            {
                "title": "Community Building",
                "description": "Fostering unity among Muslim public servants across Ghana",
                "icon": "users"
            },
            {
                "title": "Professional Development",
                "description": "Enhancing skills and career growth opportunities for members",
                "icon": "briefcase"
            },
            {
                "title": "Welfare Support",
                "description": "Supporting members and their families in times of need",
                "icon": "heart"
            },
            {
                "title": "Networking",
                "description": "Building connections across different public service sectors",
                "icon": "users"
            },
            {
                "title": "Islamic Education",
                "description": "Promoting Islamic knowledge and values in public service",
                "icon": "star"
            },
            {
                "title": "Advocacy",
                "description": "Representing Muslim public servants' interests and concerns",
                "icon": "briefcase"
            }
        ]
    except Exception as e:
        frappe.log_error(f"Error fetching services: {str(e)}")
        return []

@frappe.whitelist(allow_guest=True)
def get_statistics():
    """Returns milestone/statistics data"""
    try:
        # Get actual member count
        member_count = frappe.db.count("PS Member")
        
        # Get programme count
        programme_count = frappe.db.count("PS Programme")
        
        # Calculate years of service
        from datetime import datetime
        establishment_year = 2023
        current_year = datetime.now().year
        years_of_service = current_year - establishment_year
        
        return [
            {"label": "Years of Service", "value": years_of_service},
            {"label": "Active Members", "value": member_count or 500},
            {"label": "Programmes", "value": programme_count or 50},
            {"label": "Regions", "value": 16}
        ]
    except Exception as e:
        frappe.log_error(f"Error fetching statistics: {str(e)}")
        # Fallback values
        from datetime import datetime
        years_of_service = datetime.now().year - 2023
        return [
            {"label": "Years of Service", "value": years_of_service},
            {"label": "Active Members", "value": 500},
            {"label": "Programmes", "value": 50},
            {"label": "Regions", "value": 16}
        ]

# Events/Programmes APIs

@frappe.whitelist(allow_guest=True)
def get_events(filters=None):
    """Returns events/programmes list with optional category/date filters"""
    try:
        # Parse filters if provided as JSON string
        if filters and isinstance(filters, str):
            filters = json.loads(filters)
        
        # Build query filters
        query_filters = {"published": 1}
        if filters:
            if filters.get('category'):
                query_filters['category'] = filters['category']
        
        # Fetch programmes from PS Programme Doctype for real data
        programmes = frappe.get_all(
            "PS Programme",
            fields=["name", "title", "start_date", "category", "description", "route", "image"],
            filters=query_filters,
            order_by="start_date asc"
        )
        
        # Format response to match frontend expectation
        result = []
        for prog in programmes:
            result.append({
                "id": prog.route or prog.name,
                "title": prog.title,
                "date": str(prog.start_date) if prog.start_date else "",
                "category": prog.category,
                "description": prog.description,
                "image": prog.image,
                "route": prog.route
            })
            
        return result
    except Exception as e:
        frappe.log_error(f"Error fetching programmes: {str(e)}")
        return []

@frappe.whitelist(allow_guest=True)
def get_event_details(event_id):
    """Returns single programme details"""
    try:
        # Try to get by route first, then by name
        prog = None
        if frappe.db.exists("PS Programme", {"route": event_id}):
            prog = frappe.get_doc("PS Programme", {"route": event_id})
        elif frappe.db.exists("PS Programme", event_id):
            prog = frappe.get_doc("PS Programme", event_id)
        
        if not prog:
            return {}
        
        return {
            "id": prog.route or prog.name,
            "title": prog.title,
            "date": str(prog.start_date) if prog.start_date else "",
            "end_date": str(prog.end_date) if prog.end_date else "",
            "description": prog.description,
            "content": prog.content,
            "category": prog.category,
            "location": prog.location,
            "image": prog.image,
            "route": prog.route
        }
    except Exception as e:
        frappe.log_error(f"Error fetching programme details: {str(e)}")
        return {}

# Blog APIs

@frappe.whitelist(allow_guest=True)
def get_blog_posts(filters=None, limit=20, offset=0):
    """Returns blog posts with pagination and filters"""
    try:
        # Parse filters if provided as JSON string
        if filters and isinstance(filters, str):
            filters = json.loads(filters)
        
        # Build query filters
        query_filters = {"published": 1}
        if filters:
            if filters.get('category'):
                query_filters['post_category'] = filters['category']
            if filters.get('search'):
                query_filters['post_title'] = ['like', f"%{filters['search']}%"]
        
        # Fetch blog posts
        posts = frappe.get_all(
            "PS Blog Post",
            fields=["name", "post_title", "post_category", "post_author", "published_date", "post_image", "route"],
            filters=query_filters,
            order_by="published_date desc",
            limit=limit,
            start=offset
        )
        
        # Format response
        result = []
        for post in posts:
            # Get excerpt from content (first 200 characters)
            try:
                doc = frappe.get_doc("PS Blog Post", post.name)
                # Strip HTML tags for excerpt
                import re
                content_text = re.sub('<[^<]+?>', '', doc.post_content or '')
                excerpt = content_text[:200] + '...' if len(content_text) > 200 else content_text
                author_name = frappe.db.get_value("User", post.post_author, "full_name") or post.post_author
            except:
                excerpt = ""
                author_name = post.post_author
            
            result.append({
                "id": post.route or post.name,
                "title": post.post_title,
                "excerpt": excerpt,
                "category": post.post_category,
                "author": author_name,
                "date": str(post.published_date) if post.published_date else "",
                "image": post.post_image,
                "route": post.route
            })
        
        return result
    except Exception as e:
        frappe.log_error(f"Error fetching blog posts: {str(e)}")
        return []

@frappe.whitelist(allow_guest=True)
def get_blog_post(post_id):
    """Returns single blog post details"""
    try:
        # Try to get by route first, then by name
        # We use frappe.db.get_value to bypass strict permission checks for public content
        post = None
        if frappe.db.exists("PS Blog Post", {"route": post_id}):
            post = frappe.db.get_value("PS Blog Post", {"route": post_id}, ["name", "post_title", "post_content", "post_category", "post_author", "published_date", "post_image", "route"], as_dict=1)
        elif frappe.db.exists("PS Blog Post", post_id):
            post = frappe.db.get_value("PS Blog Post", post_id, ["name", "post_title", "post_content", "post_category", "post_author", "published_date", "post_image", "route"], as_dict=1)
        
        if not post:
            return {}
        
        author_name = frappe.db.get_value("User", post.post_author, "full_name") or post.post_author
        
        return {
            "id": post.route or post.name,
            "title": post.post_title,
            "content": post.post_content,
            "category": post.post_category,
            "author": author_name,
            "date": str(post.published_date) if post.published_date else "",
            "image": post.post_image,
            "route": post.route
        }
    except Exception as e:
        frappe.log_error(f"Error fetching blog post: {str(e)}")
        return {}

@frappe.whitelist(allow_guest=True)
def get_blog_categories():
    """Returns available blog categories"""
    try:
        # Get unique categories from PS Blog Post doctype
        categories = frappe.db.sql("""
            SELECT DISTINCT post_category 
            FROM `tabPS Blog Post` 
            WHERE post_category IS NOT NULL AND post_category != ''
            ORDER BY post_category
        """, as_dict=False)
        
        return [cat[0] for cat in categories] if categories else [
            "General", "Ramadan", "Brotherhood", "Charity", "Business", "Jurisprudence", "News"
        ]
    except Exception as e:
        frappe.log_error(f"Error fetching blog categories: {str(e)}")
        return ["General", "Ramadan", "Brotherhood", "Charity", "Business", "Jurisprudence", "News"]

# Gallery APIs

@frappe.whitelist(allow_guest=True)
def get_gallery_images(filters=None, limit=50, offset=0):
    """Returns gallery images with optional category filter"""
    try:
        # Parse filters if provided as JSON string
        if filters and isinstance(filters, str):
            filters = json.loads(filters)
        
        # Build query filters
        query_filters = {}
        if filters:
            if filters.get('category'):
                query_filters['image_category'] = filters['category']
        
        # Fetch gallery images
        images = frappe.get_all(
            "PS Gallery",
            fields=["name", "image_title", "image_category", "image_link"],
            filters=query_filters,
            order_by="modified desc",
            limit=limit,
            start=offset
        )
        
        # Format response
        result = []
        for img in images:
            result.append({
                "id": img.name,
                "title": img.image_title or "Gallery Image",
                "category": img.image_category,
                "image_url": img.image_link
            })
        
        return result
    except Exception as e:
        frappe.log_error(f"Error fetching gallery images: {str(e)}")
        return []

@frappe.whitelist(allow_guest=True)
def get_gallery_categories():
    """Returns available gallery categories"""
    try:
        # Get unique categories from PS Gallery doctype
        categories = frappe.db.sql("""
            SELECT DISTINCT image_category 
            FROM `tabPS Gallery` 
            WHERE image_category IS NOT NULL AND image_category != ''
            ORDER BY image_category
        """, as_dict=False)
        
        return [cat[0] for cat in categories] if categories else [
            "Inauguration", "Visit", "Meeting", "Event"
        ]
    except Exception as e:
        frappe.log_error(f"Error fetching gallery categories: {str(e)}")
        return ["Inauguration", "Visit", "Meeting", "Event"]

# Contact APIs

@frappe.whitelist(allow_guest=True)
def submit_contact_form(name, email, message):
    """Handles contact form submission"""
    try:
        # Validate inputs
        if not name or not email or not message:
            frappe.throw(_("All fields are required"))

        # TODO: Create a Contact Form doctype or send email
        # For now, just log it
        frappe.logger().info(f"Contact form submission from {name} ({email}): {message}")
        
        # You could also send an email notification
        # frappe.sendmail(
        #     recipients=["info@psmagh.org"],
        #     subject=f"Contact Form: {name}",
        #     message=f"From: {name} ({email})<br><br>{message}"
        # )
        
        return {"success": True, "message": "Thank you for contacting us!"}
    except Exception as e:
        frappe.log_error(f"Error submitting contact form: {str(e)}")
        frappe.throw(_("An error occurred while submitting the form"))

@frappe.whitelist(allow_guest=True)
def get_contact_info():
    """Returns organization contact information"""
    try:
        return {
            "phone": "+(233) 50 175 6250",
            "email": "info@pusmag.org",
            "office_hours": "Monday - Friday: 8am-5pm",
            "address": "Accra, Ghana"
        }
    except Exception as e:
        frappe.log_error(f"Error fetching contact info: {str(e)}")
        return {}

# Registration APIs

@frappe.whitelist(allow_guest=True)
def submit_registration(first_name, surname, email, mobile, institution, designation, region, **kwargs):
    """Handles member registration form submission"""
    try:
        # Validate required fields
        if not all([first_name, surname, email, mobile, institution, designation, region]):
            frappe.throw(_("All required fields must be filled"))

        # Create PS Member Registration document
        doc_data = {
            "doctype": "PS Member Registration",
            "first_name": first_name,
            "surname": surname,
            "email_address": email,
            "mobile_number": mobile,
            "institution": institution,
            "designation": designation,
            "region": region,
            "title": kwargs.get("title", ""),
            "middle_name": kwargs.get("middle_name", ""),
            "gender": kwargs.get("gender", ""),
            "date_of_birth": kwargs.get("date_of_birth", ""),
            "ghanacard_number": kwargs.get("ghanacard_number", ""),
            "skills": kwargs.get("skills", ""),
        }

        # Handle Professional Memberships
        prof_memberships = kwargs.get("professional_memberships")
        if prof_memberships:
            if isinstance(prof_memberships, str):
                try:
                    doc_data["professional_memberships"] = json.loads(prof_memberships)
                except:
                    pass
            else:
                doc_data["professional_memberships"] = prof_memberships

        doc = frappe.get_doc(doc_data)
        doc.insert(ignore_permissions=True)

        # Handle Photo Upload
        photo_data = kwargs.get("photo")
        if photo_data and isinstance(photo_data, dict) and photo_data.get("data") and photo_data.get("filename"):
            from frappe.utils.file_manager import save_file
            try:
                # data should be base64 string
                file_doc = save_file(
                    fname=photo_data["filename"],
                    content=photo_data["data"],
                    dt="PS Member Registration",
                    dn=doc.name,
                    is_private=0,
                    decode=True 
                )
                doc.db_set("photo", file_doc.file_url)
            except Exception as e:
                frappe.log_error(f"Error saving photo for {doc.name}: {str(e)}")

        frappe.db.commit()
        
        return {
            "success": True,
            "message": "Registration submitted successfully! We will contact you soon.",
            "registration_id": doc.name
        }
    except Exception as e:
        frappe.log_error(f"Error submitting registration: {str(e)}")
        frappe.throw(_("An error occurred while processing your registration"))
