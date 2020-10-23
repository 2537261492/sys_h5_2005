import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";
//引入nprogress进度条
import NProgress from "nprogress"
//基础地址设置
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";

axios.defaults.withCredentials = true; //允许请求携带认证

//中断请求属性
export let CancelToken = axios.CancelToken;

//创建请求拦截器，可以给每个请求都携带上想要传递的内容
axios.interceptors.request.use(config => {
  //登录和注册是不需要携带token的
  if (config.url == "/users/login") {
    return config;
  } else {
    let token = localStorage.getItem("qf2005-token");
    //config值是每个请求对象
    // console.log(config);
    config.headers["authorization"] = token;
    //放行
    return config;
  }
});

//响应拦截    和相面的请求拦截是差不多的
axios.interceptors.response.use(config => {
  // console.log(config);
  let { data } = config;
  //在当前的后台api中1004（是后端自定义的状态码）代表token校验失败，提示错误并且让页面跳转到登录页
  //10022表示session到期失效
  if (data.code == "1004" || data.code == "10022") {
    //token有失效性
    ElementUI.Message.error("登录信息失效，请重新登录");
    // console.log(ElementUI);
    // alert("登录信息失效，请重新登录")
    localStorage.removeItem("qf2005-token")//清除token不然会一直显示登陆失效进入死循环
    router.push("/login");
    // console.log(router);
    //刷新页面  用于防止页面缓存
    window.location.reload();
  }
  return config;
});
axios.create({
  timeout: 4000
});

export default axios;
