import { computed, type Ref } from 'vue'
import type { FormKitSchemaNode } from '@formkit/core'
import type { BuilderSchema, FieldNode } from '@/types/builder'

export function rulesToString(node: FieldNode): string {
  return (node.validation ?? [])
    .filter((r) => r.name)
    .map((r) => (r.args ? `${r.name}:${r.args}` : r.name))
    .join('|')
}

function compileField(node: FieldNode): FormKitSchemaNode {
  const messages: Record<string, string> = {}
  for (const rule of node.validation ?? []) {
    if (rule.message) messages[rule.name] = rule.message
  }

  return {
    $formkit: node.$formkit,
    name: node.name,
    label: node.label,
    placeholder: node.placeholder,
    help: node.help,
    value: node.value,
    options: node.options,
    validation: rulesToString(node) || undefined,
    validationVisibility: node.validationVisibility ?? 'live',
    validationMessages: Object.keys(messages).length ? messages : undefined,
    ...(node.attrs ?? {}),
  } as FormKitSchemaNode
}

export function useCompiledSchema(schema: Ref<BuilderSchema>) {
  return computed<FormKitSchemaNode[]>(() =>
    schema.value.fields.map((f) => compileField(f)),
  )
}
