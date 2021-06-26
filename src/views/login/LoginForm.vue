<template>
  <div id="login">
    <h2>LOG IN</h2>
    <el-form status-icon :model="loginForm" :rules="rules" ref="loginInfo">
      <el-form-item prop="username">
        <el-input
            placeholder="学号"
            v-model.number="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            type="password"
            placeholder="密码"
            v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="code">
        <el-input v-model="loginForm.code" placeholder="点击更换图片"></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <a href="#">忘记密码？</a>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import {login, getUserInfo} from "network/user.js";
import {checkUsername, checkPwd} from "@/utils/formRules.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Captcha from "components/content/Captcha";

export default {
  name: "Login",
  components: {Captcha},
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [{validator: checkUsername, trigger: "blur"}],
        password: [{validator: checkPwd, trigger: "blur"}],
        code: [
          {required: true, message: "验证码不能为空", trigger: "blur"},
        ],
      },
    });
    const loginInfo = ref(null);

    // 登录按钮绑定事件
    const onSubmit = () => {
      loginInfo.value.validate((valid) => {
        if (valid) {
          (async () => {
            loginInfo.value = state.loginForm;
            await login(loginInfo.value).then(res => {
              if (res.code == 200) {
                // 储存用户token
                window.localStorage.setItem("token", res.object.token);
                // vuex储存用户登陆状态
                store.commit("setIsLogin", true);
              }
            });
            // 储存序列化后的用户对象
            await getUserInfo().then(res => {
              // 储存在localStorage，防止刷新后vuex里的信息丢失
              window.localStorage.setItem("user", JSON.stringify(res))
              // 储存在vuex，方便内部取用
              store.commit("setUser", {
                user: window.localStorage.getItem('user'),
              });
            });
          })();
          // 返回用户登陆前的浏览界面
          router.go(-1);
        } else return false;
      });
    };


    return {
      ...toRefs(state),
      loginInfo,
      checkUsername,
      checkPwd,
      onSubmit,
    };
  },
};
</script>

<style scoped>
</style>