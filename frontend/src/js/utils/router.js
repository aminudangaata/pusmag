// Simple client-side router
import { HomePage } from '../pages/Home.js'
import { AboutPage } from '../pages/About.js'
import { MissionVisionPage } from '../pages/MissionVision.js'
import { GuidingPrinciplesPage } from '../pages/GuidingPrinciples.js'
import { ObjectivesPage } from '../pages/Objectives.js'
import { GovernancePage } from '../pages/Governance.js'
import { EthicsPage } from '../pages/Ethics.js'
import { ProgrammesPage } from '../pages/Programmes.js'
import { ProgrammeDetailsPage } from '../pages/ProgrammeDetails.js'
import { BlogPage } from '../pages/Blog.js'
import { BlogPostPage } from '../pages/BlogPost.js'
import { GalleryPage } from '../pages/Gallery.js'
import { ContactPage } from '../pages/Contact.js'
import { RegisterPage } from '../pages/Register.js'
import { Navbar } from '../components/Navbar.js'
import { Footer } from '../components/Footer.js'
import { initAnimations } from '../utils/animations.js'

import { BASE_PATH } from './constants.js'

const routes = {
    '/': HomePage,
    '/about': AboutPage,
    '/mission-vision': MissionVisionPage,
    '/guiding-principles': GuidingPrinciplesPage,
    '/objectives': ObjectivesPage,
    '/governance': GovernancePage,
    '/ethics': EthicsPage,
    '/programmes': ProgrammesPage,
    '/programmes/:id': ProgrammeDetailsPage,
    '/blog': BlogPage,
    '/blog/:id': BlogPostPage,
    '/gallery': GalleryPage,
    '/contact': ContactPage,
    '/register': RegisterPage,
}

class Router {
    constructor() {
        this.currentPath = window.location.pathname
    }

    init() {
        this.handleRoute()
    }

    navigate(path) {
        window.history.pushState({}, '', path)
        this.currentPath = path
        this.handleRoute()
    }

    handleRoute() {
        let path = window.location.pathname

        // Strip base path if present
        if (path.startsWith(BASE_PATH)) {
            path = path.substring(BASE_PATH.length)
        }

        // Ensure path starts with /
        if (!path.startsWith('/')) {
            path = '/' + path
        }

        this.currentPath = path

        // Find matching route
        let matchedRoute = null
        let params = {}

        for (const [route, component] of Object.entries(routes)) {
            const match = this.matchRoute(route, path)
            if (match) {
                matchedRoute = component
                params = match.params
                break
            }
        }

        // Render page
        if (matchedRoute) {
            this.render(matchedRoute, params)
        } else {
            console.log('No route matched for:', path)
            this.render404()
        }

        // Scroll to top
        window.scrollTo(0, 0)
    }

    matchRoute(route, path) {
        // Handle root path
        if (route === '/' && path === '/') return { params: {} }
        if (route === '/' && path !== '/') return null

        const routeParts = route.split('/').filter(Boolean)
        const pathParts = path.split('/').filter(Boolean)

        if (routeParts.length !== pathParts.length) {
            return null
        }

        const params = {}
        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                const paramName = routeParts[i].slice(1)
                params[paramName] = pathParts[i]
            } else if (routeParts[i] !== pathParts[i]) {
                return null
            }
        }

        return { params }
    }

    async render(PageComponent, params = {}) {
        const app = document.getElementById('app')

        // First render layout with navbar and footer to ensure UI is visible quickly
        // Check if layout already exists to avoid re-rendering navbar
        if (!document.getElementById('navbar')) {
            app.innerHTML = `
              <div id="navbar"></div>
              <main id="main-content" class="min-h-screen"></main>
              <div id="footer"></div>
            `
            const navbarEl = document.getElementById('navbar')
            navbarEl.innerHTML = Navbar(window.location.pathname) // Pass full path to Navbar

            const footerEl = document.getElementById('footer')
            footerEl.innerHTML = Footer()
        }

        // Render component
        const mainEl = document.getElementById('main-content')
        // Show loading state if needed, or simply render
        try {
            const content = await PageComponent(params)
            mainEl.innerHTML = content
        } catch (error) {
            console.error('Error rendering page:', error)
            mainEl.innerHTML = `<div class="pt-32 text-center text-red-500">Error loading content. Please try again.</div>`
        }

        // Re-initialize animations for new content
        // Small timeout to ensure DOM is ready
        setTimeout(() => initAnimations(), 100)

        // Update active state in Navbar
        this.updateNavbarActiveState()
    }

    updateNavbarActiveState() {
        // Simple client-side update of active link
        const links = document.querySelectorAll('nav a')
        const currentPath = window.location.pathname

        links.forEach(link => {
            const href = link.getAttribute('href')
            if (href === currentPath) {
                link.classList.add('text-white')
                link.classList.remove('text-neutral-400')
            } else {
                link.classList.remove('text-white')
                link.classList.add('text-neutral-400')
            }
        })
    }

    render404() {
        const app = document.getElementById('app')
        // Keep navbar if possible
        if (!document.getElementById('navbar')) {
            app.innerHTML = `
                <div id="navbar"></div>
                <main id="main-content"></main>
                 <div id="footer"></div>
            `
            document.getElementById('navbar').innerHTML = Navbar(window.location.pathname)
            document.getElementById('footer').innerHTML = Footer()
        }

        const mainEl = document.getElementById('main-content')
        mainEl.innerHTML = `
          <div class="min-h-screen flex items-center justify-center pt-20">
            <div class="text-center">
              <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">404</h1>
              <p class="text-xl mb-8 text-neutral-400">Page not found</p>
              <a href="${BASE_PATH}/" class="btn-custom">
                <span class="inner">Go Home</span>
              </a>
            </div>
          </div>
        `
    }
}

export const router = new Router()
