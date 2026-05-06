<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Palette from '@/components/Palette.vue'
import Canvas from '@/components/Canvas.vue'
import PropertiesPanel from '@/components/PropertiesPanel.vue'
import Preview from '@/components/Preview.vue'
import SchemaIO from '@/components/SchemaIO.vue'
import Icon from '@/components/Icon.vue'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'formkit-builder.theme'
const theme = ref<Theme>('dark')

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t)
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved === 'dark' || saved === 'light') theme.value = saved
  applyTheme(theme.value)
})

watch(theme, (t) => {
  applyTheme(t)
  localStorage.setItem(STORAGE_KEY, t)
})
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="topbar__left">
        <div class="brand">
          <div class="brand__logo">
            <Icon name="layout-template" :size="18" />
          </div>
          <span class="brand__name">FormKit Builder</span>
        </div>
        <div class="topbar__divider" />
        <nav class="crumbs" aria-label="Workflow">
          <span class="crumbs__chip">Drag fields</span>
          <Icon name="chevron-right" :size="14" class="crumbs__sep" />
          <span class="crumbs__step">configure</span>
          <Icon name="chevron-right" :size="14" class="crumbs__sep" />
          <span class="crumbs__step">preview</span>
          <Icon name="chevron-right" :size="14" class="crumbs__sep" />
          <span class="crumbs__step">export</span>
        </nav>
      </div>

      <div class="topbar__right">
        <a
          class="link"
          href="https://formkit.com/essentials/schema"
          target="_blank"
          rel="noopener"
        >
          <Icon name="book-open" :size="16" />
          <span>Integration Guide</span>
        </a>

        <div class="theme-toggle" role="group" aria-label="Theme">
          <button
            class="theme-toggle__btn"
            :class="{ 'is-active': theme === 'dark' }"
            aria-label="Dark theme"
            @click="theme = 'dark'"
          >
            <Icon name="moon" :size="14" />
          </button>
          <button
            class="theme-toggle__btn"
            :class="{ 'is-active': theme === 'light' }"
            aria-label="Light theme"
            @click="theme = 'light'"
          >
            <Icon name="sun" :size="14" />
          </button>
        </div>

        <div class="topbar__divider topbar__divider--tall" />

        <button class="avatar" aria-label="Account">
          <Icon name="user" :size="16" />
        </button>
      </div>
    </header>

    <main class="body">
      <Palette />
      <div class="center">
        <Canvas />
        <Preview />
      </div>
      <PropertiesPanel />
    </main>

    <SchemaIO />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
  background: var(--color-background);
  color: var(--color-foreground);
}

/* Top bar */
.topbar {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.topbar__divider {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}
.topbar__divider--tall {
  height: 24px;
  margin: 0 4px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand__logo {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}
.brand__name {
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-foreground);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
}
.crumbs__chip {
  background: var(--color-muted);
  color: var(--color-foreground);
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-weight: 500;
}
.crumbs__step {
  cursor: default;
  transition: color 150ms;
}
.crumbs__step:hover {
  color: var(--color-foreground);
}
.crumbs__sep {
  color: var(--color-muted-foreground);
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  text-decoration: none;
  transition: color 150ms;
  margin-right: 4px;
}
.link:hover {
  color: var(--color-foreground);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  background: var(--color-muted);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: 2px;
}
.theme-toggle__btn {
  padding: 6px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-muted-foreground);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 150ms, background 150ms, border-color 150ms;
}
.theme-toggle__btn:hover {
  color: var(--color-foreground);
}
.theme-toggle__btn.is-active {
  background: var(--color-background);
  color: var(--color-foreground);
  border-color: var(--color-border-soft);
  box-shadow: var(--shadow-sm);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: var(--color-muted);
  border: 1px solid var(--color-border);
  color: var(--color-muted-foreground);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 150ms;
}
.avatar:hover {
  box-shadow: 0 0 0 2px var(--color-primary-soft);
}

/* Body layout */
.body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}
.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--color-background);
}

/* Responsive: stack panels under ~1024px */
@media (max-width: 1024px) {
  .crumbs {
    display: none;
  }
  .body {
    flex-direction: column;
    overflow: auto;
  }
}
</style>
