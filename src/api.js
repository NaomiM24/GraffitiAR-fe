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

export const putUsernameByFirebaseID = (newUsername, firebase_id) => {
  return axios.put(`${baseURL}/users/change_name/${firebase_id}`, {
    username: newUsername,
  });
};

export const putDisplayPicByFirebaseID = (newDisplayPic, firebase_id) => {
  return axios.put(`${baseURL}/users/change_pic/${firebase_id}`, {
    newDisplayPic,
    firebase_id,
  });
};
