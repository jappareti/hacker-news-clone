import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import moment from "moment";
import { fetchItem } from "./api/hackerNewsApi";

import "./Item.css";

class Item extends Component {
  state = {
    error: null
  };

  item = {};

  async componentDidMount() {
    const {id} = this.props
    try {
      const response = await fetchItem(id);
      const item = await response.json();
      this.item = item;
      this.forceUpdate();
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }
  render() {
    const { item } = this;

    if (Object.keys(item).length === 0) {
      return <div className="card">Loading...</div>;
    }

    return (
      <div className={`card ${item.type}`}>
        <div className="title">
          <a href={item.url}>{item.title}</a>
        </div>
        <div className="meta">
          {item.type !== "comment" && (<span className="score">{item.score} points</span>)}
          <span className="author">by {item.by}</span>{" "}
          <Link to={`/item/${item.id}`} className="time">
            {moment.unix(item.time).fromNow()}
          </Link>{" "}
          |{" "}
          <Link to={`/item/${item.id}`} className="comments-link">
            {item.descendants} comments
          </Link>
        </div>
        {item.type === "comment" && (
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
        )}
        { this.props.thread &&
          item.kids !== undefined &&
          item.kids.length > 0 &&
          item.kids.map(id => console.log(id) || <Item key={id} id={id} thread />)}
      </div>
    );
  }
}

export default Item;
