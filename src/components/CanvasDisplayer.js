import React from "react";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";
import { Link } from "@reach/router";

class CanvasDisplayer extends React.Component {
  state = {
    votesAdded: 0,
    graffiti: null,
    username: null,
  };

  componentDidMount() {
    const { id } = this.props;
    api
      .getGraffitiById(id)
      .then(({ data }) => {
        this.setState({ graffiti: data });
      })
      .then(() => {
        api.getUserById(this.state.graffiti.firebase_id).then(({ data }) => {
          this.setState({ username: data.username });
        });
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
    const { votesAdded, graffiti, username } = this.state;
    if (!username) return <p>Loading</p>;
    return (
      <div className="canvas-displayer-page">
        <button>
          <Link to={`/view`}>back</Link>
        </button>
        <p>posted by: {username}</p>
        <p>
          <button onClick={() => this.handleVote(graffiti.votes, graffiti.id)}>
            {votesAdded === 0 ? (
              <img src="/unlike.png" alt="unliked" />
            ) : (
              <img src="/like.png" alt="like" />
            )}
          </button>
          {graffiti.votes + votesAdded}
        </p>
        <div className="canvas-displayer">
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
      </div>
    );
  }
}

export default CanvasDisplayer;
