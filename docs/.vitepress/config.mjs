import { defineConfig } from 'vitepress'

// Served under cloud.humi.kaese.space/docs/ (see the /docs rule in
// huemie-gitops-base/cloud/base/ingress), so every link and asset is
// prefixed with the base.
const base = '/docs/'

export default defineConfig({
  base,
  lang: 'en',
  title: 'Humi Docs',
  description: 'Documentation for Humi: the Appliance, the Cloud and the devices around them.',
  cleanUrls: true,

  // Light/dark mode is Humi's own (data-theme on <html>, shared with
  // cloud-ui through the humi-theme localStorage key), not VitePress's.
  // See theme/index.js for how the two are kept in sync.
  appearance: false,

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: `${base}brand/humi-app-icon.svg` }],
    ['script', {}, `
      // Apply the saved theme - or, if the user never chose one, light by day
      // (07-19 local time) and dark otherwise - before first paint.
      // Must match theme/composables/useTheme.js (and cloud-ui's index.html).
      (function () {
        var theme = null
        try { theme = localStorage.getItem('humi-theme') } catch (e) {}
        if (theme !== 'light' && theme !== 'dark') {
          var hour = new Date().getHours()
          theme = hour >= 7 && hour < 19 ? 'light' : 'dark'
        }
        document.documentElement.dataset.theme = theme
        document.documentElement.classList.toggle('dark', theme === 'dark')
      })()
    `],
  ],

  themeConfig: {
    // The Humi logo replaces the title text (see theme/Layout.vue).
    siteTitle: false,

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Appliance', link: '/appliance/introduction', activeMatch: '/appliance/' },
      { text: 'Cloud', link: '/cloud' },
      { text: 'Back to cloud', link: 'https://cloud.humi.kaese.space/', target: '_self' },
    ],

    // Cloud and Writing docs are single pages, so they have no sidebar.
    sidebar: {
      '/appliance/': [
        {
          text: 'Appliance',
          items: [
            { text: 'Introduction', link: '/appliance/introduction' },
            { text: 'Installation', link: '/appliance/installation' },
          ],
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/Kaese72/humi-docs/edit/master/docs/:path',
      text: 'Edit this page',
    },

    outline: 'deep',
  },
})
