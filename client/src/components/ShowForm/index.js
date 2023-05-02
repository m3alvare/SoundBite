// import React from 'react';
// import Typography from "@material-ui/core/Typography";
// import UploadFileButton from '../UploadFileButton';
// import TextField from "@material-ui/core/TextField";
// import {format} from 'date-fns';
// import GenerateSoundBiteButton from '../GenerateSoundBiteButton';
// import SaveSoundBiteButton from '../SaveSoundBiteButton';
// import SoundBiteOutputs from '../SoundBiteOutputs';
// import { useSelector } from 'react-redux';
// import { ReactMic } from 'react-mic';
// import { Button } from '@mui/material';
// import theme from "../../constants/theme";
// import "./showForm.css"
// import StartStopRecordButton from '../StartStopRecordButton';

// const serverURL = ""

// const SoundBiteTitle = (props) =>  {
//     const handleChange = (event) => {
//       props.setTitleChoice(event.target.value);
//     };
//     return(
//       <form>
//         <TextField style={{"margin-top": "25px", "margin-left": "25px"}} variant="outlined" id = "standard-basic" label = "SoundBite Title" onChange = {handleChange}> </TextField>
//       </form>
//     )
//   }

// function ShowForm() {
//     const [response, setResponse] = React.useState("");
//     const [prompt, setPrompt] = React.useState("");
//     const [contents, setContents] = React.useState("");
//     const [soundbiteID, setSoundbiteID] = React.useState("");
//     const [title, setTitle] = React.useState("");
//     const [date_created, setDate_Created] = React.useState("")
//     const [userID, setUserID] = React.useState("");
//     const [errorMessage, setErrorMessage] = React.useState("Please fill all fields");
//     const [selectedFile, setSelectedFile] = React.useState({name: ""})
//     const firebaseUID = useSelector((state) => state.user.userID)

//     const [record, setRecord] = React.useState(false)
//     const [showSound, setShowSound] = React.useState(false)
  
//     const callChatgptApi = async (transcriptPrompt) => {
//       const url = serverURL + '/api/chatGPT';
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           //authorization: `Bearer ${this.state.token}`
//         },
//         body: JSON.stringify({
//           prompt: transcriptPrompt
//         })
//       });
//       const body = await response.json();
//       if (response.status !== 200) throw Error(body.message);
  
//       setResponse(body.message)
//     }
    
//       const handleStoreSoundBite = () => {
//         callApiStoreSoundBite();
//       }
    
//       const callApiStoreSoundBite = async () => {
//         const url = serverURL + "/api/StoreSoundBite";
//         const res = await fetch(url, {
//           method: "POST", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: response,
//             title: title,
//             date_created: date_created,
//             userID: firebaseUID
//           })
//         });
//       }
  
//       const callApiSpeechToText = async () => {
//         const url = serverURL + "/api/speechToText";
//         let formData = new FormData();
    
//         console.log(selectedFile)
//         formData.append('file', selectedFile)
    
//         console.log(formData)
//         const response = await fetch(url, {
//           method: "POST",
//           body: formData
//         });
//         const body = await response.json();
//         if (response.status !== 200) throw Error(body.message);
//         console.log("User settings: ", body);
//         setPrompt(body.transcription);
//         return body;
//       }
  
//       const handleChatGPTSubmit = async () => {
//         callApiSpeechToText().then((returned) => {
//           callChatgptApi(returned.transcription)
//           var today = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
//           setDate_Created(today);
//           setUserID(1); //***TO DO **** change this to the user who is signed in
//         })
//       }
  
//       const handleUploadCLick = (event) => {
//         console.log(event.target.files[0])
//         setSelectedFile(event.target.files[0])
//       }

//       const startRecording = async() => {
//         await setShowSound(true)
//         setRecord(true);
//       }
     
//       const stopRecording = async () => {
//         await setRecord(false);
//         setShowSound(false)
//       }
     
//       const onData = (recordedBlob) => {
//         console.log('chunk of real-time data is: ', recordedBlob);
//       }
     
//       const onStop = (recordedBlob) => {
//         console.log('recordedBlob is: ', recordedBlob);
//         var currentdate = new Date(); 
//         var datetime = currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/" 
//                 + currentdate.getFullYear() + " @ "  
//                 + currentdate.getHours() + ":"  
//                 + currentdate.getMinutes() + ":" 
//                 + currentdate.getSeconds();
//         const file = new File([recordedBlob.blob], "Audio_" + datetime)
//         setSelectedFile(file)
//       }
        
//     return(
//       <> 
//         <Typography variant="h3" color="primary" noWrap style={{"marginTop": "25px", "textAlign":"center", "marginLeft": "0px"}}>
//                 Create a SoundBite
//         </Typography>
//         <SoundBiteTitle setTitleChoice = {setTitle}/>
//           <UploadFileButton variant="contained" style={{"margin-top": "25px", "margin-left": "0px"}} onClick={handleUploadCLick}/>
//           <Typography color="secondary" >
//             or
//           </Typography>
//           <React.Fragment>
//           {showSound ? 
//             <ReactMic
//             record={record}
//             className="sound-wave"
//             onStop={onStop}
//             onData={onData}
//             strokeColor={theme.palette.primary.main}
//             backgroundColor={theme.palette.primary.contrastText}
//             /> : <div></div>
//           }
//           </React.Fragment>
//             <br/>
//         <StartStopRecordButton stopRecording={stopRecording} startRecording={startRecording} record={record}/>
//         <Typography color="secondary" style={{"margin-top": "25px", "margin-left": "0px"}}>
//           <b>Selected File:</b> {selectedFile.name}
//         </Typography>
//         <GenerateSoundBiteButton variant= "contained" onClick={handleChatGPTSubmit} style={{"margin-top": "25px", "margin-left": "0px"}}/>
//         <SoundBiteOutputs variant={"h5"} prompt={prompt} title={title} response={response} style={{"margin-top": "25px", "margin-left": "0px"}}/>
//         <SaveSoundBiteButton variant="contained" color="inherit" onClick={handleStoreSoundBite} style={{"margin-top": "25px", "margin-left": "0px"}}/>
//       </>
//     )
// }
// export default(ShowForm)

import React from 'react';
import Typography from "@material-ui/core/Typography";
import UploadFileButton from '../UploadFileButton';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {format} from 'date-fns';
import GenerateSoundBiteButton from '../GenerateSoundBiteButton';
import SaveSoundBiteButton from '../SaveSoundBiteButton';
import SoundBiteOutputs from '../SoundBiteOutputs';
import EditSoundBiteButton from '../EditSoundBiteButton';
import EditSoundbiteForm from '../EditSoundBiteForm';
import EditSoundbiteTitle from '../EditSoundBiteTitle';
import LanguageSelect from '../LanguageSelect';
import WordCountSelect from '../WordCountSelect';
import SummaryTypeSelect from '../SummaryTypeSelect';
import { FormControl, Box, Snackbar } from '@material-ui/core';
import theme from "../../constants/theme";
import "./showForm.css"
import StartStopRecordButton from '../StartStopRecordButton';
import { ReactMic } from 'react-mic';
import { FormHelperText, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import history from '../../features/Navigation/history';


const serverURL = ""

const SoundBiteTitle = (props) =>  {
    const handleChange = (event) => {
      props.setTitleChoice(event.target.value);
    };
    return(
      <form>
        <TextField style={{"margin-top": "25px"}} variant="outlined" label="Soundbite Title" id = "standard-basic" onChange = {handleChange}> </TextField>
      </form>
    )
  }

function ShowForm(props) {
    const { closeModal } = props

    const [response, setResponse] = React.useState("");
    const [prompt, setPrompt] = React.useState("");
    const [contents, setContents] = React.useState("");
    const [soundbiteID, setSoundbiteID] = React.useState("");
    const [title, setTitle] = React.useState("untitled");
    const [date_created, setDate_Created] = React.useState("")
    const [userID, setUserID] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("Please fill all fields");
    const [showEditForm, setShowEditForm] = React.useState(false);
    const [showEditTitle, setShowEditTitle] = React.useState(false);
    const [showSelectedFileAndGenerate, setShowSelectedFileAndGenerate] = React.useState(false);
    const [showSubmittedTranscriptAndOutputs, setShowSubmittedTranscriptAndOutputs] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState({name: ""})
    const [selectedLanguage, setSelectedLanguage] = React.useState('English');
    const [selectedSummaryType, setSelectedSummaryType] = React.useState('TL;DR');
    const [wordCount, setWordCount] = React.useState('')
    const [sbOpen, setSbOpen] = React.useState(false)
    const [errorMessageSave, setErrorMessageSave] = React.useState("Please Sign In to Save soundbites")
    const [showLoading, setShowLoading] = React.useState(false)
    const [showInputForms, setShowInputForms] = React.useState(true)

    const [record, setRecord] = React.useState(false)
    const [showSound, setShowSound] = React.useState(false)

    const firebaseUID = useSelector((state) => state.user.userID)

    const getTranscriptPrompt = (transcriptPrompt) => {
      if(wordCount){
        return (transcriptPrompt + "\n\nPlease give me a summary of the above in " + selectedLanguage + ". Format the summary in " + selectedSummaryType + "form without the " + selectedSummaryType + " tag. Ensure proper grammar in the response. Make the summary " + wordCount + " words long.")
      }else{
        return (transcriptPrompt + "\n\nPlease give me a summary of the above in " + selectedLanguage + ". Format the summary in " + selectedSummaryType + "form without the " + selectedSummaryType + " tag. Ensure proper grammar in the response.")
      }
    }
  
    const callChatgptApi = async (transcriptPrompt) => {
  
      const url = serverURL + '/api/chatGPT';
      const finalTranscript = await getTranscriptPrompt(transcriptPrompt)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
          prompt: finalTranscript //+ "format the summary in " {} + "form."
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
  
      setResponse(body.message)
      setShowLoading(false)
      setShowSubmittedTranscriptAndOutputs(true)
    }
    
      const handleStoreSoundBite = () => {
        if(firebaseUID){
          callApiStoreSoundBite();
          closeModal()
        }else{setSbOpen(true)}
      }
    
      const callApiStoreSoundBite = async () => {
        const url = serverURL + "/api/StoreSoundBite";
        const res = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: response,
            title: title,
            date_created: date_created,
            userID: firebaseUID
          })
        });
      }
  
      const callApiSpeechToText = async () => {
        const url = serverURL + "/api/speechToText";
        let formData = new FormData();
    
        console.log(selectedFile)
        formData.append('file', selectedFile)
    
        console.log(formData)
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        setPrompt(body.transcription);
        return body;
      }
  
      const handleChatGPTSubmit = async () => {
        callApiSpeechToText().then((returned) => {
          callChatgptApi(returned.transcription)
          var today = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
          setDate_Created(today);
          setUserID(1); //***TO DO **** change this to the user who is signed in
        })
        setShowSelectedFileAndGenerate(false)
        setShowInputForms(false)
        setShowLoading(true)
      }
  
      const handleUploadCLick = (event) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0])
        setShowSelectedFileAndGenerate(true)
      }

      const handleEditSoundbiteForm = (event) => {
          setResponse(event.target.value)
      };

      const handleEditSoundbiteTitle = (event) => {
        setTitle(event.target.value)
      };

      const handleEditSoundbiteClick = () => {
        setShowEditForm(true)
        setShowEditTitle(true)
      };

      const handleSelectedLanguage = (event) => {
        setSelectedLanguage(event.target.value);
      }

      const handleSelectedSummaryType = (event) => {
        setSelectedSummaryType(event.target.value);
      };

      const handleSelectWordCount = (event) => {
        setWordCount(event.target.value);
      };
      

      const startRecording = async() => {
        await setShowSound(true)
        setRecord(true);
      }
     
      const stopRecording = async () => {
        await setRecord(false);
        setShowSound(false)
        setShowSelectedFileAndGenerate(true)
      }
     
      const onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
      }
     
      const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        const file = new File([recordedBlob.blob], "Audio_" + datetime)
        setSelectedFile(file)
      }
      
      const handleClose = () => {
        setSbOpen(false)
      }
        
    return(
      <> 
      <Typography variant="h3" color="primary" noWrap style={{"marginTop": "25px", "textAlign":"center", "marginLeft": "0px"}}>
                 Create a SoundBite
        </Typography>
        { showInputForms ?
        <>
        <UploadFileButton variant="contained" style={{"margin-top": "25px", "margin-left": "0px"}} onClick={handleUploadCLick}/>
        <Typography color="secondary" >
            or
          </Typography>
          <React.Fragment>
          {showSound ? 
            <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor={theme.palette.primary.main}
            backgroundColor={theme.palette.primary.contrastText}
            /> : <div></div>
          }
          </React.Fragment>
            <br/>
        <StartStopRecordButton stopRecording={stopRecording} startRecording={startRecording} record={record}/>
      </> 
        : ""
          }
          {showSelectedFileAndGenerate
            ? <> 
                <Box
                    display='flex'
                    justifyContent="center"
                    alignItems="center"
                    sx={{ flexDirection: 'column' }}
                  >
                  <Typography color="secondary" style={{"margin-top": "25px", "margin-left": "0px"}}>
                    <b>Selected File:</b> {selectedFile.name}
                  </Typography>
                  <Box sx={{ display: 'flex'}}>
                    <FormControl>
                      <SummaryTypeSelect onChange={handleSelectedSummaryType} value={selectedSummaryType} />
                      <FormHelperText>Summary Type</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <WordCountSelect style={{"margin-top": "25px", marginRight: "25px", marginLeft: "25px"}} variant="outlined" id = "standard-basic" label="Word Count" onChange = {handleSelectWordCount}/>
                      <FormHelperText style={{ marginRight: "25px", marginLeft: "25px"}}>{"Word Count (Blank=Unlimted)"}</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <LanguageSelect onChange={handleSelectedLanguage} value={selectedLanguage} />
                      <FormHelperText>Language</FormHelperText>
                    </FormControl>
                  </Box>
                  <br/>
                  <GenerateSoundBiteButton variant= "contained" onClick={handleChatGPTSubmit} style={{"margin-top": "25px", "margin-left": "0px"}}/>
                </Box>
                </>
            : ""
          }
          {
            showLoading
            ? <>
                <CircularProgress color="primary" style={{marginTop: 25}}/>
                <Typography color="secondary" style={{"margin-top": "25px"}}>
                    Loading Soundbite
                  </Typography>
              </>
            :""
          }
          {
            showSubmittedTranscriptAndOutputs
            ? <>
                {
                showEditForm
                  ? <>
                      <SoundBiteTitle setTitleChoice = {setTitle}/> 
                      <EditSoundbiteForm value={response} variant={"outlined"} style={{"margin-top": "25px", "margin-left": "0px", "width": '75%'}} onChange={handleEditSoundbiteForm}/>
                    </>
                  : <>
                      <SoundBiteTitle setTitleChoice = {setTitle}/>
                      <SoundBiteOutputs variant={"h5"} prompt={prompt} title={title} response={response} style={{"margin-top": "25px", "margin-left": "0px"}}/>
                      <EditSoundBiteButton variant="contained" onClick={handleEditSoundbiteClick} color="inherit" title={title} response={response} style={{"margin-top": "25px", "margin-left": "0px"}}/>
                    </>
                }
              <br/>
              <SaveSoundBiteButton variant="contained" color="inherit" onClick={handleStoreSoundBite} style={{"margin-top": "25px", "margin-left": "0px"}}/>
              <Snackbar open={sbOpen} onClose={handleClose} autoHideDuration={10000}>
                <MuiAlert severity="error">{errorMessageSave}</MuiAlert>
              </Snackbar>
              </>
            :""
          }
      </>
    )
}
export default(ShowForm)