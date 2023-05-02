import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Button, Box } from "@material-ui/core";
import ShareSoundBiteGrid from "../ShareSoundBiteGrid";

function MySoundBitesModal(props) {
  const serverURL = "";
  const userID = useSelector((state) => state.user.userID);
  const [selectedSoundBites, setSelectedSoundBites] = useState([]);

  const callApiLoadUserSettings = async (firebaseUID) => {
    const url = serverURL + "/api/loadMySoundBites";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseUID: firebaseUID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("My SoundBites: ", body.express);
    return body.express;
  };

  const callApiShareSoundBite = async (soundbiteID) => {
    const url = serverURL + "/api/ShareSoundBite";
    console.log("API SHARE SOUNDBITE")
    console.log(props.teamID)
    console.log(soundbiteID)
    console.log("Bookend")
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamID: props.teamID,
        soundbiteID: soundbiteID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Shared SoundBite: ", body.express);
    props.getTeams()
    return body.express;
  };
 

  const handleShareClick = async () => {
    console.log("selectedSoundBites", selectedSoundBites);
    try {
      await Promise.all(selectedSoundBites.map((soundBiteID) => {
        console.log("soundBiteID", soundBiteID);
        return callApiShareSoundBite(soundBiteID);
      }));
      setSelectedSoundBites([]);
      console.log("TESTINGTESTINGTSTN");
      props.handleClose(); // Close the modal
    } catch (error) {
      console.error("An error occurred while sharing soundbites: ", error);
    }
  };
  
  const handleSoundBiteSelect = (soundBiteID) => {
    console.log("yesss")
    setSelectedSoundBites(prevSelectedSoundBites => [...prevSelectedSoundBites, soundBiteID]);
  }

  const { isLoading, error, data } = useQuery("UserSoundBites", () => callApiLoadUserSettings(userID));

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
    <Box>
      <ShareSoundBiteGrid
        key={"my SoundBites Grid"}
        data={data}
        isModal={true}
        handleSoundBiteSelect={handleSoundBiteSelect}
        selectedSoundBites={selectedSoundBites} // Pass the selected soundbites to the SoundBiteGrid
      />
      <Button variant="contained" color="primary" onClick={handleShareClick}>
        Share
      </Button>
    </Box>
    </>
  );

}

export default MySoundBitesModal
