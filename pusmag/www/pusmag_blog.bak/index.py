import frappe

def get_context(context):
    # context.home = frappe.db.get_value("PuSMAG Asset", "P00001", ["page_name","route"], as_dict=True)
    # context.home = frappe.get_doc("PuSMAG Asset", "P00001")
    context.items = frappe.get_all('PS Blog Post', 
        # filters={
        #     'status': 'Open'
        # }, 
        fields=[
            'name',
            'post_title', 
            'post_category',
            'post_image',
            'post_author',
            'published_date',
            'post_content'
        ],
        order_by='modified desc',
        limit=5
    )
    context.categories = frappe.get_all('PS Blog Post', 
        filters={
            'post_category': 'Jurisprudence'
        }, 
        fields=[
            'name',
            'post_title', 
            'post_category',
            'post_image',
            'post_author',
            'published_date',
            'post_content'
        ], 
        order_by='creation desc',
        limit=4
    )
    return context