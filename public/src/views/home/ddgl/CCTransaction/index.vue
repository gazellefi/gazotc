
<template>
  <div class="ddgl_fabu">
    <!-- pc -->
    <div class="hidden-xs-only">
		<div class="ddgl_fabu_p_head c_r">
			<div class="ddgl_fabu_p_head_sxan">
				<div class="ddgl_fabu_p_head_sxan_i">
					<span>{{ $t("message.dapp.currency")}}：</span>
					<el-dropdown class="ddlistaa_head_item" @command="saixuanpro">
						<span class="el-dropdown-link">
							{{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
							<el-dropdown-item command="USDT">USDT</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="ddgl_fabu_p_head_sxan_i">
					<span>{{ $t("message.dapp.unit")}}：</span>
		
					<el-dropdown class="ddlistaa_head_item" @command="saixuanfli">
						<span class="el-dropdown-link">
							{{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
							<el-dropdown-item command="CNY">CNY</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
		
			</div>
		</div>
		<!-- table -->
		<el-table :data="list" stripe style="width: 100%">
		  <el-table-column align="center" prop="did" :label="$t('message.arbitration.orderId')"> </el-table-column>
		  <el-table-column align="center" prop="madd"  :label="$t('message.arbitration.merchant')">
		    <template slot-scope="scope">
		      <span :class="uinfo.user == scope.row.madd_b ? 'ac':''">{{ scope.row.madd }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" prop="uadd" :label="$t('message.arbitration.user')">
		    <template slot-scope="scope">
		      <span :class="uinfo.user == scope.row.uadd_b ? 'ac':''">{{ scope.row.uadd }}</span>
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="卖出">
		    <template slot-scope="scope">
		      {{ scope.row.uoa }} {{ scope.row.pro }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="买入">
		    <template slot-scope="scope">
		      {{ scope.row.wad }} {{ scope.row.swap }}
		    </template>
		  </el-table-column>
		  <el-table-column  align="center" :label="$t('message.dapp.unitPrice')">
		    <template slot-scope="scope">
		      {{ scope.row.uni }} {{ scope.row.swap }}
		    </template>
		  </el-table-column>
		  <el-table-column align="center" label="手续费">
		    <template slot-scope="scope">
		      {{ scope.row.free }} {{ scope.row.pro }}
		    </template>
		  </el-table-column>
		  <div slot="empty">
		  	<div style="padding-top: 20px;" class="f a_c c_c">
		  		<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
		  	</div>
		  	<p>{{$t('message.NoData')}}</p>
		  </div>
		</el-table>
	</div>
	<!-- wap -->
	<div class="hidden-sm-and-up ddgl_fabu_wapview">
		<el-row style="border-bottom: 1px solid #EEEEEE; padding-bottom: 10px;">
			<el-col :span="12">
				<div class="ddgl_fabu_p_head_sxan_i">
					<span>{{ $t("message.dapp.currency")}}：</span>
					<el-dropdown class="ddlistaa_head_item" @command="saixuanpro">
						<span class="el-dropdown-link">
							{{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
							<el-dropdown-item command="USDT">USDT</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="ddgl_fabu_p_head_sxan_i">
					<span>{{ $t("message.dapp.unit")}}：</span>
							
					<el-dropdown class="ddlistaa_head_item" @command="saixuanfli">
						<span class="el-dropdown-link">
							{{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i
								class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
							<el-dropdown-item command="CNY">CNY</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
		</el-row>
		<!-- 列表 -->
		<el-row>
			<div v-if="list.length<1" class="fc a_c">
				<div style="padding-top: 20px;">
					<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
				</div>
				<p :style="{'marginTop': '23px'}">{{$t('message.NoData')}}</p>
			</div>
			<el-col :span="24" v-for="(item,index) in list" :key="index" class="list_item f c_b">
				<div class="fc">
					<div class="mart-10">
						<span class="fwb">{{$t('message.arbitration.orderId')+' | '+ item.did}}</span>
					</div>
					<div class="mart-10">
						<span class="marr-10">{{$t('message.dapp.unitPrice')}}</span>
						<span class="cba">{{ item.uni }} {{ item.swap }}</span>
					</div>
					<div class="mart-10">
						<span class="marr-10">{{$t('message.arbitration.merchant')}}</span>
						<span class="fz14" :class="uinfo.user == item.madd_b ? 'ac':''">{{ item.madd }}</span>
					</div>
					<div class="mart-10">
						<span class="marr-10">{{$t('message.arbitration.user')}}</span>
						 <span class="fz14" :class="uinfo.user == item.uadd_b ? 'ac':''">{{ item.uadd }}</span>
					</div>
					<div class="mart-10">
						<span class="asBtn marr-5">{{'卖出 '}}{{ item.uoa }} {{ item.pro }}</span>
						<span class="asBtn">{{'买入 '}}{{ item.wad }} {{ item.swap }}</span>
					</div>
				</div>
				<div class="fc c_r">
					<span class="fz14" style="color: #EE6A59;">{{'手续费'}}{{ item.free }} {{ item.pro }}</span>
				</div>
			</el-col>
		</el-row>
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
      web3 = new Web3(config['hyue'][config['key']]['Url']);
    } else {
      //初始化
      webinit();
    }
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
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
        // dq.getuinfo(Address);
        dq.getuser_list(Address);
      }
    }
  },
  data() {
    return {
      loading: false,
      uinfo: {
        quan: "",
        user: "",
        user_u: "",
        username: ""
      },

      list: [],


      isphone: false,

      sxarr: {
        pro: "ALL",
        fli: "ALL",
        tcode: "ALL"
      }
    };
  },
  methods: {
    saixuanpro(e) {
      this.sxarr.pro = e;
    },
    saixuantcode(e) {
      this.sxarr.tcode = e;
    },
    saixuanfli(e) {
      this.sxarr.fli = e;
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

            var uadd = addr[index][0].substr(0, 5) + '....' + addr[index][0].substr(addr[index][0].length - 5, addr[index][0].length);
            var madd = addr[index][1].substr(0, 5) + '....' + addr[index][1].substr(addr[index][1].length - 5, addr[index][1].length);

            var obj = {
              did: order[index][0],
              uoa: Number(order[index][1]) / (10 ** u_pro_num),
              wad: Number(order[index][2]) / (10 ** m_pro_num),
              uni: Number(order[index][3]) / (10 ** 6),
              free: Number(order[index][4]) / (10 ** u_pro_num),

              pro: u_pro_id,
              swap: m_pro_id,

              uadd: uadd,
              uadd_b: addr[index][0].toLowerCase(),
              madd: madd,
              madd_b: addr[index][1].toLowerCase(),
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

<style lang="less" scoped>
.ddgl_fabu {
  width: 100%;
}

.ddlistaa_head_item {
  border: 1px solid #ccc;
  padding: 5px 20px;
}

.ddgl_fabu_fex {
  display: flex;
  flex-direction: column;
}

.ddgl_fabu_p_head {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px;
  background: #fff;
  margin-bottom: 10px;
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
  display: flex;
  flex-direction: row;
}

.ddgl_fabu_p_head_sxan .ddgl_fabu_p_head_sxan_i {
  display: flex;
  align-items: center;
  padding: 0 15px;
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

.setdd_form {
  display: flex;
  flex-direction: column;
}

.ac {
  color: rgb(1, 217, 255);
}
.list_item{
	border-bottom: 1px solid #DCDCDC;
	padding: 20px 10px;
}
.asBtn{
	border: 1px solid #FDC500;
	border-radius: 30px;
	font-size: 12px;
	color: #FDC500;
	padding: 2px 5px;
}
</style>
