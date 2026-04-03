import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    staticDir: 'media',
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
