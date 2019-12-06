import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
// import classNames from "./index.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

ReactDOM.render(<CanvasDraw />, document.getElementById("root"));

export default class CanvasTest extends Component {
  state = {
    color: "#0000ff",
    dimension: window.innerWidth * 0.9,
    // height: window.innerHeight * 0.6,
    brushRadius: 4,
    min: 1,
    max: 20,
  };
  render() {
    return (
      <main>
        <button
          onClick={this.handleColorChange}
          name="#0000ff"
          className="paint-color"
          id="blue"
        ></button>
        <button
          onClick={this.handleColorChange}
          name="#ff0000"
          className="paint-color"
          id="red"
        ></button>
        <button
          onClick={this.handleColorChange}
          name="#00ff00"
          className="paint-color"
          id="green"
        ></button>
        <button
          onClick={this.handleColorChange}
          name="#ffff00"
          className="paint-color"
          id="yellow"
        ></button>
        <button
          onClick={this.handleColorChange}
          name="#000000"
          className="paint-color"
          id="black"
        ></button>
        <Slider
          value={this.state.brushRadius}
          min={this.state.min}
          max={this.state.max}
          onChange={this.handleSliderChange}
          className="slider"
        />
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          canvasWidth={this.state.dimension}
          canvasHeight={this.state.dimension}
          brushRadius={this.state.brushRadius}
        />
        <div className="canvas-buttons">
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            <img src="/rubbish-bin.png" alt="clear" className="canvas-change" />
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            <img src="/undo.png" alt="undo" className="canvas-change" />
          </button>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            <img src="/paper-plane.png" alt="send" className="canvas-change" />
          </button>
        </div>
      </main>
    );
  }
  handleColorChange = event => {
    const { name } = event.target;
    this.setState({ color: name });
  };

  handleSliderChange = value => {
    this.setState({ brushRadius: parseInt(value, 10) });
  };
}
