import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1/me/top/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // GET
    if (error.response.config.method === "get") {
      // 403
      if (error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: `(${error.response.status})`,
          text: error.response?.data,
        });
      }
      // 404
      if (error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: `(${error.response.status})`,
          text: error.message,
        });
      }
      // 其他
      else {
        Swal.fire({
          icon: "error",
          title: `(${error.response.status})`,
          text: error.response.data.error?.message,
        });
      }
    }
    // POST
    else if (error.response.config.method === "post") {
      Swal.fire({
        icon: "error",
        title: `(${error.response.status}) ${error.response.data.error}`,
        text: error.response.data?.error_description,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
