import Button from '@material-ui/core/Button';

function TeamLeaveButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Leave Team </Button>
    )
}
export default(TeamLeaveButton);

