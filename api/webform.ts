import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

interface WebFormPayload {
  name?: string
  email?: string
  phone?: string
  company?: string
  websiteType?: string
  description?: string
  features?: string
  websiteReferences?: string[]
  existingWebsite?: string
  colorNotes?: string
  hasLogo?: string
  hasPhotos?: string
  hasVideos?: string
  hasText?: string
  hasDomain?: string
  hasHosting?: string
  domainName?: string
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
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #334155;color:#94a3b8;font-weight:600;width:180px;vertical-align:top;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #334155;color:#f1f5f9;white-space:pre-wrap;line-height:1.6;">${escapeHtml(value)}</td></tr>`
}

function block(title: string, content: string): string {
  if (!content.trim()) return ''
  return `
    <div style="padding:16px 12px;border-top:1px solid #334155;">
      <p style="margin:0 0 8px;color:#94a3b8;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;">${title}</p>
      <p style="margin:0;color:#f1f5f9;white-space:pre-wrap;line-height:1.6;">${escapeHtml(content)}</p>
    </div>
  `
}

function listBlock(title: string, items: string[]): string {
  if (!items.length) return ''
  return `
    <div style="padding:16px 12px;border-top:1px solid #334155;">
      <p style="margin:0 0 8px;color:#94a3b8;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;">${title}</p>
      <p style="margin:0;color:#f1f5f9;line-height:1.8;">${items.map((item) => escapeHtml(item)).join('<br>')}</p>
    </div>
  `
}

const WEBSITE_TYPES: Record<string, string> = {
  onePage: 'One Page Website',
  multiPage: 'Multi-Page Website',
  adminDashboard: 'Website with Admin Panel',
  other: 'Other / Not sure',
  onlineShop: 'Online Shop',
  webApp: 'Web Application',
  business: 'Business / Company Website',
  restaurant: 'Restaurant / Café',
  showroom: 'Showroom / Product Display',
  portfolio: 'Portfolio / Personal',
  landing: 'Landing Page / Promotional',
  ecommerce: 'Online Shop',
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

const ASSET_ANSWERS: Record<string, string> = {
  yes: 'Yes',
  no: 'No',
  partial: 'Some, not all yet',
}

function label(map: Record<string, string>, value?: string): string {
  if (!value?.trim()) return ''
  return map[value.trim()] || value.trim()
}

function formatDomainAnswer(body: WebFormPayload): string {
  const answer = label(ASSET_ANSWERS, body.hasDomain)
  const name = body.domainName?.trim()
  if (body.hasDomain === 'yes' && name) return `${answer} — ${name}`
  return answer
}

function buildPlainText(body: WebFormPayload, name: string, email: string, description: string, websiteType: string, referenceUrls: string[]): string {
  const lines = [
    'New Website Request',
    'Submitted via denisjanuzi.dev/webform',
    '',
    '--- Contact ---',
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone?.trim() ? `Phone: ${body.phone.trim()}` : '',
    body.company?.trim() ? `Company: ${body.company.trim()}` : '',
    '',
    '--- Project ---',
    `Website Type: ${label(WEBSITE_TYPES, websiteType)}`,
    '',
    'Description:',
    description,
    body.features?.trim() ? `\nFeatures / Pages:\n${body.features.trim()}` : '',
    referenceUrls.length ? `\nWebsite References:\n${referenceUrls.join('\n')}` : '',
    '',
    '--- Brand & Content ---',
    body.colorNotes?.trim() ? `Preferred Colors:\n${body.colorNotes.trim()}` : '',
    label(ASSET_ANSWERS, body.hasLogo) ? `Business Logo: ${label(ASSET_ANSWERS, body.hasLogo)}` : '',
    label(ASSET_ANSWERS, body.hasPhotos) ? `Photos: ${label(ASSET_ANSWERS, body.hasPhotos)}` : '',
    label(ASSET_ANSWERS, body.hasVideos) ? `Videos: ${label(ASSET_ANSWERS, body.hasVideos)}` : '',
    label(ASSET_ANSWERS, body.hasText) ? `Text / Copy: ${label(ASSET_ANSWERS, body.hasText)}` : '',
    '',
    '--- Domain & Hosting ---',
    formatDomainAnswer(body) ? `Domain: ${formatDomainAnswer(body)}` : '',
    label(ASSET_ANSWERS, body.hasHosting) ? `Hosting: ${label(ASSET_ANSWERS, body.hasHosting)}` : '',
    '',
    '--- Budget & Timeline ---',
    label(BUDGETS, body.budget) ? `Budget: ${label(BUDGETS, body.budget)}` : '',
    label(TIMELINES, body.timeline) ? `Timeline: ${label(TIMELINES, body.timeline)}` : '',
    body.notes?.trim() ? `\nAdditional Notes:\n${body.notes.trim()}` : '',
  ]

  return lines.filter((line, index, all) => !(line === '' && all[index - 1] === '')).join('\n')
}

function buildHtml(body: WebFormPayload, name: string, email: string, description: string, websiteType: string, referenceUrls: string[]): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#0F172A;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:#1E293B;border-radius:12px;overflow:hidden;border:1px solid #334155;">
        <div style="background:#3B82F6;padding:24px;">
          <h1 style="margin:0;color:#fff;font-size:20px;">New Website Request</h1>
          <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;">Submitted via denisjanuzi.dev/webform</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('Phone', body.phone?.trim() || '')}
          ${row('Company', body.company?.trim() || '')}
        </table>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #334155;">
          ${row('Website Type', label(WEBSITE_TYPES, websiteType))}
          ${row('Budget', label(BUDGETS, body.budget))}
          ${row('Timeline', label(TIMELINES, body.timeline))}
        </table>
        ${block('Project Description', description)}
        ${body.features?.trim() ? block('Features / Pages Needed', body.features.trim()) : ''}
        ${listBlock('Website References', referenceUrls)}
        ${body.colorNotes?.trim() ? block('Preferred Colors', body.colorNotes.trim()) : ''}
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #334155;">
          ${row('Business Logo', label(ASSET_ANSWERS, body.hasLogo))}
          ${row('Photos', label(ASSET_ANSWERS, body.hasPhotos))}
          ${row('Videos', label(ASSET_ANSWERS, body.hasVideos))}
          ${row('Text / Copy', label(ASSET_ANSWERS, body.hasText))}
        </table>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #334155;">
          ${row('Domain Name', formatDomainAnswer(body))}
          ${row('Hosting', label(ASSET_ANSWERS, body.hasHosting))}
        </table>
        ${body.notes?.trim() ? block('Additional Notes', body.notes.trim()) : ''}
      </div>
    </div>
  `
}

async function sendViaGmail(options: {
  to: string
  replyTo: string
  subject: string
  html: string
  text: string
}): Promise<void> {
  const user = process.env.GMAIL_USER || process.env.CONTACT_EMAIL
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error('Gmail SMTP is not configured')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"Portfolio Website Form" <${user}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
}

async function sendViaResend(options: {
  to: string
  replyTo: string
  subject: string
  html: string
  text: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM || 'Portfolio Form <onboarding@resend.dev>'

  if (!apiKey) {
    throw new Error('Resend is not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [options.to],
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('Resend error:', errorData)
    throw new Error('Resend rejected the email')
  }
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

  const referenceUrls = (body.websiteReferences?.length
    ? body.websiteReferences
    : body.existingWebsite?.trim()
      ? [body.existingWebsite.trim()]
      : []
  ).map((url) => url.trim()).filter(Boolean)

  const toEmail = process.env.CONTACT_EMAIL || 'denisjanuzi@gmail.com'
  const html = buildHtml(body, name, email, description, websiteType, referenceUrls)
  const text = buildPlainText(body, name, email, description, websiteType, referenceUrls)
  const subject = `Website Request: ${name}${body.company?.trim() ? ` (${body.company.trim()})` : ''}`
  const mailOptions = { to: toEmail, replyTo: email, subject, html, text }

  const hasGmail = Boolean((process.env.GMAIL_USER || toEmail) && process.env.GMAIL_APP_PASSWORD)
  const hasResend = Boolean(process.env.RESEND_API_KEY)

  if (!hasGmail && !hasResend) {
    console.error('No email provider configured (GMAIL_APP_PASSWORD or RESEND_API_KEY required)')
    return res.status(500).json({ error: 'Email service is not configured. Please try again later.' })
  }

  try {
    if (hasGmail) {
      await sendViaGmail(mailOptions)
    } else {
      await sendViaResend(mailOptions)
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    if (hasGmail && hasResend) {
      try {
        await sendViaResend(mailOptions)
        return res.status(200).json({ success: true })
      } catch (fallbackError) {
        console.error('Resend fallback error:', fallbackError)
      }
    }

    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send your request. Please try again or email directly.' })
  }
}
