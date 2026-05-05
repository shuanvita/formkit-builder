<script setup lang="ts">
import draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { paletteItems } from '@/data/palette'
import type { FieldNode, PaletteItem } from '@/types/builder'

// vuedraggable требует v-model для отображения списка.
// Нам не нужна его мутация, но реактивную ссылку всё равно передаём.
const items = paletteItems

function cloneAsField(item: PaletteItem): FieldNode {
  return { ...item.createDefaults(), $id: nanoid(8) }
}
</script>

<template>
  <aside class="palette">
    <h3 class="palette__title">Fields</h3>
    <draggable
      :list="items"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      :clone="cloneAsField"
      item-key="kind"
      class="palette__list"
    >
      <template #item="{ element }">
        <div class="palette__item" :title="element.title">
          <span class="palette__icon">{{ element.icon }}</span>
          <span>{{ element.title }}</span>
        </div>
      </template>
    </draggable>
  </aside>
</template>

<style scoped>
.palette {
  width: 220px;
  padding: 16px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
}
.palette__title {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}
.palette__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.palette__item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: grab;
  font-size: 13px;
  user-select: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.palette__item:hover {
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.15);
}
.palette__item:active {
  cursor: grabbing;
}
.palette__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: #eff6ff;
  border-radius: 4px;
  font-weight: 600;
  color: #2563eb;
  font-size: 12px;
}
</style>
