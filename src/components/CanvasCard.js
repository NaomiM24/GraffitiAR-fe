import React, { Component } from "react";
import Toggle from "./Toggle";
import CanvasDraw from "react-canvas-draw";

class CanvasCard extends Component {
  state = {
    votesAdded: 0,
  };

  handleVote = () => {
    const { votesAdded } = this.state;
    this.setState(currentState => {
      if (currentState.votesAdded) {
        return { votesAdded: 0 };
      }
      return { votesAdded: 1 };
    });
    // if (votesAdded) {
    //   updateVote(1);
    // } else {
    //   updateVote(-1);
    // }
  };

  render() {
    const { graffiti } = this.props;
    const { votesAdded } = this.state;
    return (
      <li className="canvas-card">
        <p>posted by: {graffiti.firebase_id}</p>
        <p>likes: {graffiti.votes + votesAdded}</p>
        <button onClick={this.handleVote}>Like</button>
        <Toggle buttonName="Show Graffiti">
          <CanvasDraw
            disabled
            hideGrid
            lazyRadius={0}
            brushRadius={0}
            catenaryColor={"#FFFFFFFF"}
            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            saveData={graffiti.drawing_string}
          />
        </Toggle>
      </li>
    );
  }
}

export default CanvasCard;
