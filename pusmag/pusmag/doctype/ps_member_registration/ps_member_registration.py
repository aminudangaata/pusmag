import frappe
from frappe.model.document import Document
from frappe.utils import random_string
from frappe.core.doctype.sms_settings.sms_settings import send_sms

class PSMemberRegistration(Document):
    def on_update(self):
        if self.status == "Approved" and not self.verified:
            self.create_member_and_user()
            
    def validate(self):
        if self.mobile_number:
            self.mobile_number = self.normalize_ghana_number(self.mobile_number)

    def create_member_and_user(self):
        # 1. Create User
        if not frappe.db.exists("User", self.email_address):
            user = frappe.get_doc({
                "doctype": "User",
                "email": self.email_address,
                "first_name": self.first_name,
                "middle_name": self.middle_name,
                "last_name": self.surname,
                "mobile_no": self.mobile_number,
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
    
    def after_insert(self):
        """
        Send registration Email and SMS once after record creation.
        """

        # ---- EMAIL ----
        if not self.email_sent and self.email_address:
            self.send_registration_email()
            self.db_set("email_sent", 1, update_modified=False)

        # ---- SMS ----
        if not self.sms_sent and self.mobile_number:
            self.send_registration_sms()
            self.db_set("sms_sent", 1, update_modified=False)

    # ---------------------------------------------------------------------

    def send_registration_email(self):
        """
        Sends the registration confirmation email
        using the existing HTML template.
        """

        html_message = frappe.render_template(
            "pusmag/templates/emails/member_registration.html",
            {"doc": self}
        )

        frappe.sendmail(
            recipients=[self.email_address],
            subject="Thank you for registering with PuSMAG",
            message=html_message,
            sender="PuSMAG Notification <notification@pusmag.org>"
        )

    # ---------------------------------------------------------------------

    def send_registration_sms(self):
        """
        Sends the registration confirmation SMS.
        """

        sms_message = (
            f"Salaam {self.title} {self.surname},\n"
            "Your application has been received. "
            "We will process your application and reach out to you inshaa Allah"
        )

        # Replace this with your actual SMS gateway function
        send_sms(
            receiver_list=[self.normalize_ghana_number(self.mobile_number)],
            msg=sms_message
        )


def normalize_ghana_number(self, number):
    number = number.strip().replace(" ", "")
    if number.startswith("+233"):
        return number
    if number.startswith("0"):
        return "+233" + number[1:]
    if number.startswith("233"):
        return "+" + number
    return number

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
