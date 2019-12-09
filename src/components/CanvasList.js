import React, { Component } from "react";
import * as manchesterData from "../data/manchester";
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
    const nearbyMarkers = manchesterData.data.filter(marker => {
      return (
        getDistance(currentLatLng, {
          lat: marker.geo_lat,
          lng: marker.geo_long,
        }) < 100
      );
    });
    this.setState({ nearbyMarkers });
  };

  render() {
    const { nearbyMarkers } = this.state;
    return (
      <>
        <h2>Graffiti in your location</h2>
        <button onClick={this.getGeoLocation}>Refresh</button>
        {nearbyMarkers === null ? (
          <p>Loading...</p>
        ) : nearbyMarkers.length !== 0 ? (
          <ul className="canvas-list">
            {nearbyMarkers.map(marker => {
              return <CanvasCard graffiti={marker} key={marker.graffiti_id} />;
            })}
          </ul>
        ) : (
          <p>No markers nearby</p>
        )}
      </>
    );
  }
}

export default CanvasList;
