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
    displayPic: null,
  };

  componentDidMount() {
    const { uid } = this.props;
    api.getUserById(uid).then(({ data }) => {
      this.setState({
        displayPic: data.display_pic_url,
      });
    });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    let visibility = "hide";

    if (this.props.settingsVisibility) {
      visibility = "show";
    }
    const { displayPic } = this.state;
    return (
      <div id="flyoutMenu" className={visibility}>
        <div className="settings-tile">
          <button className="close" onClick={this.props.handleClick}>
            <img src="./close.png" alt="close" />
          </button>
          <img src={displayPic} alt="display pic" className="display-pic" />
          <h1>Settings</h1>
          <section className="options">
            <Link to="/" className="logout">
              <button onClick={this.logout}>Logout</button>
            </Link>
            <div className="username">
              <Toggle buttonName="Change Username">
                <ChangeUsername uid={this.props.uid} />
              </Toggle>
            </div>
            <div className="picture">
              <Toggle buttonName="Change Display Picture">
                <ChangeDisplayPicture uid={this.props.uid} />
              </Toggle>
            </div>
            <div className="viewGraffiti">
              <button onClick={this.handleClick}>View Your Graffiti</button>
            </div>
            <AllOwnGraffiti
              handleClick={this.handleClick}
              graffitiVisibility={this.state.graffitiVisible}
              uid={this.props.uid}
            />
            <Link to="/" className="deleteAccount">
              <button onClick={this.handleDeleteAccount}>
                Delete Your Account :(
              </button>
            </Link>
          </section>
        </div>
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
