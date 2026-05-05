import type { PaletteItem } from '@/types/builder'

let counter = 0
const nextName = (kind: string) => `${kind}_${++counter}`

export const paletteItems: PaletteItem[] = [
  {
    kind: 'text',
    title: 'Text',
    icon: 'T',
    createDefaults: () => ({
      $formkit: 'text',
      name: nextName('text'),
      label: 'Text field',
      placeholder: 'Enter text',
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'email',
    title: 'Email',
    icon: '@',
    createDefaults: () => ({
      $formkit: 'email',
      name: nextName('email'),
      label: 'Email',
      placeholder: 'you@example.com',
      validation: [{ name: 'email' }],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'password',
    title: 'Password',
    icon: '*',
    createDefaults: () => ({
      $formkit: 'password',
      name: nextName('password'),
      label: 'Password',
      validation: [{ name: 'length', args: '6' }],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'number',
    title: 'Number',
    icon: '#',
    createDefaults: () => ({
      $formkit: 'number',
      name: nextName('number'),
      label: 'Number',
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'tel',
    title: 'Phone',
    icon: '☎',
    createDefaults: () => ({
      $formkit: 'tel',
      name: nextName('tel'),
      label: 'Phone',
      placeholder: '+1 555 000 0000',
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'url',
    title: 'URL',
    icon: '🔗',
    createDefaults: () => ({
      $formkit: 'url',
      name: nextName('url'),
      label: 'URL',
      placeholder: 'https://',
      validation: [{ name: 'url' }],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'textarea',
    title: 'Textarea',
    icon: '¶',
    createDefaults: () => ({
      $formkit: 'textarea',
      name: nextName('textarea'),
      label: 'Textarea',
      placeholder: 'Type here...',
      validation: [],
      validationVisibility: 'live',
      attrs: { rows: 3 },
    }),
  },
  {
    kind: 'select',
    title: 'Select',
    icon: '▼',
    createDefaults: () => ({
      $formkit: 'select',
      name: nextName('select'),
      label: 'Select',
      placeholder: '— choose —',
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ],
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'checkbox',
    title: 'Checkbox',
    icon: '☑',
    createDefaults: () => ({
      $formkit: 'checkbox',
      name: nextName('checkbox'),
      label: 'Checkbox',
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'radio',
    title: 'Radio',
    icon: '◉',
    createDefaults: () => ({
      $formkit: 'radio',
      name: nextName('radio'),
      label: 'Radio group',
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
      ],
      validation: [],
      validationVisibility: 'live',
    }),
  },
  {
    kind: 'date',
    title: 'Date',
    icon: '📅',
    createDefaults: () => ({
      $formkit: 'date',
      name: nextName('date'),
      label: 'Date',
      validation: [],
      validationVisibility: 'live',
    }),
  },
]
