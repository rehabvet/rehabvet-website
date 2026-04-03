import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'date', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'author', type: 'text' },
    { name: 'date', type: 'date', required: true, admin: { position: 'sidebar' } },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Pet Rehabilitation', value: 'pet-rehabilitation' },
        { label: 'Animal Physiotherapy', value: 'animal-physiotherapy' },
        { label: 'Hydrotherapy', value: 'hydrotherapy' },
        { label: 'Acupuncture', value: 'acupuncture' },
        { label: 'Cost & Pricing', value: 'cost-pricing' },
        { label: 'Diet & Weight', value: 'diet-weight' },
        { label: 'Luxating Patella', value: 'luxating-patella' },
        { label: 'Neurology', value: 'neurology' },
        { label: 'TCVM', value: 'tcvm' },
        { label: 'General', value: 'general' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
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
