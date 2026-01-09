import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let images = [];
let deleteTarget = null;
let editTarget = null;

export async function GalleryPortal() {
    setTimeout(renderGallery, 0);

    return `
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-3xl font-bold">Gallery</h2>
                    <p class="text-neutral-400 text-sm mt-1">Manage PUSMAG photo gallery and media</p>
                </div>
                <button onclick="window.openGalleryModal()" class="btn-custom">
                    <span class="inner flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Media
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

        <!-- Gallery Modal -->
        <div id="gallery-modal" class="fixed inset-0 z-[60] hidden">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.closeGalleryModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl animate-scale-in">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-xl font-bold">Add Media</h3>
                    <button onclick="window.closeGalleryModal()" class="text-neutral-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <form id="gallery-form" class="space-y-6" onsubmit="window.handleGallerySubmit(event)">
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Image Title</label>
                        <input type="text" name="image_title" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-500 transition-colors outline-none text-white" placeholder="e.g. Inauguration Ceremony">
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Category</label>
                        <select name="image_category" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-500 transition-colors outline-none text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M7%207L10%2010L13%207%22%20stroke%3D%22%23a3a3a3%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat">
                            <option value="Inauguration" class="bg-neutral-900">Inauguration</option>
                            <option value="Visit" class="bg-neutral-900">Visit</option>
                            <option value="Meeting" class="bg-neutral-900">Meeting</option>
                            <option value="Event" class="bg-neutral-900">Event</option>
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Image File</label>
                        <div class="relative group">
                            <div id="gallery-image-preview" class="w-full h-48 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden mb-4">
                                <svg class="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <label class="block">
                                <span class="sr-only">Choose File</span>
                                <input type="file" accept=".jpg,.jpeg,.png" onchange="window.handleGalleryImageUpload(this)" class="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-500/10 file:text-accent-500 hover:file:bg-accent-500/20 cursor-pointer">
                            </label>
                            <input type="hidden" name="image_link" required>
                            <span id="gallery-upload-status" class="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white hidden">Uploading...</span>
                        </div>
                    </div>

                    <button type="submit" id="gallery-submit-btn" class="btn-custom w-full">
                        <span class="inner">Add to Gallery</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Gallery Delete Modal -->
        <div id="delete-gallery-modal" class="fixed inset-0 z-[70] hidden">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.closeDeleteGalleryModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Remove from Gallery?</h3>
                <p class="text-neutral-400 text-center text-sm mb-8">This action is permanent and cannot be undone.</p>
                <div class="flex gap-4">
                    <button onclick="window.closeDeleteGalleryModal()" class="flex-grow py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">Cancel</button>
                    <button id="confirm-gallery-delete-btn" onclick="window.handleDeleteGalleryConfirm()" class="flex-grow py-3 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-bold uppercase tracking-wider">Delete</button>
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

        grid.innerHTML = images.map(img => `
            <div class="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/5 animate-on-scroll">
                <img src="${img.image_link}" alt="${img.image_title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <p class="font-bold text-white text-sm line-clamp-1">${img.image_title || 'Untitled'}</p>
                    <div class="flex items-center justify-between mt-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-accent-500">${img.image_category}</span>
                        <div class="flex gap-2">
                            <button onclick="window.openGalleryModal('${img.name}')" class="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            <button onclick="window.openDeleteGalleryModal('${img.name}')" class="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
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

    editTarget = name;
    form.reset();
    preview.innerHTML = `<svg class="w-12 h-12 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;

    if (name) {
        const img = images.find(i => i.name === name);
        if (img) {
            form.image_title.value = img.image_title || '';
            form.image_category.value = img.image_category || 'Event';
            form.image_link.value = img.image_link || '';
            if (img.image_link) {
                preview.innerHTML = `<img src="${img.image_link}" class="w-full h-full object-cover">`;
            }
            titleEl.innerText = 'Edit Media';
            submitBtn.innerHTML = '<span class="inner">Update Image</span>';
        }
    } else {
        titleEl.innerText = 'Add Media';
        submitBtn.innerHTML = '<span class="inner">Add to Gallery</span>';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

window.closeGalleryModal = () => {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
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

    try {
        statusObj.classList.remove('hidden');
        statusObj.innerText = 'Uploading...';
        const fileUrl = await api.uploadFile(file);
        hiddenInput.value = fileUrl;
        preview.innerHTML = `<img src="${fileUrl}" class="w-full h-full object-cover">`;
        statusObj.innerText = 'Upload Complete';
        setTimeout(() => statusObj.classList.add('hidden'), 2000);
    } catch (e) {
        alert("Upload failed: " + e.message);
        statusObj.classList.add('hidden');
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
