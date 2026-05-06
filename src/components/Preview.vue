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
  <section class="preview" aria-label="Live preview">
    <div class="preview__title">Live Preview</div>
    <div class="preview__body">
      <div
        v-if="!schema.fields.length"
        class="preview__empty"
      >
        <span class="preview__empty-text">Add fields to see the live form.</span>
      </div>

      <div v-else class="preview__form">
        <FormKit type="form" @submit="onSubmit" :actions="true" submit-label="Submit">
          <FormKitSchema :schema="compiled" />
        </FormKit>

        <div v-if="submittedPayload" class="preview__payload">
          <strong>Submitted:</strong>
          <pre>{{ submittedPayload }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.preview {
  height: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
}
.preview__title {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border-soft);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted-foreground);
  background: color-mix(in srgb, var(--color-muted) 30%, transparent);
}
.preview__body {
  flex: 1;
  padding: 16px;
  overflow: auto;
  background: color-mix(in srgb, var(--color-muted) 10%, transparent);
}
.preview__empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--color-muted) 30%, transparent);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
}
.preview__empty-text {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
}
.preview__form {
  max-width: 560px;
  margin: 0 auto;
}
.preview__payload {
  margin-top: 12px;
  padding: 10px 12px;
  background: var(--color-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  color: var(--color-foreground);
}
.preview__payload pre {
  margin: 6px 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
