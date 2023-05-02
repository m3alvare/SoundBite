import * as React from 'react';
import { MuiThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import NavBarSignedIn from '../NavBarSignedIn';
import { useSelector, } from 'react-redux'
import NavBarSignedOut from '../NavBarSignedOut';
import { Typography } from '@material-ui/core';

const theme = createTheme({
  palette: {
    background: {
      default: '#e3e3e3',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF', 
      tertiary: '#6DC2FF',
    },
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#6DC2FF',
    },
  },
}); 

function ButtonAppBar(props) {
    const { classes, onClickLogo } = props;
    const userID = useSelector((state) => state.user.userID)


    return (
        userID ? <NavBarSignedIn onClckLogo={onClickLogo}/>
        : <NavBarSignedOut onClckLogo={onClickLogo}/>
    );
  }

  export default ButtonAppBar;