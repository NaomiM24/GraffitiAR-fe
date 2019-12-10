import React, { Component } from "react";
import * as api from "../api.js";

class ChangeUsername extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("ChangeUsername user", this.props.user);
    console.log("ChangeUsername uid", this.props.uid);
    return <div>INSIDE ChangeUsername</div>;
  }
}

export default ChangeUsername;
