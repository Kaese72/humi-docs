<script setup>
import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BrandMark from './components/BrandMark.vue'

// useTheme.js (copied unchanged from cloud-ui) reads `document` as soon as
// it is imported, which the server-side render can't do. Load the toggle -
// and with it useTheme - only in the browser.
const ThemeToggle = defineAsyncComponent(() => import('./components/ThemeToggle.vue'))
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-before>
      <BrandMark />
      <span class="docs-tag">Docs</span>
    </template>
    <template #nav-bar-content-after>
      <ClientOnly>
        <ThemeToggle class="docs-theme-toggle" />
      </ClientOnly>
    </template>
  </DefaultTheme.Layout>
</template>
