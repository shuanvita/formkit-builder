import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'
import type { BuilderSchema, FieldNode } from '@/types/builder'

export const useBuilderStore = defineStore('builder', () => {
  const schema = ref<BuilderSchema>({
    id: 'form_' + nanoid(6),
    title: 'My form',
    fields: [],
  })

  const selectedId = ref<string | null>(null)

  const selectedField = computed<FieldNode | null>(() => {
    if (!selectedId.value) return null
    return schema.value.fields.find((f) => f.$id === selectedId.value) ?? null
  })

  function select(id: string | null) {
    selectedId.value = id
  }

  function remove(id: string) {
    const idx = schema.value.fields.findIndex((f) => f.$id === id)
    if (idx !== -1) schema.value.fields.splice(idx, 1)
    if (selectedId.value === id) selectedId.value = null
  }

  function update(id: string, patch: Partial<FieldNode>) {
    const field = schema.value.fields.find((f) => f.$id === id)
    if (!field) return
    Object.assign(field, patch)
  }

  function clear() {
    schema.value.fields = []
    selectedId.value = null
  }

  function loadFromJson(json: string) {
    try {
      const parsed = JSON.parse(json) as BuilderSchema
      if (parsed && Array.isArray(parsed.fields)) {
        schema.value = parsed
        selectedId.value = null
      }
    } catch (e) {
      console.error('Invalid JSON', e)
    }
  }

  return {
    schema,
    selectedId,
    selectedField,
    select,
    remove,
    update,
    clear,
    loadFromJson,
  }
})
