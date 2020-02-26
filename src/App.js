import React, {useState} from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import Nav from "./Nav/Nav";

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </>
  )
}

export default App;
