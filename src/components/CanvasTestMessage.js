import React, { Component } from "react";

export default class CanvasTestMessage extends Component {
  render() {
    return (
      <p className="canvas-message" id={this.props.type}>
        {this.props.message}
      </p>
    );
  }
}
