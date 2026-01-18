import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
    base: '/assets/pusmag/',
    plugins: [
        {
            name: 'move-index-html',
            closeBundle() {
                const src = path.resolve(__dirname, '../pusmag/public/index.html')
                const dest = path.resolve(__dirname, '../pusmag/www/index.html')

                // Ensure destination directory exists
                const destDir = path.dirname(dest)
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true })
                }

                // Copy file
                if (fs.existsSync(src)) {
                    fs.copyFileSync(src, dest)
                    // Also create a 404.html copy for SPA routing support in Frappe
                    const dest404 = path.resolve(__dirname, '../pusmag/www/404.html')
                    fs.copyFileSync(src, dest404)
                    console.log(` Moved index.html and 404.html to ${destDir}`)
                }
            }
        }
    ],
    build: {
        outDir: '../pusmag/public',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `js/[name]-[hash].js`,
                chunkFileNames: `js/[name]-[hash].js`,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return `css/[name]-[hash].[ext]`
                    }
                    return `misc/[name]-[hash].[ext]`
                },
            },
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})
