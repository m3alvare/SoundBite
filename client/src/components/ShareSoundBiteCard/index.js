import React from 'react';
import useState from 'react';
import { Button, TextField, FormControl, Typography, Box, Grid, Card, CardActions, CardContent} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const opacityValue = 0.9;

const styles = theme => ({
      
  });

function ShareSoundBiteCard(props) {
    const { soundBite, classes } = props; 
    // console.log("creating card")
    // console.log("soundBite", soundBite)
      return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                    {soundBite.title}
                </Typography>
                <Typography variant="h6" component="div">
                    {soundBite.contents}
                </Typography>
            </CardContent>
        </Card>
      );
  }
  export default withStyles(styles)(ShareSoundBiteCard)