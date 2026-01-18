import { api } from '../utils/api.js'
import { router } from '../utils/router.js'

// Sub-components (could be in separate files but keeping here for simplicity for now)
import { MembersPortal } from './portal/MembersPortal.js'
import { BlogPortal } from './portal/BlogPortal.js'
import { RegistrationsPortal } from './portal/RegistrationsPortal.js'
import { MemberDetail } from './portal/MemberDetail.js'
import { ProgrammesPortal } from './portal/ProgrammesPortal.js'
import { GalleryPortal } from './portal/GalleryPortal.js'

// window.handleLogout moved to router.js/main.js for global access

window.togglePortalSidebar = () => {
    const sidebar = document.getElementById('portal-sidebar');
    const overlay = document.getElementById('portal-sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('translate-x-0');
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

window.toggleAyahAudio = () => {
    const audio = document.getElementById('ayah-audio');
    const btn = document.getElementById('ayah-play-btn');
    if (!audio || !btn) return;

    if (audio.paused) {
        audio.play();
        btn.innerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
    } else {
        audio.pause();
        btn.innerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';
    }

    audio.onended = () => {
        btn.innerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';
    };
}

// Helper to get prioritized display role
const getDisplayRole = (userRoles) => {
    const roles = Array.isArray(userRoles) ? userRoles : [];
    if (roles.includes('PuSMAG Admin')) return 'Admin';
    if (roles.includes('PuSMAG Blogger')) return 'Blogger';
    if (roles.includes('PuSMAG Member')) return 'Member';
    return 'User';
};

export async function PortalPage(params) {
    let section = params.section || 'dashboard';
    if (params.name) section = 'member';
    const user = router.user;

    if (!user) {
        router.navigate('/login');
        return '';
    }

    const roles = Array.isArray(user && user.roles) ? user.roles : [];
    const displayRole = getDisplayRole(roles);
    const isAdmin = roles.includes('PuSMAG Admin');
    const isBlogger = roles.includes('PuSMAG Blogger') || isAdmin;
    const isMemberOnly = roles.includes('PuSMAG Member') && !isBlogger;

    let stats = { total_members: '...', active_programmes: '...', your_posts: '...' };
    let verse = null;
    const isLoggedIn = user && user.email;
    if (section === 'dashboard') {
        try {
            if (isLoggedIn) {
                const results = await Promise.allSettled([
                    api.getPortalStats(),
                    api.getVerseOfTheDay()
                ]);
                if (results[0].status === 'fulfilled') stats = results[0].value;
                if (results[1].status === 'fulfilled') verse = results[1].value;
            } else {
                // For unauthenticated users show only verse (external API) if available
                try {
                    verse = await api.getVerseOfTheDay();
                } catch (e) {
                    console.error('Failed to fetch verse for guest:', e);
                }
            }
        } catch (e) {
            console.error("Failed to fetch dashboard data", e);
        }
    }

    const sections = [
        { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
        { id: 'members', label: 'Members', icon: 'users', roles: ['PuSMAG Member', 'PuSMAG Blogger', 'PuSMAG Admin'] },
        { id: 'blog', label: 'Blog Posts', icon: 'file-text', roles: ['PuSMAG Blogger', 'PuSMAG Admin'] },
        { id: 'registrations', label: 'Registrations', icon: 'user-plus', roles: ['PuSMAG Admin'] },
        { id: 'programmes', label: 'Programmes', icon: 'calendar', roles: ['PuSMAG Admin'] },
        { id: 'gallery', label: 'Gallery', icon: 'image', roles: ['PuSMAG Admin'] },
    ];

    const activeSection = sections.find(s => s.id === section) || sections[0];

    // Helper for icons
    const getIcon = (icon) => `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${getIconPath(icon)}"></path></svg>`;
    const getIconPath = (icon) => {
        switch (icon) {
            case 'grid': return 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z';
            case 'users': return 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z';
            case 'file-text': return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
            case 'user-plus': return 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z';
            case 'calendar': return 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
            case 'image': return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
            default: return '';
        }
    };

    let sectionContent = '';
    switch (section) {
        case 'members': sectionContent = await MembersPortal(); break;
        case 'blog': sectionContent = await BlogPortal(); break;
        case 'registrations': sectionContent = await RegistrationsPortal(); break;
        case 'programmes': sectionContent = await ProgrammesPortal(); break;
        case 'gallery': sectionContent = await GalleryPortal(); break;
        case 'member': sectionContent = await MemberDetail(params); break;
        case 'dashboard':
        default:
            sectionContent = `
                <div class="space-y-8 animate-on-scroll">
                    <div class="flex items-center justify-between">
                        <h2 class="text-3xl font-bold">Welcome, ${user.first_name || 'Member'}</h2>
                        <span class="px-2 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-semibold uppercase tracking-wider">
                            ${displayRole}
                        </span>
                    </div>
                    
                    ${verse ? `
                    <div class="glass p-8 rounded-2xl relative overflow-hidden group border-primary-500/20 shadow-2xl shadow-primary-500/5">
                        <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors duration-1000"></div>
                        
                        <div class="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-neutral-300 leading-tight">Verse of the Day</h3>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-[10px] font-bold uppercase tracking-wider text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded">
                                            Surah ${verse.surahNo}:${verse.ayahNo}
                                        </span>
                                        <span class="text-neutral-500 text-xs">${verse.surahName} (${verse.surahNameTranslation})</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="md:text-right w-full md:w-auto">
                                <span class="text-2xl font-arabic text-primary-400 drop-shadow-sm" dir="rtl">
                                    ${verse.surahNameArabic} : آية ${new Intl.NumberFormat('ar-SA', { useGrouping: false }).format(verse.ayahNo)}
                                </span>
                            </div>
                        </div>

                        <div class="relative space-y-4">
                            <div class="text-2xl md:text-3xl lg:text-4xl text-neutral-300 font-arabic leading-[1.8] text-center py-4 px-4" dir="rtl">
                                ${verse.arabic1}
                            </div>
                            
                            <div class="max-w-3xl mx-auto text-md md:text-lg text-neutral-300 text-center leading-relaxed font-medium italic">
                                <span class="text-primary-500 text-3xl opacity-30 leading-none">"</span>
                                ${verse.english}
                                <span class="text-primary-500 text-3xl opacity-30 leading-none">"</span>
                            </div>

                            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                                <div class="flex items-center gap-3">
                                    <button onclick="window.toggleAyahAudio()" 
                                            id="ayah-play-btn"
                                            class="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-neutral-900 hover:bg-primary-400 transition-all hover:scale-105 shadow-xl shadow-primary-500/20 active:scale-95">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                                    </button>
                                    <div class="text-xs">
                                        <div class="text-sm text-neutral-300 font-bold mb-1">Listen to Recitation</div>
                                        <div class="text-neutral-500 text-xs">Mishary Rashid Al Afasy</div>
                                    </div>
                                </div>
                                <audio id="ayah-audio" src="${verse.audio['1'].url}" preload="none"></audio>
                                
                                <div class="flex items-center gap-2 text-neutral-500">
                                    <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                                    <span class="text-[10px] uppercase tracking-widest font-bold">Daily Inspiration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="glass p-4 rounded-xl border-l-4 border-primary-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Total Members</p>
                            <h3 class="text-5xl font-semibold">${stats.total_members}</h3>
                        </div>
                        <div class="glass p-4 rounded-xl border-l-4 border-accent-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Active Programmes</p>
                            <h3 class="text-5xl font-semibold">${stats.active_programmes}</h3>
                        </div>
                        ${!isMemberOnly ? `
                        <div class="glass p-4 rounded-xl border-l-4 border-emerald-500">
                            <p class="text-neutral-400 text-xs mb-1 uppercase tracking-wider font-bold">Your Posts</p>
                            <h3 class="text-5xl font-semibold">${stats.your_posts}</h3>
                        </div>
                        ` : ''}
                    </div>

                    <div class="glass p-6 rounded-xl">
                        <h3 class="text-lg font-bold mb-3">Quick Stats & Activity</h3>
                        <p class="text-sm text-neutral-400">Welcome to your PuSMAG Portal. Use the sidebar to navigate through your available tools.</p>
                    </div>

                    
                </div>
            `;
    }

    return `
        <div class="min-h-screen pt-20 flex">
            <!-- Mobile Sidebar Overlay -->
            <div id="portal-sidebar-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden md:hidden" onclick="window.togglePortalSidebar()"></div>
            
            <!-- Mobile Portal Menu Button (distinct from main navbar) -->
            <button 
                onclick="window.togglePortalSidebar()"
                class="fixed top-24 left-4 z-50 md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all active:scale-95"
                aria-label="Toggle Portal Menu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            
            <!-- Sidebar -->
            <aside id="portal-sidebar" class="w-64 bg-neutral-900/95 md:bg-neutral-900/40 backdrop-blur-md border-r border-white/10 flex flex-col fixed inset-y-0 pt-20 z-40 -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out">
                <!-- Mobile Close Button -->
                <div class="md:hidden p-4 border-b border-white/10 flex items-center justify-between">
                    <span class="text-sm font-bold text-neutral-400 uppercase tracking-wider">Portal Menu</span>
                    <button onclick="window.togglePortalSidebar()" class="text-neutral-400 hover:text-neutral-300 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="p-6 flex-grow overflow-y-auto">
                    <nav class="space-y-1">
                        ${sections.filter(s => !s.roles || s.roles.some(r => user.roles.includes(r))).map(s => `
                            <a href="/portal/${s.id}" 
                               class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${section === s.id ? 'bg-primary-500/20 text-primary-500 border border-primary-500/20' : 'text-neutral-400 hover:text-neutral-300 hover:bg-white/5'}">
                                ${getIcon(s.icon)}
                                <span class="text-sm font-medium">${s.label}</span>
                            </a>
                        `).join('')}
                    </nav>
                </div>
                
                <div class="p-6 border-t border-white/5">
                    <button onclick="window.handleLogout()" class="cursor-pointer flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-red-500 transition-colors uppercase text-xs font-bold tracking-widest">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="flex-grow md:ml-64 p-6 md:p-10 lg:p-12 pt-24 md:pt-12 overflow-y-auto">
                <div class="max-w-6xl mx-auto">
                    ${sectionContent}
                </div>
            </main>
        </div>
    `
}
