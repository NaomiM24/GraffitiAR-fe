import React from "react";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";
import { Link } from "@reach/router";

class CanvasDisplayer extends React.Component {
  state = {
    votesAdded: 0,
    graffiti: null,
  };

  componentDidMount() {
    const { id } = this.props;
    api.getGraffitiById(id).then(({ data }) => {
      this.setState({ graffiti: data });
    });
  }

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
    const { votesAdded, graffiti } = this.state;
    if (!graffiti) return <p>Loading</p>;
    return (
      <div>
        <Link to={`/view`}>Back</Link>
        <p>posted by: {graffiti.firebase_id}</p>
        <p>likes: {graffiti.votes + votesAdded}</p>
        <button onClick={() => this.handleVote(graffiti.votes, graffiti.id)}>
          Like
        </button>
        <CanvasDraw
          disabled
          hideGrid
          lazyRadius={0}
          brushRadius={0}
          catenaryColor={"#FFFFFFFF"}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={graffiti.drawing_str}
        />
      </div>
    );
  }
}

export default CanvasDisplayer;
