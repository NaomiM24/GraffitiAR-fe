import React, { Component } from "react";
// import fire from "../config/Fire";
import SettingsContainer from "./SettingsContainer";

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.logout = this.logout.bind(this);
  // }

  // logout() {
  //   fire.auth().signOut();
  // }

  render() {
    return (
      <div>
        <h1>Graffiti AR</h1>
        <SettingsContainer/>
      </div>
    );
  }
}

export default Header;
