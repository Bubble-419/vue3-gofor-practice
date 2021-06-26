<template>
  <div id="user-info">
    <!-- 头像上传模块，上传地址action待修改 -->
    <el-upload
        class="avatar-upload"
        action="http://the5gofor.oss-cn-guangzhou.aliyuncs.com"
        :data="avatar"
        :show-file-list="false"
        :multiple="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.userIcon" :src="user.userIcon" class="avatar"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 其他修改信息模块 -->
    <el-form :model="user">
      <el-form-item label="姓名" prop="name">
        <el-input :placeholder="user.name" v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="userContact">
        <el-input
            :placeholder="user.userContact"
            v-model="user.userContact"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在校区">
        <el-select v-model="user.userPosition">
          <el-option
              v-for="p in positions"
              :key="p.value"
              :label="p.label"
              :value="p.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate" :disabled="isDisabled"
        >确认修改
        </el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getUserInfo, updateUserInfo} from "network/user.js";
import {policy} from "network/oss.js"
import { reactive, toRefs, watch} from "vue";
import {onBeforeRouteLeave} from "vue-router";
import {ElMessageBox} from "element-plus";
import {useStore} from "vuex";

export default {
  name: "UserInfo",
  setup() {
    const store = useStore();
    const state = reactive({
      user: {},
      isDisabled: true,
      positions: store.state.positions,
      avatar: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
      }
    });

    // 上传头像前生成oss对象
    const beforeAvatarUpload = (file) => {
      return new Promise((resolve, reject) => {
        policy().then(response => {
          console.log('accessKeyId:' + response.object.accessKeyId)
          state.avatar.policy = response.object.policy;
          state.avatar.signature = response.object.signature;
          state.avatar.ossaccessKeyId = response.object.accessKeyId;
          state.avatar.key = response.object.dir + `${file.name}`;
          state.avatar.dir = response.object.dir;
          state.avatar.host = response.object.host;
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    };
    // 获取头像src
    const handleAvatarSuccess = (res, file) => {
      state.user.userIcon = 'https://the5gofor.oss-cn-guangzhou.aliyuncs.com' + '/' + state.avatar.dir + file.name;
    };
    
    // 提示用户
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
              next(from.path);
            });
      } else next();
    });
    const onUpdate = () => {
      // 后端修改
      updateUserInfo(state.user);
      // 前端修改
      window.localStorage.setItem("user", JSON.stringify(state.user))
      store.commit("setUser", {
        user: state.user,
      });
      state.isDisabled = true;
      window.location.reload();
    };
    (async () => {
      // 展示用户信息
      await getUserInfo().then((res) => {
        state.user = res;
      });
      // 深度监听user对象是否发生改变，只有改变时修改按钮才会亮起（允许提交修改）
      watch(
          () => [state.user],
          () => {
            if (state.isDisabled == true) {
              state.isDisabled = false;
            }
          },
          {deep: true}
      );
    })();

    return {
      ...toRefs(state),
      onUpdate,
      beforeAvatarUpload,
      handleAvatarSuccess,
    };
  },
};
</script>

<style scoped>
#user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-form {
  width: 300px;
}

.avatar-upload {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  text-align: center;
  line-height: 120px;
  border: 1px dashed var(--font-title-color);
  cursor: pointer;
  margin-bottom: 30px;
  overflow: hidden;
}

img.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.el-button {
  width: 100%;
  margin-top: 40px;
}
</style>