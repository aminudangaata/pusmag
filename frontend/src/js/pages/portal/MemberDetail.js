import { api } from '../../utils/api.js'
import { router } from '../../utils/router.js'

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
                        <div class="w-48 h-48 rounded-3xl overflow-hidden mb-6 border-4 border-white/10 group-hover:border-primary-500 transition-colors shadow-2xl">
                            <img src="${member.photo || '/files/default-avatar-white.svg'}" 
                                 alt="${member.first_name}" 
                                 class="w-full h-full object-cover">
                        </div>
                        <h3 class="text-2xl font-bold mb-1">${member.title || ''} ${member.first_name} ${member.middle_name || ''} ${member.surname}</h3>
                        <p class="text-primary-500 font-semibold uppercase tracking-widest text-sm mb-4">${member.designation || 'Member'}</p>
                        
                        <div class="flex gap-3">
                            <a href="mailto:${member.email_address}" class="p-3 glass rounded-xl hover:text-primary-500 transition-colors" title="${member.email_address}">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </a>
                            <a href="tel:${member.mobile_number}" class="p-3 glass rounded-xl hover:text-emerald-500 transition-colors" title="${member.mobile_number}">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div class="glass p-6 rounded-2xl space-y-4">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-2">Basic Information</h4>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Gender</span>
                            <span class="font-medium">${member.gender || 'N/A'}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Email</span>
                            <span class="font-medium truncate ml-4" title="${member.email_address}">${member.email_address || 'N/A'}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-neutral-400">Phone</span>
                            <span class="font-medium">${member.mobile_number || 'N/A'}</span>
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
                                <p class="text-white font-medium">${member.institution || 'N/A'}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Designation</span>
                                <p class="text-white font-medium">${member.designation || 'N/A'}</p>
                            </div>
                            <div class="space-y-1">
                                <span class="text-xs text-neutral-500 uppercase tracking-wider font-bold">Region</span>
                                <p class="text-white font-medium">${member.region || 'N/A'}</p>
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
    `;
}
