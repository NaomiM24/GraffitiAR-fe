import React, { Component } from "react";
import SettingsContainer from "./SettingsContainer";

class Header extends Component {
  render() {
    console.log("Header user", this.props.user);
    console.log("Header user.uid", this.props.uid);
    return (
      <header>
        <h1>geoGraffiti</h1>
        <SettingsContainer user={this.props.user} uid={this.props.uid} />
      </header>
    );
  }
}

export default Header;
