import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {fetchStories} from "./api/hackerNewsApi";

import Item from "./Item";

class Feed extends Component {
  state = {
    stories: [],
    min: 0,
    max: 30
  };
  async componentDidMount() {
    // Determine which items to fetch based on path
    let feedType;
    switch (this.props.location.pathname) {
      case "/":
        feedType = "topstories";
        break;
      case "/newest":
        feedType = "newstories";
        break;
      default:
        break;
    }
    try {
      const response = await fetchStories(feedType);
      const stories = await response.json();
      this.setState({ stories });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { stories, min, max } = this.state;

    if (stories === undefined || stories.length === 0) {
      return <div>Loading...</div>;
    }
    const storiesToRender = stories.slice(min, max);
    return <div className="feed">
        {storiesToRender.map(id => <Item id={id} key={id} />)}
      </div>;
  }
}

export default Feed;
