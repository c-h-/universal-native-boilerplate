import I18n from 'react-native-i18n';

import translations from '../translations.json';

if (typeof navigator === 'object' && navigator) {
  const locale = navigator.userLanguage
    || navigator.language
    || navigator.browserLanguage
    || navigator.systemLanguage;
  if (locale) {
    I18n.locale = locale;
  }
}

I18n.fallbacks = true;
I18n.translations = translations;
