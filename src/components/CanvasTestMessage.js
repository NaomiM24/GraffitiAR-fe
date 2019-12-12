import React, { Component } from "react";

export default class CanvasTestMessage extends Component {
  render() {
    return <p id="canvas-message">{this.props.message}</p>;
  }
}
