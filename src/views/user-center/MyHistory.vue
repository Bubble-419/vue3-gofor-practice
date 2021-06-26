<template>
  <div id="my-history">
    <el-scrollbar height="500px">
      <order-list :order-list="orderList"></order-list>
    </el-scrollbar>
  </div>
</template>

<script>
import OrderList from "components/content/OrderList";
import {reactive, toRefs} from "vue";
import {useStore} from "vuex";
import {getHistory} from "network/order.js";

export default {
  name: "MyHistory",
  components: {
    OrderList,
  },
  setup() {
    const store = useStore();
    getHistory({
      username: store.state.user.username,
    }).then((res) => {
      state.orderList = res.object;
    });
    const state = reactive({
      orderList: [],
      total: 0,
      currentPage: 1,
      pageSize: 8,
    });
    // 获取订单列表
    // onBeforeMount(() => {
    // });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
</style>