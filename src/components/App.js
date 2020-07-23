import React, { useState } from 'react';
import '../css/App.css';

import Header from './Header';
import Footer from './Footer';

import Groups from './landing/Groups';
// import Feed from './landing/Feed';

function App() {
  const [signedin, setSignedIn] = useState(false);
  return (
    <>
      <Header signedin={signedin} setSignedIn={setSignedIn} />
      { signedin ?
      (
        <>
          <Groups />
          <div />
        </>
      ) :
      (
        <div />
      )}
      <Footer />
    </>
  );
}

export default App;
