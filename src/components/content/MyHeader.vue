<template>
  <header>
    <!-- logo -->
    <div class="logo" @click="$router.push({ name: 'Home' })">
      <img src="~assets/images/logo.png" alt=""/>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <input
          type="search"
          placeholder="请按地址搜索..."
          class="search"
          v-model="keywords"
          @keyup.enter="
          $router.push({ name: 'SearchResult', params: { keywords } })
        "
      />
    </div>
    <!-- 用户已登录时展示的部分 -->
    <div v-if="user.isLogin" key="loginHeader" class="login-header">
      <router-link to="/show-echart" tag="span" class="manager" v-if="user.roleId ==1||user.roleId ==2"
      >管理员入口
      </router-link
      >
      <div class="user-center" @click="$router.push({ name: 'PublishOrder' })">
        <el-button type="primary">我要发布</el-button>
        <!-- 个人中心导航 -->
        <el-menu
            menu-trigger="hover"
            mode="horizontal"
            active-text-color="var(--theme-medium-green)"
            :router="true"
        >
          <el-submenu index="1">
            <template #title>
              <el-avatar size="medium" :src="user.userIcon"></el-avatar>
            </template>
            <el-menu-item index="/userinfo">个人中心</el-menu-item>
            <el-menu-item index="/my-published">我的订单</el-menu-item>
            <el-menu-item index="/history">历史浏览</el-menu-item>
            <el-menu-item index="/" @click="toLogout">退出账号</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- 用户未登录时展示的部分 -->
    <el-button
        v-else
        key=""
        class="login"
        @click="$router.push({ name: 'LoginPage' })"
    >登录/注册
    </el-button
    >
  </header>
</template>

<script>
import {reactive, ref, toRefs, onMounted} from "vue";
import {useStore} from "vuex";
import {logout} from "network/user.js";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

export default {
  name: "MyHeader",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      user: {},
    })
    onMounted(() => {
      state.user = store.state.user;
    })
    const keywords = ref("");
    // 退出账号
    const toLogout = () => {
      ElMessageBox.confirm("确定要退出当前账号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        logout().then((res) => {
          if (res.code == 200) {
            // 清除token
            window.localStorage.setItem("token", "");
            window.localStorage.setItem("user", "");
            store.commit("setIsLogin", false);
            store.commit("setUser", {user:''});
            router.go({name: 'Home'});
          }
        });
      });
    };
    return {
      ...toRefs(state),
      keywords,
      toLogout,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: var(--font-color);
  z-index: 100;
}

.logo {
  height: 42px;
  line-height: 42px;
  cursor: pointer;
}

.login {
  width: 180px;
  height: 30px;
}

.search {
  position: relative;
}

.search input {
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px var(--theme-medium-green);
  background: transparent;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.5s;
}

.search::after {
  content: "";
  position: absolute;
  bottom: 19px;
  right: -4px;
  width: 3px;
  height: 15px;
  background: var(--theme-medium-green);
  transform: rotate(135deg);
}

.search input:focus {
  width: 250px;
  padding: 18px;
  cursor: default;
}

.login-header,
.user-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-header {
  width: 340px;
  margin-left: 100px;
}

.user-center {
  width: 250px;
}

.manager {
  font-size: 0.9em;
}

.manager:hover {
  color: var(--theme-medium-green);
  text-decoration: underline;
}
</style>