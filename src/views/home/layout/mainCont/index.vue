<template>
  <div class='mainCont'>
    <navBar></navBar>
    <bread></bread>
    <mainItem></mainItem>
  </div>
</template>
<script>
export default {
  name: 'mainCont',
  data() {
    return {};
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: {
    navBar: () => import("./navBar"),
    mainItem: () => import("./mainItem"),
    bread: () => import("./bread"),
  },
};
</script>
<style lang='less' scoped='scoped'>
.mainCont {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  overflow: auto;
}
</style>