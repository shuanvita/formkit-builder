<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBuilderStore } from '@/stores/builder'
import { useCompiledSchema } from '@/composables/useCompiledSchema'
import Icon from './Icon.vue'

const store = useBuilderStore()
const { schema } = storeToRefs(store)
const compiled = useCompiledSchema(schema)

const mode = ref<'builder' | 'formkit'>('formkit')

const text = computed(() =>
  JSON.stringify(mode.value === 'builder' ? schema.value : compiled.value, null, 2),
)

const importOpen = ref(false)
const importText = ref('')
const copied = ref(false)

function doImport() {
  if (!importText.value.trim()) return
  store.loadFromJson(importText.value)
  importText.value = ''
  importOpen.value = false
}

async function copy() {
  await navigator.clipboard.writeText(text.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <section class="io" aria-label="Schema export">
    <div class="io__bar">
      <div class="io__tabs" role="tablist">
        <button
          class="io__tab"
          :class="{ 'is-active': mode === 'formkit' }"
          role="tab"
          :aria-selected="mode === 'formkit'"
          @click="mode = 'formkit'"
        >
          FormKit Schema
        </button>
        <button
          class="io__tab"
          :class="{ 'is-active': mode === 'builder' }"
          role="tab"
          :aria-selected="mode === 'builder'"
          @click="mode = 'builder'"
        >
          Builder State
        </button>
      </div>
      <div class="io__actions">
        <button class="io__btn" @click="copy">
          <Icon name="copy" :size="12" />
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
        <button class="io__btn io__btn--danger" @click="store.clear">
          <Icon name="trash" :size="12" />
          <span>Clear</span>
        </button>
      </div>
    </div>

    <pre class="io__out">{{ text || '[]' }}</pre>

    <button
      class="io__import-toggle"
      :aria-expanded="importOpen"
      @click="importOpen = !importOpen"
    >
      <Icon
        name="play"
        :size="10"
        class="io__caret"
        :class="{ 'io__caret--open': importOpen }"
      />
      <span>Import builder JSON</span>
    </button>

    <div v-if="importOpen" class="io__import-body">
      <textarea
        v-model="importText"
        rows="4"
        placeholder="Paste builder JSON here..."
      />
      <button class="io__btn io__btn--primary" @click="doImport">Load</button>
    </div>
  </section>
</template>

<style scoped>
.io {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-muted);
  color: var(--color-foreground);
  border-top: 1px solid var(--color-border);
  max-height: 40vh;
}
.io__bar {
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}
.io__tabs {
  display: flex;
  gap: 4px;
}
.io__tab {
  padding: 6px 16px;
  background: var(--color-muted);
  color: var(--color-muted-foreground);
  border: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  font-size: var(--text-xs);
  font-weight: 500;
  cursor: pointer;
  transition: color 150ms;
}
.io__tab:hover {
  color: var(--color-foreground);
}
.io__tab.is-active {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}
.io__actions {
  display: flex;
  gap: 8px;
}
.io__btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: var(--color-muted);
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms, border-color 150ms;
}
.io__btn:hover {
  background: var(--color-surface-3);
}
.io__btn--danger {
  background: var(--color-danger);
  color: var(--color-danger-foreground);
  border-color: var(--color-danger);
}
.io__btn--danger:hover {
  background: var(--color-danger-hover);
  border-color: var(--color-danger-hover);
}
.io__btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-color: var(--color-primary);
}
.io__out {
  flex: 1;
  margin: 0;
  padding: 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-muted-foreground);
  background: color-mix(in srgb, var(--color-muted) 50%, transparent);
  overflow: auto;
  white-space: pre;
  min-height: 80px;
}
.io__import-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-background);
  color: var(--color-muted-foreground);
  border: none;
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  cursor: pointer;
  text-align: left;
}
.io__import-toggle:hover {
  color: var(--color-foreground);
}
.io__caret {
  color: var(--color-primary);
  transition: transform 150ms;
}
.io__caret--open {
  transform: rotate(90deg);
}
.io__import-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 16px;
  background: var(--color-background);
  border-top: 1px solid var(--color-border-soft);
}
.io__import-body textarea {
  width: 100%;
  padding: 8px;
  background: var(--color-muted);
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: var(--text-xs);
  resize: vertical;
}
.io__import-body textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}
.io__import-body .io__btn--primary {
  align-self: flex-start;
  padding: 6px 14px;
}
</style>
