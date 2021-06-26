<template>
  <div id="order-list">
    <order
      class="order"
      v-for="order in orderList"
      :key="order.orderId"
      :order="order"
    ></order>
  </div>
</template>

<script>
import Order from "./Order.vue";
export default {
  name: "OrderList",
  components: {
    Order,
  },
  props: {
    orderList: {
      type: Array,
      default: function () {
        return [];
      },
      required: true,
    },
  },
};
</script>

<style scoped>
.order {
  margin-bottom: 30px;
}
</style>