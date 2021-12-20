<style scoped>
html,
body {
  background-color: #ddd;
}
.qianbao {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(233, 229, 229);
}

.qianbao_view {
  width: 375px;
  height: auto;
  background-color: #fff;
  float: left;
  margin-left: calc((100% - 375px) / 2);
}
.qianbao_view_head {
  width: 90%;
  height: 110px;
  background-color: rgba(45, 92, 222, 1);
  margin: 10px 5%;
  border-radius: 15px;
  display: flex;
  align-items: center;
}
.qianbao_view_head_item {
  display: flex;
  flex-direction: column;
}
.qianbao_view_head_item_li {
  display: flex;
  padding: 2.5px 15px;
  align-items: center;
}
.qianbao_view_head_item_li i {
  margin-left: 10px;
}
.qianbao_view_head_item_li_num {
  font-size: 28px;
  color: #fff;
}
.qianbao_view_head_item_li.numarr {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.qianbao_view_head_item_li span {
  margin-left: 15px;
  color: #fff;
  font-size: 14px;
}

.qianbao_view_cd {
  width: 90%;
  margin: 0 5%;
  display: flex;
  height: 70px;
  align-items: center;
}
.qianbao_view_cd_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
}
.qianbao_view_cd_item i {
  font-size: 20px;
  font-weight: 900;
}
.qianbao_view_cd_item span {
  padding: 2px 0;
  font-size: 14px;
  opacity: 0.8;
}
.qianbao_view_ul {
  width: 90%;
  float: left;
  margin-top: 15px;
  height: calc(100vh - 215px);
  margin-left: 5%;
  overflow-y: scroll;
  flex-direction: column;
}
.qianbao_view_ul_li {
  width: 100%;
  float: left;
  display: flex;
  height: auto;
  align-items: center;
}
.qianbao_view_ul_li_item.head {
  width: 25%;
  font-size: 14px;
  opacity: 0.5;
}

.qianbao_view_ul_li_item.item {
  overflow: hidden;
  width: 100%;
  margin: 10px 0;
  font-size: 14px;
}
</style>
<template>
  <div class="qianbao">
    <van-nav-bar title="Coin Wallet" right-text="" left-arrow :fixed="true" :placeholder="true" z-index="99" @click-left="goback" />
    <div class="qianbao_view">
      <div class="qianbao_view_head">
        <div class="qianbao_view_head_item">
          <div class="qianbao_view_head_item_li" style="
                    font-size: 14px;
                    color: #fff;">
            <div style="opacity: 0.5;">Net capital assets(USDT)</div> <i class="el-icon-view" style="opacity:0.5"></i>
          </div>
          <div class="qianbao_view_head_item_li numarr">
            <div class="qianbao_view_head_item_li_num">{{ user_zc.toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <div class="qianbao_view_cd">
        <div class="qianbao_view_cd_item" style="margin-left: 0px;" @click="openurl('./ccuser/chongzhi')">
          <i class="el-icon-refresh-left"></i><span>Charge money</span>
        </div>
        <div class="qianbao_view_cd_item" @click="openurl('./ccuser/tixian')">
          <i class="el-icon-refresh-right"></i><span>Withdraw money</span>
        </div>
      </div>

      <!-- 列表 -->
      <div class="qianbao_view_ul">
        <div class="qianbao_view_ul_li" style="margin-bottom: 10px;">
          <div class="qianbao_view_ul_li_item head" style="width: 24%;">currency</div>
          <div class="qianbao_view_ul_li_item head" style="width: 28%;">available</div>
          <div class="qianbao_view_ul_li_item head" style="width: 28%;">frozen</div>
          <div class="qianbao_view_ul_li_item head" style="width: 20%;">operation</div>
        </div>
        <div class="qianbao_view_ul_li" v-for="(li,index) in list" :key="index">
          <div class="qianbao_view_ul_li_item item" style="width: 24%; opacity: 0.8;">{{li.name}}</div>
          <div class="qianbao_view_ul_li_item item" style="width: 28%; opacity: 0.8;">{{li.balancepro.toFixed(2)}}</div>
          <div class="qianbao_view_ul_li_item item" style="width: 28%; opacity: 0.8;">{{li.lockpro.toFixed(2)}}</div>
          <div class="qianbao_view_ul_li_item item" style="width: 20%;">
            <el-link type="primary" @click="opencztk(1,index)">Charge money</el-link>
            <el-link type="danger" style="margin-left: 5px;" @click="opencztk(2,index)">Withdraw money</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Toast } from 'vant';


import config from "../../../config";

var ccdotc_abi = config['hyue'][config['key']]['Ccdotc']['abi'];
var ccdotc_key = config['hyue'][config['key']]['Ccdotc']['heyue'];
var huobiarr = config['hbi'][config['key']];


//全局变量
var web3 = "";
var address = "";
var ccdotconn;
var ethereum = window.ethereum;


export default {
  data() {
    return {
      huobi: [],
      list: [],
      user_zc: 0
    }
  },
  mounted() {
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      alert("Please install the metamask plug-in first");
    } else {
      //初始化
      webinit();
    }

    for (const key in huobiarr) {
      this.huobi.push(huobiarr[key]);
    }

    Toast.setDefaultOptions('loading', {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true
    });
    var dq = this;
    async function webinit() {
      const providerOptions = {
        /* See Provider Options Section */
      };
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });
      var provider = await web3Modal.connect();
      web3 = new Web3(provider);

      if (web3 && provider) {
        //其他钱包使用测试网络
        // if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
        //     var wlcode = window.ethereum.networkVersion;
        //     //imtoken只能查看 无法操作 出发是ETF主网
        //     if (window.ethereum.isImToken) {
        //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //     }
        //     //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
        //     if (window.ethereum.isMetaMask && wlcode != 4) {
        //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //     }
        // }else{
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        // }
        address = provider.selectedAddress;
        ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
        dq.getqblist();
      }
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    openurl(url) {
      this.$router.push(url);
    },
    async getqblist() {
      Toast.loading({ message: 'In query' });
      var list = [];
      var binum = config['hyue'][config['key']]['Bzj']['num'];
      console.log(binum);
      //得到资产比例  转换最终USDT价格
      for (let index = 0; index < this.huobi.length; index++) {
        var balancepro = await ccdotconn.methods.balancepro(address, this.huobi[index]['heyue']).call();
        var lockpro = await ccdotconn.methods.lockpro(address, this.huobi[index]['heyue']).call();
        var pros = await ccdotconn.methods.pros(this.huobi[index]['key']).call();
        var obj = {
          name: this.huobi[index]['id'],
          balancepro: Number(balancepro) / (10 ** this.huobi[index]['num']),
          lockpro: Number(lockpro) / (10 ** this.huobi[index]['num']),
          pros: Number(pros['uni'] / (10 ** 6)),
        };
        list.push(obj);
      }
      this.list = list;
      for (let index = 0; index < list.length - 1; index++) {
        this.user_zc += ((list[index]['balancepro'] + list[index]['lockpro']) * list[index]['pros']);
      }
      Toast.clear();
    },
    opencztk(e, index) {
      var htitle = this.huobi[index]['id'];
      if (e == 1) {
        this.$router.push({ path: './ccuser/chongzhi', query: { title: htitle + "" } });
      } else {
        this.$router.push({ path: './ccuser/tixian', query: { title: htitle + "" } });
      }
    }
  }
}
</script>