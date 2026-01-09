import { api } from '../utils/api.js'
import { initCardStack } from '../utils/animations.js'
import { BASE_PATH } from '../utils/constants.js'

export async function HomePage() {
  // Helper to join paths correctly
  const getPath = (path) => {
    if (path === '/') return BASE_PATH || '/'
    return `${BASE_PATH}${path}`
  }

  const establishmentYear = 2023
  const currentYear = new Date().getFullYear()
  const yearsOfService = currentYear - establishmentYear

  // Fetch data (with fallback for development)
  let slides = []
  let services = []
  let statistics = []

  try {
    slides = await api.getHomepageSlides()
    services = await api.getServices()
    statistics = await api.getStatistics()
  } catch (error) {
    console.log('Using fallback data for development')
    // Fallback data for development
    slides = [
      { title: 'Unity, Service, Excellence & Integrity', button_text: 'Learn More' }
    ]
    services = [
      { title: 'Community Building', description: 'Fostering unity among Muslim public servants', icon: 'users' },
      { title: 'Professional Development', description: 'Enhancing skills and career growth', icon: 'briefcase' },
      { title: 'Welfare Support', description: 'Supporting members in times of need', icon: 'heart' }
    ]
    statistics = [
      { label: 'Years of Service', value: yearsOfService },
      { label: 'Active Members', value: 500 },
      { label: 'Programmes', value: 50 },
      { label: 'Regions', value: 16 }
    ]
  }

  return `
    <!-- Add top padding for fixed navbar -->
    <div class="pt-20">
      <!-- Hero Section -->
      <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <!-- Background gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-500),0.1),transparent_50%)]"></div>

        <div class="container-custom relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <!-- Left: Title & Description -->
            <div class="col-span-1 lg:col-span-6">
              <div class="inline-flex items-center gap-2 text-primary-500 mb-8 animate-on-scroll">
                <span class="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse-slow"></span>
                <span class="text-xs font-bold tracking-widest uppercase text-primary-500/80">
                  Est. ${establishmentYear}
                </span>
              </div>

              <h1 class="text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-white font-medium mb-6 animate-on-scroll" style="animation-delay: 0.2s">
                Unity, Service,
                <span class="gradient-text">Excellence & Integrity.</span>
              </h1>

              <p class="leading-relaxed text-lg text-white/60 max-w-lg mb-10 animate-on-scroll" style="animation-delay: 0.35s">
                Public Services Muslims Association of Ghana - Building a community of dedicated Muslim public servants committed to excellence and integrity.
              </p>

              <div class="flex flex-wrap gap-6 items-center animate-on-scroll" style="animation-delay: 0.5s">
                <a href="${getPath('/register')}" class="btn-custom">
                  <span class="inner flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    <span>Become a Member</span>
                  </span>
                </a>
                <div class="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Free to join</span>
                </div>
              </div>
            </div>

            <!-- Right: Interactive Cards -->
            <div class="col-span-1 lg:col-span-6 flex flex-col items-end justify-center">
              <!-- Card Stack Preview -->
              <div id="card-stack" class="relative mb-12 w-64 md:w-72 aspect-video group perspective-1000 animate-on-scroll" style="animation-delay: 0.4s">
                <!-- Decorative glow -->
                <div class="absolute -inset-8 bg-primary-500/20 blur-3xl -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>

                <!-- Card Stack -->
                <div class="relative w-full h-full">
                  ${[1, 2, 3].map((num, index) => `
                    <div class="card-stack-item absolute inset-0 rounded-lg overflow-hidden border border-white/10 shadow-2xl origin-bottom bg-neutral-900"
                         style="transform: translateY(${index * 12}px) scale(${1 - index * 0.05}); z-index: ${30 - index * 10}; opacity: ${1 - index * 0.2};">
                      <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <div class="text-center p-6">
                          <div class="text-4xl font-bold text-white mb-2">${statistics[index]?.value || (index + 1) * 100}</div>
                          <div class="text-sm text-white/60">${statistics[index]?.label || 'Metric'}</div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Interactive Steps -->
              <div class="flex flex-col gap-3 w-full max-w-xs">
                ${['Join PUSMAG', 'Attend Events', 'Make Impact'].map((step, index) => `
                  <div class="step-item flex cursor-pointer transition-all duration-300 glass rounded-lg p-3 hover:bg-white/10 gap-4 items-center animate-on-scroll" 
                       style="animation-delay: ${0.6 + index * 0.1}s">
                    <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-primary-500/20">
                      0${index + 1}
                    </div>
                    <span class="text-sm font-medium text-white">${step}</span>
                    <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="section-padding bg-neutral-950">
        <div class="container-custom">
          <div class="text-center mb-16 animate-on-scroll">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
            <p class="text-neutral-400 max-w-2xl mx-auto">
              Empowering Muslim public servants through community, development, and support
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${services.map((service, index) => `
              <div class="glass rounded-xl p-8 hover-lift hover-glow animate-on-scroll" style="animation-delay: ${index * 0.1}s">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${getServiceIcon(service.icon || 'users')}
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">${service.title}</h3>
                <p class="text-neutral-400">${service.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            ${statistics.map((stat, index) => `
              <div class="text-center animate-on-scroll" style="animation-delay: ${index * 0.1}s">
                <div class="text-5xl md:text-6xl font-bold text-white mb-2 counter" data-target="${stat.value}">
                  0
                </div>
                <div class="text-neutral-400 text-sm uppercase tracking-wider">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-padding relative overflow-hidden">
        <!-- Unique Blue Mesh Background -->
        <div class="absolute inset-0 bg-neutral-950"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(14,165,233,0.15),transparent_50%)]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.2),transparent_70%)]"></div>
        
        <!-- Decorative subtle grid or pattern could go here, but blobs are better -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s"></div>

        <div class="container-custom relative z-10">
          <div class="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Join Our Community?
            </h2>
            <p class="text-xl text-neutral-400 mb-10">
              Become part of a growing network of Muslim public servants dedicated to excellence and service.
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <a href="${getPath('/register')}" class="btn-custom">
                <span class="inner">Register Now</span>
              </a>
              <a href="${getPath('/about')}" class="glass px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <script>
      // Initialize card stack animation
      setTimeout(() => {
        if (window.initCardStack) {
          window.initCardStack('card-stack')
        }
      }, 500)
    </script>
  `
}

function getServiceIcon(iconName) {
  const icons = {
    users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
    briefcase: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
    heart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
    star: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>'
  }
  return icons[iconName] || icons.users
}
