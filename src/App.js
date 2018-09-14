import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import './App.css';

import Item from './Item';

class App extends Component {
  componentDidMount() {
    this.props.itemStore.fetchTopStories();
  }
  
  render() {
    const firstThirtyItems = this.props.itemStore.topStories.slice(0,30);
    return <div className="App">
        {firstThirtyItems.map(id => <Item id={id} key={id} />)}
      </div>;
  }
}

export default inject("itemStore")(observer(App));
