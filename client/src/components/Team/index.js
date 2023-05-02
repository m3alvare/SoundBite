import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TeamEditButton from '../TeamEditButton';
import TeamDeleteTeamButton from '../TeamDeleteTeamButton';
import TeamLeaveButton from '../TeamLeaveButton';
import TeamShareButton from '../TeamShareButton';
import SoundBiteGrid from '../SoundBiteGrid';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import TeamForm from '../TeamForm';
import MySoundBitesModal from '../MySoundBitesModal';
import { Modal, Button, Paper, Box } from '@material-ui/core';
import theme from '../../constants/theme';

const serverURL = ""
function GetTeamSoundBites(props){
  const serverURL = ""
  const callApiGetTeamSoundbites = async () => {
    console.log("TEAMIDDDD" + props.teamID);
    const url = serverURL + "/api/loadTeamSoundBites";
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: props.teamID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Team SoundBites: ", body.express);
    return body.express;
  }

  const { isLoading, error, data } = useQuery('TeamSoundBites'+ props.teamID, () =>
    callApiGetTeamSoundbites()
  )
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message
   return (
    <SoundBiteGrid key={"my SoundBites Grid"+ props.teamID}
      initData={data}
      filter={""}
    />
   )
}

function Team(props) {
    const [teamName, setTeamName] = React.useState("");
    const [teamMembers, setTeamMembers] = React.useState("");
    const [user, setUser] = React.useState("");     //**Not the user who is signed in */
    const [username, setUsername] = React.useState("");
    const [owner, setOwner] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        getTeamData();
        console.log(owner + "    sfd" + props.userID)
      }, []);

      const getTeamData = () => {
        getTeamName();
        getTeamMembers();
        getTeamOwner();
      }

      const getTeamName = () => {
        console.log(props.teamID);
        callApiGetTeamName()
          .then(res => {
            var parsed = JSON.parse(res.express);
            setTeamName(parsed[0]["team_name"]);
          })
      }

      const getTeamOwner = () => {
        console.log(props.teamID);
        callApiGetTeamOwner()
          .then(res => {
            var parsed = JSON.parse(res.express);
            setOwner(parsed[0]["team_owner"]);
          })
      }

      const getUser = () => {
        callApiGetUser()
          .then(res => {
            var parsed = JSON.parse(res.express);
            setUser(parsed[0]["userID"]);
          })
      }

      const leaveTeam = () => {
        callApiLeaveTeam()
          .then(res => {
              props.newTeam();
          })
      }

      const deleteTeam = (teamID) => {
        callApiDeleteTeam(teamID)
          .then(res => {
              props.newTeam();
          })
      }

      const getTeamMembers = () => {
        console.log(props.teamID);
        callApiGetTeamMembers()
          .then(res => {
            var parsed = JSON.parse(res.express);
            var s = "";
            for (var i = 0; i< parsed.length; i++) {
              if (i == parsed.length -1) {
                s = s.concat(parsed[i]["username"]);
              } else {
               s = s.concat(parsed[i]["username"]+ ", ");
              }
            };
            setTeamMembers(s);
          })
      }

      const callApiGetUser = async () => {
        const url = serverURL + "/api/AddUser";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
          })
        });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiLeaveTeam = async () => {
        console.log("user id is this  " + props.userID)
        const url = serverURL + "/api/DeleteTeamMembers";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users: [props.userID],
            teamID: props.teamID
          })
        });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiDeleteTeam = async (teamID) => {
        const url = serverURL + "/api/DeleteTeam";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamID: teamID
          })
        });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiGetTeamMembers = async () => {
        const url = serverURL + "/api/GetTeamMembers";  
        const res = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teamID: props.teamID
            })
          });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiGetTeamName = async () => {
        const url = serverURL + "/api/GetTeamName";  
        const res = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teamID: props.teamID
            })
          });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiAddTeamMember = async () => {
        const url = serverURL + "/api/AddTeamMembers";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            users: user,
            teamID: props.teamID
          })
        });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

      const callApiGetTeamOwner = async () => {
        const url = serverURL + "/api/GetTeamOwner";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamID: props.teamID
          })
        });
        const body = await res.json();
        console.log(body);
        if (res.status !== 200) throw Error(body.message);
        return body;
      }

        const handleShare = () => {
            handleOpen();
        }

        const handleOpen = () => {
          setOpen(true);
        };

        const handleClose = () => {
          setOpen(false);
        };
        
        const handleLeave = () => {
            leaveTeam();
        }

        const handleEdit = () => {
          setShowForm(true);
        }
      
      const handleEditTeam = () => {
        getTeamName();
        getTeamMembers();
        getTeamOwner();
      }
      
        React.useEffect(() => {
          if (user) { 
            callApiAddTeamMember();
          }
        }, [user]);

 
        const removeForm = () => {
          setShowForm(false);
      }

return(
<>
    <Paper>
    <Box
      display='flex'
      justifyContent="center"
      alignItems="center"
      sx={{ flexDirection: 'column', margin: 30 }}
    >
      <Typography variant="h4" color="Primary" style={{ marginTop: "50px", marginLeft: "25px", fontSize: "30px" }}>
        {teamName.toUpperCase()}
      </Typography>
      <Typography style={{ marginTop: "25px", marginLeft: "25px" }}>
        Members: {teamMembers}
      </Typography>
      {owner === props.userID ? (
        <div>
          {showForm || (
            <div>
              <TeamShareButton variant="contained" color="inherit" onClick={handleShare} style={{ marginTop: "25px", marginLeft: "25px" }} />
              <TeamEditButton variant="contained" color="inherit" onClick={handleEdit} style={{ marginTop: "25px", marginLeft: "25px" }} />
              <TeamDeleteTeamButton teamID={props.teamID} deleteTeam={deleteTeam} variant="contained" color="inherit" style={{ marginTop: "25px", marginLeft: "25px" }} />
            </div>
          )}
          &nbsp;
          {showForm && <TeamForm Title={teamName} Edit={true} team={props.teamID} removeForm={removeForm} handleEditTeam={handleEditTeam} UserArray={[]} />}
        </div>
      ) : (
        <div>
          <TeamShareButton variant="contained" color="inherit" onClick={handleShare} style={{ marginTop: "25px", marginLeft: "25px" }} />
          <TeamLeaveButton variant="contained" color="inherit" onClick={handleLeave} style={{ marginTop: "25px", marginLeft: "25px" }} />
        </div>
      )}
      <GetTeamSoundBites teamID={props.teamID} />
      </Box>
    </Paper>
  <Modal open={open} handleClose={handleClose}>
    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '75%', width: '80%', bgcolor: 'background.paper', border: '4px solid' + theme.palette.primary.main, boxShadow: 24, p: 4, borderRadius: 20, overflow: 'scroll'}}>
      <h2>My SoundBites</h2>
      <p>
        Please Select the Soundbite you would like to share
      </p>
      <MySoundBitesModal teamID ={props.teamID} getTeams={props.getTeams} handleClose={handleClose}/>
      <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
    </Box>
  </Modal>

    
  </>

)
}                 
export default Team;


