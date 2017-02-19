// Translations
import './I18n';

/**
 * Web only libs
 */
// enable icons fonts
import './fonts';

// enable offline support on web platform
if (process.env.NODE_ENV === 'production') {
  require('./pwa');
}
