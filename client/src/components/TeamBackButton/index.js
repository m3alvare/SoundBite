import Button from '@material-ui/core/Button';

function TeamBackButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Collapse </Button>
    )
}
export default(TeamBackButton);

