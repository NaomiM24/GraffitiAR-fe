import React, { Component } from "react";
import * as api from "../api";
import SingleOwnGraffiti from "./SingleOwnGraffiti";

export default class AllOwnGraffiti extends Component {
  state = {
    myGraffiti: null,
  };

  componentDidUpdate() {
    api.getAllGraffiti().then(({ data }) => {
      const filteredData = data.filter(
        graffiti => graffiti.firebase_id === this.props.uid
      );
      this.setState({ myGraffiti: filteredData });
    });
  }
  render() {
    const { myGraffiti } = this.state;
    let visibility = "hide";
    if (this.props.graffitiVisibility) {
      visibility = "show";
    }
    return (
      <div id="flyoutMenu" className={visibility}>
        <button onClick={this.props.handleClick}>
          <img src="/left-arrow.png" alt="back" />
        </button>
        <h2>All Your Graffiti</h2>
        {myGraffiti === null ? (
          <p>loading...</p>
        ) : myGraffiti.length !== 0 ? (
          <ul>
            {myGraffiti &&
              myGraffiti.map(graffiti => {
                return (
                  <SingleOwnGraffiti graffiti={graffiti} key={graffiti.id} />
                );
              })}
          </ul>
        ) : (
          <p>You haven't posted any graffiti yet</p>
        )}
      </div>
    );
  }
}