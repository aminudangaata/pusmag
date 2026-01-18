(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const oe="modulepreload",re=function(s){return"/assets/pusmag/"+s},O={},W=function(e,t,o){let a=Promise.resolve();if(t&&t.length>0){let d=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};var n=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),i=l?.nonce||l?.getAttribute("nonce");a=d(t.map(u=>{if(u=re(u),u in O)return;O[u]=!0;const h=u.endsWith(".css"),p=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":oe,h||(g.as="script"),g.crossOrigin="",g.href=u,i&&g.setAttribute("nonce",i),document.head.appendChild(g),h)return new Promise((b,m)=>{g.addEventListener("load",b),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return a.then(l=>{for(const i of l||[])i.status==="rejected"&&r(i.reason);return e().catch(r)})},ne=window.location.origin;class le{constructor(e){this.baseURL=e,this.csrfToken=null}async request(e,t={}){const o=e.startsWith("http"),a=o?e:`${this.baseURL}/api/method/${e}`,r=o?{}:{"Content-Type":"application/json",Accept:"application/json"};if(!o&&t.method==="POST"){r["Content-Type"]="application/json";const l=this.getCSRFToken();l&&(r["X-Frappe-CSRF-Token"]=l)}const n={headers:r,credentials:o?"omit":"include",...t};try{const l=await fetch(a,n);if(!l.ok){let d=`HTTP error! status: ${l.status}`;try{const u=await l.json();if(u.exception)u.exception.includes("AuthenticationError")?d="Invalid email or password. Please try again.":d=u.exception.split(":").pop().trim();else if(u._server_messages){const h=JSON.parse(u._server_messages);d=JSON.parse(h[0]).message}}catch{l.status===401&&(d="Invalid email or password. Please try again.")}throw new Error(d)}const i=await l.json();return i.message?i.message:i}catch(l){throw console.error("API request failed:",l),l}}async get(e,t={}){const o=new URLSearchParams(t).toString(),a=o?`${e}?${o}`:e;return this.request(a,{method:"GET"})}async post(e,t={}){return this.request(e,{method:"POST",body:JSON.stringify(t)})}async getHomepageSlides(){return this.get("pusmag.my_scripts.pusmag.get_homepage_slides")}async getServices(){return this.get("pusmag.my_scripts.pusmag.get_services")}async getStatistics(){return this.get("pusmag.my_scripts.pusmag.get_statistics")}async getVerseOfTheDay(){try{this._surahsCache||(this._surahsCache=await this.request("https://quranapi.pages.dev/api/surah.json"));const e=this._surahsCache;if(!Array.isArray(e)||e.length===0)return null;const t=new Date,o=t.getFullYear()*1e4+(t.getMonth()+1)*100+t.getDate(),a=o%e.length,r=e[a],n=a+1,l=(o*31+n)%r.totalAyah+1;return await this.request(`https://quranapi.pages.dev/api/${n}/${l}.json`)}catch(e){return console.error("Quran API failed:",e),null}}async getEvents(e={}){return this.get("pusmag.my_scripts.pusmag.get_events",{filters:JSON.stringify(e)})}async getEventDetails(e){return this.get("pusmag.my_scripts.pusmag.get_event_details",{event_id:e})}async getBlogPosts(e={}){const{category:t,search:o,limit:a,offset:r}=e;return this.get("pusmag.my_scripts.pusmag.get_blog_posts",{filters:JSON.stringify({category:t,search:o}),limit:a,offset:r})}async getBlogPost(e){return this.get("pusmag.my_scripts.pusmag.get_blog_post",{post_id:e})}async getBlogCategories(){return this.get("pusmag.my_scripts.pusmag.get_blog_categories")}async getGalleryImages(e={}){return this.get("pusmag.my_scripts.pusmag.get_gallery_images",{filters:JSON.stringify(e)})}async getGalleryCategories(){return this.get("pusmag.my_scripts.pusmag.get_gallery_categories")}async submitContactForm(e){return this.post("pusmag.my_scripts.pusmag.submit_contact_form",e)}async getContactInfo(){return this.get("pusmag.my_scripts.pusmag.get_contact_info")}async submitRegistration(e){return this.post("pusmag.my_scripts.pusmag.submit_registration",e)}async login(e,t){return this.post("login",{usr:e,pwd:t})}async logout(){return this.post("logout")}async send2FACode(e){return this.post("pusmag.my_scripts.pusmag_portal.send_2fa_code",{email:e})}async verify2FACode(e,t){return this.post("pusmag.my_scripts.pusmag_portal.verify_2fa_code",{email:e,code:t})}async resetPassword(e){return this.post("pusmag.my_scripts.pusmag_portal.reset_password",{email:e})}async getCurrentUser(){return this.get("frappe.auth.get_logged_user")}async getUserInfo(){const e=await this.get("pusmag.my_scripts.pusmag_portal.get_user_info");return e&&e.csrf_token&&(this.csrfToken=e.csrf_token,window.csrf_token=e.csrf_token),e}async getPortalStats(){return this.get("pusmag.my_scripts.pusmag_portal.get_portal_stats")}async getMemberDirectory(e={}){const{limit:t,offset:o,...a}=e;return this.get("pusmag.my_scripts.pusmag_portal.get_member_directory",{filters:JSON.stringify(a),limit:t,offset:o})}async getPendingRegistrations(){return this.get("pusmag.my_scripts.pusmag_portal.get_pending_registrations")}async approveRegistration(e){return this.post("pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.approve_registration",{registration_name:e})}async rejectRegistration(e,t){return this.post("pusmag.pusmag.doctype.ps_member_registration.ps_member_registration.reject_registration",{registration_name:e,reason:t})}async getUserBlogPosts(e=""){return this.get("pusmag.my_scripts.pusmag_portal.get_user_blog_posts",{search:e})}async getBlogPostDetails(e){return this.get("pusmag.my_scripts.pusmag_portal.get_blog_post_details",{post_id:e})}async saveBlogPost(e){return this.post("pusmag.my_scripts.pusmag_portal.save_blog_post",{post_data:e})}async deleteBlogPost(e){return this.post("pusmag.my_scripts.pusmag_portal.delete_blog_post",{name:e})}async cancelDeleteRequest(e){return this.post("pusmag.my_scripts.pusmag_portal.cancel_delete_request",{name:e})}async getMemberDetails(e){return this.get("pusmag.my_scripts.pusmag_portal.get_member_details",{member_name:e})}async getPortalProgrammes(){return this.get("pusmag.my_scripts.pusmag_portal.get_portal_programmes")}async saveProgramme(e){return this.post("pusmag.my_scripts.pusmag_portal.save_programme",{programme_data:e})}async deleteProgramme(e){return this.post("pusmag.my_scripts.pusmag_portal.delete_programme",{name:e})}async getPortalGallery(){return this.get("pusmag.my_scripts.pusmag_portal.get_portal_gallery")}async saveGalleryImage(e){return this.post("pusmag.my_scripts.pusmag_portal.save_gallery_image",{image_data:e})}async deleteGalleryImage(e){return this.post("pusmag.my_scripts.pusmag_portal.delete_gallery_image",{name:e})}async uploadFile(e){const t=new FormData;t.append("file",e,e.name),t.append("file_name",e.name),t.append("from_form","1"),t.append("is_private","0"),t.append("folder","Home/Attachments");const o=`${this.baseURL}/api/method/upload_file`,a=await fetch(o,{method:"POST",headers:{"X-Frappe-CSRF-Token":this.getCSRFToken()||""},body:t,credentials:"include"});if(!a.ok){let n="File upload failed";try{const l=await a.json();if(l._server_messages){const i=JSON.parse(l._server_messages);n=JSON.parse(i[0]).message}else l.message&&(n=l.message)}catch{n=`Upload failed with status: ${a.status}`}throw new Error(n)}const r=await a.json();if(r.message&&r.message.file_url)return r.message.file_url;throw new Error("File upload failed: No file URL returned")}getCSRFToken(){if(this.csrfToken)return this.csrfToken;if(window.csrf_token&&window.csrf_token!=="{{ csrf_token }}")return window.csrf_token;const e=document.cookie.split("; ").find(o=>o.startsWith("frappe_csrftoken="));if(e)return e.split("=")[1];const t=document.querySelector('meta[name="csrf-token"]');return t?t.getAttribute("content"):null}}const c=new le(ne),J=Object.freeze(Object.defineProperty({__proto__:null,api:c},Symbol.toStringTag,{value:"Module"}));function B(){const s={threshold:.1,rootMargin:"0px 0px -50px 0px"},e=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting&&(o.target.classList.contains("animate-on-scroll")&&o.target.classList.add("animate"),o.target.classList.contains("counter"))){const a=parseInt(o.target.dataset.target||0);ie(o.target,a),e.unobserve(o.target)}})},s);document.querySelectorAll(".animate-on-scroll").forEach(t=>{e.observe(t)}),document.querySelectorAll(".counter").forEach(t=>{e.observe(t)}),de(),window.animationObserver=e}function ie(s,e,t=2e3){const a=e/(t/16);let r=0;const n=setInterval(()=>{r+=a,r>=e?(s.textContent=e,clearInterval(n)):s.textContent=Math.floor(r)},16)}function de(){const s=document.querySelectorAll("img[data-src]"),e=new IntersectionObserver((t,o)=>{t.forEach(a=>{if(a.isIntersecting){const r=a.target;r.src=r.dataset.src;const n=()=>{r.classList.add("opacity-100"),r.classList.remove("opacity-0"),r.removeAttribute("data-src")};r.complete?n():r.onload=n,o.unobserve(r)}})},{threshold:.1,rootMargin:"0px 0px 200px 0px"});s.forEach(t=>e.observe(t))}const M="";async function ce(){const s=l=>l==="/"?"/":`${M}${l}`,o=new Date().getFullYear()-2023;let a=[],r=[],n=[];try{a=await c.getHomepageSlides(),r=await c.getServices(),n=await c.getStatistics()}catch{console.log("Using fallback data for development"),a=[{title:"Unity, Service, Excellence & Integrity",button_text:"Learn More"}],r=[{title:"Community Building",description:"Fostering unity among Muslim public servants",icon:"users"},{title:"Professional Development",description:"Enhancing skills and career growth",icon:"briefcase"},{title:"Welfare Support",description:"Supporting members in times of need",icon:"heart"}],n=[{label:"Years of Service",value:o},{label:"Active Members",value:500},{label:"Programmes",value:50},{label:"Regions",value:16}]}return`
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

              <p class="leading-relaxed text-lg text-white/60 max-w-lg mb-10 animate-on-scroll" style="animation-delay: 0.35s">
                Public Services Muslims Association of Ghana - Building a community of dedicated Muslim public servants committed to excellence and integrity.
              </p>

              <div class="flex flex-wrap gap-6 items-center animate-on-scroll" style="animation-delay: 0.5s">
                <a href="${s("/register")}" class="btn-custom">
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
                  ${[1,2,3].map((l,i)=>`
                    <div class="card-stack-item absolute inset-0 rounded-lg overflow-hidden border border-white/10 shadow-2xl origin-bottom bg-neutral-900"
                         style="transform: translateY(${i*12}px) scale(${1-i*.05}); z-index: ${30-i*10}; opacity: ${1-i*.2};">
                      <div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                        <div class="text-center p-6">
                          <div class="animate-on-scroll" style="animation-delay: 0.6s">
                            <a href="/files/PuSMAG_Constitution.pdf" target="_blank" class="inline-flex items-center gap-4 group">
                              <div class="relative">
                                <!-- Pulsating attention grabber -->
                                <div class="absolute -inset-2 bg-primary-500/20 rounded-full animate-ping opacity-75"></div>
                                <div class="absolute -inset-1 bg-primary-500/10 rounded-full animate-pulse-slow"></div>
                                
                                <div class="relative w-12 h-12 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-primary-500/50 transition-all duration-300">
                                  <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                              </div>
                              <div class="flex flex-col">
                                <span class="text-[10px] font-bold tracking-widest uppercase text-primary-500/60 group-hover:text-primary-500 transition-colors">Official Document</span>
                                <span class="text-sm font-medium text-neutral-300 group-hover:text-primary-500 transition-colors">Read our Constitution</span>
                              </div>
                            </a>
                          </div>

                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Interactive Steps -->
              <div class="flex flex-col gap-3 w-full max-w-xs">
                ${["Join PUSMAG","Attend Events","Make Impact"].map((l,i)=>`
                  <div class="step-item flex cursor-pointer transition-all duration-300 glass rounded-lg p-3 hover:bg-white/10 gap-4 items-center animate-on-scroll" 
                       style="animation-delay: ${.6+i*.1}s">
                    <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-primary-500/20">
                      0${i+1}
                    </div>
                    <span class="text-sm font-medium text-white">${l}</span>
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
            ${r.map((l,i)=>`
              <div class="glass rounded-xl p-8 hover-lift hover-glow animate-on-scroll" style="animation-delay: ${i*.1}s">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${ue(l.icon||"users")}
                  </svg>
                </div>
                <h3 class="text-xl font-semibold mb-3">${l.title}</h3>
                <p class="text-neutral-400">${l.description}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="section-padding">
        <div class="container-custom">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            ${n.map((l,i)=>`
              <div class="text-center animate-on-scroll" style="animation-delay: ${i*.1}s">
                <div class="text-5xl md:text-6xl font-bold text-white mb-2 counter" data-target="${l.value}">
                  0
                </div>
                <div class="text-neutral-400 text-sm uppercase tracking-wider">${l.label}</div>
              </div>
            `).join("")}
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
              <a href="${s("/register")}" class="btn-custom">
                <span class="inner">Register Now</span>
              </a>
              <a href="${s("/about")}" class="glass px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
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
  `}function ue(s){const e={users:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',briefcase:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',heart:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',star:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>'};return e[s]||e.users}async function me(){return`
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
  `}async function pe(){return`
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
  `}async function ge(){return`
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
             <div class="glass p-6 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-3 text-neutral-300">Unity</h3>
                        <p class="text-sm text-neutral-400 leading-relaxed">
                            The Association is dedicated to fostering a spirit of unity, tolerance, and cooperation among Muslim public servants, the broader Muslim community, and the general public in Ghana.
                        </p>
                    </div>
                </div>
            </div>

            <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.1s">
                <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-3 text-neutral-300">Service</h3>
                        <p class="text-sm text-neutral-400 leading-relaxed">
                            PuSMAG is committed to promoting the general welfare and socioreligious development of its members and the Muslim community through collaborative projects and mentorship.
                        </p>
                    </div>
                </div>
            </div>

             <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.2s">
                 <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-3 text-neutral-300">Excellence</h3>
                        <p class="text-sm text-neutral-400 leading-relaxed">
                            Members strive for excellent public service delivery and professional advancement by facilitating access to training and nurturing young Muslims to reach the heights of their careers.
                        </p>
                    </div>
                </div>
            </div>

            <div class="glass p-8 rounded-xl animate-on-scroll hover:bg-neutral-800/50 transition-colors" style="animation-delay: 0.3s">
                <div class="flex items-start gap-4">
                     <div class="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0">
                        <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-3 text-neutral-300">Integrity</h3>
                        <p class="text-sm text-neutral-400 leading-relaxed">
                            The Association maintains the highest standards of accountability and ethical conduct as prescribed by both the principles of Islam and the Public Service Code of Ethics.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `}async function he(){return`
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
                     <h3 class="text-xl font-bold mb-3 text-accent-400">Empowerment & Education</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Facilitating access to educational and training opportunities and assisting Members with continuous professional development.
                     </p>
                </div>
                 <!-- Card 4 -->
                 <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform" style="animation-delay: 0.3s">
                     <h3 class="text-xl font-bold mb-3 text-primary-400">Mentorship</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Nurturing the next generation by providing guidance to the Ghana Muslim Students Association (GMSA) and helping young Muslims reach greater heights in their careers.
                     </p>
                </div>
                 <!-- Card 5 -->
                 <div class="glass p-6 rounded-xl animate-on-scroll group hover:scale-[1.02] transition-transform md:col-span-2 lg:col-span-1" style="animation-delay: 0.4s">
                     <h3 class="text-xl font-bold mb-3 text-primary-400">Community Collaboration</h3>
                     <p class="text-neutral-400 text-sm leading-relaxed">
                        Working with stakeholders to deliver community development projects, healthcare and social safeguards.
                     </p>
                </div>
             </div>
        </div>
      </section>
    </div>
  `}async function ve(){return`
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
  `}async function be(){return`
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
  `}const xe=new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"long",year:"numeric"});function T(s){if(!s)return"";try{return xe.format(new Date(s))}catch{return s}}function R(s){if(!s)return"N/A";const e=s.split("-");return e.length!==3?s:`${e[2]}-${e[1]}-${e[0]}`}async function fe(){const s=t=>t==="/"?"/":`${M}${t}`;let e=[];try{e=await c.getEvents()}catch{console.log("Using fallback data"),e=[{id:"agm-2026",title:"Annual General Meeting",date:"2026-03-15",category:"Meeting",description:"Our yearly gathering of all members"},{id:"pdw-2026",title:"Professional Development Workshop",date:"2026-04-20",category:"Workshop",description:"Skills enhancement for public servants"},{id:"outreach-2026",title:"Community Outreach",date:"2026-05-10",category:"Community",description:"Giving back to the community"}]}return`
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
                    <a href="${s(`/programmes/${t.id||t.route}`)}" class="hover:text-primary-500 transition-colors">
                        ${t.title}
                    </a>
                  </h3>
                  <p class="text-neutral-400 text-sm mb-4 line-clamp-2">${t.description||""}</p>
                  <div class="flex items-center justify-between mt-auto">
                    <div class="flex items-center gap-2 text-sm text-neutral-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>${T(t.date)||"TBA"}</span>
                    </div>
                    <a href="${s(`/programmes/${t.id||t.route}`)}" class="text-xs font-medium text-neutral-300 bg-white/10 px-3 py-1 rounded-full hover:bg-primary-500 hover:text-neutral-900 transition-all">
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
  `}async function we(s){const{id:e}=s;let t=null;try{t=await c.getEventDetails(e)}catch(o){console.error("Error fetching programme details:",o)}return!t||Object.keys(t).length===0?`
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
                    <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
                </div>`:'<div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20"></div>'}
            
            <div class="container-custom relative z-10">
                <div class="max-w-4xl">
                    <div class="inline-block px-3 py-1 rounded-full bg-primary-500 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-4 animate-on-scroll">
                        ${t.category}
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold text-neutral-300 mb-6 animate-on-scroll" style="animation-delay: 0.1s">
                        ${t.title}
                    </h1>
                    <div class="flex flex-wrap gap-6 text-neutral-300 animate-on-scroll" style="animation-delay: 0.2s">
                        ${t.date?`
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${T(t.date)}</span>
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
    `}const H=s=>s==="/"?"/":`${M}${s}`;let v={category:"",search:"",page:1,limit:9},X=1,Y=null;window.filterBlogCategory=async(s,e)=>{v.category=s===v.category?"":s,v.page=1,document.querySelectorAll(".blog-category-link").forEach(t=>{t.classList.remove("text-primary-500","font-bold"),t.classList.add("text-neutral-400")}),v.category&&e&&(e.classList.remove("text-neutral-400"),e.classList.add("text-primary-500","font-bold")),await U()};window.handlePublicBlogSearch=s=>{clearTimeout(Y),Y=setTimeout(async()=>{v.search=s,v.page=1,await U()},500)};window.changeBlogPage=async s=>{s<1||s>X||(v.page=s,await U(),document.getElementById("blog-grid").scrollIntoView({behavior:"smooth"}))};window.handleImageError=s=>{s.onerror=null;const e=s.parentElement;e.innerHTML='<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>'};window.toggleBlogFilters=()=>{const s=document.getElementById("blog-filters-container"),e=document.getElementById("filter-toggle-arrow");s&&(s.classList.toggle("hidden"),e&&e.classList.toggle("rotate-180"))};async function U(){const s=document.getElementById("blog-grid"),e=document.getElementById("blog-pagination");if(s){s.innerHTML='<div class="col-span-full text-center py-20 text-neutral-500">Loading...</div>',e&&(e.innerHTML="");try{const t=(v.page-1)*v.limit,o=await c.getBlogPosts({category:v.category,search:v.search,limit:v.limit,offset:t}),a=o.length===v.limit,r=v.page>1;if(X=a?v.page+1:v.page,o.length===0){s.innerHTML=`
                <div class="col-span-full text-center py-20">
                    <p class="text-xl text-neutral-400 mb-4">No posts found</p>
                    <button onclick="filterBlogCategory('', null); document.getElementById('blog-search').value = ''" class="text-primary-500 hover:underline">
                        Clear all filters
                    </button>
                </div>
            `;return}s.innerHTML=o.map((l,i)=>Z(l,i)).join(""),ye(r,a),s.querySelectorAll(".animate-on-scroll").forEach((l,i)=>{l.style.animationDelay=`${i*.1}s`,l.offsetWidth,l.classList.add("animate")})}catch{s.innerHTML='<div class="col-span-full text-center py-20 text-red-500">Error loading posts</div>'}}}function ye(s,e){const t=document.getElementById("blog-pagination");t&&(t.innerHTML=`
        <div class="flex justify-center items-center gap-4 mt-12">
            <button 
                onclick="window.changeBlogPage(${v.page-1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${s?"text-neutral-300 hover:bg-white/5 hover:text-neutral-300":"text-neutral-600 cursor-not-allowed"}"
                ${s?"":"disabled"}
            >
                Previous
            </button>
            <span class="text-neutral-400 text-sm">Page ${v.page}</span>
             <button 
                onclick="window.changeBlogPage(${v.page+1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${e?"text-neutral-300 hover:bg-white/5 hover:text-neutral-300":"text-neutral-600 cursor-not-allowed"}"
                ${e?"":"disabled"}
            >
                Next
            </button>
        </div>
    `)}function Z(s,e){return`
    <article class="glass rounded-xl overflow-hidden group hover-lift hover-glow animate-on-scroll flex flex-col h-full" style="animation-delay: ${e*.1}s">
        <a href="${H(`/blog-news/${s.id||e}`)}" class="block h-48 overflow-hidden relative shrink-0">
            ${s.image?`<img src="${s.image}" alt="${s.title}" onerror="window.handleImageError(this)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`:'<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>'}
        </a>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase tracking-wider text-primary-500 font-bold px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                    ${s.category||"General"}
                </span>
                <span class="text-xs text-neutral-500">${T(s.date)||"Recent"}</span>
            </div>
            <h2 class="text-lg font-bold mb-2 leading-tight hover:text-primary-500 transition-colors">
                <a href="${H(`/blog-news/${s.id||e}`)}">${s.title}</a>
            </h2>
            <p class="text-neutral-400 text-sm mb-4 line-clamp-3 leading-snug flex-grow">${s.excerpt||""}</p>
            <a href="${H(`/blog-news/${s.id||e}`)}" class="text-primary-500 text-xs font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                Read more <span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
        </div>
    </article>
  `}async function ke(){let s=[],e=[];v={category:"",search:"",page:1,limit:9};try{const[o,a]=await Promise.all([c.getBlogPosts({limit:9,offset:0}),c.getBlogCategories()]);s=o,e=a}catch{console.log("Using fallback data"),e=["General","Ramadan","Brotherhood","News"],s=[{title:"Welcome to PUSMAG",excerpt:"Learn about our mission and vision for the future of Muslim public servants in Ghana.",date:"2026-01-01",author:"Admin",category:"General",image:"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"}]}const t=s.length===v.limit;return`
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
            
            <!-- Sidebar / Filters -->
            <aside class="lg:col-span-1 h-fit sticky top-[80px] lg:top-28 z-30">
                <!-- Mobile Filter Toggle -->
                <button 
                    onclick="window.toggleBlogFilters()"
                    class="lg:hidden w-full glass mb-4 px-5 py-3.5 rounded-xl flex items-center justify-between text-neutral-300 font-bold uppercase tracking-widest border border-white/10 shadow-lg shadow-black/20"
                >
                    <span class="flex items-center gap-2 text-sm">
                        <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        Search & Filters
                    </span>
                    <svg id="filter-toggle-arrow" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>

                <!-- Filters Container (Hidden on mobile unless toggled) -->
                <div id="blog-filters-container" class="hidden lg:block space-y-6 max-h-[70vh] overflow-y-auto lg:max-h-none pr-2 lg:pr-0">
                    <!-- Search -->
                    <div class="glass p-5 rounded-xl border border-white/5 shadow-xl shadow-black/20">
                        <h3 class="text-[10px] font-bold mb-4 uppercase tracking-widest text-neutral-500">Search Articles</h3>
                        <div class="relative">
                            <input 
                                type="text" 
                                id="blog-search"
                                oninput="window.handlePublicBlogSearch(this.value)"
                                placeholder="Type to search..." 
                                class="w-full bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            >
                            <svg class="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Categories -->
                    <div class="glass p-5 rounded-xl border border-white/5 shadow-xl shadow-black/20">
                        <h3 class="text-[10px] font-bold mb-4 uppercase tracking-widest text-neutral-500">Categories</h3>
                        <ul class="space-y-1">
                            <li>
                                <button 
                                    onclick="window.filterBlogCategory('', null)"
                                    class="blog-category-link w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-white/5 hover:text-primary-500 transition-all text-primary-500 font-bold cursor-pointer"
                                >
                                    All Articles
                                </button>
                            </li>
                            ${e.map(o=>`
                                <li>
                                    <button 
                                        onclick="window.filterBlogCategory('${o}', this)"
                                        class="blog-category-link w-full text-left text-sm py-2 px-3 rounded-lg text-neutral-400 hover:bg-white/5 hover:text-primary-500 transition-all cursor-pointer"
                                    >
                                        ${o}
                                    </button>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                </div>
            </aside>

            <!-- Blog Grid -->
            <div class="lg:col-span-3">
                <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    ${s.length>0?s.map((o,a)=>Z(o,a)).join(""):`
                        <div class="col-span-full text-center py-20 glass rounded-xl">
                            <p class="text-xl text-neutral-400">No matching articles found</p>
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
                            class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${t?"text-neutral-300 hover:bg-white/5 hover:text-neutral-300":"text-neutral-600 cursor-not-allowed"}"
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
  `}async function Me(s){const{id:e}=s;let t=null;try{t=await c.getBlogPost(e)}catch(o){console.error("Error fetching blog post:",o)}return!t||Object.keys(t).length===0?`
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
                <div class="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"></div>
            </div>
        `:`
            <div class="absolute inset-0 z-0 bg-neutral-900">
                <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-900"></div>
            </div>
        `}

        <!-- Hero Content -->
        <div class="container relative z-10 text-center pt-32 px-4">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                ${t.category||"News"}
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-neutral-300 max-w-5xl mx-auto leading-tight animate-fade-in-up" style="animation-delay: 0.1s">
                ${t.title}
            </h1>
            
            <div class="flex items-center justify-center gap-6 text-neutral-300 animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-neutral-900 font-bold text-sm ring-4 ring-white/10">
                        ${(t.author||"A").charAt(0)}
                    </div>
                    <span class="font-medium">${t.author||"Admin"}</span>
                </div>
                <span class="text-neutral-500">•</span>
                <span class="font-medium tracking-wide">${T(t.date)}</span>
            </div>
        </div>
    </div>

    <!-- Content Section -->
    <article class="container max-w-6xl relative z-20 pb-32 -mt-10 mx-auto">
        <div class="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-8 shadow-2xl animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="prose prose-invert prose-lg max-w-none">
                ${t.content||""}
            </div>
        </div>
        
        <!-- Navigation / Share Footer -->
        <div class="mt-12 flex justify-center animate-fade-in-up" style="animation-delay: 0.4s">
            <a href="/blog-news" class="group flex items-center gap-3 text-neutral-400 hover:text-neutral-300 transition-all px-6 py-3 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5">
                <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                <span class="font-medium">Back to Blog</span>
            </a>
        </div>
    </article>
    `}async function Le(){let s=[],e=[];try{const[r,n]=await Promise.all([c.getGalleryImages({limit:100}),c.getGalleryCategories()]);s=r,e=n}catch{console.log("Using fallback data"),s=Array(6).fill(null).map((n,l)=>({id:l,title:"Gallery Image",category:l%2===0?"Events":"Meetings"})),e=["Events","Meetings"]}const o=`
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
            <button class="filter-btn active px-6 py-2 rounded-full border border-white/10 bg-white/10 text-neutral-300 transition-all hover:bg-white/20" data-filter="all">
                All
            </button>
            ${e.map(r=>`
                <button class="filter-btn px-6 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-neutral-300 transition-all hover:bg-white/10" data-filter="${r}">
                    ${r}
                </button>
            `).join("")}
        </div>
    `}
            
          <div id="gallery-grid" class="columns-1 md:columns-2 lg:columns-4 gap-6 min-h-[50vh] space-y-6">
            ${s.map((r,n)=>`
              <div class="gallery-item break-inside-avoid rounded-xl overflow-hidden hover-lift hover-glow cursor-pointer transition-all duration-500 ease-out relative" 
                   onclick="window.openGalleryLightbox(${n})"
                   data-category="${r.category}"
                   style="animation: fadeIn 0.5s ease-out ${n*.05}s backwards;">
                ${r.image_url?`<img data-src="${r.image_url}" alt="${r.title}" class="w-full h-auto object-cover transition-all duration-700 hover:scale-110 opacity-0" loading="lazy">`:`<div class="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                       <svg class="w-16 h-16 text-primary-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                       </svg>
                     </div>`}
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span class="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">${r.category||"General"}</span>
                    <h3 class="text-lg font-bold text-neutral-300">${r.title}</h3>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    </div>

    <!-- Lightbox Modal -->
    <div id="gallery-lightbox" class="fixed inset-0 z-[100] hidden bg-neutral-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
        <button onclick="window.closeGalleryLightbox()" class="absolute top-6 right-6 text-neutral-300/50 hover:text-neutral-300 transition-colors z-50">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>

        <button onclick="window.prevGalleryImage()" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300/50 hover:text-neutral-300 transition-colors">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>
        <button onclick="window.nextGalleryImage()" class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300/50 hover:text-neutral-300 transition-colors">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>

        <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
            <img id="lightbox-image" src="" alt="" class="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg pointer-events-auto transition-all duration-300">
            
            <div class="mt-8 text-center pointer-events-auto">
                <span id="lightbox-category" class="inline-block text-xs font-bold text-primary-500 uppercase tracking-widest mb-2 border border-primary-500/30 px-3 py-1 rounded-full"></span>
                <h3 id="lightbox-title" class="text-2xl md:text-3xl font-bold text-neutral-300 mb-2"></h3>
                <p id="lightbox-counter" class="text-neutral-500 text-sm"></p>
            </div>
        </div>
    </div>
  `;window.galleryData={images:s,currentIndex:0},window.openGalleryLightbox=(r,n=!1)=>{const l=document.getElementById("gallery-lightbox"),i=document.getElementById("lightbox-image"),d=document.getElementById("lightbox-title"),u=document.getElementById("lightbox-category"),h=document.getElementById("lightbox-counter"),p=()=>{window.galleryData.currentIndex=r;const g=window.galleryData.images[r];g.image_url?i.src=g.image_url:i.src="placeholder",d.textContent=g.title||"Untitled",u.textContent=g.category||"General";const b=document.querySelector(".filter-btn.active").dataset.filter,m=b==="all"?window.galleryData.images:window.galleryData.images.filter(y=>y.category===b),w=m.findIndex(y=>y.id===g.id);h.textContent=`${w+1} / ${m.length}`};n?(i.classList.add("animate-gallery-fade-out"),setTimeout(()=>{i.classList.remove("animate-gallery-fade-out"),p(),i.classList.add("animate-gallery-fade-in"),setTimeout(()=>i.classList.remove("animate-gallery-fade-in"),300)},300)):p(),l.classList.remove("hidden"),document.body.style.overflow="hidden"},window.closeGalleryLightbox=()=>{const r=document.getElementById("gallery-lightbox");r&&(r.classList.add("hidden"),document.body.style.overflow="")},window.nextGalleryImage=()=>{const r=document.querySelector(".filter-btn.active").dataset.filter,n=r==="all"?window.galleryData.images:window.galleryData.images.filter(p=>p.category===r),l=window.galleryData.images[window.galleryData.currentIndex].id;let d=(n.findIndex(p=>p.id===l)+1)%n.length;const u=n[d],h=window.galleryData.images.findIndex(p=>p.id===u.id);window.openGalleryLightbox(h,!0)},window.prevGalleryImage=()=>{const r=document.querySelector(".filter-btn.active").dataset.filter,n=r==="all"?window.galleryData.images:window.galleryData.images.filter(p=>p.category===r),l=window.galleryData.images[window.galleryData.currentIndex].id;let d=(n.findIndex(p=>p.id===l)-1+n.length)%n.length;const u=n[d],h=window.galleryData.images.findIndex(p=>p.id===u.id);window.openGalleryLightbox(h,!0)};const a=r=>{r.key==="Escape"&&window.closeGalleryLightbox(),r.key==="ArrowRight"&&window.nextGalleryImage(),r.key==="ArrowLeft"&&window.prevGalleryImage()};return document.removeEventListener("keydown",a),document.addEventListener("keydown",a),setTimeout(()=>{const r=document.querySelectorAll(".filter-btn"),n=document.querySelectorAll(".gallery-item");r.forEach(l=>{l.addEventListener("click",()=>{r.forEach(d=>{d.classList.remove("active","bg-white/10","text-neutral-300"),d.classList.add("text-neutral-400")}),l.classList.add("active","bg-white/10","text-neutral-300"),l.classList.remove("text-neutral-400");const i=l.dataset.filter;n.forEach(d=>{const u=d.dataset.category;i==="all"||u===i?(d.style.display="block",d.style.animation="none",d.offsetHeight,d.style.animation="zoomIn 0.4s ease-out forwards"):d.style.display="none"})})})},0),o}async function Be(){return`
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
                  <input type="text" name="name" required class="text-sm w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Email</label>
                  <input type="email" name="email" required class="text-sm w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Message</label>
                  <textarea name="message" required rows="6" class="text-sm w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"></textarea>
                </div>
                <button type="submit" class="btn-custom w-full">
                  <span class="inner">Send Message</span>
                </button>
                <div id="form-message" class="hidden text-center"></div>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="space-y-8 animate-on-scroll" style="animation-delay: 0.1s">
              <div class="glass rounded-xl p-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-1">Phone</h3>
                    <p class="text-sm text-neutral-400">+(233) 50 175 6250</p>
                  </div>
                </div>
              </div>

              <div class="glass rounded-xl p-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-1">Email</h3>
                    <p class="text-sm text-neutral-400">info@pusmag.org</p>
                  </div>
                </div>
              </div>

              <div class="glass rounded-xl p-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-1">Office Hours</h3>
                    <p class="text-sm text-neutral-400">Monday - Friday: 8am-5pm</p>
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
  `}class L{static init(){if(document.getElementById("custom-modal-container"))return;const e=document.createElement("div");e.id="custom-modal-container",e.className="fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300",e.innerHTML=`
            <div class="glass w-full max-w-md rounded-2xl overflow-hidden transform scale-95 opacity-0 transition-all duration-300" id="custom-modal-content">
                <div class="p-8 text-center space-y-6">
                    <div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto" id="custom-modal-icon">
                        <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-2" id="custom-modal-title">Notification</h3>
                        <p class="text-neutral-400 text-sm" id="custom-modal-message">Message body goes here.</p>
                    </div>
                    <div class="flex flex-col gap-3" id="custom-modal-actions">
                        <button onclick="Modal.close()" class="btn-custom w-full">
                            <span class="inner">Okay</span>
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e),e.addEventListener("click",t=>{t.target===e&&L.close()})}static show({title:e,message:t,type:o="info",onConfirm:a=null,confirmText:r="Okay",cancelText:n=null}){this.init();const l=document.getElementById("custom-modal-container"),i=document.getElementById("custom-modal-content"),d=document.getElementById("custom-modal-title"),u=document.getElementById("custom-modal-message"),h=document.getElementById("custom-modal-icon"),p=document.getElementById("custom-modal-actions");d.textContent=e,u.textContent=t;let g="",b="text-primary-500",m="bg-primary-500/10";o==="error"?(b="text-red-500",m="bg-red-500/10",g='<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'):o==="success"?(b="text-emerald-500",m="bg-emerald-500/10",g='<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'):g='<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',h.innerHTML=g,h.className=`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${m}`,h.firstElementChild.classList.add(b),p.innerHTML="";const w=document.createElement("button");if(w.className="btn-custom w-full",w.innerHTML=`<span class="inner">${r}</span>`,w.onclick=()=>{a&&a(),L.close()},p.appendChild(w),n){const y=document.createElement("button");y.className="px-6 py-3 text-neutral-400 hover:text-neutral-300 transition-colors text-sm font-medium",y.textContent=n,y.onclick=()=>L.close(),p.appendChild(y)}l.classList.remove("hidden"),l.classList.add("flex"),requestAnimationFrame(()=>{i.classList.remove("scale-95","opacity-0"),i.classList.add("scale-100","opacity-100")})}static close(){const e=document.getElementById("custom-modal-container"),t=document.getElementById("custom-modal-content");!e||!t||(t.classList.remove("scale-100","opacity-100"),t.classList.add("scale-95","opacity-0"),setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("flex")},300))}static alert(e,t){this.show({title:e,message:t,type:"error"})}static success(e,t){this.show({title:e,message:t,type:"success"})}}window.Modal=L;window.addMembershipRow=()=>{const s=document.getElementById("memberships-container");if(!s)return;const e=document.createElement("div");e.className="membership-row grid grid-cols-12 gap-2 p-2 border-t border-white/5",e.innerHTML=`
        <div class="col-span-4">
            <input type="text" placeholder="e.g. Accountant" class="w-full px-3 py-2 bg-neutral-900/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-4">
            <input type="text" placeholder="e.g. ICA Ghana" class="w-full px-3 py-2 bg-neutral-900/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Num" class="w-full px-3 py-2 bg-neutral-900/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <button type="button" onclick="this.closest('.membership-row').remove()" class="text-red-500 hover:text-red-400 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    `,s.appendChild(e)};window.validateField=s=>{s.hasAttribute("required")&&!s.value?(s.classList.add("border-red-500/50","ring-2","ring-red-500/20"),s.classList.remove("border-white/10")):(s.classList.remove("border-red-500/50","ring-2","ring-red-500/20"),s.classList.add("border-white/10"))};window.resetRegistrationForm=()=>{const s=document.getElementById("registration-form");s&&(s.reset(),s.querySelectorAll("input, select, textarea").forEach(a=>{a.classList.remove("border-red-500/50","ring-2","ring-red-500/20"),a.classList.add("border-white/10")}));const e=document.getElementById("memberships-container");e&&(e.innerHTML="");const t=document.getElementById("form-message");t&&(t.classList.add("hidden"),t.textContent="");const o=document.getElementById("remove-photo-btn");o&&o.classList.add("hidden")};window.handlePhotoChange=s=>{const e=document.getElementById("remove-photo-btn");s.target.files.length>0?e.classList.remove("hidden"):e.classList.add("hidden")};window.removePhoto=()=>{const s=document.querySelector('input[name="photo"]');if(s){s.value="";const e=document.getElementById("remove-photo-btn");e&&e.classList.add("hidden")}};window.handleRegistrationSubmit=async s=>{s.preventDefault();const e=s.target,t=document.getElementById("form-message");if(!e.checkValidity()){t.textContent="Please complete all required fields.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden"),e.querySelectorAll("[required]").forEach(d=>{d.value||(d.classList.add("border-red-500/50","ring-2","ring-red-500/20"),d.classList.remove("border-white/10"))}),t.scrollIntoView({behavior:"smooth",block:"center"});return}const o=e.querySelector('button[type="submit"]'),a=o.innerHTML;o.innerHTML='<span class="inner">Processing...</span>',o.disabled=!0,t.classList.add("hidden"),t.textContent="";const r=new FormData(e),n=Object.fromEntries(r),l=e.querySelector('input[name="photo"]');if(l&&l.files.length>0){const d=l.files[0],u=["jpg","jpeg","png"],h=d.name.split(".").pop().toLowerCase();if(!u.includes(h)){t.textContent="Invalid file type. Please upload a JPG, JPEG, or PNG image.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden"),o.innerHTML=a,o.disabled=!1;return}const p=2*1024*1024;if(d.size>p){L.alert("File too large","File size is too large. Maximum size allowed is 2MB."),o.innerHTML=a,o.disabled=!1;return}try{const g=await new Promise((b,m)=>{const w=new FileReader;w.onload=()=>b(w.result),w.onerror=m,w.readAsDataURL(d)});n.photo={filename:d.name,data:g.split(",")[1]}}catch(g){console.error("File read error",g)}}else delete n.photo;const i=[];document.querySelectorAll(".membership-row").forEach(d=>{const u=d.querySelectorAll("input");u[0].value&&i.push({profession:u[0].value,professional_body:u[1].value,membership_number:u[2].value})}),i.length>0&&(n.professional_memberships=JSON.stringify(i));try{await c.submitRegistration(n),t.textContent="Thank you for registering! We will contact you soon.",t.className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 mb-6",t.classList.remove("hidden"),window.resetRegistrationForm(),t.scrollIntoView({behavior:"smooth",block:"center"})}catch(d){console.error(d),t.textContent=d.message||"Sorry, there was an error processing your registration.",t.className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6",t.classList.remove("hidden")}finally{o.innerHTML=a,o.disabled=!1}};async function Pe(){return`
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">Become a Member</h1>
          <p class="text-lg text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Your membership with PuSMAG begins here. Kindly take a few moment to complete the registration form below, ensuring that all details are accurate and up-to-date.
          </p>
        </div>
      </section>

      <!-- Registration Form -->
      <section class="section-padding">
        <div class="container max-w-4xl mx-auto px-6">
          <div id="form-message" class="hidden"></div>
          
          <form id="registration-form" onsubmit="window.handleRegistrationSubmit(event)" novalidate class="glass rounded-xl p-8 space-y-8 animate-on-scroll">
            
            

            <!-- Personal Details -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Personal Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Title *</label>
                    <select name="title" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
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
                    <input type="text" name="first_name" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Middle Name</label>
                    <input type="text" name="middle_name" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Surname *</label>
                    <input type="text" name="surname" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Gender *</label>
                    <select name="gender" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                  </div>
                   <div>
                    <label class="block text-sm font-medium mb-2">Date of Birth</label>
                    <input type="date" name="date_of_birth" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all text-neutral-300 scheme-dark">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">GhanaCard Number *</label>
                    <input type="text" name="ghanacard_number" required onblur="window.validateField(this)" placeholder="GHA-000000000-0" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  
                  <!-- Photo Upload -->
                   <div class="md:col-span-3">
                    <label class="block text-sm font-medium mb-2">Passport Photo</label>
                    <div class="flex items-center gap-4">
                        <input type="file" name="photo" id="photo-input" onchange="window.handlePhotoChange(event)" accept=".jpg,.jpeg,.png" class="flex-grow text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-500 hover:file:bg-primary-500/20">
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
                      <input type="tel" name="mobile" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Email Address *</label>
                      <input type="email" name="email" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                </div>
            </div>

            <!-- Professional Information -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Professional Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">Institution (MDA/MMDA) *</label>
                      <input type="text" name="institution" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Designation *</label>
                      <input type="text" name="designation" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Region *</label>
                      <select name="region" required onblur="window.validateField(this)" class="w-full text-sm px-3 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
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
                    <textarea name="skills" rows="3" class="w-full text-sm px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all"></textarea>
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
                <button type="button" onclick="window.resetRegistrationForm()" class="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-neutral-300 font-medium flex-1">
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
  `}const _e=s=>{if(!s)return"";const[e,t]=s.split("@");return t?e.length<=2?`${e}***@${t}`:`${e.substring(0,2)}***${e.substring(e.length-2)}@${t}`:s},Ce=s=>{if(!s)return"";const e=s.replace(/[^\d+]/g,"");let t="",o=e;return e.startsWith("+")&&(t=e.substring(0,4),o=e.substring(4)),o.length<=3?`${t}***${o}`:`${t}${"*".repeat(o.length-3)}${o.slice(-3)}`};window.handleLoginSubmit=async s=>{s.preventDefault();const e=s.target,t=e.usr.value,o=e.pwd.value,a=document.getElementById("login-message"),r=e.querySelector('button[type="submit"]');r.disabled=!0,r.innerHTML='<span class="inner">Checking...</span>',a.classList.add("hidden");try{await c.login(t,o);const n=await c.send2FACode(t);document.getElementById("login-section").classList.add("hidden"),document.getElementById("2fa-section").classList.remove("hidden");const l=document.getElementById("2fa-email-display");n.method==="SMS"?l.textContent=Ce(n.mobile_no):l.textContent=_e(n.email),l.setAttribute("data-full-email",t)}catch(n){a.textContent=n.message||"Login failed. Please check your credentials.",a.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",a.classList.remove("hidden"),r.disabled=!1,r.innerHTML='<span class="inner">Sign In</span>'}};window.handle2FASubmit=async s=>{s.preventDefault();const e=s.target,t=e.code.value,o=document.getElementById("2fa-email-display").getAttribute("data-full-email"),a=document.getElementById("2fa-message"),r=e.querySelector('button[type="submit"]');r.disabled=!0,r.innerHTML='<span class="inner">Verifying...</span>';try{await c.verify2FACode(o,t),f.user=await c.getUserInfo(),f.navigate("/portal/dashboard")}catch(n){a.textContent=n.message||"Invalid code. Please try again.",a.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",a.classList.remove("hidden"),r.disabled=!1,r.innerHTML='<span class="inner">Verify Code</span>'}};window.togglePassword=()=>{const s=document.querySelector('input[name="pwd"]'),e=document.getElementById("eye-icon"),t=document.getElementById("eye-off-icon");s.type==="password"?(s.type="text",e.classList.add("hidden"),t.classList.remove("hidden")):(s.type="password",e.classList.remove("hidden"),t.classList.add("hidden"))};async function $e(){return`
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <!-- Login Section -->
                <div id="login-section" class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p class="text-neutral-400">Sign in to your PuSMAG account</p>
                    </div>

                    <div id="login-message" class="hidden"></div>

                    <form onsubmit="window.handleLoginSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="text" name="usr" required placeholder="name@email.com" 
                                class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Password</label>
                            <div class="relative">
                                <input type="password" name="pwd" required placeholder="••••••••" 
                                    class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-200 hover:text-primary-500 transition-all p-1">
                                    <svg id="eye-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg id="eye-off-icon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Sign In</span>
                        </button>
                    </form>

                    <p class="mt-8 text-center text-sm text-neutral-500">
                        <a href="/forgot-password" class="text-primary-500 hover:text-primary-400 font-medium">Forgot Password?</a>
                    </p>
                </div>

                <!-- 2FA Section -->
                <div id="2fa-section" class="hidden glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Verification</h1>
                        <p class="text-neutral-400">Enter the 6-digit code sent to <br><span id="2fa-email-display" class="text-neutral-300 font-medium"></span></p>
                    </div>

                    <div id="2fa-message" class="hidden"></div>

                    <form onsubmit="window.handle2FASubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2 text-center">Security Code</label>
                            <input type="text" name="code" required maxlength="6" placeholder="000000" 
                                class="w-full px-4 py-4 text-center text-3xl tracking-[0.5em] font-bold bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Verify Code</span>
                        </button>
                    </form>

                    <button onclick="window.handleLoginSubmit(event)" class="mt-8 w-full text-center text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                        Didn't receive a code? Resend
                    </button>
                </div>
            </div>
        </div>
    `}window.handleResetSuccessClose=()=>{document.getElementById("success-modal").classList.add("hidden"),f.navigate("/login")};window.handleForgotPasswordSubmit=async s=>{s.preventDefault();const e=s.target,t=e.email.value,o=document.getElementById("reset-message"),a=e.querySelector('button[type="submit"]'),r=document.getElementById("success-modal");a.disabled=!0,a.innerHTML='<span class="inner">Sending...</span>',o.classList.add("hidden");try{const n=await c.resetPassword(t);r.classList.remove("hidden"),e.reset()}catch{o.textContent="An error occurred. Please try again later.",o.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",o.classList.remove("hidden")}finally{a.disabled=!1,a.innerHTML='<span class="inner">Send Reset Link</span>'}};async function je(){return`
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <div class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Reset Password</h1>
                        <p class="text-neutral-400">Enter your email address to receive reset instructions</p>
                    </div>

                    <div id="reset-message" class="hidden"></div>

                    <form onsubmit="window.handleForgotPasswordSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="email" name="email" required placeholder="name@email.com" 
                                class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Send Reset Link</span>
                        </button>
                    </form>

                    <p class="mt-8 text-center text-sm text-neutral-500">
                        Remember your password? 
                        <a href="/login" class="text-primary-500 hover:text-primary-400 font-medium">Back to Login</a>
                    </p>
                </div>
            </div>

            <!-- Success Modal -->
            <div id="success-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.handleResetSuccessClose()"></div>
                
                <!-- Modal Content -->
                <div class="relative glass rounded-2xl p-8 w-full max-w-sm mx-4 transform transition-all animate-on-scroll animate">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Check Your Email</h3>
                        <p class="text-neutral-400 mb-6">
                            If an account exists for this email, you will receive password reset instructions shortly.
                        </p>
                        <button onclick="window.handleResetSuccessClose()" class="btn-custom w-full">
                            <span class="inner">Back to Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}window.handleUpdatePasswordSubmit=async s=>{s.preventDefault();const e=s.target,t=e.new_password.value,o=e.confirm_password.value,a=document.getElementById("update-message"),r=e.querySelector('button[type="submit"]'),n=document.getElementById("success-modal");if(a.classList.add("hidden"),t!==o){a.textContent="Passwords do not match.",a.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",a.classList.remove("hidden");return}if(t.length<8){a.textContent="Password must be at least 8 characters long.",a.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",a.classList.remove("hidden");return}r.disabled=!0,r.innerHTML='<span class="inner">Updating...</span>';try{const i=new URLSearchParams(window.location.search).get("key");if(!i)throw new Error("Invalid or missing reset key.");const d=await fetch("/api/method/frappe.core.doctype.user.user.update_password",{method:"POST",headers:{"Content-Type":"application/json","X-Frappe-CSRF-Token":c.getCSRFToken()||""},body:JSON.stringify({new_password:t,key:i})}),u=await d.json();if(d.ok&&u.message)n.classList.remove("hidden"),e.reset();else throw new Error(u.exception||u._server_messages||"Failed to update password.")}catch(l){console.error("Password update error:",l),a.textContent=l.message||"An error occurred. The reset link may have expired.",a.className="p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6",a.classList.remove("hidden")}finally{r.disabled=!1,r.innerHTML='<span class="inner">Update Password</span>'}};window.handleSuccessClose=()=>{document.getElementById("success-modal").classList.add("hidden"),f.navigate("/login")};window.togglePasswordVisibility=s=>{const e=document.getElementById(s),t=e.nextElementSibling;e.type==="password"?(e.type="text",t.innerHTML=`
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
            </svg>
        `):(e.type="password",t.innerHTML=`
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
        `)};async function Ee(){return`
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <div class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Create New Password</h1>
                        <p class="text-neutral-400">Enter your new password below</p>
                    </div>

                    <div id="update-message" class="hidden"></div>

                    <form onsubmit="window.handleUpdatePasswordSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">New Password</label>
                            <div class="relative">
                                <input type="password" id="new_password" name="new_password" required 
                                    placeholder="Enter new password" 
                                    class="w-full text-sm px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePasswordVisibility('new_password')"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p class="mt-1 text-xs text-neutral-500">At least 8 characters</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Confirm Password</label>
                            <div class="relative">
                                <input type="password" id="confirm_password" name="confirm_password" required 
                                    placeholder="Confirm new password" 
                                    class="w-full text-sm px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePasswordVisibility('confirm_password')"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Update Password</span>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Success Modal -->
            <div id="success-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.handleSuccessClose()"></div>
                
                <!-- Modal Content -->
                <div class="relative glass rounded-2xl p-8 w-full max-w-sm mx-4 transform transition-all animate-on-scroll animate">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Password Updated</h3>
                        <p class="text-neutral-400 mb-6">
                            Your password has been successfully updated. You can now log in with your new password.
                        </p>
                        <button onclick="window.handleSuccessClose()" class="btn-custom w-full">
                            <span class="inner">Go to Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}let $=1;const z=12;let S={};window.changeMemberPage=s=>{$=s,G(),document.getElementById("members-grid-container")?.scrollIntoView({behavior:"smooth"})};window.handleMemberSearch=s=>{const e=s.target.value;S.search=e,$=1,G()};window.handleMemberFilter=s=>{const{name:e,value:t}=s.target;t?S[e]=t:delete S[e],$=1,G()};window.toggleMemberFilters=()=>{const s=document.getElementById("member-filters-container"),e=document.getElementById("member-filter-toggle-arrow");s&&(s.classList.toggle("hidden"),e&&e.classList.toggle("rotate-180"))};async function G(){const s=document.getElementById("members-grid-container");if(s){s.innerHTML='<div class="col-span-full py-20 text-center text-neutral-500">Searching members...</div>';try{const{members:e,total:t}=await c.getMemberDirectory({...S,limit:z,offset:($-1)*z});if(e.length===0){s.innerHTML='<div class="col-span-full py-20 text-center text-neutral-500">No members found matching your criteria.</div>';return}s.innerHTML=e.map(a=>`
            <div onclick="router.navigate('/portal/member/${a.name}')" 
                 class="relative glass p-4 sm:p-6 rounded-2xl flex flex-col items-center text-center group hover:border-primary-500/50 hover:bg-white/5 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer overflow-hidden">
                
                <!-- Decorative background elements -->
                <div class="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
                <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-accent-500/5 rounded-full blur-2xl group-hover:bg-accent-500/10 transition-colors"></div>

                <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 mb-3 sm:mb-4 border-2 border-white/10 group-hover:border-primary-500 transition-all duration-500">
                    <div class="w-full h-full rounded-full overflow-hidden">
                        <img src="${a.photo||"/files/default-avatar-white.svg"}" 
                             alt="${a.first_name}" 
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                </div>

                <h4 class="font-bold text-base sm:text-lg text-neutral-300 group-hover:text-primary-400 transition-colors leading-tight mb-2 sm:mb-4">
                    ${a.first_name} ${a.middle_name?a.middle_name+" ":""}${a.surname}
                </h4>
                
                <p class="text-accent-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] leading-tight mb-3 sm:mb-4">
                    ${a.designation||"Member"}
                </p>

                <div class="w-full pt-3 sm:pt-4 border-t border-white/5 flex flex-col gap-2">
                    <div class="hidden sm:flex items-center justify-center gap-2 text-xs text-neutral-400 mb-2">
                        <span class="text-sm sm:text-lg leading-tight">${a.institution||"Public Service"}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500">
                        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>${a.region||"N/A"}</span>
                    </div>
                </div>
            </div>
        `).join("");const o=document.getElementById("members-pagination");if(o){const a=Math.ceil(t/z);let r="";for(let n=1;n<=a;n++)r+=`
                    <button onclick="window.changeMemberPage(${n})" 
                            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all ${$===n?"bg-primary-500 text-neutral-300":"glass text-neutral-400 hover:text-neutral-300"}">
                        ${n}
                    </button>
                `;o.innerHTML=r}setTimeout(()=>B(),100)}catch(e){s.innerHTML=`<div class="col-span-full py-20 text-center text-red-500">Error loading members: ${e.message}</div>`}}}async function Ie(){return setTimeout(()=>G(),100),`
        <div class="space-y-8 animate-on-scroll">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300 mb-2">Member Directory</h2>
                    <p class="text-neutral-500 text-sm">Connect and network with fellow Muslim public servants</p>
                </div>
            </div>
            
            <!-- Mobile Filter Toggle -->
            <button 
                onclick="window.toggleMemberFilters()"
                class="lg:hidden w-full glass mb-4 px-5 py-3.5 rounded-xl flex items-center justify-between text-neutral-300 font-bold uppercase tracking-widest border border-white/10 shadow-lg shadow-black/20"
            >
                <span class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                    </svg>
                    Search & Filters
                </span>
                <svg id="member-filter-toggle-arrow" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            
            <!-- Filters Container (Hidden on mobile unless toggled) -->
            <div id="member-filters-container" class="hidden lg:flex flex-wrap items-center justify-end gap-4">
                <div class="relative min-w-[300px] group flex-grow lg:flex-grow-0">
                    <input type="text" placeholder="Search by name, institution..." 
                           oninput="window.handleMemberSearch(event)"
                           class="text-xs w-full pl-12 pr-4 py-3 mb-2 glass rounded-xl border border-white/10 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 focus:ring-4 focus:ring-primary-500/10 transition-all">
                    <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <div class="relative group flex-grow lg:flex-grow-0">
                    <select name="region" onchange="window.handleMemberFilter(event)" 
                            class="text-xs appearance-none pl-10 pr-10 py-3 glass rounded-xl border border-white/10 focus:outline-none focus:border-accent-500/50 focus:bg-accent-500/5 focus:ring-4 focus:ring-accent-500/10 transition-all text-sm text-neutral-300 w-full">
                        <option value="">All Regions</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                    </select>
                    <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                    <svg class="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            <div id="members-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Members loaded via JS -->
            </div>

            <div id="members-pagination" class="flex justify-center gap-2 pt-8">
                <!-- Pagination loaded via JS -->
            </div>
        </div>
    `}window.openBlogPost=s=>{f.navigate(s)};let F="",k=null,A=null;const Se=()=>{k||!document.getElementById("editor-container")||(k=new Quill("#editor-container",{theme:"snow",modules:{toolbar:[[{header:[1,2,3,!1]}],["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],["link","image"],["clean"]]},placeholder:"Write your post content here..."}))};window.handlePortalBlogSearch=s=>{F=s.target.value,E()};window.toggleBlogPortalSearch=()=>{const s=document.getElementById("blog-portal-search-container"),e=document.getElementById("blog-portal-search-toggle-arrow");s&&(s.classList.toggle("hidden"),e&&e.classList.toggle("rotate-180"))};window.openBlogModal=async(s=null)=>{const e=document.getElementById("blog-modal"),t=document.getElementById("blog-form"),o=document.getElementById("blog-modal-title");if(setTimeout(()=>Se(),100),t.reset(),t.name.value=s||"",k&&k.setContents([]),o.textContent=s?"Edit Blog Post":"Create New Post",s)try{const a=await c.getBlogPostDetails(s);t.post_title.value=a.post_title,t.post_category.value=a.post_category,t.post_image.value=a.post_image||"";const r=document.getElementById("image-preview"),n=r.querySelector("img"),l=r.querySelector(".empty-state");a.post_image?(n.src=a.post_image,n.classList.remove("hidden"),l.classList.add("hidden")):(n.src="",n.classList.add("hidden"),l.classList.remove("hidden")),k&&k.clipboard.dangerouslyPasteHTML(a.post_content||"")}catch(a){alert("Error loading post: "+a.message);return}else{const a=document.getElementById("image-preview");a.querySelector("img").src="",a.querySelector("img").classList.add("hidden"),a.querySelector(".empty-state").classList.remove("hidden")}e.classList.remove("hidden"),e.classList.add("flex")};window.closeBlogModal=()=>{const s=document.getElementById("blog-modal");s.classList.add("hidden"),s.classList.remove("flex")};window.handleImageUpload=async s=>{const e=s.target.files[0];if(!e)return;if(!["image/jpeg","image/jpg","image/png"].includes(e.type)){alert("Please upload a valid image file (JPG or PNG).");return}if(e.size>2*1024*1024){L.alert("File too large","File size too large. Maximum 2MB allowed.");return}const o=document.getElementById("image-preview"),a=o.querySelector("img"),r=o.querySelector(".empty-state"),n=document.querySelector('input[name="post_image"]'),l=document.querySelector('button[onclick*="image-upload-input"]');try{l.disabled=!0,l.innerHTML='<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...';const i=await c.uploadFile(e);n.value=i,a.src=i,a.classList.remove("hidden"),r.classList.add("hidden")}catch(i){alert("Upload failed: "+i.message)}finally{l.disabled=!1,l.innerHTML='<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Upload Image'}};window.handleBlogSubmit=async s=>{s.preventDefault();const e=s.target,t=e.querySelector('button[type="submit"]'),o=k?k.root.innerHTML:"";if(o==="<p><br></p>"){alert("Post content cannot be empty.");return}const a={name:e.name.value,post_title:e.post_title.value,post_category:e.post_category.value,post_image:e.post_image.value,post_content:o,route:e.post_title.value.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,""),delete_requested:0};t.disabled=!0,t.innerHTML='<span class="inner">Saving...</span>';try{await c.saveBlogPost(a),closeBlogModal(),E()}catch(r){alert("Error saving post: "+r.message)}finally{t.disabled=!1,t.innerHTML='<span class="inner">Save Post</span>'}};window.openDeleteModal=s=>{A=s;const e=document.getElementById("delete-modal");e.classList.remove("hidden"),e.classList.add("flex")};window.closeDeleteModal=()=>{A=null;const s=document.getElementById("delete-modal");s.classList.add("hidden"),s.classList.remove("flex")};window.handleDeleteConfirm=async()=>{if(!A)return;const s=document.getElementById("confirm-delete-btn");s.disabled=!0,s.innerHTML='<span class="inner">Deleting...</span>';try{const e=await c.deleteBlogPost(A);e.status==="requested"&&alert(e.message),closeDeleteModal(),E()}catch(e){alert("Error deleting post: "+e.message)}finally{s.disabled=!1,s.innerHTML='<span class="inner">Delete Post</span>'}};window.handleCancelDelete=async s=>{try{await c.cancelDeleteRequest(s),E()}catch(e){alert("Error cancelling request: "+e.message)}};async function E(){const s=document.getElementById("blog-posts-container");if(s){s.innerHTML='<tr><td colspan="5" class="py-20 text-center text-neutral-500">Loading your posts...</td></tr>';try{const e=await c.getUserBlogPosts(F);if(e.length===0){s.innerHTML=`<tr><td colspan="5" class="py-20 text-center text-neutral-500">${F?"No posts match your search.":"No blog posts found."}</td></tr>`;return}s.innerHTML=e.map(t=>`
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td class="py-4 px-6 hidden sm:table-cell">
                    <div class="flex items-center gap-3">
                        ${t.post_image?`<img src="${t.post_image}" class="w-10 h-10 rounded-lg object-cover bg-white/5">`:'<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-neutral-600">No Image</div>'}
                        <div>
                            <a href="/blog-news/${t.route||t.name}" onclick="event.preventDefault(); window.openBlogPost('/blog-news/${t.route||t.name}')" class="font-medium text-sm text-neutral-300 hover:text-primary-500 transition-colors block cursor-pointer">
                                ${t.post_title}
                            </a>
                            <div class="text-[10px] text-neutral-500 mt-0.5">by ${t.author_name||"Admin"}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6 sm:hidden">
                    <div>
                        <a href="/blog-news/${t.route||t.name}" onclick="event.preventDefault(); window.openBlogPost('/blog-news/${t.route||t.name}')" class="font-medium text-sm text-neutral-300 hover:text-primary-500 transition-colors block cursor-pointer">
                            ${t.post_title}
                        </a>
                        <div class="text-[10px] text-neutral-500 mt-0.5">by ${t.author_name||"Admin"}</div>
                    </div>
                </td>
                <td class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-500">${t.post_category}</td>
                <td class="py-4 px-6">
                    <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${t.published?"bg-emerald-500/10 text-emerald-500":"bg-amber-500/10 text-amber-500"}">
                        ${t.published?"Published":"Draft/Pending"}
                    </span>
                    ${t.verified?'<span class="ml-2 px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">Verified</span>':""}
                    ${t.delete_requested?'<div class="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase border border-red-500/20 animate-pulse"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Deletion Requested</div>':""}
                </td>
                <td class="py-4 px-6 text-xs text-neutral-500 whitespace-nowrap">${R(t.published_date)}</td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        ${t.delete_requested&&f.user.roles.includes("PuSMAG Admin")?`
                            <button onclick="window.handleCancelDelete('${t.name}')" class="p-2 text-emerald-500 hover:text-emerald-400 transition-colors" title="Cancel Deletion Request">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                        `:""}
                        <button onclick="window.openBlogModal('${t.name}')" class="p-2 text-neutral-400 hover:text-neutral-300 transition-colors" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                         <button onclick="window.openDeleteModal('${t.name}')" class="p-2 text-red-500 hover:text-red-400 transition-colors" title="${t.delete_requested?"Confirm Deletion":"Delete"}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join(""),setTimeout(()=>B(),100)}catch(e){s.innerHTML=`<tr><td colspan="5" class="py-20 text-center text-red-500">Error: ${e.message}</td></tr>`}}}async function Ae(){return setTimeout(()=>E(),100),`
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300">Blog Management</h2>
                    <p class="text-neutral-500 text-sm mt-1">Manage and publish your stories</p>
                </div>
                <button onclick="window.openBlogModal()" class="btn-custom">
                    <span class="inner flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        <span class="hidden sm:inline">New Post</span>
                    </span>
                </button>
            </div>
            
            <!-- Mobile Search Toggle -->
            <button 
                onclick="window.toggleBlogPortalSearch()"
                class="md:hidden w-full glass mb-4 px-5 py-3.5 rounded-xl flex items-center justify-between text-neutral-300 font-bold uppercase tracking-widest border border-white/10 shadow-lg shadow-black/20"
            >
                <span class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search & Actions
                </span>
                <svg id="blog-portal-search-toggle-arrow" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            
            <!-- Search Container (Hidden on mobile unless toggled) -->
            <div id="blog-portal-search-container" class="hidden md:flex flex-wrap items-center gap-4">
                <div class="relative flex-grow md:flex-grow-0 min-w-[300px]">
                    <input type="text" placeholder="Search blog posts..." 
                           oninput="window.handlePortalBlogSearch(event)"
                           class="w-full text-xs pl-12 pr-4 py-3 glass rounded-xl border border-white/10 focus:outline-none focus:border-primary-500 transition-all">
                    <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>
            
            <div class="glass rounded-2xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left min-w-[640px]">
                        <thead class="bg-white/5 text-xs uppercase font-bold tracking-widest text-neutral-400">
                            <tr>
                                <th class="py-4 px-6">Title</th>
                                <th class="py-4 px-6">Category</th>
                                <th class="py-4 px-6">Status</th>
                                <th class="py-4 px-6">Date</th>
                                <th class="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="blog-posts-container">
                            <!-- Loaded via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Blog Post Modal -->
        <div id="blog-modal" class="fixed inset-0 z-[60] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div class="glass w-full max-w-4xl rounded-2xl overflow-hidden animate-on-scroll max-h-[90vh] flex flex-col">
                <div class="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 id="blog-modal-title" class="text-xl font-bold">New Blog Post</h3>
                    <button onclick="window.closeBlogModal()" class="text-neutral-400 hover:text-neutral-300 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form id="blog-form" onsubmit="window.handleBlogSubmit(event)" class="p-4 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <input type="hidden" name="name">
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2 text-neutral-400">Post Title</label>
                            <input type="text" name="post_title" required placeholder="Enter title" 
                                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2 text-neutral-400">Category</label>
                            <select name="post_category" required 
                                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%207L10%2010L13%207%22%20stroke%3D%22%23a3a3a3%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat">
                                <option value="General" class="bg-neutral-900">General</option>
                                <option value="Ramadan" class="bg-neutral-900">Ramadan</option>
                                <option value="Brotherhood" class="bg-neutral-900">Brotherhood</option>
                                <option value="Charity" class="bg-neutral-900">Charity</option>
                                <option value="Business" class="bg-neutral-900">Business</option>
                                <option value="Jurisprudence" class="bg-neutral-900">Jurisprudence</option>
                                <option value="News" class="bg-neutral-900">News</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2 text-neutral-400">Post Image</label>
                        <div class="flex items-center gap-4">
                            <div id="image-preview" class="w-16 h-16 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                                <img src="" class="w-full h-full object-cover hidden">
                                <div class="w-full h-full flex items-center justify-center text-[10px] text-neutral-600 empty-state">No Image</div>
                            </div>
                            <div class="flex-grow">
                                <input type="hidden" name="post_image">
                                <input type="file" id="image-upload-input" accept=".jpg,.jpeg,.png" class="hidden" onchange="window.handleImageUpload(event)">
                                <button type="button" onclick="document.getElementById('image-upload-input').click()" class="px-4 py-2.5 glass rounded-lg text-sm font-medium hover:text-primary-500 transition-colors border border-white/10 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    Upload Image
                                </button>
                                <p class="text-[10px] text-neutral-500 mt-2">Recommended: 1200x630px. Max 2MB. JPG, PNG.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2 text-neutral-400">Content</label>
                        <div id="editor-container" class="bg-white/5 border border-white/10 rounded-b-lg min-h-[250px] sm:min-h-[400px] text-neutral-300"></div>
                    </div>
                    
                    <div class="flex justify-end gap-4 pt-4">
                        <button type="button" onclick="window.closeBlogModal()" class="px-6 py-2 text-neutral-400 hover:text-neutral-300 transition-colors">Cancel</button>
                        <button type="submit" class="btn-custom">
                            <span class="inner">Save Post</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Custom Delete Confirmation Modal -->
        <div id="delete-modal" class="fixed inset-0 z-[70] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div class="glass w-full max-w-md rounded-2xl overflow-hidden animate-on-scroll">
                <div class="p-8 text-center space-y-6">
                    <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                        <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-2">Delete Blog Post?</h3>
                        <p class="text-neutral-400 text-sm">Are you sure you want to delete this blog post? This action cannot be undone and the content will be permanently removed.</p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <button id="confirm-delete-btn" onclick="window.handleDeleteConfirm()" class="btn-custom w-full bg-red-600 hover:bg-red-500 border-red-500/50">
                            <span class="inner">Delete Post</span>
                        </button>
                        <button onclick="window.closeDeleteModal()" class="px-6 py-3 text-neutral-400 hover:text-neutral-300 transition-colors text-sm font-medium">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `}window.approveRegistration=async s=>{if(confirm("Are you sure you want to approve this registration? This will create a user account and member record."))try{await c.approveRegistration(s),alert("Registration approved successfully!"),q()}catch(e){alert("Error: "+e.message)}};window.rejectRegistration=async s=>{const e=prompt("Please provide a reason for rejection:");if(e!==null)try{await c.rejectRegistration(s,e),alert("Registration rejected."),q()}catch(t){alert("Error: "+t.message)}};async function q(){const s=document.getElementById("registrations-container");if(s){s.innerHTML='<tr><td colspan="5" class="py-20 text-center text-neutral-500 text-lg">Loading registrations...</td></tr>';try{const e=await c.getPendingRegistrations();if(e.length===0){s.innerHTML='<tr><td colspan="5" class="py-20 text-center text-neutral-500 text-lg">No pending registrations found.</td></tr>';return}s.innerHTML=e.map(t=>`
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td class="py-4 px-6 font-medium">${t.first_name} ${t.surname}</td>
                <td class="py-4 px-6 text-neutral-400">${t.email_address}</td>
                <td class="py-4 px-6 text-sm">
                    <div class="font-medium">${t.institution}</div>
                    <div class="text-xs text-neutral-500">${t.designation}</div>
                </td>
                <td class="py-4 px-6 text-xs text-neutral-500 whitespace-nowrap">${R(t.creation)}</td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="window.approveRegistration('${t.name}')" 
                                class="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                        <button onclick="window.rejectRegistration('${t.name}')" 
                                class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Reject">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("")}catch(e){s.innerHTML=`<tr><td colspan="5" class="py-20 text-center text-red-500">Error: ${e.message}</td></tr>`}}}async function Te(){return setTimeout(()=>q(),100),`
        <div class="space-y-8 animate-on-scroll">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold">Pending Registrations</h2>
            
            <div class="glass rounded-2xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left min-w-[768px]">
                        <thead class="bg-white/5 text-xs uppercase font-bold tracking-widest text-neutral-400">
                            <tr>
                                <th class="py-4 px-6">Name</th>
                                <th class="py-4 px-6">Email</th>
                                <th class="py-4 px-6">Institution</th>
                                <th class="py-4 px-6">Date</th>
                                <th class="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="registrations-container">
                            <!-- Loaded via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `}async function Ge(s){const e=s.name;if(!e)return'<div class="py-20 text-center">Member not found</div>';let t=null;try{t=await c.getMemberDetails(e)}catch(o){return`<div class="py-20 text-center text-red-500">Error: ${o.message}</div>`}return t?`
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center gap-4">
                <button onclick="window.history.back()" class="p-2 glass rounded-full hover:text-primary-500 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <h2 class="text-3xl font-bold">Member Details</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left: Profile Info -->
                <div class="space-y-6">
                    <div class="glass p-8 rounded-3xl flex flex-col items-center text-center">
                        <div class="w-48 h-48 rounded-3xl overflow-hidden mb-6 border-4 border-white/10 group-hover:border-primary-500 transition-colors shadow-2xl">
                            <img src="${t.photo||"/files/default-avatar-white.svg"}" 
                                 alt="${t.first_name}" 
                                 class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-2xl font-bold mb-3">${t.title||""} ${t.first_name} ${t.middle_name||""} ${t.surname}</h3>
                        <p class="text-primary-500 font-semibold uppercase tracking-widest leading-tight text-sm mb-4">${t.designation||"Member"}</p>
                        
                        <div class="flex gap-3">
                            <a href="mailto:${t.email_address}" class="p-3 glass rounded-xl hover:text-primary-500 transition-colors" title="${t.email_address}">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </a>
                            <a href="tel:${t.mobile_number}" class="p-3 glass rounded-xl hover:text-emerald-500 transition-colors" title="${t.mobile_number}">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div class="glass p-6 rounded-2xl space-y-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Basic Information</h4>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Gender</span>
                            <span class="font-medium">${t.gender||"N/A"}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Email</span>
                            <span class="font-medium truncate ml-4" title="${t.email_address}">${t.email_address||"N/A"}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Phone</span>
                            <span class="font-medium">${t.mobile_number||"N/A"}</span>
                        </div>
                    </div>
                </div>

                <!-- Right: Details/Tabs -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Professional Info -->
                    <div class="glass p-8 rounded-3xl">
                        <div class="mb-8 border-b border-white/5 pb-4">
                            <h4 class="text-xl font-bold flex items-center gap-2">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                Professional Information
                            </h4>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                             <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Institution</span>
                                <p class="text-neutral-300 font-medium">${t.institution||"N/A"}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Designation</span>
                                <p class="text-neutral-300 font-medium">${t.designation||"N/A"}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Region</span>
                                <p class="text-neutral-300 font-medium">${t.region||"N/A"}</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Skills & Expertise</span>
                            <div class="prose prose-invert max-w-none text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                ${t.skills||"No detailed bio provided yet."}
                            </div>
                        </div>

                        ${t.professional_memberships&&t.professional_memberships.length>0?`
                        <div class="mt-8 space-y-4">
                             <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Professional Memberships</span>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${t.professional_memberships.map(o=>`
                                    <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p class="font-medium text-sm">${o.professional_body||"Body"}</p>
                                        <p class="text-xs text-neutral-500">${o.profession||"Profession"}</p>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                        `:""}
                    </div>
                </div>
            </div>
        </div>
    `:'<div class="py-20 text-center">Member not found</div>'}let I=[],ee=null;async function De(){return setTimeout(V,0),`
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300">Programmes</h2>
                    <p class="text-neutral-400 text-sm mt-1">Manage PUSMAG events and programmes</p>
                </div>
                <button onclick="window.openProgrammeModal()" class="btn-custom">
                    <span class="inner flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        <span class="hidden sm:inline">New Programme</span>
                    </span>
                </button>
            </div>
            
            <div class="glass overflow-hidden rounded-2xl border border-white/5">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr class="border-b border-white/5 bg-white/5">
                                <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-400">Programme</th>
                                <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-400">Category</th>
                                <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-400">Date/Time</th>
                                <th class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="programmes-container">
                            <tr>
                                <td colspan="4" class="py-12 text-center text-neutral-500">
                                    <div class="animate-pulse">Loading programmes...</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Programme Modal -->
        <div id="programme-modal" class="fixed inset-0 z-[60] hidden">
            <div class="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm" onclick="window.closeProgrammeModal()"></div>
            <div class="absolute inset-y-0 right-0 w-full md:max-w-2xl bg-neutral-900 border-l border-white/10 shadow-2xl flex flex-col animate-slide-in">
                <div class="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 id="modal-title" class="text-xl font-bold">New Programme</h3>
                    <button onclick="window.closeProgrammeModal()" class="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form id="programme-form" class="flex-grow overflow-y-auto p-8 space-y-6" onsubmit="window.handleProgrammeSubmit(event)">
                    <input type="hidden" name="name">
                    
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Programme Title</label>
                        <input type="text" name="title" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300 text-lg font-medium" placeholder="e.g. Annual General Meeting 2026">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Category</label>
                            <select name="category" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300 appearance-none">
                                <option value="Meeting">Meeting</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Community">Community</option>
                                <option value="Religious">Religious</option>
                            </select>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Status</label>
                            <div class="flex items-center mt-3">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name="published" value="1" checked class="sr-only peer">
                                    <div class="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                                    <span class="ml-3 text-sm font-medium text-neutral-300">Published</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Start Date</label>
                            <input type="date" name="start_date" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">End Date (Optional)</label>
                            <input type="date" name="end_date" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300">
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Location</label>
                        <input type="text" name="location" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300" placeholder="Physical location or Link">
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Short Description</label>
                        <textarea name="description" rows="2" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-neutral-300" placeholder="A brief summary for cards..."></textarea>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Featured Image</label>
                        <div class="flex gap-4 items-start">
                            <div id="prog-image-preview" class="w-32 h-32 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                <svg class="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <div class="space-y-3 flex-grow">
                                <label class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 cursor-pointer transition-all text-sm font-bold uppercase tracking-wider">
                                    <span id="upload-status-prog">Upload Image</span>
                                    <input type="file" class="hidden" accept=".jpg,.jpeg,.png" onchange="window.handleProgImageUpload(this)">
                                </label>
                                <p class="text-[10px] text-neutral-500 leading-tight">Recommended: 1200x600px (2:1 ratio). <br>MAX 2MB. JPG, PNG only.</p>
                                <input type="hidden" name="image">
                            </div>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Detailed Content</label>
                        <div id="prog-editor" class="bg-white/5 border border-white/10 rounded-xl min-h-[300px] prose prose-invert max-w-none"></div>
                    </div>

                    <div class="pt-6 border-t border-white/10 flex justify-end">
                        <button type="submit" id="prog-submit-btn" class="btn-custom w-full sm:w-auto">
                            <span class="inner">Save Programme</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Delete Modal -->
        <div id="delete-prog-modal" class="fixed inset-0 z-[70] hidden">
            <div class="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm" onclick="window.closeDeleteProgModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Delete Programme?</h3>
                <p class="text-neutral-400 text-center text-sm mb-8">This action is permanent and cannot be undone.</p>
                <div class="flex gap-4">
                    <button onclick="window.closeDeleteProgModal()" class="flex-grow py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">Cancel</button>
                    <button id="confirm-prog-delete-btn" onclick="window.handleDeleteProgConfirm()" class="flex-grow py-3 px-4 bg-red-500 text-neutral-300 rounded-xl hover:bg-red-600 transition-colors text-sm font-bold uppercase tracking-wider">Delete</button>
                </div>
            </div>
        </div>
    `}let P=null;async function V(){const s=document.getElementById("programmes-container");if(s)try{if(I=await c.getPortalProgrammes(),I.length===0){s.innerHTML='<tr><td colspan="4" class="py-12 text-center text-neutral-500 italic">No programmes found. Create your first one above!</td></tr>';return}s.innerHTML=I.map(e=>`
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                            <img src="${e.image||"/files/default-blog.svg"}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <p class="font-bold text-neutral-300 leading-tight">${e.title}</p>
                            <p class="text-xs text-neutral-500 mt-1">${e.location||"No location"}</p>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${e.published?"bg-emerald-500/10 text-emerald-500":"bg-amber-500/10 text-amber-500"}">
                        ${e.published?"Published":"Draft"}
                    </span>
                    <span class="ml-2 text-[10px] uppercase font-bold text-neutral-500 tracking-widest">${e.category}</span>
                </td>
                <td class="py-4 px-6">
                    <p class="text-sm font-medium text-neutral-300 whitespace-nowrap">${R(e.start_date)}</p>
                </td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="window.openProgrammeModal('${e.name}')" class="p-2 text-neutral-400 hover:text-neutral-300 transition-colors" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onclick="window.openProgDeleteModal('${e.name}')" class="p-2 text-red-500 hover:text-red-400 transition-colors" title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join(""),setTimeout(()=>B(),100)}catch(e){s.innerHTML=`<tr><td colspan="4" class="py-12 text-center text-red-500">Error: ${e.message}</td></tr>`}}window.openProgrammeModal=(s=null)=>{const e=document.getElementById("programme-modal"),t=document.getElementById("programme-form"),o=document.getElementById("modal-title"),a=document.getElementById("prog-image-preview");if(t.reset(),t.name.value=s||"",o.innerText=s?"Edit Programme":"New Programme",a.innerHTML='<svg class="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',P||(P=new Quill("#prog-editor",{theme:"snow",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,!1]}],["link","clean"]]}})),P.setText(""),s){const r=I.find(n=>n.name===s);r&&(t.title.value=r.title||"",t.category.value=r.category||"Meeting",t.start_date.value=r.start_date||"",t.end_date.value=r.end_date||"",t.location.value=r.location||"",t.description.value=r.description||"",t.published.checked=r.published==1,t.image.value=r.image||"",r.image&&(a.innerHTML=`<img src="${r.image}" class="w-full h-full object-cover">`),r.content&&(P.root.innerHTML=r.content))}e.classList.remove("hidden"),document.body.style.overflow="hidden"};window.closeProgrammeModal=()=>{document.getElementById("programme-modal").classList.add("hidden"),document.body.style.overflow="auto"};window.handleProgImageUpload=async s=>{const e=s.files[0];if(!e)return;if(!["image/jpeg","image/jpg","image/png"].includes(e.type)){alert("ONLY JPG, JPEG, and PNG files are allowed.");return}if(e.size>2*1024*1024){alert("File size exceeds 2MB limit.");return}const t=document.getElementById("upload-status-prog"),o=document.getElementById("prog-image-preview"),a=document.getElementById("programme-form").image;try{t.innerText="Uploading...";const r=await c.uploadFile(e);a.value=r,o.innerHTML=`<img src="${r}" class="w-full h-full object-cover">`,t.innerText="Change Image"}catch(r){alert("Upload failed: "+r.message),t.innerText="Upload Image"}};window.handleProgrammeSubmit=async s=>{s.preventDefault();const e=s.target,t=document.getElementById("prog-submit-btn"),o=P.root.innerHTML,a={name:e.name.value,title:e.title.value,category:e.category.value,start_date:e.start_date.value,end_date:e.end_date.value,location:e.location.value,description:e.description.value,published:e.published.checked?1:0,image:e.image.value,content:o};t.disabled=!0,t.innerHTML='<span class="inner">Saving...</span>';try{await c.saveProgramme(a),window.closeProgrammeModal(),V()}catch(r){alert("Error saving programme: "+r.message)}finally{t.disabled=!1,t.innerHTML='<span class="inner">Save Programme</span>'}};window.openProgDeleteModal=s=>{ee=s,document.getElementById("delete-prog-modal").classList.remove("hidden")};window.closeDeleteProgModal=()=>{document.getElementById("delete-prog-modal").classList.add("hidden")};window.handleDeleteProgConfirm=async()=>{const s=document.getElementById("confirm-prog-delete-btn");s.disabled=!0,s.innerHTML="Deleting...";try{await c.deleteProgramme(ee),window.closeDeleteProgModal(),V()}catch(e){alert("Error deleting programme: "+e.message)}finally{s.disabled=!1,s.innerHTML="Delete"}};let _=[],te=null,C=null,x=[],se=["Inauguration","Visit","Meeting","Event"];window.toggleGalleryUploadTab=s=>{const e=document.getElementById("tab-single"),t=document.getElementById("tab-bulk"),o=document.getElementById("gallery-form"),a=document.getElementById("bulk-upload-form");s==="bulk"?(e.classList.remove("border-accent-500","text-accent-500"),e.classList.add("border-transparent","text-neutral-500"),t.classList.add("border-accent-500","text-accent-500"),t.classList.remove("border-transparent","text-neutral-500"),o.classList.add("hidden"),a.classList.remove("hidden")):(t.classList.remove("border-accent-500","text-accent-500"),t.classList.add("border-transparent","text-neutral-500"),e.classList.add("border-accent-500","text-accent-500"),e.classList.remove("border-transparent","text-neutral-500"),a.classList.add("hidden"),o.classList.remove("hidden"))};window.handleBulkFileSelect=s=>{Array.from(s.files).forEach(t=>{if(!["image/jpeg","image/jpg","image/png"].includes(t.type)||t.size>2*1024*1024)return;const o=Math.random().toString(36).substr(2,9),a=URL.createObjectURL(t);x.push({id:o,file:t,preview:a,title:t.name.split(".")[0].replace(/[-_]/g," "),category:"Event",status:"pending"})}),s.value="",j()};window.removeStagedFile=s=>{const e=x.findIndex(t=>t.id===s);e>-1&&(URL.revokeObjectURL(x[e].preview),x.splice(e,1),j())};window.updateStagedFile=(s,e,t)=>{const o=x.find(a=>a.id===s);o&&(o[e]=t)};function j(){const s=document.getElementById("staged-files-container"),e=document.getElementById("start-bulk-upload-btn");if(s){if(x.length===0){s.innerHTML=`
            <div class="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p class="text-neutral-500 text-sm">No images selected yet.</p>
            </div>
        `,e&&e.classList.add("hidden");return}e&&e.classList.remove("hidden"),s.innerHTML=x.map((t,o)=>`
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 glass rounded-xl border border-white/5 group">
            <div class="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                <img src="${t.preview}" class="w-full h-full object-cover">
                ${t.status==="success"?`
                    <div class="absolute inset-0 bg-emerald-500/80 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                `:""}
                ${t.status==="uploading"?`
                    <div class="absolute inset-0 bg-neutral-900/60 flex items-center justify-center">
                        <div class="w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                `:""}
                ${t.status==="error"?`
                    <div class="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                `:""}
            </div>
            
            <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <input type="text" 
                       value="${t.title}" 
                       oninput="window.updateStagedFile('${t.id}', 'title', this.value)"
                       placeholder="Image Title"
                       class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:border-accent-500 outline-none w-full"
                       ${t.status!=="pending"?"disabled":""}>
                
                <select onchange="window.updateStagedFile('${t.id}', 'category', this.value)"
                        class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:border-accent-500 outline-none w-full"
                        ${t.status!=="pending"?"disabled":""}>
                    ${se.map(a=>`<option value="${a}" ${t.category===a?"selected":""} class="bg-neutral-900">${a}</option>`).join("")}
                </select>
            </div>
            
            <button onclick="window.removeStagedFile('${t.id}')" 
                    class="p-2 text-neutral-500 hover:text-red-500 transition-colors ${t.status!=="pending"?"invisible":""}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
    `).join("")}}window.startBulkUpload=async()=>{if(x.length===0){alert("Please select images to upload first.");return}const s=document.getElementById("start-bulk-upload-btn"),e=document.getElementById("close-gallery-modal-btn");s.disabled=!0,s.innerHTML='<span class="inner">Processing...</span>',e&&(e.disabled=!0);for(const a of x)if(a.status!=="success"){try{a.status="uploading",j();const r=await c.uploadFile(a.file);await c.saveGalleryImage({image_title:a.title,image_category:a.category,image_link:r}),a.status="success"}catch(r){console.error(r),a.status="error"}j()}const t=x.filter(a=>a.status==="success").length;s.innerHTML=`<span class="inner">Uploaded ${t}/${x.length}</span>`,e&&(e.disabled=!1),D(),x.filter(a=>a.status!=="success").length===0?setTimeout(()=>{window.closeGalleryModal(),x.forEach(a=>URL.revokeObjectURL(a.preview)),x=[]},2e3):(s.disabled=!1,s.innerHTML='<span class="inner">Retry Failed</span>')};async function He(){return setTimeout(D,0),`
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300">Media Gallery</h2>
                    <p class="text-neutral-500 text-sm mt-1">Share photos and videos from events</p>
                </div>
                <button onclick="window.openGalleryModal()" class="btn-custom">
                    <span class="inner flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        <span class="hidden sm:inline">Add Media</span>
                    </span>
                </button>
            </div>
            
            <div id="gallery-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Gallery items will be rendered here -->
                <div class="lg:col-span-4 py-20 text-center text-neutral-500">
                    <div class="animate-pulse">Loading gallery...</div>
                </div>
            </div>
        </div>

        <!-- Gallery Lightbox -->
        <div id="gallery-lightbox" class="fixed inset-0 z-[100] hidden bg-neutral-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <button onclick="window.closeGalleryLightbox()" class="absolute top-6 right-6 text-neutral-300/50 hover:text-neutral-300 transition-colors z-50">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

            <button onclick="window.prevGalleryImage()" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300/50 hover:text-neutral-300 transition-colors">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <button onclick="window.nextGalleryImage()" class="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300/50 hover:text-neutral-300 transition-colors">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>

            <div class="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
                <img id="lightbox-image" src="" alt="" class="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg pointer-events-auto transition-all duration-300">
                
                <div class="mt-8 text-center pointer-events-auto">
                    <span id="lightbox-category" class="inline-block text-[10px] font-bold text-accent-500 uppercase tracking-widest mb-2 border border-accent-500/30 px-3 py-1 rounded-full bg-accent-500/5"></span>
                    <h3 id="lightbox-title" class="text-2xl md:text-3xl font-bold text-neutral-300 mb-2"></h3>
                    <p id="lightbox-counter" class="text-neutral-500 text-sm font-medium"></p>
                </div>
            </div>
        </div>

        <!-- Gallery Modal -->
        <div id="gallery-modal" class="fixed inset-0 z-[60] hidden items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm">
            <div class="glass w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold">Add Media</h3>
                    <button id="close-gallery-modal-btn" onclick="window.closeGalleryModal()" class="text-neutral-400 hover:text-neutral-300 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <!-- Tabs -->
                <div class="flex border-b border-white/5 mb-6">
                    <button id="tab-single" onclick="window.toggleGalleryUploadTab('single')" class="px-6 py-2 text-xs font-bold uppercase tracking-wider border-b-2 border-accent-500 text-accent-500 transition-all">Single Upload</button>
                    <button id="tab-bulk" onclick="window.toggleGalleryUploadTab('bulk')" class="px-6 py-2 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 transition-all">Bulk Upload</button>
                </div>
                
                <div class="flex-grow overflow-y-auto custom-scrollbar p-6">
                    <!-- Single Upload Form -->
                    <form id="gallery-form" class="space-y-6" onsubmit="window.handleGallerySubmit(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-6">
                                <div class="space-y-2">
                                    <label class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Image Title</label>
                                    <input type="text" name="image_title" required class="text-xs w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-500 transition-colors outline-none text-neutral-300" placeholder="e.g. Inauguration Ceremony">
                                </div>

                                <div class="space-y-2">
                                    <label class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Category</label>
                                    <select name="image_category" required class="text-xs w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-500 transition-colors outline-none text-neutral-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%207L10%2010L13%207%22%20stroke%3D%22%23a3a3a3%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat">
                                        ${se.map(s=>`<option value="${s}" class="bg-neutral-900">${s}</option>`).join("")}
                                    </select>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-xs font-bold text-neutral-400 uppercase tracking-wider">Image File</label>
                                <div class="relative group">
                                    <div id="gallery-image-preview" class="text-xs w-full h-44 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4">
                                        <svg class="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <label class="block">
                                        <span class="sr-only">Choose File</span>
                                        <input type="file" accept=".jpg,.jpeg,.png" onchange="window.handleGalleryImageUpload(this)" class="block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-accent-500/10 file:text-accent-500 hover:file:bg-accent-500/20 cursor-pointer">
                                    </label>
                                    <input type="hidden" name="image_link" required>
                                    <span id="gallery-upload-status" class="absolute top-2 right-2 px-2 py-1 bg-neutral-900/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-neutral-300 hidden">Uploading...</span>
                                </div>
                            </div>
                        </div>

                        <div class="px-8 pb-12 pt-6">
                            <button type="submit" id="gallery-submit-btn" class="btn-custom w-full" disabled>
                                <span class="inner">Add to Gallery</span>
                            </button>
                        </div>
                    </form>

                    <!-- Bulk Upload Form -->
                    <div id="bulk-upload-form" class="hidden space-y-6 pb-8">
                        <div class="p-8 border-2 border-dashed border-white/5 rounded-2xl text-center group hover:border-accent-500/50 transition-all cursor-pointer relative">
                            <input type="file" multiple accept=".jpg,.jpeg,.png" onchange="window.handleBulkFileSelect(this)" class="absolute inset-0 opacity-0 cursor-pointer">
                            <div class="space-y-4">
                                <div class="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <svg class="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <p class="text-neutral-300 font-bold">Click or drag images here</p>
                                    <p class="text-neutral-500 text-xs mt-1">Select multiple JPG or PNG files (Max 2MB each)</p>
                                </div>
                            </div>
                        </div>

                        <div id="staged-files-container" class="space-y-4">
                            <!-- Staged files list -->
                        </div>

                        <div class="px-8 pb-12 pt-6">
                            <button onclick="window.startBulkUpload()" id="start-bulk-upload-btn" class="btn-custom w-full hidden">
                                <span class="inner">Start Upload</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gallery Delete Modal -->
        <div id="delete-gallery-modal" class="fixed inset-0 z-[70] hidden">
            <div class="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm" onclick="window.closeDeleteGalleryModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Remove from Gallery?</h3>
                <p class="text-neutral-400 text-center text-sm mb-8">This action is permanent and cannot be undone.</p>
                <div class="flex gap-4">
                    <button onclick="window.closeDeleteGalleryModal()" class="flex-grow py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">Cancel</button>
                    <button id="confirm-gallery-delete-btn" onclick="window.handleDeleteGalleryConfirm()" class="flex-grow py-3 px-4 bg-red-500 text-neutral-300 rounded-xl hover:bg-red-600 transition-colors text-sm font-bold uppercase tracking-wider">Delete</button>
                </div>
            </div>
        </div>
    `}async function D(){const s=document.getElementById("gallery-grid");if(s)try{if(_=await c.getPortalGallery(),_.length===0){s.innerHTML='<div class="lg:col-span-4 py-20 text-center text-neutral-500 italic">No images in gallery. Upload your first one above!</div>';return}window.galleryData={images:_,currentIndex:0},s.innerHTML=_.map((e,t)=>`
            <div class="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/5 animate-on-scroll">
                <img src="${e.image_link}" alt="${e.image_title}" 
                     onclick="window.openGalleryLightbox(${t})"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer">
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end pointer-events-none">
                    <p class="font-bold text-neutral-300 text-sm line-clamp-1">${e.image_title||"Untitled"}</p>
                    <div class="flex items-center justify-between mt-2 pointer-events-auto">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-accent-500">${e.image_category}</span>
                        <div class="flex gap-2">
                            <button onclick="window.openGalleryModal('${e.name}')" class="p-2 bg-white/10 text-neutral-300 rounded-lg hover:bg-white/20 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            <button onclick="window.openDeleteGalleryModal('${e.name}')" class="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-neutral-300 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join(""),setTimeout(()=>B(),100)}catch(e){s.innerHTML=`<div class="lg:col-span-4 py-20 text-center text-red-500">Error: ${e.message}</div>`}}window.openGalleryModal=(s=null)=>{const e=document.getElementById("gallery-modal"),t=document.getElementById("gallery-form"),o=document.getElementById("gallery-image-preview"),a=e.querySelector("h3"),r=document.getElementById("gallery-submit-btn"),n=e.querySelector(".flex.border-b.border-white\\/5");if(C=s,t.reset(),o.innerHTML='<svg class="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',x.forEach(l=>URL.revokeObjectURL(l.preview)),x=[],j(),window.toggleGalleryUploadTab("single"),s){n&&n.classList.add("hidden");const l=_.find(i=>i.name===s);l&&(t.image_title.value=l.image_title||"",t.image_category.value=l.image_category||"Event",t.image_link.value=l.image_link||"",l.image_link&&(o.innerHTML=`<img src="${l.image_link}" class="w-full h-full object-cover">`,r.disabled=!1),a.innerText="Edit Media",r.innerHTML='<span class="inner">Update Image</span>')}else n&&n.classList.remove("hidden"),a.innerText="Add Media",r.innerHTML='<span class="inner">Add to Gallery</span>',r.disabled=!0;e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden"};window.closeGalleryModal=()=>{const s=document.getElementById("gallery-modal");s.classList.add("hidden"),s.classList.remove("flex"),document.body.style.overflow="auto",x.forEach(e=>URL.revokeObjectURL(e.preview)),x=[]};window.handleGalleryImageUpload=async s=>{const e=s.files[0];if(!e)return;if(!["image/jpeg","image/jpg","image/png"].includes(e.type)){alert("ONLY JPG, JPEG, and PNG files are allowed.");return}if(e.size>2*1024*1024){alert("File size exceeds 2MB limit.");return}const t=document.getElementById("gallery-upload-status"),o=document.getElementById("gallery-image-preview"),a=document.getElementById("gallery-form").image_link,r=document.getElementById("gallery-submit-btn");try{t.classList.remove("hidden"),t.innerText="Uploading...",r.disabled=!0;const n=await c.uploadFile(e);a.value=n,o.innerHTML=`<img src="${n}" class="w-full h-full object-cover">`,t.innerText="Upload Complete",r.disabled=!1,setTimeout(()=>t.classList.add("hidden"),2e3)}catch(n){alert("Upload failed: "+n.message),t.classList.add("hidden"),r.disabled=!a.value}};window.handleGallerySubmit=async s=>{s.preventDefault();const e=s.target,t=document.getElementById("gallery-submit-btn"),o={name:C,image_title:e.image_title.value,image_category:e.image_category.value,image_link:e.image_link.value};if(!o.image_link){alert("Please upload an image first.");return}t.disabled=!0,t.innerHTML=`<span class="inner">${C?"Updating...":"Adding..."} Image</span>`;try{await c.saveGalleryImage(o),window.closeGalleryModal(),D()}catch(a){alert(`Error ${C?"updating":"adding"} gallery image: ${a.message}`)}finally{t.disabled=!1,t.innerHTML=`<span class="inner">${C?"Update":"Add to"} Gallery</span>`}};window.openDeleteGalleryModal=s=>{te=s,document.getElementById("delete-gallery-modal").classList.remove("hidden")};window.closeDeleteGalleryModal=()=>{document.getElementById("delete-gallery-modal").classList.add("hidden")};window.handleDeleteGalleryConfirm=async()=>{const s=document.getElementById("confirm-gallery-delete-btn");s.disabled=!0,s.innerHTML="Deleting...";try{await c.deleteGalleryImage(te),window.closeDeleteGalleryModal(),D()}catch(e){alert("Error deleting image: "+e.message)}finally{s.disabled=!1,s.innerHTML="Delete"}};window.openGalleryLightbox=(s,e=!1)=>{const t=document.getElementById("gallery-lightbox"),o=document.getElementById("lightbox-image"),a=document.getElementById("lightbox-title"),r=document.getElementById("lightbox-category"),n=document.getElementById("lightbox-counter"),l=()=>{window.galleryData.currentIndex=s;const i=window.galleryData.images[s];o.src=i.image_link||"",a.textContent=i.image_title||"Untitled",r.textContent=i.image_category||"General",n.textContent=`${s+1} / ${window.galleryData.images.length}`};e?(o.classList.add("animate-gallery-fade-out"),setTimeout(()=>{o.classList.remove("animate-gallery-fade-out"),l(),o.classList.add("animate-gallery-fade-in"),setTimeout(()=>o.classList.remove("animate-gallery-fade-in"),300)},300)):l(),t.classList.remove("hidden"),t.classList.add("flex"),document.body.style.overflow="hidden"};window.closeGalleryLightbox=()=>{const s=document.getElementById("gallery-lightbox");s&&(s.classList.add("hidden"),s.classList.remove("flex"),document.body.style.overflow="auto")};window.nextGalleryImage=()=>{if(!window.galleryData||!window.galleryData.images.length)return;const s=(window.galleryData.currentIndex+1)%window.galleryData.images.length;window.openGalleryLightbox(s,!0)};window.prevGalleryImage=()=>{if(!window.galleryData||!window.galleryData.images.length)return;const s=(window.galleryData.currentIndex-1+window.galleryData.images.length)%window.galleryData.images.length;window.openGalleryLightbox(s,!0)};const ae=s=>{const e=document.getElementById("gallery-lightbox");!e||e.classList.contains("hidden")||(s.key==="Escape"&&window.closeGalleryLightbox(),s.key==="ArrowRight"&&window.nextGalleryImage(),s.key==="ArrowLeft"&&window.prevGalleryImage())};document.removeEventListener("keydown",ae);document.addEventListener("keydown",ae);window.togglePortalSidebar=()=>{const s=document.getElementById("portal-sidebar"),e=document.getElementById("portal-sidebar-overlay");s&&e&&(s.classList.toggle("translate-x-0"),s.classList.toggle("-translate-x-full"),e.classList.toggle("hidden"))};window.toggleAyahAudio=()=>{const s=document.getElementById("ayah-audio"),e=document.getElementById("ayah-play-btn");!s||!e||(s.paused?(s.play(),e.innerHTML='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>'):(s.pause(),e.innerHTML='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>'),s.onended=()=>{e.innerHTML='<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>'})};const ze=s=>{const e=Array.isArray(s)?s:[];return e.includes("PuSMAG Admin")?"Admin":e.includes("PuSMAG Blogger")?"Blogger":e.includes("PuSMAG Member")?"Member":"User"};async function N(s){let e=s.section||"dashboard";s.name&&(e="member");const t=f.user;if(!t)return f.navigate("/login"),"";const o=Array.isArray(t&&t.roles)?t.roles:[],a=ze(o),r=o.includes("PuSMAG Admin"),n=o.includes("PuSMAG Blogger")||r,l=o.includes("PuSMAG Member")&&!n;let i={total_members:"...",active_programmes:"...",your_posts:"..."},d=null;const u=t&&t.email;if(e==="dashboard")try{if(u){const m=await Promise.allSettled([c.getPortalStats(),c.getVerseOfTheDay()]);m[0].status==="fulfilled"&&(i=m[0].value),m[1].status==="fulfilled"&&(d=m[1].value)}else try{d=await c.getVerseOfTheDay()}catch(m){console.error("Failed to fetch verse for guest:",m)}}catch(m){console.error("Failed to fetch dashboard data",m)}const h=[{id:"dashboard",label:"Dashboard",icon:"grid"},{id:"members",label:"Members",icon:"users",roles:["PuSMAG Member","PuSMAG Blogger","PuSMAG Admin"]},{id:"blog",label:"Blog Posts",icon:"file-text",roles:["PuSMAG Blogger","PuSMAG Admin"]},{id:"registrations",label:"Registrations",icon:"user-plus",roles:["PuSMAG Admin"]},{id:"programmes",label:"Programmes",icon:"calendar",roles:["PuSMAG Admin"]},{id:"gallery",label:"Gallery",icon:"image",roles:["PuSMAG Admin"]}];h.find(m=>m.id===e)||h[0];const p=m=>`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${g(m)}"></path></svg>`,g=m=>{switch(m){case"grid":return"M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z";case"users":return"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z";case"file-text":return"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";case"user-plus":return"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z";case"calendar":return"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";case"image":return"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z";default:return""}};let b="";switch(e){case"members":b=await Ie();break;case"blog":b=await Ae();break;case"registrations":b=await Te();break;case"programmes":b=await De();break;case"gallery":b=await He();break;case"member":b=await Ge(s);break;default:b=`
                <div class="space-y-8 animate-on-scroll">
                    <div class="flex items-center justify-between">
                        <h2 class="text-3xl font-bold">Welcome, ${t.first_name||"Member"}</h2>
                        <span class="px-2 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-semibold uppercase tracking-wider">
                            ${a}
                        </span>
                    </div>
                    
                    ${d?`
                    <div class="glass p-8 rounded-2xl relative overflow-hidden group border-primary-500/20 shadow-2xl shadow-primary-500/5">
                        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors duration-1000"></div>
                        
                        <div class="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-neutral-300 leading-tight">Verse of the Day</h3>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-[10px] font-bold uppercase tracking-wider text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded">
                                            Surah ${d.surahNo}:${d.ayahNo}
                                        </span>
                                        <span class="text-neutral-500 text-xs">${d.surahName} (${d.surahNameTranslation})</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="md:text-right w-full md:w-auto">
                                <span class="text-2xl font-arabic text-primary-400 drop-shadow-sm" dir="rtl">
                                    ${d.surahNameArabic} : آية ${new Intl.NumberFormat("ar-SA",{useGrouping:!1}).format(d.ayahNo)}
                                </span>
                            </div>
                        </div>

                        <div class="relative space-y-4">
                            <div class="text-2xl md:text-3xl lg:text-4xl text-neutral-300 font-arabic leading-[1.8] text-center py-4 px-4" dir="rtl">
                                ${d.arabic1}
                            </div>
                            
                            <div class="max-w-3xl mx-auto text-md md:text-lg text-neutral-300 text-center leading-relaxed font-medium italic">
                                <span class="text-primary-500 text-3xl opacity-30 leading-none">"</span>
                                ${d.english}
                                <span class="text-primary-500 text-3xl opacity-30 leading-none">"</span>
                            </div>

                            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                                <div class="flex items-center gap-3">
                                    <button onclick="window.toggleAyahAudio()" 
                                            id="ayah-play-btn"
                                            class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-neutral-900 hover:bg-primary-400 transition-all hover:scale-105 shadow-xl shadow-primary-500/20 active:scale-95">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                                    </button>
                                    <div class="text-xs">
                                        <div class="text-sm text-neutral-300 font-bold mb-1">Listen to Recitation</div>
                                        <div class="text-neutral-500 text-xs">Mishary Rashid Al Afasy</div>
                                    </div>
                                </div>
                                <audio id="ayah-audio" src="${d.audio[1].url}" preload="none"></audio>
                                
                                <div class="flex items-center gap-2 text-neutral-500">
                                    <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                                    <span class="text-[10px] uppercase tracking-widest font-bold">Daily Inspiration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `:""}

                    <div class="grid grid-cols-1 ${l?"md:grid-cols-2":"md:grid-cols-3"} gap-6">
                        <div class="glass p-4 rounded-xl border-l-4 border-primary-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Total Members</p>
                            <h3 class="text-5xl font-semibold">${i.total_members}</h3>
                        </div>
                        <div class="glass p-4 rounded-xl border-l-4 border-accent-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Active Programmes</p>
                            <h3 class="text-5xl font-semibold">${i.active_programmes}</h3>
                        </div>
                        ${l?"":`
                        <div class="glass p-4 rounded-xl border-l-4 border-emerald-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Your Posts</p>
                            <h3 class="text-5xl font-semibold">${i.your_posts}</h3>
                        </div>
                        `}
                    </div>

                    <div class="glass p-6 rounded-xl">
                        <h3 class="text-lg font-bold mb-3">Quick Stats & Activity</h3>
                        <p class="text-sm text-neutral-400">Welcome to your PuSMAG Portal. Use the sidebar to navigate through your available tools.</p>
                    </div>

                    
                </div>
            `}return`
        <div class="min-h-screen pt-20 flex">
            <!-- Mobile Sidebar Overlay -->
            <div id="portal-sidebar-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden md:hidden" onclick="window.togglePortalSidebar()"></div>
            
            <!-- Mobile Portal Menu Button (distinct from main navbar) -->
            <button 
                onclick="window.togglePortalSidebar()"
                class="fixed top-24 left-4 z-50 md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all active:scale-95"
                aria-label="Toggle Portal Menu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            
            <!-- Sidebar -->
            <aside id="portal-sidebar" class="w-64 bg-neutral-900/95 md:bg-neutral-900/40 backdrop-blur-md border-r border-white/10 flex flex-col fixed inset-y-0 pt-20 z-40 -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
                <!-- Mobile Close Button -->
                <div class="md:hidden p-4 border-b border-white/10 flex items-center justify-between">
                    <span class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Portal Menu</span>
                    <button onclick="window.togglePortalSidebar()" class="text-neutral-400 hover:text-neutral-300 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="p-6 flex-grow overflow-y-auto">
                    <nav class="space-y-1">
                        ${h.filter(m=>!m.roles||m.roles.some(w=>t.roles.includes(w))).map(m=>`
                            <a href="/portal/${m.id}" 
                               class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${e===m.id?"bg-primary-500/20 text-primary-500 border border-primary-500/20":"text-neutral-400 hover:text-neutral-300 hover:bg-white/5"}">
                                ${p(m.icon)}
                                <span class="text-sm font-medium">${m.label}</span>
                            </a>
                        `).join("")}
                    </nav>
                </div>
                
                <div class="p-6 border-t border-white/5">
                    <button onclick="window.handleLogout()" class="cursor-pointer flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-red-500 transition-colors uppercase text-xs font-bold tracking-widest">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="flex-grow md:ml-64 p-6 md:p-10 lg:p-12 pt-24 md:pt-12 overflow-y-auto">
                <div class="max-w-6xl mx-auto">
                    ${b}
                </div>
            </main>
        </div>
    `}function Q(s){const e=i=>i==="/"?"/":`${M}${i}`,t=[{path:e("/"),label:"Home"},{label:"Who We Are",children:[{path:e("/about"),label:"About Us"},{path:e("/mission-vision"),label:"Mission & Vision"},{path:e("/guiding-principles"),label:"Guiding Principles"},{path:e("/objectives"),label:"Objectives"},{path:e("/governance"),label:"Governance"},{path:e("/ethics"),label:"Ethics"}]},{path:e("/programmes"),label:"Programmes"},{path:e("/blog-news"),label:"Blog"},{path:e("/gallery"),label:"Gallery"},{path:e("/contact"),label:"Contact"}],o=i=>s===i?"text-neutral-300":"text-neutral-400",a=i=>i.some(d=>d.path===s)?"text-neutral-300":"text-neutral-400",r=f.user,n=!!(r&&r.email),l=n&&Array.isArray(r.roles)&&(r.roles.includes("PuSMAG Member")||r.roles.includes("PuSMAG Admin"));return`
    <nav class="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-white/10">
      <div class="container-custom">
        <div class="flex justify-between items-center py-6">
          <!-- Logo -->
          <a href="${e("/")}" class="flex items-center gap-3 group">
            <img src="/files/pusmag_logo_small_01.png" alt="PUSMAG Logo" class="w-10 h-10 object-contain">
            <span class="text-lg font-semibold tracking-tight text-neutral-300">PuSMAG</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            ${t.map(i=>i.children?`
                        <div class="relative group">
                            <button class="flex items-center gap-1 text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${a(i.children)}">
                                ${i.label}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div class="absolute left-0 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                <div class="bg-neutral-900 border border-white/10 rounded-lg p-2 shadow-xl">
                                    ${i.children.map(d=>`
                                        <a href="${d.path}" class="block px-4 py-2 text-sm text-neutral-400 hover:text-neutral-300 hover:bg-white/5 rounded-md transition-colors ${o(d.path)}">
                                            ${d.label}
                                        </a>
                                    `).join("")}
                                </div>
                            </div>
                        </div>
                    `:`
        <a href="${i.path}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${o(i.path)}">
            ${i.label}
        </a>
    `).join("")}
</div>

<!-- CTA Button -->
<div class="hidden md:flex items-center gap-6">
  ${n?`
              <div class="flex items-center gap-4">
                ${l?`
                <a href="${e("/portal")}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${s.startsWith(e("/portal"))?"text-neutral-300":"text-neutral-400"}">
                    Portal
                </a>
                `:""}
                <button onclick="window.handleLogout()" class="cursor-pointer text-xs font-medium tracking-widest uppercase text-red-500/80 hover:text-red-500 transition-colors">
                    Logout
                </button>
                <div class="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                    <img src="${r.user_image||"/files/default-avatar-white.svg"}" class="w-full h-full object-cover">
                </div>
              </div>
            `:`
              <a href="${e("/register")}" class="btn-custom">
                <span class="inner">Register</span>
              </a>
              <a href="${e("/login")}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors">
                Login
              </a>
            `}
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden text-neutral-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden pb-6">
          ${t.map(i=>i.children?`
                    <div class="py-3 border-b border-white/5">
                        <span class="block text-sm font-medium text-neutral-400 mb-2">${i.label}</span>
                        <div class="pl-4 space-y-2">
                            ${i.children.map(d=>`
                                <a href="${d.path}" class="block py-2 text-sm ${o(d.path)} hover:text-neutral-300 transition-colors">
                                    ${d.label}
                                </a>
                            `).join("")}
                        </div>
                    </div>
                  `:`
                <a href="${i.path}" class="block py-3 text-sm font-medium ${o(i.path)} hover:text-neutral-300 transition-colors border-b border-white/5 last:border-0">
                    ${i.label}
                </a>
              `).join("")}
          ${n?`
            ${l?`<a href="${e("/portal")}" class="block py-3 text-sm font-medium hover:text-neutral-300 transition-colors border-b border-white/5">Portal</a>`:""}
            <button onclick="window.handleLogout()" class="cursor-pointer block py-3 text-sm font-medium text-red-500 hover:text-red-400 transition-colors">Logout</button>
          `:`
            <a href="${e("/register")}" class="block py-3 text-sm font-medium hover:text-neutral-300 transition-colors border-b border-white/5">Register</a>
            <a href="${e("/login")}" class="block py-3 text-sm font-medium text-neutral-400 hover:text-neutral-300 transition-colors">Login</a>
          `}
        </div>
      </div>
    </nav>
  `}function K(){const s=e=>e==="/"?"/":`${M}${e}`;return`
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
              <li><a href="${s("/about")}" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">About Us</a></li>
              <li><a href="${s("/programmes")}" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Programmes</a></li>
              <li><a href="${s("/blog-news")}" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Blog</a></li>
              <li><a href="${s("/gallery")}" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Gallery</a></li>
            </ul>
          </div>

          <!-- Membership -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Membership</h3>
            <ul class="space-y-2">
              <li><a href="${s("/register")}" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Become a Member</a></li>
              <li><a href="#" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Benefits</a></li>
              <li><a href="#" class="text-neutral-400 hover:text-neutral-300 transition-colors text-sm">Pay Dues</a></li>
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
            <a href="#" class="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-neutral-300 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  `}const Ne={"/":ce,"/about":me,"/mission-vision":pe,"/guiding-principles":ge,"/objectives":he,"/governance":ve,"/ethics":be,"/programmes":fe,"/programmes/:id":we,"/blog-news":ke,"/blog-news/:id":Me,"/gallery":Le,"/contact":Be,"/forgot-password":je,"/update-password":Ee,"/register":Pe,"/login":$e,"/portal":N,"/portal/:section":N,"/portal/member/:name":N};class Fe{constructor(){this.currentPath=window.location.pathname,this.user=null}async init(){await this.handleRoute()}async navigate(e){let t=e;t!==window.location.pathname&&(window.history.pushState({},"",t),this.currentPath=t,await this.handleRoute())}async handleRoute(){let e=window.location.pathname;if(e.startsWith(M)&&(e=e.substring(M.length)),e.length>1&&e.endsWith("/")&&(e=e.slice(0,-1)),e.startsWith("/")||(e="/"+e),this.currentPath=e,!this.user&&!["/login","/register"].includes(e))try{const{api:n}=await W(async()=>{const{api:l}=await Promise.resolve().then(()=>J);return{api:l}},void 0);this.user=await n.getUserInfo()}catch{this.user=null}let t=null,o={};for(const[n,l]of Object.entries(Ne)){const i=this.matchRoute(n,e);if(i){t=l,o=i.params;break}}const a=!!(this.user&&this.user.email),r=a&&Array.isArray(this.user.roles)&&(this.user.roles.includes("PuSMAG Member")||this.user.roles.includes("PuSMAG Admin"));if(e.startsWith("/portal")){if(!a){console.log("Access denied. Redirecting to login."),this.navigate("/login");return}if(!r){console.log("Not authorized for portal. Redirecting home."),this.navigate("/");return}}t?this.render(t,o):(console.log("No route matched for:",e),this.render404()),window.scrollTo(0,0)}matchRoute(e,t){if(e==="/"&&t==="/")return{params:{}};if(e==="/"&&t!=="/")return null;const o=e.split("/").filter(Boolean),a=t.split("/").filter(Boolean);if(o.length!==a.length)return null;const r={};for(let n=0;n<o.length;n++)if(o[n].startsWith(":")){const l=o[n].slice(1);r[l]=a[n]}else if(o[n]!==a[n])return null;return{params:r}}async render(e,t={}){const o=document.getElementById("app");if(!document.getElementById("navbar")){o.innerHTML=`
              <div id="navbar"></div>
              <main id="main-content" class="min-h-screen"></main>
              <div id="footer"></div>
            `;const n=document.getElementById("footer");n.innerHTML=K()}const a=document.getElementById("navbar");a.innerHTML=Q(window.location.pathname);const r=document.getElementById("main-content");try{const n=await e(t);r.innerHTML=n}catch(n){console.error("Error rendering page:",n),r.innerHTML='<div class="pt-32 text-center text-red-500">Error loading content. Please try again.</div>'}setTimeout(()=>B(),100),this.updateNavbarActiveState()}updateNavbarActiveState(){const e=document.querySelectorAll("nav a"),t=window.location.pathname;e.forEach(o=>{o.getAttribute("href")===t?(o.classList.add("text-neutral-300"),o.classList.remove("text-neutral-400")):(o.classList.remove("text-neutral-300"),o.classList.add("text-neutral-400"))})}render404(){const e=document.getElementById("app");document.getElementById("navbar")||(e.innerHTML=`
                <div id="navbar"></div>
                <main id="main-content"></main>
                 <div id="footer"></div>
            `,document.getElementById("navbar").innerHTML=Q(window.location.pathname),document.getElementById("footer").innerHTML=K());const t=document.getElementById("main-content");t.innerHTML=`
          <div class="min-h-screen flex items-center justify-center pt-20">
            <div class="text-center">
              <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">404</h1>
              <p class="text-xl mb-8 text-neutral-400">Page not found</p>
              <a href="${M}/" class="btn-custom">
                <span class="inner">Go Home</span>
              </a>
            </div>
          </div>
        `}async logout(){try{const{api:e}=await W(async()=>{const{api:t}=await Promise.resolve().then(()=>J);return{api:t}},void 0);await e.logout()}catch(e){console.error("Logout error:",e)}finally{this.user=null,this.navigate("/login")}}}const f=new Fe;window.handleLogout=()=>f.logout();window.onerror=function(s,e,t,o,a){const r=`
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; color: #ff5555; z-index: 9999; padding: 20px; font-family: monospace; overflow: auto;">
            <h2 style="font-size: 24px; margin-bottom: 20px;">Startup Error</h2>
            <div style="margin-bottom: 10px;"><strong>Message:</strong> ${s}</div>
            <div style="margin-bottom: 10px;"><strong>File:</strong> ${e}:${t}:${o}</div>
            <pre style="background: #1a1a1a; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${a?.stack||"No stack trace available"}</pre>
        </div>
    `;document.body.innerHTML+=r,console.error("Global error:",a)};try{document.addEventListener("DOMContentLoaded",async()=>{window.router=f,await f.init(),B(),document.addEventListener("click",s=>{const e=s.target.closest('a[href^="/"]');if(e&&!e.getAttribute("href").startsWith("/files/")&&e.getAttribute("target")!=="_blank"){s.preventDefault();const t=e.getAttribute("href");f.navigate(t)}}),window.addEventListener("popstate",async()=>{await f.handleRoute()}),document.addEventListener("click",s=>{if(s.target.closest("#mobile-menu-btn")){const t=document.getElementById("mobile-menu");t&&t.classList.toggle("hidden")}})})}catch(s){console.error("Initialization error:",s),window.onerror(s.message,"main.js",0,0,s)}
