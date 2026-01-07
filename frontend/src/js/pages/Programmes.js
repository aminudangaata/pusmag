import { api } from '../utils/api.js'
import { BASE_PATH } from '../utils/constants.js'
import { formatDate } from '../utils/helpers.js'

export async function ProgrammesPage() {
  // Helper to join paths correctly
  const getPath = (path) => {
    if (path === '/') return BASE_PATH || '/'
    return `${BASE_PATH}${path}`
  }

  let events = []

  try {
    events = await api.getEvents()
  } catch (error) {
    console.log('Using fallback data')
    events = [
      { id: 'agm-2026', title: 'Annual General Meeting', date: '2026-03-15', category: 'Meeting', description: 'Our yearly gathering of all members' },
      { id: 'pdw-2026', title: 'Professional Development Workshop', date: '2026-04-20', category: 'Workshop', description: 'Skills enhancement for public servants' },
      { id: 'outreach-2026', title: 'Community Outreach', date: '2026-05-10', category: 'Community', description: 'Giving back to the community' }
    ]
  }

  return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Programmes & Events</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Join us in our various programmes and activities throughout the year
          </p>
        </div>
      </section>

      <!-- Events Grid -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${events.map((event, index) => `
              <div class="glass rounded-xl overflow-hidden hover-lift hover-glow animate-on-scroll" style="animation-delay: ${index * 0.1}s">
                <div class="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center overflow-hidden">
                    ${event.image ?
      `<img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">` :
      `<svg class="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>`
    }
                </div>
                <div class="p-6">
                  <div class="text-xs text-primary-500 font-semibold mb-2">${event.category || 'Event'}</div>
                  <h3 class="text-xl font-semibold mb-2">
                    <a href="${getPath(`/programmes/${event.id || event.route}`)}" class="hover:text-primary-500 transition-colors">
                        ${event.title}
                    </a>
                  </h3>
                  <p class="text-neutral-400 text-sm mb-4 line-clamp-2">${event.description || ''}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <div class="flex items-center gap-2 text-sm text-neutral-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${formatDate(event.date) || 'TBA'}</span>
                    </div>
                    <a href="${getPath(`/programmes/${event.id || event.route}`)}" class="text-xs font-medium text-white bg-white/10 px-3 py-1 rounded-full hover:bg-primary-500 hover:text-black transition-all">
                        Details
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `
}
