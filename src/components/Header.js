import React, { Component } from "react";
import SettingsContainer from "./SettingsContainer";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          <span className="geo">geo</span>GRAFFITI
        </h1>
        <div>
          <SettingsContainer uid={this.props.uid} />
        </div>
      </header>
    );
  }
}

export default Header;
