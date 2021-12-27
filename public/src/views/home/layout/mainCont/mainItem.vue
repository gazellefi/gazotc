<template>
  <div class='mainItem'>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'mainItem',
  data() {
    return {};
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: {}
};
</script>
<style lang='less' scoped='scoped'>
.mainItem {
  flex: 1;
  padding: 0 20px;
  padding-bottom: 20px;
  overflow: auto;
}
body::-webkit-scrollbar { width: 0 !important }
@media screen and (max-width: 500px) {
  .mainItem {
    padding: 10px;
	background-color: #fff;
	border-top: 1px solid #EEEEEE;
  }
}
</style>