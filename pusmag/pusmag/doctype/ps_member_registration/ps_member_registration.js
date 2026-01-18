// Copyright (c) 2023, PuSMAG and contributors
// For license information, please see license.txt

frappe.ui.form.on("PS Member Registration", {
	refresh(frm) {
		frm.set_df_property("verified", "read_only", 1);

		if (frm.doc.status !== "Approved" && frm.doc.status !== "Rejected") {
			frm.add_custom_button(__("Approve"), () => {
				frappe.call({
					method: "pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.approve_registration",
					args: {
						registration_name: frm.doc.name
					},
					callback: (r) => {
						if (r.message && r.message.status === "success") {
							frm.reload_doc();
						}
					}
				});
			}, __("Actions"));

			frm.add_custom_button(__("Reject"), () => {
				frappe.prompt([
					{
						label: "Reason for Rejection",
						fieldname: "reason",
						fieldtype: "Small Text",
						reqd: 1
					}
				], (values) => {
					frappe.call({
						method: "pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.reject_registration",
						args: {
							registration_name: frm.doc.name,
							reason: values.reason
						},
						callback: (r) => {
							if (r.message && r.message.status === "success") {
								frm.reload_doc();
							}
						}
					});
				}, __("Reject Registration"), __("Reject"));
			}, __("Actions"));
		}

		if (frappe.user_roles.includes("PuSMAG Admin")) {
			frm.add_custom_button(__("Fix Missing Members"), () => {
				frappe.confirm(__("This will check all approved registrations and create missing members. Continue?"), () => {
					frappe.call({
						method: "pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.fix_missing_members",
						callback: (r) => {
							if (r.message) {
								frappe.msgprint(r.message.message);
								frm.reload_doc();
							}
						}
					});
				});
			}, __("Admin Tools"));
		}
	},
});
