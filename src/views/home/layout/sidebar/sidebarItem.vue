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
<!--  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu> -->

</template>

<script>
export default {
  name: "sideBarItem",
  props: {
    sideBarMenus: {
      type: Array,
    },
  },
  data(){
	  return {
		  isCollapse: true
	  }
  },
  methods:{
	  handleOpen(key, keyPath) {
		  console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
		  console.log(key, keyPath);
		}
  }
};
</script>




