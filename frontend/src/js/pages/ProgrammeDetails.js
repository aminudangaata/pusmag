import { api } from '../utils/api.js'
import { formatDate } from '../utils/helpers.js'

export async function ProgrammeDetailsPage(params) {
    const { id } = params
    let programme = null

    try {
        programme = await api.getEventDetails(id)
    } catch (error) {
        console.error('Error fetching programme details:', error)
    }

    if (!programme || Object.keys(programme).length === 0) {
        return `
            <div class="pt-32 min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">Programme Not Found</h1>
                    <p class="text-neutral-400">The programme you are looking for does not exist.</p>
                </div>
            </div>
        `
    }

    return `
    <div class="pt-32 pb-20">
        <!-- Hero Section -->
        <section class="relative h-[50vh] min-h-[400px] flex items-end pb-12">
            ${programme.image ?
            `<div class="absolute inset-0">
                    <img src="${programme.image}" alt="${programme.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
                </div>` :
            `<div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>`
        }
            
            <div class="container-custom relative z-10">
                <div class="max-w-4xl">
                    <div class="inline-block px-3 py-1 rounded-full bg-primary-500 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-4 animate-on-scroll">
                        ${programme.category}
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold text-neutral-300 mb-6 animate-on-scroll" style="animation-delay: 0.1s">
                        ${programme.title}
                    </h1>
                    <div class="flex flex-wrap gap-6 text-neutral-300 animate-on-scroll" style="animation-delay: 0.2s">
                        ${programme.date ? `
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${formatDate(programme.date)}</span>
                            </div>
                        ` : ''}
                        ${programme.location ? `
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>${programme.location}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </section>

        <!-- Content Section -->
        <section class="section-padding">
            <div class="container-custom">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-8">
                        <div class="prose prose-invert prose-lg max-w-none">
                            ${programme.content || programme.description || '<p>No details available.</p>'}
                        </div>
                    </div>
                    
                    <div class="lg:col-span-4">
                        <div class="glass rounded-xl p-8 sticky top-32">
                            <h3 class="text-xl font-bold mb-6">Info</h3>
                            <div class="space-y-4 text-neutral-400">
                                <p>Interested in this programme? Contact us for more details.</p>
                                <a href="/contact" class="btn-custom w-full text-center block">
                                    <span class="inner">Contact Us</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `
}
