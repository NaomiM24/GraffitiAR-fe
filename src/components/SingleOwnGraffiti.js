import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";

export default class SingleOwnGraffiti extends Component {
  state = {
    dimension: window.innerWidth * 0.75,
  };
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
          canvasWidth={this.state.dimension}
          canvasHeight={this.state.dimension}
        />
        <button className="delete-graffiti" onClick={this.handleDelete}>
          <img src="/rubbish-bin.png" alt="delete" />
        </button>
      </li>
    );
  }
  handleDelete = () => {
    const { graffiti, removeGraffiti } = this.props;
    removeGraffiti(graffiti.id);
    api
      .deleteGraffiti(graffiti.id)
      .then(() => console.log("graffiti deleted"))
      .catch(err => console.log(err));
  };
}
