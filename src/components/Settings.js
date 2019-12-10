import React, { Component } from "react";
import "./Settings.css";
import fire from "../config/Fire";
import * as api from "../api.js"

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.changeUsernameByFirebaseID = this.changeUsernameByFirebaseID.bind(this)  
  }

  logout() {
    fire.auth().signOut();
  }

  changeUsernameByFirebaseID = () => {
    const { firebase_id } = this.props.uid;
    console.log("changeUsername", firebase_id);
    api.putUsernameByFirebaseID({username: newUsername}, firebase_id)
  };

  changeDisplayPicByFirebaseID = () => {
    const { firebase_id } = this.props.uid
    console.log("changeDisplayPic", firebase_id)
    api.putDisplayPicByFirebaseID({display_pic_url, newDisplayPic}, firebase_id)
  }

  render() {
    console.log("settings", this.props.uid);
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
        <button onClick={this.changeUsernameByFirebaseID}>Change username</button>
        {/* <p>Change Username</p> */}
        <button onClick={this.changeDisplayPicByFirebaseID}>Change display picture</button>
        <p>View My Graffiti</p>
      </div>
    );
  }
}

export default Settings;
