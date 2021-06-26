<template>
  <main id="recommend">
    <order-list :orderList="recommendOrderList"></order-list>
    <div class="refresh" @click="getList">
      <i class="el-icon-refresh" v-show="isRefresh">&nbsp;&nbsp;换一组</i>
    </div>
  </main>
</template>

<script>
import OrderList from "components/content/OrderList";
import { getHomeRecommendList } from "network/home.js";
import { computed, onMounted, reactive, toRefs } from "vue";

export default {
  name: "HomeRecommend",
  components: {
    OrderList,
  },
  setup() {
    const state = reactive({
      recommendOrderList: [],
      isRefresh: computed(() => {
        return state.recommendOrderList.length != 0;
      }),
    });
    const getList = () => {
      getHomeRecommendList().then((response) => {
        state.recommendOrderList = response.object;
      });
    };
    onMounted(() => {
      getList();
    });

    return {
      ...toRefs(state),
      getList,
    };
  },
};
</script>

<style scoped>
#recommend {
  padding: 150px 0;
}

.refresh {
  cursor: pointer;
  margin-top: 80px;
  text-align: center;
  color: var(--theme-dark-green);
  font-weight: 900;
  font-size: 1.1em;
}
</style>