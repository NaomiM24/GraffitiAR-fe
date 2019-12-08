exports.getDistance = (user, marker) => {
  const r = 6371000;
  const userLatRad = (user.lat * Math.PI) / 180;
  const markerLatRad = (marker.lat * Math.PI) / 180;
  const latDiff = markerLatRad - userLatRad;
  const lngDiff = (marker.lng - user.lng) * (Math.PI / 180);
  const distance =
    2 *
    r *
    Math.asin(
      Math.sqrt(
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
          Math.cos(userLatRad) *
            Math.cos(markerLatRad) *
            Math.sin(lngDiff / 2) *
            Math.sin(lngDiff / 2)
      )
    );
  return Math.round(distance);
};
