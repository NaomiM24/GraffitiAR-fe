import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

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
      </li>
    );
  }
}
