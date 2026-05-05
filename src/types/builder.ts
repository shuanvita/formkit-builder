import type { FormKitSchemaNode } from '@formkit/core'

export type FieldKind =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'

export interface FieldOption {
  label: string
  value: string
}

export interface ValidationRule {
  name: string
  args?: string
  message?: string
}

export interface FieldNode {
  $id: string
  $formkit: FieldKind
  name: string
  label?: string
  placeholder?: string
  help?: string
  value?: unknown
  options?: FieldOption[]
  validation?: ValidationRule[]
  validationVisibility?: 'blur' | 'live' | 'dirty' | 'submit'
  attrs?: Record<string, unknown>
}

export interface BuilderSchema {
  id: string
  title: string
  fields: FieldNode[]
}

export interface PaletteItem {
  kind: FieldKind
  title: string
  icon: string
  createDefaults: () => Omit<FieldNode, '$id'>
}

export type CompiledSchema = FormKitSchemaNode[]
