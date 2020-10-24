<template>
  <div class="login">
    <div class="left"></div>
    <video
      src="../../../src/assets/styles/bg_video.d2d602a9.mp4"
      autoplay="autoplay"
      muted
      loop="loop"
      preload="auto"
      class="bg_video"
    ></video>
    <div class="login-page">
      <h1 class="title">
        千锋管理系统
      </h1>

      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            @keydown.native.enter="submitForm('loginForm')"
            v-model="loginForm.password"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha">
          <el-input
            type="text"
            class="captcha"
            v-model="loginForm.captcha"
            autocomplete="off"
          >
          </el-input>
          <span class="captcha-svg" v-html="captchaSvg">123123</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">
            提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* 登录逻辑的实现
1.收集用户输入的nsername&password传递给后端（需要发请求就要安装axios）：config.js来配置axios
2.登录通过后，将后端返回的token存到本地，跳转到主页
3.每次请求的时候，携带token到请求头authorization
4.展示token校验正确的数据
5.校验不通过，跳转到登录页 */

import {
  login,
  getCaptcha,
  refreshCaptcha,
  verifyCaptcha
} from "../../api/index";
import { mapMutations } from "vuex";
export default {
  data() {
    //jsDoc  注释
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback 校验通过不传参 不通过传参
     */
    var validateUsername = (rule, value, callback) => {
      //用户名正则，4到16位(字母，数字，下划线，减号)
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      // if (!uPattern.test(value)) {
      if (!value) {
        // callback("4到16位(字母，数字，下划线，减号");
        callback("请输入用户名");
      } else {
        callback();
      }
      // console.log(rule);
      // console.log(value);
    };
    //校验用户密码
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    //校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "" || value.length !== 5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      captchaSvg: "", //从服务器获取下来的验证码Svg结构
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        //validator:传入校验的函数，trigger：触发它的条件：失去焦点
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    //设置验证码
    set_captcha() {
      getCaptcha().then(res => {
        console.log(res);
        this.captchaSvg = res.data.img;
      });
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      // console.log(this.$refs[formName]);
      //获取注册在refs对象上面的组件的引用
      this.$refs[formName].validate(async valid => {
        //代表本地校验通过之后
        if (valid) {
          //先验证验证码是否正确 如果正确再发送登录请求
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          console.log(verifyRes);
          if (!verifyRes.data.state) {
            //验证码不正确
            this.$message.error("验证码输入错误，请重新输入");
            return;
          }
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登录",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // console.log(this.loginForm.username, this.loginForm.password);//获取到了账号，密码
          //发送登录请求
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              //服务器响应了，关闭loading动画
              loading.close();
              console.log(res);
              if (res.data.state) {
                this.$message.success("登录成功");
                //用户名密码正确
                localStorage.setItem("qf2005-token", res.data.token);
                localStorage.setItem(
                  "qf2005-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vues中state["userInfo"]的值
                this.SET_USERINFO(res.data.userInfo);
                //跳转到主页
                this.$router.push("/Welcome");
              } else {
                //用户名或者密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
/* 表单样式 */
.el-form {
  width: 400px;
}

.login {
  /* position: absolute; */
  overflow: hidden;
  background: url("../../assets/styles/imgs/bg.824f963d.jpg");
}
.login-page {
  width: 400px;
  height: 510px;
  position: absolute;
  top: 50%;
  left: 75%;
  z-index: 9;
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.15);
}
.bg_video {
  width: 1920px;
  height: 1080px;
}
.left {
  width: 50%;
  height: 100%;
  background: url(../../assets/styles/imgs/bg2.fc58c850.png);
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
  z-index: 8;
}
.title {
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}

.el-form-item__label {
  color: #fff;
}
.el-button {
  cursor: pointer;
  text-align: center;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 14px;
  width: 249px;
  background: linear-gradient(90deg, #1596fb, #002dff);
}
/* 验证码 */
</style>
