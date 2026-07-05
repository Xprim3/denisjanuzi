const SITE_URL = 'https://denisjanuzi.com'

type PageMeta = {
  title: string
  description: string
  robots: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogImageAlt: string
}

const portfolioMeta: PageMeta = {
  title: 'Denis Januzi - Web Developer | Portfolio',
  description:
    'Web developer building clear, practical web experiences. Specializing in well-structured websites and web applications designed with simplicity, performance, and usability in mind. Based in Trier, Germany.',
  robots: 'index, follow',
  canonical: `${SITE_URL}/`,
  ogTitle: 'Denis Januzi - Web Developer | Portfolio',
  ogDescription:
    'Web developer building clear, practical web experiences. Specializing in well-structured websites and web applications designed with simplicity, performance, and usability in mind.',
  ogUrl: `${SITE_URL}/`,
  ogImageAlt: 'Denis Januzi - Web Developer Portfolio',
}

const webformMeta: PageMeta = {
  title: 'Website Quote | Denis Januzi',
  description:
    'Private quote form for website projects. Share what you need — Denis Januzi reviews each submission personally and responds within 1–2 days if the project is a good fit.',
  robots: 'noindex, nofollow',
  canonical: `${SITE_URL}/webform`,
  ogTitle: 'Get a Website Quote | Denis Januzi',
  ogDescription:
    'Share your website project details for review. Each submission is checked personally — you will hear back within 1–2 days if accepted.',
  ogUrl: `${SITE_URL}/webform`,
  ogImageAlt: 'Denis Januzi — Website Quote Form',
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function applyPageMeta(routeName: string | undefined) {
  const meta = routeName === 'webform' ? webformMeta : portfolioMeta

  document.title = meta.title
  setMeta('name', 'title', meta.title)
  setMeta('name', 'description', meta.description)
  setMeta('name', 'robots', meta.robots)
  setMeta('name', 'googlebot', meta.robots)
  setMeta('property', 'og:title', meta.ogTitle)
  setMeta('property', 'og:description', meta.ogDescription)
  setMeta('property', 'og:url', meta.ogUrl)
  setMeta('property', 'og:image:alt', meta.ogImageAlt)
  setMeta('name', 'twitter:title', meta.ogTitle)
  setMeta('name', 'twitter:description', meta.ogDescription)
  setMeta('name', 'twitter:url', meta.ogUrl)
  setMeta('name', 'twitter:image:alt', meta.ogImageAlt)
  setCanonical(meta.canonical)
}
