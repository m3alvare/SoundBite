import {render, screen} from '@testing-library/react';
import UploadFileButton from '../components/UploadFileButton'
import CreateSoundBiteButton from '../components/CreateSoundBiteButton'
import SaveSoundBiteButton from '../components/SaveSoundBiteButton'
import GenerateSoundBiteButton from '../components/GenerateSoundBiteButton'
import SoundBiteOutputs from '../components/SoundBiteOutputs'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom'

configure({adapter: new Adapter()});

describe('Generate Soundbite button calls onClick Function, function will show the form', () => {
    let mockCallBack;
       function renderComponent() {
        mockCallBack = jest.fn().mockName('mockCallBack')
     
         render(
            <GenerateSoundBiteButton variant="contained" onClick={mockCallBack}/>,
         );

         return((<GenerateSoundBiteButton variant="contained" onClick={mockCallBack}/>))
       }
    
it('Generate Soundbite Button calls onClick Function', () => {
    const button = shallow(renderComponent());
    button.find('WithStyles(ForwardRef(Button))').simulate('click')
    expect(mockCallBack).toHaveBeenCalled();
})
});