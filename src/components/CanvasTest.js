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
    if (window.innerHeight > window.innerWidth * 1.5) {
      this.setState(() => {
        return { dimension: window.innerWidth * 0.8 };
      });
    } else {
      this.setState(() => {
        return { dimension: window.innerHeight * 0.5 };
      });
    }
    if (window.innerHeight < 570) {
      this.setState(() => {
        return { dimension: window.innerWidth * 0.7 };
      });
    }
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
      <main className="canvas-draw-page">
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
        <section className="colours">
          <button
            onClick={this.handleColorChange}
            name="#0000ff"
            className={
              this.state.color === "#0000ff" ? "selected-color" : "paint-color"
            }
            id="blue"
          ></button>
          <button
            onClick={this.handleColorChange}
            name="#ff0000"
            className={
              this.state.color === "#ff0000" ? "selected-color" : "paint-color"
            }
            id="red"
          ></button>
          <button
            onClick={this.handleColorChange}
            name="#00ff00"
            className={
              this.state.color === "#00ff00" ? "selected-color" : "paint-color"
            }
            id="green"
          ></button>
          <button
            onClick={this.handleColorChange}
            name="#ffff00"
            className={
              this.state.color === "#ffff00" ? "selected-color" : "paint-color"
            }
            id="yellow"
          ></button>
          <button
            onClick={this.handleColorChange}
            name="#000000"
            className={
              this.state.color === "#000000" ? "selected-color" : "paint-color"
            }
            id="black"
          ></button>
        </section>
        <Slider
          value={this.state.brushRadius}
          min={this.state.min}
          max={this.state.max}
          onChange={this.handleSliderChange}
          className="slider"
          handleStyle={{
            height: 16,
            width: 16,
            marginLeft: -8,
            marginTop: -6,
            backgroundColor: "#0E1C36",
            border: 0,
          }}
          trackStyle={{
            background: this.state.color,
          }}
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
            <img src="/return.png" alt="undo" className="canvas-change" />
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
                let time = new Date().toLocaleDateString();
                api
                  .postCanvas(
                    uid,
                    picture,
                    this.state.currentLatLng.lat,
                    this.state.currentLatLng.lng,
                    time
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
