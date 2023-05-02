import Button from '@material-ui/core/Button';

function CreateSoundBiteButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Create a soundbite </Button>
    )
}
export default(CreateSoundBiteButton)

