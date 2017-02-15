// generate required css
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

const RNVectorIconsRequiredStyles = `@font-face { src:url(${materialIcons});`
  + 'font-family: "Material Icons"; }';

// create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = RNVectorIconsRequiredStyles;
}
else {
  style.appendChild(document.createTextNode(RNVectorIconsRequiredStyles));
}

// inject stylesheet
document.head.appendChild(style);
