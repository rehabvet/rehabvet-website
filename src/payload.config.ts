import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Modalities } from './collections/Modalities'
import { Conditions } from './collections/Conditions'
import { BlogPosts } from './collections/BlogPosts'
import { PatientStories } from './collections/PatientStories'
import { TeamMembers } from './collections/TeamMembers'
import { FAQs } from './collections/FAQs'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Modalities, Conditions, BlogPosts, PatientStories, TeamMembers, FAQs],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/rehabvet_website',
    },
  }),
  sharp,
})
