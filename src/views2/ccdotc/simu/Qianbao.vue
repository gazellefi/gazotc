<style scoped>
html,
body {
  background-color: #ddd;
}
.qianbao {
  width: 100%;
  overflow: auto;
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
.qianbao_view_headf {
  width: 90%;
  height: 110px;
  background-color: rgb(4, 163, 71);
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
    <div class="qianbao_view">
      <div class="qianbao_view_head">
        <div class="qianbao_view_head_item">
          <div class="qianbao_view_head_item_li" style="
                    font-size: 14px;
                    color: #fff;">
            <div style="opacity: 0.5;">Assets in lock up(gaz)</div> <i class="el-icon-view" style="opacity:0.5"></i>
          </div>
          <div class="qianbao_view_head_item_li numarr">
            <div class="qianbao_view_head_item_li_num">{{ user_sc.toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <div class="qianbao_view_headf">
        <div class="qianbao_view_head_item">
          <div class="qianbao_view_head_item_li" style="
                    font-size: 14px;
                    color: #fff;">
            <div style="opacity: 0.5;">Withdrawable assets(gaz)</div> <i class="el-icon-view" style="opacity:0.5"></i>
          </div>
          <div class="qianbao_view_head_item_li numarr">
            <div class="qianbao_view_head_item_li_num">{{ user_fr.toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <div class="qianbao_view_cd">
        <div class="qianbao_view_cd_item" @click="tixianajax">
          <i class="el-icon-refresh-right"></i><span>Withdrawal</span>
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

var huobiarr = config['hbi'][config['key']];
var simu_abi = config['hyue'][config['key']]['Pripla']['abi'];
var simu_key = config['hyue'][config['key']]['Pripla']['heyue'];

//全局变量
var web3 = "";
var address = "";
var simuonn;
var free;
var ethereum = window.ethereum;


export default {
  data() {
    return {
      huobi: [],
      user_sc: 0,
      user_fr: 0
    }
  },
  mounted() {
    //监测用户是否安装MASK
    console.log("111")
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
        address = provider.selectedAddress;
        console.log(address)
        simuonn = new web3.eth.Contract(simu_abi, simu_key);
        //dq.getsczc();
      }
    }
  },
  methods: {
    //如果过亿请转换
    getFNum(num_str) {
      num_str = num_str.toString();
      if (num_str.indexOf("+") != -1) {
        num_str = num_str.replace("+", "");
      }
      if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
        var resValue = "",
          power = "",
          result = null,
          dotIndex = 0,
          resArr = [],
          sym = "";
        var numStr = num_str.toString();
        if (numStr[0] == "-") {
          // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
          numStr = numStr.substr(1);
          sym = "-";
        }
        if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
          var regExp = new RegExp(
            "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
            "ig"
          );
          result = regExp.exec(numStr);
          if (result != null) {
            resValue = result[2];
            power = result[5];
            result = null;
          }
          if (!resValue && !power) {
            return false;
          }
          dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
          resValue = resValue.replace(".", "");
          resArr = resValue.split("");
          if (Number(power) >= 0) {
            var subres = resValue.substr(dotIndex);
            var length = dotIndex == 0 ? 0 : subres.length;
            power = Number(power);
            //幂数大于小数点后面的数字位数时，后面加0
            for (var i = 0; i < power - length; i++) {
              resArr.push("0");
            }
            if (power - subres.length < 0) {
              resArr.splice(dotIndex + power, 0, ".");
            }
          } else {
            power = power.replace("-", "");
            power = Number(power);
            //幂数大于等于 小数点的index位置, 前面加0
            for (let i = 0; i < power - dotIndex; i++) {
              resArr.unshift("0");
            }
            var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
            resArr.splice(n, 0, ".");
          }
        }
        resValue = resArr.join("");

        return sym + resValue;
      } else {
        return num_str;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    openurl(url) {
      this.$router.push(url);
    },
    async getsczc() {
      Toast.loading({ message: 'In query' });
      var scze = await simuonn.methods.balanceOf(address).call();
      this.user_sc = scze / (10 ** 18);
      free = await simuonn.methods.callfree(address).call();
      this.user_fr = free / (10 ** 18);
      Toast.clear();

    },
    tixianajax() {
      Toast.loading({ message: 'Withdrawal in progress...' });
      var tkje = this.getFNum(free);
      simuonn.methods.withdraw(tkje).send({
        from: address
      }, (err, ret) => {
        if (ret) {
          tikchaxun();
        } else {
          Toast.clear();
          Toast.fail('Please agree to authorize!');
        }
      }
      );

      //轮询查询是否提款成功
      function tikchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success('Successful withdrawal');
        }, 3000);
      }
    }
  }
}
</script>