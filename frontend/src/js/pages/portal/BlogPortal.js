import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'
import { router } from '../../utils/router.js'
import { Modal } from '../../components/Modal.js'
import { formatDateShort } from '../../utils/helpers.js'

window.openBlogPost = (route) => {
    router.navigate(route);
}

let currentSearch = '';
let quill = null;
let deleteTarget = null;

const initQuill = () => {
    if (quill || !document.getElementById('editor-container')) return;
    quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        },
        placeholder: 'Write your post content here...'
    });
};

window.handlePortalBlogSearch = (event) => {
    currentSearch = event.target.value;
    renderBlogPosts();
}

window.toggleBlogPortalSearch = () => {
    const container = document.getElementById('blog-portal-search-container');
    const arrow = document.getElementById('blog-portal-search-toggle-arrow');
    if (container) {
        container.classList.toggle('hidden');
        if (arrow) arrow.classList.toggle('rotate-180');
    }
}


window.openBlogModal = async (name = null) => {
    const modal = document.getElementById('blog-modal');
    const form = document.getElementById('blog-form');
    const titleEl = document.getElementById('blog-modal-title');

    setTimeout(() => initQuill(), 100);

    form.reset();
    form.name.value = name || '';
    if (quill) quill.setContents([]);
    titleEl.textContent = name ? 'Edit Blog Post' : 'Create New Post';

    if (name) {
        try {
            const post = await api.getBlogPostDetails(name);
            form.post_title.value = post.post_title;
            form.post_category.value = post.post_category;
            form.post_image.value = post.post_image || '';

            // Handle image preview
            const preview = document.getElementById('image-preview');
            const img = preview.querySelector('img');
            const empty = preview.querySelector('.empty-state');
            if (post.post_image) {
                img.src = post.post_image;
                img.classList.remove('hidden');
                empty.classList.add('hidden');
            } else {
                img.src = '';
                img.classList.add('hidden');
                empty.classList.remove('hidden');
            }

            if (quill) quill.clipboard.dangerouslyPasteHTML(post.post_content || '');
        } catch (e) {
            alert("Error loading post: " + e.message);
            return;
        }
    } else {
        // Reset preview for new post
        const preview = document.getElementById('image-preview');
        preview.querySelector('img').src = '';
        preview.querySelector('img').classList.add('hidden');
        preview.querySelector('.empty-state').classList.remove('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeBlogModal = () => {
    const modal = document.getElementById('blog-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

window.handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG or PNG).');
        return;
    }

    // Check file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
        Modal.alert('File too large', 'File size too large. Maximum 2MB allowed.');
        return;
    }

    const preview = document.getElementById('image-preview');
    const img = preview.querySelector('img');
    const empty = preview.querySelector('.empty-state');
    const hiddenInput = document.querySelector('input[name="post_image"]');
    const uploadBtn = document.querySelector('button[onclick*="image-upload-input"]');

    try {
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...';

        const fileUrl = await api.uploadFile(file);

        hiddenInput.value = fileUrl;
        img.src = fileUrl;
        img.classList.remove('hidden');
        empty.classList.add('hidden');

    } catch (e) {
        alert('Upload failed: ' + e.message);
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> Upload Image';
    }
}

window.handleBlogSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    const content = quill ? quill.root.innerHTML : '';
    if (content === '<p><br></p>') {
        alert("Post content cannot be empty.");
        return;
    }

    const formData = {
        name: form.name.value,
        post_title: form.post_title.value,
        post_category: form.post_category.value,
        post_image: form.post_image.value,
        post_content: content,
        route: form.post_title.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        delete_requested: 0 // Reset request if edited
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Saving...</span>';

    try {
        await api.saveBlogPost(formData);
        closeBlogModal();
        renderBlogPosts();
    } catch (e) {
        alert("Error saving post: " + e.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Save Post</span>';
    }
}

window.openDeleteModal = (name) => {
    deleteTarget = name;
    const modal = document.getElementById('delete-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeDeleteModal = () => {
    deleteTarget = null;
    const modal = document.getElementById('delete-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

window.handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const confirmBtn = document.getElementById('confirm-delete-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="inner">Deleting...</span>';

    try {
        const res = await api.deleteBlogPost(deleteTarget);
        if (res.status === 'requested') {
            alert(res.message);
        }
        closeDeleteModal();
        renderBlogPosts();
    } catch (e) {
        alert("Error deleting post: " + e.message);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = '<span class="inner">Delete Post</span>';
    }
}

window.handleCancelDelete = async (name) => {
    try {
        await api.cancelDeleteRequest(name);
        renderBlogPosts();
    } catch (e) {
        alert("Error cancelling request: " + e.message);
    }
}

async function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    container.innerHTML = '<tr><td colspan="5" class="py-20 text-center text-neutral-500">Loading your posts...</td></tr>';

    try {
        const posts = await api.getUserBlogPosts(currentSearch);

        if (posts.length === 0) {
            container.innerHTML = `<tr><td colspan="5" class="py-20 text-center text-neutral-500">${currentSearch ? 'No posts match your search.' : 'No blog posts found.'}</td></tr>`;
            return;
        }

        container.innerHTML = posts.map(p => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td class="py-4 px-6 hidden sm:table-cell">
                    <div class="flex items-center gap-3">
                        ${p.post_image ? `<img src="${p.post_image}" class="w-10 h-10 rounded-lg object-cover bg-white/5">` : '<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-neutral-600">No Image</div>'}
                        <div>
                            <a href="/blog-news/${p.route || p.name}" onclick="event.preventDefault(); window.openBlogPost('/blog-news/${p.route || p.name}')" class="font-medium text-sm text-neutral-300 hover:text-primary-500 transition-colors block cursor-pointer">
                                ${p.post_title}
                            </a>
                            <div class="text-[10px] text-neutral-500 mt-0.5">by ${p.author_name || 'Admin'}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6 sm:hidden">
                    <div>
                        <a href="/blog-news/${p.route || p.name}" onclick="event.preventDefault(); window.openBlogPost('/blog-news/${p.route || p.name}')" class="font-medium text-sm text-neutral-300 hover:text-primary-500 transition-colors block cursor-pointer">
                            ${p.post_title}
                        </a>
                        <div class="text-[10px] text-neutral-500 mt-0.5">by ${p.author_name || 'Admin'}</div>
                    </div>
                </td>
                <td class="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-500">${p.post_category}</td>
                <td class="py-4 px-6">
                    <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${p.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">
                        ${p.published ? 'Published' : 'Draft/Pending'}
                    </span>
                    ${p.verified ? '<span class="ml-2 px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">Verified</span>' : ''}
                    ${p.delete_requested ? '<div class="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase border border-red-500/20 animate-pulse"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Deletion Requested</div>' : ''}
                </td>
                <td class="py-4 px-6 text-xs text-neutral-500 whitespace-nowrap">${formatDateShort(p.published_date)}</td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        ${p.delete_requested && router.user.roles.includes('PuSMAG Admin') ? `
                            <button onclick="window.handleCancelDelete('${p.name}')" class="p-2 text-emerald-500 hover:text-emerald-400 transition-colors" title="Cancel Deletion Request">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                        ` : ''}
                        <button onclick="window.openBlogModal('${p.name}')" class="p-2 text-neutral-400 hover:text-neutral-300 transition-colors" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                         <button onclick="window.openDeleteModal('${p.name}')" class="p-2 text-red-500 hover:text-red-400 transition-colors" title="${p.delete_requested ? 'Confirm Deletion' : 'Delete'}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Ensure animations are triggered for new items
        setTimeout(() => initAnimations(), 100);

    } catch (e) {
        container.innerHTML = `<tr><td colspan="5" class="py-20 text-center text-red-500">Error: ${e.message}</td></tr>`;
    }
}

export async function BlogPortal() {
    setTimeout(() => renderBlogPosts(), 100);

    return `
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
    `
}
