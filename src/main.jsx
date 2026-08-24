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
