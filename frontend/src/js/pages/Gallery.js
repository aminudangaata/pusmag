import { api } from '../utils/api.js'

export async function GalleryPage() {
  let images = []
  let categories = []

  try {
    const [imgs, cats] = await Promise.all([
      api.getGalleryImages({ limit: 100 }),
      api.getGalleryCategories()
    ])
    images = imgs
    categories = cats
  } catch (error) {
    console.log('Using fallback data')
    images = Array(6).fill(null).map((_, i) => ({
      id: i,
      title: 'Gallery Image',
      category: i % 2 === 0 ? 'Events' : 'Meetings'
    }))
    categories = ['Events', 'Meetings']
  }

  const renderFilters = () => `
        <div class="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
            <button class="filter-btn active px-6 py-2 rounded-full border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20" data-filter="all">
                All
            </button>
            ${categories.map(cat => `
                <button class="filter-btn px-6 py-2 rounded-full border border-white/10 text-neutral-400 hover:text-white transition-all hover:bg-white/10" data-filter="${cat}">
                    ${cat}
                </button>
            `).join('')}
        </div>
    `

  const html = `
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
            ${renderFilters()}
            
          <div id="gallery-grid" class="columns-1 md:columns-2 lg:columns-4 gap-6 min-h-[50vh] space-y-6">
            ${images.map((image, index) => `
              <div class="gallery-item break-inside-avoid rounded-xl overflow-hidden hover-lift hover-glow cursor-pointer transition-all duration-500 ease-out relative" 
                   onclick="window.openGalleryLightbox(${index})"
                   data-category="${image.category}"
                   style="animation: fadeIn 0.5s ease-out ${index * 0.05}s backwards;">
                ${image.image_url ?
      `<img src="${image.image_url}" alt="${image.title}" class="w-full h-auto object-cover transition-transform duration-700 hover:scale-110" loading="lazy">` :
      `<div class="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                       <svg class="w-16 h-16 text-primary-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                       </svg>
                     </div>`
    }
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span class="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">${image.category || 'General'}</span>
                    <h3 class="text-lg font-bold text-white">${image.title}</h3>
                </div>
              </div>
            `).join('')}
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
  `

  window.galleryData = {
    images: images,
    currentIndex: 0
  }

  window.openGalleryLightbox = (index, shouldAnimate = false) => {
    const lightbox = document.getElementById('gallery-lightbox')
    const img = document.getElementById('lightbox-image')
    const title = document.getElementById('lightbox-title')
    const category = document.getElementById('lightbox-category')
    const counter = document.getElementById('lightbox-counter')

    const updateContent = () => {
      window.galleryData.currentIndex = index
      const image = window.galleryData.images[index]

      if (image.image_url) {
        img.src = image.image_url
      } else {
        img.src = 'placeholder'
      }

      title.textContent = image.title || 'Untitled'
      category.textContent = image.category || 'General'

      const filter = document.querySelector('.filter-btn.active').dataset.filter
      const filteredImages = filter === 'all'
        ? window.galleryData.images
        : window.galleryData.images.filter(img => img.category === filter)

      const currentFilteredIndex = filteredImages.findIndex(i => i.id === image.id)
      counter.textContent = `${currentFilteredIndex + 1} / ${filteredImages.length}`
    }

    if (shouldAnimate) {
      img.classList.add('animate-gallery-fade-out')
      setTimeout(() => {
        img.classList.remove('animate-gallery-fade-out')
        updateContent()
        img.classList.add('animate-gallery-fade-in')
        setTimeout(() => img.classList.remove('animate-gallery-fade-in'), 300)
      }, 300)
    } else {
      updateContent()
    }

    lightbox.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }

  window.closeGalleryLightbox = () => {
    const lightbox = document.getElementById('gallery-lightbox')
    if (lightbox) {
      lightbox.classList.add('hidden')
      document.body.style.overflow = ''
    }
  }

  window.nextGalleryImage = () => {
    const filter = document.querySelector('.filter-btn.active').dataset.filter
    const filteredImages = filter === 'all'
      ? window.galleryData.images
      : window.galleryData.images.filter(img => img.category === filter)

    const currentId = window.galleryData.images[window.galleryData.currentIndex].id
    let currentIndexInFiltered = filteredImages.findIndex(i => i.id === currentId)

    let nextIndexInFiltered = (currentIndexInFiltered + 1) % filteredImages.length
    const nextImage = filteredImages[nextIndexInFiltered]
    const realIndex = window.galleryData.images.findIndex(i => i.id === nextImage.id)

    window.openGalleryLightbox(realIndex, true)
  }

  window.prevGalleryImage = () => {
    const filter = document.querySelector('.filter-btn.active').dataset.filter
    const filteredImages = filter === 'all'
      ? window.galleryData.images
      : window.galleryData.images.filter(img => img.category === filter)

    const currentId = window.galleryData.images[window.galleryData.currentIndex].id
    let currentIndexInFiltered = filteredImages.findIndex(i => i.id === currentId)

    let prevIndexInFiltered = (currentIndexInFiltered - 1 + filteredImages.length) % filteredImages.length
    const prevImage = filteredImages[prevIndexInFiltered]
    const realIndex = window.galleryData.images.findIndex(i => i.id === prevImage.id)

    window.openGalleryLightbox(realIndex, true)
  }

  const handleKeydown = (e) => {
    if (e.key === 'Escape') window.closeGalleryLightbox()
    if (e.key === 'ArrowRight') window.nextGalleryImage()
    if (e.key === 'ArrowLeft') window.prevGalleryImage()
  }

  // Cleanup old listener if navigating back
  document.removeEventListener('keydown', handleKeydown)
  document.addEventListener('keydown', handleKeydown)

  setTimeout(() => {
    const buttons = document.querySelectorAll('.filter-btn')
    const items = document.querySelectorAll('.gallery-item')

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('active', 'bg-white/10', 'text-white')
          b.classList.add('text-neutral-400')
        })
        btn.classList.add('active', 'bg-white/10', 'text-white')
        btn.classList.remove('text-neutral-400')

        const filter = btn.dataset.filter
        items.forEach(item => {
          const category = item.dataset.category
          if (filter === 'all' || category === filter) {
            item.style.display = 'block'
            item.style.animation = 'none'
            item.offsetHeight
            item.style.animation = 'zoomIn 0.4s ease-out forwards'
          } else {
            item.style.display = 'none'
          }
        })
      })
    })
  }, 0)

  return html
}
