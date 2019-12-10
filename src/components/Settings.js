import React, { Component } from "react";
import "./Settings.css";
import fire from "../config/Fire";
import Toggle from "./Toggle";
import ChangeUsername from "./ChangeUsername";
import ChangeDisplayPicture from "./ChangeDisplayPicture";
import AllOwnGraffiti from "./AllOwnGraffiti";
import { Link } from "@reach/router";
import * as api from "../api";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  state = {
    graffitiVisible: false,
  };

  logout() {
    fire.auth().signOut();
  }

  render() {

    let visibility = "hide";

    if (this.props.settingsVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <button onClick={this.props.handleClick}>
          <img src="./close.png" alt="close" />
        </button>
        <h1>Settings</h1>
      
        <Link to="/">
          <button onClick={this.logout}>Logout</button>
        </Link>
        <Toggle buttonName="Change Username">
          <ChangeUsername user={this.props.user} uid={this.props.uid} />
        </Toggle>
        <Toggle buttonName="Change Display Picture">
          <ChangeDisplayPicture user={this.props.user} uid={this.props.uid} />
        </Toggle>
        <button onClick={this.handleClick}>View My Graffiti</button>
        <AllOwnGraffiti
          handleClick={this.handleClick}
          graffitiVisibility={this.state.graffitiVisible}
          uid={this.props.uid}
        />
        <Link to="/">
          <button onClick={this.handleDeleteAccount}>
            Delete my account :(
          </button>
        </Link>
      </div>
    );
  }
  handleClick = e => {
    this.toggleAllGraffiti();
  };

  toggleAllGraffiti = () => {
    this.setState({
      graffitiVisible: !this.state.graffitiVisible,
    });
  };

  handleDeleteAccount = () => {
    let verify = window.confirm(
      "Are you sure you want to delete your account? All your graffiti will be washed away!"
    );
    if (verify) {
      this.handleConfirmedDelete();
    }
  };

  handleConfirmedDelete = () => {
    const firebase_id = this.props.uid;
    var user = fire.auth().currentUser;
    api
      .deleteAccount(firebase_id)
      .then(() => {
        console.log("user db account deleted");
        user.delete();
      })
      .then(() => console.log("firebase account deleted"))
      .catch(err => console.log(err));
  };
}

export default Settings;
