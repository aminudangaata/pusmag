import { BASE_PATH } from '../utils/constants.js'
import { router } from '../utils/router.js'

export function Navbar(currentPath) {
  // Helper to join paths correctly
  const getPath = (path) => {
    if (path === '/') return '/'
    return `${BASE_PATH}${path}`
  }

  const navLinks = [
    { path: getPath('/'), label: 'Home' },
    {
      label: 'Who We Are',
      children: [
        { path: getPath('/about'), label: 'About Us' },
        { path: getPath('/mission-vision'), label: 'Mission & Vision' },
        { path: getPath('/guiding-principles'), label: 'Guiding Principles' },
        { path: getPath('/objectives'), label: 'Objectives' },
        { path: getPath('/governance'), label: 'Governance' },
        { path: getPath('/ethics'), label: 'Ethics' },
      ],
    },
    { path: getPath('/programmes'), label: 'Programmes' },
    { path: getPath('/blog-news'), label: 'Blog' },
    { path: getPath('/gallery'), label: 'Gallery' },
    { path: getPath('/contact'), label: 'Contact' },
  ]

  const isActive = (path) => currentPath === path ? 'text-neutral-300' : 'text-neutral-400'
  const isParentActive = (children) => children.some(child => child.path === currentPath) ? 'text-neutral-300' : 'text-neutral-400'

  const user = router.user;
  const isLoggedIn = !!(user && user.email);
  const isPortalVisible = isLoggedIn && Array.isArray(user.roles) &&
    (user.roles.includes('PuSMAG Member') || user.roles.includes('PuSMAG Admin'));

  return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-xl border-b border-white/10">
      <div class="container-custom">
        <div class="flex justify-between items-center py-6">
          <!-- Logo -->
          <a href="${getPath('/')}" class="flex items-center gap-3 group">
            <img src="/files/pusmag_logo_small_01.png" alt="PUSMAG Logo" class="w-10 h-10 object-contain">
            <span class="text-lg font-semibold tracking-tight text-neutral-300">PuSMAG</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            ${navLinks.map(link => {
    if (link.children) {
      return `
                        <div class="relative group">
                            <button class="flex items-center gap-1 text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${isParentActive(link.children)}">
                                ${link.label}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div class="absolute left-0 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                <div class="bg-neutral-900 border border-white/10 rounded-lg p-2 shadow-xl">
                                    ${link.children.map(child => `
                                        <a href="${child.path}" class="block px-4 py-2 text-sm text-neutral-400 hover:text-neutral-300 hover:bg-white/5 rounded-md transition-colors ${isActive(child.path)}">
                                            ${child.label}
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `
    }
    return `
        <a href="${link.path}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${isActive(link.path)}">
            ${link.label}
        </a>
    `
  }).join('')}
</div>

<!-- CTA Button -->
<div class="hidden md:flex items-center gap-6">
  ${isLoggedIn ? `
              <div class="flex items-center gap-4">
                ${isPortalVisible ? `
                <a href="${getPath('/portal')}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors ${currentPath.startsWith(getPath('/portal')) ? 'text-neutral-300' : 'text-neutral-400'}">
                    Portal
                </a>
                ` : ''}
                <button onclick="window.handleLogout()" class="cursor-pointer text-xs font-medium tracking-widest uppercase text-red-500/80 hover:text-red-500 transition-colors">
                    Logout
                </button>
                <div class="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                    <img src="${user.user_image || '/files/default-avatar-white.svg'}" class="w-full h-full object-cover">
                </div>
              </div>
            ` : `
              <a href="${getPath('/register')}" class="btn-custom">
                <span class="inner">Register</span>
              </a>
              <a href="${getPath('/login')}" class="text-xs font-medium tracking-widest uppercase hover:text-neutral-300 transition-colors">
                Login
              </a>
            `}
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="md:hidden text-neutral-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden pb-6">
          ${navLinks.map(link => {
    if (link.children) {
      return `
                    <div class="py-3 border-b border-white/5">
                        <span class="block text-sm font-medium text-neutral-400 mb-2">${link.label}</span>
                        <div class="pl-4 space-y-2">
                            ${link.children.map(child => `
                                <a href="${child.path}" class="block py-2 text-sm ${isActive(child.path)} hover:text-neutral-300 transition-colors">
                                    ${child.label}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                  `
    }
    return `
                <a href="${link.path}" class="block py-3 text-sm font-medium ${isActive(link.path)} hover:text-neutral-300 transition-colors border-b border-white/5 last:border-0">
                    ${link.label}
                </a>
              `
  }).join('')}
          ${isLoggedIn ? `
            ${isPortalVisible ? `<a href="${getPath('/portal')}" class="block py-3 text-sm font-medium hover:text-neutral-300 transition-colors border-b border-white/5">Portal</a>` : ''}
            <button onclick="window.handleLogout()" class="cursor-pointer block py-3 text-sm font-medium text-red-500 hover:text-red-400 transition-colors">Logout</button>
          ` : `
            <a href="${getPath('/register')}" class="block mt-4">
                <span class="btn-custom inline-block">
                <span class="inner">Register</span>
                </span>
            </a>
            <a href="${getPath('/login')}" class="block py-3 text-sm font-medium text-neutral-400 hover:text-neutral-300 transition-colors">Login</a>
          `}
        </div>
      </div>
    </nav>
  `
}
