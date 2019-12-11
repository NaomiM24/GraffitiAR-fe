import React, { Component } from "react";

class Toggle extends Component {
  state = {
    showContent: false,
  };

  render() {
    return (
      <div>
        {this.state.showContent && this.props.children}
        <button onClick={this.displayContent}>{this.props.buttonName}</button>
      </div>
    );
  }
  displayContent = () => {
    this.setState(currentState => {
      return { showContent: !currentState.showContent };
    });
  };
}

export default Toggle;
