<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBuilderStore } from '@/stores/builder'
import { useCompiledSchema } from '@/composables/useCompiledSchema'

const store = useBuilderStore()
const { schema } = storeToRefs(store)
const compiled = useCompiledSchema(schema)

const mode = ref<'builder' | 'formkit'>('formkit')

const text = computed(() =>
  JSON.stringify(mode.value === 'builder' ? schema.value : compiled.value, null, 2),
)

const importText = ref('')
function doImport() {
  if (!importText.value.trim()) return
  store.loadFromJson(importText.value)
  importText.value = ''
}

async function copy() {
  await navigator.clipboard.writeText(text.value)
}
</script>

<template>
  <div class="io">
    <div class="io__tabs">
      <button
        :class="{ active: mode === 'formkit' }"
        @click="mode = 'formkit'"
      >
        FormKit Schema
      </button>
      <button
        :class="{ active: mode === 'builder' }"
        @click="mode = 'builder'"
      >
        Builder State
      </button>
      <button class="io__copy" @click="copy">Copy</button>
      <button class="io__clear" @click="store.clear">Clear</button>
    </div>
    <pre class="io__out">{{ text }}</pre>

    <details class="io__import">
      <summary>Import builder JSON</summary>
      <textarea v-model="importText" rows="4" placeholder="Paste builder JSON here..." />
      <button @click="doImport">Load</button>
    </details>
  </div>
</template>

<style scoped>
.io {
  padding: 12px 16px;
  background: #0f172a;
  color: #e2e8f0;
  border-top: 1px solid #1e293b;
  max-height: 35vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.io__tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.io__tabs button {
  padding: 4px 10px;
  background: #1e293b;
  color: #cbd5e1;
  border: 1px solid #334155;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.io__tabs button.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
.io__copy {
  margin-left: auto;
}
.io__clear {
  background: #7f1d1d !important;
  color: #fff !important;
  border-color: #991b1b !important;
}
.io__out {
  flex: 1;
  margin: 0;
  padding: 10px;
  background: #020617;
  border-radius: 6px;
  font-size: 11px;
  overflow: auto;
  color: #93c5fd;
}
.io__import {
  margin-top: 8px;
  font-size: 12px;
}
.io__import textarea {
  width: 100%;
  margin: 6px 0;
  padding: 6px;
  background: #020617;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
}
.io__import button {
  padding: 4px 10px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
