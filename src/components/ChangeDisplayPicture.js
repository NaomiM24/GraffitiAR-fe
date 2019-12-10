import React, { Component } from "react";
import * as api from "../api.js";

class ChangeDisplayPicture extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("ChangeDisplayPicture user", this.props.user);
    console.log("ChangeDisplayPicture uid", this.props.uid);
    return <div>INSIDE ChangeDisplayPicture</div>;
  }
}

export default ChangeDisplayPicture;
