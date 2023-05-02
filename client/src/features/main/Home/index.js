// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import NavBar from '../../../components/NavBar';
// import Button from '@material-ui/core/Button'


// //Dev mode
// const serverURL = ""; //enable for dev mode

// //Deployment mode instructions
// //const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
// //To find your port number: 
// //ssh to ov-research-4.uwaterloo.ca and run the following command: 
// //env | grep "PORT"
// //copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

// const fetch = require("node-fetch");

// const opacityValue = 0.9;

// const theme = createTheme({
//   palette: {
//     type: 'light',
//     background: {
//       default: "#ffffff"
//     },
//     primary: {
//       main: "#6DC2FF",
//     },
//     secondary: {
//       main: "#b552f7",
//     },
//   },
// });

// const styles = theme => ({
//   root: {
//     body: {
//       backgroundColor: "#000000",
//       opacity: opacityValue,
//       overflow: "hidden",
//     },
//   },
  
//   mainMessage: {
//     opacity: opacityValue,
//   },

//   mainMessageContainer: {
//     marginTop: "20vh",
//     marginLeft: theme.spacing(20),
//     [theme.breakpoints.down('xs')]: {
//       marginLeft: theme.spacing(4),
//     },
//   },
//   paper: {
//     overflow: "hidden",
//   },
//   message: {
//     opacity: opacityValue,
//     maxWidth: 250,
//     paddingBottom: theme.spacing(2),
//   },

// });


// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userID: 1,
//       mode: 0
//     }
//   };

//   componentDidMount() {
//     //this.loadUserSettings();
//   }

//   loadUserSettings() {
//     this.callApiLoadUserSettings()
//       .then(res => {
//         //console.log("loadUserSettings returned: ", res)
//         var parsed = JSON.parse(res.express);
//         console.log("loadUserSettings parsed: ", parsed[0].mode)
//         this.setState({ mode: parsed[0].mode });
//       });
//   }

//   callApiSpeechToText = async () => {
//     const url = serverURL + "/api/speechToText";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//       }),
//       file: "audio77.flac"
//     });
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);
//     console.log("User settings: ", body);
//     return body;
//   }

//   handleClick = () => {
//     this.callApiSpeechToText()
//   }

//   render() {
//     const { classes } = this.props;

//     const mainMessage = (
//       <Grid
//         container
//         spacing={0}
//         direction="column"
//         justify="flex-start"
//         alignItems="flex-start"
//         style={{ minHeight: '100vh' }}
//         className={classes.mainMessageContainer}
//       >
//         <Grid item>

//           <Typography
//             variant={"h3"}
//             className={classes.mainMessage}
//             align="flex-start"
//           >
//             {this.state.mode === 0 ? (
//               <React.Fragment>
//                 Welcome to MSci245! Calum was here, so was Mateo, and jacky boy and donno
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 Welcome back!
//               </React.Fragment>
//             )}
//           </Typography>

//         </Grid>
//       </Grid>
//     )


//     return (
//       <MuiThemeProvider theme={theme}>
//         <div className={classes.root}>
//           <CssBaseline />
//           <NavBar/>
//           <Paper
//             className={classes.paper}
//           >
//             {mainMessage}
//           </Paper>
//           <Button onClick={this.handleClick}>
//             Speech to text
//           </Button>
//           {/* <Typography>{SpeechToText}<Typography/> */}
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// Home.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Home);

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';
import NavBar from '../../../components/NavBar';
import UploadFileButton from '../../../components/UploadFileButton';

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
      main: "#6DC2FF",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

function Home(props) {
  const { classes } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    //loadUserSettings();
  }, []);

  

  const callApiSpeechToText = async () => {
    const url = serverURL + "/api/speechToText";
    let formData = new FormData();

    console.log(selectedFile)
    formData.append('file', selectedFile)

    console.log(formData)
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    setTranscription(body.transcription);
    return body;
  }

  const handleClick = async () => {
    console.log(selectedFile)
    callApiSpeechToText()
  }

  const handleUploadCLick = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar/>
        <Paper
          className={classes.paper}
        >
          <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
              <React.Fragment>
                Welcome to MSci245! Calum was here, so was Mateo, and jacky boy and donno
              </React.Fragment>
          </Typography>
          <Typography>
            {transcription}
          </Typography>
          <UploadFileButton onClick={handleUploadCLick}></UploadFileButton>
          <Button onClick={handleClick}>Go!</Button>
        </Grid>
      </Grid>
        </Paper>
        {/* <Typography>{SpeechToText}<Typography/> */}
      </div>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(Home);
