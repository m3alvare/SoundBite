import Button from '@material-ui/core/Button';

function EditSoundBiteButton(props) {
    const { style, variant, onClick } = props;

    return(
        <Button variant={variant} color="primary" onClick={onClick} style={style}> Edit SoundBite</Button>
    )
}
export default(EditSoundBiteButton)
