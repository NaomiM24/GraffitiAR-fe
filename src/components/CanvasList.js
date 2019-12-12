import React, { Component } from "react";
import * as api from "../api";
import CanvasCard from "./CanvasCard";
import { getDistance } from "../utils/getDistance";

class CanvasList extends Component {
  state = {
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    nearbyMarkers: null,
  };

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            currentLatLng: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            nearbyMarkers: null,
          },
          () => {
            this.getNearbyMarkers();
          }
        );
      });
    }
  };

  getNearbyMarkers = () => {
    const { currentLatLng } = this.state;
    api.getAllGraffiti().then(({ data }) => {
      const nearbyMarkers = data.filter(marker => {
        return (
          getDistance(currentLatLng, {
            lat: marker.geo_lat,
            lng: marker.geo_long,
          }) < 100
        );
      });
      this.setState({ nearbyMarkers });
    });
  };

  render() {
    const { nearbyMarkers } = this.state;
    return (
      <div className="canvas-list-page">
        <h2>Posts in your location</h2>
        <p>click card to view graffiti</p>
        <button onClick={this.getGeoLocation}>
          <img src="/refresh.png" alt="refresh" />
        </button>
        {nearbyMarkers === null ? (
          <p>Loading...</p>
        ) : nearbyMarkers.length !== 0 ? (
          <ul className="canvas-list">
            {nearbyMarkers.map(marker => {
              return <CanvasCard graffiti={marker} key={marker.id} />;
            })}
          </ul>
        ) : (
          <p>No markers nearby</p>
        )}
      </div>
    );
  }
}

export default CanvasList;
