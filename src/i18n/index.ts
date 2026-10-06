import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

export const languages = [{ code: 'en', label: 'English' }, { code: 'de', label: 'Deutsch' }] as const
const translations = import.meta.glob<{ default: Record<string, unknown> }>('./locales/*/*.json')

export const i18nReady = i18n
  .use(LanguageDetector)
  .use(resourcesToBackend(async (language: string, namespace: string) => {
    const load = translations[`./locales/${language}/${namespace}.json`]
    if (!load) throw new Error(`Missing translation: ${language}/${namespace}`)
    return (await load()).default
  }))
  .use(initReactI18next)
  .init({
    supportedLngs: languages.map(({ code }) => code),
    fallbackLng: 'en', load: 'languageOnly',
    ns: ['common'], defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
  document.documentElement.dir = i18n.dir(language)
})

export default i18n
