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
  languages?: string | string[]
  socialLinks?: string | string[]
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
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;width:160px;vertical-align:top;line-height:1.5;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-family:Arial,Helvetica,sans-serif;font-size:14px;vertical-align:top;line-height:1.6;">${escapeHtml(value)}</td>
    </tr>
  `
}

function emailRow(label: string, value: string): string {
  if (!value?.trim()) return ''
  const safe = escapeHtml(value)
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;width:160px;vertical-align:top;line-height:1.5;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:14px;vertical-align:top;line-height:1.6;">
        <a href="mailto:${safe}" style="color:#2563eb;text-decoration:none;font-weight:600;">${safe}</a>
      </td>
    </tr>
  `
}

function sectionHeader(title: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:14px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#334155;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${title}</td>
    </tr>
  `
}

function textSection(title: string, content: string): string {
  if (!content.trim()) return ''
  return `
    <tr>
      <td colspan="2" style="padding:0;border-bottom:1px solid #e2e8f0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${sectionHeader(title)}
          <tr>
            <td style="padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${escapeHtml(content)}</td>
          </tr>
        </table>
      </td>
    </tr>
  `
}

function linkListSection(title: string, items: string[]): string {
  if (!items.length) return ''
  const links = items.map((item) => {
    const safe = escapeHtml(item)
    return `<a href="${safe}" style="color:#2563eb;text-decoration:none;word-break:break-all;">${safe}</a>`
  }).join('<br style="line-height:1.8;">')

  return `
    <tr>
      <td colspan="2" style="padding:0;border-bottom:1px solid #e2e8f0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${sectionHeader(title)}
          <tr>
            <td style="padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.8;color:#334155;">${links}</td>
          </tr>
        </table>
      </td>
    </tr>
  `
}

function dataTable(rows: string): string {
  if (!rows.trim()) return ''
  return `
    <tr>
      <td colspan="2" style="padding:0;border-bottom:1px solid #e2e8f0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${rows}
        </table>
      </td>
    </tr>
  `
}

function dataTableSection(title: string, rowsHtml: string): string {
  if (!rowsHtml.trim()) return ''
  return dataTable(sectionHeader(title) + rowsHtml)
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

function normalizeList(value?: string | string[]): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean)
  if (value?.trim()) return [value.trim()]
  return []
}

function formatDomainAnswer(body: WebFormPayload): string {
  const answer = label(ASSET_ANSWERS, body.hasDomain)
  const name = body.domainName?.trim()
  if (body.hasDomain === 'yes' && name) return `${answer} — ${name}`
  return answer
}

function buildPlainText(body: WebFormPayload, name: string, email: string, description: string, websiteType: string, referenceUrls: string[], languages: string[], socialLinks: string[]): string {
  const lines = [
    'New Website Quote',
    'Submitted via denisjanuzi.com/webform',
    '',
    '--- Contact ---',
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone?.trim() ? `Phone: ${body.phone.trim()}` : '',
    body.company?.trim() ? `Company: ${body.company.trim()}` : '',
    socialLinks.length ? `\nSocial Links:\n${socialLinks.join('\n')}` : '',
    '',
    '--- Project ---',
    `Website Type: ${label(WEBSITE_TYPES, websiteType)}`,
    '',
    'Description:',
    description,
    body.features?.trim() ? `\nFeatures / Pages:\n${body.features.trim()}` : '',
    languages.length ? `Languages: ${languages.join(', ')}` : '',
    '',
    '--- Design & Content ---',
    referenceUrls.length ? `Website References:\n${referenceUrls.join('\n')}` : '',
    body.colorNotes?.trim() ? `\nPreferred Colors:\n${body.colorNotes.trim()}` : '',
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

function buildHtml(body: WebFormPayload, name: string, email: string, description: string, websiteType: string, referenceUrls: string[], languages: string[], socialLinks: string[]): string {
  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  })

  const contactRows = [
    row('Name', name),
    emailRow('Email', email),
    row('Phone', body.phone?.trim() || ''),
    row('Company', body.company?.trim() || ''),
  ].join('')

  const projectRows = [
    row('Website type', label(WEBSITE_TYPES, websiteType)),
    row('Languages', languages.join(', ')),
  ].join('')

  const contentRows = [
    row('Preferred colors', body.colorNotes?.trim() || ''),
    row('Business logo', label(ASSET_ANSWERS, body.hasLogo)),
    row('Photos', label(ASSET_ANSWERS, body.hasPhotos)),
    row('Videos', label(ASSET_ANSWERS, body.hasVideos)),
    row('Text / copy', label(ASSET_ANSWERS, body.hasText)),
  ].join('')

  const budgetRows = [
    row('Budget', label(BUDGETS, body.budget)),
    row('Timeline', label(TIMELINES, body.timeline)),
  ].join('')

  const hostingRows = [
    row('Domain name', formatDomainAnswer(body)),
    row('Hosting', label(ASSET_ANSWERS, body.hasHosting)),
  ].join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Quote</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:28px 24px;background-color:#1e293b;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#93c5fd;">New lead</p>
              <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.3;font-weight:700;color:#ffffff;">Website Quote</h1>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#cbd5e1;">${escapeHtml(name)}${body.company?.trim() ? ` · ${escapeHtml(body.company.trim())}` : ''}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background-color:#eff6ff;border-bottom:1px solid #dbeafe;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#1e40af;">
                Reply directly to this email to contact the client at
                <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;font-weight:700;text-decoration:none;">${escapeHtml(email)}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${dataTableSection('Contact details', contactRows)}
                ${linkListSection('Social links', socialLinks)}
                ${dataTableSection('Your website', projectRows)}
                ${textSection('Project description', description)}
                ${body.features?.trim() ? textSection('Pages & features', body.features.trim()) : ''}
                ${linkListSection('Website references', referenceUrls)}
                ${dataTableSection('Design & content', contentRows)}
                ${dataTableSection('Domain & hosting', hostingRows)}
                ${dataTableSection('Budget & timeline', budgetRows)}
                ${body.notes?.trim() ? textSection('Additional notes', body.notes.trim()) : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#64748b;">Submitted via denisjanuzi.com/webform</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#94a3b8;">${submittedAt} (Europe/Berlin)</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
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

  if (!referenceUrls.length) {
    return res.status(400).json({ error: 'Please add at least one website reference.' })
  }

  const languages = normalizeList(body.languages)
  const socialLinks = normalizeList(body.socialLinks)
  const toEmail = process.env.CONTACT_EMAIL || 'denisjanuzi@gmail.com'
  const html = buildHtml(body, name, email, description, websiteType, referenceUrls, languages, socialLinks)
  const text = buildPlainText(body, name, email, description, websiteType, referenceUrls, languages, socialLinks)
  const subject = `Website Quote: ${name}${body.company?.trim() ? ` (${body.company.trim()})` : ''}`
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
