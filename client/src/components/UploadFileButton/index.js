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

const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#ffffff"
      },
      primary: {
        main: "#000000",
        // contrastText: "#ffffff"
      },
      secondary: {
        main: "#ffffff",
      },
      warning:{
        main: "#880808"
      },
      textColor: {
        main: "#ffffff"
      }
    },
  });  

  const styles = theme => ({
    button: {
      padding: 10,
      color: theme.palette.primary.main
    },
    });

function UploadFileButton(props) {
    const { classes, onClick, style, variant } = props;

    return (
      <MuiThemeProvider theme={theme}>
        <Button variant={variant} style={style} component="label">Upload File
        <input
            onChange={onClick}
            type="file"
            hidden
        />
        </Button>
    </MuiThemeProvider>
    );
  }

  export default withStyles(styles)(UploadFileButton);