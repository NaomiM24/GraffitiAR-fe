import React, { Component } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { HueSlider, SaturationSlider } from "react-color-sliders";
import * as api from "../api";
import CanvasTestMessage from "./CanvasTestMessage";

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
    locationErr: false,
    posted: false,
    postErr: false,
    submitBlank: false,
    hue: 0,
    lightness: 50,
    saturation: 100,
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
    const { hue, saturation, lightness } = this.state;
    const { uid } = this.props;
    return (
      <main className="canvas-draw-page">
        {this.state.posted && (
          <CanvasTestMessage message="Your graffiti has been successfully posted!" />
        )}
        {this.state.submitBlank && (
          <CanvasTestMessage message="Draw on canvas to submit!" type="error" />
        )}
        {this.state.postErr && (
          <CanvasTestMessage
            message="Error! Please try again later"
            type="error"
          />
        )}
        {this.state.locationErr && (
          <CanvasTestMessage
            message="Your location could not be accessed, please make sure you have GPS enabled"
            type="error"
          />
        )}
        <section className="colours">
          <button
            onClick={this.handleColorChange}
            name="#ffffff"
            className={
              lightness === 100 && saturation === 0
                ? "selected-color"
                : "paint-color"
            }
            id="white"
          ></button>
          <div className="colourSlider">
            <HueSlider
              hue={hue}
              saturation={100}
              lightness={50}
              onUpdate={hue => {
                this.setState({ hue, saturation: 100, lightness: 50 });
              }}
            />
          </div>
          <button
            onClick={this.handleColorChange}
            name="#000000"
            className={
              lightness === 0 && saturation === 100
                ? "selected-color"
                : "paint-color"
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
            backgroundColor: "#0E136",
            border: 0,
          }}
          trackStyle={{
            background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          }}
        />
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={`hsl(${hue}, ${saturation}%, ${lightness}%)`}
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
              if (
                this.state.currentLatLng.lat === 0 &&
                this.state.currentLatLng.lng === 0
              ) {
                this.setState({ locationErr: true }, () => {
                  setTimeout(() => {
                    this.setState({ locationErr: false });
                  }, 3000);
                });
              } else {
                const picture = this.saveableCanvas.getSaveData();
                let time = new Date().toLocaleDateString();
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
    if (name === "#ffffff") this.setState({ lightness: 100, saturation: 0 });
    if (name === "#000000") this.setState({ saturation: 100, lightness: 0 });
  };

  handleSliderChange = value => {
    this.setState({ brushRadius: parseInt(value, 10) });
  };
}
