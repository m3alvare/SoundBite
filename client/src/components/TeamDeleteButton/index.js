import Button from '@material-ui/core/Button';

function TeamDeleteButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Remove </Button>
    
    )
}
export default(TeamDeleteButton);

