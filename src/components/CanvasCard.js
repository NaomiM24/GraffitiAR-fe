import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class CanvasCard extends Component {
  state = {
    username: null,
    isLoading: true,
    err: false,
  };

  componentDidMount() {
    const { graffiti } = this.props;
    api
      .getUserById(graffiti.firebase_id)
      .then(({ data }) => {
        this.setState({ username: data.username, isLoading: false });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          err: "Could not load at this time",
        });
      });
  }

  render() {
    const { graffiti } = this.props;
    const { username, isLoading, err } = this.state;
    return (
      <li className="canvas-card">
        {isLoading ? (
          <p>Loading...</p>
        ) : err ? (
          <p>{err}</p>
        ) : (
          <>
            <p>posted by: {username}</p>
            <p>
              <img src="/likes.png" alt="likes" /> {graffiti.votes}
            </p>
            <Link to={`/view/${graffiti.id}`}>View Graffiti</Link>
          </>
        )}
      </li>
    );
  }
}

export default CanvasCard;
