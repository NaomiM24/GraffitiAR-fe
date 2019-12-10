import React, { Component } from "react";
import * as api from "../api";

class MarkerLabel extends Component {
  state = {
    username: "",
    pic: "",
    likes: null,
  };
  componentDidMount() {
    const { user_id, graffiti_id } = this.props;
    api.getUserById(user_id).then(({ data }) => {
      this.setState({
        username: data.username,
        pic: data.display_pic_url,
      });
    });
    api.getGraffitiById(graffiti_id).then(({ data }) => {
      this.setState({ likes: data.votes });
    });
  }

  handleError = () => {
    this.setState({ pic: require("../assets/user.png") });
  };

  render() {
    const { username, pic, likes } = this.state;
    return (
      <div className="marker-user">
        {username && likes ? (
          <>
            <p>Posted by: {username}</p>
            <img
              src={pic}
              alt={`${username}'s profile pic`}
              onError={this.handleError}
            />
            <p>Likes: {likes}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default MarkerLabel;
