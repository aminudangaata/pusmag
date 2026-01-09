import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_field

def setup_blog_fields():
    fields = [
        {
            "fieldname": "verified",
            "label": "Verified",
            "fieldtype": "Check",
            "insert_after": "post_content",
            "owner": "Administrator"
        },
        {
            "fieldname": "published",
            "label": "Published",
            "fieldtype": "Check",
            "insert_after": "verified",
            "default": "0"
        },
        {
            "fieldname": "rejection_reason",
            "label": "Rejection Reason",
            "fieldtype": "Small Text",
            "insert_after": "published",
            "depends_on": "eval:!doc.verified && doc.status == 'Rejected'"
        }
    ]
    
    for f in fields:
        create_custom_field("PS Blog Post", f)
    
    print("Blog fields setup complete.")

if __name__ == "__main__":
    setup_blog_fields()
