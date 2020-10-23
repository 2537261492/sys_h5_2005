<template>
  <el-container>
    <!-- 侧边栏 -->
    <!--写了 width="200" 才会动态的收缩自如，不加px才行 -->
    <el-aside width="200">
      <h1 class="logo"></h1>
      <!-- default-active用于展开一个默认的菜单，collapse用于控制是否是展开收起的 
      :default-active 动态的处理导航高亮显示-->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="isCollapse"
      >
        <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部栏 -->
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6"
            ><div class="grid-content bg-purple-right">
              <i
                class="iconfont icon-shouqi"
                @click="isCollapse = !isCollapse"
              ></i>
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">
              千锋管理系统
            </div></el-col
          >
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-avatar
                :size="40"
                fit="fit"
                src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"
              >
              </el-avatar>
              <span class="text">欢迎您：</span>
              <span class="nickname">{{ userInfo.nickname }}</span>
              <span class="quit" @click="quit">退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{ path: crumbs.path }"
            v-for="crumbs in crumbs"
            :key="crumbs.id"
            >{{ crumbs.meta.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import { getLoginLog } from "../../api";
import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["userInfo", "menuList", "crumbs"])
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登录
      //1.清除token和userInfo
      //2.跳转到登录页
      localStorage.removeItem("qf2005-token");
      localStorage.removeItem("qf2005-userInfo");
      this.$router.push("/login");
      //刷新页面  用于防止页面缓存
      window.location.reload();
    }
  },
  mounted() {
    // getLoginLog().then(res => {
    //   console.log(res);
    // });
  }
};
</script>
<style>
.icon-shouye,
.icon-xueyuan,
.icon-shuju1,
.icon-kaoqin,
.icon-wode {
  font-size: 25px;
  margin-right: 10px;
}
.el-menu-item,
.el-menu-item i,
.el-submenu__title,
.el-submenu__title i {
  color: #4e5bf8;
}
.el-menu-item.is-active {
  color: rgb(255, 47, 99);
}
.icon-shouqi {
  font-size: 33px !important;
}
.bg-purple-light {
  font-size: 25px;
}
.el-header {
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: center;
  line-height: 60px;
  background: linear-gradient(135deg, #4c67ff, #5635df);
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.29);
  padding-left: 0;
  /* background-color: #41b883; */
  color: #fff;
  text-align: center;
  /* line-height: 60px; */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  background-color: #6e50e7;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  text-align: center;
  line-height: 60px;
}
.bg-purple-right {
  padding-left: 10px;
  text-align: left;
  cursor: pointer;
}
.bg-purple {
  cursor: pointer;
}
.text {
  cursor: text;
  padding: 0 6px;
}
.el-avatar {
  vertical-align: middle;
}
.quit {
  color: pink;
}
.nickname {
  padding-right: 8px;
}
.logo {
  height: 60px;
  background: linear-gradient(135deg, #4c67ff, #5635df);
  background-image: url("../../assets/styles/imgs/logo.be8bbddf.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 50%;
}
</style>
