import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

const messages = {
  en,
  de
}

// Get saved language from localStorage or default to browser language
const getDefaultLocale = () => {
  const saved = localStorage.getItem('locale')
  if (saved && (saved === 'en' || saved === 'de')) {
    return saved
  }
  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'de' ? 'de' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
