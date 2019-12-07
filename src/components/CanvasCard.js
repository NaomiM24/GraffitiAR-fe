import React, { Component } from "react";
import Toggle from "./Toggle";
import CanvasDraw from "react-canvas-draw";

class CanvasCard extends Component {
  render() {
    return (
      <li className="canvas-card">
        <p>posted by: {this.props.user}</p>
        <p>posted on: date</p>
        <p>likes: number</p>
        <Toggle buttonName="Show Graffiti">
          <CanvasDraw
            disabled
            hideGrid
            lazyRadius={0}
            brushRadius={0}
            catenaryColor={"#FFFFFFFF"}
            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            saveData={localStorage.getItem("savedDrawing")}
          />
        </Toggle>
      </li>
    );
  }
}

export default CanvasCard;
