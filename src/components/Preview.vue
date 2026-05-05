<script setup lang="ts">
import { ref } from 'vue'
import { FormKitSchema } from '@formkit/vue'
import { storeToRefs } from 'pinia'
import { useBuilderStore } from '@/stores/builder'
import { useCompiledSchema } from '@/composables/useCompiledSchema'

const store = useBuilderStore()
const { schema } = storeToRefs(store)
const compiled = useCompiledSchema(schema)

const submittedPayload = ref<string | null>(null)

async function onSubmit(data: Record<string, unknown>) {
  submittedPayload.value = JSON.stringify(data, null, 2)
}
</script>

<template>
  <div class="preview">
    <h3 class="preview__title">Live preview</h3>

    <div v-if="!schema.fields.length" class="preview__empty">
      Add fields to see the live form.
    </div>

    <div v-else class="preview__form">
      <FormKit type="form" @submit="onSubmit" :actions="true" submit-label="Submit">
        <FormKitSchema :schema="compiled" />
      </FormKit>
    </div>

    <div v-if="submittedPayload" class="preview__payload">
      <strong>Submitted:</strong>
      <pre>{{ submittedPayload }}</pre>
    </div>
  </div>
</template>

<style scoped>
.preview {
  padding: 16px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  max-height: 45vh;
  overflow-y: auto;
}
.preview__title {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}
.preview__empty {
  padding: 16px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  background: #f8fafc;
  border-radius: 8px;
}
.preview__form {
  max-width: 500px;
}
.preview__payload {
  margin-top: 12px;
  padding: 10px 12px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 6px;
  font-size: 12px;
}
.preview__payload pre {
  margin: 6px 0 0;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
