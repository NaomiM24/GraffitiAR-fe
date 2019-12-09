import axios from "axios";

const baseURL = "https://be-geograffiti.herokuapp.com/api";

export const postCanvas = (firebase_id, drawing_str, geo_lat, geo_long) => {
  return axios.post(`${baseURL}/graffiti`, {
    firebase_id,
    drawing_str,
    geo_lat,
    geo_long,
    votes: 0,
  });
};
