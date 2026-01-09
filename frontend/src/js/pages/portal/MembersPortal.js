import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let currentPage = 1;
const itemsPerPage = 12;
let currentFilters = {};

window.changeMemberPage = (page) => {
    currentPage = page;
    renderMembersList();
}

window.handleMemberSearch = (event) => {
    const search = event.target.value;
    currentFilters.search = search;
    currentPage = 1;
    renderMembersList();
}

window.handleMemberFilter = (event) => {
    const { name, value } = event.target;
    if (value) currentFilters[name] = value;
    else delete currentFilters[name];
    currentPage = 1;
    renderMembersList();
}

async function renderMembersList() {
    const container = document.getElementById('members-grid-container');
    if (!container) return;

    container.innerHTML = '<div class="col-span-full py-20 text-center text-neutral-500">Searching members...</div>';

    try {
        const { members, total } = await api.getMemberDirectory({
            ...currentFilters,
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage
        });

        if (members.length === 0) {
            container.innerHTML = '<div class="col-span-full py-20 text-center text-neutral-500">No members found matching your criteria.</div>';
            return;
        }

        container.innerHTML = members.map(m => `
            <div onclick="router.navigate('/ps/portal/member/${m.name}')" class="glass p-6 rounded-2xl flex flex-col items-center text-center group hover:border-primary-500/50 transition-all cursor-pointer">
                <div class="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-primary-500 transition-colors">
                    <img src="${m.photo || '/files/default-avatar-white.svg'}" 
                         alt="${m.first_name}" 
                         class="w-full h-full object-cover">
                </div>
                <h4 class="font-bold text-lg leading-tight mb-1">${m.first_name} ${m.middle_name || ''} ${m.surname}</h4>
                <p class="text-primary-500 text-xs font-semibold uppercase tracking-widest mb-3">${m.designation || 'Member'}</p>
                <div class="w-full pt-3 border-t border-white/5 text-sm text-neutral-400">
                    <p class="mb-1">${m.institution || 'Public Service'}</p>
                    <p class="text-xs">${m.region || ''}</p>
                </div>
            </div>
        `).join('');

        // Pagination
        const paginationContainer = document.getElementById('members-pagination');
        if (paginationContainer) {
            const totalPages = Math.ceil(total / itemsPerPage);
            let html = '';
            for (let i = 1; i <= totalPages; i++) {
                html += `
                    <button onclick="window.changeMemberPage(${i})" 
                            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all ${currentPage === i ? 'bg-primary-500 text-white' : 'glass text-neutral-400 hover:text-white'}">
                        ${i}
                    </button>
                `;
            }
            paginationContainer.innerHTML = html;
        }

        // Ensure animations are triggered for new items
        setTimeout(() => initAnimations(), 100);

    } catch (e) {
        container.innerHTML = `<div class="col-span-full py-20 text-center text-red-500">Error loading members: ${e.message}</div>`;
    }
}

export async function MembersPortal() {
    // Return the structure and then trigger the initial load
    setTimeout(() => renderMembersList(), 100);

    return `
        <div class="space-y-8 animate-on-scroll">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h2 class="text-3xl font-bold">Member Directory</h2>
                
                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative min-w-[300px]">
                        <input type="text" placeholder="Search by name, institution..." 
                               oninput="window.handleMemberSearch(event)"
                               class="w-full pl-12 pr-4 py-3 glass rounded-xl border border-white/10 focus:outline-none focus:border-primary-500 transition-all">
                        <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    
                    <select name="region" onchange="window.handleMemberFilter(event)" 
                            class="px-4 py-3 glass rounded-xl border border-white/10 focus:outline-none focus:border-primary-500 transition-all text-sm">
                        <option value="">All Regions</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                        <!-- Add others if needed -->
                    </select>
                </div>
            </div>

            <div id="members-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Members loaded via JS -->
            </div>

            <div id="members-pagination" class="flex justify-center gap-2 pt-8">
                <!-- Pagination loaded via JS -->
            </div>
        </div>
    `
}
