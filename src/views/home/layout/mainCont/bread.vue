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
	<div class="hidden-sm-and-up f a_c" style="padding: 5px 15px 0 0;">
		<div class="f a_c" v-if="showTel" @click="copy">
			<span > {{$t('message.telAccount')}}</span>
		</div>
		<div class="f a_c" @click="showTel = true" v-else>
			<i class="el-icon-s-promotion" style="color: #333;font-size: 16px;margin-top: -4px;margin-right: 5px;"></i>
			<span >{{$t('message.service')}}</span>
		</div>
	</div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
		showTel: false
	};
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
  methods: {
	  async copy() {
	    await this.$nextTick(e => { })
	    var Url2 = document.querySelector(".copy .van-field__control");
	    const input = document.createElement('input');
	    document.body.appendChild(input);
	    input.setAttribute('value', this.$t('message.telAccount'));
	    input.select();
	    if (document.execCommand('copy')) {
	      document.execCommand('copy');
	      this.$toast('联系方式已复制')
		  this.showTel = false
	    }
	    document.body.removeChild(input);
	  
	  },
  },
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
