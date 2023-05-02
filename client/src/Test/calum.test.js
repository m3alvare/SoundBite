import {render, screen} from '@testing-library/react';
import UploadFileButton from '../components/UploadFileButton'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Link } from 'react-router-dom'
import SignIn from '../features/authentication/SignIn';
import SignUp from '../features/authentication/SignUp';
import { Provider } from 'react-redux';
import store from '../Redux/store';

configure({adapter: new Adapter()});
describe('UploadButton', () => {
        let mockCallBack;
           function renderComponent() {
            mockCallBack = jest.fn().mockName('mockCallBack')
         
             render(
                <UploadFileButton variant="contained" onClick={mockCallBack}/>,
             );

             return((<UploadFileButton variant="contained" onClick={mockCallBack}/>))
           }
        
    it('Upload Button calls onClick Function', () => {
        const button = shallow(renderComponent());
        button.find('UploadFileButton').simulate('click')
        expect(mockCallBack).toHaveBeenCalled();
    });

    it('Upload Button has correct text', () => {
        renderComponent();
        expect(screen.getByText('Upload File')).toBeInTheDocument();
      });
  });

describe('SignIn', () => {
  function renderComponent(history) {
    render(
      <Provider store={store}>
      <Router history={history}>
        <SignIn/>
     </Router>
     </Provider>
    );
   }

   it('Has Email Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
   })

   it('Has Password Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
   })
});

describe('SignUp', () => {
  function renderComponent(history) {
    render(
      <Provider store={store}>
      <Router history={history}>
        <SignUp/>
     </Router>
     </Provider>
    );
   }

   it('Has Email Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
   })

   it('Has Password Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
   })

   it('Has Username Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
   })

   it('Has Confirm Password Feild', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] });
    renderComponent(history);
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
   })
});