import type { VercelRequest, VercelResponse } from '@vercel/node'

interface WebFormPayload {
  name?: string
  email?: string
  phone?: string
  company?: string
  websiteType?: string
  description?: string
  features?: string
  existingWebsite?: string
  budget?: string
  timeline?: string
  notes?: string
  _gotcha?: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string): string {
  if (!value?.trim()) return ''
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #334155;color:#94a3b8;font-weight:600;width:160px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #334155;color:#f1f5f9;">${escapeHtml(value)}</td></tr>`
}

const WEBSITE_TYPES: Record<string, string> = {
  business: 'Business / Company Website',
  restaurant: 'Restaurant / Café',
  showroom: 'Showroom / Product Display',
  portfolio: 'Portfolio / Personal',
  landing: 'Landing Page / Promotional',
  ecommerce: 'Online Shop',
  other: 'Other',
}

const BUDGETS: Record<string, string> = {
  under500: 'Under €500',
  '500-1000': '€500 – €1,000',
  '1000-2500': '€1,000 – €2,500',
  '2500plus': '€2,500+',
  discuss: 'Prefer to discuss',
}

const TIMELINES: Record<string, string> = {
  asap: 'As soon as possible',
  '1month': 'Within 1 month',
  '2-3months': '2–3 months',
  flexible: 'Flexible / No rush',
}

function label(map: Record<string, string>, value?: string): string {
  if (!value?.trim()) return ''
  return map[value.trim()] || value.trim()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as WebFormPayload

  if (body._gotcha) {
    return res.status(200).json({ success: true })
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const description = body.description?.trim()
  const websiteType = body.websiteType?.trim()

  if (!name || !email || !description || !websiteType) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'denisjanuzi@gmail.com'
  const fromEmail = process.env.RESEND_FROM || 'Portfolio Form <onboarding@resend.dev>'

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Email service is not configured. Please try again later.' })
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0F172A;padding:32px;">
      <div style="max-width:600px;margin:0 auto;background:#1E293B;border-radius:12px;overflow:hidden;border:1px solid #334155;">
        <div style="background:#3B82F6;padding:24px;">
          <h1 style="margin:0;color:#fff;font-size:20px;">New Website Request</h1>
          <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;">Submitted via denisjanuzi.dev/webform</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('Phone', body.phone?.trim() || '')}
          ${row('Company', body.company?.trim() || '')}
          ${row('Website Type', label(WEBSITE_TYPES, websiteType))}
          ${row('Budget', label(BUDGETS, body.budget))}
          ${row('Timeline', label(TIMELINES, body.timeline))}
          ${row('Existing Website', body.existingWebsite?.trim() || '')}
        </table>
        <div style="padding:16px 12px;">
          <p style="margin:0 0 8px;color:#94a3b8;font-weight:600;font-size:13px;">Project Description</p>
          <p style="margin:0;color:#f1f5f9;white-space:pre-wrap;line-height:1.6;">${escapeHtml(description)}</p>
        </div>
        ${body.features?.trim() ? `<div style="padding:0 12px 16px;"><p style="margin:0 0 8px;color:#94a3b8;font-weight:600;font-size:13px;">Features / Pages Needed</p><p style="margin:0;color:#f1f5f9;white-space:pre-wrap;line-height:1.6;">${escapeHtml(body.features.trim())}</p></div>` : ''}
        ${body.notes?.trim() ? `<div style="padding:0 12px 24px;"><p style="margin:0 0 8px;color:#94a3b8;font-weight:600;font-size:13px;">Additional Notes</p><p style="margin:0;color:#f1f5f9;white-space:pre-wrap;line-height:1.6;">${escapeHtml(body.notes.trim())}</p></div>` : ''}
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Website Request: ${name}${body.company ? ` (${body.company.trim()})` : ''}`,
        html,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Resend error:', errorData)
      return res.status(500).json({ error: 'Failed to send your request. Please try again or email directly.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send your request. Please try again later.' })
  }
}
