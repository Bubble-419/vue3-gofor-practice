<template>
  <div id="security">
    <el-descriptions title="账户安全" column="1">
      <el-descriptions-item label="用户id" class="spacing"
      >{{ store.state.user.userId }}
      </el-descriptions-item
      >
      <el-descriptions-item label="学号" class="spacing"
      >{{ store.state.user.username }}
      </el-descriptions-item
      >
    </el-descriptions>
    <el-form :model="pwds" :rules="rules" ref="user">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="pwds.oldPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="pwds.newPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item class="updBtn">
        <el-button type="primary" @click="onUpdate" :disabled="isDisabled"
        >确认修改
        </el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reactive, watch, toRefs, ref} from "vue";
import {onBeforeRouteLeave} from "vue-router";
import {updatePwd} from "network/user.js";
import {ElMessageBox} from "element-plus";
import {useStore} from "vuex";
import {checkPwd} from "@/utils/formRules.js";

export default {
  name: "Security",
  setup() {
    const store = useStore();
    const state = reactive({
      pwds: {
        oldPwd: "",
        newPwd: "",
      },
      isDisabled: true,
      rules: {
        oldPwd: [{validator: checkPwd, trigger: "blur"}],
        newPwd: [{validator: checkPwd, trigger: "blur"}],
      },
    });
    const user = ref(null);
    onBeforeRouteLeave((to, from, next) => {
      // 信息已修改但未提交
      if (state.isDisabled == false) {
        ElMessageBox.confirm(
            "已修改的信息尚未保存，是否离开当前页面？",
            "提示",
            {
              confirmButtonText: "离开页面",
              cancelButtontext: "留在当前页面",
              type: "warning",
            }
        )
            .then(() => {
              next();
            })
            .catch(() => {
              console.log(to.path, from.path);
              next(from.path);
            });
      } else next();
    });
    const onUpdate = () => {
          user.value.validate((valid) => {
                if (valid) {
                  user.value = {
                    oldPwd: state.pwds.oldPwd,
                    newPwd: state.pwds.newPwd,
                    username: store.state.user.username,
                  }
                  updatePwd(user.value);
                  state.isDisabled = true;
                }
              }
          );
          window.location.reload();
        }
    ;
    watch(
        () => [state.pwds.newPwd],
        () => {
          if (state.isDisabled) {
            state.isDisabled = false;
          }
        },
        {deep: true}
    );
    return {
      store,
      ...toRefs(state),
      onUpdate,
      checkPwd,
      user,
    };
  },
}
;
</script>

<style scoped>
#security {
  padding: 20px;
  font-size: 1.1em;
}

.updBtn {
  margin: 40px 180px;
}
</style>