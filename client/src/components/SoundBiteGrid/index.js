import { React, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SoundBiteCard from '../SoundBiteCard';

const styles = theme => ({
  gridItem: {
    width: "20vw",
    marginLeft: "2.2vw",
    marginRight: "2.2vw",
    marginTop: "2vh",
    marginBottom: "2vh",
  }
});

function SoundBiteGrid(props) {
  const { initData, filter, dateSort, classes } = props;
  const [soundbites, setSoundbites] = useState(...[initData]);

  useEffect(() => {
    let filterWords = filter.match(/[\w'-]+\w|[\w'-]+/g)
    let filteredSB = initData

    console.log("Filter words", filterWords)
    console.log("date:", dateSort)
    console.log(filteredSB)

    if (filterWords) {
      filteredSB = initData.reduce(function (filtered, soundBite) {
        if (filterWords.some(word => soundBite.title.toLowerCase().includes(word.toLowerCase()))) {
          filtered.push(soundBite)
        }
        return filtered
      }, [])
    }
    
    if (dateSort){
      filteredSB = filteredSB.sort(function(a,b){
        return new Date(b.date_created) - new Date(a.date_created);
      })
    }else{
      filteredSB = filteredSB.sort(function(a,b){
        return new Date(a.date_created) - new Date(b.date_created);
      })
    }

    console.log(filteredSB)

    setSoundbites(...[filteredSB])

  }, [filter, initData, dateSort])

  return (
    <Grid container>
      {soundbites.slice(0).reverse().map(soundBite => (
        <Grid item key={soundBite.soundbiteID + "grid item"} className={classes.gridItem}>
          {/* {console.log("soundBite being rendered", soundBite)} */}
          <SoundBiteCard key={soundBite.soundbiteID}
            soundBite={soundBite}
          />
        </Grid>
      ))}
    </Grid>
  );
}
export default withStyles(styles)(SoundBiteGrid)
