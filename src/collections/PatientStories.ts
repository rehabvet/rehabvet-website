import type { CollectionConfig } from 'payload'

export const PatientStories: CollectionConfig = {
  slug: 'patient-stories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'patientName', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'patientName', type: 'text', required: true },
    { name: 'condition', type: 'text' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'story', type: 'richText' },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
  ],
}
