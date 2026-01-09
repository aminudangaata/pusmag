import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let programmes = [];
let editTarget = null;
let deleteTarget = null;

export async function ProgrammesPortal() {
    setTimeout(renderProgrammes, 0);

    return `
        <div class="space-y-8 animate-on-scroll">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-3xl font-bold">Programmes</h2>
                    <p class="text-neutral-400 text-sm mt-1">Manage PUSMAG events and programmes</p>
                </div>
                <button onclick="window.openProgrammeModal()" class="btn-custom">
                    <span class="inner flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        New Programme
                    </span>
                </button>
            </div>
            
            <div class="glass overflow-hidden rounded-2xl border border-white/5">
                <table class="w-full text-left border-collapse">
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

        <!-- Programme Modal -->
        <div id="programme-modal" class="fixed inset-0 z-[60] hidden">
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.closeProgrammeModal()"></div>
            <div class="absolute inset-y-0 right-0 w-full max-w-2xl bg-neutral-900 border-l border-white/10 shadow-2xl flex flex-col animate-slide-in">
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
                        <input type="text" name="title" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white text-lg font-medium" placeholder="e.g. Annual General Meeting 2026">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Category</label>
                            <select name="category" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white appearance-none">
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
                            <input type="date" name="start_date" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white">
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">End Date (Optional)</label>
                            <input type="date" name="end_date" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white">
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Location</label>
                        <input type="text" name="location" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white" placeholder="Physical location or Link">
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Short Description</label>
                        <textarea name="description" rows="2" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary-500 transition-colors outline-none text-white" placeholder="A brief summary for cards..."></textarea>
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
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.closeDeleteProgModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-center mb-2">Delete Programme?</h3>
                <p class="text-neutral-400 text-center text-sm mb-8">This action is permanent and cannot be undone.</p>
                <div class="flex gap-4">
                    <button onclick="window.closeDeleteProgModal()" class="flex-grow py-3 px-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">Cancel</button>
                    <button id="confirm-prog-delete-btn" onclick="window.handleDeleteProgConfirm()" class="flex-grow py-3 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-bold uppercase tracking-wider">Delete</button>
                </div>
            </div>
        </div>
    `;
}

let progQuill = null;

async function renderProgrammes() {
    const container = document.getElementById('programmes-container');
    if (!container) return;

    try {
        programmes = await api.getPortalProgrammes();
        if (programmes.length === 0) {
            container.innerHTML = '<tr><td colspan="4" class="py-12 text-center text-neutral-500 italic">No programmes found. Create your first one above!</td></tr>';
            return;
        }

        container.innerHTML = programmes.map(p => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                            <img src="${p.image || '/files/default-blog.svg'}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <p class="font-bold text-white leading-tight">${p.title}</p>
                            <p class="text-xs text-neutral-500 mt-1">${p.location || 'No location'}</p>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${p.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}">
                        ${p.published ? 'Published' : 'Draft'}
                    </span>
                    <span class="ml-2 text-[10px] uppercase font-bold text-neutral-500 tracking-widest">${p.category}</span>
                </td>
                <td class="py-4 px-6">
                    <p class="text-sm font-medium text-white">${p.start_date ? new Date(p.start_date).toLocaleDateString() : 'N/A'}</p>
                </td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="window.openProgrammeModal('${p.name}')" class="p-2 text-neutral-400 hover:text-white transition-colors" title="Edit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onclick="window.openProgDeleteModal('${p.name}')" class="p-2 text-red-500 hover:text-red-400 transition-colors" title="Delete">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Ensure animations are triggered for new items
        setTimeout(() => initAnimations(), 100);
    } catch (e) {
        container.innerHTML = `<tr><td colspan="4" class="py-12 text-center text-red-500">Error: ${e.message}</td></tr>`;
    }
}

window.openProgrammeModal = (name = null) => {
    const modal = document.getElementById('programme-modal');
    const form = document.getElementById('programme-form');
    const title = document.getElementById('modal-title');
    const preview = document.getElementById('prog-image-preview');

    editTarget = name;
    form.reset();
    form.name.value = name || '';
    title.innerText = name ? 'Edit Programme' : 'New Programme';
    preview.innerHTML = '<svg class="w-8 h-8 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';

    if (!progQuill) {
        progQuill = new Quill('#prog-editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'header': [1, 2, 3, false] }],
                    ['link', 'clean']
                ]
            }
        });
    }
    progQuill.setText('');

    if (name) {
        const prog = programmes.find(p => p.name === name);
        if (prog) {
            form.title.value = prog.title || '';
            form.category.value = prog.category || 'Meeting';
            form.start_date.value = prog.start_date || '';
            form.end_date.value = prog.end_date || '';
            form.location.value = prog.location || '';
            form.description.value = prog.description || '';
            form.published.checked = prog.published == 1;
            form.image.value = prog.image || '';

            if (prog.image) {
                preview.innerHTML = `<img src="${prog.image}" class="w-full h-full object-cover">`;
            }
            if (prog.content) {
                progQuill.root.innerHTML = prog.content;
            }
        }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

window.closeProgrammeModal = () => {
    document.getElementById('programme-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

window.handleProgImageUpload = async (input) => {
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

    const statusObj = document.getElementById('upload-status-prog');
    const preview = document.getElementById('prog-image-preview');
    const hiddenInput = document.getElementById('programme-form').image;

    try {
        statusObj.innerText = 'Uploading...';
        const fileUrl = await api.uploadFile(file);
        hiddenInput.value = fileUrl;
        preview.innerHTML = `<img src="${fileUrl}" class="w-full h-full object-cover">`;
        statusObj.innerText = 'Change Image';
    } catch (e) {
        alert("Upload failed: " + e.message);
        statusObj.innerText = 'Upload Image';
    }
}

window.handleProgrammeSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('prog-submit-btn');
    const content = progQuill.root.innerHTML;

    const data = {
        name: form.name.value,
        title: form.title.value,
        category: form.category.value,
        start_date: form.start_date.value,
        end_date: form.end_date.value,
        location: form.location.value,
        description: form.description.value,
        published: form.published.checked ? 1 : 0,
        image: form.image.value,
        content: content
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Saving...</span>';

    try {
        await api.saveProgramme(data);
        window.closeProgrammeModal();
        renderProgrammes();
    } catch (e) {
        alert("Error saving programme: " + e.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Save Programme</span>';
    }
}

window.openProgDeleteModal = (name) => {
    deleteTarget = name;
    document.getElementById('delete-prog-modal').classList.remove('hidden');
}

window.closeDeleteProgModal = () => {
    document.getElementById('delete-prog-modal').classList.add('hidden');
}

window.handleDeleteProgConfirm = async () => {
    const confirmBtn = document.getElementById('confirm-prog-delete-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = 'Deleting...';

    try {
        await api.deleteProgramme(deleteTarget);
        window.closeDeleteProgModal();
        renderProgrammes();
    } catch (e) {
        alert("Error deleting programme: " + e.message);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = 'Delete';
    }
}
