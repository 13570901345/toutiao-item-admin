//封装axios
import axios from "axios";

//引入json-bigint插件来使后端传递过来的数据id正常显示
import JOSNbig from "json-bigint"

//创建axios实例
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" ,//配置基础路径

    //axios默认在里面把后端传递过来的数据用json.parse来处理
    //定义后端返回的原始数据的处理
    //参数data就是原始数据
    transformResponse: [function(data) {
      //后端返回的数据可能不是json格式字符串
      //也就是可能报错，所以用try,catch来捕获异常
      try {
        return JOSNbig.parse(data)
      }catch (err) {
        //如果转换失败则就进入这里，把数据原封不动的送出去
        return data
      }
    }]
  
});
//配置axios请求拦截器
request.interceptors.request.use(
  //config是传递过来的配置信息,可以进行更改
  function(config) {
    const user = JSON.parse(window.localStorage.getItem("user"));
    // console.log(config);
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
