import Button from '@material-ui/core/Button';

function TeamAddButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Add </Button>
    )
}
export default(TeamAddButton);

