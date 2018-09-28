import React, { Component } from "react";
import firebase from "./firebase";

import Item from "./Item";

class Feed extends Component {
  state = {
    stories: [],
    min: 0,
    max: 30
  };
  feedType;
  componentDidMount() {
    // Determine which items to fetch based on path
    switch (this.props.location.pathname) {
      case "/":
        this.feedType = "topstories";
        break;
      case "/newest":
        this.feedType = "newstories";
        break;
      case "/ask":
        this.feedType = "askstories";
        break;
      case "/show":
        this.feedType = "showstories";
        break;
      case "/jobs":
        this.feedType = "jobstories";
        break;
      default:
        break;
    }
    try {
      firebase
        .database()
        .ref("/v0")
        .child(`${this.feedType}`)
        .on("value", snap => {
          this.setState({ stories: snap.val() });
        });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref("/v0")
      .child(`${this.feedType}`)
      .off();
  }

  render() {
    const { stories, min, max } = this.state;

    if (stories === undefined || stories.length === 0) {
      return <div>Loading...</div>;
    }
    const storiesToRender = stories.slice(min, max);
    return (
      <div>
        {storiesToRender.map(id => (
          <Item id={id} key={id} />
        ))}
      </div>
    );
  }
}

export default Feed;
