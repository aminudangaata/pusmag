(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const I=window.location.origin;class S{constructor(e){this.baseURL=e}async request(e,t={}){const o=`${this.baseURL}/api/method/${e}`,r={headers:{"Content-Type":"application/json",Accept:"application/json"},...t};try{const s=await fetch(o,r);if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);const i=await s.json();return i.message?i.message:i}catch(s){throw console.error("API request failed:",s),s}}async get(e,t={}){const o=new URLSearchParams(t).toString(),r=o?`${e}?${o}`:e;return this.request(r,{method:"GET"})}async post(e,t={}){return this.request(e,{method:"POST",body:JSON.stringify(t)})}async getHomepageSlides(){return this.get("pusmag.my_scripts.pusmag.get_homepage_slides")}async getServices(){return this.get("pusmag.my_scripts.pusmag.get_services")}async getStatistics(){return this.get("pusmag.my_scripts.pusmag.get_statistics")}async getEvents(e={}){return this.get("pusmag.my_scripts.pusmag.get_events",{filters:JSON.stringify(e)})}async getEventDetails(e){return this.get("pusmag.my_scripts.pusmag.get_event_details",{event_id:e})}async getBlogPosts(e={}){return this.get("pusmag.my_scripts.pusmag.get_blog_posts",{...e,filters:JSON.stringify(e)})}async getBlogPosts(e={}){const{limit:t,offset:o,...r}=e;return this.get("pusmag.my_scripts.pusmag.get_blog_posts",{filters:JSON.stringify(r),limit:t,offset:o})}async getBlogPost(e){return this.get("pusmag.my_scripts.pusmag.get_blog_post",{post_id:e})}async getBlogCategories(){return this.get("pusmag.my_scripts.pusmag.get_blog_categories")}async getGalleryImages(e={}){return this.get("pusmag.my_scripts.pusmag.get_gallery_images",{filters:JSON.stringify(e)})}async getGalleryCategories(){return this.get("pusmag.my_scripts.pusmag.get_gallery_categories")}async submitContactForm(e){return this.post("pusmag.my_scripts.pusmag.submit_contact_form",e)}async getContactInfo(){return this.get("pusmag.my_scripts.pusmag.get_contact_info")}async submitRegistration(e){return this.post("pusmag.my_scripts.pusmag.submit_registration",e)}}const g=new S(I);function j(){const a={threshold:.1,rootMargin:"0px 0px -50px 0px"},e=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting&&(o.target.classList.contains("animate-on-scroll")&&o.target.classList.add("animate"),o.target.classList.contains("counter"))){const r=parseInt(o.target.dataset.target||0);A(o.target,r),e.unobserve(o.target)}})},a);document.querySelectorAll(".animate-on-scroll").forEach(t=>{e.observe(t)}),document.querySelectorAll(".counter").forEach(t=>{e.observe(t)}),window.animationObserver=e}function A(a,e,t=2e3){const r=e/(t/16);let s=0;const i=setInterval(()=>{s+=r,s>=e?(a.textContent=e,clearInterval(i)):a.textContent=Math.floor(s)},16)}const p="/ps";async function G(){const a=n=>n==="/"?p:`${p}${n}`,o=new Date().getFullYear()-2023;let r=[],s=[],i=[];try{r=await g.getHomepageSlides(),s=await g.getServices(),i=await g.getStatistics()}catch{console.log("Using fallback data for development"),r=[{title:"Unity, Service, Excellence & Integrity",button_text:"Learn More"}],s=[{title:"Community Building",description:"Fostering unity among Muslim public servants",icon:"users"},{title:"Professional Development",description:"Enhancing skills and career growth",icon:"briefcase"},{title:"Welfare Support",description:"Supporting members in times of need",icon:"heart"}],i=[{label:"Years of Service",value:o},{label:"Active Members",value:500},{label:"Programmes",value:50},{label:"Regions",value:16}]}return`
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
                  Est. 2023
                </span>
              </div>

              <h1 class="text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-white font-medium mb-6 animate-on-scroll" style="animation-delay: 0.2s">
                Unity, Service,
                <span class="gradient-text">Excellence & Integrity.</span>
              </h1>

              <p class="leading-relaxed text-lg font-medium text-white/60 max-w-lg mb-10 animate-on-scroll" style="animation-delay: 0.35s">
                Public Services Muslims Association of Ghana - Building a community of dedicated Muslim public servants committed to excellence and integrity.
              </p>

              <div class="flex flex-wrap gap-6 items-center animate-on-scroll" style="animation-delay: 0.5s">
                <a href="${a("/register")}" class="btn-custom">
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
                  ${[1,2,3].map((n,l)=>`
                    <div class="card-stack-item absolute inset-0 rounded-lg overflow-hidden border border-white/10 shadow-2xl origin-bottom bg-neutral-900"
                         style="transform: translateY(${l*12}px) scale(${1-l*.05}); z-index: ${30-l*10}; opacity: ${1-l*.2};">
                      <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <div class="text-center p-6">
                          <div class="text-4xl font-bold text-white mb-2">${i[l]?.value||(l+1)*100}</div>
                          <div class="text-sm text-white/60">${i[l]?.label||"Metric"}</div>
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Interactive Steps -->
              <div class="flex flex-col gap-3 w-full max-w-xs">
                ${["Join PUSMAG","Attend Events","Make Impact"].map((n,l)=>`
                  <div class="step-item flex cursor-pointer transition-all duration-300 glass rounded-lg p-3 hover:bg-white/10 gap-4 items-center animate-on-scroll" 
                       style="animation-delay: ${.6+l*.1}s">
                    <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-primary-500/20">
                      0${l+1}
                    </div>
                    <span class="text-sm font-medium text-white">${n}</span>
                    <svg class="w-4 h-4 ml-auto text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                `).join("")}
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
            ${s.map((n,l)=>`
              <div class="glass rounded-xl p-8 hover-lift hover-glow animate-on-scroll" style="animation-delay: ${l*.1}s">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${H(n.icon||"users")}
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">${n.title}</h3>
                <p class="text-neutral-400">${n.description}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            ${i.map((n,l)=>`
              <div class="text-center animate-on-scroll" style="animation-delay: ${l*.1}s">
                <div class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500 mb-2 counter" data-target="${n.value}">
                  0
                </div>
                <div class="text-neutral-400 text-sm uppercase tracking-wider">${n.label}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom">
          <div class="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p class="text-xl text-neutral-400 mb-10">
              Become part of a growing network of Muslim public servants dedicated to excellence and service.
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <a href="${a("/register")}" class="btn-custom">
                <span class="inner">Register Now</span>
              </a>
              <a href="${a("/about")}" class="glass px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
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
    <\/script>
  `}function H(a){const e={users:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',briefcase:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',heart:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',star:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>'};return e[a]||e.users}async function z(){return`
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
                              <h3 class="text-2xl font-bold mb-4 text-white">Our Identity</h3>
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
  `}async function _(){return`
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
              <h2 class="text-3xl font-bold mb-4 text-white">Our Mission</h2>
              <p class="text-neutral-400 leading-relaxed">
                To foster unity, promote professional development and provide welfare support for Muslim public servants in Ghana, while upholding the highest standards of service, excellence and integrity.
              </p>
            </div>
            <div class="glass rounded-xl p-8 animate-on-scroll border-l-4 border-accent-500" style="animation-delay: 0.1s">
              <h2 class="text-3xl font-bold mb-4 text-white">Our Vision</h2>
              <p class="text-neutral-400 leading-relaxed">
                To be the leading association of Muslim public servants in Ghana, recognised for excellence in service delivery, professional development and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `}async function T(){return`
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
  `}async function N(){return`
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
  `}async function D(){return`
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
                     <div class="w-16 h-16 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 shadow-lg shadow-primary-500/20">
                        <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                     </div>
                     <h3 class="text-xl font-bold mb-2">General Assembly</h3>
                     <p class="text-neutral-400 text-sm">The highest decision-making body of the association.</p>
                 </div>
                 <div class="glass p-8 rounded-xl text-center animate-on-scroll" style="animation-delay: 0.1s">
                      <div class="w-16 h-16 mx-auto mb-6 bg-accent-500/20 rounded-full flex items-center justify-center text-accent-500 shadow-lg shadow-accent-500/20">
                        <svg class="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                      </div>
                     <h3 class="text-xl font-bold mb-2">Board of Directors</h3>
                     <p class="text-neutral-400 text-sm">A body of eleven experienced Muslim Public Servants who provide oversight and general guidance.</p>
                 </div>
                 <div class="glass p-8 rounded-xl text-center animate-on-scroll" style="animation-delay: 0.2s">
                      <div class="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/20">
                        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </div>
                     <h3 class="text-xl font-bold mb-2">Secretariat</h3>
                     <p class="text-neutral-400 text-sm">Led by an Executive Secretary, managing day-to-day administration and implementing policies.</p>
                 </div>
            </div>
        </div>
       </section>
    </div>
  `}async function F(){return`
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Commitment to Ethics</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll leading-relaxed" style="animation-delay: 0.1s">
            Upholding high ethical behaviour and conduct
          </p>
        </div>
      </section>

       <!-- Commitment to Ethics -->
       <section class="section-padding bg-gradient-to-t from-primary-900/10 to-transparent">
           <div class="container-custom max-w-4xl text-center">
               <div class="glass p-12 rounded-xl animate-on-scroll">
                 <p class="text-xl text-neutral-300 leading-relaxed">
                     PuSMAG is dedicated to maintaining high ethical behaviour and conduct as prescribed by the Public Service Code of Ethics. We actively facilitate conflict management among Members and the Muslim Ummah to maintain harmony and cooperation.
                 </p>
               </div>
           </div>
       </section>
    </div>
  `}function y(a){if(!a)return"";try{const e=new Date(a);return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric"}).format(e)}catch(e){return console.error("Error formatting date:",e),a}}async function R(){const a=t=>t==="/"?p:`${p}${t}`;let e=[];try{e=await g.getEvents()}catch{console.log("Using fallback data"),e=[{id:"agm-2026",title:"Annual General Meeting",date:"2026-03-15",category:"Meeting",description:"Our yearly gathering of all members"},{id:"pdw-2026",title:"Professional Development Workshop",date:"2026-04-20",category:"Workshop",description:"Skills enhancement for public servants"},{id:"outreach-2026",title:"Community Outreach",date:"2026-05-10",category:"Community",description:"Giving back to the community"}]}return`
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
            ${e.map((t,o)=>`
              <div class="glass rounded-xl overflow-hidden hover-lift hover-glow animate-on-scroll" style="animation-delay: ${o*.1}s">
                <div class="h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center overflow-hidden">
                    ${t.image?`<img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">`:`<svg class="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>`}
                </div>
                <div class="p-6">
                  <div class="text-xs text-primary-500 font-semibold mb-2">${t.category||"Event"}</div>
                  <h3 class="text-xl font-semibold mb-2">
                    <a href="${a(`/programmes/${t.id||t.route}`)}" class="hover:text-primary-500 transition-colors">
                        ${t.title}
                    </a>
                  </h3>
                  <p class="text-neutral-400 text-sm mb-4 line-clamp-2">${t.description||""}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <div class="flex items-center gap-2 text-sm text-neutral-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${y(t.date)||"TBA"}</span>
                    </div>
                    <a href="${a(`/programmes/${t.id||t.route}`)}" class="text-xs font-medium text-white bg-white/10 px-3 py-1 rounded-full hover:bg-primary-500 hover:text-black transition-all">
                        Details
                    </a>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    </div>
  `}async function q(a){const{id:e}=a;let t=null;try{t=await g.getEventDetails(e)}catch(o){console.error("Error fetching programme details:",o)}return!t||Object.keys(t).length===0?`
            <div class="pt-32 min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">Programme Not Found</h1>
                    <p class="text-neutral-400">The programme you are looking for does not exist.</p>
                </div>
            </div>
        `:`
    <div class="pt-32 pb-20">
        <!-- Hero Section -->
        <section class="relative h-[50vh] min-h-[400px] flex items-end pb-12">
            ${t.image?`<div class="absolute inset-0">
                    <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>`:'<div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>'}
            
            <div class="container-custom relative z-10">
                <div class="max-w-4xl">
                    <div class="inline-block px-3 py-1 rounded-full bg-primary-500 text-black text-xs font-bold uppercase tracking-wider mb-4 animate-on-scroll">
                        ${t.category}
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-on-scroll" style="animation-delay: 0.1s">
                        ${t.title}
                    </h1>
                    <div class="flex flex-wrap gap-6 text-neutral-300 animate-on-scroll" style="animation-delay: 0.2s">
                        ${t.date?`
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${y(t.date)}</span>
                            </div>
                        `:""}
                        ${t.location?`
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>${t.location}</span>
                            </div>
                        `:""}
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
                            ${t.content||t.description||"<p>No details available.</p>"}
                        </div>
                    </div>
                    
                    <div class="lg:col-span-4">
                        <div class="glass rounded-xl p-8 sticky top-32">
                            <h3 class="text-xl font-bold mb-6">Info</h3>
                            <div class="space-y-4 text-neutral-400">
                                <p>Interested in this programme? Contact us for more details.</p>
                                <a href="/ps/contact" class="btn-custom w-full text-center block">
                                    <span class="inner">Contact Us</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `}const k=a=>a==="/"?p:`${p}${a}`;let d={category:"",search:"",page:1,limit:9},E=1,P=null;window.filterBlogCategory=async(a,e)=>{d.category=a===d.category?"":a,d.page=1,document.querySelectorAll(".blog-category-link").forEach(t=>{t.classList.remove("text-primary-500","font-bold"),t.classList.add("text-neutral-400")}),d.category&&e&&(e.classList.remove("text-neutral-400"),e.classList.add("text-primary-500","font-bold")),await $()};window.handleBlogSearch=a=>{clearTimeout(P),P=setTimeout(async()=>{d.search=a,d.page=1,await $()},500)};window.changeBlogPage=async a=>{a<1||a>E||(d.page=a,await $(),document.getElementById("blog-grid").scrollIntoView({behavior:"smooth"}))};window.handleImageError=a=>{a.onerror=null;const e=a.parentElement;e.innerHTML='<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>'};async function $(){const a=document.getElementById("blog-grid"),e=document.getElementById("blog-pagination");if(a){a.innerHTML='<div class="col-span-full text-center py-20 text-neutral-500">Loading...</div>',e&&(e.innerHTML="");try{const t=(d.page-1)*d.limit,o=await g.getBlogPosts({category:d.category,search:d.search,limit:d.limit,offset:t}),r=o.length===d.limit,s=d.page>1;if(E=r?d.page+1:d.page,o.length===0){a.innerHTML=`
                <div class="col-span-full text-center py-20">
                    <p class="text-xl text-neutral-400 mb-4">No posts found</p>
                    <button onclick="filterBlogCategory('', null); document.getElementById('blog-search').value = ''" class="text-primary-500 hover:underline">
                        Clear all filters
                    </button>
                </div>
            `;return}a.innerHTML=o.map((n,l)=>L(n,l)).join(""),O(s,r),a.querySelectorAll(".animate-on-scroll").forEach((n,l)=>{n.style.animationDelay=`${l*.1}s`,n.offsetWidth,n.classList.add("animate")})}catch{a.innerHTML='<div class="col-span-full text-center py-20 text-red-500">Error loading posts</div>'}}}function O(a,e){const t=document.getElementById("blog-pagination");t&&(t.innerHTML=`
        <div class="flex justify-center items-center gap-4 mt-12">
            <button 
                onclick="window.changeBlogPage(${d.page-1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${a?"text-neutral-300 hover:bg-white/5 hover:text-white":"text-neutral-600 cursor-not-allowed"}"
                ${a?"":"disabled"}
            >
                Previous
            </button>
            <span class="text-neutral-400 text-sm">Page ${d.page}</span>
             <button 
                onclick="window.changeBlogPage(${d.page+1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${e?"text-neutral-300 hover:bg-white/5 hover:text-white":"text-neutral-600 cursor-not-allowed"}"
                ${e?"":"disabled"}
            >
                Next
            </button>
        </div>
    `)}function L(a,e){return`
    <article class="glass rounded-xl overflow-hidden group hover-lift hover-glow animate-on-scroll flex flex-col h-full" style="animation-delay: ${e*.1}s">
        <a href="${k(`/blog/${a.id||e}`)}" class="block h-48 overflow-hidden relative shrink-0">
            ${a.image?`<img src="${a.image}" alt="${a.title}" onerror="window.handleImageError(this)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`:'<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>'}
        </a>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase tracking-wider text-primary-500 font-bold px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                    ${a.category||"General"}
                </span>
                <span class="text-xs text-neutral-500">${y(a.date)||"Recent"}</span>
            </div>
            <h2 class="text-lg font-bold mb-2 leading-tight hover:text-primary-500 transition-colors">
                <a href="${k(`/blog/${a.id||e}`)}">${a.title}</a>
            </h2>
            <p class="text-neutral-400 text-sm mb-4 line-clamp-3 leading-snug flex-grow">${a.excerpt||""}</p>
            <a href="${k(`/blog/${a.id||e}`)}" class="text-primary-500 text-xs font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                Read more <span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
        </div>
    </article>
  `}async function V(){let a=[],e=[];d={category:"",search:"",page:1,limit:9};try{const[o,r]=await Promise.all([g.getBlogPosts({limit:9,offset:0}),g.getBlogCategories()]);a=o,e=r}catch{console.log("Using fallback data"),e=["General","Ramadan","Brotherhood","News"],a=[{title:"Welcome to PUSMAG",excerpt:"Learn about our mission and vision for the future of Muslim public servants in Ghana.",date:"2026-01-01",author:"Admin",category:"General",image:"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"}]}const t=a.length===d.limit;return`
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Blog & News</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Stay updated with the latest news, insights, and stories from PUSMAG
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            <!-- Sidebar -->
            <aside class="lg:col-span-1 space-y-8 h-fit animate-on-scroll sticky top-32">
                <!-- Search -->
                <div class="glass p-6 rounded-xl">
                    <h3 class="text-base font-bold mb-4 uppercase tracking-widest text-neutral-400">Search</h3>
                    <div class="relative">
                        <input 
                            type="text" 
                            id="blog-search"
                            oninput="window.handleBlogSearch(this.value)"
                            placeholder="Search articles..." 
                            class="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        >
                        <svg class="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                <!-- Categories -->
                <div class="glass p-6 rounded-xl">
                    <h3 class="text-base font-bold mb-4 uppercase tracking-widest text-neutral-400">Categories</h3>
                    <ul class="space-y-1">
                        <li>
                             <button 
                                onclick="window.filterBlogCategory('', null)"
                                class="blog-category-link w-full text-left text-sm py-2 px-3 rounded-md hover:bg-white/5 hover:text-primary-500 transition-colors text-primary-500 font-bold cursor-pointer"
                            >
                                All Categories
                            </button>
                        </li>
                        ${e.map(o=>`
                            <li>
                                <button 
                                    onclick="window.filterBlogCategory('${o}', this)"
                                    class="blog-category-link w-full text-left text-sm py-2 px-3 rounded-md text-neutral-400 hover:bg-white/5 hover:text-primary-500 transition-colors cursor-pointer"
                                >
                                    ${o}
                                </button>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </aside>

            <!-- Blog Grid -->
            <div class="lg:col-span-3">
                <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${a.length>0?a.map((o,r)=>L(o,r)).join(""):`
                        <div class="col-span-full text-center py-20">
                            <p class="text-xl text-neutral-400">No posts found</p>
                        </div>
                    `}
                </div>
                
                <!-- Pagination -->
                <div id="blog-pagination">
                     <div class="flex justify-center items-center gap-4 mt-12">
                        <button 
                            class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-neutral-600 cursor-not-allowed"
                            disabled
                        >
                            Previous
                        </button>
                        <span class="text-neutral-400 text-sm">Page 1</span>
                         <button 
                            onclick="window.changeBlogPage(2)"
                            class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${t?"text-neutral-300 hover:bg-white/5 hover:text-white":"text-neutral-600 cursor-not-allowed"}"
                            ${t?"":"disabled"}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  `}async function U(a){const{id:e}=a;let t=null;try{t=await g.getBlogPost(e)}catch(o){console.error("Error fetching blog post:",o)}return!t||Object.keys(t).length===0?`
            <div class="pt-32 min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p class="text-neutral-400">The article you are looking for does not exist.</p>
                </div>
            </div>
        `:`

    <!-- Hero Section with Background Image -->
    <div class="relative min-h-[60vh] flex items-center justify-center pb-20">
        <!-- Background Image -->
        ${t.image?`
            <div class="absolute inset-0 z-0">
                <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover">
                <!-- Dark Overlay with adjusted opacity -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            </div>
        `:`
            <div class="absolute inset-0 z-0 bg-neutral-900">
                <div class="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black"></div>
            </div>
        `}

        <!-- Hero Content -->
        <div class="container relative z-10 text-center pt-32 px-4">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                ${t.category||"News"}
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white max-w-5xl mx-auto leading-tight animate-fade-in-up" style="animation-delay: 0.1s">
                ${t.title}
            </h1>
            
            <div class="flex items-center justify-center gap-6 text-neutral-300 animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-black font-bold text-sm ring-4 ring-white/10">
                        ${(t.author||"A").charAt(0)}
                    </div>
                    <span class="font-medium">${t.author||"Admin"}</span>
                </div>
                <span class="text-neutral-500">•</span>
                <span class="font-medium tracking-wide">${y(t.date)}</span>
            </div>
        </div>
    </div>

    <!-- Content Section -->
    <article class="container max-w-6xl relative z-20 pb-32 -mt-10 mx-auto">
        <div class="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="prose prose-invert prose-lg max-w-none">
                ${t.content||""}
            </div>
        </div>
        
        <!-- Navigation / Share Footer -->
        <div class="mt-12 flex justify-center animate-fade-in-up" style="animation-delay: 0.4s">
            <a href="/ps/blog" class="group flex items-center gap-3 text-neutral-400 hover:text-white transition-all px-6 py-3 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5">
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span class="font-medium">Back to Blog</span>
            </a>
        </div>
    </article>
    `}async function W(){let a=[],e=[];try{const[s,i]=await Promise.all([g.getGalleryImages({limit:100}),g.getGalleryCategories()]);a=s,e=i}catch{console.log("Using fallback data"),a=Array(6).fill(null).map((i,n)=>({id:n,title:"Gallery Image",category:n%2===0?"Events":"Meetings"})),e=["Events","Meetings"]}const o=`
    <div class="pt-32">
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Gallery</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Moments captured from our events and activities
          </p>
        </div>
      </section>

      <section class="section-padding">
        <div class="container-custom">
            ${`
        <div class="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
            <button class="filter-btn active px-6 py-2 rounded-full border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20" data-filter="all">
                All
            </button>
            ${e.map(s=>`
                <button class="filter-btn px-6 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-white transition-all hover:bg-white/10" data-filter="${s}">
                    ${s}
                </button>
            `).join("")}
        </div>
    `}
            
          <div id="gallery-grid" class="columns-1 md:columns-2 lg:columns-4 gap-6 min-h-[50vh] space-y-6">
            ${a.map((s,i)=>`
              <div class="gallery-item break-inside-avoid rounded-xl overflow-hidden hover-lift hover-glow cursor-pointer transition-all duration-500 ease-out relative" 
                   onclick="window.openGalleryLightbox(${i})"
                   data-category="${s.category}"
                   style="animation: fadeIn 0.5s ease-out ${i*.05}s backwards;">
                ${s.image_url?`<img src="${s.image_url}" alt="${s.title}" class="w-full h-auto object-cover transition-transform duration-700 hover:scale-110" loading="lazy">`:`<div class="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                       <svg class="w-16 h-16 text-primary-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                       </svg>
                     </div>`}
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span class="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">${s.category||"General"}</span>
                    <h3 class="text-lg font-bold text-white">${s.title}</h3>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    </div>

    <!-- Lightbox Modal -->
    <div id="gallery-lightbox" class="fixed inset-0 z-[100] hidden bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
        <button onclick="window.closeGalleryLightbox()" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>

        <button onclick="window.prevGalleryImage()" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>
        <button onclick="window.nextGalleryImage()" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>

        <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <img id="lightbox-image" src="" alt="" class="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg pointer-events-auto transition-all duration-300">
            
            <div class="mt-8 text-center pointer-events-auto">
                <span id="lightbox-category" class="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest mb-2 border border-primary-500/30 px-3 py-1 rounded-full"></span>
                <h3 id="lightbox-title" class="text-2xl md:text-3xl font-bold text-white mb-2"></h3>
                <p id="lightbox-counter" class="text-neutral-500 text-sm"></p>
            </div>
        </div>
    </div>
  `;window.galleryData={images:a,currentIndex:0},window.openGalleryLightbox=(s,i=!1)=>{const n=document.getElementById("gallery-lightbox"),l=document.getElementById("lightbox-image"),c=document.getElementById("lightbox-title"),u=document.getElementById("lightbox-category"),v=document.getElementById("lightbox-counter"),m=()=>{window.galleryData.currentIndex=s;const h=window.galleryData.images[s];h.image_url?l.src=h.image_url:l.src="placeholder",c.textContent=h.title||"Untitled",u.textContent=h.category||"General";const b=document.querySelector(".filter-btn.active").dataset.filter,f=b==="all"?window.galleryData.images:window.galleryData.images.filter(w=>w.category===b),x=f.findIndex(w=>w.id===h.id);v.textContent=`${x+1} / ${f.length}`};i?(l.classList.add("animate-gallery-fade-out"),setTimeout(()=>{l.classList.remove("animate-gallery-fade-out"),m(),l.classList.add("animate-gallery-fade-in"),setTimeout(()=>l.classList.remove("animate-gallery-fade-in"),300)},300)):m(),n.classList.remove("hidden"),document.body.style.overflow="hidden"},window.closeGalleryLightbox=()=>{const s=document.getElementById("gallery-lightbox");s&&(s.classList.add("hidden"),document.body.style.overflow="")},window.nextGalleryImage=()=>{const s=document.querySelector(".filter-btn.active").dataset.filter,i=s==="all"?window.galleryData.images:window.galleryData.images.filter(m=>m.category===s),n=window.galleryData.images[window.galleryData.currentIndex].id;let c=(i.findIndex(m=>m.id===n)+1)%i.length;const u=i[c],v=window.galleryData.images.findIndex(m=>m.id===u.id);window.openGalleryLightbox(v,!0)},window.prevGalleryImage=()=>{const s=document.querySelector(".filter-btn.active").dataset.filter,i=s==="all"?window.galleryData.images:window.galleryData.images.filter(m=>m.category===s),n=window.galleryData.images[window.galleryData.currentIndex].id;let c=(i.findIndex(m=>m.id===n)-1+i.length)%i.length;const u=i[c],v=window.galleryData.images.findIndex(m=>m.id===u.id);window.openGalleryLightbox(v,!0)};const r=s=>{s.key==="Escape"&&window.closeGalleryLightbox(),s.key==="ArrowRight"&&window.nextGalleryImage(),s.key==="ArrowLeft"&&window.prevGalleryImage()};return document.removeEventListener("keydown",r),document.addEventListener("keydown",r),setTimeout(()=>{const s=document.querySelectorAll(".filter-btn"),i=document.querySelectorAll(".gallery-item");s.forEach(n=>{n.addEventListener("click",()=>{s.forEach(c=>{c.classList.remove("active","bg-white/10","text-white"),c.classList.add("text-neutral-400")}),n.classList.add("active","bg-white/10","text-white"),n.classList.remove("text-neutral-400");const l=n.dataset.filter;i.forEach(c=>{const u=c.dataset.category;l==="all"||u===l?(c.style.display="block",c.style.animation="none",c.offsetHeight,c.style.animation="zoomIn 0.4s ease-out forwards"):c.style.display="none"})})})},0),o}async function J(){return`
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
    <\/script>
  `}window.addMembershipRow=()=>{const a=document.getElementById("memberships-container");if(!a)return;const e=document.createElement("div");e.className="membership-row grid grid-cols-12 gap-2 p-2 border-t border-white/5",e.innerHTML=`
        <div class="col-span-4">
            <input type="text" placeholder="e.g. Accountant" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-4">
            <input type="text" placeholder="e.g. ICA Ghana" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Num" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <button type="button" onclick="this.closest('.membership-row').remove()" class="text-red-500 hover:text-red-400 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    `,a.appendChild(e)};window.validateField=a=>{a.hasAttribute("required")&&!a.value?(a.classList.add("border-red-500/50","ring-2","ring-red-500/20"),a.classList.remove("border-white/10")):(a.classList.remove("border-red-500/50","ring-2","ring-red-500/20"),a.classList.add("border-white/10"))};window.resetRegistrationForm=()=>{const a=document.getElementById("registration-form");a&&(a.reset(),a.querySelectorAll("input, select, textarea").forEach(r=>{r.classList.remove("border-red-500/50","ring-2","ring-red-500/20"),r.classList.add("border-white/10")}));const e=document.getElementById("memberships-container");e&&(e.innerHTML="");const t=document.getElementById("form-message");t&&(t.classList.add("hidden"),t.textContent="");const o=document.getElementById("remove-photo-btn");o&&o.classList.add("hidden")};window.handlePhotoChange=a=>{const e=document.getElementById("remove-photo-btn");a.target.files.length>0?e.classList.remove("hidden"):e.classList.add("hidden")};window.removePhoto=()=>{const a=document.querySelector('input[name="photo"]');if(a){a.value="";const e=document.getElementById("remove-photo-btn");e&&e.classList.add("hidden")}};window.handleRegistrationSubmit=async a=>{a.preventDefault();const e=a.target,t=document.getElementById("form-message");if(!e.checkValidity()){t.textContent="Please complete all required fields.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden"),e.querySelectorAll("[required]").forEach(c=>{c.value||(c.classList.add("border-red-500/50","ring-2","ring-red-500/20"),c.classList.remove("border-white/10"))}),t.scrollIntoView({behavior:"smooth",block:"center"});return}const o=e.querySelector('button[type="submit"]'),r=o.innerHTML;o.innerHTML='<span class="inner">Processing...</span>',o.disabled=!0,t.classList.add("hidden"),t.textContent="";const s=new FormData(e),i=Object.fromEntries(s),n=e.querySelector('input[name="photo"]');if(n&&n.files.length>0){const c=n.files[0],u=["jpg","jpeg","png"],v=c.name.split(".").pop().toLowerCase();if(!u.includes(v)){t.textContent="Invalid file type. Please upload a JPG, JPEG, or PNG image.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden"),o.innerHTML=r,o.disabled=!1;return}const m=2*1024*1024;if(c.size>m){t.textContent="File size is too large. Maximum size allowed is 2MB.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden"),o.innerHTML=r,o.disabled=!1;return}try{const h=await new Promise((b,f)=>{const x=new FileReader;x.onload=()=>b(x.result),x.onerror=f,x.readAsDataURL(c)});i.photo={filename:c.name,data:h.split(",")[1]}}catch(h){console.error("File read error",h)}}else delete i.photo;const l=[];document.querySelectorAll(".membership-row").forEach(c=>{const u=c.querySelectorAll("input");u[0].value&&l.push({profession:u[0].value,professional_body:u[1].value,membership_number:u[2].value})}),l.length>0&&(i.professional_memberships=JSON.stringify(l));try{await g.submitRegistration(i),t.textContent="Thank you for registering! We will contact you soon.",t.className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 mb-6",t.classList.remove("hidden"),window.resetRegistrationForm(),t.scrollIntoView({behavior:"smooth",block:"center"})}catch(c){console.error(c),t.textContent=c.message||"Sorry, there was an error processing your registration.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden")}finally{o.innerHTML=r,o.disabled=!1}};async function Y(){return`
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Become a Member</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Join the Public Services Muslims Association of Ghana today
          </p>
        </div>
      </section>

      <!-- Registration Form -->
      <section class="section-padding">
        <div class="container max-w-4xl mx-auto px-6">
          <div id="form-message" class="hidden"></div>
          
          <form id="registration-form" onsubmit="window.handleRegistrationSubmit(event)" novalidate class="glass rounded-xl p-8 space-y-8 animate-on-scroll">
            
            <style>
              /* Theme aligned select elements */
              select {
                background-color: rgba(0, 0, 0, 0.4);
                color: white;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
              }
              
              select option {
                background-color: #1a1a1a;
                color: white;
              }
            </style>

            <!-- Personal Details -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Personal Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Title *</label>
                    <select name="title" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Ing.">Ing.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Alhaji">Alhaji</option>
                        <option value="Hajia">Hajia</option>
                    </select>
                  </div>
                  <div class="md:col-span-2"></div> <!-- Spacer -->
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">First Name *</label>
                    <input type="text" name="first_name" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Middle Name</label>
                    <input type="text" name="middle_name" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Surname *</label>
                    <input type="text" name="surname" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Gender *</label>
                    <select name="gender" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                  </div>
                   <div>
                    <label class="block text-sm font-medium mb-2">Date of Birth</label>
                    <input type="date" name="date_of_birth" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all text-white scheme-dark">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">GhanaCard Number *</label>
                    <input type="text" name="ghanacard_number" required onblur="window.validateField(this)" placeholder="GHA-000000000-0" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  
                  <!-- Photo Upload -->
                   <div class="md:col-span-3">
                    <label class="block text-sm font-medium mb-2">Passport Photo</label>
                    <div class="flex items-center gap-4">
                        <input type="file" name="photo" id="photo-input" onchange="window.handlePhotoChange(event)" accept=".jpg,.jpeg,.png" class="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-500 hover:file:bg-primary-500/20">
                        <button type="button" id="remove-photo-btn" onclick="window.removePhoto()" class="hidden px-4 py-3 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-bold uppercase tracking-wider">
                            Remove
                        </button>
                    </div>
                    <p class="text-xs text-neutral-500 mt-2">Maximum size: 2MB. Format: JPG, JPEG, PNG.</p>
                  </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Contact Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">Mobile Number *</label>
                      <input type="tel" name="mobile" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Email Address *</label>
                      <input type="email" name="email" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                </div>
            </div>

            <!-- Professional Information -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Professional Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">Institution (MDA/MMDA) *</label>
                      <input type="text" name="institution" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Designation *</label>
                      <input type="text" name="designation" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Region *</label>
                      <select name="region" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select Region</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                        <option value="Eastern">Eastern</option>
                        <option value="Central">Central</option>
                        <option value="Northern">Northern</option>
                        <option value="Upper East">Upper East</option>
                        <option value="Upper West">Upper West</option>
                        <option value="Volta">Volta</option>
                        <option value="Bono">Bono</option>
                        <option value="Bono East">Bono East</option>
                        <option value="Ahafo">Ahafo</option>
                        <option value="Savannah">Savannah</option>
                        <option value="North East">North East</option>
                        <option value="Oti">Oti</option>
                        <option value="Western North">Western North</option>
                      </select>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Skills/Expertise</label>
                    <textarea name="skills" rows="3" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all"></textarea>
                </div>

                <!-- Professional Memberships -->
                <div>
                     <label class="block text-sm font-medium mb-2">Professional Memberships</label>
                     <div class="bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-4">
                        <div class="grid grid-cols-12 gap-2 p-3 bg-white/5 text-xs uppercase font-bold text-neutral-400">
                            <div class="col-span-4">Profession</div>
                            <div class="col-span-4">Professional Body</div>
                            <div class="col-span-3">Membership No.</div>
                            <div class="col-span-1"></div>
                        </div>
                        <div id="memberships-container">
                            <!-- Rows will be added here -->
                        </div>
                     </div>
                     <button type="button" onclick="window.addMembershipRow()" class="text-sm text-primary-500 hover:text-primary-400 font-medium flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Membership
                     </button>
                </div>
            </div>

            <div class="flex gap-4 pt-4">
                <button type="button" onclick="window.resetRegistrationForm()" class="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white font-medium flex-1">
                    Reset
                </button>
                <button type="submit" class="btn-custom flex-[2]">
                  <span class="inner">Submit Registration</span>
                </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `}function C(a){const e=s=>s==="/"?p:`${p}${s}`,t=[{path:e("/"),label:"Home"},{label:"Who We Are",children:[{path:e("/about"),label:"About Us"},{path:e("/mission-vision"),label:"Mission & Vision"},{path:e("/guiding-principles"),label:"Guiding Principles"},{path:e("/objectives"),label:"Objectives"},{path:e("/governance"),label:"Governance"},{path:e("/ethics"),label:"Ethics"}]},{path:e("/programmes"),label:"Programmes"},{path:e("/blog"),label:"Blog"},{path:e("/gallery"),label:"Gallery"},{path:e("/contact"),label:"Contact"}],o=s=>a===s?"text-white":"text-neutral-400",r=s=>s.some(i=>i.path===a)?"text-white":"text-neutral-400";return`
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div class="container-custom">
        <div class="flex justify-between items-center py-6">
          <!-- Logo -->
          <a href="${e("/")}" class="flex items-center gap-3 group">
            <img src="/files/pusmag_logo_small_01.png" alt="PUSMAG Logo" class="w-10 h-10 object-contain">
            <span class="text-lg font-semibold tracking-tight text-white">PuSMAG</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            ${t.map(s=>s.children?`
                        <div class="relative group">
                            <button class="flex items-center gap-1 text-xs font-medium tracking-widest uppercase hover:text-white transition-colors ${r(s.children)}">
                                ${s.label}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div class="absolute left-0 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                <div class="bg-neutral-900 border border-white/10 rounded-lg p-2 shadow-xl">
                                    ${s.children.map(i=>`
                                        <a href="${i.path}" class="block px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors ${o(i.path)}">
                                            ${i.label}
                                        </a>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    `:`
                    <a href="${s.path}" class="text-xs font-medium tracking-widest uppercase hover:text-white transition-colors ${o(s.path)}">
                        ${s.label}
                    </a>
                `).join("")}
          </div>

          <!-- CTA Button -->
          <div class="hidden md:flex items-center gap-6">
            <a href="${e("/register")}" class="btn-custom">
              <span class="inner">Register</span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden pb-6">
          ${t.map(s=>s.children?`
                    <div class="py-3 border-b border-white/5">
                        <span class="block text-sm font-medium text-neutral-400 mb-2">${s.label}</span>
                        <div class="pl-4 space-y-2">
                            ${s.children.map(i=>`
                                <a href="${i.path}" class="block py-2 text-sm ${o(i.path)} hover:text-white transition-colors">
                                    ${i.label}
                                </a>
                            `).join("")}
                        </div>
                    </div>
                  `:`
                <a href="${s.path}" class="block py-3 text-sm font-medium ${o(s.path)} hover:text-white transition-colors border-b border-white/5 last:border-0">
                    ${s.label}
                </a>
              `).join("")}
          <a href="${e("/register")}" class="block mt-4">
            <span class="btn-custom inline-block">
              <span class="inner">Register</span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  `}function B(){const a=e=>e==="/"?p:`${p}${e}`;return`
    <footer class="bg-neutral-900 border-t border-white/10 mt-32">
      <div class="container-custom py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- About Column -->
          <div>
            <h3 class="text-lg font-semibold mb-4">About PUSMAG</h3>
            <p class="text-neutral-400 text-sm leading-relaxed mb-4">
              Public Services Muslims Association of Ghana - Unity, Service, Excellence & Integrity
            </p>
            <div class="flex gap-4">
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              <a href="#" class="text-neutral-400 hover:text-primary-500 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="${a("/about")}" class="text-neutral-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="${a("/programmes")}" class="text-neutral-400 hover:text-white transition-colors text-sm">Programmes</a></li>
              <li><a href="${a("/blog")}" class="text-neutral-400 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="${a("/gallery")}" class="text-neutral-400 hover:text-white transition-colors text-sm">Gallery</a></li>
            </ul>
          </div>

          <!-- Membership -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Membership</h3>
            <ul class="space-y-2">
              <li><a href="${a("/register")}" class="text-neutral-400 hover:text-white transition-colors text-sm">Become a Member</a></li>
              <li><a href="#" class="text-neutral-400 hover:text-white transition-colors text-sm">Benefits</a></li>
              <li><a href="#" class="text-neutral-400 hover:text-white transition-colors text-sm">Pay Dues</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <div class="space-y-3 text-sm text-neutral-400">
              <div class="flex items-start gap-2">
                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+(233) 50 175 6250</span>
              </div>
              <div class="flex items-start gap-2">
                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>info@pusmag.org</span>
              </div>
              <div class="flex items-start gap-2">
                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Monday - Friday: 8am-5pm</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-neutral-400 text-sm">
            © ${new Date().getFullYear()} Public Services Muslims Association of Ghana. All Rights Reserved.
          </p>
          <div class="flex gap-6 text-sm text-neutral-400">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  `}const K={"/":G,"/about":z,"/mission-vision":_,"/guiding-principles":T,"/objectives":N,"/governance":D,"/ethics":F,"/programmes":R,"/programmes/:id":q,"/blog":V,"/blog/:id":U,"/gallery":W,"/contact":J,"/register":Y};class Q{constructor(){this.currentPath=window.location.pathname}init(){this.handleRoute()}navigate(e){window.history.pushState({},"",e),this.currentPath=e,this.handleRoute()}handleRoute(){let e=window.location.pathname;e.startsWith(p)&&(e=e.substring(p.length)),e.startsWith("/")||(e="/"+e),this.currentPath=e;let t=null,o={};for(const[r,s]of Object.entries(K)){const i=this.matchRoute(r,e);if(i){t=s,o=i.params;break}}t?this.render(t,o):(console.log("No route matched for:",e),this.render404()),window.scrollTo(0,0)}matchRoute(e,t){if(e==="/"&&t==="/")return{params:{}};if(e==="/"&&t!=="/")return null;const o=e.split("/").filter(Boolean),r=t.split("/").filter(Boolean);if(o.length!==r.length)return null;const s={};for(let i=0;i<o.length;i++)if(o[i].startsWith(":")){const n=o[i].slice(1);s[n]=r[i]}else if(o[i]!==r[i])return null;return{params:s}}async render(e,t={}){const o=document.getElementById("app");if(!document.getElementById("navbar")){o.innerHTML=`
              <div id="navbar"></div>
              <main id="main-content" class="min-h-screen"></main>
              <div id="footer"></div>
            `;const s=document.getElementById("navbar");s.innerHTML=C(window.location.pathname);const i=document.getElementById("footer");i.innerHTML=B()}const r=document.getElementById("main-content");try{const s=await e(t);r.innerHTML=s}catch(s){console.error("Error rendering page:",s),r.innerHTML='<div class="pt-32 text-center text-red-500">Error loading content. Please try again.</div>'}setTimeout(()=>j(),100),this.updateNavbarActiveState()}updateNavbarActiveState(){const e=document.querySelectorAll("nav a"),t=window.location.pathname;e.forEach(o=>{o.getAttribute("href")===t?(o.classList.add("text-white"),o.classList.remove("text-neutral-400")):(o.classList.remove("text-white"),o.classList.add("text-neutral-400"))})}render404(){const e=document.getElementById("app");document.getElementById("navbar")||(e.innerHTML=`
                <div id="navbar"></div>
                <main id="main-content"></main>
                 <div id="footer"></div>
            `,document.getElementById("navbar").innerHTML=C(window.location.pathname),document.getElementById("footer").innerHTML=B());const t=document.getElementById("main-content");t.innerHTML=`
          <div class="min-h-screen flex items-center justify-center pt-20">
            <div class="text-center">
              <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">404</h1>
              <p class="text-xl mb-8 text-neutral-400">Page not found</p>
              <a href="${p}/" class="btn-custom">
                <span class="inner">Go Home</span>
              </a>
            </div>
          </div>
        `}}const M=new Q;window.onerror=function(a,e,t,o,r){const s=`
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; color: #ff5555; z-index: 9999; padding: 20px; font-family: monospace; overflow: auto;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">Startup Error</h2>
            <div style="margin-bottom: 10px;"><strong>Message:</strong> ${a}</div>
            <div style="margin-bottom: 10px;"><strong>File:</strong> ${e}:${t}:${o}</div>
            <pre style="background: #1a1a1a; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${r?.stack||"No stack trace available"}</pre>
        </div>
    `;document.body.innerHTML+=s,console.error("Global error:",r)};try{document.addEventListener("DOMContentLoaded",()=>{M.init(),j(),document.addEventListener("click",a=>{const e=a.target.closest('a[href^="/"]');if(e){a.preventDefault();const t=e.getAttribute("href");M.navigate(t)}}),window.addEventListener("popstate",()=>{M.handleRoute()})})}catch(a){console.error("Initialization error:",a),window.onerror(a.message,"main.js",0,0,a)}
