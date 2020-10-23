import Vue from "vue";
import Vuex from "vuex";

import { getMenuList } from "@/api"
import recursionRoutes from "./utils/recursionRoutes"//引入递归函数
import allRoutes from "./router/allRoutes"
import dynamicRoutes from "./router/dynamicRoutes"
import router from "./router"
Vue.use(Vuex);
//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = JSON.parse(localStorage.getItem("qf2005-userInfo") || "{}");
export default new Vuex.Store({
  state: {
    userInfo,
    menuList: [], //定义用户侧边栏菜单的
    crumbs: []
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    //设置侧边菜单栏数据
    SET_MENULIST(state, payload) {
      state.menuList = payload
      //动态的将路由添加到routes中 核心方法 router.addRoutes(复合路由配置规则的数据)
      //1.将menuList赋值给dynamicRoutes的children
      let target = dynamicRoutes.find(item => item.path === "/")
      target.children = [...state.menuList]
      //2.动态添加路由配置到router中
      router.addRoutes(dynamicRoutes)
    },
    //设置面包屑
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
    }
  },
  actions: {
    async FETCH_MENULIST({ commit }) {
      //1.发送请求，获取用户菜单数据
      let userMenu = await getMenuList()
      //2.通过allRaoutes和请求回来的用户菜单数据进行对比
      let sideMenu = recursionRoutes(allRoutes, userMenu.data.menuList)
      //3.将结果提交给mutation
      commit("SET_MENULIST", sideMenu)
    }
  },
  modules: {}
});
