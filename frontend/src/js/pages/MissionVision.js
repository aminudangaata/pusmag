export async function MissionVisionPage() {
  return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Mission & Vision</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
            Our guiding star and future aspirations
          </p>
        </div>
      </section>

      <section class="section-padding bg-neutral-950">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="glass rounded-xl p-8 animate-on-scroll border-l-4 border-primary-500">
              <h2 class="text-2xl font-bold mb-4 text-neutral-300">Our Mission</h2>
              <p class="text-sm text-neutral-400 leading-relaxed">
                To foster unity, promote professional development and provide welfare support for Muslim public servants in Ghana, while upholding the highest standards of service, excellence and integrity.
              </p>
            </div>
            <div class="glass rounded-xl p-8 animate-on-scroll border-l-4 border-accent-500" style="animation-delay: 0.1s">
              <h2 class="text-2xl font-bold mb-4 text-neutral-300">Our Vision</h2>
              <p class="text-sm text-neutral-400 leading-relaxed">
                To be the leading association of Muslim public servants in Ghana, recognised for excellence in service delivery, professional development and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
}
