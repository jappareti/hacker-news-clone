import React, { Component } from "react";
import styled from "styled-components";

import firebase from "./firebase";

import Story from "./Story";
import Comment from "./Comment";

const ItemStyled = styled.div`
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 1em;
  padding: 0.8em 1em;
  /* padding-left: calc(100vw - 0.3em); */
  border-radius: 4px;
  border: ${props =>
    props.itemType === "comment" ? "none" : "1px solid rgb(204, 204, 204)"};
  transition: color 0.5s ease 0s, fill 0.5s ease 0s, box-shadow 0.5s ease 0s;
  position: relative;
`;

class Item extends Component {
  state = {
    error: null,
    item: {}
  };

  componentDidMount() {
    const { id } = this.props;
    try {
      firebase
        .database()
        .ref("/v0")
        .child(`item/${id}`)
        .on("value", snap => {
          const item = snap.val();
          if (item !== null) {
            this.setState({ item: snap.val() });
          }
        });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    firebase
      .database()
      .ref("/v0")
      .child(`item/${id}`)
      .off();
  }

  render() {
    const { item } = this.state;
    const depth = this.props.depth || 0;

    if (Object.keys(item).length === 0) {
      return <ItemStyled>Loading...</ItemStyled>;
    }

    if (item.type === "comment") {
      return <Comment item={item} key={item.id} id={item.id} depth={depth} />;
    }

    return (
      <Story
        item={item}
        id={item.id}
        key={item.id}
        thread={this.props.thread}
      />
    );
  }
}

export default Item;
