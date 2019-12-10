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
    console.log("SettingsContainer user", this.props.user);
    console.log("SettingsContainer user.uid", this.props.uid);
    return (
      <>
        <SettingsButton handleClick={this.handleClick} />
        <Settings
          handleClick={this.handleClick}
          settingsVisibility={this.state.visible}
          user={this.props.user}
          uid={this.props.uid}
        />
      </>
    );
  }
}

export default SettingsContainer;
