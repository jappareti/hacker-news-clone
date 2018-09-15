import React, { Component } from "react";
import { Provider } from "mobx-react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HackerNewsApi from "./api/hackerNewsApi";
import ItemStore from "./store/itemStore";

import "./App.css";

import Nav from "./Nav";
import Feed from "./Feed";
import Item from "./Item";

// const hackerNewsApi = new HackerNewsApi();
const itemStore = new ItemStore();
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider itemStore={itemStore}>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/" key="top" exact component={Feed} />
              <Route path="/newest" key="newest" exact component={Feed} />
              <Route
                path="/item/:id"
                render={props => (
                  <Item
                    key={props.match.params.id}
                    id={props.match.params.id}
                    thread
                  />
                )}
              />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
