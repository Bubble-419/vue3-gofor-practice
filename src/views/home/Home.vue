<template>
  <div id="home">
    <!-- 头部 -->
    <my-header></my-header>
    <!-- banner -->
    <div class="banner">
      <div class="box" v-for="img in bannerImg" :key="img.name">
        <span>{{ img.name }}</span>
        <img :src="img.src" alt="" />
      </div>
    </div>
    <main>
      <a href="#rec" class="slogan">
        <svg>
          <rect />
        </svg>
        万事皆可跑腿
      </a>
    </main>
    <!-- 随机订单列表 -->
    <home-recommend></home-recommend>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from "components/content/MyHeader";
import MyFooter from "components/content/MyFooter";
import HomeRecommend from "./HomeRecommend";

export default {
  name: "Home",
  components: {
    MyHeader,
    HomeRecommend,
    MyFooter,
  },
  setup() {
    const bannerImg = [
      {
        name: "取快递",
        src: require("assets/images/banner (3).svg"),
      },
      {
        name: "代取物",
        src: require("assets/images/banner (2).svg"),
      },
      {
        name: "拿外卖",
        src: require("assets/images/banner (1).svg"),
      },
      {
        name: "帮打印",
        src: require("assets/images/banner (4).svg"),
      },
    ];
    return {
      bannerImg,
    };
  },
};
</script>

<style scoped>
.banner {
  display: flex;
  width: 1200px;
  height: 380px;
  margin: 50px auto;
  box-sizing: border-box;
}

.box {
  position: relative;
  flex: 1;
  width: 150px;
  height: 300px;
  overflow: hidden;
  transition: 0.5s;
}

.box > img {
  width: 150%;
  object-fit: cover;
  transition: 0.5s;
}

.box:hover {
  flex: 2;
}

.box:hover img {
  width: 100%;
  height: 120%;
}

.box span {
  display: none;
  position: absolute;
  top: 130px;
  left: 0;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  color: var(--font-title-color);
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
}

.box:hover span {
  display: block;
  width: 100%;
  height: 40px;
}

.slogan {
  display: block;
  width: 255px;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 28px 40px;
  font-weight: 700;
  text-align: center;
  font-size: 26px;
  transition: 0.5s;
}

.slogan svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slogan rect {
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke: var(--theme-dark-green);
  stroke-dasharray: 50 600;
  stroke-dashoffset: -438px;
  stroke-width: 3px;
}
@keyframes slogan {
  to {
    stroke-dasharray: 280 0;
    stroke-dashoffset: 0;
    stroke-width: 5px;
  }
}

.slogan rect:hover {
  animation: 0.7s slogan linear forwards;
}
</style>