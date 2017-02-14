import {
  Platform,
} from 'react-native';

// generate required css
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
console.warn('in fonts');
if (Platform.OS === 'web') {
  const RNVectorIconsRequiredStyles = `@font-face { src:url(${materialIcons});`
    + 'font-family: MaterialIcons; }';

  // create stylesheet
  console.warn('adding stylesheet');
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
  console.warn('adding stylesheet 2');
    style.styleSheet.cssText = RNVectorIconsRequiredStyles;
  }
  else {
  console.warn('adding stylesheet 3');
    style.appendChild(document.createTextNode(RNVectorIconsRequiredStyles));
  }

  // inject stylesheet
  document.head.appendChild(style);
}
