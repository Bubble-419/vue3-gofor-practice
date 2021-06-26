<template>
  <div id="user-center">
    <my-header></my-header>
    <main>
      <el-container class="nav">
        <el-aside>
          <el-menu
            :default-active="currentPath"
            :router="true"
            :default-openeds="defaultOpen"
          >
            <el-submenu index="1">
              <template #title> 个人中心 </template>
              <el-menu-item index="/userinfo">修改信息</el-menu-item>
              <el-menu-item index="/security">账号安全</el-menu-item>
              <el-menu-item index="/complain">投诉反馈</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template #title> 我的订单 </template>
              <el-menu-item index="/my-published">我发布的</el-menu-item>
              <el-menu-item index="/my-received">我接受的</el-menu-item>
              <el-menu-item index="/history">历史浏览</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "components/content/MyHeader.vue";
import MyFooter from "components/content/MyFooter.vue";
import { toRefs, reactive } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { MyFooter, MyHeader },
  name: "UserCenter",
  setup() {
    const route = useRoute();

    const state = reactive({
      defaultOpen: ["1", "2"],
      // 当前打开页
      currentPath: route.path,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
main {
  height: 680px;
  background-color: #fff;
  padding: 30px 60px;
}
</style>