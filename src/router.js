import Vue from "vue";
import Router from "vue-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import allRoutes from "./router/allRoutes"
Vue.use(Router);



export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    //后面流程下面应该要注释
    // {
    //   path: "*",
    //   component: () => import(/*webpackChunkName:"page404" */ "./pages/Page404")
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   children: allRoutes
    // },
  ]
});
//解决路由导航到统一路径重复报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}