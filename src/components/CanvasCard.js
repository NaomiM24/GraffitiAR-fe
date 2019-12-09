import React, { Component } from "react";
import Toggle from "./Toggle";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";

class CanvasCard extends Component {
  state = {
    votesAdded: 0,
  };

  handleVote = (votes, id) => {
    this.setState(
      currentState => {
        if (currentState.votesAdded) {
          return { votesAdded: 0, hasVoted: true };
        }
        return { votesAdded: 1, hasVoted: true };
      },
      () => {
        const { votesAdded } = this.state;
        api.updateVote(votes + votesAdded, id);
      }
    );
  };

  render() {
    const { graffiti } = this.props;
    const { votesAdded } = this.state;
    return (
      <li className="canvas-card">
        <p>posted by: {graffiti.firebase_id}</p>
        <p>likes: {graffiti.votes + votesAdded}</p>
        <button onClick={() => this.handleVote(graffiti.votes, graffiti.id)}>
          Like
        </button>
        <Toggle buttonName="Show Graffiti">
          <CanvasDraw
            disabled
            hideGrid
            lazyRadius={0}
            brushRadius={0}
            catenaryColor={"#FFFFFFFF"}
            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            saveData={graffiti.drawing_str}
          />
        </Toggle>
      </li>
    );
  }
}

export default CanvasCard;
