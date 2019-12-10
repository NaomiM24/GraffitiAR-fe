import React, { Component } from "react";
import * as api from "../api";
import SingleOwnGraffiti from "./SingleOwnGraffiti";

export default class AllOwnGraffiti extends Component {
  state = {
    myGraffiti: [],
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
          <img src="./close.png" alt="close" />
        </button>
        <h1>All Your Graffiti</h1>
        <ul>
          {myGraffiti &&
            myGraffiti.map(graffiti => {
              return (
                <SingleOwnGraffiti graffiti={graffiti} key={graffiti.id} />
              );
            })}
        </ul>
      </div>
    );
  }
}
