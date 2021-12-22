<template>
  <div id="navbar">
    <!-- 左侧 -->
    <div class="title" @click="$router.push('/HomePage')">
      <img src="@/assets/img/title.png" alt="">
      <span class="hidden-sm-and-down">{{ $t("message.dapp.website") }}</span>
    </div>
    <div class="selectType hidden-sm-and-up">
      <!-- <van-dropdown-menu @change="changeDrop">
        <van-dropdown-item v-model="morenkey" :options="option1" />
      </van-dropdown-menu> -->
	  <el-select v-model="morenkey_text" placeholder="Please select" class="select_nav"  @change="changeDrop">
	    <el-option v-for="item in option1" :key="item.value" :label="$t(`message.dapp.${item.text}`)" :value="item.text">
	    </el-option>
	  </el-select>
    </div>
    <div class="right">
      <!-- 语言 -->
      <lang class="lang" style="width: 50px;" @changeLang="changeLang"></lang>
      <!-- 下拉选项 -->
	  <div class="el-dropdown-link marr-10">
	    <img src="@/assets/dappImg/avt.png" alt="">
	  </div>
     <!-- <el-dropdown class="info hidden-sm-and-down" trigger="click">
        <span class="el-dropdown-link">
          <img src="@/assets/dappImg/avt.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="exit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <div class="userInfo hidden-sm-and-down">
        <div>{{nickname}}</div>
        <div>{{queryAddr}}</div>
      </div>

      <div class="menu hidden-sm-and-up" @click="show=true" style="width: 30px;">{{$t('message.menu')}}</div>

      <van-popup class="nav2" v-model="show" position="right" :style="{ width: '50%' ,height:'100%'}">
        <sidebar></sidebar>
      </van-popup>
    </div>
  </div>
</template>

<script>
import lang from "@/components/lang";
import sidebar from "../sidebar";
import api from '@/api/api'
import Web3 from "web3";
import Web3Modal from "web3modal";
import Sha256 from "crypto-js/sha256";
import { Base64 } from "js-base64";
import config from "@/config";
import { Toast } from "vant";
import axios from "axios";
import QRCode from "qrcodejs2";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
// import VConsole from "vconsole";
// new VConsole();

var web3 = "";
var address = "";
var dotc;
var pri;
var usdt;
var ethereum = window.ethereum;
//var huobiarr = config['hbi'][config['key']];
var dotc_abi = config["hyue"]["bian"]["dotc"]["abi"];
var dotc_key = config["hyue"]["bian"]["dotc"]["heyue"];
var pri_abi = config["hyue"]["bian"]["Pripla"]["abi"];
var pri_key = config["hyue"]["bian"]["Pripla"]["heyue"];
var u_abi = config["hbi"]["bian"]["USDT"]["abi"];
var u_key = config["hbi"]["bian"]["USDT"]["heyue"];
export default {
  name: "navbar",
  data() {
    return {
      morenkey: localStorage.morenkey ? localStorage.morenkey : 'bian',
	  morenkey_text: '',
      option1: [
        { text: 'coinNet', value: 'bian' },
        { text: 'HecoNet', value: 'huobi' },
        { text: 'EthereumRinkeby', value: 'etfcshi' },
      		{ text: 'EthereumNet', value: 'etf' },
      		{ text: 'WaveNet', value: 'tron' },
      ],

      title: process.env.VUE_APP_TITLE,
      show: false,
	  queryAddr: '',
	  nickname: ''
    };
  },
  mounted() { 
	  this.changeDrop(this.morenkey)
	  var dq = this
	  //监测用户是否安装MASK
	  if (typeof ethereum === "undefined") {
	    webinit(false);
	  } else {
	    //初始化
	    webinit(true);
	  }
	  Toast.setDefaultOptions("loading", {
	    forbidClick: false,
	    closeOnClickOverlay: false,
	    duration: 0,
	    overlay: true,
	  });
	  
	  async function webinit(use_metamask) {
	    const web3Modal = new Web3Modal({
	      network: use_metamask ? "mainnet" : null,
	      cacheProvider: false,
	      providerOptions: use_metamask
	        ? {}
	        : {
	          walletconnect: {
	            package: WalletConnectProvider,
	            options: {
	              rpc: {
	                56: "https://bsc-dataseed.binance.org/",
	              },
	              network: "binance",
	              qrcodeModal: QRCodeModal,
	            },
	          },
	        },
	    });
	    var provider = await web3Modal.connect();
	    web3 = new Web3(provider);
	    if (web3 && provider) {
	      address = provider.selectedAddress;
	      if (!address) {
	        address = provider.accounts[0];
	      }
		  dotc = new web3.eth.Contract(dotc_abi, dotc_key);
		  dq.getsczc()
	    }
	  }
  },
  methods: {
	// 修改 网络
	changeDrop(e){
		for (let i = 0; i < this.option1.length; i++) {
			if(this.option1[i].value == e){
				this.morenkey = this.option1[i].text
				this.morenkey_text = this.$t(`message.dapp.${this.option1[i].text}`)
			}
		}
	},
	// 监听 语言修改
	changeLang(e){
		this.morenkey_text = this.$t(`message.dapp.${this.morenkey}`)
	},
    async getsczc() {
      Toast.loading({ message: "查询中..." });
      var data = await dotc.methods.message(address, 0).call();
      this.str1 = data;
      let arr = data.split("|");
      this.nickname = Base64.decode(arr[0]);
      // this.name = arr[1];
      // this.identity = arr[2];
      // this.recom = arr[3];
    
      Toast.clear();
      let index;
      for (let item in address) {
        index = item - 3;
      }
      this.queryAddr = address.substring(0, 5) + "***" + address.substring(index);
    },
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
      // margin-right: 20px;
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
	width: 100%;
	/deep/ .el-input__inner{
		border: none;
		width: 100%;
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