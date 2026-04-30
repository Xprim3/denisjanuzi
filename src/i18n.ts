import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import sq from './locales/sq.json'
import hr from './locales/hr.json'

const messages = {
  en,
  de,
  sq,
  hr
}

// Get saved language from localStorage or default to browser language
const getDefaultLocale = () => {
  const saved = localStorage.getItem('locale')
  if (saved && (saved === 'en' || saved === 'de' || saved === 'sq' || saved === 'hr')) {
    return saved
  }
  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'de') return 'de'
  if (browserLang === 'sq') return 'sq'
  if (browserLang === 'hr') return 'hr'
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
