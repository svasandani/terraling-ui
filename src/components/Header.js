import React from 'react';
import '../css/Header.css';

function Header({ signedin }) {
  return (
    <header>
      <nav>
        <span className="logo"><a href="/">Terraling</a></span>
        <input type="checkbox" id="flyout-input" />
        <label for="flyout-input" className="flyout"><img src="https://img.icons8.com/fluent/48/000000/menu--v2.svg" /></label>
        <div className="sandwich">
          <a href="#">Explore</a>
          <a href="#">Project Groups</a>
          <a href="#">Help</a>
        </div>
        <div className="user-nav">
        </div>
      </nav>
    </header>
  )
}

export default Header;
