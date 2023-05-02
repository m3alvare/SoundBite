import Button from '@material-ui/core/Button';

function TeamEditButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Edit Team </Button>
    
    )
}
export default(TeamEditButton);

