import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as manchesterData from "../data/manchester";
import mapStyle from "../data/mapStyle";

function GMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 53.480759, lng: -2.242631 }}
      defaultOptions={{ styles: mapStyle }}
    >
      {manchesterData.default.data.map(place => (
        <Marker
          key={place.id}
          position={{
            lat: place.location.latitude,
            lng: place.location.longitude,
          }}
          onClick={() => {
            setSelectedPlace(place);
          }}
          icon={{
            url: "/spray-can.png",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.location.latitude,
            lng: selectedPlace.location.longitude,
          }}
          onCloseClick={() => {
            setSelectedPlace(null);
          }}
        >
          <div>
            <p className="marker-user">{selectedPlace.user}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
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
