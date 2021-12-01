import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../css/App.css";

import Header from "./Header";
import Footer from "./Footer";

import Groups from "./groups/Groups";

import Feed from "./landing/Feed";
import Homepage from "./landing/Homepage";

import ConditionalReload from "./helpers/ConditionalReload";

function App() {
  const [signedin, setSignedIn] = useState(false);
  return (
    <Router>
      <Header signedin={signedin} setSignedIn={setSignedIn} />
      <Switch>
        <Route path="/about">
          <ConditionalReload />
          <div />
        </Route>
        <Route path="/groups">
          <Groups />
        </Route>
        <Route path="/">
          <ConditionalReload />
          {signedin ? <Feed user={{}} /> : <Homepage />}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
