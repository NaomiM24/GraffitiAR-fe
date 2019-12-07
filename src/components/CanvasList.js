import React, { Component } from "react";
import * as manchesterData from "../data/manchester";
import CanvasCard from "./CanvasCard";

class CanvasList extends Component {
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
  };

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  };
  render() {
    return (
      <>
        <h2>Graffiti in your location</h2>
        <ul className="canvas-list">
          {manchesterData.default.data.map(place => {
            var radlat1 = (Math.PI * this.state.currentLatLng.lat) / 180;
            var radlat2 = (Math.PI * place.location.latitude) / 180;
            var theta = this.state.currentLatLng.lng - place.location.longitude;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
              Math.sin(radlat1) * Math.sin(radlat2) +
              Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.609344;

            if (dist < 0.05 && dist > -0.05) {
              return (
                <>
                  <CanvasCard user={place.user} key={place.id} />
                </>
              );
            }
          })}
        </ul>
      </>
    );
  }
}

export default CanvasList;
