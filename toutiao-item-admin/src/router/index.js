import Vue from "vue";
import VueRouter from "vue-router";
//导入登录页面模版
import Login from "@/views/login";
//导入首页模版
import home from "@/views/home";
//导入导航页
import layout from "@/views/layout";
//导入文章页
import article from "@/views/article"
//导入发布文章页
import publish from "@/views/publish"
//导入素材页面
import image from "@/views/image"
//导入评论页面
import comment from "@/views/comment"
//导入个人设置页面
import setting from "@/views/setting"
//导入粉丝管理页面
import fans from "@/views/fans"

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
      },
      {
        path: "article",
        name: "article",
        component: article
      },
      {
        path: "publish",
        name: "publish",
        component: publish
      },
      {
        path: "image",
        name: "image",
        component: image
      },
      {
        path: "comment",
        name: "comment",
        component: comment
      },
      {
        path: "setting",
        name: "setting",
        component: setting
      },
      {
        path: "fans",
        name: "fans",
        component: fans
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
//to表示将要跳转的页面信息
//from表示从那个页面跳转的信息
//next表示放行
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (to.path !== "/login") {
    if (user) {
      //放行
      next();
    } else {
      //跳转到登录页面
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
