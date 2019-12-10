import React, { Component } from "react";
import Settings from "./Settings";
import SettingsButton from "./SettingsButton";

class SettingsContainer extends Component {
  state = {
    visible: false,
  };

  handleClick = e => {
    this.toggleSettings();
  };

  toggleSettings = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <>
        <SettingsButton handleClick={this.handleClick} />
        <Settings
          handleClick={this.handleClick}
          settingsVisibility={this.state.visible}
          uid={this.props.uid}
        />
      </>
    );
  }
}

export default SettingsContainer;
