<template>
  <div class="subMenu">
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
  </div>
</template>
<script>
export default {
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
    }
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>