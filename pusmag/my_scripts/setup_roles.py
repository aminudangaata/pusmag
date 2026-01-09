import frappe

def setup_roles():
    roles = ["PuSMAG Member", "PuSMAG Blogger", "PuSMAG Admin"]
    for role in roles:
        if not frappe.db.exists("Role", role):
            frappe.get_doc({
                "doctype": "Role",
                "role_name": role,
                "desk_access": 1 if role == "PuSMAG Admin" else 0
            }).insert()
            print(f"Created role: {role}")
    
    # Ensure PS Member Registration has permissions
    # We might need to handle custom permissions via code if we are not using standard desk
    print("Roles setup complete.")

if __name__ == "__main__":
    setup_roles()
