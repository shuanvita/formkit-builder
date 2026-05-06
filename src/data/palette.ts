import type { PaletteItem } from '@/types/builder'

let counter = 0
const nextName = (kind: string) => `${kind}_${++counter}`

export const paletteItems: PaletteItem[] = [
  {
    kind: 'text',
    title: 'Text',
    icon: 'type',
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
    icon: 'at-sign',
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
    icon: 'asterisk',
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
    icon: 'hash',
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
    icon: 'phone',
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
    icon: 'link',
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
    icon: 'align-left',
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
    icon: 'chevron-down',
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
    icon: 'check-square',
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
    icon: 'circle-dot',
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
    icon: 'calendar',
    createDefaults: () => ({
      $formkit: 'date',
      name: nextName('date'),
      label: 'Date',
      validation: [],
      validationVisibility: 'live',
    }),
  },
]
