import React, { Component } from "react";
// import { fetchUser } from "./api/hackerNewsApi";
import firebase from "./firebase";

import Item from "./Item";

class Feed extends Component {
  state = {
    stories: [],
    min: 0,
    max: 30
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      this.firebaseRef = firebase
        .database()
        .ref("/v0")
        .child(`user/${id}`);
      this.firebaseCallback = this.firebaseRef.on("value", snap => {
        this.setState({ stories: snap.val().submitted });
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
