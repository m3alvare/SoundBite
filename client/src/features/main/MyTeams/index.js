import React from 'react';
import useState from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import theme from "../../../constants/theme";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Configuration, OpenAIApi } from "openai";
import { env } from 'process';
import Team from '../../../components/Team';
import {format} from 'date-fns';
import TeamForm from '../../../components/TeamForm';
import CreateTeamButton from '../../../components/CreateTeamButton';
import NavBar from '../../../components/NavBar';
import { useSelector, } from 'react-redux'

const serverURL = ""

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

                  
function MyTeams() {
  const [showForm, setShowForm] = React.useState(false);
  const [teamsComponent, setTeamsComponent] = React.useState([]);
  const firebaseUserID = useSelector((state) => state.user.userID)
  const [userID, setUserID] = React.useState("")

  React.useEffect(() => {
    getUserID();

  }, []);

  React.useEffect(() => {
    getTeams();
    console.log(userID + "this is user Id")
  }, [userID]);


  const getUserID = () => {
    callApiGetUserID()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setUserID(parsed[0]["userID"]);
      })
  }
  const getTeams = () => {
    setTeamsComponent([]);
    callApiGetTeams()
      .then(res => {
        var parsed = JSON.parse(res.express);
        const newTeamsComponent = parsed.map((team, index) => ( ///USER ID WHO is signed in
          <div key={index}>
            <Team teamID={team.teamID} getTeams={getTeams} newTeam={handleNewTeam} userID={userID}/> 
          </div>
        ));
        setTeamsComponent(newTeamsComponent);
        console.log(newTeamsComponent)
      })
  }
  const callApiGetTeams = async () => {
    const url = serverURL + "/api/GetTeams";  
    const res = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID                   //To Do, this value needs to be set to the userID of the user who is logged in
        })
      });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiGetUserID = async () => {
    const url = serverURL + "/api/GetUserID";  
    const res = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUserID: firebaseUserID                 //To Do, this value needs to be set to the userID of the user who is logged in
        })
      });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const handleNewTeam = () => {
    setShowForm(false);
    getTeams();
  }

    const handleClickTeam = () => {
      setShowForm(true);
    }

    const removeForm = () => {
        setShowForm(false);
    }

    return ( 
      <div>
        <MuiThemeProvider theme={theme}>
          <Box sx={{bgcolor: 'background.default', minHeight: '100vh'}} >
              <NavBar/>
                <Box
                    display='flex'
                    justifyContent="center"
                    alignItems="center"
                    sx={{ flexDirection: 'column' }}
                  >
                  <Typography variant="h3" color="primary" style={{"margin-top": "25px", textAlign: 'center'}}>
                      My Teams page 
                  </Typography>
                  <Box>
                  {
                    showForm
                    ? <TeamForm removeForm={removeForm} newTeam={handleNewTeam} UserArray={[userID]}/> ///USERID of Logged IN
                    : <CreateTeamButton variant="contained" color="inherit" onClick={handleClickTeam} style={{"margin-top": "25px", "margin-left": "25px"}}></CreateTeamButton>
                  }
                  </Box>
                  {teamsComponent}
                </Box>
          </Box>
        </MuiThemeProvider>
      </div>
    );
}
export default withStyles(styles)(MyTeams);