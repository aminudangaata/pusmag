import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let rejectTarget = null;

window.handleApproveContactRequest = async (requestName) => {
    const btn = document.getElementById(`approve-btn-${requestName}`);
    if (btn) { btn.disabled = true; btn.innerHTML = 'Approving...'; }
    try {
        await api.respondToContactRequest(requestName, 'approve');
        renderContactRequests();
    } catch (e) {
        alert('Error approving request: ' + e.message);
        if (btn) { btn.disabled = false; btn.innerHTML = 'Approve'; }
    }
}

window.openRejectModal = (requestName) => {
    rejectTarget = requestName;
    const modal = document.getElementById('contact-reject-modal');
    const reasonInput = document.getElementById('contact-reject-reason');
    if (reasonInput) reasonInput.value = '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeRejectModal = () => {
    rejectTarget = null;
    const modal = document.getElementById('contact-reject-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

window.handleConfirmReject = async () => {
    if (!rejectTarget) return;
    const reason = document.getElementById('contact-reject-reason')?.value || '';
    const confirmBtn = document.getElementById('confirm-reject-contact-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="inner">Declining...</span>';
    try {
        await api.respondToContactRequest(rejectTarget, 'reject', reason);
        closeRejectModal();
        renderContactRequests();
    } catch (e) {
        alert('Error declining request: ' + e.message);
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = '<span class="inner">Decline Request</span>';
    }
}

async function renderContactRequests() {
    const container = document.getElementById('contact-requests-container');
    if (!container) return;

    container.innerHTML = '<div class="py-12 text-center text-neutral-500">Loading requests...</div>';

    try {
        const requests = await api.getContactAccessRequests();

        if (requests.length === 0) {
            container.innerHTML = '<div class="py-12 text-center text-neutral-500">No pending contact access requests.</div>';
            return;
        }

        container.innerHTML = requests.map(r => `
            <div class="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 gap-4">
                <div class="flex items-center gap-4 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 flex-shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <div class="min-w-0">
                        <p class="font-semibold text-sm text-neutral-300 truncate">${r.requester_name}</p>
                        <p class="text-[10px] text-neutral-500 mt-0.5">${r.requester}</p>
                        <p class="text-[10px] text-neutral-600 mt-0.5">Requested ${new Date(r.requested_datetime).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</p>
                    </div>
                </div>
                <div class="flex gap-2 flex-shrink-0">
                    <button id="approve-btn-${r.name}" onclick="window.handleApproveContactRequest('${r.name}')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                        Approve
                    </button>
                    <button onclick="window.openRejectModal('${r.name}')"
                            class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                        Decline
                    </button>
                </div>
            </div>
        `).join('');

        setTimeout(() => initAnimations(), 100);
    } catch (e) {
        container.innerHTML = `<div class="py-12 text-center text-red-500">Error: ${e.message}</div>`;
    }
}

export async function ContactRequestsPortal() {
    setTimeout(() => renderContactRequests(), 100);

    return `
        <div class="space-y-8 animate-on-scroll">
            <div>
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300">Contact Requests</h2>
                <p class="text-neutral-500 text-sm mt-1">Members requesting access to your contact information</p>
            </div>

            <div class="glass rounded-2xl p-6 space-y-4" id="contact-requests-container">
                <div class="py-12 text-center text-neutral-500">Loading requests...</div>
            </div>
        </div>

        <!-- Decline Reason Modal -->
        <div id="contact-reject-modal" class="fixed inset-0 z-[70] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div class="glass w-full max-w-md rounded-2xl overflow-hidden animate-on-scroll">
                <div class="p-8 space-y-6">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">Decline Request</h3>
                            <p class="text-sm text-neutral-400">You can optionally provide a reason.</p>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2 text-neutral-400">Reason (optional)</label>
                        <textarea id="contact-reject-reason" rows="3" placeholder="e.g. I prefer not to share my contact details at this time."
                            class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition-all text-sm resize-none"></textarea>
                    </div>
                    <div class="flex flex-col gap-3">
                        <button id="confirm-reject-contact-btn" onclick="window.handleConfirmReject()" class="btn-custom w-full">
                            <span class="inner">Decline Request</span>
                        </button>
                        <button onclick="window.closeRejectModal()" class="px-6 py-3 text-neutral-400 hover:text-neutral-300 transition-colors text-sm font-medium">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
