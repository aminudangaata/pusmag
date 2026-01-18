
import frappe
from pusmag.my_scripts.pusmag_portal import reset_password
import time

def verify():
    email = "tijani.aminu@gmail.com"
    print(f"Triggering reset password for {email}...")
    
    # Trigger reset password
    result = reset_password(email)
    print(f"Result: {result}")
    
    # Wait a moment for email to be queued
    time.sleep(2)
    
    # Check Email Queue
    print("Checking Email Queue...")
    email_queue = frappe.get_all("Email Queue", 
                                filters={"priority": 1}, 
                                fields=["message", "subject", "recipients"], 
                                order_by="creation desc", 
                                limit=1)
    
    if email_queue:
        latest_email = email_queue[0]
        print(f"Latest Email Subject: {latest_email.subject}")
        print(f"Latest Email Recipients: {latest_email.recipients}")
        
        if "Reset Your Password - PuSMAG" in latest_email.subject:
             print("SUCCESS: Custom subject found.")
        else:
             print("FAILURE: Custom subject NOT found.")
             
        if "Reset Password" in latest_email.message and "Assalaamu alaikum" in latest_email.message:
            print("SUCCESS: Custom content found in message.")
        else:
            print("FAILURE: Custom content NOT found in message.")
            print("Message snippet:", latest_email.message[:500])
            
    else:
        print("FAILURE: No email found in queue.")

if __name__ == "__main__":
    frappe.connect(site="pusmag.org")
    verify()
