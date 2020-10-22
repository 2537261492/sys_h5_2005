console.log(99999999999);
module.exports = {
  lintOnSave: false,
  //配置代理
  devServer: {
    proxy: {
      "/api": {
        //正则匹配到以这个开头的时候 就用代理
        target: "http://chst.vip", //指向的是目标服务器
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  }
};
