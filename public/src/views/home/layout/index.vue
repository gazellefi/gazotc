
<template>
  <div class="homeCont">
    <!-- 侧边栏 -->
    <sidebar class="hidden-sm-and-down" />

    <!-- 右侧 -->
    <mainCont />

  </div>
</template>
<script>
import sidebar from "./sidebar";
import mainCont from "./mainCont";
export default {
  components: {
    sidebar, mainCont
  }
}
</script>

<style lang="less" scope="scoped">
.homeCont {
  height: 100%;
  display: flex;
}
</style>