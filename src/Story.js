import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import moment from "moment";

import Item from "./Item";
import UserLink from "./UserLink";

import { fontSizes, media, breakpoints } from "./theme/globalStyles";

const StoryStyled = styled.div`
  background: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.7em;
  padding: 0.5em 1em;
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  transition: color 0.5s ease 0s, fill 0.5s ease 0s, box-shadow 0.5s ease 0s;
  position: relative;
  cursor: ${props => (props.thread ? "auto" : "pointer")};
  &:hover {
    border-color: ${props =>
      props.thread ? "rgb(204, 204, 204)" : "hsla(0, 0%, 57%, 1)"};
  }
`;
const StoryHeader = styled.header`
  font-size: 0.75em;
  padding: 8px 0px;
  color: #a3a3a3;
`;
const StoryBody = styled.article`
  padding-bottom: 1em;
`;

const Title = styled.div`
  line-height: calc(${fontSizes.titleLineHeightMin} * 1em);
  font-size: calc(${fontSizes.titleFontSizeMin} * 1em);
  ${media.small`
    line-height: calc(
      (${fontSizes.titleLineHeightMin} * 1em) +
        (${fontSizes.titleLineHeightMax} - ${fontSizes.titleLineHeightMin}) *
        (
          (100vw - (${breakpoints.small} * 1em)) /
            (${breakpoints.large} - ${breakpoints.small})
        )
    );
    font-size: calc(
      (${fontSizes.titleFontSizeMin} * 1em) +
        (${fontSizes.titleFontSizeMax} - ${fontSizes.titleFontSizeMin}) *
        (
          (100vw - (${breakpoints.small} * 1em)) /
            (${breakpoints.large} - ${breakpoints.small})
        )
    );
  `};
  ${media.large`
    line-height:${fontSizes.titleLineHeightMax};
    font-size: calc(${fontSizes.titleFontSizeMax} * 1em);
  `};
`;

const ExternalLink = styled.a`
  text-decoration: none;
  font-size: 0.8em;
  margin: 0.25em 0em;
  color: #fd6923;
  &:hover {
    text-decoration: underline;
  }
`;

const StoryFooter = styled.footer`
  font-size: 0.75em;
  & > * {
    padding: 0.4em 0.4em;
  }
`;
const Score = styled.span``;

const TimeLink = styled(Link)`
  color: #a3a3a3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const CommentsLink = styled(Link)`
  color: #a3a3a3;
  text-decoration: none;
  &:hover {
    background: hsla(0, 0%, 90%, 1);
    border-radius: 3px;
  }
`;

const UserLinkStyled = styled(UserLink)`
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const shortenURL = url => {
  return `${url.replace(/https?:\/\//, "").substring(0, 40)}...`;
};

class Story extends Component {
  state = {
    error: null,
    collapsed: false
    // showUserPopup: false
  };

  item = {};
  user = {};

  handleStoryClick = event => {
    if (event.target.tagName !== "A") {
      this.props.history.push(`/item/${this.props.item.id}`);
    }
  };

  render() {
    const { item } = this.props;

    if (Object.keys(item).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <StoryStyled
        thread={this.props.thread}
        onClick={this.handleStoryClick.bind(this)}
      >
        <StoryHeader>
          <Score>{item.score} points</Score> by{" "}
          <UserLinkStyled key={item.by} userId={item.by} />{" "}
          <TimeLink to={`/item/${item.id}`}>
            {moment.unix(item.time).fromNow()}
          </TimeLink>
        </StoryHeader>
        <StoryBody>
          <Title>{item.title}</Title>
          {item.url && (
            <ExternalLink href={item.url}>{shortenURL(item.url)}</ExternalLink>
          )}
        </StoryBody>
        <StoryFooter>
          <CommentsLink to={`/item/${item.id}`} className="comments-link">
            {item.descendants || 0}{" "}
            {item.descendants === 1 ? "comment" : "comments"}
          </CommentsLink>
        </StoryFooter>
        {/* Render the children (comments) if it's a thread and if there are children to be rendered */}
        {this.props.thread &&
          (item.kids !== undefined && item.kids.length > 0) &&
          item.kids.map(id => <Item key={id} id={id} depth={1} thread />)}
      </StoryStyled>
    );
  }
}

export default withRouter(Story);
