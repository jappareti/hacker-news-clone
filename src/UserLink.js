import React, { Component } from "react";
import { Link } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";
import styled from "styled-components";
import moment from "moment";
import { fetchUser } from "./api/hackerNewsApi";

const UserPopup = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300
  },
  exit: { y: 50, opacity: 0 }
});

const UserPopupStyled = styled(UserPopup)`
  position: absolute;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px;
  position: absolute;
  width: 220px;
  z-index: 100;
  border-radius: 4px;
  border-top: 3px solid #fd6923;
  padding: 0em 1.4em;
  left: ${props => props.popupPosX + 5}px;
  h3 {
    margin: 0.5em 0em 0em;
    color: #000;
  }
  p {
    margin: 0.9em 0em;
  }
`;

class UserLink extends Component {
  state = {
    showUserPopup: false,
    popupPosX: {},
    user: {}
  };
  handleUserNameHover = async event => {
    const id = this.props.userId;
    const containerPosX = event.target.parentElement.parentElement.parentElement.getBoundingClientRect()
      .x;
    const popupPosX =
      event.currentTarget.getBoundingClientRect().x - containerPosX;

    // If we haven't fetched the user yet
    if (Object.keys(this.state.user).length === 0) {
      try {
        const response = await fetchUser(id);
        const user = await response.json();
        // this.user = user;
        this.setState({ showUserPopup: true, user, popupPosX });
      } catch (error) {
        console.log(error);
        this.setState({ error });
      }
    } else {
      this.setState({ showUserPopup: true });
    }
  };

  render() {
    const { userId, className } = this.props;
    const { user, popupPosX } = this.state;
    return (
      <span className={className}>
        <Link
          to={`/user/${userId}`}
          onMouseOver={this.handleUserNameHover.bind(this)}
          onMouseLeave={() => this.setState({ showUserPopup: false })}
        >
          {userId}
        </Link>
        <PoseGroup>
          {this.state.showUserPopup &&
            Object.keys(user).length !== 0 && (
              <UserPopupStyled key="user" popupPosX={popupPosX}>
                <h3>{user.id}</h3>
                <p>
                  Created: {moment.unix(user.created).format("MMMM Do YYYY")}
                </p>
                <p>Karma: {user.karma}</p>
              </UserPopupStyled>
            )}
        </PoseGroup>
      </span>
    );
  }
}

export default UserLink;
