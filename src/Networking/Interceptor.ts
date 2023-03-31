import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.artic.edu/api/v1/artworks",
});

api.interceptors.request.use(
  async (config) => {
    config.headers.setContentType("application/json");
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);