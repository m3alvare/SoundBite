import { React, useState } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { MuiThemeProvider } from "@material-ui/core/styles";
import NavBar from '../../../components/NavBar';
import { withStyles } from '@material-ui/core/styles';
import theme from "../../../constants/theme";
import SoundBiteGrid from '../../../components/SoundBiteGrid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Paper from '@mui/material/Paper';
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

const serverURL = ""

const styles = theme => ({
  search: {
    width: '40%',
  },
  dateButton: {
    marginLeft: "auto",
    marginRight: "1%",
    alignSelf: "flex-end"
  }
});

function MySoundBites(props) {
  const { classes } = props;
  const [search, setSearch] = useState("");
  const [dateSort, setDateSort] = useState(true);
  const userID = useSelector((state) => state.user.userID)

  const callApiLoadMySoundBites = async (firebaseUID) => {
    const url = serverURL + "/api/loadMySoundBites";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUID: firebaseUID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.express;
  }

  const { isLoading, error, data } = useQuery('mySoundBites', 
    () => callApiLoadMySoundBites(userID),
    {refetchOnWindowFocus: false,}
  )

  return (
    <MuiThemeProvider theme={theme}>
      <Box sx={{bgcolor: 'background.default', minHeight: '100vh'}} >
      <NavBar />
      <Typography variant="h3" color="primary" style={{ "marginTop": "25px", "marginBottom": "25px", "textAlign": "center" }}>
        My SoundBites
      </Typography>
      <Box display="flex" alignItems="center">
        <Paper
          component="form"
          className={classes.search}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'normal', marginLeft: '50%', transform: 'translateX(-50%)'}}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by SoundBites Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton type="button" disabled aria-label="search">
            <SearchIcon/>
          </IconButton>
        </Paper>
        <Button className={classes.dateButton} onClick={() => {setDateSort(!dateSort)}} variant="text">
          Date
          {dateSort? <ArrowCircleUpIcon/>: <ArrowCircleDownIcon/>}
        </Button>
      </Box>
      {isLoading ? 'Loading...' :
        error ? 'An error has occurred: ' + error.message :
          <SoundBiteGrid key={"my SoundBites Grid"}
            initData={data}
            filter={search}
            dateSort={dateSort}
          />
      }
    </Box>
    </MuiThemeProvider>
  );
}
export default withStyles(styles)(MySoundBites)