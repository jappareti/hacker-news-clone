import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import App from "./App";

injectGlobal`
  html {
    box-sizing: border-box;
    background: hsla(38, 15%, 95%, 1);
    color: hsla(0, 0%, 20%, 1);
    font-size: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana, Arial,
      sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  a {
    color: #fd6923;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
