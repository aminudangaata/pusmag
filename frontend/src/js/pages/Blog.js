import { api } from '../utils/api.js'
import { BASE_PATH } from '../utils/constants.js'
import { formatDate } from '../utils/helpers.js'

// Helper to join paths correctly
const getPath = (path) => {
  if (path === '/') return BASE_PATH || '/'
  return `${BASE_PATH}${path}`
}

// State management
let currentFilters = {
  category: '',
  search: '',
  page: 1,
  limit: 9
}
let totalPages = 1
let searchTimeout = null

// Expose functions to window
window.filterBlogCategory = async (category, element) => {
  currentFilters.category = category === currentFilters.category ? '' : category
  currentFilters.page = 1 // Reset to first page

  // Update active state
  document.querySelectorAll('.blog-category-link').forEach(el => {
    el.classList.remove('text-primary-500', 'font-bold')
    el.classList.add('text-neutral-400')
  })

  if (currentFilters.category && element) {
    element.classList.remove('text-neutral-400')
    element.classList.add('text-primary-500', 'font-bold')
  }

  await fetchAndRenderPosts()
}

window.handlePublicBlogSearch = (value) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    currentFilters.search = value
    currentFilters.page = 1
    await fetchAndRenderPosts()
  }, 500)
}

window.changeBlogPage = async (page) => {
  if (page < 1 || page > totalPages) return
  currentFilters.page = page
  await fetchAndRenderPosts()
  // Scroll to top of grid
  document.getElementById('blog-grid').scrollIntoView({ behavior: 'smooth' })
}

window.handleImageError = (img) => {
  img.onerror = null;
  const parent = img.parentElement;
  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>`;
}

async function fetchAndRenderPosts() {
  const gridEl = document.getElementById('blog-grid')
  const paginationEl = document.getElementById('blog-pagination')

  if (!gridEl) return

  // Show loading
  gridEl.innerHTML = '<div class="col-span-full text-center py-20 text-neutral-500">Loading...</div>'
  if (paginationEl) paginationEl.innerHTML = ''

  try {
    const offset = (currentFilters.page - 1) * currentFilters.limit
    const posts = await api.getBlogPosts({
      category: currentFilters.category,
      search: currentFilters.search,
      limit: currentFilters.limit,
      offset: offset
    })

    // Note: Backend doesn't return total count in get_blog_posts, checking if we got full limit
    // For proper pagination UI we usually need total count. 
    // For now, simple Previous/Next logic based on returned count:
    // If returned < limit, it's the last page.
    // We can optimistically assume there's a next page if result == limit.
    const hasNext = posts.length === currentFilters.limit
    const hasPrev = currentFilters.page > 1
    totalPages = hasNext ? currentFilters.page + 1 : currentFilters.page // Approximation

    if (posts.length === 0) {
      gridEl.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-xl text-neutral-400 mb-4">No posts found</p>
                    <button onclick="filterBlogCategory('', null); document.getElementById('blog-search').value = ''" class="text-primary-500 hover:underline">
                        Clear all filters
                    </button>
                </div>
            `
      return
    }

    gridEl.innerHTML = posts.map((post, index) => renderPostCard(post, index)).join('')

    // Render Pagination
    renderPagination(hasPrev, hasNext)

    // Trigger animations
    const items = gridEl.querySelectorAll('.animate-on-scroll');
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * 0.1}s`;
      void item.offsetWidth;
      item.classList.add('animate');
    });

  } catch (error) {
    gridEl.innerHTML = '<div class="col-span-full text-center py-20 text-red-500">Error loading posts</div>'
  }
}

function renderPagination(hasPrev, hasNext) {
  const el = document.getElementById('blog-pagination')
  if (!el) return

  el.innerHTML = `
        <div class="flex justify-center items-center gap-4 mt-12">
            <button 
                onclick="window.changeBlogPage(${currentFilters.page - 1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${!hasPrev ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}"
                ${!hasPrev ? 'disabled' : ''}
            >
                Previous
            </button>
            <span class="text-neutral-400 text-sm">Page ${currentFilters.page}</span>
             <button 
                onclick="window.changeBlogPage(${currentFilters.page + 1})"
                class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${!hasNext ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}"
                ${!hasNext ? 'disabled' : ''}
            >
                Next
            </button>
        </div>
    `
}

function renderPostCard(post, index) {
  return `
    <article class="glass rounded-xl overflow-hidden group hover-lift hover-glow animate-on-scroll flex flex-col h-full" style="animation-delay: ${index * 0.1}s">
        <a href="${getPath(`/blog/${post.id || index}`)}" class="block h-48 overflow-hidden relative shrink-0">
            ${post.image
      ? `<img src="${post.image}" alt="${post.title}" onerror="window.handleImageError(this)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">`
      : `<div class="w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700"></div>`
    }
        </a>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] uppercase tracking-wider text-primary-500 font-bold px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                    ${post.category || 'General'}
                </span>
                <span class="text-xs text-neutral-500">${formatDate(post.date) || 'Recent'}</span>
            </div>
            <h2 class="text-lg font-bold mb-2 leading-tight hover:text-primary-500 transition-colors">
                <a href="${getPath(`/blog/${post.id || index}`)}">${post.title}</a>
            </h2>
            <p class="text-neutral-400 text-sm mb-4 line-clamp-3 leading-snug flex-grow">${post.excerpt || ''}</p>
            <a href="${getPath(`/blog/${post.id || index}`)}" class="text-primary-500 text-xs font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                Read more <span class="transition-transform group-hover:translate-x-1">→</span>
            </a>
        </div>
    </article>
  `
}

export async function BlogPage() {
  let posts = []
  let categories = []

  // Reset filters
  currentFilters = { category: '', search: '', page: 1, limit: 9 }

  try {
    // Initial fetch
    // Note: getBlogPosts now expects params object
    const [postsData, categoriesData] = await Promise.all([
      api.getBlogPosts({ limit: 9, offset: 0 }),
      api.getBlogCategories()
    ])
    posts = postsData
    categories = categoriesData
  } catch (error) {
    console.log('Using fallback data')
    categories = ['General', 'Ramadan', 'Brotherhood', 'News']
    posts = [
      {
        title: 'Welcome to PUSMAG',
        excerpt: 'Learn about our mission and vision for the future of Muslim public servants in Ghana.',
        date: '2026-01-01',
        author: 'Admin',
        category: 'General',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60'
      }
    ]
  }

  // Pre-calculate pagination state
  const hasNext = posts.length === currentFilters.limit

  return `
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
                            oninput="window.handlePublicBlogSearch(this.value)"
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
                        ${categories.map(cat => `
                            <li>
                                <button 
                                    onclick="window.filterBlogCategory('${cat}', this)"
                                    class="blog-category-link w-full text-left text-sm py-2 px-3 rounded-md text-neutral-400 hover:bg-white/5 hover:text-primary-500 transition-colors cursor-pointer"
                                >
                                    ${cat}
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </aside>

            <!-- Blog Grid -->
            <div class="lg:col-span-3">
                <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${posts.length > 0 ? posts.map((post, index) => renderPostCard(post, index)).join('') : `
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
                            class="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium transition-colors ${!hasNext ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}"
                            ${!hasNext ? 'disabled' : ''}
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
  `
}
