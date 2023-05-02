import Button from '@material-ui/core/Button';

function TeamShareButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Share a Soundbite</Button>
    )
}
export default(TeamShareButton);

