import React from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <header className="App-header">
      <nav>
        <Link to="/">Top</Link>
        <Link to="/newest">Newest</Link>
        <Link to="/ask">Ask</Link>
        <Link to="/show">Show</Link>
        <Link to="/jobs">Jobs</Link>
      </nav>
    </header>
  );
}

export default Nav;
