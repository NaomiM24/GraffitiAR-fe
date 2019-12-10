import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as api from "../api";

ReactDOM.render(<CanvasDraw />, document.getElementById("root"));

export default class CanvasTest extends Component {
  state = {
    color: "#0000ff",
    dimension: window.innerWidth * 0.9,
    brushRadius: 4,
    min: 1,
    max: 20,
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    posted: false,
    postErr: false,
    submitBlank: false,
  };
  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  };

  render() {
    const { uid } = this.props;
    return (
      <main>
        {this.state.posted && (
          <p className="posted-graffiti">
            Your graffiti has been successfully posted!
          </p>
        )}
        {this.state.submitBlank && (
          <p className="blank-error">Draw on canvas to submit!</p>
        )}
        {this.state.postErr && (
          <p className="posted-graffiti-error">Error! Please try again later</p>
        )}
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
              const picture = this.saveableCanvas.getSaveData();
              this.saveableCanvas.clear();
              if (JSON.parse(picture).lines.length === 0) {
                this.setState({ submitBlank: true }, () => {
                  setTimeout(() => {
                    this.setState({ submitBlank: false });
                  }, 3000);
                });
              } else {
                api
                  .postCanvas(
                    uid,
                    picture,
                    this.state.currentLatLng.lat,
                    this.state.currentLatLng.lng
                  )
                  .then(() => {
                    this.setState({ posted: true }, () => {
                      setTimeout(() => {
                        this.setState({ posted: false });
                      }, 3000);
                    });
                  })
                  .catch(err => {
                    this.setState({ postErr: true }, () => {
                      setTimeout(() => {
                        this.setState({ postErr: false });
                      }, 3000);
                    });
                  });
              }
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
