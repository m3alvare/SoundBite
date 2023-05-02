import { FormControl, Select, MenuItem } from '@mui/material';

const options = [
    { value: 'TL;DR', label: 'Regular Summary' },
    { value: 'bullet point form', label: 'Bullet Point Form' },

]
  
  
const SummaryTypeSelect = ( props ) => {

    const { value, onChange } = props

return(
    <FormControl style={{"margin-top": "25px", "width":200}}>
        <Select
            defaultValue={'TL;DR'}
            value={value}
            onChange={onChange}
            >
            {options.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
        </Select>
    </FormControl>
)
    
};
  
export default SummaryTypeSelect;
  
  
  