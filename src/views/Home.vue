<style>

  html,body{
    background-color: #fff;
    margin: 0;
    padding: 0;
  }
  .views{
    width: 100%;
    float: left;
  }
</style>
<template>
<div  :style="{'background-color':$route.path != '/' ? '':'#fff'}">
    <Header />
    <div class="views">
      <router-view />
    </div>
</div>
</template>
<script>
import Header from "../components/Header";
export default {
  components:{
    Header
  }
}
</script>