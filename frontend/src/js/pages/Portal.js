import { api } from '../utils/api.js'
import { router } from '../utils/router.js'

// Sub-components (could be in separate files but keeping here for simplicity for now)
import { MembersPortal } from './portal/MembersPortal.js'
import { BlogPortal } from './portal/BlogPortal.js'
import { RegistrationsPortal } from './portal/RegistrationsPortal.js'
import { MemberDetail } from './portal/MemberDetail.js'
import { ProgrammesPortal } from './portal/ProgrammesPortal.js'
import { GalleryPortal } from './portal/GalleryPortal.js'

window.handleLogout = async () => {
    try {
        await api.logout();
        router.user = null;
        router.navigate('/login');
    } catch (e) {
        console.error("Logout failed", e);
    }
}

export async function PortalPage(params) {
    let section = params.section || 'dashboard';
    if (params.name) section = 'member';
    const user = router.user;

    if (!user) {
        router.navigate('/login');
        return '';
    }

    const isAdmin = user.roles.includes('PuSMAG Admin');
    const isBlogger = user.roles.includes('PuSMAG Blogger') || isAdmin;
    const isMemberOnly = user.roles.includes('PuSMAG Member') && !isBlogger;

    let stats = { total_members: '...', active_programmes: '...', your_posts: '...' };
    if (section === 'dashboard') {
        try {
            stats = await api.getPortalStats();
        } catch (e) {
            console.error("Failed to fetch stats", e);
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
    const getIcon = (id) => `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${getIconPath(id)}"></path></svg>`;
    const getIconPath = (id) => {
        switch (id) {
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
                        <span class="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-bold uppercase tracking-wider">
                            ${user.roles.filter(r => r.startsWith('PuSMAG')).join(' / ') || 'Member'}
                        </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="glass p-6 rounded-xl border-l-4 border-primary-500">
                            <p class="text-neutral-400 text-sm mb-1 uppercase tracking-wider font-bold">Total Members</p>
                            <h3 class="text-4xl font-bold">${stats.total_members}</h3>
                        </div>
                        <div class="glass p-6 rounded-xl border-l-4 border-accent-500">
                            <p class="text-neutral-400 text-sm mb-1 uppercase tracking-wider font-bold">Active Programmes</p>
                            <h3 class="text-4xl font-bold">${stats.active_programmes}</h3>
                        </div>
                        ${!isMemberOnly ? `
                        <div class="glass p-6 rounded-xl border-l-4 border-emerald-500">
                            <p class="text-neutral-400 text-sm mb-1 uppercase tracking-wider font-bold">Your Posts</p>
                            <h3 class="text-4xl font-bold">${stats.your_posts}</h3>
                        </div>
                        ` : ''}
                    </div>

                    <div class="glass p-8 rounded-2xl">
                        <h3 class="text-xl font-bold mb-4">Quick Stats & Activity</h3>
                        <p class="text-neutral-400">Welcome to your PuSMAG Portal. Use the sidebar to navigate through your available tools.</p>
                    </div>
                </div>
            `;
    }

    return `
        <div class="min-h-screen pt-20 flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 hidden md:flex flex-col fixed inset-y-0 pt-20">
                <div class="p-6 flex-grow">
                    <nav class="space-y-2">
                        ${sections.filter(s => !s.roles || s.roles.some(r => user.roles.includes(r))).map(s => `
                            <a href="/ps/portal/${s.id}" 
                               class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${section === s.id ? 'bg-primary-500/20 text-primary-500 border border-primary-500/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'}">
                                ${getIcon(s.id)}
                                <span class="font-medium">${s.label}</span>
                            </a>
                        `).join('')}
                    </nav>
                </div>
                
                <div class="p-6 border-t border-white/5">
                    <button onclick="window.handleLogout()" class="flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-red-500 transition-colors uppercase text-xs font-bold tracking-widest">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="flex-grow md:ml-64 p-8 md:p-12 overflow-y-auto">
                <div class="max-w-6xl mx-auto">
                    ${sectionContent}
                </div>
            </main>
        </div>
    `
}
