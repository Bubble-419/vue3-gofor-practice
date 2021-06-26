<template>
  <div id="search-result">
    <my-header></my-header>
    <main>
      <order-page
          :height="600"
          :order-list="results"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @change-page="changePage"
      ></order-page>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "components/content/MyHeader";
import MyFooter from "components/content/MyFooter";
import OrderPage from "components/content/OrderPage";
import {onBeforeMount, reactive, toRefs} from "vue";
import {useRoute} from "vue-router";
import {searchByKeywords} from "network/header.js";

export default {
  name: "SearchResult",
  components: {
    MyHeader,
    MyFooter,
    OrderPage,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      results: [],
      currentPage: 1,
      pageSize: 8,
      total: 0,
    });
    const getResults = () => {
      searchByKeywords({
        currentPage: state.currentPage,
        size: state.pageSize,
        con: route.params.keywords,
      }).then((res) => {
        state.results = res.object.records;
        state.total = res.object.total;
        state.pageSize = res.object.size;
        state.currentPage = res.object.current;
      });
    };
    const changePage = (val) => {
      state.currentPage = val;
      state.results = getResults();
    };
    onBeforeMount(() => {
      getResults();
    });
    return {
      ...toRefs(state),
      changePage,
    };
  },
};
</script>

<style scoped>
main {
  margin-top: 50px;
}
</style>