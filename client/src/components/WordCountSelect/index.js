import { TextField } from "@mui/material";

const WordCountSelect = ( props ) =>  {

    const {style, variant, id, label, onChange } = props

    return(
      <form>
        <TextField type="number" style={style} variant={variant} id = {id} label = {label} onChange = {onChange}> </TextField>
      </form>
    )
  }
export default WordCountSelect;