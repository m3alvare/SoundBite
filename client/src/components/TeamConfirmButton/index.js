import Button from '@material-ui/core/Button';

function TeamConfirmButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Confirm </Button>
    )
}
export default(TeamConfirmButton);

