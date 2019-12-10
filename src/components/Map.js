import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as api from "../api";
import mapStyle from "../data/mapStyle";
import MarkerLabel from "./MarkerLabel";

class GMap extends Component {
  state = {
    selectedPlace: null,
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false,
    markers: [],
  };
  componentDidMount() {
    this.getGeoLocation();
    this.setState({ isMarkerShown: true });
    this.interval = setInterval(() => this.getGeoLocation(), 5000);
    api.getAllGraffiti().then(({ data }) => {
      this.setState({ markers: data });
    });
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
    const { currentLatLng, selectedPlace, isMarkerShown, markers } = this.state;
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
        {markers.map(marker => {
          return (
            <Marker
              key={marker.id}
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
          );
        })}
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
            <MarkerLabel
              user_id={selectedPlace.firebase_id}
              graffiti_id={selectedPlace.id}
            />
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
