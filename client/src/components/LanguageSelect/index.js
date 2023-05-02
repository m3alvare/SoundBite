import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const options = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'id', label: 'Indonesian' },
    { value: 'ms', label: 'Malay' },
    { value: 'sw', label: 'Swahili' }

]
  
  
const LanguageSelect = ( props ) => {

    const { value, onChange } = props

return(
    <FormControl style={{"margin-top": "25px", "width":200}}>
        {/* <InputLabel>Select a Language Translation</InputLabel> */}
        <Select
            defaultValue={'English'}
            value={value}
            onChange={onChange}
            >
            {options.map((option) => (
                <MenuItem value={option.label}>{option.label}</MenuItem>
            ))}
        </Select>
    </FormControl>
)
    
};
  
export default LanguageSelect;
  
  
  