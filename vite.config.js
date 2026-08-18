import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'fonts/**/*'],
      manifest: {
        name: 'Legalese — Constitutional Literacy for Children',
        short_name: 'Legalese',
        description: 'Interactive legal rights education platform for Indian children (ages 8–16).',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#161226',
        theme_color: '#FFB84D',
        icons: [
          { src: '/icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // Pre-cache all app shell assets
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Cache story JSON files (runtime cache)
        runtimeCaching: [
          {
            urlPattern: /\/src\/stories\/.*\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'stories-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-cache' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'vendor-motion': ['framer-motion'],
          // Firebase (split auth from database)
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          // 3D (only used in landing)
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Raise the warning threshold — our story chunks are intentionally large
    chunkSizeWarningLimit: 600,
  },
});
