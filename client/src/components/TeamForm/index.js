import React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TeamAddButton from '../TeamAddButton';
import TeamConfirmButton from '../TeamConfirmButton';
import TeamBackButton from '../TeamBackButton';
import TeamDeleteButton from '../TeamDeleteButton';
const serverURL = "";

function TeamForm(props) {
  const [title, setTitle] = React.useState(props.Title);
  const [username, setUsername] = React.useState("");
  const [usernameDelete, setUsernameDelete] = React.useState("");
  const [userArray, setUserArray] = React.useState(props.UserArray);  
  const [userDeleteArray, setUserDeleteArray] = React.useState([]); 
  const [teamID, setTeamID] = React.useState("");
  const [EditMode, setEditMode] = React.useState(props.Edit);
  const [adding, setAdding] = React.useState(false);

  React.useEffect(() => {
    if (teamID) { 
      setTitle(""); 
      addTeamMembers();
    }
  }, [teamID]);
  
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleChangeUsernameDelete = (event) => {
    setUsernameDelete(event.target.value);
  }
    
  const handleConfirm = () => {
    if (username=="" || !usernameDelete=="")
      if(!EditMode) {
        createTeam()
      } else {
        callApiEditTitle();
        setEditMode(false);
        if (adding) {
          addTeamMember();
        } 
        if (userDeleteArray.length > 0) {
        console.log(userDeleteArray.length);
        callApiDeleteTeamMembers();
        }

        handleBack();
        props.handleEditTeam();
      }
    }
  
  const handleDelete = () => {
      deleteUser()
      setUsernameDelete("");
  }

  const handleBack = () => {
    props.removeForm();
  }

  const handleAdd = () => {
    if (EditMode) {
      setAdding(true);
    }
    addUser();
  }

  const deleteUser = () => {
    callApiDeleteUser()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setUserDeleteArray([...userDeleteArray, parsed[0]["userID"]]);
      })
  }

  const addUser = () => {
    callApiAddUser()
      .then(res => {
        console.log(res.express)
        if (res.express != '[]') {
          var parsed = JSON.parse(res.express);
          console.log(parsed)
          setUserArray([...userArray || [], parsed[0]["userID"]]);
          setUsername("");
        }
        
      })
  }

  const addTeamMembers = () => {
    callApiAddTeamMembers()
      .then(res => {
        props.newTeam();
      })
  }

  const addTeamMember = () => {
    callApiAddTeamMember()
      .then(res => {
        props.handleEditTeam();
      })
  }

  const callApiAddTeamMembers = async () => {
    const url = serverURL + "/api/AddTeamMembers";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: userArray,
        teamID: teamID
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
        users: userArray,
        teamID: props.team
      })
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiCreateTeam = async () => {
    const url = serverURL + "/api/CreateTeam";
    console.log("owner: " + userArray[0]);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName: title,
        teamOwner: userArray[0]
      })
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiEditTitle = async () => {
    const url = serverURL + "/api/EditTeamName";
    console.log("owner: " + userArray[0]);
    console.log("name: " + title);
    console.log("teamID: " + props.team);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamName: title,
        teamID: props.team
      })
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiAddUser = async () => {
    const url = serverURL + "/api/AddUser";
    console.log(username)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      })
      
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiDeleteUser = async () => {
    const url = serverURL + "/api/AddUser";
    console.log(username)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameDelete,
      })
      
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  const callApiDeleteTeamMembers = async () => {
    const url = serverURL + "/api/DeleteTeamMembers";
    console.log(props.team)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: userDeleteArray,
        teamID: props.team
      })
    });
    const body = await res.json();
    console.log(body);
    if (res.status !== 200) throw Error(body.message);
    return body;
  }


  const createTeam = () => {
    setEditMode(false);
    callApiCreateTeam()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setTeamID(parsed);
        setTitle("");
      });
  };
  

  return (
    <>
      <TextField
        style={{ "marginTop": "15px", "marginLeft": "25px" }}
        id="standard-basic"
        label="Team Name"
        value={title}
        onChange={handleChange}
      />
      <Typography color="secondary" style={{"marginTop": "25px", "marginLeft": "25px"}}>
        <b>Add Team Member: </b>
      </Typography>
      <TextField
        style={{"marginTop": "0px", "marginLeft": "25px"}}
        id="standard-basic"
        label="Username"
        value={username}
        onChange={handleChangeUsername}
      />
      <TeamAddButton variant="contained" color="inherit" onClick={handleAdd} style={{"marginTop": "25px", "marginLeft": "25px"}} />
      <Typography style={{"marginTop": "15px", "marginLeft": "25px"}}>
      </Typography>
      {EditMode === true && (
        <div>
        <Typography color="secondary" style={{"marginTop": "15px", "marginLeft": "25px"}}>
                <b>Remove Team Member: </b>
         </Typography>
              <TextField
                style={{"marginTop": "0px", "marginLeft": "25px"}}
                id="standard-basic"
                label="Username"
                value={usernameDelete}
                onChange={handleChangeUsernameDelete}
              />
              <TeamDeleteButton variant="contained" color="inherit" onClick={handleDelete} style={{"marginTop": "25px", "marginLeft": "25px"}} />
      </div>)
  }
      <TeamBackButton variant="contained" color="inherit" onClick={handleBack} style={{"marginTop": "25px", "marginLeft": "25px"}} />
      <TeamConfirmButton variant="contained" color="inherit" onClick={handleConfirm} style={{"marginTop": "25px", "marginLeft": "25px"}} />
    </>
  );
}

export default TeamForm;
