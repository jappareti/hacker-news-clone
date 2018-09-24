import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";

import moment from "moment";

import { fontSizes, media, breakpoints } from "./theme/globalStyles";

const CommentStyled = styled.div`
  position: relative;
  padding-left: 1em;
  margin-bottom: 1em;
  background: rgba(255, 255, 255, 0.8);
`;
const ThreadLineContainer = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  margin-left: -1.4em;
  vertical-align: top;
  width: 1em;
  bottom: 0px;
  height: calc(100% - 35px);
  position: absolute;
`;
const Threadline = styled.i`
  display: block;
  height: 100%;
  width: 50%;
  border-right: ${props =>
    props.collapsed ? "none" : "2px solid rgb(237, 239, 241)"};
  &::before {
    display: ${props => (props.collapsed ? "flex" : "none")};
    content: "+";
    background: #fd6923;
    border-radius: 17px;
    padding: 0px;
    color: #fff;
    position: absolute;
    top: -22px;
    right: -1px;
    height: 13px;
    width: 13px;
    justify-content: center;
    font-size: 12px;
    align-items: center;
    line-height: 9px;
  }
  ${ThreadLineContainer}:hover & {
    border-color: #fd6923;
  }
`;
const CommentHeader = styled.header`
  font-size: 0.8em;
  padding: 8px 0px;
`;
const CommentBody = styled.article`
  display: ${props => (props.collapsed ? "none" : "block")};
  line-height: calc(${fontSizes.pLineHeightMin} * 1em);
  font-size: calc(${fontSizes.pFontSizeMin} * 1em);
  overflow: hidden;
  ${media.small`
    line-height: calc(
      (${fontSizes.pLineHeightMin} * 1em) +
        (${fontSizes.pLineHeightMax} - ${fontSizes.pLineHeightMin}) *
        (
          (100vw - (${breakpoints.small} * 1em)) /
            (${breakpoints.large} - ${breakpoints.small})
        )
    );
    font-size: calc(
      (${fontSizes.pFontSizeMin} * 1em) +
        (${fontSizes.pFontSizeMax} - ${fontSizes.pFontSizeMin}) *
        (
          (100vw - (${breakpoints.small} * 1em)) /
            (${breakpoints.large} - ${breakpoints.small})
        )
    );
  `};
  ${media.large`
    line-height:${fontSizes.pLineHeightMax};
    font-size: calc(${fontSizes.pFontSizeMax} * 1em);
  `};
`;
const CommentFooter = styled.footer``;
const UserLink = styled(Link)`
  color: #fd6923;
  font-weight: bold;
  padding-right: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const CommentLink = styled(Link)`
  color: #a3a3a3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

class Comment extends Component {
  state = {
    error: null,
    collapsed: false
  };

  item = {};

  toggleComment = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  isCollapsed = () => (this.state.collapsed ? "collapsed" : "");

  render() {
    const { item, depth } = this.props;
    const { collapsed } = this.state;

    if (Object.keys(item).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <CommentStyled collapsed={collapsed} depth={depth}>
        {depth > 0 && (
          <ThreadLineContainer onClick={this.toggleComment}>
            <Threadline collapsed={collapsed} />
          </ThreadLineContainer>
        )}
        <CommentHeader>
          <UserLink to={`/user/${item.by}`}>{item.by}</UserLink>
          <CommentLink to={`/item/${item.id}`}>
            {moment.unix(item.time).fromNow()}
          </CommentLink>
        </CommentHeader>
        {!collapsed && (
          <CommentBody dangerouslySetInnerHTML={{ __html: item.text }} />
        )}
        <CommentFooter />
        {item.kids !== undefined &&
          item.kids.length > 0 &&
          !collapsed &&
          item.kids.map(id => (
            <Item key={id} id={id} depth={depth + 1} thread />
          ))}
      </CommentStyled>
    );
  }
}

export default Comment;
