import React, { Component } from "react";
import * as api from "../api.js";

class ChangeDisplayPicture extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeDisplayPictureByFirebaseID = this.changeDisplayPictureByFirebaseID.bind(
      this
    );
    this.state = {
      newDisplayPicture: "",
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
        this.setState({ newDisplayPicture: "" });
      });
  }

  render() {
    return (
      <div className="change">
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
