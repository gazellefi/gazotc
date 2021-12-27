<template>
  <div class="sideBar">
    <div class="nav hidden-sm-and-down">
      <span>{{morenkey_lang}}</span>
	  <img class="img" src="@/assets/img/option.png" >
      <div class="list" :class="{ishow:imgClick}">
        <li v-for="(item,index) in option1" :key="index"  @click="wlxuanze(item.value)">{{$t(`message.dapp.${item.text}`)}}</li>
      </div>
    </div>
    <el-menu unique-opened router mode="vertical" :show-timeout="200" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse">
      <sideBarItem :sideBarMenus="sideBarMenus"></sideBarItem>
    </el-menu>
  </div>
</template>

<script>

export default {
  components: {
    sideBarItem: () => import("./sidebarItem")
  },
  data() {
    return {
      imgClick: false,
	  morenkey: localStorage.morenkey ? localStorage.morenkey : 'bian',
	  option1: [
	    { text: 'coinNet', value: 'bian' },
	    { text: 'HecoNet', value: 'huobi' },
	    { text: 'EthereumRinkeby', value: 'etfcshi' },
		{ text: 'EthereumNet', value: 'etf' },
		{ text: 'WaveNet', value: 'tron' },
	  ],
    };
  },
  computed: {
    sideBarMenus() {
      let sideBarMenus = this.$router.options.routes.filter(v => v.path == '/home')
      return sideBarMenus[0].children
    },
	morenkey_lang(){
		for (let i = 0; i < this.option1.length; i++) {
			if(this.option1[i].value == this.morenkey){
				return this.$t(`message.dapp.${this.option1[i].text}`)
			}
		}
	},
    isCollapse() {
      return false
    },
  },
  mounted() {
    document.addEventListener('click', this.clickFn)
  },
  methods: {
    clickFn(e) {
      if (e.target.className != 'img') {
        this.imgClick = false;
      } else {
        this.imgClick = !this.imgClick;
      }
    },
	wlxuanze(e) {
	  this.wapcd = false;
	  if (e == 'etfcshi' || e == 'huobi' || e == 'bian') {
	    localStorage.morenkey = e;
	    location.reload();
	  } else {
	    localStorage.morenkey = 'etfcshi';
	    alert('Not yet open');
	  }
	
	},
  },
  destroyed() {
    document.removeEventListener('click', this.clickFn)
  }
};
</script>
<style lang="less" scoped>
@media only screen and (max-width: 991px){
			
		}
@media only screen and (min-width: 991px){
	.sideBar{
		width: 240px !important;
	}
}
.sideBar {
  width: 300px;
  height: 100%;
  background: #062855;
  display: flex;
  flex-direction: column;
  > i {
    // text-align: center;
    // font-size: 26px;
    // cursor: pointer;
    // width: 100%;
    // color: #fff;
  }
  /deep/.el-menu {
    flex: 1;
    overflow: auto;
    border-right: 0;
    background: #062855;
    z-index: 11;
    .el-submenu {
      .el-submenu__title {
        color: #fff;
        &:hover {
          background: #081d3f;
        }
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
    }

    .el-menu-item {
      color: #fff;
      img {
        width: 20px;
        margin-right: 10px;
      }
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background: #081d3f;
    }
    .el-menu-item.is-active {
      background: #081d3f;
      color: #ffc400 !important;
    }
  }
  // 导航
  .nav {
    position: relative;
    line-height: 64px;
    background: #ffc400;
    color: #fff;
    height: 64px;
    text-align: center;
    > .img {
      width: 20px;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    span {
      font-size: 20px;
      font-weight: bold;
      // &:hover + .list {
      //
      // }
    }

    .list {
      // transition: 2s;
      // display: none;
      width: 220px;
      z-index: -66;
      position: absolute;
      right: -220px;
      top: 0;
      background: #fff;
      color: #000;
      box-shadow: 0 0 8px 0 #ccc;
      li {
        line-height: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: #5baeac;
          color: #fff;
        }
      }
    }
    .ishow {
      // display: block;
      z-index: 10;
    }
  }
}
</style>
