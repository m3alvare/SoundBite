import { useState } from 'react';
import { Button, Typography, Box, Card, CardActions, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQueryClient, useMutation } from 'react-query'
import Modal from '@mui/material/Modal';
import SoundBiteModal from '../SoundBiteModal';
import { PDFDownloadLink} from '@react-pdf/renderer';
import SoundBitePDF from '../SoundBitePDF'
import SoundBiteDocx from '../SoundBiteDocx';

const serverURL = ""

const styles = theme => ({
    cardHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardContent: {
        height: '125px'
    },
    cardFooter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

// // Create styles
// const PDFstyles = StyleSheet.create({
//     page: {
//         paddingTop: 35,
//         paddingBottom: 65,
//         paddingHorizontal: 35,
//         backgroundColor: '#FFFFFF'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     },
//     text: {
//         margin: 12,
//         fontSize: 14,
//         textAlign: 'justify',
//         fontFamily: 'Times-Roman'
//     },
//     title: {
//         fontSize: 24,
//         textAlign: 'center',
//         fontFamily: 'Times-Roman'
//     },
// });

// // Create Document Component
// const SoundBiteDoc = ({title, contents}) => (
//     <Document>
//         <Page size="A4" style={PDFstyles.page}>
//             <Text style={PDFstyles.title}>{title}</Text>
//             <Text style={PDFstyles.text}>{contents}</Text>
//         </Page>
//     </Document>
// );

function SoundBiteCard(props) {
    const queryClient = useQueryClient();
    const { soundBite, classes } = props;
    const date = new Date(soundBite.date_created);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [modalOpen, setModalOpen] = useState(false);

    const callApiDeleteSoundBite = async (soundbiteID) => {
        const url = serverURL + "/api/deleteSoundBite";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                soundbiteID: soundbiteID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body.status;
    }

    const { mutate } = useMutation(callApiDeleteSoundBite, {
        onSuccess: () => {
            queryClient.invalidateQueries('mySoundBites')
        }
    })

    const deleteSB = () => {
        mutate(soundBite.soundbiteID)
        handleClose()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <div>
            <Card>
                <CardContent>
                    <Box className={classes.cardHeader}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            {soundBite.title}
                        </Typography>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={deleteSB}>Delete SoundBite</MenuItem>
                            <MenuItem onClick={() => {SoundBiteDocx(soundBite.title, soundBite.contents)}}>Download as Word Doc</MenuItem>
                            <MenuItem >
                                <PDFDownloadLink document={<SoundBitePDF title={soundBite.title} contents={soundBite.contents} />} fileName={soundBite.title + ".pdf"} style={{ textDecoration: "none", color: "inherit" }}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Download as PDF Doc'
                                    }
                                </PDFDownloadLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Divider />
                    <Box className={classes.cardContent}>
                        <Typography variant="body1" component="div">
                            {soundBite.contents.substring(0, 125)}
                        </Typography>
                    </Box>
                    <Divider />
                </CardContent>
                <CardActions>
                    <Box className={classes.cardFooter}>
                        <Button variant="contained" disableElevation onClick={handleModalOpen} size="small">
                            View SoundBite
                        </Button>
                        <Typography variant="body2" align="right">
                            {date.toDateString()}
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
            >
                <SoundBiteModal
                    soundBite={soundBite}
                    deleteSB={deleteSB}
                    handleModalClose={handleModalClose}
                />
            </Modal>
        </div>
    );
}
export default withStyles(styles)(SoundBiteCard)