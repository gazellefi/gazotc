<style>
.fabu {
  width: 360px;
  margin: auto;
  background-color: #fff;
}
.fabu_head {
  width: calc(100% - 30px);
  float: left;
  height: 70px;
  font-size: 16px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fabu_head i {
  margin-left: auto;
  font-size: 20px;
}

.fabu_tab {
  width: calc(100% - 30px);
  float: left;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 15px;
}
.fabu_tab_item {
  margin-left: 30px;
  opacity: 0.5;
  transition: all 0.3s;
}
.fabu_tab_item.ac {
  opacity: 1;
  color: rgb(51, 75, 211);
  font-size: 22px;
}

/* 表单 */
.add {
  width: 100%;
  margin-top: 30px;
  float: left;
}

.add_form {
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  margin: 0 15px;
}

.add_form_item {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.add_form_item_input {
  margin-top: 10px;
}
.add_form_item_input textarea {
  margin-top: 10px;
}

.add_form_item_xuanze {
  display: flex;
  flex-direction: row;
}

.add_form_item.xz {
  margin-left: 15px;
}

.errormsg {
  font-size: 14px;
  color: #f33;
}

.add_form_item_input_p {
  padding-top: 10px;
  font-size: 12px;
  color: #409eff;
}
</style>
<template>
  <div class="fabu">
    <!-- 表单 -->
    <div cclass="add">
      <div class="add_form">
        <div class="add_form_item_xuanze">
          <div class="add_form_item xz" style="margin-left: 0">
            <div class="add_form_item_input">
              <el-select v-model="pro" placeholder="Please select">
                <el-option v-for="item in proarr" :key="item.id" :label="item.id" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="add_form_item xz">
            <div class="add_form_item_input">
              <el-select v-model="prob" placeholder="Please select">
                <el-option v-for="item in proarr" :key="item.id" :label="item.id" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Unit Price</div>
          <div class="add_form_item_input">
            <el-input :placeholder="$t('message.enterContent')" v-model="form['danj']">
              <template slot="append">{{ prob }}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="form['danj'] == 0">
            Unit price cannot be blank
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">quantity</div>
          <div class="add_form_item_input">
            <el-input :placeholder="$t('message.enterContent')" v-model="form['num']">
              <template slot="append">{{ pro }}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="balancepro < form['num']">
            * Published quantity cannot exceed （ {{ balancepro }} ）！
          </div>
          <div class="add_form_item_input errormsg" v-if="balancepro == 0">
            * You need to recharge before publishing a sales order!
          </div>
          <div class="add_form_item_input errormsg" v-if="form['num'] == 0">
            Quantity cannot be empty
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Minimum quantity</div>
          <div class="add_form_item_input">
            <el-input :placeholder="$t('message.enterContent')" v-model="form['zdnum']">
              <template slot="append">{{ pro }}</template>
            </el-input>
          </div>
        </div>
        <el-button type="primary" style="margin-top: 30px" @click="fabuajax" :disabled="
            form['danj'] && form['num'] ? false : true
          ">Submit</el-button>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";

var ccdotc_abi = config["hyue"][config["key"]]["Ccdotc"]["abi"];
var ccdotc_key = config["hyue"][config["key"]]["Ccdotc"]["heyue"];

import Web3 from "web3";
import Web3Modal from "web3modal";
import { Dialog, Toast, Notify } from "vant";

var address, ccdotconn, web3;

export default {
  //初始化WEB3
  created() {
    var proa = config["hbi"][config["key"]];
    for (const key in proa) {
      this.proarr.push(proa[key]);
    }
    this.pro = this.proarr[0]["id"];
    this.prob =
      this.proarr.length >= 1 ? this.proarr[1]["id"] : this.proarr[0]["id"];
    //初始化WEB3
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      alert("Please install the metamask plug-in first");
    } else {
      webinit();
    }
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
        //监听是否发布成功
        dq.getproyue();
      }
    }
  },
  mounted() {
    Toast.setDefaultOptions({
      overlay: true,
      forbidClick: true,
      closeOnClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      getContainer: "body",
    });
  },
  data() {
    return {
      proarr: [],
      pro: "",
      prob: "",

      form: {
        danj: null,
        num: null,
        zdnum: null,
      },

      balancepro: 0,
    };
  },
  watch: {
    "form.num"() {
      this.getproyue();
    },
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
    getproyue() {
      var heyue = "";
      var num = 0;
      var dq = this;
      for (let index = 0; index < this.proarr.length; index++) {
        if (this.proarr[index]["id"] == this.pro) {
          heyue = this.proarr[index]["heyue"];
          num = this.proarr[index]["num"];
          break;
        }
      }
      ccdotconn.methods.balancepro(address, heyue).call((err, ret) => {
        if (ret) {
          var balancepro = Number(ret);
          dq.balancepro = balancepro / 10 ** num;
        }
      });
    },
    async fabuajax() {
      await this.getproyue();
      //判断资产余额是否足够
      if (this.form.num > this.balancepro) {
        Notify({ type: 'warning', message: 'Insufficient asset balance!' });
        return;
      }

      Toast.loading({
        message: "In release...",
        forbidClick: true,
        loadingType: "spinner",
      });

      var heyue = "";
      var heyue_key = "";
      var heyue_b = "";
      var num = 0;
      var dq = this;
      for (let index = 0; index < this.proarr.length; index++) {
        if (this.proarr[index]["id"] == this.pro) {
          heyue = this.proarr[index]["key"];
          heyue_key = this.proarr[index]["heyue"];
          num = this.proarr[index]["num"];
          break;
        }
      }
      for (let index = 0; index < this.proarr.length; index++) {
        if (this.proarr[index]["id"] == this.prob) {
          heyue_b = this.proarr[index]["key"];
          break;
        }
      }
      var a = this.getFNum(this.form.num * 10 ** num);
      var b = this.getFNum(this.form.danj * 10 ** 6);
      var c = this.getFNum(this.form["zdnum"] * 10 ** num);

      ccdotconn.methods.setccotc(heyue, heyue_b, a + "", b + "", c + "").send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            lx_dd_jt();
          }
        }
      );

      //监听Release order结果
      function lx_dd_jt() {
        ccdotconn.methods.balancepro(address, heyue_key).call((err, ret) => {
          if (ret) {
            var balancepro = Number(ret);
            var balanceprob = balancepro / 10 ** num;
            if (balanceprob == dq.balancepro - dq.form.num) {
              dq.balanceprob = balanceprob;
              Toast.clear();
              Dialog.alert({
                title: "Published successfully",
                message: "Published successfully! Can be viewed or modified in my order",
              }).then(() => {
                dq.form = {
                  danj: null,
                  num: null,
                  zdnum: null,
                };
              });
            } else {
              setTimeout(() => {
                lx_dd_jt();
              }, 3000);
            }
          }
        });
      }
    },
  },
};
</script>