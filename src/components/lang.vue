<template>
  <el-dropdown @command="dropdownClickFn" trigger="click">
    <span class="el-dropdown-link">
      {{ $t('message.lang')}}
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="EN"> {{$t('message.lang1')}}</el-dropdown-item>
      <el-dropdown-item command="ZH"> {{$t('message.lang2')}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'lang',
  data() {
    return {};
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {
    dropdownClickFn(e) {
      this.$i18n.locale = e === 'EN' ? "en" : 'zh'
      localStorage.setItem('lang', this.$i18n.locale)



    },
  },
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
/deep/.el-dropdown {
  color: #ffffff !important;
}
</style>