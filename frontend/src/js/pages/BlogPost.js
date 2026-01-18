import { api } from '../utils/api.js'
import { formatDate } from '../utils/helpers.js'

export async function BlogPostPage(params) {
    const { id } = params
    let post = null

    try {
        post = await api.getBlogPost(id)
    } catch (error) {
        console.error('Error fetching blog post:', error)
    }

    if (!post || Object.keys(post).length === 0) {
        return `
            <div class="pt-32 min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-4xl font-bold mb-4">Post Not Found</h1>
                    <p class="text-neutral-400">The article you are looking for does not exist.</p>
                </div>
            </div>
        `
    }

    return `

    <!-- Hero Section with Background Image -->
    <div class="relative min-h-[60vh] flex items-center justify-center pb-20">
        <!-- Background Image -->
        ${post.image ? `
            <div class="absolute inset-0 z-0">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
                <!-- Dark Overlay with adjusted opacity -->
                <div class="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"></div>
            </div>
        ` : `
            <div class="absolute inset-0 z-0 bg-neutral-900">
                <div class="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-900"></div>
            </div>
        `}

        <!-- Hero Content -->
        <div class="container relative z-10 text-center pt-32 px-4">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-neutral-300 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                ${post.category || 'News'}
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-neutral-300 max-w-5xl mx-auto leading-tight animate-fade-in-up" style="animation-delay: 0.1s">
                ${post.title}
            </h1>
            
            <div class="flex items-center justify-center gap-6 text-neutral-300 animate-fade-in-up" style="animation-delay: 0.2s">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-neutral-900 font-bold text-sm ring-4 ring-white/10">
                        ${(post.author || 'A').charAt(0)}
                    </div>
                    <span class="font-medium">${post.author || 'Admin'}</span>
                </div>
                <span class="text-neutral-500">•</span>
                <span class="font-medium tracking-wide">${formatDate(post.date)}</span>
            </div>
        </div>
    </div>

    <!-- Content Section -->
    <article class="container max-w-6xl relative z-20 pb-32 -mt-10 mx-auto">
        <div class="bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-8 shadow-2xl animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="prose prose-invert prose-lg max-w-none">
                ${post.content || ''}
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
    `
}
