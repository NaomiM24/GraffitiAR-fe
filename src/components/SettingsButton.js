import React, { Component } from "react";
import "./Settings.css"
 
class SettingsButton extends Component {
  render() {
    return (
      <button id="settingsButton"
        onMouseDown={this.props.handleClick}><img src='./settings.png' alt='settings'/></button>
    );
  }
}
 
export default SettingsButton;