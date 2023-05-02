import Button from '@material-ui/core/Button';

function TeamDeleteTeamButton(props) {
    const { style, variant, onclick} = props;
    const handleClick = () => {
        props.deleteTeam(props.teamID); // Pass the teamID prop to the deleteTeam() function
      };

    return(
    <Button variant={variant} color="primary" onClick={handleClick} style={style}> Delete Team </Button>
    
    )
}
export default(TeamDeleteTeamButton);


