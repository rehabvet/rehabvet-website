import type { CollectionConfig } from 'payload'

export const Modalities: CollectionConfig = {
  slug: 'modalities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'description', type: 'richText' },
    { name: 'howItWorks', type: 'richText' },
    {
      name: 'conditionsTreated',
      type: 'relationship',
      relationTo: 'conditions',
      hasMany: true,
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
