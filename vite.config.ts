import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/easyvoca/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        id: '/easyvoca/',
        name: 'EasyVoca — 英単語の、その先へ。',
        short_name: 'EasyVoca',
        description: '見落としやすい英単語の意味を、例文と図で学ぶ。',
        theme_color: '#f7f9fd',
        background_color: '#f7f9fd',
        display: 'standalone',
        start_url: '/easyvoca/',
        scope: '/easyvoca/',
        lang: 'ja',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: '/easyvoca/index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /\/easyvoca\/generated\/.+\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'easyvoca-content-v1',
              expiration: { maxEntries: 64, maxAgeSeconds: 365 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [200] }
            }
          }
        ]
      }
    })
  ]
});
