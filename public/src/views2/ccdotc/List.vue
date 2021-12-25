<style>
.bblist {
  display: flex;
  flex-direction: column;
  margin: 5px 5px;
}
.bblist_table {
  display: flex;
  flex-direction: column;
  align-items: center;
  float: left;
}
.bblist_table_left {
  margin-right: auto;
  display: flex;
  flex-direction: row;
  padding: 15px 0;
}

.el-table {
  display: flex;
  flex-direction: column;
  width: 600px;
}
</style>
<template>
  <div class="bblist">
    <div class="bblist_table" :style="{
        'margin-left': type == 'pc' ? 'auto' : '',
        'margin-right': type == 'pc' ? 'auto' : '',
      }">
      <div class="bblist_table_left">
        <el-select v-model="form.type" placeholder="Please select">
          <el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
          </el-option>
        </el-select>
        <el-select placeholder="Please select" style="margin-left: 15px" v-model="form.type_b">
          <el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
          </el-option>
        </el-select>

        <el-input v-model="form.zdnum" placeholder="Number of filters" style="margin-left: 15px; max-width: 100px"></el-input>

        <el-button type="primary" icon="el-icon-search" circle style="margin-left: 15px" @click="listajax"></el-button>
      </div>
      <el-table v-loading="jiazai" :data="list">
        <el-table-column align=center width=50px prop="iorder" label="order"> </el-table-column>
        <!-- <el-table-column prop="order" label="Merchant"> </el-table-column> -->
        <el-table-column align=center prop="moa" label="quantity"> </el-table-column>
        <el-table-column align=center prop="zer" label="Minimum number"> </el-table-column>
        <el-table-column align=center width=50px prop="uni" label="Unit price"> </el-table-column>
        <el-table-column width=50px label="operation">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="opengoumai(scope.row)">purchase</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出购买框 -->
    <el-dialog title="purchase" :visible.sync="mairucode" width=350px>
      <el-form :model="mr_form" label-width="80px">
        <el-form-item label="order number">
          <el-input v-model="mr_form.ddinfo['iorder']" disabled></el-input>
        </el-form-item>
        <el-form-item label="Purchase unit price">
          <el-input v-model="mr_form.ddinfo['uni']" disabled></el-input>
        </el-form-item>
        <el-form-item label="Purchase quantity">
          <el-input v-model="mr_form.num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mairucode = false">Cancel</el-button>
        <el-button type="primary" @click="mairuajax">purchase</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from "../../config";

var ccdotc_abi = config["hyue"][config["key"]]["Ccdotc"]["abi"];
var ccdotc_key = config["hyue"][config["key"]]["Ccdotc"]["heyue"];

//货币
var huoarr = config["hbi"][config["key"]];

import Web3 from "web3";
import Web3Modal from "web3modal";

var ccdotconn, web3, address;

export default {
  mounted() {
    if (document.body.clientWidth >= 1000) {
      this.type = "pc";
    } else {
      this.type = "wap";
    }
    var dq = this;

    for (const key in huoarr) {
      dq.hbarr.push(huoarr[key]);
    }

    dq.form["type_b"] = dq.hbarr[0]["key"];
    dq.form["type"] =
      dq.hbarr.length >= 1 ? dq.hbarr[2]["key"] : dq.hbarr[0]["key"];
    //初始化WEB3
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      web3 = new Web3(config["hyue"][config["key"]]["Url"]);
      ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
      dq.listajax();
    } else {
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
      web3 = await new Web3(provider);
      if (web3 && provider) {
        //其他钱包使用测试网络
        // if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
        //   var wlcode = window.ethereum.networkVersion;
        //   //imtoken只能查看 无法操作 出发是ETF主网
        //   if (window.ethereum.isImToken) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //   }
        //   //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
        //   if (window.ethereum.isMetaMask && wlcode != 4) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //   }
        // } else {
        //   web3.setProvider(config["hyue"][config["key"]]["Url"]);
        // }
        address = provider.selectedAddress;
        ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
        dq.listajax();
      }
    }
  },
  data() {
    return {
      type: "pc",
      list: [],

      mairucode: false,

      hbarr: [],
      mr_form: {
        ddinfo: {},
        num: null,
      },
      form: {
        type: "",
        type_b: "",
        zdnum: null,
      },

      jiazai: false,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
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
    listajax() {
      var dq = this;
      dq.jiazai = true;
      var js_num = 0;
      for (let index = 0; index < dq.hbarr.length; index++) {
        if (dq.form["type"] == dq.hbarr[index]["key"]) {
          js_num = Number(dq.hbarr[index]["num"]);
          break;
        }
      }

      var sounum = "000000";
      if (dq.form["zdnum"]) {
        sounum = dq.getFNum(dq.form["zdnum"] * 10 ** js_num);
      }

      //加载列表数据
      ccdotconn.methods
        .sort(this.form["type"], this.form["type_b"], 30, 30, sounum + "")
        .call((error, ret) => {
          dq.jiazai = false;
          if (ret) {
            var list = [];
            var list_arr = ret[0];
            var user_arr = ret[1];
            for (let index = 0; index < list_arr.length; index++) {
              var obj = {
                pro_num: js_num,
                iorder: Number(list_arr[index][0]),
                moa: (Number(list_arr[index][1]) / 10 ** js_num).toFixed(2),
                zer: (Number(list_arr[index][2]) / 10 ** js_num).toFixed(2),
                uni: dq.getFNum(Number(list_arr[index][3]) / 10 ** 6),
                order: user_arr[index],
              };
              list.push(obj);
            }
            dq.list = list;
          }
        });
    },

    opengoumai(row) {
      this.mr_form["ddinfo"] = row;
      this.mairucode = true;
    },
    mairuajax() {
      var dq = this;
      if (!this.mr_form["num"]) {
        alert("Please enter quantity");
        return;
      }
      if (this.mr_form["num"] < Number(this.mr_form["ddinfo"]["zer"])) {
        alert(this.$t('message.NotMinNum'));
        return;
      }
      if (this.mr_form["num"] > Number(this.mr_form["ddinfo"]["moa"])) {
        alert(this.$t('message.NotMaxNum'));
        return;
      }

      var mr_num =
        Number(this.mr_form["num"]) * 10 ** this.mr_form["ddinfo"]["pro_num"];
      var mr_danjia = this.getFNum(
        Number(this.mr_form["ddinfo"]["uni"]) * 10 ** 6
      );
      //提交
      console.log("1258")
      ccdotconn.methods
        .cctaker(this.mr_form["ddinfo"]["iorder"], dq.getFNum(mr_num) + "", mr_danjia + "")
        .send(
          {
            from: address,
          },
          (err, ret) => {
            if (ret) {
              dq.mairucode = false;
              dq.$message.success("Buy successfully!");
            }
          }
        );
    },
  },
};
</script>