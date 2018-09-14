import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newest">Newest</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
