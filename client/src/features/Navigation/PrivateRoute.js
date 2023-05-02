import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import CreateSoundBite from "../main/CreateSoundBite";
import MySoundBites from "../main/MySoundBites";
import Home from '../../features/main/Home';
import history from './history';
import SignUp from "../authentication/SignUp";
import SignIn from "../authentication/SignIn";
import MyTeams from "../main/MyTeams";


export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={CreateSoundBite} />
      <Route path="/CreateSoundBite" exact component={CreateSoundBite} />
      <Route path="/mySoundbites" exact component={MySoundBites}/>
      <Route path="/SignUp" exact component={SignUp}/>
      <Route path="/MyTeams" exact component={MyTeams}/>
      <Route path="/SignIn" exact component={SignIn}/>
      </Switch>
    </Router>
  );
}