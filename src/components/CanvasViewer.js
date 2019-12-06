import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

class CanvasViewer extends Component {
  render() {
    return (
      <>
        <h2>Graffiti in your location</h2>
        <CanvasDraw
          disabled
          hideGrid
          lazyRadius={0}
          brushRadius={0}
          catenaryColor={"#FFFFFFFF"}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        />
      </>
    );
  }
}

export default CanvasViewer;
