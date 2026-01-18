export async function GovernancePage() {
  return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Governance Structure</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
             Ensuring transparency, effectiveness, and accountability
          </p>
        </div>
      </section>

       <section class="section-padding bg-neutral-950">
        <div class="container-custom">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="glass p-8 rounded-xl text-center animate-on-scroll">
                     <div class="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <svg class="w-8 h-8 stroke-orange-400" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold mb-2">General Assembly</h3>
                     <p class="text-neutral-400 text-sm">The highest decision-making body of the Association.</p>
                 </div>
                 <div class="glass p-8 rounded-xl text-center animate-on-scroll" style="animation-delay: 0.1s">
                      <div class="w-16 h-16 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <svg class="w-8 h-8 stroke-primary-400" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                      </div>
                     <h3 class="text-xl font-bold mb-2">Board of Directors</h3>
                     <p class="text-neutral-400 text-sm">A body of 11 experienced Muslim Public Servants who provide oversight and general guidance.</p>
                 </div>
                 <div class="glass p-8 rounded-xl text-center animate-on-scroll" style="animation-delay: 0.2s">
                      <div class="w-16 h-16 mx-auto mb-6 bg-accent-500/20 rounded-full flex items-center justify-center shadow-lg shadow-accent-500/20">
                        <svg class="w-8 h-8 stroke-accent-500" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </div>
                     <h3 class="text-xl font-bold mb-2">Secretariat</h3>
                     <p class="text-neutral-400 text-sm">Led by an Executive Secretary, managing day-to-day administration and implementing policies.</p>
                 </div>
            </div>
        </div>
       </section>
    </div>
  `
}
