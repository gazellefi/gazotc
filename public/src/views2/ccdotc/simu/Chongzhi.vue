<style scoped>
.chongzhi {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #ddd;
}

.czhiview {
  width: 375px;
  margin-left: calc((100% - 375px) / 2);
  float: left;
}

.czhiview_form {
  width: 100%;
  float: left;
}
.czhiview_form_hblist {
  width: calc(100% - 30px);
  float: left;
  overflow: hidden;
  background-color: #fff;
  margin-top: 15px;
  margin-left: 15px;
  height: 50px;
  border-radius: 5px;
}
.czhiview_form_hblist_t {
  float: left;
  line-height: 50px;
  font-size: 14px;
  padding: 0 15px;
  opacity: 0.8;
}
.czhiview_form_hblist_ul {
  display: flex;
  overflow-x: scroll;
  height: 50px;
  align-items: center;
  margin-right: 15px;
}
.czhiview_form_hblist_item {
  margin: 0 10px;
  font-size: 14px;
  opacity: 0.5;
}
.czhiview_form_hblist_item.ac {
  color: rgb(19, 208, 255);
  opacity: 1;
}

.czhiview_form_shurk {
  width: calc(100% - 60px);
  margin-left: 15px;
  background-color: #fff;
  margin-top: 15px;
  float: left;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 15px 15px;
}
.czhiview_form_shurk_t {
  font-size: 18px;
  opacity: 0.9;
}

.czhiview_form_shurk_input {
  display: flex;
  margin-top: 15px;
  align-items: center;
}
.czhiview_form_shurk_input_l {
  margin-right: 10px;
  font-size: 24px;
  font-weight: 500;
  opacity: 0.8;
}
.czhiview_form_shurk_input input {
  flex-grow: 1;
}
.czhiview_form_czhi {
  float: left;
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-top: 30px;
}
</style>
<template>
  <div class="chongzhi">
    <van-nav-bar title="Voucher Center" right-text="" left-arrow :fixed="true" :placeholder="true" z-index="99" @click-left="goback" />

    <div class="czhiview">
      <div class="czhiview_form">
        <div class="czhiview_form_hblist">
          <div class="czhiview_form_hblist_t">Select currency</div>
          <div class="czhiview_form_hblist_ul">
            <div class="czhiview_form_hblist_item" v-for="(li, index) in hbilist" :key="index" @click="hbindex = index" :class="hbindex == index ? 'ac' : ''">
              {{ li.id }}
            </div>
          </div>
        </div>
        <div class="czhiview_form_shurk">
          <div class="czhiview_form_shurk_t">Recharge amount</div>
          <div class="czhiview_form_shurk_input">
            <div class="czhiview_form_shurk_input_l">
              {{ hbilist[hbindex].id }}
            </div>
            <el-input :placeholder="$t('message.enterContent')" v-model="je"></el-input>
          </div>
        </div>

        <div class="czhiview_form_czhi">
          <van-button type="primary" block @click="chongzhi">Recharge</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import Web3 from "web3";
import Web3Modal from "web3modal";

//新版配置
import config from "../../../config";

var address, web3;

var arr = [];
var hbarr = config["hbi"][config["key"]];
for (const key in hbarr) {
  hbarr[key]["je"] = 0;
  hbarr[key]["sq_je"] = 0;
  arr.push(hbarr[key]);
}

export default {
  data() {
    return {
      hbilist: arr,
      hbindex: 0,
      je: 0,
    };
  },
  mounted() {
    var dq = this;
    Toast.setDefaultOptions("loading", {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true,
    });

    if (this.$route.query.title) {
      for (let index = 0; index < this.hbilist.length; index++) {
        if (this.hbilist[index]["id"] == this.$route.query.title) {
          this.hbindex = index;
          break;
        }
      }
    }
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      alert("Please install the metamask plug-in first");
    } else {
      //初始化
      webinit();
    }
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
        chaxunje();
      }

      async function chaxunje() {
        for (let index = 0; index < dq.hbilist.length; index++) {
          var sqlconn = await new web3.eth.Contract(
            dq.hbilist[index]["abi"],
            dq.hbilist[index]["heyue"]
          );
          var je = await sqlconn.methods.balanceOf(address).call();
          var sq_je = await sqlconn.methods
            .allowance(
              address,
              config["hyue"][config["key"]]["Ccdotc"]["heyue"]
            )
            .call();
          dq.hbilist[index]['je'] = dq.getFNum(Number(je) / (10 ** dq.hbilist[index]["num"]));
          dq.hbilist[index]['sq_je'] = dq.getFNum(Number(sq_je / (10 ** dq.hbilist[index]["num"])));
        }
      }
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
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
    chongzhi() {
      Toast.loading({ message: 'Recharge determination in progress...' });
      var dq = this;
      //查询该授权余额 -》查询余额- >充值-》轮询 倍数18需要转换
      if (this.je <= 0) {
        return;
      }

      var sqlconn = new web3.eth.Contract(
        dq.hbilist[dq.hbindex]["abi"],
        dq.hbilist[dq.hbindex]["heyue"]
      );

      if (Number(this.hbilist[this.hbindex]['je']) > Number(this.je)) {
        if (Number(this.hbilist[this.hbindex]['sq_je']) >= Number(this.je)) {
          //充值
          Toast.clear();
          Toast.loading({ message: 'Recharging...' });
          czhiajax();
        } else {
          //授权
          if (this.hbilist[this.hbindex]['deling']) {
            if (this.hbilist[this.hbindex]['sq_je'] > 0) {
              //清除
              Toast.clear();
              Toast.loading({ message: 'Clearing of authorized balance...' });
              shouquan(1);
            } else {
              Toast.clear();
              Toast.loading({ message: 'In authorized balance...' });
              //授权
              shouquan(2);
            }
          } else {
            //直接授权
            Toast.clear();
            Toast.loading({ message: 'In authorized balance...' });
            shouquan(2);
          }
        }
      } else {
        //Insufficient funds
        alert('Insufficient funds');
      }

      /*
          code 零 2直接授权
      */
      function shouquan(code) {
        var sqconn = new web3.eth.Contract(
          dq.hbilist[dq.hbindex]["abi"],
          dq.hbilist[dq.hbindex]["heyue"]
        );
        var num = code == 1 ? 0 + "" : ((Number(dq.je) * 100) * (10 ** dq.hbilist[dq.hbindex]["num"]));
        //var num = code == 1 ? 0+"" : Number.MAX_VALUE * (10**dq.hbilist[dq.hbindex]["num"])
        num = dq.getFNum(num);
        sqconn.methods.approve(config["hyue"][config["key"]]["Ccdotc"]["heyue"], num).send({
          from: address
        }, (err, ret) => {
          if (ret) {
            sq_lunxun(code);
          }
        });
      }


      //轮询查询是否授权成功
      async function sq_lunxun(code) {
        var sq_je = await sqlconn.methods
          .allowance(
            address,
            config["hyue"][config["key"]]["Ccdotc"]["heyue"]
          )
          .call();
        sq_je = Number(sq_je) / (10 ** dq.hbilist[dq.hbindex]["num"]);
        sq_je = dq.getFNum(Number(sq_je));
        if (code == 1) {
          if (sq_je == 1) {
            //清除成功
            shouquan(2);
          } else {
            setTimeout(() => {
              sq_lunxun(code);
            }, 3000);
          }
        } else {
          if (sq_je >= dq.je) {
            Toast.clear();
            Toast.loading({ message: 'Recharging...' });
            czhiajax();
          } else {
            setTimeout(() => {
              sq_lunxun(code);
            }, 3000);
          }
        }
      }

      //充值资产
      var dq_je = 0;

      function czhiajax() {
        var czconn = new web3.eth.Contract(
          config['hyue'][config['key']]['Ccdotc']['abi'],
          config['hyue'][config['key']]['Ccdotc']['heyue']
        );
        var cznum = dq.getFNum(Number(dq.je) * (10 ** dq.hbilist[dq.hbindex]['num']));
        czconn.methods.deposit(dq.hbilist[dq.hbindex]['heyue'], cznum).send({
          from: address
        }, (err, ret) => {
          if (ret) {
            //获取当前金额 并赋值
            czconn.methods.balancepro(address, dq.hbilist[dq.hbindex]['heyue']).call((erra, reta) => {
              if (reta) {
                dq_je = Number(reta) + Number(cznum);
              }
            });
            czhi_lunxun();
          }
        });
      }

      //充值轮询
      function czhi_lunxun() {
        var czconn = new web3.eth.Contract(
          config['hyue'][config['key']]['Ccdotc']['abi'],
          config['hyue'][config['key']]['Ccdotc']['heyue']
        );
        //查询当前的余额  
        czconn.methods.balancepro(address, dq.hbilist[dq.hbindex]['heyue']).call((erra, reta) => {
          if (reta) {
            if (Number(reta) >= dq_je) {
              Toast.success('Recharge succeeded!');
            } else {
              setTimeout(() => {
                czhi_lunxun();
              }, 3000);
            }
          }
        });
      }
    },
  },
};
</script>