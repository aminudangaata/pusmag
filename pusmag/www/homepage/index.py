import frappe

def get_context(context):
    # context.home = frappe.db.get_value("PuSMAG Asset", "P00001", ["page_name","route"], as_dict=True)
    # context.home = frappe.get_doc("PuSMAG Asset", "P00001")
    context.items = frappe.get_all(
        "Image Gallery", fields=["title", "button_text","background_image"], 
        filters={
            "parent": "P00001",
            "parenttype": "PuSMAG Asset"
        },
        order_by="idx"
    )
    return context
