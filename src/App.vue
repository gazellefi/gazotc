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
        title: '未连接钱包',
        duration:0,
        message: '系统检测您未连接钱包插件！'
      });
    }
  }
}
</script>