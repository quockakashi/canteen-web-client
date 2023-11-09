import { alpha } from "@mui/material";

const { blue } = require("@mui/material/colors")

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const primary = {
    lighter: "#dbceff",
    light: "##b79cff",
    main: "#8E33FF",
    dark: "#4d28b3",
    contrastText: '#ffffff',
};

export const secondary = {
    lighter: "#ffe8e7",
    light: "#ffd2cf",
    main: "#ffa69e",
    dark: "#b3736f",
    contrastText: '#ffffff',
};

export const blue = {
    lighter: "#dff8ff",
    light: "#c0f1ff",
    main: "#21b0fe",
    dark: "#5a9fb2",
    contrastText: "#ffffff",
};

export const info = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  };
  
  export const success = {
    lighter: '#C8FAD6',
    light: '#5BE49B',
    main: '#00A76F',
    dark: '#007867',
    darker: '#004B50',
    contrastText: '#FFFFFF',
  };
  
  export const warning = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: grey[800],
  };
  
  export const error = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  };
  
  export const common = {
    black: '#000000',
    white: '#FFFFFF',
  };

  export const action = {
    selected: alpha("#ffa69e", 0.7),
  }


export default paletteSettings = () => {
  return {
    palette: {
      mode: 'light',
      primary,
      secondary,
      blue,
      success,
      error,
      info,
      warning,
      text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[500],
      },
      background: {
        paper: '#FFFFFF',
        default: grey[100],
        neutral: grey[200],
      },
    }
  }
}
