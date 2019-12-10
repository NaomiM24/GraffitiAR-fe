import React, { Component } from "react";
import "./Settings.css";
import fire from "../config/Fire";
import Toggle from "./Toggle";
import ChangeUsername from "./ChangeUsername";
import ChangeDisplayPicture from "./ChangeDisplayPicture";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    var visibility = "hide";
    if (this.props.settingsVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <button onClick={this.props.handleClick}>
          <img src="./close.png" alt="close" />
        </button>
        <h1>Settings</h1>
        <button onClick={this.logout}>Logout</button>
        <Toggle buttonName="Change Username">
          <ChangeUsername user={this.props.user} uid={this.props.uid} />
        </Toggle>
        <Toggle buttonName="Change Display Picture">
          <ChangeDisplayPicture user={this.props.user} uid={this.props.uid} />
        </Toggle>
        <p>View My Graffiti</p>
      </div>
    );
  }
}

export default Settings;
