import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locale_sv from './locales/sv/modules.json';
import locale_en from './locales/en/modules.json'

/* Custom imports start */

// Example:
import custom_locale_en from './locales/en/custom.json';
import custom_locale_sv from './locales/sv/custom.json';

/* Custom imports end */

let en = locale_en;
let sv = locale_sv;
let namespaces = ['common'];

/* Custom modding of locales start */

// Example:
en = {
  ...locale_en,
  ...custom_locale_en
}

sv = {
  ...locale_sv,
  ...custom_locale_sv
}


namespaces = [  ...namespaces, 'custom' ]

/* Custom modding of locales end */ 

const detectorOptions = {
    // for all options visit: https://github.com/i18next/i18next-browser-languageDetector

    // order and from where user language should be detected
    order: ['navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
}


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    detection: detectorOptions,
    resources: {
      sv: sv,
      en: en
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    ns: namespaces,
    defaultNS: 'custom',
    fallbackNS: 'common',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;