import frappe
from frappe.model.document import Document
from frappe.utils import random_string

class PSMemberRegistration(Document):
    def on_update(self):
        if self.status == "Approved" and not self.verified:
            self.create_member_and_user()

    def create_member_and_user(self):
        # 1. Create User
        if not frappe.db.exists("User", self.email_address):
            user = frappe.get_doc({
                "doctype": "User",
                "email": self.email_address,
                "first_name": self.first_name,
                "middle_name": self.middle_name,
                "last_name": self.surname,
                "enabled": 1,
                "send_welcome_email": 1,
                "user_type": "Website User"
            })
            # Generate a random password if not provided
            user.new_password = random_string(10)
            user.insert(ignore_permissions=True)
            
            # Assign Role
            user.add_roles("PuSMAG Member")
        
        # 2. Create PS Member
        if not frappe.db.exists("PS Member", {"email_address": self.email_address}):
            member = frappe.get_doc({
                "doctype": "PS Member",
                "title": self.title,
                "first_name": self.first_name,
                "middle_name": self.middle_name,
                "surname": self.surname,
                "gender": self.gender,
                "date_of_birth": self.date_of_birth,
                "ghanacard_number": self.ghanacard_number,
                "mobile_number": self.mobile_number,
                "email_address": self.email_address,
                "photo": self.photo,
                "institution": self.institution,
                "designation": self.designation,
                "region": self.region,
                "skills": self.skills
            })
            member.insert(ignore_permissions=True)
            
            # Copy professional memberships
            for row in self.professional_memberships:
                member.append("professional_memberships", {
                    "profession": row.profession,
                    "professional_body": row.professional_body,
                    "membership_number": row.membership_number
                })
            member.save(ignore_permissions=True)

        # 3. Mark as verified to avoid re-triggering
        self.db_set("verified", 1)
        frappe.db.commit()

@frappe.whitelist()
def approve_registration(registration_name):
    # Check if user has PuSMAG Admin role
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    doc = frappe.get_doc("PS Member Registration", registration_name)
    doc.status = "Approved"
    doc.save(ignore_permissions=True)
    return {"status": "success"}

@frappe.whitelist()
def reject_registration(registration_name, reason):
    if "PuSMAG Admin" not in frappe.get_roles():
        frappe.throw("Not authorized", frappe.PermissionError)
    
    doc = frappe.get_doc("PS Member Registration", registration_name)
    doc.status = "Rejected"
    doc.rejection_reason = reason
    doc.save(ignore_permissions=True)
    return {"status": "success"}
