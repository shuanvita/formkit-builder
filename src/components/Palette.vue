<script setup lang="ts">
import draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
import { paletteItems } from '@/data/palette'
import type { FieldNode, PaletteItem } from '@/types/builder'
import Icon from './Icon.vue'

const items = paletteItems

function cloneAsField(item: PaletteItem): FieldNode {
  return { ...item.createDefaults(), $id: nanoid(8) }
}
</script>

<template>
  <aside class="palette" aria-label="Field palette">
    <div class="palette__title">Fields</div>
    <div class="palette__body">
      <draggable
        :list="items"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneAsField"
        item-key="kind"
        class="palette__grid"
      >
        <template #item="{ element }">
          <button class="palette__item" :title="element.title" type="button">
            <span class="palette__icon">
              <Icon :name="element.icon" :size="14" />
            </span>
            <span class="palette__label">{{ element.title }}</span>
          </button>
        </template>
      </draggable>
    </div>
  </aside>
</template>

<style scoped>
.palette {
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-muted);
  border-right: 1px solid var(--color-border);
}
.palette__title {
  padding: 16px;
  border-bottom: 1px solid var(--color-border-soft);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted-foreground);
  background: color-mix(in srgb, var(--color-background) 50%, transparent);
}
.palette__body {
  padding: 16px;
  overflow-y: auto;
}
.palette__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.palette__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-foreground);
  cursor: grab;
  user-select: none;
  transition: border-color 150ms, box-shadow 150ms;
  text-align: left;
}
.palette__item:hover {
  border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
}
.palette__item:active {
  cursor: grabbing;
}
.palette__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--color-muted);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  flex-shrink: 0;
}
.palette__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .palette {
    width: 100%;
    height: auto;
  }
}
</style>
