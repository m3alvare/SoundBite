import { React, useState } from 'react';
import { Button, TextField, Paper, Typography, Box, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useQueryClient, useMutation } from 'react-query'
import { PDFDownloadLink } from '@react-pdf/renderer';
import SoundBitePDF from '../SoundBitePDF'
import SoundBiteDocx from '../SoundBiteDocx';

const serverURL = ""

const styles = theme => ({
  modalBG: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "65%",
    bgcolor: "#FFFFFF",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  cardHeader: {
    position: 'relative',
    height: "14%",
    margin: "1%",
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardContent: {
    position: 'relative',
    width: "100%",
    height: "70%",
  },
  cardFooter: {
    height: "10%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row-reverse'
  },
  buttons: {
    height: "50%",
    margin: "2%",
    fontSize: '12px'
  },
  input: {
    height: "100%",
    "& .MuiInputBase-root": {
      height: "100%",
      display: "flex",
      alignItems: "start"
    }
  }
});

function SoundBiteModal(props) {
  const queryClient = useQueryClient();
  const { soundBite, deleteSB, handleModalClose, classes } = props;
  const date = new Date(soundBite.date_created);
  const [title, setTitle] = useState(soundBite.title);
  const [contents, setContents] = useState(soundBite.contents);

  const callApiEditSoundBite = async (soundbiteID) => {
    const url = serverURL + "/api/editSoundBite";

    console.log("SB TO BE Edited: ", soundbiteID)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        contents: contents,
        soundbiteID: soundbiteID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.status;
  }

  const { mutate } = useMutation(callApiEditSoundBite, {
    onSuccess: () => {
      console.log("sb edited")
      queryClient.invalidateQueries('mySoundBites')
      handleModalClose()
    }
  })

  const saveSB = () => {
    mutate(soundBite.soundbiteID)
  }

  return (
    <Paper
      component="form"
      className={classes.modalBG}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'normal' }}
    >
      <Box className={classes.cardHeader}>
        <TextField variant="standard" className={classes.title} color="primary" label="Title"
          value={title}
          onChange={(event) => { setTitle(event.target.value) }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignContent: 'space-around', height: "100%", width: "50%" }}>
          <Button className={classes.buttons} variant="contained" onClick={deleteSB}>Delete SoundBite</Button>
          <Button className={classes.buttons} variant="contained" onClick={() => { SoundBiteDocx(title, contents) }}>Download as Word</Button>
          <Button className={classes.buttons} variant="contained">
            <PDFDownloadLink document={<SoundBitePDF title={title} contents={contents} />} fileName={title + ".pdf"} style={{ textDecoration: "none", color: "inherit" }}>
              {({ blob, url, loading, error }) =>
                loading ? 'Download as PDF' : 'Download as PDF'
              }
            </PDFDownloadLink>
          </Button>
        </Box>
      </Box>
      <Box className={classes.cardContent}>
        <TextField className={classes.input} paragraph="true" variant="outlined" label="Soundbite" multiline
          value={contents}
          onChange={(event) => { setContents(event.target.value) }}
          style={{
            marginLeft: "1%",
            marginRight: "1%",
            width: "98%",
          }}
        />
      </Box>

      <Box className={classes.cardFooter}>
        <Button variant="contained" color='primary' disableElevation onClick={saveSB}>
          Save SoundBite
        </Button>
        <Typography variant="body2" align="right">
          {date.toDateString()}
        </Typography>
      </Box>
    </Paper>
  );
}

export default withStyles(styles)(SoundBiteModal)