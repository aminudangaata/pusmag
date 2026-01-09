import frappe

def verify_approval_flow():
    # 1. Create a dummy registration
    email = "test_member@example.com"
    if frappe.db.exists("PS Member Registration", {"email_address": email}):
        frappe.delete_doc("PS Member Registration", frappe.db.get_value("PS Member Registration", {"email_address": email}))
    if frappe.db.exists("User", email):
        frappe.delete_doc("User", email)
    if frappe.db.exists("PS Member", {"email_address": email}):
        frappe.delete_doc("PS Member", frappe.db.get_value("PS Member", {"email_address": email}))

    reg = frappe.get_doc({
        "doctype": "PS Member Registration",
        "title": "Mr.",
        "first_name": "Test",
        "surname": "Member",
        "email_address": email,
        "mobile_number": "0000000000",
        "institution": "Test Inst",
        "designation": "Tester",
        "region": "Greater Accra",
        "gender": "Male",
        "date_of_birth": "1990-01-01"
    }).insert(ignore_permissions=True)
    
    print(f"Created registration: {reg.name}")
    
    # 2. Approve it
    reg.status = "Approved"
    reg.save(ignore_permissions=True)
    frappe.db.commit()
    print("Registration approved.")

    # 3. Verify results
    user_exists = frappe.db.exists("User", email)
    member_exists = frappe.db.exists("PS Member", {"email_address": email})
    
    if user_exists and member_exists:
        user = frappe.get_doc("User", email)
        roles = [r.role for r in user.roles]
        if "PuSMAG Member" in roles:
            print("SUCCESS: User, Member created and Role assigned.")
        else:
            print(f"FAILURE: Role not assigned. Roles: {roles}")
    else:
        print(f"FAILURE: User exists: {user_exists}, Member exists: {member_exists}")

if __name__ == "__main__":
    verify_approval_flow()
