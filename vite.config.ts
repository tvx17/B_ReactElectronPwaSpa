import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const target = ['spa', 'pwa', 'electron'].includes(mode) ? mode : 'spa'
  return {
    base: target === 'electron' ? './' : '/',
    define: { __APP_TARGET__: JSON.stringify(target) },
    build: { outDir: `dist/${target}` },
    server: { host: '127.0.0.1', port: 5173, strictPort: true },
    plugins: [
      react(),
      ...(target === 'electron' ? [electron({
        entry: 'electron/main.ts',
        onstart({ startup }) { void startup(['.']) },
        vite: { build: { outDir: 'dist-electron' } },
      })] : []),
      VitePWA({
        disable: target !== 'pwa',
        registerType: 'prompt',
        injectRegister: false,
        manifest: {
          name: 'Eins', short_name: 'Eins',
          description: 'A shared React foundation for web and desktop.',
          theme_color: '#245c49', background_color: '#f6f7f4',
          display: 'standalone', start_url: '/', scope: '/', id: '/',
          icons: [
            { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
            { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: { clientsClaim: true, globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'], navigateFallback: 'index.html' },
      }),
    ],
  }
})
