import axios from "axios";
import { idText } from "typescript";

let baseURL = process.env.NODE_ENV === "production" ?  `https://${window.location.hostname}` : "http://localhost:5000";

const getToken = () => JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).jwtToken : "";

const userApi = {
  whoami: () => {
    return axios({
      method: "get",
      baseURL,
      url: `users/me`,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  signin: (email, password) => {
    return axios({
      method: "post",
      baseURL,
      url: `users/login`,
      data: { email, password },
    });
  },

  register: (user) => {
    return axios({
      method: "post",
      baseURL,
      url: `users/register`,
      data: user,
    });
  },

  updateMe: (user) => {
    return axios({
      method: "put",
      baseURL,
      url: `users/me`,
      data: user,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  update: (user) => {
    return axios({
      method: "put",
      baseURL,
      url: `users/${user.id}`,
      data: user,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getAll: () => {
    return axios({
      method: "get",
      baseURL,
      url: `users`,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getById: (id) => {
    return axios({
      method: "get",
      baseURL,
      url: `users/${id}`,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  remove: (id) => {
    return axios({
      method: "delete",
      baseURL,
      url: `users/${id}`,
      data: {id},
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  }
};

export default userApi;
