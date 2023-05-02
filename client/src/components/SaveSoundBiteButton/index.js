import Button from '@material-ui/core/Button';

function SaveSoundBiteButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Save SoundBite </Button>
    )
}
export default(SaveSoundBiteButton)

