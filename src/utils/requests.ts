import axios from "axios";
import { ElMessage } from "element-plus";

let request = axios.create({
  baseURL: "/douyin",
  timeout: 8000,
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("Error: " + error.message);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (res) {
    if (res.data.status_code != 0) {
      ElMessage.error(res.data.status_msg);
    }
    return res.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): any;
  }
}

export default request;
