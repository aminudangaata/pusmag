// Intersection Observer for scroll animations
export function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animate')
                }

                if (entry.target.classList.contains('counter')) {
                    const target = parseInt(entry.target.dataset.target || 0)
                    animateCounter(entry.target, target)
                    observer.unobserve(entry.target)
                }
            }
        })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el)
    })

    // Observe counters
    document.querySelectorAll('.counter').forEach(el => {
        observer.observe(el)
    })

    // Store for cleanup
    window.animationObserver = observer
}

// Counter animation for statistics
export function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16) // 60fps
    let current = start

    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            element.textContent = target
            clearInterval(timer)
        } else {
            element.textContent = Math.floor(current)
        }
    }, 16)
}

// Stagger animation for child elements
export function staggerAnimation(parent, delay = 100) {
    const children = parent.querySelectorAll('.stagger-item')
    children.forEach((child, index) => {
        child.style.animationDelay = `${index * delay}ms`
        child.classList.add('animate-on-scroll')
    })
}

// Card stack animation
export function initCardStack(containerId) {
    window.initCardStack = initCardStack
    const container = document.getElementById(containerId)
    if (!container) return

    const cards = container.querySelectorAll('.card-stack-item')
    let currentIndex = 0

    const rotateCards = () => {
        cards.forEach((card, index) => {
            const offset = (index - currentIndex + cards.length) % cards.length
            card.style.transform = `translateY(${offset * 12}px) scale(${1 - offset * 0.05})`
            card.style.zIndex = cards.length - offset
            card.style.opacity = 1 - offset * 0.2
        })

        currentIndex = (currentIndex + 1) % cards.length
    }

    // Rotate every 3 seconds
    setInterval(rotateCards, 3000)
    rotateCards() // Initial call
}

// Smooth scroll to element
export function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId)
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    })
}

// Parallax effect
export function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll('.parallax')

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5
            el.style.transform = `translateY(${scrolled * speed}px)`
        })
    })
}
