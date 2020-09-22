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
  return request({
    method: "GET",
    url: "/mp/v1_0/user/profile",
    // 对请求头信息添加身份令牌
    headers: {
      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzIyMjE0MzgsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.2awpcNMTdT0oFP5IeECrITpqOgDfOVYi9leK1iTrnts"
    }
  })
}

//修改用户信息
