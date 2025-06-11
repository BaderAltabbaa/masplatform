import { createTheme } from '@mui/material/styles';

// assets
import colors from '../../public/assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography.jsx';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption),
      custom: {
PageBackGround :" #370035", //Main Background

CarBackGround :"linear-gradient(to top right, #9e14a5, #4d0051)", //Main Cards

secCardBackGround: "linear-gradient(135deg, #4d0051 0%,rgba(255, 255, 255, 0.58) 100%)", //Secondary Cards

miniUserCard:" #8033a1", //Mini userCard

mainButton: " #4d0051", //Main Button

hoverMainButton: " #700076", //hover main button

gradientButton: "linear-gradient(to bottom right, #760072, #2d013a)", //Gradient Button

hoverGradientButton: "linear-gradient(to bottom right, #2d013a,#d300cc)", //hover mode
    
    // Button With Animation
buttonContainer:" #581454",

animatedBackground:"conic-gradient(transparent 270deg, #c401da, transparent)",

innerBlurEffect:" #5121619c",
    // Button With Animation


  },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
