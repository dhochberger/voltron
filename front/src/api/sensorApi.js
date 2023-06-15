import axios from "axios";

let baseURL = process.env.NODE_ENV === "production" ?  `https://${window.location.hostname}` : "http://localhost:5000";

const getToken = () => JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).jwtToken : "";

const sensorApi = {
  getHumidity: () => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/humidity`,
    });
  },
  getHumidityBetweenDate: (start, end) => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/humidity/date?start=${start}&end=${end}`,
    });
  },
  getLuminosity: () => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/luminosity`,
    });
  },
  getLuminosityBetweenDate: (start, end) => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/luminosity/date?start=${start}&end=${end}`,
    });
  },
  getTemperature: () => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/temperature`,
    });
  },
  getTemperatureBetweenDate: (start, end) => {
    return axios({
      method: "get",
      baseURL,
      url: `sensors/temperature/date?start=${start}&end=${end}`,
    });
  },
};

export default sensorApi;
