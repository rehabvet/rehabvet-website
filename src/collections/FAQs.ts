import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Services', value: 'services' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Appointments', value: 'appointments' },
        { label: 'Conditions', value: 'conditions' },
      ],
    },
  ],
}
