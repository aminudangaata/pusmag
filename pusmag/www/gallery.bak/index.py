import frappe

def get_context(context):
    # context.home = frappe.db.get_value("PuSMAG Asset", "P00001", ["page_name","route"], as_dict=True)
    # context.home = frappe.get_doc("PuSMAG Asset", "P00001")
    context.items = frappe.get_all('PS Gallery', 
        # filters={
        #     'status': 'Open'
        # }, 
        fields=[
            'image_title', 
            'image_category',
            'image_link'
        ], 
        order_by='creation desc')
    return context