import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
                cleanupOutdatedCaches: true,
            },
            manifest: {
                name: 'KoriLab',
                short_name: 'KoriLab',
                description: 'Studio de design et développement web',
                theme_color: '#00a8ff',
                background_color: '#050a14',
                display: 'standalone',
                start_url: '/',
                icons: [
                    { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
                    { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
                ],
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react':   ['react', 'react-dom'],
                    'vendor-motion':  ['framer-motion'],
                    'vendor-inertia': ['@inertiajs/react'],
                    'vendor-lucide':  ['lucide-react'],
                },
            },
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
