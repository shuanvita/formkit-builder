<script setup lang="ts">
import draggable from 'vuedraggable'
import FieldWrapper from './FieldWrapper.vue'
import { useBuilderStore } from '@/stores/builder'
import type { FieldNode } from '@/types/builder'

const store = useBuilderStore()

function onAdd(e: { newIndex?: number }) {
  if (e.newIndex == null) return
  const node = store.schema.fields[e.newIndex]
  if (node) store.select(node.$id)
}

function deselect() {
  store.select(null)
}

// Прокси для v-model (Pinia ref -> draggable)
const fields = {
  get: () => store.schema.fields,
  set: (v: FieldNode[]) => {
    store.schema.fields = v
  },
}
</script>

<template>
  <section class="canvas" @click="deselect">
    <header class="canvas__header">
      <h3>Canvas</h3>
      <span class="canvas__counter">{{ store.schema.fields.length }} field(s)</span>
    </header>

    <draggable
      :model-value="fields.get()"
      @update:model-value="fields.set($event)"
      :group="{ name: 'form', pull: false, put: true }"
      item-key="$id"
      handle=".drag-handle"
      ghost-class="canvas__ghost"
      animation="160"
      class="canvas__list"
      @add="onAdd"
    >
      <template #item="{ element }">
        <FieldWrapper :node="element" />
      </template>
    </draggable>

    <p v-if="!store.schema.fields.length" class="canvas__empty">
      Drag fields here from the left panel
    </p>
  </section>
</template>

<style scoped>
.canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  overflow-y: auto;
  background: #fff;
}
.canvas__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}
.canvas__header h3 {
  margin: 0;
  font-size: 14px;
  color: #334155;
}
.canvas__counter {
  font-size: 12px;
  color: #94a3b8;
}
.canvas__list {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  border: 2px dashed #e2e8f0;
  border-radius: 10px;
  background: #fafafa;
}
.canvas__ghost {
  opacity: 0.5;
  background: #dbeafe;
  border: 2px dashed #3b82f6 !important;
}
.canvas__empty {
  margin: 12px 0 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  pointer-events: none;
}
</style>
