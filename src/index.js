import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "mobx-react";

import HackerNewsApi from "./api/hackerNewsApi";
import ItemStore from "./store/itemStore";
import "./index.css";
import App from "./App";

const hackerNewsApi = new HackerNewsApi();
const itemStore = new ItemStore(hackerNewsApi);

ReactDOM.render(
  <Provider itemStore={itemStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
