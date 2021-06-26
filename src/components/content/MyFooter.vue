<template>
  <footer class="my-footer w">
    <div class="connect">
      <dl>
        <dt>Connect us</dt>
        <dd>
          <a href=""><i class="iconfont icon-GitHub"></i>Follow us on Github</a>
        </dd>
        <dd>
          <a href=""
            ><i class="iconfont icon-gitee-fill-round"></i>Follow us on Gitee</a
          >
        </dd>
        <dd>
          <a href=""
            ><i class="iconfont icon-huawei"></i>Follow us on Huawei Cloud</a
          >
        </dd>
      </dl>
    </div>
    <div class="about">
      <dl>
        <dt>About</dt>
        <dd><a href="">Privacy Policy</a></dd>
        <dd><a href="">Return Policy</a></dd>
        <dd><a href="">Legal</a></dd>
      </dl>
    </div>
    <div class="help">
      <dl>
        <dt>Help</dt>
        <dd><a href="">FAQ</a></dd>
        <dd><a href="">Contact</a></dd>
      </dl>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap");

.my-footer {
  display: flex;
  justify-content: space-between;
  padding: 80px 150px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
}

.my-footer div {
  width: 200px;
}

.my-footer div dl dt {
  color: #333;
  margin: 30px 0;
}

.my-footer div dl dd {
  font-size: 0.8em;
  margin: 20px 10px;
}
</style>