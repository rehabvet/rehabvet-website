#!/usr/bin/env tsx
/**
 * Migrate WordPress media to Payload CMS via Vercel Blob storage
 * Downloads from WP, uploads to Payload as multipart form data
 */

import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

const WP_BASE = 'https://rehabvet.com/wp-json/wp/v2'
const WP_AUTH = 'Basic YWRtaW46NFQ5QSBKc2ZVIGNaeW4gR2FRbyA4RG50IEhqSGs='
const PAYLOAD_BASE = 'https://rehabvet-website.vercel.app/api'

let PAYLOAD_TOKEN = ''

async function payloadLogin(): Promise<void> {
  const res = await fetch(`${PAYLOAD_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@rehabvet.com', password: 'rehabvet2024' }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status}`)
  const data = await res.json() as any
  PAYLOAD_TOKEN = data.token
  console.log('✅ Logged in to Payload CMS')
}

async function fetchAllWPMedia(): Promise<any[]> {
  const all: any[] = []
  let page = 1
  while (true) {
    const url = `${WP_BASE}/media?per_page=100&page=${page}`
    const res = await fetch(url, { headers: { Authorization: WP_AUTH } })
    if (!res.ok) break
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) break
    all.push(...data)
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)
    console.log(`   Fetched page ${page}/${totalPages} (${all.length} items so far)`)
    if (page >= totalPages) break
    page++
  }
  return all
}

async function downloadFile(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || 'application/octet-stream'
    const buffer = Buffer.from(await res.arrayBuffer())
    return { buffer, contentType }
  } catch {
    return null
  }
}

async function uploadToPayload(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  alt: string,
): Promise<any> {
  // Write to temp file for FormData
  const tmpPath = join(tmpdir(), `wp-migrate-${Date.now()}-${filename}`)
  await writeFile(tmpPath, fileBuffer)

  try {
    const { Blob: NodeBlob } = await import('buffer')
    const blob = new NodeBlob([fileBuffer], { type: mimeType })

    const formData = new FormData()
    formData.append('file', blob as any, filename)
    formData.append('_payload', JSON.stringify({ alt: alt || filename }))

    const res = await fetch(`${PAYLOAD_BASE}/media`, {
      method: 'POST',
      headers: { Authorization: `JWT ${PAYLOAD_TOKEN}` },
      body: formData,
    })

    const data = await res.json() as any
    if (!res.ok) {
      throw new Error(data?.errors?.[0]?.message || data?.message || `HTTP ${res.status}`)
    }
    return data.doc
  } finally {
    await unlink(tmpPath).catch(() => {})
  }
}

// SVG and other non-image types that Payload might reject
const ALLOWED_MIMES = new Set([
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm', 'application/pdf',
])

async function main() {
  console.log('\n🖼️  RehabVet Media Migration\n')

  await payloadLogin()

  // Check existing media count
  const existingRes = await fetch(`${PAYLOAD_BASE}/media?limit=0`, {
    headers: { Authorization: `JWT ${PAYLOAD_TOKEN}` },
  })
  const existingData = await existingRes.json() as any
  const existingCount = existingData.totalDocs || 0
  console.log(`📊 Existing media in Payload: ${existingCount}`)

  // Get existing filenames to skip duplicates
  let existingFilenames = new Set<string>()
  if (existingCount > 0) {
    let page = 1
    while (true) {
      const r = await fetch(`${PAYLOAD_BASE}/media?limit=100&page=${page}`, {
        headers: { Authorization: `JWT ${PAYLOAD_TOKEN}` },
      })
      const d = await r.json() as any
      for (const doc of (d.docs || [])) {
        if (doc.filename) existingFilenames.add(doc.filename)
      }
      if (page >= (d.totalPages || 1)) break
      page++
    }
  }

  console.log('\n📥 Fetching WordPress media list...')
  const wpMedia = await fetchAllWPMedia()
  console.log(`   Total WP media: ${wpMedia.length}`)

  let uploaded = 0, skipped = 0, failed = 0, skippedType = 0

  // Process in batches of 5 concurrent uploads
  const BATCH_SIZE = 3
  for (let i = 0; i < wpMedia.length; i += BATCH_SIZE) {
    const batch = wpMedia.slice(i, i + BATCH_SIZE)
    const promises = batch.map(async (media: any) => {
      const sourceUrl = media.source_url
      const mimeType = media.mime_type || ''
      const filename = sourceUrl.split('/').pop() || `media-${media.id}`
      const alt = media.alt_text || media.title?.rendered?.replace(/<[^>]+>/g, '') || filename

      // Skip if already uploaded
      if (existingFilenames.has(filename)) {
        skipped++
        return
      }

      // Skip unsupported types
      if (!ALLOWED_MIMES.has(mimeType)) {
        skippedType++
        return
      }

      try {
        const file = await downloadFile(sourceUrl)
        if (!file || file.buffer.length < 100) {
          failed++
          console.warn(`   ❌ ${filename}: download failed or empty`)
          return
        }

        await uploadToPayload(file.buffer, filename, mimeType, alt)
        uploaded++
      } catch (err: any) {
        failed++
        if (failed <= 10) console.warn(`   ❌ ${filename}: ${err.message}`)
      }
    })

    await Promise.all(promises)

    const total = uploaded + skipped + failed + skippedType
    if (total % 30 === 0 || i + BATCH_SIZE >= wpMedia.length) {
      console.log(`   Progress: ${total}/${wpMedia.length} (✅${uploaded} ⏭️${skipped} ❌${failed} 🚫${skippedType})`)
    }
  }

  console.log(`\n📊 Final Results:`)
  console.log(`   ✅ Uploaded: ${uploaded}`)
  console.log(`   ⏭️  Skipped (existing): ${skipped}`)
  console.log(`   🚫 Skipped (unsupported type): ${skippedType}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   Total WP media: ${wpMedia.length}`)

  // Final count
  const finalRes = await fetch(`${PAYLOAD_BASE}/media?limit=0`, {
    headers: { Authorization: `JWT ${PAYLOAD_TOKEN}` },
  })
  const finalData = await finalRes.json() as any
  console.log(`\n   Payload media total: ${finalData.totalDocs}`)
  console.log('\n✅ Media migration complete!\n')
}

main().catch(err => { console.error('❌ Fatal:', err); process.exit(1) })
