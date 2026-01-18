import frappe

def get_context(context):
    context.post = frappe.get_doc("PS Blog Post", frappe.form_dict.docname)
    return context