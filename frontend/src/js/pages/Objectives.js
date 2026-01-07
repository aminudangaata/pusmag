export async function ObjectivesPage() {
   return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Our Objectives</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
             Goals pursued by PuSMAG to serve Muslim Public Servants and the community
          </p>
        </div>
      </section>

      <section class="section-padding">
        <div class="container-custom">
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform">
                     <h3 class="text-xl font-bold mb-3 text-primary-400">Socioreligious Development</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Seeking the general welfare and development of Members and the wider Muslim community.
                     </p>
                </div>
                 <!-- Card 2 -->
                <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform" style="animation-delay: 0.1s">
                     <h3 class="text-xl font-bold mb-3 text-accent-400">Knowledge Sharing</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Providing a forum for members to network, share ideas and exchange experiences regarding the public service.
                     </p>
                </div>
                 <!-- Card 3 -->
                <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform" style="animation-delay: 0.2s">
                     <h3 class="text-xl font-bold mb-3 text-blue-400">Empowerment & Education</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Facilitating access to educational and training opportunities and assisting Members with continuous professional development.
                     </p>
                </div>
                 <!-- Card 4 -->
                 <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform" style="animation-delay: 0.3s">
                     <h3 class="text-xl font-bold mb-3 text-green-400">Mentorship</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Nurturing the next generation by providing guidance to the Ghana Muslim Students Association (GMSA) and helping young Muslims reach greater heights in their careers.
                     </p>
                </div>
                 <!-- Card 5 -->
                 <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform md:col-span-2 lg:col-span-1" style="animation-delay: 0.4s">
                     <h3 class="text-xl font-bold mb-3 text-yellow-400">Community Collaboration</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Working with stakeholders to deliver community development projects, healthcare and social safeguards.
                     </p>
                </div>
             </div>
        </div>
      </section>
    </div>
  `
}
