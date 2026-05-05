<script setup lang="ts">
import { computed } from 'vue'
import { FormKit } from '@formkit/vue'
import type { FieldNode } from '@/types/builder'
import { useBuilderStore } from '@/stores/builder'
import { rulesToString } from '@/composables/useCompiledSchema'

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
      <span class="fw__handle drag-handle" title="Drag to reorder">⋮⋮</span>
      <button class="fw__btn" @click="remove" title="Delete">✕</button>
    </div>
  </div>
</template>

<style scoped>
.fw {
  position: relative;
  padding: 10px 12px;
  border: 1px dashed transparent;
  border-radius: 8px;
  transition: border-color 0.15s, background 0.15s;
}
.fw:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}
.fw--active {
  border-color: #3b82f6 !important;
  background: #eff6ff !important;
}
.fw__shield {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: 8px;
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
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  cursor: grab;
  color: #64748b;
  font-size: 12px;
  user-select: none;
}
.fw__handle:active {
  cursor: grabbing;
}
.fw__btn {
  width: 24px;
  height: 24px;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  color: #dc2626;
  cursor: pointer;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fw__btn:hover {
  background: #fee2e2;
  border-color: #dc2626;
}
</style>
