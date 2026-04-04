#!/usr/bin/env tsx
/**
 * Finish migration: Pages + FAQs (blog posts, services, conditions, modalities already done)
 */

import { parse, HTMLElement as NHTMLElement } from 'node-html-parser'

const WP_BASE = 'https://rehabvet.com/wp-json/wp/v2'
const WP_AUTH = 'Basic YWRtaW46NFQ5QSBKc2ZVIGNaeW4gR2FRbyA4RG50IEhqSGs='
const PAYLOAD_BASE = 'https://rehabvet-website.vercel.app/api'

let PAYLOAD_TOKEN = ''

// ─── Slug sets (same as main script) ─────────────────────────────────────────

const SERVICE_SLUGS = new Set([
  'veterinary-rehabilitation-consultation', 'animal-rehabilitation', 'physical-therapy',
  'canine-dogs-cats-rehabilitation', 'singapore-dog-rehabilitation-clinic',
  'benefit-post-surgery-care-canine-rehabilitation-physiotherapy',
  'homecare-rehabilitation-physiotherapy', 'pain-relief',
])

const MODALITY_SLUGS = new Set([
  'dog-hydrotherapy', 'underwater-treadmill', 'hydro-treadmill', 'dog-physiotherapy',
  'dog-acupuncture', 'shockwave-therapy', 'electrotherapy',
  'class-4-theraputic-laser-for-dogs-and-cats', 'laser-therapy', 'the-future-cold-laser',
  'ultrasound-therapy-for-dogs-and-cats', 'tcvm-tui-na-for-dogs-and-cats',
  'manual-therapy-dog-cat', 'therapeutic-thermotherapy-cryotherapy',
  'canine-rehabilitation-proprioception-exercises', 'hbot-hyperbaric-oxygen-therapy-animals',
  'stem-cell-regenerative-therapy',
])

const CONDITION_SLUGS = new Set([
  'arthritis', 'dysplasia', 'hip-dysplasia-dog-physiotherapy',
  'what-is-physiotherapy-rehabilitation-for-hip-dysplasia',
  'osteoarthritis-arthritis-dogs-degenerative-joint-disease',
  'luxating-patella-dogs-canine-kneecap', 'elbow-dysplasia-pets-dogs-cats',
  'elbow-osteochondritis-dissecans-in-pets-dogs-and-cats',
  'shoulder-osteochondritis-dissecans', 'legg-calve-perthes-disease',
  'intervertebral-disk-disease-ivdd-dogs',
  'ruptured-anterior-cruciate-ligament-acl-pets-dogs-cats',
  'vestibular-disease-pets-dogs-cats', 'degenerative-myelopathy-pets-dogs-cats',
  'fibrocartilaginous-embolism-fce-pets-dogs-cats', 'polyarthritis-in-dogs',
  'canine-cancer', 'what-is-canine-cancer', 'my-dog-has-cancer',
  'approach-to-cancer-for-pet', 'immunotheraphy-for-cancer',
  'reversing-blindness', 'neurologic-conditions',
])

const SKIP_SLUGS = new Set([
  'cart', 'checkout', 'my-account', 'wishlist', 'test', 'home', 'form-success',
  'cat-dog-blog', 'blog', 'make-an-appointment-for-pets',
  'make-an-appointment-for-pet-owners', 'pet-rehab-products', 'hydrotherapy-singapore-old',
])

// ─── HTML → Lexical (copied from main script) ───────────────────────────────

interface LexicalNode { type: string; version: number; [key: string]: any }

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
      const text = node.rawText
      if (text) children.push(makeText(text))
    } else if (node.nodeType === 1) {
      const elem = node as NHTMLElement
      const tag = elem.tagName?.toLowerCase()
      if (tag === 'strong' || tag === 'b') {
        const text = elem.textContent; if (text) children.push(makeText(text, 1))
      } else if (tag === 'em' || tag === 'i') {
        const text = elem.textContent; if (text) children.push(makeText(text, 2))
      } else if (tag === 'a') {
        const href = elem.getAttribute('href') || ''
        const text = elem.textContent
        if (text) children.push({ type: 'link', version: 1, fields: { url: href, newTab: false, linkType: 'custom' }, children: [makeText(text)], direction: 'ltr', format: '', indent: 0 })
      } else if (tag === 'br') {
        children.push(makeLinebreak())
      } else {
        const text = elem.textContent; if (text) children.push(makeText(text))
      }
    }
  }
  return children.length > 0 ? children : [makeText('')]
}

function htmlToLexical(html: string): object {
  if (!html?.trim()) return emptyLexical()
  const root = parse(html)
  const nodes: LexicalNode[] = []

  function processNode(el: any): void {
    if (el.nodeType === 3) {
      const text = el.rawText?.trim()
      if (text) nodes.push({ children: [makeText(text)], direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1 })
      return
    }
    const tag = el.tagName?.toLowerCase()
    if (!tag) { for (const c of (el.childNodes || [])) processNode(c); return }

    if (tag === 'p' || (tag === 'div' && !el.childNodes?.some((c: any) => ['p','div','h1','h2','h3','h4','h5','h6','ul','ol','blockquote','table'].includes(c.tagName?.toLowerCase())))) {
      nodes.push({ children: parseParagraphChildren(el), direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1 })
    } else if (tag === 'div') {
      for (const c of (el.childNodes || [])) processNode(c)
    } else if (/^h[1-6]$/.test(tag)) {
      nodes.push({ children: parseParagraphChildren(el), direction: 'ltr', format: '', indent: 0, tag, type: 'heading', version: 1 })
    } else if (tag === 'ul' || tag === 'ol') {
      const items = el.querySelectorAll('li').map((li: any, i: number) => ({
        children: parseParagraphChildren(li), direction: 'ltr', format: '', indent: 0, type: 'listitem', version: 1, value: i + 1
      }))
      if (items.length) nodes.push({ children: items, direction: 'ltr', format: '', indent: 0, listType: tag === 'ul' ? 'bullet' : 'number', start: 1, tag, type: 'list', version: 1 })
    } else if (tag === 'blockquote') {
      nodes.push({ children: parseParagraphChildren(el), direction: 'ltr', format: '', indent: 0, type: 'quote', version: 1 })
    } else if (tag === 'hr') {
      nodes.push({ type: 'horizontalrule', version: 1 })
    } else {
      for (const c of (el.childNodes || [])) processNode(c)
    }
  }

  for (const child of root.childNodes) processNode(child)
  if (nodes.length === 0) {
    const text = root.textContent?.trim()
    if (text) nodes.push({ children: [makeText(text)], direction: 'ltr', format: '', indent: 0, type: 'paragraph', version: 1 })
  }
  return { root: { children: nodes, direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } }
}

function emptyLexical(): object {
  return { root: { children: [{ children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 }], direction: null, format: '', indent: 0, type: 'root', version: 1 } }
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
  console.log('✅ Logged in to Payload CMS')
}

async function payloadPost(collection: string, body: object): Promise<any> {
  const res = await fetch(`${PAYLOAD_BASE}/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${PAYLOAD_TOKEN}` },
    body: JSON.stringify(body),
  })
  const data = await res.json() as any
  if (!res.ok) throw new Error(data?.errors?.[0]?.message || data?.message || JSON.stringify(data))
  return data
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🐾 RehabVet Migration — Remaining (Pages + FAQs)\n')

  await payloadLogin()

  console.log('📥 Fetching WP pages...')
  const wpPages = await wpFetch<any>('/pages?status=publish')
  console.log(`   ${wpPages.length} pages fetched`)

  // ── Pages ──
  const assignedSlugs = new Set([...SERVICE_SLUGS, ...MODALITY_SLUGS, ...CONDITION_SLUGS, ...SKIP_SLUGS])
  const pagesToMigrate = wpPages.filter(p => !assignedSlugs.has(p.slug))

  console.log(`\n📄 Migrating ${pagesToMigrate.length} pages...`)
  let pOk = 0, pFail = 0
  for (const page of pagesToMigrate) {
    const title = stripHtml(page.title?.rendered || '')
    const slug = page.slug
    const excerpt = stripHtml(page.excerpt?.rendered || '').slice(0, 500)
    const content = htmlToLexical(page.content?.rendered || '')

    try {
      await payloadPost('pages', { title, slug, excerpt, content, seo: { metaTitle: title.slice(0, 60), metaDescription: excerpt.slice(0, 160) } })
      pOk++
      console.log(`   ✅ ${slug}`)
    } catch (err: any) {
      pFail++
      console.warn(`   ❌ ${slug}: ${err.message}`)
    }
  }
  console.log(`Pages: ${pOk} created, ${pFail} failed`)

  // ── FAQs ──
  const faqPages = wpPages.filter(p =>
    p.slug?.includes('faq') ||
    (p.title?.rendered || '').toLowerCase().includes('faq') ||
    (p.title?.rendered || '').toLowerCase().includes('frequently asked')
  )

  if (faqPages.length > 0) {
    console.log(`\n❓ Extracting FAQs from ${faqPages.length} page(s)...`)
    let fOk = 0, fFail = 0
    for (const page of faqPages) {
      const root = parse(page.content?.rendered || '')
      const questions = root.querySelectorAll('h2, h3, h4, dt')
      for (const qEl of questions) {
        const question = qEl.textContent?.trim()
        if (!question || question.length < 5) continue
        let answerEl = qEl.nextElementSibling
        let answer = ''
        while (answerEl && !['H2', 'H3', 'H4', 'DT'].includes(answerEl.tagName)) {
          answer += answerEl.textContent?.trim() + ' '
          answerEl = answerEl.nextElementSibling as any
        }
        answer = answer.trim()
        if (!answer || answer.length < 5) continue
        try {
          await payloadPost('faqs', { question: question.slice(0, 500), answer: answer.slice(0, 2000), category: 'general' })
          fOk++
        } catch (err: any) {
          fFail++
          if (fFail <= 3) console.warn(`   ❌ FAQ: ${err.message}`)
        }
      }
    }
    console.log(`FAQs: ${fOk} created, ${fFail} failed`)
  } else {
    console.log('\n❓ No FAQ pages found in WP')
  }

  // ── Missing blog post ──
  console.log('\n📝 Checking for missing blog post (109/110)...')
  const wpPosts = await wpFetch<any>('/posts?status=publish')
  const existingRes = await fetch(`${PAYLOAD_BASE}/blog-posts?limit=200`, {
    headers: { Authorization: `JWT ${PAYLOAD_TOKEN}` }
  })
  const existingData = await existingRes.json() as any
  const existingSlugs = new Set((existingData.docs || []).map((d: any) => d.slug))

  const missing = wpPosts.filter((p: any) => !existingSlugs.has(p.slug))
  if (missing.length > 0) {
    console.log(`   Found ${missing.length} missing post(s)`)
    for (const post of missing) {
      const title = stripHtml(post.title?.rendered || '')
      const slug = post.slug
      const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 500)
      const content = htmlToLexical(post.content?.rendered || '')
      try {
        await payloadPost('blog-posts', {
          title, slug, excerpt, content,
          date: post.date || new Date().toISOString(),
          author: 'RehabVet',
          categories: ['general'],
          seo: { metaTitle: title.slice(0, 60), metaDescription: excerpt.slice(0, 160) },
        })
        console.log(`   ✅ ${slug}`)
      } catch (err: any) {
        console.warn(`   ❌ ${slug}: ${err.message}`)
      }
    }
  } else {
    console.log('   All blog posts present')
  }

  console.log('\n✅ Remaining migration complete!\n')
}

main().catch(err => { console.error('❌ Failed:', err); process.exit(1) })
