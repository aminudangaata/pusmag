import { api } from '../../utils/api.js'
import { router } from '../../utils/router.js'

let currentMemberName = null;

// Called when the request-access popup "Send Request" button is clicked
window.handleSendContactRequest = async () => {
    const btn = document.getElementById('contact-request-submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="inner">Sending...</span>';

    try {
        const result = await api.requestContactAccess(currentMemberName);
        closeContactRequestModal();

        switch (result.status) {
            case 'requested':
                showContactAccessToast('Request sent. You will be notified once the member responds.', 'success');
                updateContactUI('pending');
                break;
            case 'already_pending':
                showContactAccessToast('Your request is still pending approval.', 'info');
                updateContactUI('pending');
                break;
            case 'already_approved':
                showContactAccessToast('You already have access. Refresh to view contact info.', 'info');
                break;
            case 'cooldown':
                showContactAccessToast('You must wait 24 hours before requesting again.', 'warning');
                updateContactUI('rejected_cooldown');
                break;
        }
    } catch (e) {
        alert('Error sending request: ' + e.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="inner">Send Request</span>';
    }
}

window.openContactRequestModal = () => {
    const modal = document.getElementById('contact-request-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeContactRequestModal = () => {
    const modal = document.getElementById('contact-request-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function showContactAccessToast(message, type = 'info') {
    const colors = {
        success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        error: 'bg-red-500/10 border-red-500/30 text-red-400',
    };
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-xl border text-sm font-medium shadow-xl transition-all duration-300 ${colors[type] || colors.info}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Update just the contact-info area without re-rendering the whole page
function updateContactUI(newState) {
    const emailSlot = document.getElementById('contact-email-slot');
    const phoneSlot = document.getElementById('contact-phone-slot');
    const emailInfoSlot = document.getElementById('info-email-slot');
    const phoneInfoSlot = document.getElementById('info-phone-slot');
    if (emailSlot) emailSlot.outerHTML = buildContactIconButton('email', newState, null);
    if (phoneSlot) phoneSlot.outerHTML = buildContactIconButton('phone', newState, null);
    if (emailInfoSlot) emailInfoSlot.outerHTML = buildInfoRowValue('email', newState, null);
    if (phoneInfoSlot) phoneInfoSlot.outerHTML = buildInfoRowValue('phone', newState, null);
}

function buildContactIconButton(type, access, value) {
    const isEmail = type === 'email';
    const id = isEmail ? 'contact-email-slot' : 'contact-phone-slot';
    const title = isEmail ? 'Email' : 'Phone';
    const iconPath = isEmail
        ? 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        : 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';

    if (access === 'self_or_admin' || access === 'approved') {
        const href = isEmail ? `mailto:${value}` : `tel:${value}`;
        const hoverColor = isEmail ? 'hover:text-primary-500' : 'hover:text-emerald-500';
        return `<a id="${id}" href="${href}" class="p-3 glass rounded-xl ${hoverColor} transition-colors" title="${value || title}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
        </a>`;
    }

    if (access === 'pending') {
        return `<div id="${id}" class="p-3 glass rounded-xl text-amber-500 cursor-default relative group" title="Request pending approval">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
            <span class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-neutral-900"></span>
        </div>`;
    }

    // none / rejected / rejected_cooldown → show lock button
    const onclick = access === 'rejected_cooldown' ? '' : 'onclick="window.openContactRequestModal()"';
    const cursor = access === 'rejected_cooldown' ? 'cursor-not-allowed' : 'cursor-pointer hover:text-primary-500';
    const tooltipMap = {
        none: `Request access to ${title.toLowerCase()}`,
        rejected: `Previous request declined — click to request again`,
        rejected_cooldown: `Request declined — try again after 24 hours`,
    };
    return `<button id="${id}" ${onclick} class="p-3 glass rounded-xl text-neutral-500 ${cursor} transition-colors relative group" title="${tooltipMap[access] || 'Request access'}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path></svg>
        <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center bg-neutral-800 border border-white/10">
            <svg class="w-2 h-2 text-neutral-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
        </span>
    </button>`;
}

function buildInfoRowValue(type, access, value) {
    const isEmail = type === 'email';
    const id = isEmail ? 'info-email-slot' : 'info-phone-slot';

    if (access === 'self_or_admin' || access === 'approved') {
        return `<span id="${id}" class="font-medium truncate ml-4" title="${value}">${value || 'N/A'}</span>`;
    }
    if (access === 'pending') {
        return `<span id="${id}" class="font-medium text-amber-500/70 text-xs italic ml-4">Request pending…</span>`;
    }
    if (access === 'rejected_cooldown') {
        return `<span id="${id}" class="font-medium text-red-500/70 text-xs italic ml-4">Request declined</span>`;
    }
    // none or rejected
    const label = isEmail ? 'email' : 'phone';
    return `<button id="${id}" onclick="window.openContactRequestModal()" class="font-medium text-xs text-neutral-500 hover:text-primary-500 ml-4 transition-colors flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
        Request ${label}
    </button>`;
}

function buildRequestModal(memberName, memberFirstName, access) {
    // Only render when action is possible (none or rejected)
    if (access === 'pending' || access === 'self_or_admin' || access === 'approved' || access === 'rejected_cooldown') {
        return '';
    }
    const isRetry = access === 'rejected';
    return `
        <div id="contact-request-modal" class="fixed inset-0 z-[70] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div class="glass w-full max-w-md rounded-2xl overflow-hidden">
                <div class="p-8 space-y-6 text-center">
                    <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                        <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">${isRetry ? 'Request Access Again' : 'Contact Info Protected'}</h3>
                        <p class="text-neutral-400 text-sm leading-relaxed">
                            ${isRetry
                                ? `Your previous request was declined. You may send a new request to <strong class="text-neutral-300">${memberFirstName}</strong>.`
                                : `Viewing <strong class="text-neutral-300">${memberFirstName}'s</strong> contact information requires their approval. They will be notified and you will receive a response by email or SMS.`
                            }
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <button id="contact-request-submit-btn" onclick="window.handleSendContactRequest()" class="btn-custom w-full">
                            <span class="inner">Send Request</span>
                        </button>
                        <button onclick="window.closeContactRequestModal()" class="px-6 py-3 text-neutral-400 hover:text-neutral-300 transition-colors text-sm font-medium">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function MemberDetail(params) {
    const memberName = params.name;
    if (!memberName) {
        return '<div class="py-20 text-center">Member not found</div>';
    }

    let member = null;
    try {
        member = await api.getMemberDetails(memberName);
    } catch (e) {
        return `<div class="py-20 text-center text-red-500">Error: ${e.message}</div>`;
    }

    if (!member) {
        return '<div class="py-20 text-center">Member not found</div>';
    }

    currentMemberName = memberName;
    const access = member.contact_access || 'none';
    const email = member.email_address || null;
    const phone = member.mobile_number || null;

    return `
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
                        <div class="w-48 h-48 rounded-3xl overflow-hidden mb-6 border-4 border-white/10 shadow-2xl">
                            <img src="${member.photo || '/files/default-avatar-white.svg'}"
                                 alt="${member.first_name}"
                                 class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-2xl font-bold mb-3">${member.title || ''} ${member.first_name} ${member.middle_name || ''} ${member.surname}</h3>
                        <p class="text-primary-500 font-semibold uppercase tracking-widest leading-tight text-sm mb-4">${member.designation || 'Member'}</p>

                        <div class="flex gap-3">
                            ${buildContactIconButton('email', access, email)}
                            ${buildContactIconButton('phone', access, phone)}
                        </div>

                        ${(access !== 'self_or_admin' && access !== 'approved') ? `
                        <p class="text-[10px] text-neutral-600 mt-3 flex items-center justify-center gap-1.5">
                            ${access === 'pending'
                                ? `<svg class="w-3 h-3 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Contact request pending approval</span>`
                                : `<svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg><span>${access === 'rejected_cooldown' ? 'Contact request declined — 24 h cooldown' : 'Contact info requires approval'}</span>`
                            }
                        </p>` : ''}
                    </div>

                    <div class="glass p-6 rounded-2xl space-y-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Basic Information</h4>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Gender</span>
                            <span class="font-medium">${member.gender || 'N/A'}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Email</span>
                            ${buildInfoRowValue('email', access, email)}
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Phone</span>
                            ${buildInfoRowValue('phone', access, phone)}
                        </div>
                    </div>
                </div>

                <!-- Right: Details -->
                <div class="lg:col-span-2 space-y-6">
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
                                <p class="text-neutral-300 font-medium">${member.institution || 'N/A'}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Designation</span>
                                <p class="text-neutral-300 font-medium">${member.designation || 'N/A'}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Region</span>
                                <p class="text-neutral-300 font-medium">${member.region || 'N/A'}</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Skills & Expertise</span>
                            <div class="prose prose-invert max-w-none text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                ${member.skills || 'No detailed bio provided yet.'}
                            </div>
                        </div>

                        ${member.professional_memberships && member.professional_memberships.length > 0 ? `
                        <div class="mt-8 space-y-4">
                            <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Professional Memberships</span>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${member.professional_memberships.map(m => `
                                    <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p class="font-medium text-sm">${m.professional_body || 'Body'}</p>
                                        <p class="text-xs text-neutral-500">${m.profession || 'Profession'}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>

        ${buildRequestModal(memberName, member.first_name, access)}
    `;
}
