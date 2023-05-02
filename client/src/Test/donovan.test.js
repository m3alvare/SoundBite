import {render, screen, fireEvent} from '@testing-library/react';
import CreateSoundBiteButton from '../components/CreateSoundBiteButton'
import SaveSoundBiteButton from '../components/SaveSoundBiteButton'
import GenerateSoundBiteButton from '../components/GenerateSoundBiteButton'
import SoundBiteOutputs from '../components/SoundBiteOutputs'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom'


configure({adapter: new Adapter()});
describe('Create sound bite, function will show the form', () => {
        let mockCallBack;
           function renderComponent() {
            mockCallBack = jest.fn().mockName('mockCallBack')
         
             render(
                <CreateSoundBiteButton variant="contained" onClick={mockCallBack}/>,
             );

             return((<CreateSoundBiteButton variant="contained" onClick={mockCallBack}/>))
           }
        
    it('Create Soundbite Button calls onClick Function', () => {
        const button = shallow(renderComponent());
        button.find('WithStyles(ForwardRef(Button))').simulate('click')
        expect(mockCallBack).toHaveBeenCalled();
    })}),
    describe('Savesound bite, function will show the form', () => {
      let mockCallBack;
         function renderComponent() {
          mockCallBack = jest.fn().mockName('mockCallBack')
       
           render(
              <SaveSoundBiteButton variant="contained" onClick={mockCallBack}/>,
           );

           return((<SaveSoundBiteButton variant="contained" onClick={mockCallBack}/>))
         }
      
  it('Save Soundbite Button calls onClick Function', () => {
      const button = shallow(renderComponent());
      button.find('WithStyles(ForwardRef(Button))').simulate('click')
      expect(mockCallBack).toHaveBeenCalled();
  })}),

  describe('SoundBiteOutputs', () => {
    let mockCallBack;
    let response="Text is here"
       function renderComponent() {
         render(
            <SoundBiteOutputs variant="contained" response={response}onChange={mockCallBack}/>,
         );

         return((<SoundBiteOutputs variant="contained" onChange={mockCallBack}/>))
       }

       it('Has response text', () => {
         renderComponent();
         expect(screen.getByText('Text is here')).toBeInTheDocument();
     })
})
    

