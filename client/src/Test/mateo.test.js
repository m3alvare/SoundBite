import {render, screen, fireEvent} from '@testing-library/react';
import UploadFileButton from '../components/UploadFileButton'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Router, Link } from 'react-router-dom'
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import store from '../Redux/store';

describe('NavBar', () => {
    function renderComponent(history) {
       render(
        <Provider store={store}>
        <Router history={history}>
          <NavBar/>,
        </Router>
        </Provider>
       );
      }
  
     it('Navigates to SignUp Page', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      fireEvent.click(screen.getByText('Sign Up'))
      expect(history.location.pathname).toBe('/signup')
    });
  
    it('Has SignUp Button', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
  
    it('Navigates to SignIn Page', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      fireEvent.click(screen.getByText('Sign In'))
      expect(history.location.pathname).toBe('/signin')
    });
  
    it('Has SignIn Button', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  
    it('Navigates to Landing Page', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      fireEvent.click(screen.getByText('SoundBite'))
      expect(history.location.pathname).toBe('/')
    });
  
    it('Has Logo', () => {
      const history = createMemoryHistory({ initialEntries: ['/home'] });
      renderComponent(history);
      expect(screen.getByText('SoundBite')).toBeInTheDocument();
    });
    // .findWhere(node => node.text() === "Sign Up")
    // .find("NavBar").find('button').findWhere(node => (node.text() === 'Sign Up'))
  });