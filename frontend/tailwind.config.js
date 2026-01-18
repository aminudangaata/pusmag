/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,html}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                md: '2.5rem',
                lg: '4rem',
            },
        },
        extend: {
            colors: {
                primary: {
                    // 50: '#ecfdf5',
                    // 100: '#d1fae5',
                    // 200: '#a7f3d0',
                    // 300: '#6ee7b7',
                    // 400: '#34d399',
                    // 500: '#10b981', // emerald-500
                    // 600: '#059669', // emerald-600
                    // 700: '#047857',
                    // 800: '#065f46',
                    // 900: '#064e3b',
                    '50': '#f7fce9',
                    '100': '#edf7d0',
                    '200': '#dbf0a6',
                    '300': '#c2e472',
                    '400': '#a9d546',
                    '500': '#88b727',
                    '600': '#6a941c',
                    '700': '#52711a',
                    '800': '#425a1a',
                    '900': '#3a4d1a',
                    '950': '#1c2a09',
                },
                accent: {
                    // 50: '#f0f9ff',
                    // 100: '#e0f2fe',
                    // 200: '#bae6fd',
                    // 300: '#7dd3fc',
                    // 400: '#38bdf8',
                    // 500: '#0ea5e9', // sky-500
                    // 600: '#0284c7', // sky-600
                    // 700: '#0369a1',
                    // 800: '#075985',
                    // 900: '#0c4a6e',
                    '50': '#f1f8fe',
                    '100': '#e2f1fc',
                    '200': '#bfe2f8',
                    '300': '#86caf3',
                    '400': '#45afeb',
                    '500': '#1d95da',
                    '600': '#0f77ba',
                    '700': '#0e5f96',
                    '800': '#105380',
                    '900': '#134467',
                    '950': '#0c2b45',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            lineHeight: {
                'relaxed': '1.75',
                'loose': '2',
            },
            animation: {
                'fadeSlideIn': 'fadeSlideIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) both',
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeSlideIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(65px) rotateZ(3deg)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0) rotateZ(0)',
                    },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
