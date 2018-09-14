import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Item from "./Item";

class Feed extends Component {
  componentDidMount() {
    // Determine which items to fetch based on path
    switch (this.props.location.pathname) {
      case "/":
        this.props.itemStore.fetchTopStories();
        break;
      case "/newest":
        this.props.itemStore.fetchNewestStories();
        break;
      default:
        break;
    }
  }

  render() {
    // Determine which items to render based on path
    let itemsToRender = [];
    switch (this.props.location.pathname) {
      case "/":
        itemsToRender = this.props.itemStore.topStories.slice(0, 30);
        break;
      case "/newest":
        itemsToRender = this.props.itemStore.newestStories.slice(0, 30);
        break;
      default:
        break;
    }

    return (
      <div className="feed">
        {itemsToRender.map(id => (
          <Item id={id} key={id} />
        ))}
      </div>
    );
  }
}

export default inject("itemStore")(observer(Feed));
