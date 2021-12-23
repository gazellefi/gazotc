<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
html,
body,
div,
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.anniucss {
  cursor: pointer;
}
/* // 浏览器滚动条********************************************************************************** */
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 15px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  /* // background: linear-gradient(to right, #e7eff5, #8d8c92); */
  background: #8d8c92;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  /* //   box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   background   : #535353; */
}
</style>
<script>
export default {
  created() {
    if (typeof window.ethereum === 'undefined') {
      // this.$notify.error({
      //   title: '未检测到钱包',
      //   duration:0,
      //   message: '请确保网络选择一致，并退出钱包或刷新页面再试一次！'
      // });
    }
  }
}
</script>