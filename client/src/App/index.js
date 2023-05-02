import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import SignUp from '../features/authentication/SignUp';
import SignIn from '../features/authentication/SignIn'

import Home from '../features/main/Home';
import PrivateRoute from '../features/Navigation/PrivateRoute.js';
import CreateSoundBite from '../features/main/CreateSoundBite';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={CreateSoundBite}/>
        </div>
      </Router>
    </QueryClientProvider>
    );
  }
}

export default App;