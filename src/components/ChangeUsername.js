import React, { Component } from "react";
import * as api from "../api.js";
import CanvasTestMessage from "./CanvasTestMessage.js";

class ChangeUsername extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeUsernameByFirebaseID = this.changeUsernameByFirebaseID.bind(
      this
    );
    this.state = {
      newUsername: "",
      changed: false,
      error: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeUsernameByFirebaseID(event) {
    event.preventDefault();
    api
      .putUsernameByFirebaseID(
        {
          username: this.state.newUsername,
        },
        this.props.uid
      )
      .then(({ data }) => {
        this.setState({ newUsername: "", changed: true }, () => {
          setTimeout(() => {
            this.setState({ changed: false });
          }, 2000);
        });
      })
      .catch(() => {
        this.setState({ error: true }, () => {
          setTimeout(() => {
            this.setState({ error: false });
          }, 2000);
        });
      });
  }
  render() {
    return (
      <div className="change">
        {this.state.changed && (
          <CanvasTestMessage message="Username successfully changed!" />
        )}
        {this.state.error && (
          <CanvasTestMessage message="Username could not be changed right now, please try again later" />
        )}
        <form onSubmit={this.changeUsernameByFirebaseID}>
          <label>
            New Username:
            <br />
            <input
              value={this.state.newUsername}
              onChange={this.handleChange}
              type="text"
              name="newUsername"
              required
              placeholder="e.g. ParryHotter"
            />
          </label>
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangeUsername;
