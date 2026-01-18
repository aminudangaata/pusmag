export async function AboutPage() {
    return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">About PuSMAG</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
            The Public Services Muslims Association of Ghana (PuSMAG) is a professional body established in 2023 to unite and empower Muslim professionals within the Ghanaian public sector.
          </p>
        </div>
      </section>

      <!-- Introduction Section -->
       <section class="section-padding">
        <div class="container-custom">
            <div class="glass rounded-xl p-8 md:p-12 animate-on-scroll">
                <p class="text-lg text-neutral-300 leading-relaxed text-center max-w-4xl mx-auto">
                    The Association is dedicated to fostering a community of public servants who excel in their professional roles while remaining steadfast in their faith.
                </p>
            </div>
        </div>
      </section>

      <!-- Who We Are -->
      <section class="section-padding bg-neutral-950">
          <div class="container-custom">
              <div class="flex flex-col md:flex-row items-center gap-12">
                  <div class="w-full md:w-1/2 animate-on-scroll">
                      <h2 class="text-4xl font-bold mb-6">Who We Are</h2>
                      <div class="space-y-4 text-neutral-400 leading-relaxed">
                          <p>
                              We are a non-partisan, non-political, non-sectarian and non-tribal organization. Our membership consists of Muslim Public Servants who are committed to the promotion of excellent public service delivery and the observance of accountability within Ghana.
                          </p>
                          <p>
                              Every member is bound by both the principles of Islam and the professional standards of the Public Services of Ghana.
                          </p>
                      </div>
                  </div>
                  <div class="w-full md:w-1/2 animate-on-scroll" style="animation-delay: 0.2s">
                       <div class="relative">
                          <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-3xl opacity-20 rounded-full"></div>
                          <div class="glass p-8 rounded-xl relative">
                              <h3 class="text-2xl font-bold mb-4 text-neutral-300">Our Identity</h3>
                               <ul class="space-y-3">
                                  <li class="flex items-center gap-3 text-neutral-300">
                                      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                      Non-partisan
                                  </li>
                                   <li class="flex items-center gap-3 text-neutral-300">
                                      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                      Non-political
                                  </li>
                                   <li class="flex items-center gap-3 text-neutral-300">
                                      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                      Non-sectarian
                                  </li>
                                   <li class="flex items-center gap-3 text-neutral-300">
                                      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                      Non-tribal
                                  </li>
                               </ul>
                          </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  `
}
