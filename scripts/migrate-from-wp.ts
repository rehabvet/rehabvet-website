#!/usr/bin/env tsx
/**
 * WordPress → Payload CMS migration script (REST API version)
 * Usage:
 *   npm run migrate              # full migration
 *   npm run migrate -- --dry-run # preview only
 */

import { parse, HTMLElement as NHTMLElement } from 'node-html-parser'

const WP_BASE = 'https://rehabvet.com/wp-json/wp/v2'
const WP_AUTH = 'Basic YWRtaW46NFQ5QSBKc2ZVIGNaeW4gR2FRbyA4RG50IEhqSGs='
const PAYLOAD_BASE = 'https://rehabvet-website.vercel.app/api'

const DRY_RUN = process.argv.includes('--dry-run')

let PAYLOAD_TOKEN = ''

// ─── WP page classification ──────────────────────────────────────────────────

const SERVICE_SLUGS = new Set([
  'veterinary-rehabilitation-consultation',
  'animal-rehabilitation',
  'physical-therapy',
  'canine-dogs-cats-rehabilitation',
  'singapore-dog-rehabilitation-clinic',
  'benefit-post-surgery-care-canine-rehabilitation-physiotherapy',
  'homecare-rehabilitation-physiotherapy',
  'pain-relief',
])

const MODALITY_SLUGS = new Set([
  'dog-hydrotherapy',
  'underwater-treadmill',
  'hydro-treadmill',
  'dog-physiotherapy',
  'dog-acupuncture',
  'shockwave-therapy',
  'electrotherapy',
  'class-4-theraputic-laser-for-dogs-and-cats',
  'laser-therapy',
  'the-future-cold-laser',
  'ultrasound-therapy-for-dogs-and-cats',
  'tcvm-tui-na-for-dogs-and-cats',
  'manual-therapy-dog-cat',
  'therapeutic-thermotherapy-cryotherapy',
  'canine-rehabilitation-proprioception-exercises',
  'hbot-hyperbaric-oxygen-therapy-animals',
  'stem-cell-regenerative-therapy',
])

const CONDITION_SLUGS = new Set([
  'arthritis',
  'dysplasia',
  'hip-dysplasia-dog-physiotherapy',
  'what-is-physiotherapy-rehabilitation-for-hip-dysplasia',
  'osteoarthritis-arthritis-dogs-degenerative-joint-disease',
  'luxating-patella-dogs-canine-kneecap',
  'elbow-dysplasia-pets-dogs-cats',
  'elbow-osteochondritis-dissecans-in-pets-dogs-and-cats',
  'shoulder-osteochondritis-dissecans',
  'legg-calve-perthes-disease',
  'intervertebral-disk-disease-ivdd-dogs',
  'ruptured-anterior-cruciate-ligament-acl-pets-dogs-cats',
  'vestibular-disease-pets-dogs-cats',
  'degenerative-myelopathy-pets-dogs-cats',
  'fibrocartilaginous-embolism-fce-pets-dogs-cats',
  'polyarthritis-in-dogs',
  'canine-cancer',
  'what-is-canine-cancer',
  'my-dog-has-cancer',
  'approach-to-cancer-for-pet',
  'immunotheraphy-for-cancer',
  'reversing-blindness',
  'neurologic-conditions',
])

const PAGE_SLUGS = new Set([
  'about-us',
  'who-are-we',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions',
  'website-disclaimer',
  'rates',
  'facilities',
  'not-chlorinated-pool',
  'benefits-salt-water',
  'contributors',
  'join-our-team',
  'patient-stories',
  'services',
  'conditions',
  'modalities',
  'nutraceuticals',
  'vet-approve-nutraceuticals',
  'what-is-nutraceuticals',
  'the-importance-of-microbiota',
  'homecare-dogs-orthopedic-conditions',
  'holistic-complimentary-alternative-integrated-medicine-dogs-and-cats',
  'rehabilitation-physiotherapy-hydrotherapy-contraindications-cautions',
  'pets-ideal-weight-chart',
  'stance-analyzer',
  'rehabvet-centre-media',
  'traditional-chinese-veterinary-medicine',
  'dog-chiropractic',
  'dog-therapy',
  'dog-rehabilitation',
  'dog-hydrotherapy-rehabvet-com-recovery-for-canine-mobility',
  'pet-blood-test-result',
])

const SKIP_SLUGS = new Set([
  'cart',
  'checkout',
  'my-account',
  'wishlist',
  'test',
  'home',
  'form-success',
  'cat-dog-blog',
  'blog',
  'make-an-appointment-for-pets',
  'make-an-appointment-for-pet-owners',
  'pet-rehab-products',
  'hydrotherapy-singapore-old',
])

// ─── Condition category mapping ──────────────────────────────────────────────

function getConditionCategory(slug: string): string {
  if (/cancer|immunotheraphy|my-dog-has-cancer|approach-to-cancer|what-is-canine-cancer/.test(slug)) return 'cancer'
  if (/dysplasia|patella|elbow|ocd|osteochondritis|cruciate|acl/.test(slug)) return 'orthopaedic'
  if (/ivdd|intervertebral|vestibular|myelopathy|degenerative-myelopathy|fce|fibrocartilaginous|neurologic|reversing-blindness/.test(slug)) return 'neurological'
  if (/arthritis|osteoarthritis|polyarthritis/.test(slug)) return 'degenerative'
  if (/legg-calve|perthes/.test(slug)) return 'developmental'
  return 'degenerative' // default
}

// ─── Blog post category mapping ──────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string> = {
  'pet-rehabilitation': 'pet-rehabilitation',
  'rehabilitation': 'pet-rehabilitation',
  'animal-physiotherapy': 'animal-physiotherapy',
  'physiotherapy': 'animal-physiotherapy',
  'hydrotherapy': 'hydrotherapy',
  'acupuncture': 'acupuncture',
  'cost': 'cost-pricing',
  'pricing': 'cost-pricing',
  'diet': 'diet-weight',
  'weight': 'diet-weight',
  'luxating-patella': 'luxating-patella',
  'neurology': 'neurology',
  'tcvm': 'tcvm',
  'general': 'general',
}

const VALID_BLOG_CATS = new Set([
  'pet-rehabilitation', 'animal-physiotherapy', 'hydrotherapy', 'acupuncture',
  'cost-pricing', 'diet-weight', 'luxating-patella', 'neurology', 'tcvm', 'general',
])

function mapBlogCategory(wpCatName: string): string | null {
  const lower = wpCatName.toLowerCase().replace(/\s+/g, '-')
  if (VALID_BLOG_CATS.has(lower)) return lower
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return val
  }
  return null
}

// ─── HTML → Lexical conversion ───────────────────────────────────────────────

interface LexicalNode {
  type: string
  version: number
  [key: string]: any
}

function makeText(text: string, format: number = 0): LexicalNode {
  return { detail: 0, format, mode: 'normal', style: '', text, type: 'text', version: 1 }
}

function makeLinebreak(): LexicalNode {
  return { type: 'linebreak', version: 1 }
}

function parseParagraphChildren(el: NHTMLElement): LexicalNode[] {
  const children: LexicalNode[] = []
  for (const node of el.childNodes) {
    if (node.nodeType === 3) {
      // text node
      const text = node.rawText
      if (text) children.push(makeText(text))
    } else if (node.nodeType === 1) {
      const elem = node as NHTMLElement
      const tag = elem.tagName?.toLowerCase()
      if (tag === 'strong' || tag === 'b') {
        const text = elem.textContent
        if (text) children.push(makeText(text, 1))
      } else if (tag === 'em' || tag === 'i') {
        const text = elem.textContent
        if (text) children.push(makeText(text, 2))
      } else if (tag === 'a') {
        const href = elem.getAttribute('href') || ''
        const text = elem.textContent
        if (text) {
          children.push({
            type: 'link',
            version: 1,
            fields: { url: href, newTab: false, linkType: 'custom' },
            children: [makeText(text)],
            direction: 'ltr',
            format: '',
            indent: 0,
          })
        }
      } else if (tag === 'br') {
        children.push(makeLinebreak())
      } else if (tag === 'span') {
        const text = elem.textContent
        if (text) children.push(makeText(text))
      } else {
        const text = elem.textContent
        if (text) children.push(makeText(text))
      }
    }
  }
  return children.length > 0 ? children : [makeText('')]
}

function htmlToLexical(html: string): object {
  if (!html || !html.trim()) {
    return emptyLexical()
  }

  const root = parse(html)
  const nodes: LexicalNode[] = []

  function processNode(el: NHTMLElement | any, depth: number = 0): void {
    if (el.nodeType === 3) {
      // text node at root level
      const text = el.rawText?.trim()
      if (text) {
        nodes.push({
          children: [makeText(text)],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        })
      }
      return
    }

    const tag = el.tagName?.toLowerCase()
    if (!tag) {
      // process children
      for (const child of (el.childNodes || [])) {
        processNode(child, depth)
      }
      return
    }

    if (tag === 'p' || tag === 'div') {
      // Check if div contains block-level elements
      const hasBlock = el.childNodes?.some((c: any) => {
        const t = c.tagName?.toLowerCase()
        return t && ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'blockquote', 'table'].includes(t)
      })
      if (hasBlock && tag === 'div') {
        for (const child of (el.childNodes || [])) {
          processNode(child, depth)
        }
        return
      }
      const children = parseParagraphChildren(el)
      nodes.push({
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })
    } else if (/^h[1-6]$/.test(tag)) {
      const level = parseInt(tag[1])
      const children = parseParagraphChildren(el)
      nodes.push({
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        tag: `h${level}`,
        type: 'heading',
        version: 1,
      })
    } else if (tag === 'ul' || tag === 'ol') {
      const listType = tag === 'ul' ? 'bullet' : 'number'
      const items: LexicalNode[] = []
      for (const li of el.querySelectorAll('li')) {
        items.push({
          children: parseParagraphChildren(li),
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'listitem',
          version: 1,
          value: items.length + 1,
        })
      }
      if (items.length > 0) {
        nodes.push({
          children: items,
          direction: 'ltr',
          format: '',
          indent: 0,
          listType,
          start: 1,
          tag,
          type: 'list',
          version: 1,
        })
      }
    } else if (tag === 'blockquote') {
      const children = parseParagraphChildren(el)
      nodes.push({
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'quote',
        version: 1,
      })
    } else if (tag === 'br') {
      nodes.push({
        children: [makeLinebreak()],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })
    } else if (tag === 'hr') {
      nodes.push({
        type: 'horizontalrule',
        version: 1,
      })
    } else if (tag === 'img') {
      // skip images (no media mapping available)
    } else if (tag === 'figure' || tag === 'figcaption') {
      // skip figures
    } else if (tag === 'table') {
      // Convert table to plain paragraph
      const text = el.textContent?.trim()
      if (text) {
        nodes.push({
          children: [makeText(text)],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        })
      }
    } else if (tag === 'strong' || tag === 'em' || tag === 'b' || tag === 'i' || tag === 'span') {
      // inline at top level → wrap in paragraph
      const text = el.textContent?.trim()
      if (text) {
        const format = (tag === 'strong' || tag === 'b') ? 1 : (tag === 'em' || tag === 'i') ? 2 : 0
        nodes.push({
          children: [makeText(text, format)],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        })
      }
    } else {
      // recurse
      for (const child of (el.childNodes || [])) {
        processNode(child, depth)
      }
    }
  }

  for (const child of root.childNodes) {
    processNode(child)
  }

  // If nothing parsed, fallback to plain text
  if (nodes.length === 0) {
    const text = root.textContent?.trim()
    if (text) {
      nodes.push({
        children: [makeText(text)],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })
    }
  }

  return {
    root: {
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

function emptyLexical(): object {
  return {
    root: {
      children: [
        {
          children: [],
          direction: null,
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

async function payloadLogin(): Promise<void> {
  const res = await fetch(`${PAYLOAD_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@rehabvet.com', password: 'rehabvet2024' }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  const data = await res.json() as any
  PAYLOAD_TOKEN = data.token
  console.log('✅ Logged in to Payload CMS\n')
}

async function payloadPost(collection: string, body: object): Promise<any> {
  if (DRY_RUN) return { id: 'dry-run' }
  const res = await fetch(`${PAYLOAD_BASE}/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${PAYLOAD_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
  const data = await res.json() as any
  if (!res.ok) {
    throw new Error(data?.errors?.[0]?.message || data?.message || JSON.stringify(data))
  }
  return data
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

// ─── Media migration ─────────────────────────────────────────────────────────

async function migrateMedia(wpMedia: any[]): Promise<Map<number, string>> {
  console.log(`\n📸 Migrating media (${wpMedia.length} items)...`)
  const mapping = new Map<number, string>()

  let ok = 0, skip = 0, fail = 0

  for (const item of wpMedia) {
    // Create media record via REST API using external URL
    const body = {
      alt: item.alt_text || item.title?.rendered || '',
      url: item.source_url || '',
      filename: item.slug || `media-${item.id}`,
      mimeType: item.mime_type || 'image/jpeg',
      filesize: item.media_details?.filesize || 0,
      width: item.media_details?.width || 0,
      height: item.media_details?.height || 0,
    }

    if (!body.url) {
      skip++
      continue
    }

    try {
      const result = await payloadPost('media', body)
      mapping.set(item.id, result.id || result.doc?.id)
      ok++
    } catch (err: any) {
      // If it's a duplicate or upload error, just track WP id
      if (err.message?.includes('duplicate') || err.message?.includes('unique')) {
        skip++
      } else {
        fail++
        // Don't log every failure to keep output clean
      }
    }
  }

  console.log(`   ✅ ${ok} created, ${skip} skipped, ${fail} failed`)
  return mapping
}

// ─── Blog posts migration ────────────────────────────────────────────────────

async function migrateBlogPosts(posts: any[], cats: any[], mediaMap: Map<number, string>): Promise<void> {
  console.log(`\n📝 Migrating blog posts (${posts.length})...`)

  // Build WP category id → name map
  const catMap = new Map<number, string>(cats.map((c: any) => [c.id, c.slug || c.name]))

  let ok = 0, fail = 0
  for (const post of posts) {
    const title = stripHtml(post.title?.rendered || '')
    const slug = post.slug || title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
    const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 500)
    const content = htmlToLexical(post.content?.rendered || '')
    const date = post.date || new Date().toISOString()

    // Map categories
    const wpCatIds: number[] = post.categories || []
    const categories = wpCatIds
      .map(id => catMap.get(id) || '')
      .map(name => mapBlogCategory(name))
      .filter((c): c is string => !!c)

    // Featured image
    let featuredImage: string | undefined
    if (post.featured_media && mediaMap.has(post.featured_media)) {
      featuredImage = mediaMap.get(post.featured_media)!
    }

    const body: any = {
      title,
      slug,
      excerpt,
      content,
      date,
      author: post._embedded?.author?.[0]?.name || 'RehabVet',
      categories: categories.length > 0 ? categories : ['general'],
      seo: {
        metaTitle: stripHtml(post.title?.rendered || '').slice(0, 60),
        metaDescription: excerpt.slice(0, 160),
      },
    }
    if (featuredImage) body.featuredImage = featuredImage

    try {
      await payloadPost('blog-posts', body)
      ok++
    } catch (err: any) {
      fail++
      if (fail <= 5) console.warn(`   ⚠️  Failed blog post "${title}": ${err.message}`)
    }
  }
  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── Services migration ───────────────────────────────────────────────────────

async function migrateServices(pages: any[], mediaMap: Map<number, string>): Promise<void> {
  const filtered = pages.filter(p => SERVICE_SLUGS.has(p.slug))
  console.log(`\n🏥 Migrating services (${filtered.length})...`)
  let ok = 0, fail = 0

  for (const page of filtered) {
    const title = stripHtml(page.title?.rendered || '')
    const slug = page.slug
    const excerpt = stripHtml(page.excerpt?.rendered || '').slice(0, 500)
    const description = htmlToLexical(page.content?.rendered || '')

    let heroImage: string | undefined
    if (page.featured_media && mediaMap.has(page.featured_media)) {
      heroImage = mediaMap.get(page.featured_media)!
    }

    const body: any = {
      title,
      slug,
      excerpt,
      description,
      seo: {
        metaTitle: title.slice(0, 60),
        metaDescription: excerpt.slice(0, 160),
      },
    }
    if (heroImage) body.heroImage = heroImage

    try {
      await payloadPost('services', body)
      ok++
    } catch (err: any) {
      fail++
      if (fail <= 5) console.warn(`   ⚠️  Failed service "${title}": ${err.message}`)
    }
  }
  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── Conditions migration ─────────────────────────────────────────────────────

async function migrateConditions(pages: any[], mediaMap: Map<number, string>): Promise<void> {
  const filtered = pages.filter(p => CONDITION_SLUGS.has(p.slug))
  console.log(`\n🦴 Migrating conditions (${filtered.length})...`)
  let ok = 0, fail = 0

  for (const page of filtered) {
    const title = stripHtml(page.title?.rendered || '')
    const slug = page.slug
    const excerpt = stripHtml(page.excerpt?.rendered || '').slice(0, 500)
    const html = page.content?.rendered || ''
    const description = htmlToLexical(html)
    const category = getConditionCategory(slug)

    let seoOgImage: string | undefined
    if (page.featured_media && mediaMap.has(page.featured_media)) {
      seoOgImage = mediaMap.get(page.featured_media)!
    }

    const body: any = {
      title,
      slug,
      excerpt,
      category,
      description,
      symptoms: emptyLexical(),
      treatments: emptyLexical(),
      seo: {
        metaTitle: title.slice(0, 60),
        metaDescription: excerpt.slice(0, 160),
      },
    }
    if (seoOgImage) body.seo.ogImage = seoOgImage

    try {
      await payloadPost('conditions', body)
      ok++
    } catch (err: any) {
      fail++
      if (fail <= 5) console.warn(`   ⚠️  Failed condition "${title}": ${err.message}`)
    }
  }
  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── Modalities migration ─────────────────────────────────────────────────────

async function migrateModalities(pages: any[], mediaMap: Map<number, string>): Promise<void> {
  const filtered = pages.filter(p => MODALITY_SLUGS.has(p.slug))
  console.log(`\n⚡ Migrating modalities (${filtered.length})...`)
  let ok = 0, fail = 0

  for (const page of filtered) {
    const title = stripHtml(page.title?.rendered || '')
    const slug = page.slug
    const excerpt = stripHtml(page.excerpt?.rendered || '').slice(0, 500)
    const description = htmlToLexical(page.content?.rendered || '')

    let image: string | undefined
    if (page.featured_media && mediaMap.has(page.featured_media)) {
      image = mediaMap.get(page.featured_media)!
    }

    const body: any = {
      title,
      slug,
      excerpt,
      description,
      howItWorks: emptyLexical(),
      seo: {
        metaTitle: title.slice(0, 60),
        metaDescription: excerpt.slice(0, 160),
      },
    }
    if (image) body.image = image

    try {
      await payloadPost('modalities', body)
      ok++
    } catch (err: any) {
      fail++
      if (fail <= 5) console.warn(`   ⚠️  Failed modality "${title}": ${err.message}`)
    }
  }
  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── Pages migration ──────────────────────────────────────────────────────────

async function migratePages(wpPages: any[], mediaMap: Map<number, string>): Promise<void> {
  // Include pages from PAGE_SLUGS, plus any WP pages not assigned to other collections and not skipped
  const assignedSlugs = new Set([...SERVICE_SLUGS, ...MODALITY_SLUGS, ...CONDITION_SLUGS, ...SKIP_SLUGS])

  const filtered = wpPages.filter(p => {
    if (PAGE_SLUGS.has(p.slug)) return true
    if (assignedSlugs.has(p.slug)) return false
    // Anything not classified goes to pages
    return true
  })

  console.log(`\n📄 Migrating pages (${filtered.length})...`)
  let ok = 0, fail = 0

  for (const page of filtered) {
    const title = stripHtml(page.title?.rendered || '')
    const slug = page.slug
    const excerpt = stripHtml(page.excerpt?.rendered || '').slice(0, 500)
    const content = htmlToLexical(page.content?.rendered || '')

    let seoOgImage: string | undefined
    if (page.featured_media && mediaMap.has(page.featured_media)) {
      seoOgImage = mediaMap.get(page.featured_media)!
    }

    const body: any = {
      title,
      slug,
      excerpt,
      content,
      seo: {
        metaTitle: title.slice(0, 60),
        metaDescription: excerpt.slice(0, 160),
      },
    }
    if (seoOgImage) body.seo.ogImage = seoOgImage

    try {
      await payloadPost('pages', body)
      ok++
    } catch (err: any) {
      fail++
      if (fail <= 5) console.warn(`   ⚠️  Failed page "${title}" (${slug}): ${err.message}`)
    }
  }
  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── FAQs migration ───────────────────────────────────────────────────────────

async function migrateFAQs(wpPages: any[]): Promise<void> {
  // Find FAQ-related pages
  const faqPages = wpPages.filter(p =>
    p.slug?.includes('faq') ||
    (p.title?.rendered || '').toLowerCase().includes('faq') ||
    (p.title?.rendered || '').toLowerCase().includes('frequently asked')
  )

  if (faqPages.length === 0) {
    console.log('\n❓ No FAQ pages found')
    return
  }

  console.log(`\n❓ Migrating FAQs from ${faqPages.length} page(s)...`)
  let ok = 0, fail = 0

  for (const page of faqPages) {
    const html = page.content?.rendered || ''
    const root = parse(html)

    // Try to extract Q&A pairs from structured content
    // Look for patterns: headings followed by paragraphs, or dt/dd elements
    const questions = root.querySelectorAll('h2, h3, h4, dt')
    
    for (const qEl of questions) {
      const question = qEl.textContent?.trim()
      if (!question || question.length < 5) continue

      // Get the next sibling content as answer
      let answerEl = qEl.nextElementSibling
      let answer = ''
      while (answerEl && !['H2', 'H3', 'H4', 'DT'].includes(answerEl.tagName)) {
        answer += answerEl.textContent?.trim() + ' '
        answerEl = answerEl.nextElementSibling as any
      }
      answer = answer.trim()

      if (!answer || answer.length < 5) continue

      const body = {
        question: question.slice(0, 500),
        answer: answer.slice(0, 2000),
        category: 'general',
      }

      try {
        await payloadPost('faqs', body)
        ok++
      } catch (err: any) {
        fail++
        if (fail <= 3) console.warn(`   ⚠️  Failed FAQ "${question.slice(0, 50)}": ${err.message}`)
      }
    }
  }

  console.log(`   ✅ ${ok} created, ${fail} failed`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🐾 RehabVet WordPress → Payload CMS migration ${DRY_RUN ? '[DRY RUN]' : '[LIVE]'}\n`)
  console.log(`   Payload API: ${PAYLOAD_BASE}`)
  console.log(`   WordPress: ${WP_BASE}\n`)

  // Login
  await payloadLogin()

  // Fetch all WP content
  console.log('📥 Fetching WordPress content...')
  const [wpPosts, wpPages, wpMedia, wpCats] = await Promise.all([
    wpFetch<any>('/posts?status=publish'),
    wpFetch<any>('/pages?status=publish'),
    wpFetch<any>('/media'),
    wpFetch<any>('/categories'),
  ])

  console.log(`   Posts: ${wpPosts.length}`)
  console.log(`   Pages: ${wpPages.length}`)
  console.log(`   Media: ${wpMedia.length}`)
  console.log(`   Categories: ${wpCats.length}`)

  if (DRY_RUN) {
    console.log('\n📋 DRY RUN classification:')
    const services = wpPages.filter(p => SERVICE_SLUGS.has(p.slug))
    const modalities = wpPages.filter(p => MODALITY_SLUGS.has(p.slug))
    const conditions = wpPages.filter(p => CONDITION_SLUGS.has(p.slug))
    const assigned = new Set([...SERVICE_SLUGS, ...MODALITY_SLUGS, ...CONDITION_SLUGS, ...SKIP_SLUGS])
    const pagesOut = wpPages.filter(p => PAGE_SLUGS.has(p.slug) || !assigned.has(p.slug))
    console.log(`   Services: ${services.length}`)
    console.log(`   Modalities: ${modalities.length}`)
    console.log(`   Conditions: ${conditions.length}`)
    console.log(`   Pages: ${pagesOut.length}`)
    console.log(`   Blog posts: ${wpPosts.length}`)
    console.log(`   Media: ${wpMedia.length}`)
    console.log('\n[DRY RUN — nothing written to Payload]\n')
    return
  }

  // Skip media for now (BLOB_READ_WRITE_TOKEN not set on Vercel)
  // const mediaMap = await migrateMedia(wpMedia)
  const mediaMap = new Map<number, string>()
  console.log('\n📸 Skipping media migration (Vercel Blob storage not configured yet)\n')

  await migrateBlogPosts(wpPosts, wpCats, mediaMap)
  await migrateServices(wpPages, mediaMap)
  await migrateConditions(wpPages, mediaMap)
  await migrateModalities(wpPages, mediaMap)
  await migratePages(wpPages, mediaMap)
  await migrateFAQs(wpPages)

  console.log('\n─────────────────────────────────────')
  console.log('✅ Migration complete!')
  console.log('─────────────────────────────────────\n')
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
