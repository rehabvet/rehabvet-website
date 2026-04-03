import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'RehabVet' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'address', type: 'textarea' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'whatsapp', type: 'text' },
        { name: 'hours', type: 'textarea' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },
    { name: 'footerContent', type: 'richText' },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text', defaultValue: 'RehabVet — Veterinary Rehabilitation Singapore' },
        { name: 'defaultDescription', type: 'textarea', defaultValue: 'Singapore\'s leading veterinary rehabilitation clinic offering physiotherapy, hydrotherapy, acupuncture, and more for your pets.' },
        { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
