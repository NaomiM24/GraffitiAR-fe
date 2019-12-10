import React, { Component } from "react";
import "./Settings.css";
import fire from "../config/Fire";

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
        <p>Change Username</p>
        <p>View My Graffiti</p>
      </div>
    );
  }
}

export default Settings;
