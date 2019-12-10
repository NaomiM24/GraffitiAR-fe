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

  changeDisplayPictureByFirebaseID() {
    api.putDisplayPicByFirebaseID(
      {
        display_pic_url: this.state.newDisplayPicture,
      },
      this.props.uid
    );
  }

  render() {
    console.log("ChangeDisplayPicture user", this.props.user);
    console.log("ChangeDisplayPicture uid", this.props.uid);
    return (
      <div>
        <form>
          <label>
            New Display Picture
            <input
              value={this.state.newDisplayPicture}
              onChange={this.handleChange}
              type="url"
              name="newDisplayPicture"
              required
            />
          </label>
          <button onClick={this.changeDisplayPictureByFirebaseID()}>
            Confirm
          </button>
        </form>
      </div>
    );
  }
}

export default ChangeDisplayPicture;
