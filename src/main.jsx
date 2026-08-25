import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import '@/pages/interior/interior-bg.css' // site-wide dark-section backgrounds (owner brief 2026-08-21)

/* After a deploy, an open tab still holds the previous build's index; clicking to a
   lazy route then requests a chunk hash that no longer exists and the page stays on
   the black Suspense fallback. Vite reports that failed dynamic import as
   `vite:preloadError` - reload once to pick up the new build (guarded so a truly
   broken network can't loop). Owner report 2026-08-23. */
window.addEventListener('vite:preloadError', (event) => {
  const KEY = 'ayes-chunk-reload'
  const last = Number(sessionStorage.getItem(KEY) || 0)
  if (Date.now() - last < 15000) return // second failure within 15s: let it surface
  sessionStorage.setItem(KEY, String(Date.now()))
  event.preventDefault()
  window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

/* Dismiss the boot screen (index.html) only once React has committed a frame
   AND the webfonts have settled - otherwise the page is revealed mid-reflow and
   the visitor watches the type jump, which is the thing the screen exists to
   hide. Two rAFs: the first fires before paint, the second after it.
   index.html owns the failsafe timeout, so a hang here cannot strand anyone. */
const revealApp = () => {
  if (typeof window.__ayesBootDone === 'function') window.__ayesBootDone()
}
const afterPaint = () => requestAnimationFrame(() => requestAnimationFrame(revealApp))
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(afterPaint).catch(afterPaint)
} else {
  afterPaint()
}
