import React, { Component } from "react";
import SettingsContainer from "./SettingsContainer";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>geoGraffiti</h1>
        <SettingsContainer uid={this.props.uid} />
      </header>
    );
  }
}

export default Header;
