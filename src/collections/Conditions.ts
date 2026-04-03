import type { CollectionConfig } from 'payload'

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Developmental', value: 'developmental' },
        { label: 'Degenerative', value: 'degenerative' },
        { label: 'Orthopaedic', value: 'orthopaedic' },
        { label: 'Neurological', value: 'neurological' },
        { label: 'Cancer', value: 'cancer' },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'description', type: 'richText' },
    { name: 'symptoms', type: 'richText' },
    { name: 'treatments', type: 'richText' },
    {
      name: 'relatedModalities',
      type: 'relationship',
      relationTo: 'modalities',
      hasMany: true,
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
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
