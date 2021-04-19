<style>
.ddgl_fabu {
  width: 100%;
  float: left;
}

.ddgl_fabu_fex {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.ddgl_fabu_p_head {
  width: calc(100% - 20px);
  float: left;
  background-color: rgba(0, 0, 0, 0.212);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px;
  margin-top: 20px;

  margin-left: auto;
  margin-right: auto;
}

.ddgl_fabu_p_head_u {
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
}
.ddgl_fabu_p_head_u_q {
  margin-right: 30px;
  width: 50px;
  height: 50px;
  background-color: #ddd;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
}
.ddgl_fabu_p_head_u_c {
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_p_head_u_c_name {
  font-size: 15px;
}
.ddgl_fabu_p_head_u_c_msg {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}
.ddgl_fabu_p_head_u_c_user {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}

.ddgl_fabu_p_head_sxan {
  margin-left: 50px;
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_p_head_fabu {
  width: 120px;
  height: 35px;
  background-color: rgb(47, 0, 255);
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  margin-left: auto;
}

.setdd_form{
    display: flex;
    flex-direction: column;
}

.ac{
  color: rgb(1, 217, 255);
}
</style>
<template>
  <div class="ddgl_fabu">
    <div class="ddgl_fabu_fex">
      <div class="ddgl_fabu_p_head">
        <div class="ddgl_fabu_p_head_u">
          <div class="ddgl_fabu_p_head_u_q">
            {{ uinfo["quan"] }}
          </div>
          <div class="ddgl_fabu_p_head_u_c">
            <div class="ddgl_fabu_p_head_u_c_name">{{ uinfo["username"] }}</div>
            <div class="ddgl_fabu_p_head_u_c_user">{{ uinfo["user_u"] }}</div>
          </div>
        </div>
      </div>

      <div>
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="did" label="订单ID"> </el-table-column>
          <el-table-column prop="madd" label="商家">
            <template slot-scope="scope">
              <span :class="uinfo.user == scope.row.madd_b ? 'ac':''">{{ scope.row.madd }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uadd" label="用户">
            <template slot-scope="scope">
              <span :class="uinfo.user == scope.row.uadd_b ? 'ac':''">{{ scope.row.uadd }}</span>
            </template>
          </el-table-column>
          <el-table-column label="卖出">
            <template slot-scope="scope">
              {{ scope.row.uoa }} {{ scope.row.pro }}
            </template>
          </el-table-column>
          <el-table-column label="买入">
            <template slot-scope="scope">
              {{ scope.row.wad }} {{ scope.row.swap }}
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="scope">
              {{ scope.row.uni }} {{ scope.row.swap }}
            </template>
          </el-table-column>
          <el-table-column label="手续费">
            <template slot-scope="scope">
              {{ scope.row.free }} {{ scope.row.pro }}
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
let Base64 = require("js-base64").Base64;

import config from "../../../../config";
var dotc_abi = config["hyue"][config["key"]]["dotc"]["abi"];
var dotc_key = config["hyue"][config["key"]]["dotc"]["heyue"];

var ccdotc_abi = config["hyue"][config["key"]]["Ccdotc"]["abi"];
var ccdotc_key = config["hyue"][config["key"]]["Ccdotc"]["heyue"];

var huobi = [];
var harr = config["hbi"][config["key"]];
for (const key in harr) {
  huobi.push(harr[key]);
}

//公共变量
var web3 = "";
var ethereum = window.ethereum;
var Address = "";

export default {
  //初始化WEB3
  created() {
    var dq = this;
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      web3 =  new Web3(config['hyue'][config['key']]['Url']);
    } else {
      //初始化
      webinit();
    }
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        dq.isphone = true;
    } else {
        dq.isphone = false;
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
        Address = provider.selectedAddress;
        dq.getuinfo(Address);
        dq.getuser_list(Address);
      }
    }
  },
  data() {
    return {
      loading:false,
      uinfo: {
        quan: "",
        user: "",
        user_u: "",
        username: ""
      },

      list: [],


      isphone:false,
    };
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
            power = Number(power);
            //幂数大于小数点后面的数字位数时，后面加0
            for (var i = 0; i <= power - subres.length; i++) {
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
    getuinfo(Address) {
      this.uinfo["user"] = Address;
      this.uinfo["user_u"] =
        Address.substr(0, 5) +
        "...." +
        Address.substr(Address.length - 5, Address.length);
      var dq = this;
      var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
      contracts.methods.message(Address + "", "0").call((err, result) => {
        if (result) {
          var jiename = Base64.decode(result);
          dq.uinfo["quan"] = jiename.substr(0, 1);
          dq.uinfo["username"] = jiename;
        }
      });
    },

    //获取列表
    getuser_list(Address) {
      var dq = this;
      var ccdotc = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
      ccdotc.methods.ownerDeal(Address + "", "9999").call((err, result) => {
        var list = [];
        if (result) {
          var order = result[0];
          var type = result[1];
          var addr = result[2];
          for (let index = 0; index < order.length; index++) {
            var u_pro_id = '';
            var u_pro_num = '';
            for (let hindex = 0; hindex < huobi.length; hindex++) {
              if (type[index][0] == huobi[hindex]['key']) {
                u_pro_id = huobi[hindex]['id'];
                u_pro_num = huobi[hindex]['num'];
                break;
              }
            }

            var m_pro_id = '';
            var m_pro_num = '';
            for (let hindex = 0; hindex < huobi.length; hindex++) {
              if (type[index][1] == huobi[hindex]['key']) {
                m_pro_id = huobi[hindex]['id'];
                m_pro_num = huobi[hindex]['num'];
                break;
              }
            }

            var uadd = addr[index][0].substr(0,5)+'....'+addr[index][0].substr(addr[index][0].length - 5 ,addr[index][0].length);
            var madd = addr[index][1].substr(0,5)+'....'+addr[index][1].substr(addr[index][1].length - 5 ,addr[index][1].length);

            var obj  = {
              did:order[index][0],
              uoa:Number(order[index][1]) / (10**u_pro_num),
              wad:Number(order[index][2]) / (10**m_pro_num),
              uni:Number(order[index][3]) / (10**6),
              free:Number(order[index][4]) / (10 ** u_pro_num),

              pro:u_pro_id,
              swap:m_pro_id,

              uadd:uadd,
              uadd_b:addr[index][0].toLowerCase(),
              madd:madd,
              madd_b:addr[index][1].toLowerCase(),
            };
            list.push(obj);
          }
          dq.list = list;
        }
      });
    }
  },
};
</script>