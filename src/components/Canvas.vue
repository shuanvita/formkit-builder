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
      <span class="canvas__title">Canvas</span>
      <span class="canvas__counter">{{ store.schema.fields.length }} field(s)</span>
    </header>

    <div class="canvas__body">
      <draggable
        :model-value="fields.get()"
        @update:model-value="fields.set($event)"
        :group="{ name: 'form', pull: false, put: true }"
        item-key="$id"
        handle=".drag-handle"
        ghost-class="canvas__ghost"
        animation="160"
        class="canvas__list"
        :class="{ 'canvas__list--empty': !store.schema.fields.length }"
        @add="onAdd"
      >
        <template #item="{ element }">
          <FieldWrapper :node="element" />
        </template>
      </draggable>

      <p v-if="!store.schema.fields.length" class="canvas__empty">
        Drag fields
        <span class="canvas__empty-chip">here</span>
        from the left panel
      </p>
    </div>
  </section>
</template>

<style scoped>
.canvas {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--color-background);
}
.canvas__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-soft);
  background: var(--color-background);
}
.canvas__title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-foreground);
}
.canvas__counter {
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
}
.canvas__body {
  flex: 1;
  position: relative;
  padding: 16px;
  overflow-y: auto;
  background: var(--color-background);
}
.canvas__list {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-muted) 20%, transparent);
}
.canvas__list--empty {
  align-items: center;
  justify-content: center;
}
.canvas__ghost {
  opacity: 0.6;
  background: var(--color-primary-soft);
  border: 1px dashed var(--color-primary) !important;
}
.canvas__empty {
  position: absolute;
  inset: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  pointer-events: none;
}
.canvas__empty-chip {
  background: var(--color-muted);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  padding: 0 4px;
  border-radius: var(--radius-sm);
}
</style>
