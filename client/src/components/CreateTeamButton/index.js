import Button from '@material-ui/core/Button';

function CreateTeamButton(props) {
    const { style, variant, onClick } = props;

    return(
        <Button variant={variant} color="primary" onClick={onClick} style={style}> Create New Team </Button>
    )
}

export default(CreateTeamButton)
