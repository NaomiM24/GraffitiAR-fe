import React from "react";
import CanvasDraw from "react-canvas-draw";
import * as api from "../api";
import { Link } from "@reach/router";
const arrow = require("../assets/left-arrow.png");

class CanvasDisplayer extends React.Component {
  state = {
    votesAdded: 0,
    graffiti: null,
    username: null,
    profilePic: null,
    dimension: window.innerWidth * 0.9,
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
          this.setState({
            username: data.username,
            profilePic: data.display_pic_url,
          });
        });
      });
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
        return { dimension: window.innerWidth * 0.6 };
      });
    }
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
    const { votesAdded, graffiti, username, profilePic } = this.state;
    if (!username) return <p>Loading</p>;
    return (
      <div className="canvas-displayer-page">
        <button>
          <Link to={`/view`}>
            <img src={arrow} alt="arrow" />
          </Link>
        </button>
        <div className="userPic">
          <img src={profilePic} alt="user profile" />
          <p>{username}</p>
        </div>
        <div className="dateLikes">
          <p>{graffiti.created_at}</p>
          <div className="displayerLikes">
            {graffiti.votes + votesAdded}
            <button
              onClick={() => this.handleVote(graffiti.votes, graffiti.id)}
            >
              {votesAdded === 0 ? (
                <img src="/unlike.png" alt="unliked" />
              ) : (
                <img src="/like.png" alt="like" />
              )}
            </button>
          </div>
        </div>
        <div className="canvas-displayer">
          <CanvasDraw
            disabled
            hideGrid
            lazyRadius={0}
            brushRadius={0}
            catenaryColor={"#FFFFFFFF"}
            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            saveData={graffiti.drawing_str}
            canvasWidth={this.state.dimension}
            canvasHeight={this.state.dimension}
          />
        </div>
      </div>
    );
  }
}

export default CanvasDisplayer;
