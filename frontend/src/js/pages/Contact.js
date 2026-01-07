import { api } from '../utils/api.js'

export async function ContactPage() {
  return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Contact Us</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Get in touch with us. We'd love to hear from you
          </p>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <div class="animate-on-scroll">
              <form id="contact-form" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Name</label>
                  <input type="text" name="name" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Email</label>
                  <input type="email" name="email" required class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Message</label>
                  <textarea name="message" required rows="5" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"></textarea>
                </div>
                <button type="submit" class="btn-custom w-full">
                  <span class="inner">Send Message</span>
                </button>
                <div id="form-message" class="hidden text-center"></div>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="space-y-8 animate-on-scroll" style="animation-delay: 0.1s">
              <div class="glass rounded-xl p-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Phone</h3>
                    <p class="text-neutral-400">+(233) 50 175 6250</p>
                  </div>
                </div>
              </div>

              <div class="glass rounded-xl p-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Email</h3>
                    <p class="text-neutral-400">info@pusmag.org</p>
                  </div>
                </div>
              </div>

              <div class="glass rounded-xl p-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold mb-1">Office Hours</h3>
                    <p class="text-neutral-400">Monday - Friday: 8am-5pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <script>
      const form = document.getElementById('contact-form')
      const formMessage = document.getElementById('form-message')

      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)

        try {
          // Uncomment when API is ready
          // await api.submitContactForm(data)
          
          formMessage.textContent = 'Thank you! Your message has been sent.'
          formMessage.className = 'text-green-500 text-center'
          formMessage.classList.remove('hidden')
          form.reset()
        } catch (error) {
          formMessage.textContent = 'Sorry, there was an error sending your message.'
          formMessage.className = 'text-red-500 text-center'
          formMessage.classList.remove('hidden')
        }
      })
    </script>
  `
}
