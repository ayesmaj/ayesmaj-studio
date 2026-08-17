import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Writes dist/<Route>/index.html with per-route title/description/canonical
// and one crawlable paragraph. Build-only: dev is served by the SPA router.
// Throws on failure so a broken prerender fails the deploy instead of
// silently shipping 21 identical pages. See scripts/prerender.mjs.
const prerender = () => ({
  name: 'ayesmaj-prerender',
  apply: 'build',
  closeBundle() {
    execFileSync('node', [path.resolve(__dirname, 'scripts/prerender.mjs')], {
      stdio: 'inherit',
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerender()],
  server: {
    host: true,   // bind to 0.0.0.0 so localhost (IPv4) works
    port: Number(process.env.PORT) || 5173,  // honor harness-assigned port
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
