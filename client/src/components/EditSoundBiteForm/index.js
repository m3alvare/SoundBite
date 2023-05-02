import TextField from "@material-ui/core/TextField";

function EditSoundbiteForm(props) {
    const { style, variant, value, onChange } = props;

    return(
        <TextField style={style} variant={variant} value={value} onChange={onChange} multiline rows={8}> </TextField>
    )
}
export default(EditSoundbiteForm)

