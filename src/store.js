import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//刷新页面会丢失用户信息，所以要从localstorage中取
let userInfo = JSON.parse(localStorage.getItem("qf2005-userInfo") || "{}");
export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {},
  modules: {}
});
