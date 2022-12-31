import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './translation/ko.json';
import en from './translation/en.json';

const resources = {
  ko: {
    translation: ko
  },
  en: {
    translation: en
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "ko",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });