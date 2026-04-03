import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'richText' },
    {
      name: 'qualifications',
      type: 'array',
      fields: [{ name: 'qualification', type: 'text' }],
    },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
  ],
}
