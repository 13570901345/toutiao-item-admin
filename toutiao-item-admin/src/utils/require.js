//封装axios
import axios from "axios";

//创建axios实例
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" //配置基础路径
});
//配置axios请求拦截器
request.interceptors.request.use(
  //config是传递过来的配置信息,可以进行更改
  function(config) {
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(config);
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default request;
