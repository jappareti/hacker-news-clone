import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.header`
  margin-bottom: 20px;
  nav {
    background: #fc660f;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
  }

  a {
    color: #fff;
    font-weight: bold;
    padding: 12px 0px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Nav() {
  return (
    <StyledNav>
      <nav>
        <Link to="/">Top</Link>
        <Link to="/newest">Newest</Link>
        <Link to="/ask">Ask</Link>
        <Link to="/show">Show</Link>
        <Link to="/jobs">Jobs</Link>
      </nav>
    </StyledNav>
  );
}

export default Nav;
