import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
      background: {
        default: '#e3e3e3',
      },
      text: {
        black: '#000000',
        white: '#FFFFFF', 
        blue: '#6DC2FF',
        grey: '#808080'
      },
      primary: {
        main: '#6DC2FF',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#808080',
        contrastText: '#6DC2FF'
      },
    },
  });

  export default theme;