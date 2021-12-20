<template>
  <div>
    <!-- 无子菜单 父级-->
    <template v-for="(item,index) in sideBarMenus">
      <!-- 有子菜单 -->
      <el-submenu :index="item.path" v-if="item.children && item.children.length>0 && !item.meta.isHideChild" :key="index">
        <template slot="title">
          <img :src="item.meta.icon" alt="">
          <span slot="title">{{ $t(item.meta.name)}} </span>
        </template>
        <sideBarItem :sideBarMenus="item.children"></sideBarItem>
      </el-submenu>
      <!-- 无子菜单 -->
      <el-menu-item v-else :index="item.path" :key="index" v-else-if="!item.meta.isHideChild">
        <img :src="item.meta.icon" alt="">
        <span slot="title">{{ $t(item.meta.name)}} </span>
      </el-menu-item>
    </template>

  </div>

</template>

<script>
export default {
  name: "sideBarItem",
  props: {
    sideBarMenus: {
      type: Array,
    },
  },
};
</script>




