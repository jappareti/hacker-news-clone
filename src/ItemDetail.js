import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import moment from "moment";

import "./Item.css";

class Item extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.itemStore.fetchItem(id);
  }
  render() {
    const { id } = this.props.match.params;
    const item = this.props.itemStore.items[id];
    return <div>
        {item === undefined ? <div className="card">
            <p>Loading...</p>
          </div> : <div className={`card ${item.type}`}>
            <div className="title">
              <a href={item.url}>{item.title}</a>
            </div>
            <div className="meta">
              <span className="score">{item.score} points</span> <span className="author">
                by {item.by}
              </span> <a href={item.id} className="time">
              {moment.unix(item.time).fromNow()}
              </a> | <a href={item.id} className="comments-link">
                {item.descendants} comments
              </a>
            </div>
          </div>}
      </div>;
  }
}

export default inject("itemStore")(observer(Item));
