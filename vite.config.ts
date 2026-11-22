import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/easyvoca/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        id: '/easyvoca/',
        name: 'EasyVoca — 英単語の、その先へ。',
        short_name: 'EasyVoca',
        description: '見落としやすい英単語の意味を、例文と図で学ぶ。',
        theme_color: '#f7f9fd',
        background_color: '#f7f9fd',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        start_url: '/easyvoca/',
        scope: '/easyvoca/',
        lang: 'ja',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/easyvoca/index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /\/easyvoca\/generated\/.+\.json(?:\?.*)?$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'easyvoca-content-runtime-v2',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 64, maxAgeSeconds: 365 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [200] }
            }
          }
        ]
      }
    })
  ]
});
