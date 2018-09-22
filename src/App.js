import React, { Component } from "react";
import { Provider } from "mobx-react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import ItemStore from "./store/itemStore";

import { breakpoints, media } from "./theme/globalStyles";

import Nav from "./Nav";
import Feed from "./Feed";
import Item from "./Item";

const AppWrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  ${media.large`max-width: calc(${breakpoints.large} * 1em);`};
`;

const itemStore = new ItemStore();
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider itemStore={itemStore}>
          <AppWrapper>
            <Nav />
            <Switch>
              <Route path="/" key="top" exact component={Feed} />
              <Route path="/newest" key="newest" exact component={Feed} />
              <Route path="/ask" key="ask" exact component={Feed} />
              <Route path="/show" key="show" exact component={Feed} />
              <Route path="/jobs" key="jobs" exact component={Feed} />
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
          </AppWrapper>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
