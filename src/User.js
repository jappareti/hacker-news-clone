import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import firebase from "./firebase";

const UserStyled = styled.div`
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 1em;
  padding: 0.8em 1em;
  border-radius: 4px;
  border: ${props =>
    props.itemType === "comment" ? "none" : "1px solid rgb(204, 204, 204)"};
  transition: color 0.5s ease 0s, fill 0.5s ease 0s, box-shadow 0.5s ease 0s;
  position: relative;
`;

class User extends Component {
  state = {
    error: null,
    user: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      this.firebaseRef = firebase
        .database()
        .ref("/v0")
        .child(`user/${id}`);
      this.firebaseCallback = this.firebaseRef.on("value", snap => {
        this.setState({ user: snap.val() });
      });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  render() {
    const { user } = this.state;

    if (Object.keys(user).length === 0) {
      return <UserStyled>Loading...</UserStyled>;
    }

    return (
      <UserStyled>
        <p>user: {user.id}</p>
        <p>created: {moment.unix(user.created).format("MMMM Do YYYY")}</p>
        <p>karma: {user.karma}</p>
        <p>
          about: <div dangerouslySetInnerHTML={{ __html: user.about }} />
        </p>
        <Link to={`/submitted/${user.id}`}>
          View all Stories, Comments and Polls
        </Link>
      </UserStyled>
    );
  }
}

export default User;
