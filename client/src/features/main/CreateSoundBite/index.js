import React from 'react';
import useState from 'react';
import { Button, TextField, FormControl, Typography, Box, Grid, Snackbar } from '@material-ui/core';
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Configuration, OpenAIApi } from "openai";
import { env } from 'process';
import {format} from 'date-fns';
import UploadFileButton from '../../../components/UploadFileButton';
import NavBar from '../../../components/NavBar';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import theme from "../../../constants/theme";
import ShowForm from '../../../components/ShowForm';
import CreateSoundBiteButton from '../../../components/CreateSoundBiteButton';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';

const opacityValue = 0.9;

  const styles = theme => ({
    root: {
      body: {
        backgroundColor: "#000000",
        opacity: opacityValue,
        overflow: "hidden",
      },
    },

    pageContainer: {
      // backgroundColor: theme.palette.background.default,
    },
    
    mainMessage: {
      opacity: opacityValue,
    },
    textField: {
      marginTop: "25px",
      marginBottom: "25px",
      width: "75%",
      [`& fieldset`]: {
        borderRadius: 15,
      }
    },
    mainMessageContainer: {
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
    imputs: {
      marginTop: "25px", 
      marginLeft: "25px",
    }  
  });

                  
function CreateSoundBite(props) {
  const { classes } = props;
  const [showForm, setShowForm] = React.useState(false);
  const [sbOpen, setSbOpen] = React.useState(false)
    
  const handleClickForm = () => {
    setShowForm(true);
    }

    const onClickAway = () => {
      setShowForm(false)
    }

    const SaveSoundBite = () => {
      setShowForm(false)
      setSbOpen(true)
    }
    
    const handleClose = () => {
      setSbOpen(false)
    }
      
    return (    
      <div>
        <MuiThemeProvider theme={theme}>
            <Box sx={{bgcolor: 'background.default', minHeight: '100vh'}}>
              <NavBar/>
              <Typography variant="h3" color="primary" noWrap style={{"marginTop": "25px", "textAlign":"center", "marginLeft": "0px"}}>
                Generate a SoundBite
              </Typography>
              <Box textAlign='center'>
                <CreateSoundBiteButton Button variant="contained" style={{"marginTop": "25px"}} onClick={handleClickForm}/>
              </Box>
              <Modal
                open={showForm}
                onClose={onClickAway}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box textAlign='center' sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', bgcolor: 'background.paper', border: '4px solid' + theme.palette.primary.main, boxShadow: 24, p: 4, borderRadius: 20}}>
                <ShowForm closeModal={SaveSoundBite}/>
              </Box>
              </Modal>
              <Snackbar open={sbOpen} onClose={handleClose} autoHideDuration={10000}>
                <MuiAlert severity="success">Saved Soundbite Successfully</MuiAlert>
              </Snackbar>
            </Box>
        </MuiThemeProvider>
      </div>
    );
}
export default withStyles(styles)(CreateSoundBite)