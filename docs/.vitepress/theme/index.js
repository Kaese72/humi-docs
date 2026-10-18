import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import Layout from './Layout.vue'
import './theme.css'
import './humi.css'

// VitePress's default theme, re-skinned with the Humi tokens.
//
// The theme itself is Humi's: data-theme="dark" | "light" on <html>, set
// before first paint by the inline script in config.mjs and toggled by the
// copied ThemeToggle/useTheme. A few VitePress styles (code highlighting
// among them) still key off a `dark` class, so mirror data-theme onto it.
function syncDarkClass() {
  const html = document.documentElement
  html.classList.toggle('dark', html.dataset.theme === 'dark')
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {
    if (!inBrowser) return
    syncDarkClass()
    new MutationObserver(syncDarkClass).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
  },
}
