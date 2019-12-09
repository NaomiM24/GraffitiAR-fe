import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";

export default class SingleOwnGraffiti extends Component {
  render() {
    const { graffiti } = this.props;
    return (
      <li>
        <CanvasDraw
          disabled
          hideGrid
          lazyRadius={0}
          brushRadius={0}
          catenaryColor={"#FFFFFFFF"}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={graffiti.drawing_str}
        />
        <button className="delete-graffiti" onClick={this.handleDelete}>
          Delete
        </button>
      </li>
    );
  }
  handleDelete = () => {
    const { graffiti } = this.props;
    api
      .deleteGraffiti(graffiti.id)
      .then(() => console.log("graffiti deleted"))
      .catch(err => console.log(err));
  };
}
