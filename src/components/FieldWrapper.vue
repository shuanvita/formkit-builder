<script setup lang="ts">
import { computed } from 'vue'
import { FormKit } from '@formkit/vue'
import type { FieldNode } from '@/types/builder'
import { useBuilderStore } from '@/stores/builder'
import { rulesToString } from '@/composables/useCompiledSchema'
import Icon from './Icon.vue'

const props = defineProps<{ node: FieldNode }>()
const store = useBuilderStore()

const isActive = computed(() => store.selectedId === props.node.$id)
const validation = computed(() => rulesToString(props.node))

function select(e: MouseEvent) {
  e.stopPropagation()
  store.select(props.node.$id)
}

function remove(e: MouseEvent) {
  e.stopPropagation()
  store.remove(props.node.$id)
}
</script>

<template>
  <div
    class="fw"
    :class="{ 'fw--active': isActive }"
    :data-id="node.$id"
    @click="select"
  >
    <!-- Прозрачный слой: перехватывает клики по инпуту в конструкторе -->
    <div class="fw__shield" />

    <FormKit
      :type="node.$formkit"
      :name="node.name"
      :label="node.label"
      :placeholder="node.placeholder"
      :help="node.help"
      :validation="validation || undefined"
      :validation-visibility="node.validationVisibility ?? 'live'"
      :options="node.options"
      v-bind="node.attrs"
    />

    <div class="fw__toolbar">
      <span class="fw__handle drag-handle" title="Drag to reorder">
        <Icon name="grip-vertical" :size="14" />
      </span>
      <button class="fw__btn" type="button" @click="remove" title="Delete">
        <Icon name="x" :size="14" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.fw {
  position: relative;
  padding: 10px 12px;
  border: 1px dashed transparent;
  border-radius: var(--radius-lg);
  transition: border-color 150ms, background 150ms;
}
.fw:hover {
  border-color: var(--color-border);
  background: color-mix(in srgb, var(--color-muted) 60%, transparent);
}
.fw--active {
  border-color: var(--color-primary) !important;
  background: var(--color-primary-soft) !important;
}
.fw__shield {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--radius-lg);
}
.fw__toolbar {
  position: absolute;
  top: 6px;
  right: 6px;
  display: none;
  gap: 4px;
  z-index: 3;
}
.fw:hover .fw__toolbar,
.fw--active .fw__toolbar {
  display: flex;
}
.fw__handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: grab;
  color: var(--color-muted-foreground);
  user-select: none;
}
.fw__handle:active {
  cursor: grabbing;
}
.fw__btn {
  width: 24px;
  height: 24px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-danger-hover);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fw__btn:hover {
  background: var(--color-danger);
  color: var(--color-danger-foreground);
  border-color: var(--color-danger);
}
</style>
