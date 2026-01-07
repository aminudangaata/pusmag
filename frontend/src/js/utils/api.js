// API client for Frappe backend
const API_BASE_URL = window.location.origin

class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api/method/${endpoint}`

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            ...options,
        }

        try {
            const response = await fetch(url, defaultOptions)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
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
    async getBlogPosts(filters = {}) {
        return this.get('pusmag.my_scripts.pusmag.get_blog_posts', { ...filters, filters: JSON.stringify(filters) })
    }

    // Using explicit separate param for pagination args if they are passed in filters? 
    // Actually getBlogPosts in backend takes filters, limit, offset. 
    // Frontend passes { category, search, limit, offset } usually? Refactoring needed.
    // The current Blog.js passes { category, search }.
    // Let's make getBlogPosts handle pagination params separately or extracting them.

    async getBlogPosts(params = {}) {
        const { limit, offset, ...filters } = params
        return this.get('pusmag.my_scripts.pusmag.get_blog_posts', {
            filters: JSON.stringify(filters),
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
}

export const api = new APIClient(API_BASE_URL)
