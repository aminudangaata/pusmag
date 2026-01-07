import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
    base: '/assets/pusmag/ps/',
    plugins: [
        {
            name: 'move-index-html',
            closeBundle() {
                const src = path.resolve(__dirname, '../pusmag/public/ps/index.html')
                const dest = path.resolve(__dirname, '../pusmag/www/ps/index.html')

                // Ensure destination directory exists
                const destDir = path.dirname(dest)
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true })
                }

                // Copy file
                if (fs.existsSync(src)) {
                    fs.copyFileSync(src, dest)
                    console.log(` Moved index.html to ${dest}`)
                }
            }
        }
    ],
    build: {
        outDir: '../pusmag/public/ps',
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
