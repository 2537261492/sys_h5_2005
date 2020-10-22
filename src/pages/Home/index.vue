<template>
  <el-container>
    <!-- 侧边栏 -->
    <!--写了 width="200" 才会动态的收缩自如，不加px才行 -->
    <el-aside width="200">
      <!-- <subMenu></subMenu> -->
      <!-- default-active用于展开一个默认的菜单，collapse用于控制是否是展开收起的 -->
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="isCollapse"
      >
        <el-menu-item index="Welcome">
          <i class="iconfont icon-shouye"></i>
          <span slot="title">首页管理</span>
        </el-menu-item>

        <!--   el-submenu 是具有子菜单的 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-xueyuan"></i>
            <span slot="title">图书管理</span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title">分组一</span> -->
            <el-menu-item index="/StudentManager/studentProduct">
              学生项目管理
            </el-menu-item>
            <el-menu-item index="/StudentManager/studentProfile">
              学术资料
            </el-menu-item>
            <el-menu-item index="/StudentManager/studentDormitory">
              学生宿舍
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- el-menu-item 是常规菜单 -->
        <el-menu-item index="Attendance">
          <i class="iconfont icon-kaoqin"></i>
          <span slot="title">考勤管理</span>
        </el-menu-item>

        <el-menu-item index="Statistics">
          <i class="iconfont icon-shuju1"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>

        <el-menu-item index="Mine">
          <i class="iconfont icon-wode"></i>
          <span slot="title">我的中心</span>
        </el-menu-item>
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
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getLoginLog } from "../../api";
import { mapState } from "vuex";
// import subMenu from "../../components/subMenu";
export default {
  components: {
    // subMenu
  },
  computed: {
    ...mapState(["userInfo"])
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
    }
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
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

.icon-shouqi {
  font-size: 28px;
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
  background-color: #d3dce6;
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
.grid-content {
  /* cursor: text; */
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
}
.el-avatar {
  vertical-align: middle;
}
.quit {
  color: pink;
}
</style>
