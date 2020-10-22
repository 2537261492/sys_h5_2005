import Vue from "vue";
import ElementUI from "element-ui"; //全部引入
import "element-ui/lib/theme-chalk/index.css"; //全部引入
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/styles/base.css";
import "../src/assets/styles/el-reset.css";
//引入iconfont
import "../src/assets/ico/iconfont.css";

Vue.config.productionTip = false;
Vue.use(ElementUI); //全部引入

//按需引入
// import { Carousel, CarouselItem } from "element-ui"
// 注册组件
// Vue.component("el-carousel", Carousel)
// Vue.component("el-carousel-item", CarouselItem)

//路由前置钩子(导航守卫) 如果，to：去哪里 from：从哪里。 next:放行的，如果不写就不会展现内容
router.beforeEach((to, from, next) => {
  //用户登录之后，localStorage中有token
  let token = localStorage.getItem("qf2005-token");
  console.log(to);
  if (token) {
    //如果是注册页面或者是登录页面，直接放行
    next();
  } else {
    //没有token
    //判断是不是登录页面
    if (to.path == "/login") {
      next(); //是的话就放行
    } else {
      //访问的不是登录页面，就要跳转到登录页面
      next({ path: "/login" });
    }
  }
});
import "./utils/recursionRoutes.js"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
