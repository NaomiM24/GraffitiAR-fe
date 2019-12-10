import axios from "axios";

const baseURL = "https://be-geograffiti.herokuapp.com/api";

export const postUser = userObject => {
  return axios.post(`${baseURL}/users`, userObject);
};

export const postCanvas = (firebase_id, drawing_str, geo_lat, geo_long, created_at) => {
  return axios.post(`${baseURL}/graffiti`, {
    firebase_id,
    drawing_str,
    geo_lat,
    geo_long,
    votes: 0,
    created_at
  });
};

export const getAllGraffiti = () => {
  return axios.get(`${baseURL}/graffiti`);
};

export const putUsernameByFirebaseID = (newUsernameObject, firebase_id) => {
  return axios.put(
    `${baseURL}/users/change_name/${firebase_id}`,
    newUsernameObject
  );
};

export const putDisplayPicByFirebaseID = (newDisplayPicObject, firebase_id) => {
  return axios.put(
    `${baseURL}/users/change_pic/${firebase_id}`,
    newDisplayPicObject
  );
};

export const updateVote = (votes, graffiti_id) => {
  return axios.put(`${baseURL}/graffiti/${graffiti_id}`, {
    votes,
  });
};

export const deleteGraffiti = graffiti_id => {
  return axios.delete(`${baseURL}/graffiti/${graffiti_id}`);
};

export const getGraffitiById = id => {
  return axios.get(`${baseURL}/graffiti/${id}`);
};

export const getUserById = id => {
  return axios.get(`${baseURL}/users/${id}`);
};

export const deleteAccount = firebase_id => {
  console.log(firebase_id);
  return axios.delete(`${baseURL}/users/del/${firebase_id}`);
};
