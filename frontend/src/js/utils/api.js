// API client for Frappe backend
const API_BASE_URL = window.location.origin

class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async request(endpoint, options = {}) {
        const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}/api/method/${endpoint}`

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            ...options,
        }

        try {
            const response = await fetch(url, defaultOptions)

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData.exception) {
                        // Extract message from exception string if it's there
                        errorMessage = errorData.exception.split(':').pop().trim();
                    } else if (errorData._server_messages) {
                        const messages = JSON.parse(errorData._server_messages);
                        errorMessage = JSON.parse(messages[0]).message;
                    }
                } catch (e) {
                    // Fallback to default status message
                }
                throw new Error(errorMessage);
            }

            const data = await response.json()

            // Frappe wraps responses in a message object
            if (data.message) {
                return data.message
            }

            return data
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = queryString ? `${endpoint}?${queryString}` : endpoint

        return this.request(url, {
            method: 'GET',
        })
    }

    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // Homepage APIs
    async getHomepageSlides() {
        return this.get('pusmag.my_scripts.pusmag.get_homepage_slides')
    }

    async getServices() {
        return this.get('pusmag.my_scripts.pusmag.get_services')
    }

    async getStatistics() {
        return this.get('pusmag.my_scripts.pusmag.get_statistics')
    }

    // Events/Programmes APIs
    async getEvents(filters = {}) {
        return this.get('pusmag.my_scripts.pusmag.get_events', { filters: JSON.stringify(filters) })
    }

    async getEventDetails(eventId) {
        return this.get('pusmag.my_scripts.pusmag.get_event_details', { event_id: eventId })
    }

    // Blog APIs
    async getBlogPosts(params = {}) {
        const { category, search, limit, offset } = params
        return this.get('pusmag.my_scripts.pusmag.get_blog_posts', {
            filters: JSON.stringify({ category, search }),
            limit,
            offset
        })
    }

    async getBlogPost(postId) {
        return this.get('pusmag.my_scripts.pusmag.get_blog_post', { post_id: postId })
    }

    async getBlogCategories() {
        return this.get('pusmag.my_scripts.pusmag.get_blog_categories')
    }

    // Gallery APIs
    async getGalleryImages(filters = {}) {
        return this.get('pusmag.my_scripts.pusmag.get_gallery_images', { filters: JSON.stringify(filters) })
    }

    async getGalleryCategories() {
        return this.get('pusmag.my_scripts.pusmag.get_gallery_categories')
    }

    // Contact APIs
    async submitContactForm(data) {
        return this.post('pusmag.my_scripts.pusmag.submit_contact_form', data)
    }

    async getContactInfo() {
        return this.get('pusmag.my_scripts.pusmag.get_contact_info')
    }

    // Registration APIs
    async submitRegistration(data) {
        return this.post('pusmag.my_scripts.pusmag.submit_registration', data)
    }

    // Auth & 2FA
    async login(usr, pwd) {
        return this.post('login', { usr, pwd })
    }

    async logout() {
        return this.post('logout')
    }

    async send2FACode(email) {
        return this.post('pusmag.my_scripts.pusmag_portal.send_2fa_code', { email })
    }

    async verify2FACode(email, code) {
        return this.post('pusmag.my_scripts.pusmag_portal.verify_2fa_code', { email, code })
    }

    async getCurrentUser() {
        // Frappe doesn't have a direct "get current user" in api/method/login usually.
        // We can use a whitelisted method or check frappe.session in backend.
        return this.get('frappe.auth.get_logged_user')
    }

    async getUserInfo() {
        return this.get('pusmag.my_scripts.pusmag_portal.get_user_info')
    }

    async getPortalStats() {
        return this.get('pusmag.my_scripts.pusmag_portal.get_portal_stats')
    }

    // Portal APIs
    async getMemberDirectory(params = {}) {
        const { limit, offset, ...filters } = params
        return this.get('pusmag.my_scripts.pusmag_portal.get_member_directory', {
            filters: JSON.stringify(filters),
            limit,
            offset
        })
    }

    async getPendingRegistrations() {
        return this.get('pusmag.my_scripts.pusmag_portal.get_pending_registrations')
    }

    async approveRegistration(name) {
        return this.post('pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.approve_registration', { registration_name: name })
    }

    async rejectRegistration(name, reason) {
        return this.post('pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.reject_registration', { registration_name: name, reason })
    }

    async getUserBlogPosts(search = '') {
        return this.get('pusmag.my_scripts.pusmag_portal.get_user_blog_posts', { search })
    }

    async getBlogPostDetails(postId) {
        return this.get('pusmag.my_scripts.pusmag_portal.get_blog_post_details', { post_id: postId })
    }

    async saveBlogPost(postData) {
        return this.post('pusmag.my_scripts.pusmag_portal.save_blog_post', { post_data: postData })
    }

    async deleteBlogPost(name) {
        return this.post('pusmag.my_scripts.pusmag_portal.delete_blog_post', { name })
    }

    async cancelDeleteRequest(name) {
        return this.post('pusmag.my_scripts.pusmag_portal.cancel_delete_request', { name })
    }

    async getMemberDetails(memberName) {
        return this.get('pusmag.my_scripts.pusmag_portal.get_member_details', { member_name: memberName })
    }

    // Programmes
    async getPortalProgrammes() {
        return this.get('pusmag.my_scripts.pusmag_portal.get_portal_programmes')
    }

    async saveProgramme(data) {
        return this.post('pusmag.my_scripts.pusmag_portal.save_programme', { programme_data: data })
    }

    async deleteProgramme(name) {
        return this.post('pusmag.my_scripts.pusmag_portal.delete_programme', { name })
    }

    // Gallery
    async getPortalGallery() {
        return this.get('pusmag.my_scripts.pusmag_portal.get_portal_gallery')
    }

    async saveGalleryImage(data) {
        return this.post('pusmag.my_scripts.pusmag_portal.save_gallery_image', { image_data: data })
    }

    async deleteGalleryImage(name) {
        return this.post('pusmag.my_scripts.pusmag_portal.delete_gallery_image', { name })
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('is_private', 0); // Publicly accessible images for blog
        formData.append('folder', 'Home/Attachments');

        const url = `${this.baseURL}/api/method/upload_file`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            // Do not set Content-Type header, fetch will set it properly with boundary
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }

        const data = await response.json();
        if (data.message && data.message.file_url) {
            return data.message.file_url;
        }
        throw new Error('File upload failed: No file URL returned');
    }
}

export const api = new APIClient(API_BASE_URL)
