<style>
</style>
<template>
  <div>
    <van-nav-bar title="Rule description" :border="true" :fixed="true" :placeholder="true" :safe-area-inset-top="true" :z-index="50" left-arrow @click-left="onClickLeft" />
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
}
</script>