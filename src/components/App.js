import React, { useState } from 'react';
import '../css/App.css';

import Header from './Header';
import Footer from './Footer';

import Feed from './landing/Feed';
import Homepage from './landing/Homepage';

function App() {
  const [signedin, setSignedIn] = useState(false);
  return (
    <>
      <Header signedin={signedin} setSignedIn={setSignedIn} />
      { signedin ?
      (
        <Feed user={{}} />
      ) :
      (
        <Homepage />
      ) }
      <Footer />
    </>
  );
}

export default App;
