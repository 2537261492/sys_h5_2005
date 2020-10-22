import axios from "./config";
//登入
export const login = (username, password) =>
  axios({
    url: "/users/login",
    method: "post",
    data: {
      username,
      password
    }
    // headers: { "authorization": token } //用拦截器写
  });

//获取登录日志
export const getLoginLog = () => axios.get("/getloginlog");



