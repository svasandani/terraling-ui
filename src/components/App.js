import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import '../css/App.css';

import Header from './Header';
import Footer from './Footer';

import Groups from './groups/Groups';

import Searches from './searches/Searches';

import Feed from './landing/Feed';
import Homepage from './landing/Homepage';


function App() {
  const [signedin, setSignedIn] = useState(false);
  return (
    <Router>
      <Header signedin={signedin} setSignedIn={setSignedIn} />
        <Switch>
          <Route path="/about">
            <div />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/searches">
            <Searches />
          </Route>
          <Route path="/">
            { signedin ?
            (
              <Feed user={{}} />
            ) :
            (
              <Homepage />
            ) }
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
