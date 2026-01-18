import './styles/main.css'
import { router } from './js/utils/router.js'
import { initAnimations } from './js/utils/animations.js'

// Global error handler for startup issues
window.onerror = function (msg, url, line, col, error) {
  const errorMsg = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; color: #ff5555; z-index: 9999; padding: 20px; font-family: monospace; overflow: auto;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">Startup Error</h2>
            <div style="margin-bottom: 10px;"><strong>Message:</strong> ${msg}</div>
            <div style="margin-bottom: 10px;"><strong>File:</strong> ${url}:${line}:${col}</div>
            <pre style="background: #1a1a1a; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${error?.stack || 'No stack trace available'}</pre>
        </div>
    `
  document.body.innerHTML += errorMsg
  console.error('Global error:', error)
}

try {

  // Initialize the application
  document.addEventListener('DOMContentLoaded', async () => {
    // Make router globally accessible for inline onclick handlers
    window.router = router

    // Initialize router
    await router.init()

    // Initialize scroll animations
    initAnimations()

    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]')
      if (link && !link.getAttribute('href').startsWith('/files/') && link.getAttribute('target') !== '_blank') {
        e.preventDefault()
        const path = link.getAttribute('href')
        router.navigate(path)
      }
    })

    // Handle browser back/forward
    window.addEventListener('popstate', async () => {
      await router.handleRoute()
    })

    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      const mobileMenuBtn = e.target.closest('#mobile-menu-btn')
      if (mobileMenuBtn) {
        const menu = document.getElementById('mobile-menu')
        if (menu) {
          menu.classList.toggle('hidden')
        }
      }
    })
  })
} catch (error) {
  console.error('Initialization error:', error)
  window.onerror(error.message, 'main.js', 0, 0, error)
}

