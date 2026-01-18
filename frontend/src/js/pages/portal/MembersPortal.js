import { api } from '../../utils/api.js'
import { initAnimations } from '../../utils/animations.js'

let currentPage = 1;
const itemsPerPage = 12;
let currentFilters = {};

window.changeMemberPage = (page) => {
    currentPage = page;
    renderMembersList();
    // Scroll to top of grid
    document.getElementById('members-grid-container')?.scrollIntoView({ behavior: 'smooth' });
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

window.toggleMemberFilters = () => {
    const container = document.getElementById('member-filters-container');
    const arrow = document.getElementById('member-filter-toggle-arrow');
    if (container) {
        container.classList.toggle('hidden');
        if (arrow) arrow.classList.toggle('rotate-180');
    }
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
            <div onclick="router.navigate('/portal/member/${m.name}')" 
                 class="relative glass p-4 sm:p-6 rounded-2xl flex flex-col items-center text-center group hover:border-primary-500/50 hover:bg-white/5 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer overflow-hidden">
                
                <!-- Decorative background elements -->
                <div class="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
                <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-accent-500/5 rounded-full blur-2xl group-hover:bg-accent-500/10 transition-colors"></div>

                <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 mb-3 sm:mb-4 border-2 border-white/10 group-hover:border-primary-500 transition-all duration-500">
                    <div class="w-full h-full rounded-full overflow-hidden">
                        <img src="${m.photo || '/files/default-avatar-white.svg'}" 
                             alt="${m.first_name}" 
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                </div>

                <h4 class="font-bold text-base sm:text-lg text-neutral-300 group-hover:text-primary-400 transition-colors leading-tight mb-2 sm:mb-4">
                    ${m.first_name} ${m.middle_name ? m.middle_name + ' ' : ''}${m.surname}
                </h4>
                
                <p class="text-accent-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] leading-tight mb-3 sm:mb-4">
                    ${m.designation || 'Member'}
                </p>

                <div class="w-full pt-3 sm:pt-4 border-t border-white/5 flex flex-col gap-2">
                    <div class="hidden sm:flex items-center justify-center gap-2 text-xs text-neutral-400 mb-2">
                        <span class="text-sm sm:text-lg leading-tight">${m.institution || 'Public Service'}</span>
                    </div>
                    <div class="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500">
                        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>${m.region || 'N/A'}</span>
                    </div>
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
                            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all ${currentPage === i ? 'bg-primary-500 text-neutral-300' : 'glass text-neutral-400 hover:text-neutral-300'}">
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
                <div>
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-300 mb-2">Member Directory</h2>
                    <p class="text-neutral-500 text-sm">Connect and network with fellow Muslim public servants</p>
                </div>
            </div>
            
            <!-- Mobile Filter Toggle -->
            <button 
                onclick="window.toggleMemberFilters()"
                class="lg:hidden w-full glass mb-4 px-5 py-3.5 rounded-xl flex items-center justify-between text-neutral-300 font-bold uppercase tracking-widest border border-white/10 shadow-lg shadow-black/20"
            >
                <span class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                    </svg>
                    Search & Filters
                </span>
                <svg id="member-filter-toggle-arrow" class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            
            <!-- Filters Container (Hidden on mobile unless toggled) -->
            <div id="member-filters-container" class="hidden lg:flex flex-wrap items-center justify-end gap-4">
                <div class="relative min-w-[300px] group flex-grow lg:flex-grow-0">
                    <input type="text" placeholder="Search by name, institution..." 
                           oninput="window.handleMemberSearch(event)"
                           class="text-xs w-full pl-12 pr-4 py-3 mb-2 glass rounded-xl border border-white/10 focus:outline-none focus:border-primary-500/50 focus:bg-primary-500/5 focus:ring-4 focus:ring-primary-500/10 transition-all">
                    <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <div class="relative group flex-grow lg:flex-grow-0">
                    <select name="region" onchange="window.handleMemberFilter(event)" 
                            class="text-xs appearance-none pl-10 pr-10 py-3 glass rounded-xl border border-white/10 focus:outline-none focus:border-accent-500/50 focus:bg-accent-500/5 focus:ring-4 focus:ring-accent-500/10 transition-all text-sm text-neutral-300 w-full">
                        <option value="">All Regions</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                    </select>
                    <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                    <svg class="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
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
