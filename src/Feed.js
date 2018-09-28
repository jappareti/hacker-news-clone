import React, { Component } from "react";
import firebase from "./firebase";

import Item from "./Item";

class Feed extends Component {
  state = {
    stories: [],
    displayNumber: 15
  };
  feedType;
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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
    // Stop listening for changes on the Firebase Websocket when componetWillUnount
    firebase
      .database()
      .ref("/v0")
      .child(`${this.feedType}`)
      .off();
  }

  handleScroll = () => {
    // No more stories to load
    // This would be a good place to get the next page of results from
    // the API, but AFAIK that's not supported.
    if (this.state.displayNumber >= this.state.stories.length) return;

    // At the bottom of the page. Render more stories
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const { displayNumber } = this.state;
      this.setState({ displayNumber: displayNumber + 10 });
    }
  };

  render() {
    const { stories, displayNumber } = this.state;

    if (stories === undefined || stories.length === 0) {
      return <div>Loading...</div>;
    }
    const storiesToRender = stories.slice(0, displayNumber);
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
