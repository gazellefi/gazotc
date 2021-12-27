<template>
  <div class="f c_b">
  	<el-breadcrumb id="breadcrumb" separator=">">
  	  <el-breadcrumb-item v-for="(v,i) in breadcrumbList" :to="{ path:i==0? v.path=v.redirect:v.path }">{{$t(v.meta.name)}}</el-breadcrumb-item>
  	</el-breadcrumb>
	<div class="fc a_e c_a fz14 hidden-sm-and-down" style="padding-right: 15px;">
		<div class="f a_c">
			<i class="el-icon-s-promotion" style="color: #333;font-size: 16px;margin-top: -4px;margin-right: 5px;"></i>
			<span >{{$t('message.service')}}</span>
		</div>
		<span > {{$t('message.telAccount')}}</span>
	</div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {};
  },
  mounted() {

    this.$store.commit('breadcrumb', this.$route)

    // console.log(this.$store.state.tabs.breadcrumb.matched);
  },
  watch: {
    $route() {
      this.$store.commit('breadcrumb', this.$route)
    }
  },
  computed: {
    breadcrumbList() {
      // console.log('this.$store.state.tabs.breadcrumb.matched.slice(1): ', this.$store.state.tabs.breadcrumb.matched);

      console.log(this.$store.state.breadcrumb);

      return this.$store.state.breadcrumb.matched && this.$store.state.breadcrumb.matched.slice(1)
    }
  },
  methods: {},
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
#breadcrumb {
  line-height: 50px;
  padding: 0 20px;
  height: 50px;
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: #fff !important;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
