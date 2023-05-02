import Typography from "@material-ui/core/Typography";

function SoundBiteOutputs (props) {
    const { style, title, response, prompt, variant } = props;

    return(
      <>
        <Typography style={style}>
            {response} 
        </Typography>
     </>
    )
}
export default(SoundBiteOutputs)