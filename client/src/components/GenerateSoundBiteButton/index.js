import Button from '@material-ui/core/Button';

function GenerateSoundBiteButton(props) {
    const { style, variant, onClick } = props;

    return(
        <Button variant={variant} color="inherit" onClick={onClick} style={style}> Generate SoundBite </Button>
    )
}
export default(GenerateSoundBiteButton)

