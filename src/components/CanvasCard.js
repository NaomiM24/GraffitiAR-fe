import React, { Component } from "react";
import { Link } from "@reach/router";

class CanvasCard extends Component {
  render() {
    const { graffiti } = this.props;
    return (
      <li className="canvas-card">
        <p>posted by: {graffiti.firebase_id}</p>
        <p>likes: {graffiti.votes}</p>
        <Link to={`/view/${graffiti.id}`}>View Graffiti</Link>
      </li>
    );
  }
}

export default CanvasCard;
