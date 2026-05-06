<script setup lang="ts">
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/builder'
import type { FieldNode, FieldOption, ValidationRule } from '@/types/builder'

const store = useBuilderStore()

const field = computed(() => store.selectedField)

const kindsWithOptions = new Set(['select', 'radio'])

function patch<K extends keyof FieldNode>(key: K, value: FieldNode[K]) {
  if (!field.value) return
  store.update(field.value.$id, { [key]: value } as Partial<FieldNode>)
}

function addOption() {
  if (!field.value) return
  const opts = [...(field.value.options ?? [])]
  opts.push({ label: `Option ${opts.length + 1}`, value: `opt_${opts.length + 1}` })
  store.update(field.value.$id, { options: opts })
}

function updateOption(idx: number, key: keyof FieldOption, value: string) {
  if (!field.value) return
  const opts = [...(field.value.options ?? [])]
  const cur = opts[idx]
  if (!cur) return
  opts[idx] = { ...cur, [key]: value }
  store.update(field.value.$id, { options: opts })
}

function removeOption(idx: number) {
  if (!field.value) return
  const opts = [...(field.value.options ?? [])]
  opts.splice(idx, 1)
  store.update(field.value.$id, { options: opts })
}

function addRule() {
  if (!field.value) return
  const rules = [...(field.value.validation ?? [])]
  rules.push({ name: 'required' })
  store.update(field.value.$id, { validation: rules })
}

function updateRule(idx: number, key: keyof ValidationRule, value: string) {
  if (!field.value) return
  const rules = [...(field.value.validation ?? [])]
  const cur = rules[idx]
  if (!cur) return
  rules[idx] = { ...cur, [key]: value }
  store.update(field.value.$id, { validation: rules })
}

function removeRule(idx: number) {
  if (!field.value) return
  const rules = [...(field.value.validation ?? [])]
  rules.splice(idx, 1)
  store.update(field.value.$id, { validation: rules })
}

const availableRules = [
  'required',
  'email',
  'url',
  'number',
  'length',
  'min',
  'max',
  'matches',
  'alpha',
  'alphanumeric',
]
</script>

<template>
  <aside class="props" aria-label="Properties">
    <div class="props__title">Properties</div>

    <div v-if="!field" class="props__empty-wrap">
      <div class="props__empty">
        Select a field on the canvas to edit its properties.
      </div>
    </div>

    <div v-else class="props__body">
      <div class="props__row">
        <label>Type</label>
        <input :value="field.$formkit" disabled />
      </div>

      <div class="props__row">
        <label>Name</label>
        <input
          :value="field.name"
          @input="patch('name', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="props__row">
        <label>Label</label>
        <input
          :value="field.label ?? ''"
          @input="patch('label', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="props__row">
        <label>Placeholder</label>
        <input
          :value="field.placeholder ?? ''"
          @input="patch('placeholder', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="props__row">
        <label>Help text</label>
        <input
          :value="field.help ?? ''"
          @input="patch('help', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="props__row">
        <label>Validation visibility</label>
        <select
          :value="field.validationVisibility ?? 'live'"
          @change="patch('validationVisibility', ($event.target as HTMLSelectElement).value as FieldNode['validationVisibility'])"
        >
          <option value="live">live</option>
          <option value="blur">blur</option>
          <option value="dirty">dirty</option>
          <option value="submit">submit</option>
        </select>
      </div>

      <!-- Options for select/radio -->
      <div v-if="kindsWithOptions.has(field.$formkit)" class="props__section">
        <div class="props__section-header">
          <h4>Options</h4>
          <button class="props__add" @click="addOption">+ Add</button>
        </div>
        <div
          v-for="(opt, idx) in field.options ?? []"
          :key="idx"
          class="props__option"
        >
          <input
            placeholder="Label"
            :value="opt.label"
            @input="updateOption(idx, 'label', ($event.target as HTMLInputElement).value)"
          />
          <input
            placeholder="Value"
            :value="opt.value"
            @input="updateOption(idx, 'value', ($event.target as HTMLInputElement).value)"
          />
          <button class="props__remove" @click="removeOption(idx)">✕</button>
        </div>
      </div>

      <!-- Validation rules -->
      <div class="props__section">
        <div class="props__section-header">
          <h4>Validation rules</h4>
          <button class="props__add" @click="addRule">+ Add</button>
        </div>
        <div
          v-for="(rule, idx) in field.validation ?? []"
          :key="idx"
          class="props__rule"
        >
          <select
            :value="rule.name"
            @change="updateRule(idx, 'name', ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="r in availableRules" :key="r" :value="r">{{ r }}</option>
          </select>
          <input
            placeholder="args (e.g. 3 or 3,10)"
            :value="rule.args ?? ''"
            @input="updateRule(idx, 'args', ($event.target as HTMLInputElement).value)"
          />
          <button class="props__remove" @click="removeRule(idx)">✕</button>
          <input
            class="props__rule-message"
            placeholder="Custom message (optional)"
            :value="rule.message ?? ''"
            @input="updateRule(idx, 'message', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.props {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-muted);
  border-left: 1px solid var(--color-border);
}
.props__title {
  padding: 16px;
  border-bottom: 1px solid var(--color-border-soft);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted-foreground);
  background: color-mix(in srgb, var(--color-background) 50%, transparent);
}
.props__empty-wrap {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 32px 16px 16px;
}
.props__empty {
  width: 100%;
  padding: 24px;
  text-align: center;
  background: var(--color-background);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
}
.props__body {
  padding: 16px;
  overflow-y: auto;
}
.props__row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}
.props__row label {
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.props__row input,
.props__row select,
.props__option input,
.props__rule input,
.props__rule select {
  padding: 6px 8px;
  font-size: var(--text-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-background);
  color: var(--color-foreground);
  min-width: 0;
}
.props__row input:focus,
.props__row select:focus,
.props__option input:focus,
.props__rule input:focus,
.props__rule select:focus {
  outline: none;
  border-color: var(--color-primary);
}
.props__row input:disabled {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
}
.props__section {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border-soft);
}
.props__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.props__section-header h4 {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  font-weight: 600;
}
.props__add {
  font-size: var(--text-xs);
  padding: 4px 10px;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 500;
}
.props__add:hover {
  filter: brightness(1.05);
}
.props__option,
.props__rule {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 4px;
  margin-bottom: 6px;
}
.props__rule {
  grid-template-columns: 1fr 1fr auto;
  grid-template-rows: auto auto;
}
.props__rule-message {
  grid-column: 1 / -1;
}
.props__remove {
  width: 28px;
  background: var(--color-background);
  color: var(--color-danger-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--text-xs);
}
.props__remove:hover {
  background: var(--color-danger);
  color: var(--color-danger-foreground);
  border-color: var(--color-danger);
}

@media (max-width: 1024px) {
  .props {
    width: 100%;
    height: auto;
  }
}
</style>
