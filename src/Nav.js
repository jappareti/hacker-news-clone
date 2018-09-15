import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <header className="App-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/newest">Newest</Link>
      </nav>
    </header>
  );
}

export default Nav;
