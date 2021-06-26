<template>
  <div id="detail">
    <my-header></my-header>
    <main>
      <!-- 订单信息 -->
      <order :order="order"></order>
      <!-- 接单人信息 -->
      <div class="receiver" v-if="option.id > 1 && option.id < 7">
        <h4>接单同学</h4>
        <el-card class="small-card">
          <div class="receiver-info">
            <div class="profile">
              <el-avatar size="large" :src="receiver.userIcon"></el-avatar>
              <span>
                {{ receiver.name }}
              </span>
              <span>
                <i class="el-icon-male" v-if="receiver.sex == 0"></i>
                <i class="el-icon-female" v-if="receiver.sex == 1"></i>
              </span>
            </div>
            <span v-show="option.id > 0">
              联系方式：{{ receiver.userContact }} </span
            ><span v-show="option.id > 0"
              >信用：
              {{ receiver.credit }}
            </span>
          </div>
        </el-card>
      </div>
      <!-- 评价信息 -->
      <div class="comment" v-if="commentContent != ''">
        <h4>评价</h4>
        <el-card class="small-card">
          <el-rate
            v-model="commentContent.commentStars"
            disabled
            show-score
          ></el-rate>
          <div class="details" v-if="commentContent.commentDetails != ''">
            {{ commentContent.commentDetails }}
          </div>
        </el-card>
      </div>
      <!-- 回复信息 -->
      <div class="repay" v-if="repayContent">
        <h4>回复</h4>
        <el-card class="small-card">
          {{ repayContent }}
        </el-card>
      </div>
      <!-- 操作按钮 -->
      <el-button type="primary" @click="option.option" :disabled="!option.able"
        >{{ option.label }}
      </el-button>
    </main>
    <!-- 评价动态框 -->
    <el-dialog v-model="commentFormVisible" title="评价">
      <el-form
        ref="commentInfo"
        :model="commentForm"
        :rules="{
          star: [{ required: true, message: '评分不能为空', trigger: 'blur' }],
        }"
      >
        <el-form-item prop="commentStars">
          <el-rate v-model="commentForm.commentStars"></el-rate>
        </el-form-item>
        <el-form-item prop="commentDetails">
          <el-input
            v-model="commentForm.commentDetails"
            type="textarea"
            :rows="4"
            placeholder="写下你的评价..."
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="commentFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmitCom">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 回复评价动态框 -->
    <el-dialog v-model="repayFormVisible" title="回复评价">
      <el-form :model="repayForm">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="写下你的回复..."
            v-model="repayForm.repayDetails"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="repayFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmitRep">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getDetail } from "network/order.js";
import { onMounted, reactive, toRefs, ref } from "vue";
import MyHeader from "components/content/MyHeader.vue";
import Order from "components/content/Order";
import { useStore } from "vuex";
import {
  receiveOrder,
  finishOrder,
  commentOrder,
  commentRepalyOrder,
  getComment,
  getRepay,
} from "network/order.js";
import { getUserInfoById } from "network/user.js";
import { useRouter } from "vue-router";

export default {
  name: "Detail",
  components: { Order, MyHeader },
  setup() {
    const route = useRoute();
    getDetail({ orderId: route.params.orderId }).then((res) => {
      state.order = res.object;
    });
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      order: {},
      option: {},
      // 操作按钮的可行操作数组
      options: [
        {
          id: 0,
          label: "我要接单",
          able: true,
          option: () => {
            receiveOrder(
              {
                orderId: route.params.orderId,
                userId: store.state.user.userId,
              },
              state.order
            );
            router.push({ name: "MyReceived" });
          },
        },
        {
          id: 1,
          label: "我要修改",
          able: true,
          option: () => {
            router.push({
              name: "UpdateOrder",
              params: { orderId: state.order.orderId },
            });
          },
        },
        {
          id: 2,
          label: "我已完成",
          able: true,
          option: () => {
            finishOrder({ orderId: state.order.orderId });
            router.push({ name: "MyReceived" });
          },
        },
        {
          id: 3,
          label: "待完成",
          able: false,
        },
        {
          id: 4,
          label: "我要评价",
          able: true,
          option: () => {
            state.commentFormVisible = true;
          },
        },
        {
          id: 5,
          label: "我要回复",
          able: true,
          option: () => {
            state.repayFormVisible = true;
          },
        },
        {
          id: 6,
          label: "已完成",
          able: false,
        },
        {
          id: 7,
          label: "订单无效",
          able: false,
        },
      ],
      // 评价表单
      commentForm: {
        commentDetails: "",
        commentStars: 0,
      },
      commentFormVisible: false,
      // 回复表单
      repayForm: {
        repayDetails: "",
      },
      repayFormVisible: false,
      // 接单人信息
      receiver: {},
      // 展示回复、评价
      commentContent: "",
      repayContent: "",
    });
    const commentInfo = ref(null);
    const onSubmitCom = () => {
      state.commentFormVisible = false;
      commentInfo.value.validate((valid) => {
        if (valid) {
          commentInfo.value = {
            orderId: state.order.orderId,
            commentStars: state.commentForm.commentStars,
            commentDetails: state.commentForm.commentDetails,
            commentPic: "",
          };
          commentOrder(commentInfo.value);
        }
      });
    };
    const onSubmitRep = () => {
      state.repayFormVisible = false;
      commentRepalyOrder({
        commentId: state.commentContent.commentId,
        replayDetails: state.repayForm.repayDetails,
      });
    };
    onMounted(() => {
      // 判断optionId
      let optionId = 0;
      if (
        // 订单是未接单状态且当前用户不是发单人
        state.order.orderStatus == 0 &&
        store.state.user.userId != state.order.publisherId
      ) {
        optionId = 0;
      } else if (
        // 订单是未接单状态且当前用户是发单人
        state.order.orderStatus == 0 &&
        store.state.user.userId == state.order.publisherId
      ) {
        optionId = 1;
      } else if (
        // 订单是已接单状态且当前用户是接单人
        state.order.orderStatus == 1 &&
        store.state.user.userId == state.order.receiverId
      ) {
        optionId = 2;
      } else if (
        // 订单是已接单状态且当前用户是发单人
        state.order.orderStatus == 1 &&
        store.state.user.userId == state.order.publisherId
      ) {
        optionId = 3;
      } else if (
        // 订单是已完成状态且当前用户是发单人或接单人
        state.order.orderStatus == 2 &&
        (store.state.user.userId == state.order.publisherId ||
          store.state.user.userId == state.order.receiverId)
      ) {
        optionId = 4;
      } else if (
        // 订单是已评价状态且当前用户是发单人或接单人
        state.order.orderStatus == 3 &&
        (store.state.user.userId == state.order.publisherId ||
          store.state.user.userId == state.order.receiverId)
      ) {
        optionId = 5;
      }
      // 订单是已完成状态
      else if (state.order.orderStatus >= 2 && state.order.orderStatus < 4) {
        optionId = 6;
      } else {
        // 订单无效
        optionId = 7;
      }
      // 把筛选出来的option赋给按钮绑定的option变量
      state.option = state.options.find((o) => o.id == optionId);
      // 判断是否展示接单人信息
      if (state.order.orderStatus >= 1 && state.order.orderStatus != 4) {
        getUserInfoById({ userId: state.order.receiverId }).then((res) => {
          state.receiver = res.object;
        });
      }
      // 判断是否应该展示评论和回复信息
      if (state.order.orderStatus == 3) {
        getComment({ orderId: state.order.orderId })
          .then((res) => {
            state.commentContent = res.object;
          })
          .then(() => {
            // 判断comment是否存在
            if (state.commentContent.commentId) {
              getRepay({ commentId: state.commentContent.commentId }).then(
                (res) => {
                  state.repayContent = res.object.replayDetails;
                }
              );
            }
          });
      }
    });

    return {
      ...toRefs(state),
      onSubmitCom,
      commentInfo,
      onSubmitRep,
    };
  },
};
</script>

<style scoped>
#detail main {
  padding: 80px 0;
  margin-bottom: 50px;
}

.receiver,
.comment,
.repay {
  margin: 30px 0;
}

h4 {
  margin-bottom: 10px;
}

.small-card {
  height: 70px;
}

.receiver-info,
.profile {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.profile {
  width: 150px;
}
</style>