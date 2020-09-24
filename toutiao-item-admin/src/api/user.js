/**
用户请求模块 
**/
import request from "@/utils/require";

//用户登录
export const login = data => {
  return request({
    method: "POST",
    url: "/mp/v1_0/authorizations",
    data
  });
};

//获取用户信息
export const getuserprofile = () => {
// const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile",
    // 对请求头信息添加身份令牌
    // headers: {
    //   Authorization:  
    // }
  })
}

//修改用户信息
