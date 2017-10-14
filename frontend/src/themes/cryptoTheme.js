import { merge } from 'lodash';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
const colors = require('material-ui/styles/colors');

const cryptoColors = {
  sapphire: '#052564',
  lochmara: '#2065A2',
  bondi: '#0284BE',
  pacific: '#019DCA',
  rock: '#8E98AF',
  turquoise: '#1AE1EE',
};

let theme = {
  borderRadius: 2,
  fontFamily: 'Rajdhani, sans-serif',
  palette: {
    textColor: colors.white,
    alternateTextColor: colors.cyanA100,
    canvasColor: cryptoColors.lochmara,
    primary1Color: colors.cyanA100,
    primary2Color: colors.green200,
    primary3Color: colors.green200,
    accent1Color: colors.green200,
    accent2Color: colors.green200,
    accent3Color: colors.green200,
  },
  appBar: {
    color: cryptoColors.sapphire,
    height: 100,
  }
};

theme = merge({}, darkBaseTheme, theme);

export default theme;