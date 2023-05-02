import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, TextField, FormControl, Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { MuiThemeProvider, createTheme, useTheme } from "@material-ui/core/styles";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../../components/NavBar';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../Firebase/firebase';
import { useHistory } from 'react-router-dom';
import theme from "../../../constants/theme";
import { useDispatch } from 'react-redux'
import { setUserID } from '../../../Redux/userSlice'

const serverURL = ""
const fetch = require("node-fetch");

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

function SignUp(props) {
    const { classes } = props;
    const history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPass, setConfirmPass] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [sbOpen, setSbOpen] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("An Error occured")

    const auth = getAuth(app);

    const callApiLoadUserSettings = async (firebaseUID, username, email) => {
      const url = serverURL + "/api/loadUserSettings";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          firebaseUID: firebaseUID,
          username: username,
          email: email
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("User settings: ", body);
      return body;
    }

    const handleClickSubmit = () => {
      if (password !== confirmPass || password.length == 0 || email.length == 0 || confirmPass.length == 0 || username.length == 0) {
        setErrorMessage("Please check your inputs are non-empty and passwords match")
        setSbOpen(true)
      }
      else{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          callApiLoadUserSettings(user.uid, username, email)
          localStorage.setItem('user', user.uid)
          history.push("/")
          dispatch(setUserID(user.uid))
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

    const handleChangeUser = (event) => {
      setUsername(event.target.value)
    }

    const handleChangeEmail = (event) => {
      setEmail(event.target.value)
    }

    const handleChangePass = (event) => {
      setPassword(event.target.value)
    }

    const handleChangeConfPass = (event) => {
      setConfirmPass(event.target.value)
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
                        Create an Account!
            </Typography>
          </Box>
          <Box
          align="center"
          justify="center">
            <FormControl variant="filled"
            alignitems="center" justify="center" className={classes.formContainer}>
                <TextField className={classes.textField} value={username} id="username" label="Username" variant="outlined" onChange={handleChangeUser}/>
                <TextField className={classes.textField} value={email} id="email" label="Email" variant="outlined" onChange={handleChangeEmail}/>
                <TextField className={classes.textField} value={password} type="password" id="password" label="Password" variant="outlined" onChange={handleChangePass}/>
                <TextField className={classes.textField} value={confirmPass} type="password" id="confirmPassword" label="Confirm Password" variant="outlined" onChange={handleChangeConfPass}/>
                <Button className={classes.button} onClick={handleClickSubmit} color="primary" variant="contained" >Sign Up!</Button>
            </FormControl>
            <Snackbar open={sbOpen} onClose={handleClose} autoHideDuration={10000}>
              <MuiAlert severity="error">{errorMessage}</MuiAlert>
            </Snackbar>
          </Box>
    </MuiThemeProvider>
    );
  }

  export default withStyles(styles)(SignUp);
