<template>
  <div id="my-published">
    <order-page
      :order-list="orderList"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @change-page="changePage"
    ></order-page>
  </div>
</template>

<script>
import OrderPage from "components/content/OrderPage";
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { publishedOrders } from "network/order.js";
export default {
  name: "MyPublished",
  components: {
    OrderPage,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      orderList: [],
      total: 20,
      currentPage: 1,
      pageSize: 5,
    });
    // 获取订单列表
    const getList = () => {
      publishedOrders({
        publisherId: store.state.user.userId,
        currentPage: state.currentPage,
        size: state.pageSize,
      }).then((res) => {
        state.orderList = res.object.records;
        state.total = res.object.total;
        state.currentPage = res.object.current;
        state.pageSize = res.object.size;
      });
    };
    const changePage = (val) => {
      state.currentPage = val;
      state.orderList = getList();
    };
    onMounted(() => {
      getList();
    });
    return {
      ...toRefs(state),
      changePage,
    };
  },
};
</script>

<style scoped>
</style>