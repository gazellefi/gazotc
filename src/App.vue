<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
html,
body,
div,
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.anniucss{
  cursor:pointer
}
</style>
<script>
export default {
  created(){
    if (typeof window.ethereum === 'undefined') {
      this.$notify.error({
        title: '未检测到钱包',
        duration:0,
        message: '请确保网络选择一致，并退出钱包或刷新页面再试一次！'
      });
    }
  }
}
</script>