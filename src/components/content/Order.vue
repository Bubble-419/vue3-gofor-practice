<template>
  <el-card
      id="order-box"
      @click="
      $router.push({ name: 'Detail', params: { orderId: order.orderId } })
    "
  >
  <!-- 发布者信息展示 -->
    <el-space :size="20" class="publisher-info">
      <el-avatar size="large" :src="publisher.publisherIcon"></el-avatar>
      <span>{{ publisher.publisherName }}</span>
      <span
          class="phone"
          v-show="store.state.user.userId == order.receiverId"
      >{{ publisher.publisherContact }}</span
      >
    </el-space>
    <!-- 订单信息展示 -->
    <el-card shadow="never" class="order">
      <template #header>
        <div class="order-header">
          <div>
            <el-tag>{{ orderStatusName }}</el-tag>
            <span class="order-category">{{ orderCategoryName }}</span>
          </div>
          <h3 class="price">￥{{ order.price }}</h3>
        </div>
      </template>
      <div class="order-body">
        <div>取件地址：{{ order.takeAddress }}</div>
        <div>收件地址：{{ order.sendAddress }}</div>
        <div>订单备注：{{ order.orderNote }}</div>
      </div>
    </el-card>
  </el-card>
</template>

<script>
import {getUserInfoById} from "network/user.js";
import {reactive, toRefs} from "vue";
import {useStore} from "vuex";

export default {
  name: "Order",
  props: {
    order: {
      type: Object,
      default: function () {
        return {};
      },
      required: true,
    },
  },
  setup(props) {
    // 获取订单发布者信息
    getUserInfoById({userId: props.order.publisherId}).then((res) => {
      state.publisher.publisherName = res.object.name;
      state.publisher.publisherIcon = res.object.userIcon;
      state.publisher.publisherContact = res.object.userContact;
    });
    const store = useStore();
    const state = reactive({
      publisher: {
        publisherName: "",
        publisherIcon: "",
        publisherContact: 0,
      },
      // 利用getters通过id获得种类和状态的中文名
      orderCategoryName: store.getters.getOrderCategory(
          props.order.orderCategoryId
      ),
      orderStatusName: store.getters.getOrderStatus(props.order.orderStatus),
    });

    return {
      ...toRefs(state),
      store,
    };
  },
};
</script>

<style scoped>
#order-box {
  padding: 5px 20px;
  cursor: pointer;
}

.publisher-info {
  position: relative;
  margin: 5px 10px;
}

.order {
  padding: 0 25px;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  font-size: 1.5em;
  color: var(--price-color);
}

.order-category {
  margin-left: 18px;
  color: var(--font-title-color);
}

.order-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  padding: 0 30px;
}

.phone {
  font-size: 1.1em;
  font-weight: 700;
  margin-left: 40px;
}

.phone::after {
  position: absolute;
  right: 20px;
  bottom: 0;
  content: "仅对接单人可见";
  font-size: 0.7em;
  color: var(--theme-dark-green);
  font-weight: 400;
}
</style>