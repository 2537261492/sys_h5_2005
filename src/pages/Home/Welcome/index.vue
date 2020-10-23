<template>
  <div>
    <h1>登录日志</h1>
    <button @click="send">发送请求</button>
    <button @click="abort">发送中断请求</button>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  methods: {
    send() {
      getLoginLog(this).then(res => {
        //this指向组件实例 把this传给了api里的index文件里的_this然后添加了一个cancel的属性，现在在任意一个地方都可以使用一个cancel的方法
        console.log(res);
      });
    },
    abort() {
      if (typeof this.cancel === "function") {
        this.cancel();
      }
    }
  }
};
</script>