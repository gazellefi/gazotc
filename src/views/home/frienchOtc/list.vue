
<template>
  <div class="ddlistaa">
    <div class="hidden-xs-only content">
      <!-- 订单列表 -->
      <div class="ddlistaa_head">
        <div class="left">
          <div class="ddlistaa_head_item_a sell anniucss" :class="tcode == 1 ? 'bg' : ''" @click="tcode = 1">
            {{ $t("message.dapp.sell")}}
          </div>
          <div class="ddlistaa_head_item_a purchase anniucss" :class="tcode == 2 ? 'bg' : ''" @click="tcode = 2">
            {{ $t("message.dapp.buy")}}
          </div>
        </div>
        <!-- <div class="ddlistaa_head_item"></div> -->

        <div class="right">
          <div class="saixuan">
            <span class="typeSelect">{{ $t("message.dapp.currency")}}：</span>
            <el-select size="mini" v-model="huobi" placeholder="Please select">
              <el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.id">
              </el-option>
            </el-select>

          </div>
          <div class="saixuan">
            <span class="typeSelect">{{ $t("message.dapp.unit")}}：</span>
            <el-select size="mini" v-model="fabi" placeholder="Please select">
              <el-option v-for="item in fbarr" :key="item.key" :label="item.id" :value="item.id">
              </el-option>
            </el-select>
          </div>

        </div>

      </div>
      <!-- 表格 -->
      <div class="listul" v-loading="loading">
        <el-table :fixed="true" :data="dataList" style="width: 100%; overflow: auto">
          <el-table-column align="center" :label="$t('message.dapp.Merchant')">
            <template slot-scope="scope">
              <div class="listul_user">
                <div class="listul_user_name">{{ scope.row.username }}</div>
                <div class="listul_user_conn">
                  ({{ scope.row.jd_num }}{{$t("message.dapp.Unit")}}/{{ scope.row.bfb }}%)
                </div>
                <div class="listul_user_zh">
                  {{ scope.row.user }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ddid" :label="$t('message.arbitration.order')">
          </el-table-column>
          <el-table-column align="center" prop="num" :label="$t('message.dapp.amount')">
            <template slot-scope="scope">
              {{ scope.row.num }} {{ huobi }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('message.dapp.limit')">
            <template slot-scope="scope">
              {{ scope.row.zd_mun }} - {{ scope.row.zg_mun }} {{ huobi }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('message.dapp.unitPrice')">
            <template slot-scope="scope">
              <div class="danjia">{{ scope.row.danjia }} {{ fabi }}</div>
            </template>
          </el-table-column>
		  <!-- <el-table-column align="center" :label="$t('message.arbitration.margin')"> -->
          <el-table-column align="center" :render-header="marginNav">
			<!-- <template slot-scope="header">  </template> -->
            <template slot-scope="scope"> {{ scope.row.bzj }} Gaz </template>
          </el-table-column>
          <el-table-column align="center" :render-header="asknNav">
            <template slot-scope="scope">
              <div class="danjia"> {{ scope.row.bzj_u }}%</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="address" :label="$t('message.operation')">
            <template slot-scope="scope">
              <van-button type="primary" color="#fdc500" @click="openmairu(scope.row.ddid)" :disabled="scope.row.user_u" v-if="tcode == 1">{{$t("message.dapp.sell")}} {{ huobi }}</van-button>
              <van-button type="primary" color="#fdc500" @click="openmairu(scope.row.ddid)" :disabled="scope.row.user_u" v-if="tcode == 2">{{$t("message.dapp.buy")}} {{ huobi }}</van-button>
            </template>
          </el-table-column>
		  <div slot="empty">
		  	<div style="padding-top: 20px;" class="f a_c c_c">
		  		<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
		  	</div>
		  	<p>{{$t('message.NoData')}}</p>
		  </div>
        </el-table>

        <div class="listul_load" v-if="dataList.length > 0">
          <div class="listul_load_an">
            <el-button @click="loadajax">{{$t('message.loadMore')}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- wap显示 -->
    <div class="hidden-sm-and-up" style="background:#fff">
      <div class="ddlist_w_head">
        <div class="ddlist_w_head_a">
          <div class="ddlist_w_head_a_item" style=" margin-left: 0px;" :class="tcode == 1 ? 'ac':''" @click="tcode = 1">{{ $t("message.dapp.sell")}}</div>
          <div class="ddlist_w_head_a_item" :class="tcode == 2 ? 'ac':''" @click="tcode = 2">{{ $t("message.dapp.buy")}}</div>
        </div>
      </div>

      <div class="ddlist_w_huobilist">
        <div class="saixuan">
          <span class="typeSelect">{{ $t("message.dapp.currency")}}：</span>
          <el-select size="mini" v-model="huobi" placeholder="Please select">
            <el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.id">
            </el-option>
          </el-select>
        </div>

        <div class="saixuan">
          <span class="typeSelect">{{ $t("message.dapp.unit")}}：</span>
          <el-select size="mini" v-model="fabi" placeholder="Please select">
            <el-option v-for="item in fbarr" :key="item.key" :label="item.id" :value="item.id">
            </el-option>
          </el-select>
        </div>

      </div>
	  <!-- 列表 -->
      <div class="ddlist_w_ddlist" v-loading="loading">
        <div class="ddlist_w_ddlist_ul">
			<div v-if="dataList.length<1" class="fc a_c">
				<div style="padding-top: 20px;" class="f a_c c_c">
					<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
				</div>
				<p style="margin-top: 20px; color: #DCDCDC;">{{$t('message.NoData')}}</p>
			</div>
          <div class="ddlist_w_ddlist_ul_li" v-for="(li, index) in dataList" :key="index">
            <div class="ddlist_w_ddlist_ul_li_u">
              <div class="ddlist_w_ddlist_ul_li_u_username">
                {{ li.username }}
              </div>
              <span>({{ li.jd_num }}{{$t("message.dapp.Unit")}}/{{ li.bfb }}%)</span>
              <span class="price-lab" style="margin-left: auto">{{$t('message.arbitration.order')}}:{{ li.ddid }}</span>
            </div>
			<div class="listul_user_zh mart-10">
			  {{ li.user }}
			</div>
            <div class="ddlist_w_ddlist_ul_li_conn">
              <div class="ddlist_w_ddlist_ul_li_conn_li mart-5">
                <span>{{$t('message.dapp.amount')}}:&nbsp;{{ li.num }} {{ huobi }}</span>
                <span class="price-lab" style="opacity: 0.7">{{$t('message.dapp.unitPrice')}}</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_li mart-5">
                <span>{{$t('message.dapp.limit')}}:&nbsp;{{ li.zd_mun }}-{{ li.zg_mun }} {{ huobi }}</span>
                <span class="price-lab jiage">{{ li.danjia }} {{ fabi }}</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_lit mart-5">
                <span>{{$t('message.dapp.blandAsk')}}:&nbsp;{{ li.bzj_u }}%</span>
                <span style="margin-left: auto">
                  <div class="ddlist_w_ddlist_ul_li_conn_li">
                    <van-button size="small" style="background-color: #FDC500;color: #fff;" @click="openmairu(li.ddid)" :disabled="li.user_u" v-if="tcode == 1">{{ $t("message.dapp.sell")}}{{ huobi }}</van-button>
                    <van-button size="small" style="background-color: #FDC500;color: #fff;" @click="openmairu(li.ddid)" :disabled="li.user_u" v-if="tcode == 2">{{ $t("message.dapp.buy")}}{{ huobi }}</van-button>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div class="ddlist_w_ddlist_ul_append" v-if="dataList.length > 0">
            <van-button plain type="primary" :disabled="load" @click="loadajax">{{$t('message.loadMore')}}</van-button>
          </div>
        </div>
      </div>
    </div>

    <myDialog :width="isphone ? '90%':'30%'" :isShowFooter="false" :title="tcode == 1 ?$t('message.dapp.sell'):$t('message.dapp.buy')" :closeModal="false" :closePress="false" :visible.sync="visibleDialogShow">
      <Mairu :did='did' @visibleDialogShowFn="visibleDialogShow=false"></Mairu>
    </myDialog>
  </div>
</template>
<script>
import Mairu from './Mairu'
import myDialog from '@/components/myDialog'
import config from "@/config";

let Base64 = require("js-base64").Base64;

import Web3 from "web3";
import Web3Modal from "web3modal";

var Address = "";
var web3 = "";

var dotc_abi = config["hyue"][config["key"]]["dotc"]["abi"];
var dotc_heyue = config["hyue"][config["key"]]["dotc"]["heyue"];
var huobiarr = config["hbi"][config["key"]];
var fabiarr = config["fabi"][config["key"]];
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];

//import VConsole from "vconsole";

export default {
  created() {
    this.body_h = document.documentElement.clientHeight;
    //new VConsole();
  },
  mounted() {
    var dq = this;
	var dq = this;
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	  dq.isphone = true;
				this.formLabelWidth = '100px'
	} else {
	  dq.isphone = false;
	}
    var hbarr = config["hbi"][config["key"]];
    for (const key in hbarr) {
      this.hbarr.push(hbarr[key]);
    }
    var fbarr = config["fabi"][config["key"]];
    for (const key in fbarr) {
      this.fbarr.push(fbarr[key]);
    }

    // 监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      web3 = new Web3(config["hyue"][config["key"]]["Url"]);
      Address = "";
      this.getlist(dq.tcode, dq.huobi, dq.fabi);
    } else {
      //初始化
      webinit();
    }


    async function webinit() {
      console.log("检测有钱包");
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
        Address = provider.selectedAddress;
        //其他钱包使用测试网络
        if (
          window.ethereum.isImToken ||
          window.ethereum.isMetaMask ||
          window.ethereum.isHbWallet
        ) {
          var wlcode = window.ethereum.networkVersion;
          //imtoken只能查看 无法操作 出发是ETF主网
          if (window.ethereum.isImToken) {
            web3.setProvider(config["hyue"][config["key"]]["Url"]);
          }
          //检测是否是火币钱包
          if (window.ethereum.isHbWallet) {
            Address = window.ethereum.address;
            web3.setProvider(config["hyue"]["huobi"]["Url"]);
          }
          //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
          if (window.ethereum.isMetaMask && wlcode != 4) {
            web3.setProvider(config["hyue"][config["key"]]["Url"]);
          }
        } else {
          web3.setProvider(config["hyue"][config["key"]]["Url"]);
        }
        dq.getlist(dq.tcode, dq.huobi, dq.fabi);
      }
    }
  },
  data() {
    return {
      hbarr: [],
      tcode: 1,
      huobi: "USDT",
      fabi: "CNY",
      fbarr: [],
      count: 20,
      loading: false,
      body_h: 0,
      dataList: [],
      load: false,
      visibleDialogShow: false,
      did: '',
	  isphone:false,
    };
  },
  watch: {
    tcode(e) {
      this.count = 20;
      this.getlist(e, this.huobi, this.fabi);
    },
    huobi(e) {
      console.log('e: ', e);
      this.count = 20;
      this.getlist(this.tcode, e, this.fabi);
    },
    fabi(e) {
      console.log('e: ', e);
      this.count = 20;
      this.getlist(this.tcode, this.huobi, e);
    },
  },
  methods: {
    xuanzehuobi(e) {
      this.huobi = e;
    },
    xuanzefabi(e) {
      this.fabi = e;
    },
    openfabu() {
      this.$Jt.$emit("fabu_dd", 1);
    },
    openmairu(e) {
      // this.$router.push({ path: "./mairu", query: { did: e } });
	  this.$router.push({ name: 'mairu', query: { did: e } })
      // this.visibleDialogShow = true
      // this.did = e
    },

    /*
            获取列表数据
        */
    getlist(tcode, huobi, fabi) {
      var dq = this;
      dq.loading = true;
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
      var order_type = "";
      var asset_type = "";
      var money_type = "";
      var lowmar = "000000";

      var huobi_num = 0;
      if (tcode == 1) {
        order_type =
          "0x6275790000000000000000000000000000000000000000000000000000000000";
      } else {
        order_type =
          "0x73616c6500000000000000000000000000000000000000000000000000000000";
      }
      for (const key in huobiarr) {
        if (huobi == huobiarr[key]["id"]) {
          asset_type = huobiarr[key]["key"];
          huobi_num = huobiarr[key]["num"];
          break;
        }
      }
      for (const key in fabiarr) {
        if (fabi == fabiarr[key]["id"]) {
          money_type = fabiarr[key]["key"];
          break;
        }
      }
      var dataList = [];
      dotsconn.methods
        .sort(order_type, asset_type, money_type, 1000, dq.count, lowmar)
        .call((err, ret) => {
          dq.loading = false;
          if (ret) {
            if (ret[0].length > 0) {
              for (let index = 0; index < ret[0].length; index++) {
                var obj = {};
				console.log(ret[2][index]);
				let arr = ret[2][index].split("|")
                obj["username"] = Base64.decode(arr[0]);
                obj["user"] =
                  ret[1][index].slice(0, 5) +
                  "..." +
                  ret[1][index].slice(
                    ret[1][index].length - 5,
                    ret[1][index].length
                  );
                obj["user_u"] =
                  ret[1][index].toLowerCase() == Address ? true : false;
                if (
                  Number(ret[0][index][6]) == 0 &&
                  Number(ret[0][index][7]) == 0
                ) {
                  obj["bfb"] = 0;
                } else {
                  obj["bfb"] = (
                    100 /
                    (Number(ret[0][index][6]) + Number(ret[0][index][7]))
                  ).toFixed(0);
                }
                obj["jd_num"] =
                  Number(ret[0][index][6]) + Number(ret[0][index][7]);
                obj["ddid"] = Number(ret[0][index][0]);
                obj["num"] = (
                  Number(ret[0][index][1]) /
                  10 ** huobi_num
                ).toFixed(2);
                obj["zd_mun"] = (
                  Number(ret[0][index][2]) /
                  10 ** huobi_num
                ).toFixed(2);
                obj["zg_mun"] = (
                  Number(ret[0][index][3]) /
                  10 ** huobi_num
                ).toFixed(2);
                obj["danjia"] = (Number(ret[0][index][4]) / 100).toFixed(2);
                obj["bzj"] = (Number(ret[0][index][8]) / 10 ** bzj_num).toFixed(
                  2
                );
                obj["bzj_u"] = Number(ret[0][index][5]) / 10 ** 16;
                dataList.push(obj);
              }
              dq.dataList = dataList;
            } else {
              dq.dataList = dataList;
            }
          }
        });
    },

    loadajax() {
      if (this.load) {
        return;
      }

      var dq = this;
      dq.loading = true;
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
      var order_type = "";
      var asset_type = "";
      var money_type = "";
      var lowmar = "000000";
      var huobi_num = 0;
      if (this.tcode == 1) {
        order_type =
          "0x6275790000000000000000000000000000000000000000000000000000000000";
      } else {
        order_type =
          "0x73616c6500000000000000000000000000000000000000000000000000000000";
      }

      for (const key in huobiarr) {
        if (this.huobi == huobiarr[key]["id"]) {
          asset_type = huobiarr[key]["key"];
          huobi_num = huobiarr[key]["num"];
          break;
        }
      }
      for (const key in fabiarr) {
        if (this.fabi == fabiarr[key]["id"]) {
          money_type = fabiarr[key]["key"];
          break;
        }
      }
      dq.count += 20;
      dotsconn.methods
        .sort(order_type, asset_type, money_type, 1000, dq.count + "", lowmar)
        .call((err, ret) => {
          dq.loading = false;
          if (ret) {
            if (ret[0].length > 0) {
              for (let index = 0; index < ret[0].length; index++) {
                for (let a = 0; a < dq.dataList.length; a++) {
                  if (dq.dataList[index]["ddid"] == Number(ret[0][index][0])) {
                    continue;
                  }
                  var obj = {};
                  obj["username"] = Base64.decode(ret[2][index]);
                  obj["user"] =
                    ret[1][index].slice(0, 5) +
                    "..." +
                    ret[1][index].slice(
                      ret[1][index].length - 5,
                      ret[1][index].length
                    );
                  obj["user_u"] =
                    ret[1][index].toLowerCase() == Address ? true : false;
                  if (
                    Number(ret[0][index][6]) == 0 &&
                    Number(ret[0][index][7]) == 0
                  ) {
                    obj["bfb"] = 0;
                  } else {
                    obj["bfb"] = (
                      100 /
                      (Number(ret[0][index][6]) + Number(ret[0][index][7]))
                    ).toFixed(0);
                  }
                  obj["jd_num"] =
                    Number(ret[0][index][6]) + Number(ret[0][index][7]);
                  obj["ddid"] = Number(ret[0][index][0]);
                  obj["num"] = (
                    Number(ret[0][index][1]) /
                    10 ** huobi_num
                  ).toFixed(2);
                  obj["zd_mun"] = (
                    Number(ret[0][index][2]) /
                    10 ** huobi_num
                  ).toFixed(2);
                  obj["zg_mun"] = (
                    Number(ret[0][index][3]) /
                    10 ** huobi_num
                  ).toFixed(2);
                  obj["danjia"] = Number(ret[0][index][4]).toFixed(2);
                  obj["bzj"] = (
                    Number(ret[0][index][8]) /
                    10 ** bzj_num
                  ).toFixed(2);
                  obj["bzj_u"] = Number(ret[0][index][5]) / 10 ** 16;
                  dq.dataList.push(obj);
                }
              }
              dq.load = false;
            }
          }
        });
    },
	// 自定义表头 （保证金）
	marginNav(h,{column,$index}){
		let str = this.$t("message.arbitration.margin")
		let str1 = this.$t("message.arbitration.marginBalance")
		return h('div', [
		                h('span', str),
		                h(
		                    'el-tooltip',
		                    {
		                        props: {
		                            effect: 'dark',
		                            content: str1,
		                            placement: 'top',
		                        },
		                    },
		                    [
		                        h('i', {
		                            class: 'el-icon-question',
		                            style: 'color:#409eff;margin-left:5px;',
		                        }),
		                    ],
		                ),
		            ]);
	},
	// 自定义表头 （保证金比咧）
	asknNav(h,{column,$index}){
		let str = this.$t("message.dapp.blandAsk")
		let str1 = this.$t("message.arbitration.payMar1")
		return h('div', [
		                h('span', str),
		                h(
		                    'el-tooltip',
		                    {
		                        props: {
		                            effect: 'dark',
		                            content: str1,
		                            placement: 'top',
		                        },
		                    },
		                    [
		                        h('i', {
		                            class: 'el-icon-question',
		                            style: 'color:#409eff;margin-left:5px;',
		                        }),
		                    ],
		                ),
		            ]);
	}
	
  },
  components: {
    Mairu, myDialog
  }
};
</script>

<style lang='less' scoped>
.ddlistaa {
  width: auto;
  margin: 0 auto;
  // background-color: #fff;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
.ddlistaa_head {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 10px;
  background-color: #fff;
  .left {
    display: flex;
    .sell {
      background: #FFFFFF;
	  border: 1px solid #DCDCDC;
    }
    .purchase {
      background: #FFFFFF;
	  border: 1px solid #DCDCDC;
    }
	.bg{
		background: #0f79f1;
		color: #fff;
		border: none;
	}
  }
  .right {
    display: flex;
    .saixuan {
      margin-left: 15px;
      height: 30px;
      display: flex;
      align-items: center;
    }
  }
}

.listul {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .el-table {
    flex: 1;
    overflow: auto;
  }
}

.lxfsarr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 180px;
  overflow: hidden;
}
.lxfsarr_item {
  font-size: 24px;
}
.danjia {
  color: #339b98;
  font-weight: 900px;
  font-size: 14px;
}

button.anniu {
  width: 120px;
}

.ddlistaa_head_item {
  display: flex;
  border: 1px solid rgb(231, 230, 230);
  padding: 5px;
}
.ddlistaa_head_item_a {
  width: 75px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  /* opacity: 0.5; */
  margin-right: 10px;
  color: #ccc;
}
.ddlistaa_head_item_a.ac {
  // background-color: #2ead65;
  font-size: 14px;
  opacity: 1;
  color: #fff;
}
.ddlistaa_head_item_a.acc {
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
}

.el-dropdown-link {
  padding: 0 15px;
}

.ddlistaa_head_item.fabu {
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  margin-right: 0;
  border: 0;
}
.ddlistaa_head_item_an {
  margin-left: auto;
}

/* wap布局 */
.ddlist_w_head {
  display: flex;
  height: 50px;
  align-items: center;
  margin: 0 15px;
}
.ddlist_w_head_a {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ddlist_w_head_a_item {
  margin-left: 15px;
  font-size: 15px;
}
.ddlist_w_head_a_item.ac {
  font-size: 24px;
  color: #2ead65;
}
.ddlist_w_head_b {
  margin-left: auto;
  font-size: 15px;
  min-width: 150px;
  text-align: right;
}

.ddlist_w_huobilist {
  line-height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /deep/.saixuan {
    display: flex;
    align-items: center;

    .el-select {
      width: 80px !important;
    }
  }
}
.ddlist_w_huobilist_ul {
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.ddlist_w_huobilist_ul_li {
  float: left;
  padding: 15px;
  text-align: center;
  position: relative;
  font-size: 14px;
}
.ddlist_w_huobilist_ul_li.ac {
  padding-bottom: 10px;
  color: #2ead65;
}
.ddlist_w_huobilist_ul_li.ac::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #2ead65;
  left: calc((100% - 40px) / 2);
  right: 0;
}

.ddlist_w_ddlist {
  width: 100%;
  margin-top: 15px;
}
.ddlist_w_ddlist_ul {
  display: flex;
  margin: 0 15px;
  flex-direction: column;
}
.ddlist_w_ddlist_ul_li {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.ddlist_w_ddlist_ul_li_u {
  display: flex;
  flex-direction: row;
  /* height: 50px; */
  align-items: center;
}
.ddlist_w_ddlist_ul_li_u_username {
  font-size: 16px;
}
.ddlist_w_ddlist_ul_li_u span {
  margin-left: 5px;
  opacity: 0.5;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn {
  display: flex;
  flex-direction: column;
}
.ddlist_w_ddlist_ul_li_conn_li {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn_lit {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn_li span.price-lab {
  margin-left: auto;
  padding-top: 5px;
}
.ddlist_w_ddlist_ul_li_conn_li span.price-lab.jiage {
  font-size: 16px;
  color: #2ead65;
  font-weight: 900;
}
.ddlist_w_ddlist_ul_li_conn_li button {
  margin-left: auto;
  margin-top: 15px;
}
.listul_user {
  display: flex;
  flex-direction: column;
}
.listul_user_name {
  font-size: 16px;
}
.listul_user_conn {
  padding: 2px 0;
}
.listul_user_zh {
  opacity: 0.5;
  font-size: 14px;
}

.listul_load_an {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
}

.ddlist_w_ddlist_ul_append {
  display: flex;
  margin: 15px 0;
  justify-content: center;
}
div{
	/deep/ .tooltip_nav{
		border: none;
		padding: 0;
	}
}
</style>