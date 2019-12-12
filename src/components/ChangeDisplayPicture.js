import React, { Component } from "react";
import * as api from "../api.js";
import CanvasTestMessage from "./CanvasTestMessage.js";

class ChangeDisplayPicture extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeDisplayPictureByFirebaseID = this.changeDisplayPictureByFirebaseID.bind(
      this
    );
    this.state = {
      newDisplayPicture: "",
      changed: false,
      error: false,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeDisplayPictureByFirebaseID(event) {
    event.preventDefault();
    api
      .putDisplayPicByFirebaseID(
        {
          display_pic_url: this.state.newDisplayPicture,
        },
        this.props.uid
      )
      .then(() => {
        this.setState({ newDisplayPicture: "", changed: true }, () => {
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
          <CanvasTestMessage message="Picture successfully changed!" />
        )}
        {this.state.error && (
          <CanvasTestMessage
            message="Picture could not be changed right now, please try again later"
            type="error"
          />
        )}
        <form onSubmit={this.changeDisplayPictureByFirebaseID}>
          <label>
            New Display Picture:
            <br />
            <input
              value={this.state.newDisplayPicture}
              onChange={this.handleChange}
              type="url"
              name="newDisplayPicture"
              required
              placeholder="Insert image URL"
            />
          </label>
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default ChangeDisplayPicture;
