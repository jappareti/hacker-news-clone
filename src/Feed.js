import React, { Component } from "react";
import firebase from "./firebase";

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
      case "/ask":
        feedType = "askstories";
        break;
      case "/show":
        feedType = "showstories";
        break;
      case "/jobs":
        feedType = "jobstories";
        break;
      default:
        break;
    }
    try {
      this.firebaseRef = firebase
        .database()
        .ref("/v0")
        .child(feedType);
      this.firebaseCallback = this.firebaseRef.on("value", snap => {
        this.setState({ stories: snap.val() });
      });
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
