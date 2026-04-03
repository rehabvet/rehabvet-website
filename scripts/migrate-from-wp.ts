#!/usr/bin/env tsx
/**
 * WordPress → Payload CMS migration script
 * Usage:
 *   npm run migrate              # full migration
 *   npm run migrate -- --dry-run # preview only
 */

import pg from 'pg'

const { Client } = pg

const WP_BASE = 'https://rehabvet.com/wp-json/wp/v2'
const WP_AUTH = 'Basic YWRtaW46NFQ5QSBKc2ZVIGNaeW4gR2FRbyA4RG50IEhqSGs='
const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:TMCDumfJyHmbmgAilkbGAVqOYxULGqCy@ballast.proxy.rlwy.net:32989/railway'

const DRY_RUN = process.argv.includes('--dry-run')

// ─── Helpers ────────────────────────────────────────────────────────────────

async function wpFetch<T>(path: string): Promise<T[]> {
  const all: T[] = []
  let page = 1
  while (true) {
    const url = `${WP_BASE}${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`
    const res = await fetch(url, { headers: { Authorization: WP_AUTH } })
    if (!res.ok) break
    const data = (await res.json()) as T[]
    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)
    const total = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)
    if (page >= total) break
    page++
  }
  return all
}

function toLexical(html: string): object {
  // Strip HTML tags for plain text storage in Lexical
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 5000)
  return {
    root: {
      children: [
        {
          children: [
            { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200)
}

const SERVICE_KEYWORDS =
  /physio|hydro|acupuncture|rehab|laser|massage|ultrasound|therapy|modali|condition|treatment/i

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🐾 rehabvet.com → Payload CMS migration ${DRY_RUN ? '[DRY RUN]' : '[LIVE]'}\n`)

  // DB connection
  const client = new Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('✅ Connected to Railway PostgreSQL\n')

  // Discover tables
  const { rows: tables } = await client.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`,
  )
  console.log('📋 Tables found:')
  tables.forEach((t) => console.log(`   • ${t.table_name}`))
  console.log()

  const tableNames = tables.map((t) => t.table_name)

  // ── Blog Posts ─────────────────────────────────────────────────────────────
  const blogTable = tableNames.find((t) => t.includes('blog') || t === 'posts')
  console.log(`📝 Blog posts table: ${blogTable || 'NOT FOUND'}`)

  const wpPosts = await wpFetch<any>('/posts?status=publish')
  console.log(`   WP posts fetched: ${wpPosts.length}`)

  if (blogTable && !DRY_RUN) {
    // Get columns
    const { rows: cols } = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'`,
      [blogTable],
    )
    const colNames = cols.map((c: any) => c.column_name)
    console.log(`   Columns: ${colNames.join(', ')}`)

    let inserted = 0
    for (const post of wpPosts) {
      const slug = post.slug || toSlug(post.title?.rendered || `post-${post.id}`)
      const title = post.title?.rendered?.replace(/<[^>]+>/g, '') || ''
      const content = JSON.stringify(toLexical(post.content?.rendered || ''))
      const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 500) || ''
      const publishedAt = post.date ? new Date(post.date) : new Date()

      try {
        // Build insert dynamically based on available columns
        const fields: string[] = []
        const values: any[] = []
        const placeholders: string[] = []

        const add = (col: string, val: any) => {
          if (colNames.includes(col)) {
            fields.push(col)
            values.push(val)
            placeholders.push(`$${values.length}`)
          }
        }

        add('slug', slug)
        add('title', title)
        add('content', content)
        add('excerpt', excerpt)
        add('published_at', publishedAt)
        add('_status', 'published')
        add('created_at', new Date())
        add('updated_at', new Date())

        if (fields.length > 0) {
          await client.query(
            `INSERT INTO ${blogTable} (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) ON CONFLICT (slug) DO NOTHING`,
            values,
          )
          inserted++
        }
      } catch (err: any) {
        console.warn(`   ⚠️  Skipped post "${title}": ${err.message}`)
      }
    }
    console.log(`   ✅ Inserted ${inserted} blog posts\n`)
  } else if (DRY_RUN) {
    console.log(`   → Would insert ${wpPosts.length} blog posts\n`)
  }

  // ── Services / Pages ───────────────────────────────────────────────────────
  const servicesTable = tableNames.find((t) => t === 'services')
  console.log(`🏥 Services table: ${servicesTable || 'NOT FOUND'}`)

  const wpPages = await wpFetch<any>('/pages?status=publish')
  const servicePages = wpPages.filter(
    (p: any) =>
      SERVICE_KEYWORDS.test(p.slug || '') ||
      SERVICE_KEYWORDS.test(p.title?.rendered || '') ||
      SERVICE_KEYWORDS.test(p.link || ''),
  )
  console.log(`   WP pages fetched: ${wpPages.length}, matched as services: ${servicePages.length}`)

  if (servicesTable && !DRY_RUN && servicePages.length > 0) {
    const { rows: cols } = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'`,
      [servicesTable],
    )
    const colNames = cols.map((c: any) => c.column_name)
    console.log(`   Columns: ${colNames.join(', ')}`)

    let inserted = 0
    for (const page of servicePages) {
      const slug = page.slug || toSlug(page.title?.rendered || `service-${page.id}`)
      const title = page.title?.rendered?.replace(/<[^>]+>/g, '') || ''
      const content = JSON.stringify(toLexical(page.content?.rendered || ''))

      try {
        const fields: string[] = []
        const values: any[] = []
        const placeholders: string[] = []

        const add = (col: string, val: any) => {
          if (colNames.includes(col)) {
            fields.push(col)
            values.push(val)
            placeholders.push(`$${values.length}`)
          }
        }

        add('slug', slug)
        add('title', title)
        add('description', content)
        add('content', content)
        add('_status', 'published')
        add('created_at', new Date())
        add('updated_at', new Date())

        if (fields.length > 0) {
          await client.query(
            `INSERT INTO ${servicesTable} (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) ON CONFLICT (slug) DO NOTHING`,
            values,
          )
          inserted++
        }
      } catch (err: any) {
        console.warn(`   ⚠️  Skipped page "${title}": ${err.message}`)
      }
    }
    console.log(`   ✅ Inserted ${inserted} service pages\n`)
  } else if (DRY_RUN) {
    console.log(`   → Would insert ${servicePages.length} service pages\n`)
  }

  // ── Categories ─────────────────────────────────────────────────────────────
  const wpCats = await wpFetch<any>('/categories')
  console.log(`🏷️  WP categories: ${wpCats.length}`)
  if (DRY_RUN) console.log(`   → Skipping category import (manual mapping needed)\n`)

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('\n─────────────────────────────────────')
  console.log('📊 Migration summary:')
  console.log(`   Blog posts : ${wpPosts.length}`)
  console.log(`   Service pages : ${servicePages.length}`)
  console.log(`   Other pages : ${wpPages.length - servicePages.length}`)
  console.log(`   Categories : ${wpCats.length}`)
  if (DRY_RUN) console.log('\n   [DRY RUN — nothing was written to the database]')
  else console.log('\n   ✅ Migration complete!')
  console.log('─────────────────────────────────────\n')

  await client.end()
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
