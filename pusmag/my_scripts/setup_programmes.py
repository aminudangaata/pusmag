import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_field

def setup_programme_doctype():
    if not frappe.db.exists("DocType", "PS Programme"):
        doc = frappe.get_doc({
            "doctype": "DocType",
            "module": "PuSMAG",
            "custom": 1,
            "name": "PS Programme",
            "autoname": "format:PROG-{YYYY}-{MM}-{####}",
            "fields": [
                {"label": "Title", "fieldname": "title", "fieldtype": "Data", "reqd": 1},
                {"label": "Category", "fieldname": "category", "fieldtype": "Select", "options": "Meeting\nWorkshop\nCommunity\nReligious", "reqd": 1},
                {"label": "Start Date", "fieldname": "start_date", "fieldtype": "Date", "reqd": 1},
                {"label": "End Date", "fieldname": "end_date", "fieldtype": "Date"},
                {"label": "Location", "fieldname": "location", "fieldtype": "Data"},
                {"label": "Description", "fieldname": "description", "fieldtype": "Small Text"},
                {"label": "Image", "fieldname": "image", "fieldtype": "Attach Image"},
                {"label": "Content", "fieldname": "content", "fieldtype": "Text Editor"},
                {"label": "Route", "fieldname": "route", "fieldtype": "Data", "unique": 1},
                {"label": "Published", "fieldname": "published", "fieldtype": "Check", "default": 1}
            ],
            "permissions": [{"role": "System Manager", "read": 1, "write": 1}],
             "naming_rule": "Expression",
        })
        doc.insert()
        frappe.db.commit()
        print("Created PS Programme DocType")
    else:
        print("PS Programme DocType already exists")

def create_sample_programmes():
    programmes = [
        {
            "title": "Annual General Meeting 2026",
            "category": "Meeting",
            "start_date": "2026-03-15",
            "location": "Accra International Conference Centre",
            "description": "Our yearly gathering of all PUSMAG members to discuss achievements and plans.",
            "content": "<p>Join us for the Annual General Meeting where we review the past year's performance and elect new executives.</p>",
            "route": "agm-2026",
            "published": 1
        },
        {
            "title": "Professional Development Workshop",
            "category": "Workshop",
            "start_date": "2026-04-20",
            "location": "PUSMAG Secretariat",
            "description": "Skills enhancement workshop for public servants focusing on leadership.",
            "content": "<p>This workshop covers modern leadership techniques in the public sector.</p>",
            "route": "pdw-2026",
            "published": 1
        },
        {
            "title": "Community Iftar",
            "category": "Religious",
            "start_date": "2026-05-10",
            "location": "Central Mosque",
            "description": "Breaking fast together during the blessed month of Ramadan.",
            "content": "<p>A communinal Iftar to strengthen brotherhood.</p>",
            "route": "iftar-2026",
            "published": 1
        }
    ]

    for prog in programmes:
        if not frappe.db.exists("PS Programme", {"route": prog["route"]}):
            doc = frappe.get_doc({
                "doctype": "PS Programme",
                **prog
            })
            doc.insert()
            frappe.db.commit()
            print(f"Created programme: {prog['title']}")
        else:
            print(f"Programme exists: {prog['title']}")

if __name__ == "__main__":
    setup_programme_doctype()
    create_sample_programmes()
