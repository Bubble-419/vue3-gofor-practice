<template>
  <div id="login-page">
    <div class="flip-button">
      <el-switch
        v-model="isLogin"
        active-text="LOG IN"
        inactive-text="SIGN UP"
        inactive-color="var(--theme-dark-green)"
      ></el-switch>
    </div>
    <main>
      <div class="box" :class="{ flip: !isLogin }">
        <login-form class="front"></login-form>
        <register-form class="back"></register-form>
      </div>
    </main>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { ref } from "vue";
export default {
  name: "LoginPage",
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    let isLogin = ref(true);
    return {
      isLogin,
    };
  },
};
</script>

<style scoped>
@import "~assets/css/loginPage.css";

#login-page {
  height: 100vh;
}

#login-page,
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

main {
  height: 100%;
  perspective: 600px;
  overflow: hidden;
}

.flip-button {
  margin-top: 60px;
}

.box {
  position: relative;
  width: 560px;
  height: 550px;
  border-radius: 6px;
  transform-style: preserve-3d;
  transition: 0.8s;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

.flip {
  transform: rotateY(180deg);
}
</style>