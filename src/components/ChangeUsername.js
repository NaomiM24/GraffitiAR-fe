import React, { Component } from "react";
import * as api from "../api.js";

class ChangeUsername extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeUsernameByFirebaseID = this.changeUsernameByFirebaseID.bind(
      this
    );
    this.state = {
      newUsername: "",
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeUsernameByFirebaseID() {
    api.putUsernameByFirebaseID(
      {
        username: this.state.newUsername,
      },
      this.props.uid
    );
  }
  render() {
    return (
      <div>
        <form>
          <label>
            New Username
            <input
              value={this.state.newUsername}
              onChange={this.handleChange}
              type="text"
              name="newUsername"
              required
              placeholder="e.g. ParryHotter"
            />
          </label>
          <button onClick={this.changeUsernameByFirebaseID()}>Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangeUsername;
