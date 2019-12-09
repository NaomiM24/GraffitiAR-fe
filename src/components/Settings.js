import React, { Component } from "react";
import "./Settings.css";
import fire from "../config/Fire";
import AllOwnGraffiti from "./AllOwnGraffiti";

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
        <button onClick={this.logout}>Logout</button>
        <p>Change Username</p>
        <button onClick={this.handleClick}>View My Graffiti</button>
        <AllOwnGraffiti
          handleClick={this.handleClick}
          graffitiVisibility={this.state.graffitiVisible}
          uid={this.props.uid}
        />
        <p>Delete my account :(</p>
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
}

export default Settings;
