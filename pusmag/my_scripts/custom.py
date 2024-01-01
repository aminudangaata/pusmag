from __future__ import unicode_literals
import frappe

@frappe.whitelist()
def approve_membership(doc):
    # Attempt to fetch the document
    membership_doc = frappe.get_doc('PS Member Registration', doc)

    if not membership_doc:
        frappe.msgprint(f"Membership document '{doc}' not found.")
        return

    # Create a new Member document
    member = frappe.new_doc('PS Member')

    # Update fields of the new Member document with values from the Membership document
    member.update({
        'title': membership_doc.title,
        'first_name': membership_doc.first_name,
        'middle_name': membership_doc.middle_name,
        'surname': membership_doc.surname,
        'gender': membership_doc.gender,
        'date_of_birth': membership_doc.date_of_birth,
        'ghanacard_number': membership_doc.ghanacard_number,
        'mobile_number': membership_doc.mobile_number,
        'email_address': membership_doc.email_address,
        'photo': membership_doc.photo,
        'institution': membership_doc.institution,
        'designation': membership_doc.designation,
        'region': membership_doc.region,
        'skills': membership_doc.skills,
        'professional_memberships': membership_doc.professional_memberships
    })

    # Insert the new Member document into the database
    member.insert()

    # Return the name of the newly created Member document
    return member.name
