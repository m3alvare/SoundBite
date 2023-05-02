import TextField from "@material-ui/core/TextField";

function EditSoundbiteTitle(props) {
    const { style, variant, onChange, id, label, value } = props;

    return(
        <form>
        <TextField value={value} style={style} variant={variant} id = {id} label = {label} onChange = {onChange}> </TextField>
        </form>
    )
}
export default(EditSoundbiteTitle)



