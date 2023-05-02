import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ShareSoundBiteCard from '../ShareSoundBiteCard';

const styles = theme => ({
  gridItem: {
    width: "20vw",
    marginLeft: "2.5vw",
    marginRight: "2.5vw",
    marginTop: "2vh", 
    marginBottom: "2vh", 
  },
});

function ShareSoundBiteGrid(props) {
  const { data, classes, isModal, onSoundBiteSelect } = props; 

  const handleSoundBiteSelect = (event) => {
    const soundbiteID = event.target.name;
    const selected = event.target.checked;

    if (selected) {
      props.handleSoundBiteSelect(soundbiteID);
      console.log("selllleected" + selected)
    } else {
      props.handleSoundBiteSelect(props.selectedSoundBites.filter((id) => id !== soundbiteID));
    }

    if (onSoundBiteSelect) {
      onSoundBiteSelect(props.selectedSoundBites);
    }
  };

  return (    
    <Grid container>
      {data.map(soundBite => (
        <Grid item key={soundBite.soundbiteID + "grid item"} className={classes.gridItem}>
          <ShareSoundBiteCard key={soundBite.soundbiteID} soundBite={soundBite} />
          {isModal && (
            <FormControlLabel
              control={<Checkbox name={soundBite.soundbiteID} onChange={handleSoundBiteSelect} />}
              label="Select"
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(ShareSoundBiteGrid);