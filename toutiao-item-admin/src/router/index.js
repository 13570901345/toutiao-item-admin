import Vue from "vue";
import VueRouter from "vue-router";
//导入登录页面模版
import Login from "@/views/login";
//导入首页模版
import home from "@/views/home";
//导入导航页
import layout from "@/views/layout";

Vue.use(VueRouter);
// 路由配置表
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    // name: "layout",
    component: layout,
    children: [
      {
        path: "",
        //这个路由的名字是为了更方便调用参数，而组件的路由则为了更加规范有意义
        name: "home",
        component: home
      }
    ]
  }
  // {
  //   path: '/',
  //   //这个路由的名字是为了更方便调用参数，而组件的路由则为了更加规范有意义
  //   name: 'home',
  //   component: home
  // }
];

const router = new VueRouter({
  routes
});

export default router;
