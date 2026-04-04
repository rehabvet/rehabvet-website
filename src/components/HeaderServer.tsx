import { getPayload } from 'payload'
import config from '@payload-config'
import Navbar from './shared/navbar'
import type { Media } from '@/payload-types'

export async function HeaderServer() {
  let services: { title: string; slug: string }[] = []
  let conditions: { title: string; slug: string; category: string }[] = []
  let logoUrl: string | null = null

  try {
    const payload = await getPayload({ config })

    const [servicesResult, conditionsResult, siteSettings] = await Promise.all([
      payload.find({ collection: 'services', limit: 50, sort: 'title', select: { title: true, slug: true } }),
      payload.find({ collection: 'conditions', limit: 100, sort: 'title', select: { title: true, slug: true, category: true } }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    services = servicesResult.docs.map((s) => ({ title: s.title, slug: s.slug }))
    conditions = conditionsResult.docs.map((c) => ({ title: c.title, slug: c.slug, category: c.category }))

    const logo = siteSettings.logo as Media | null
    if (logo?.url) logoUrl = logo.url
  } catch {
    // DB not available
  }

  return <Navbar services={services} conditions={conditions} logoUrl={logoUrl} />
}
