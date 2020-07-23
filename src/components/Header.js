import React from 'react';
import '../css/Header.css';

function Header({ signedin, setSignedIn, user }) {
  const signOut = (e) => {
    e.preventDefault();
    setSignedIn(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    setSignedIn(true);
  }

  return (
    <header>
      <nav>
        <span className="logo"><a href="/">Terraling</a></span>
        <input type="checkbox" id="flyout-input" />
        <label htmlFor="flyout-input" className="flyout"><img src="https://img.icons8.com/fluent/48/000000/menu--v2.svg" alt="Flyout menu" /></label>
        <div className="sandwich">
          <a href="explore">Explore</a>
          <a href="project_groups">Project Groups</a>
          <a href="help">Help</a>
        </div>
        {signedin ?
        (
          <div className="user-nav">
            <a href="users">Shailesh Vasandani</a>
            <a className="button" href="." onClick={signOut}>Sign out</a>
          </div>
        ) :
        (
          <div className="user-nav">
            <a className="button" href="." onClick={signIn}>Sign in</a>
          </div>
        )}

      </nav>
    </header>
  )
}

export default Header;
