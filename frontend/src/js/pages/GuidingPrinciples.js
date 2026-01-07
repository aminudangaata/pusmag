export async function GuidingPrinciplesPage() {
    return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Guiding Principles</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
             PuSMAG is built upon four core pillars that guide every action and decision of the Association
          </p>
        </div>
      </section>

      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Unity</h3>
                        <p class="text-neutral-400 leading-relaxed">
                            The association is dedicated to fostering a spirit of unity, tolerance, and cooperation among Muslim public servants, the broader Muslim community, and the general public in Ghana.
                        </p>
                    </div>
                </div>
            </div>

            <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.1s">
                <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Service</h3>
                        <p class="text-neutral-400 leading-relaxed">
                            PuSMAG is committed to promoting the general welfare and socioreligious development of its members and the Muslim community through collaborative projects and mentorship.
                        </p>
                    </div>
                </div>
            </div>

             <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.2s">
                 <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Excellence</h3>
                        <p class="text-neutral-400 leading-relaxed">
                            Members strive for excellent public service delivery and professional advancement by facilitating access to training and nurturing young Muslims to reach the heights of their careers.
                        </p>
                    </div>
                </div>
            </div>

            <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.3s">
                <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-3 text-white">Integrity</h3>
                        <p class="text-neutral-400 leading-relaxed">
                            The association maintains the highest standards of accountability and ethical conduct as prescribed by both the principles of Islam and the Public Service Code of Ethics.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
}
