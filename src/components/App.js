import React, { useState } from 'react';
import '../css/App.css';

import Header from './Header';
import Footer from './Footer';

import Feed from './landing/Feed';

function App() {
  const [signedin, setSignedIn] = useState(true);
  return (
    <>
      <Header signedin={signedin} setSignedIn={setSignedIn} />
      { signedin ?
      (
        <Feed user={{}} />
      ) :
      (
        <div />
      ) }
      <Footer />
    </>
  );
}

export default App;
