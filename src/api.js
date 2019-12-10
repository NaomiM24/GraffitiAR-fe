import axios from "axios";

const baseURL = "https://be-geograffiti.herokuapp.com/api";

export const postUser = userObject => {
  return axios.post(`${baseURL}/users`, userObject);
};

export const postCanvas = (firebase_id, drawing_str, geo_lat, geo_long) => {
  return axios.post(`${baseURL}/graffiti`, {
    firebase_id,
    drawing_str,
    geo_lat,
    geo_long,
    votes: 0,
  });
};

export const getAllGraffiti = () => {
  return axios.get(`${baseURL}/graffiti`);
};

export const updateVote = (votes, graffiti_id) => {
  return axios.put(`${baseURL}/graffiti/${graffiti_id}`, {
    votes,
  });
};

export const getGraffitiById = id => {
  return axios.get(`${baseURL}/graffiti/${id}`);
};
