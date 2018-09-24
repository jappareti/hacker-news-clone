import React, { Component } from "react";
import { fetchUser } from "./api/hackerNewsApi";

import Item from "./Item";

class Feed extends Component {
  state = {
    stories: [],
    min: 0,
    max: 30
  };
  async componentDidMount() {
    try {
      const response = await fetchUser(this.props.match.params.id);
      const user = await response.json();
      this.setState({ stories: user.submitted });
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
