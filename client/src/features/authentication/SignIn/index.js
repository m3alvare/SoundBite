import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, TextField, FormControl, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { MuiThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import * as ROUTES from '../../../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../../components/NavBar';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebase"
import { useHistory } from 'react-router-dom';
import theme from "../../../constants/theme";
import { useDispatch } from 'react-redux'
import { setUserID } from '../../../Redux/userSlice'


// const theme = createTheme({
//   palette: {
//     type: 'light',
//     background: {
//       default: "#ffffff"
//     },
//     primary: {
//       main: "#6DC2FF",
//       contrastText: "#ffffff"
//     },
//     secondary: {
//       main: "#808080",
//     },
//   },
// });

  const serverURL = ""

  const styles = theme => ({
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      padding: 10,
      marginTop: 10,
      width: "40%",
      borderRadius: 15,
    },

    buttonDiv: {
      alignItems:  'center'
    },
    textField: {
      marginTop: 10,
      marginBottom: 5,
      width: "75%",
      [`& fieldset`]: {
        borderRadius: 15,
      }
    },
    titleContainer: {
      marginTop: "5vh",
      marginBottom: 10,
    },
    formContainer: {
      width: "40%",
      alignItems: 'center',
    }
  })

function SignIn(props) {
    const { classes } = props;
    const history = useHistory()
    const dispatch = useDispatch()

    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [sbOpen, setSbOpen] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("An Error occured")

    const auth = getAuth(app);

    const handleClickSubmit = async () => {
      if (password.length == 0 || email.length == 0) {
        setErrorMessage("Please check your inputs are non-empty")
        setSbOpen(true)
      }
      else{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem('user', user.uid)
          dispatch(setUserID(user.uid));
          history.push("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode)
          console.log("shit didn't worked")
          setSbOpen(true)
          setErrorMessage(errorMessage)
        });
      }
    }

    const handleClose = () => {
      setSbOpen(false)
    }

    const handleChangeEmail = (event) => {
      setEmail(event.target.value)
    }

    const handleChangePass = (event) => {
      setPassword(event.target.value)
    }

    return (
      <MuiThemeProvider theme={theme}>
          <NavBar/>
          <Box 
            align="center"
            justify="center"
            className={classes.titleContainer}
            >
            <Typography variant="h3" component="div" color="primary" className={classes.title}>
                        SoundBite
            </Typography>
            <Typography variant="h6" component="div" color="secondary" className={classes.title}>
                        Sign In to Your Account!
            </Typography>
          </Box>
          <Box
          align="center"
          justify="center">
            <FormControl variant="filled"
            alignitems="center" justify="center" className={classes.formContainer}>
                <TextField className={classes.textField} id="email" label="Email" variant="outlined" onChange={handleChangeEmail}/>
                <TextField className={classes.textField} id="password" type="password" label="Password" variant="outlined" onChange={handleChangePass} />
                <Button className={classes.button} onClick={handleClickSubmit} color="primary" variant="contained" >Sign In!</Button>
            </FormControl>
            <Snackbar open={sbOpen} onClose={handleClose} autoHideDuration={10000}>
              <MuiAlert severity="error">{errorMessage}</MuiAlert>
            </Snackbar>
          </Box>
    </MuiThemeProvider>
    );
  }

  export default withStyles(styles)(SignIn);
