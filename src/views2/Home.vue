
<template>
  <div class="homeCont">
    <!-- 侧边栏 -->
    <Header />

    <!-- 右侧 -->
    <div class="views">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }
}
</script>

<style lang="less">
html,
body {
  background-color: #fff;
  margin: 0;
  padding: 0;
}
.homeCont {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.views {
  width: 100%;
  flex: 1;
}
</style>