import Button from '@material-ui/core/Button';

function StartStopRecordButton(props) {
    const { stopRecording, startRecording, record } = props;

    return(
        <>
            {record ? <Button onClick={stopRecording} variant="contained" color="inherit">Stop Recording</Button> :
            <Button onClick={startRecording} variant="contained" color="inherit">Start Recording</Button>}
        </>
    )
}
export default(StartStopRecordButton)