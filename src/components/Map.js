import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as manchesterData from "../data/manchester";
import mapStyle from "../data/mapStyle";

class GMap extends Component {
  state = {
    selectedPlace: null,
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false,
  };
  componentDidMount() {
    this.getGeoLocation();
    this.setState({ isMarkerShown: true });
    this.interval = setInterval(() => this.getGeoLocation(), 5000);
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
    const { currentLatLng, selectedPlace, isMarkerShown } = this.state;
    return (
      <GoogleMap
        defaultZoom={14}
        center={{
          lat: currentLatLng.lat,
          lng: currentLatLng.lng,
        }}
        defaultOptions={{
          styles: mapStyle,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {manchesterData.data.map(marker => (
          <Marker
            key={marker.graffiti_id}
            position={{
              lat: marker.geo_lat,
              lng: marker.geo_long,
            }}
            onClick={() => {
              this.setState({ selectedPlace: marker });
            }}
            icon={{
              url: "/spray-can.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
        {isMarkerShown && (
          <Marker
            position={{
              lat: currentLatLng.lat,
              lng: currentLatLng.lng,
            }}
            icon={{
              url: "/user-location.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        )}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geo_lat,
              lng: selectedPlace.geo_long,
            }}
            onCloseClick={() => this.setState({ selectedPlace: null })}
          >
            <div>
              <p className="marker-user">{selectedPlace.firebase_id}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(GMap));

export default function Map() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="map">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: "75%", marginTop: "25%" }} />}
        containerElement={<div style={{ height: "75%", width: "100%" }} />}
        mapElement={<div style={{ height: "100%", width: "100%" }} />}
      />
    </div>
  );
}
