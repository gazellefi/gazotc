<template>
  <div id="navbar">
    <!-- 左侧 -->
    <div class="title" @click="$router.push('/HomePage')">
      <img src="@/assets/img/title.png" alt="">
      <span class="hidden-sm-and-down">{{ $t("message.dapp.website") }}</span>
    </div>
    <div class="selectType hidden-sm-and-up">
      <!-- <van-dropdown-menu>
        <van-dropdown-item v-model="morenkey" :options="option1" />
      </van-dropdown-menu> -->
	  <el-select v-model="morenkey" placeholder="Please select" class="select_nav">
	    <el-option v-for="item in option1" :key="item.value" :label="item.text" :value="item.value">
	    </el-option>
	  </el-select>
    </div>
    <div class="right">
      <!-- 语言 -->
      <lang class="lang"></lang>
      <!-- 下拉选项 -->
      <el-dropdown class="info hidden-sm-and-down" trigger="click">
        <span class="el-dropdown-link">
          <img src="@/assets/dappImg/avt.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="userInfo hidden-sm-and-down">
        <div>小行星</div>
        <div>45646546</div>
      </div>

      <div class="menu hidden-sm-and-up" @click="show=true">菜单</div>

      <van-popup class="nav2" v-model="show" position="right" :style="{ width: '50%' ,height:'100%'}">
        <sidebar></sidebar>
      </van-popup>
    </div>
  </div>
</template>

<script>
import lang from "@/components/lang";
import sidebar from "../sidebar";

export default {
  name: "navbar",
  data() {
    return {
      morenkey: localStorage.morenkey ? localStorage.morenkey : 'bian',
      option1: [
        { text: this.$t("message.dapp.coinNet"), value: 'bian' },
        { text: this.$t("message.dapp.HecoNet"), value: 'huobi' },
        { text: this.$t("message.dapp.EthereumRinkeby"), value: 'etfcshi' },
		{ text: this.$t("message.dapp.EthereumNet"), value: 'etf' },
		{ text: this.$t("message.dapp.WaveNet"), value: 'tron' },
      ],

      title: process.env.VUE_APP_TITLE,
      show: false
    };
  },
  created() { 
	  console.log(this.morenkey);
  },
  methods: {
    showMenu() {

    },
    //退出登录
    async  exit() {

      this.$store.commit("LOGOUT");
      this.$message({
        message: "退出成功",
        type: "success"
      });
    }
  },
  computed: {
    //获取用户昵称
    userName() {
      return (
        localStorage.username
      );
    }
  },
  components: {
    lang, sidebar
  },
  watch: {
    $route() {
      this.show = false
    }
  }
};
</script>

<style lang="less" scoped>
#navbar {
  line-height: 64px;
  box-shadow: 0 0 4px #999;
  height: 64px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background: #fff;

  // background-image: linear-gradient(to right, #3b9dea, #6ccbf6, #3a9cea);

  .title {
    // flex: 0 1 160px;
    line-height: 60px;
    font-size: 20px;
    color: #000;
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
  }

  .info {
    line-height: 60px;
    cursor: pointer;
    .el-dropdown-link {
      color: #000;
    }
    .avatar {
      vertical-align: top;
      margin-top: 8px;
      margin-left: 10px;
    }
  }
  .right {
    display: flex;
    .lang {
      color: #000;
      margin-right: 20px;
    }
    .menu {
      font-size: 14px;
    }
    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
}

.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #666;
  > div {
    line-height: 16px;
    font-size: 14px;
  }
}

/deep/.selectType {
  display: flex;
  justify-content: center;
  align-items: center;
  .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .van-cell {
    height: 40px;
    line-height: 40px;
  }
}
.select_nav {
	/deep/ .el-input__inner{
		border: none;
		width: 200px;
		font-size: 18px;
		font-weight: bolder;
		color: #333;
	}
	/deep/ .el-input__suffix-inner{
		color: #000;
		font-weight: bolder;
	}
}

@media only screen and (max-width: 991px){
		
	}
@media only screen and (min-width: 991px){
	
}

</style>