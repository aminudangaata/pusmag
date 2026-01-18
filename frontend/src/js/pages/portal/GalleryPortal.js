import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let images = [];
let deleteTarget = null;
let editTarget = null;
let stagedFiles = []; // For bulk upload { id, file, preview, title, category, status }
let galleryCategories = ['Inauguration', 'Visit', 'Meeting', 'Event'];

window.toggleGalleryUploadTab = (mode) => {
    const singleTab = document.getElementById('tab-single');
    const bulkTab = document.getElementById('tab-bulk');
    const singleForm = document.getElementById('gallery-form');
    const bulkForm = document.getElementById('bulk-upload-form');

    if (mode === 'bulk') {
        singleTab.classList.remove('border-accent-500', 'text-accent-500');
        singleTab.classList.add('border-transparent', 'text-neutral-500');
        bulkTab.classList.add('border-accent-500', 'text-accent-500');
        bulkTab.classList.remove('border-transparent', 'text-neutral-500');
        singleForm.classList.add('hidden');
        bulkForm.classList.remove('hidden');
    } else {
        bulkTab.classList.remove('border-accent-500', 'text-accent-500');
        bulkTab.classList.add('border-transparent', 'text-neutral-500');
        singleTab.classList.add('border-accent-500', 'text-accent-500');
        singleTab.classList.remove('border-transparent', 'text-neutral-500');
        bulkForm.classList.add('hidden');
        singleForm.classList.remove('hidden');
    }
}

window.handleBulkFileSelect = (input) => {
    const files = Array.from(input.files);
    files.forEach(file => {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) return;
        if (file.size > 2 * 1024 * 1024) return;

        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);

        stagedFiles.push({
            id,
            file,
            preview,
            title: file.name.split('.')[0].replace(/[-_]/g, ' '),
            category: 'Event',
            status: 'pending'
        });
    });

    input.value = ''; // Reset input
    renderStagedFiles();
}

window.removeStagedFile = (id) => {
    const index = stagedFiles.findIndex(f => f.id === id);
    if (index > -1) {
        URL.revokeObjectURL(stagedFiles[index].preview);
        stagedFiles.splice(index, 1);
        renderStagedFiles();
    }
}

window.updateStagedFile = (id, field, value) => {
    const file = stagedFiles.find(f => f.id === id);
    if (file) {
        file[field] = value;
    }
}

function renderStagedFiles() {
    const container = document.getElementById('staged-files-container');
    const startBtn = document.getElementById('start-bulk-upload-btn');
    if (!container) return;

    if (stagedFiles.length === 0) {
        container.innerHTML = `
            <div class="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <p class="text-neutral-500 text-sm">No images selected yet.</p>
            </div>
        `;
        if (startBtn) startBtn.classList.add('hidden');
        return;
    }

    if (startBtn) startBtn.classList.remove('hidden');

    container.innerHTML = stagedFiles.map((file, index) => `
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 glass rounded-xl border border-white/5 group">
            <div class="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                <img src="${file.preview}" class="w-full h-full object-cover">
                ${file.status === 'success' ? `
                    <div class="absolute inset-0 bg-emerald-500/80 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                ` : ''}
                ${file.status === 'uploading' ? `
                    <div class="absolute inset-0 bg-neutral-900/60 flex items-center justify-center">
                        <div class="w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ` : ''}
                ${file.status === 'error' ? `
                    <div class="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                ` : ''}
            </div>
            
            <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <input type="text" 
                       value="${file.title}" 
                       oninput="window.updateStagedFile('${file.id}', 'title', this.value)"
                       placeholder="Image Title"
                       class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:border-accent-500 outline-none w-full"
                       ${file.status !== 'pending' ? 'disabled' : ''}>
                
                <select onchange="window.updateStagedFile('${file.id}', 'category', this.value)"
                        class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:border-accent-500 outline-none w-full"
                        ${file.status !== 'pending' ? 'disabled' : ''}>
                    ${galleryCategories.map(cat => `<option value="${cat}" ${file.category === cat ? 'selected' : ''} class="bg-neutral-900">${cat}</option>`).join('')}
                </select>
            </div>
            
            <button onclick="window.removeStagedFile('${file.id}')" 
                    class="p-2 text-neutral-500 hover:text-red-500 transition-colors ${file.status !== 'pending' ? 'invisible' : ''}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
    `).join('');
}

window.startBulkUpload = async () => {
    if (stagedFiles.length === 0) {
        alert("Please select images to upload first.");
        return;
    }

    const startBtn = document.getElementById('start-bulk-upload-btn');
    const closeBtn = document.getElementById('close-gallery-modal-btn');

    startBtn.disabled = true;
    startBtn.innerHTML = '<span class="inner">Processing...</span>';
    if (closeBtn) closeBtn.disabled = true;

    let successCount = 0;
    for (const staged of stagedFiles) {
        if (staged.status === 'success') {
            successCount++;
            continue;
        }

        try {
            staged.status = 'uploading';
            renderStagedFiles();

            const fileUrl = await api.uploadFile(staged.file);

            await api.saveGalleryImage({
                image_title: staged.title,
                image_category: staged.category,
                image_link: fileUrl
            });

            staged.status = 'success';
        } catch (e) {
            console.error(e);
            staged.status = 'error';
        }
        renderStagedFiles();
    }

    const totalSuccess = stagedFiles.filter(f => f.status === 'success').length;
    startBtn.innerHTML = `<span class="inner">Uploaded ${totalSuccess}/${stagedFiles.length}</span>`;
    if (closeBtn) closeBtn.disabled = false;

    // Refresh background
    renderGallery();

    // If all successful, show a short delay and close
    const remaining = stagedFiles.filter(f => f.status !== 'success').length;
    if (remaining === 0) {
        setTimeout(() => {
            window.closeGalleryModal();
            // Clear staged files
            stagedFiles.forEach(f => URL.revokeObjectURL(f.preview));
            stagedFiles = [];
        }, 2000);
    } else {
        startBtn.disabled = false;
        startBtn.innerHTML = '<span class="inner">Retry Failed</span>';
    }
}

export async function GalleryPortal() {
    setTimeout(renderGallery, 0);

    return `
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
                                        ${galleryCategories.map(cat => `<option value="${cat}" class="bg-neutral-900">${cat}</option>`).join('')}
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

                        <div class="pt-6">
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

                        <div class="pt-6">
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
    `;
}

async function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    try {
        images = await api.getPortalGallery();
        if (images.length === 0) {
            grid.innerHTML = '<div class="lg:col-span-4 py-20 text-center text-neutral-500 italic">No images in gallery. Upload your first one above!</div>';
            return;
        }

        window.galleryData = {
            images: images,
            currentIndex: 0
        };

        grid.innerHTML = images.map((img, index) => `
            <div class="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/5 animate-on-scroll">
                <img src="${img.image_link}" alt="${img.image_title}" 
                     onclick="window.openGalleryLightbox(${index})"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer">
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end pointer-events-none">
                    <p class="font-bold text-neutral-300 text-sm line-clamp-1">${img.image_title || 'Untitled'}</p>
                    <div class="flex items-center justify-between mt-2 pointer-events-auto">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-accent-500">${img.image_category}</span>
                        <div class="flex gap-2">
                            <button onclick="window.openGalleryModal('${img.name}')" class="p-2 bg-white/10 text-neutral-300 rounded-lg hover:bg-white/20 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            <button onclick="window.openDeleteGalleryModal('${img.name}')" class="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-neutral-300 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Ensure animations are triggered for new items
        setTimeout(() => initAnimations(), 100);
    } catch (e) {
        grid.innerHTML = `<div class="lg:col-span-4 py-20 text-center text-red-500">Error: ${e.message}</div>`;
    }
}

window.openGalleryModal = (name = null) => {
    const modal = document.getElementById('gallery-modal');
    const form = document.getElementById('gallery-form');
    const preview = document.getElementById('gallery-image-preview');
    const titleEl = modal.querySelector('h3');
    const submitBtn = document.getElementById('gallery-submit-btn');

    const tabs = modal.querySelector('.flex.border-b.border-white\\/5');

    editTarget = name;
    form.reset();
    preview.innerHTML = `<svg class="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;

    // Reset bulk state
    stagedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    stagedFiles = [];
    renderStagedFiles();
    window.toggleGalleryUploadTab('single');

    if (name) {
        if (tabs) tabs.classList.add('hidden');
        const img = images.find(i => i.name === name);
        if (img) {
            form.image_title.value = img.image_title || '';
            form.image_category.value = img.image_category || 'Event';
            form.image_link.value = img.image_link || '';
            if (img.image_link) {
                preview.innerHTML = `<img src="${img.image_link}" class="w-full h-full object-cover">`;
                submitBtn.disabled = false;
            }
            titleEl.innerText = 'Edit Media';
            submitBtn.innerHTML = '<span class="inner">Update Image</span>';
        }
    } else {
        if (tabs) tabs.classList.remove('hidden');
        titleEl.innerText = 'Add Media';
        submitBtn.innerHTML = '<span class="inner">Add to Gallery</span>';
        submitBtn.disabled = true;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

window.closeGalleryModal = () => {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';

    // Clear staged files on close
    stagedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    stagedFiles = [];
}

window.handleGalleryImageUpload = async (input) => {
    const file = input.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('ONLY JPG, JPEG, and PNG files are allowed.');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
    }

    const statusObj = document.getElementById('gallery-upload-status');
    const preview = document.getElementById('gallery-image-preview');
    const hiddenInput = document.getElementById('gallery-form').image_link;
    const submitBtn = document.getElementById('gallery-submit-btn');

    try {
        statusObj.classList.remove('hidden');
        statusObj.innerText = 'Uploading...';
        submitBtn.disabled = true;
        const fileUrl = await api.uploadFile(file);
        hiddenInput.value = fileUrl;
        preview.innerHTML = `<img src="${fileUrl}" class="w-full h-full object-cover">`;
        statusObj.innerText = 'Upload Complete';
        submitBtn.disabled = false;
        setTimeout(() => statusObj.classList.add('hidden'), 2000);
    } catch (e) {
        alert("Upload failed: " + e.message);
        statusObj.classList.add('hidden');
        submitBtn.disabled = !hiddenInput.value;
    }
}

window.handleGallerySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('gallery-submit-btn');

    const data = {
        name: editTarget,
        image_title: form.image_title.value,
        image_category: form.image_category.value,
        image_link: form.image_link.value
    };

    if (!data.image_link) {
        alert("Please upload an image first.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="inner">${editTarget ? 'Updating...' : 'Adding...'} Image</span>`;

    try {
        await api.saveGalleryImage(data);
        window.closeGalleryModal();
        renderGallery();
    } catch (e) {
        alert(`Error ${editTarget ? 'updating' : 'adding'} gallery image: ${e.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="inner">${editTarget ? 'Update' : 'Add to'} Gallery</span>`;
    }
}

window.openDeleteGalleryModal = (name) => {
    deleteTarget = name;
    document.getElementById('delete-gallery-modal').classList.remove('hidden');
}

window.closeDeleteGalleryModal = () => {
    document.getElementById('delete-gallery-modal').classList.add('hidden');
}

window.handleDeleteGalleryConfirm = async () => {
    const confirmBtn = document.getElementById('confirm-gallery-delete-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = 'Deleting...';

    try {
        await api.deleteGalleryImage(deleteTarget);
        window.closeDeleteGalleryModal();
        renderGallery();
    } catch (e) {
        alert("Error deleting image: " + e.message);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Delete';
    }
}

window.openGalleryLightbox = (index, shouldAnimate = false) => {
    const lightbox = document.getElementById('gallery-lightbox');
    const img = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const category = document.getElementById('lightbox-category');
    const counter = document.getElementById('lightbox-counter');

    const updateContent = () => {
        window.galleryData.currentIndex = index;
        const image = window.galleryData.images[index];

        img.src = image.image_link || '';
        title.textContent = image.image_title || 'Untitled';
        category.textContent = image.image_category || 'General';
        counter.textContent = `${index + 1} / ${window.galleryData.images.length}`;
    }

    if (shouldAnimate) {
        img.classList.add('animate-gallery-fade-out');
        setTimeout(() => {
            img.classList.remove('animate-gallery-fade-out');
            updateContent();
            img.classList.add('animate-gallery-fade-in');
            setTimeout(() => img.classList.remove('animate-gallery-fade-in'), 300);
        }, 300);
    } else {
        updateContent();
    }

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

window.closeGalleryLightbox = () => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

window.nextGalleryImage = () => {
    if (!window.galleryData || !window.galleryData.images.length) return;
    const nextIndex = (window.galleryData.currentIndex + 1) % window.galleryData.images.length;
    window.openGalleryLightbox(nextIndex, true);
}

window.prevGalleryImage = () => {
    if (!window.galleryData || !window.galleryData.images.length) return;
    const prevIndex = (window.galleryData.currentIndex - 1 + window.galleryData.images.length) % window.galleryData.images.length;
    window.openGalleryLightbox(prevIndex, true);
}

const handleGalleryKeydown = (e) => {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') window.closeGalleryLightbox();
    if (e.key === 'ArrowRight') window.nextGalleryImage();
    if (e.key === 'ArrowLeft') window.prevGalleryImage();
}

document.removeEventListener('keydown', handleGalleryKeydown);
document.addEventListener('keydown', handleGalleryKeydown);
