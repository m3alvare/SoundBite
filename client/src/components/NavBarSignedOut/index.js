import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { MuiThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png'
import { Stack } from '@mui/material';

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

  const styles = theme => ({
    rootContainer: {
      flexDirection: "row",
    },
    AppBar: {
      position: 'static',
      // backgroundcolor: theme.palette.background.default,
    },
    leftContainer: {
      // flex: 1,
      alignItems: "left",
      justifyContent: "center",
    },
    middleContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    rightContainer: {
      // flex: 1,
      alignItems: "right",
      justifyContent: "center",
    },
    button: {
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      color: theme.palette.text.blue,
      // backgroundColor: theme.palette.text.tertiary
      // backgroundColor: "#6DC2FF"
    },

    logo:{
      // position: "relative",
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
    },

    buttonDiv: {
      alignItems:  'center'
    },

    title: {
      // marginRight: 15,
      color: theme.palette.text.primary
    }
  })

function ButtonAppBar(props) {
    const { classes, onClickLogo } = props;

    return (
      <MuiThemeProvider theme={theme}>
      <Box className={classes.rootContainer}>
          <AppBar className={classes.AppBar}>
            <Toolbar>
                <Box className={classes.leftContainer} >
                  <Stack direction="row" alignItems="center">
                    <Link to={ROUTES.LANDING} display='inline-block'>
                        <img src={logo} alt="logo" className={classes.logo} height={"55vh"} width={"auto"}/>
                      </Link>
                      <Link to={ROUTES.LANDING} style={{ textDecoration: 'none' }}>
                        <Typography variant="h5" className={classes.title}>
                          SoundBite
                        </Typography>
                      </Link>
                  </Stack>
                </Box>
                <Box className={classes.middleContainer}>
              </Box>
              <Box className={classes.rightContainer}>
                  <Link to={ROUTES.SIGN_IN} style={{ textDecoration: 'none'}}>
                      <Button className={classes.button} ><b>Sign In</b></Button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP} style={{ textDecoration: 'none'}}>
                      <Button variant="contained" className={classes.button}><b>Sign Up</b></Button>
                  </Link>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
    </MuiThemeProvider>
    );
  }

  export default withStyles(styles)(ButtonAppBar);