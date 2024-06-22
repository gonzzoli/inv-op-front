import axios from "axios";
import toast from "react-hot-toast";

const axiosAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

axiosAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err);
    if (err?.response?.data?.error) toast.error(err.response.data.error);
  }
);

export default axiosAPI;
