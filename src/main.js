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
//引入subMenu组件
import qfSubMenu from "qf-sub-menu"
//引入nprogress进度条
import NProgress from "nprogress"
import "nprogress/nprogress.css"

Vue.use(qfSubMenu)
Vue.config.productionTip = false;
Vue.use(ElementUI); //全部引入

//按需引入
// import { Carousel, CarouselItem } from "element-ui"
// 注册组件
// Vue.component("el-carousel", Carousel)
// Vue.component("el-carousel-item", CarouselItem)

//路由前置钩子(导航守卫) 如果，to：去哪里 from：从哪里。 next:放行的，如果不写就不会展现内容
router.beforeEach((to, from, next) => {
  NProgress.start() //进度条出现
  //用户登录之后，localStorage中有token
  let token = localStorage.getItem("qf2005-token");
  // console.log(to);
  if (token) {
    //如果是注册页面或者是登录页面，直接放行
    // console.log(store.state);
    if (store.state.menuList.length == 0) {
      //说明没有用户路由，触发action获取用户路由
      store.dispatch("FETCH_MENULIST").then(() => {
        next({ path: to.path })
        /*这里要注意, next里面要传参数即要进入的页面的路由信息，
        因为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，
        虽然是同一个路由，这么做主要是为了确保addRoutes生效了。*/
      })
    } else {//有menuList可以直接放行
      next();
    }
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
//使用路由后置钩子处理面包屑
router.afterEach((to, from) => {
  // console.log(to);
  NProgress.done() //进度条消失
  //第0项不是我们想要的 所以要删掉第0项
  let crumblist = to.matched.slice(1)
  // console.log(crumblist);
  store.commit("SET_CRUMBS", crumblist)
})

import "./utils/recursionRoutes.js"
import { Store } from "vuex";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
