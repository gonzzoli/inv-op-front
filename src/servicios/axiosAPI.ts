import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

axiosAPI.interceptors.response.use(
  (res) => res,
  (err) => console.log(err)
);

export default axiosAPI;
