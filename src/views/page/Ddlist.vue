<style>
.ddlistaa {
  width: auto;
  background-color: #fff;
  margin: auto;
}
.ddlistaa_head {
  /* width: 100%; */
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
}

.listul {
  width: 100%;
  float: left;
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
  color: rgb(14, 30, 245);
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
  color: rgb(0, 0, 0);
  color: rgb(196, 190, 190);
}
.ddlistaa_head_item_a.ac {
  background-color: #2ead65;
  color: #fff;
  font-size: 14px;
}
.ddlistaa_head_item_a.acc {
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
}
.ddlistaa_head_item.saixuan {
  margin-left: 15px;
  height: 30px;
  display: flex;
  align-items: center;
  /* padding: 0 15px;  */
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
  width: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
  margin: 0 15px;
}
.ddlist_w_head_a {
  width: 100%;
  display: flex;
  align-items: center;
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
  width: 100%;
  float: left;
  overflow: hidden;
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
  content: "";
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
  float: left;
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
  height: 50px;
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
</style>
<template>
  <div class="ddlistaa">
    <div class="hidden-xs-only">
      <!-- 订单列表 -->
      <div class="ddlistaa_head">
        <div class="ddlistaa_head_item">
          <div
            class="ddlistaa_head_item_a anniucss"
            :class="tcode == 1 ? 'ac' : ''"
            @click="tcode = 1"
          >
            出售
          </div>
          <div
            class="ddlistaa_head_item_a anniucss"
            :class="tcode == 2 ? 'ac' : ''"
            @click="tcode = 2"
          >
            购买
          </div>
        </div>

        <div class="ddlistaa_head_item saixuan">
          <el-dropdown trigger="click" @command="xuanzehuobi">
            <span class="el-dropdown-link">
              {{ huobi }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="li in hbarr"
                :key="li.id"
                :command="li.id"
                >{{ li.id }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="ddlistaa_head_item saixuan">
          <el-dropdown trigger="click" @command="xuanzefabi">
            <span class="el-dropdown-link">
              {{ fabi }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="li in fbarr"
                :key="li.id"
                :command="li.id"
                >{{ li.id }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="ddlistaa_head_item fabu">
          <van-button
            type="info"
            class="ddlistaa_head_item_an"
            @click="openfabu"
            >发布委托单</van-button
          >
        </div>
      </div>
      <!-- 表格 -->
      <div class="listul" v-loading="loading">
        <el-table
          :fixed="true"
          :data="list"
          style="width: 100%; overflow: auto"
        >
          <el-table-column label="商家" width="180">
            <template slot-scope="scope">
              <div class="listul_user">
                <div class="listul_user_name">{{ scope.row.username }}</div>
                <div class="listul_user_conn">
                  ({{ scope.row.jd_num }}单/{{ scope.row.bfb }}%)
                </div>
                <div class="listul_user_zh">
                  {{ scope.row.user }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="ddid" label="订单号" width="100">
          </el-table-column>
          <el-table-column prop="num" width="180" label="数量">
            <template slot-scope="scope">
              {{ scope.row.num }} {{ huobi }}
            </template>
          </el-table-column>
          <el-table-column width="200" label="限额">
            <template slot-scope="scope">
              {{ scope.row.zd_mun }} - {{ scope.row.zg_mun }} {{ huobi }}
            </template>
          </el-table-column>
          <el-table-column label="单价" width="180">
            <template slot-scope="scope">
              <div class="danjia">{{ scope.row.danjia }} {{ fabi }}</div>
            </template>
          </el-table-column>
          <el-table-column width="150" label="保证金余额">
            <template slot-scope="scope"> {{ scope.row.bzj }} USDT </template>
          </el-table-column>
          <el-table-column label="保证金要求">
            <template slot-scope="scope"> {{ scope.row.bzj_u }}% </template>
          </el-table-column>
          <el-table-column prop="address" width="150" label="操作">
            <template slot-scope="scope">
              <van-button
                type="primary"
                @click="openmairu(scope.row.ddid)"
                :disabled="scope.row.user_u"
                v-if="tcode == 1"
                >出 售 {{ huobi }}</van-button
              >
              <van-button
                type="primary"
                @click="openmairu(scope.row.ddid)"
                :disabled="scope.row.user_u"
                v-if="tcode == 2"
                >购 买 {{ huobi }}</van-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="listul_load">
          <div class="listul_load_an">
            <el-button @click="loadajax">加载更多</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- wap显示 -->
    <div class="hidden-sm-and-up">
      <div class="ddlist_w_head">
                <div class="ddlist_w_head_a">
                    <div class="ddlist_w_head_a_item" style=" margin-left: 0px;" :class="tcode == 1 ? 'ac':''" @click="tcode = 1">出售</div>
                    <div class="ddlist_w_head_a_item" :class="tcode == 2 ? 'ac':''" @click="tcode = 2">购买</div>
                </div>
                <div class="ddlist_w_head_b">
                    <el-dropdown trigger="click" @command="xuanzefabi">
                        <span class="el-dropdown-link">
                        {{ fabi }} <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="li in fbarr"
                            :key="li.id"
                            :command="li.id"
                            >{{ li.id }}</el-dropdown-item
                        >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

      <div class="ddlist_w_huobilist" style="border-bottom: 1px solid #ddd;">
        <div class="ddlist_w_huobilist_ul">
          <div
            class="ddlist_w_huobilist_ul_li"
            v-for="li in hbarr"
            :key="li.id"
            :class="huobi == li.id ? 'ac' : ''"
            @click="xuanzehuobi(li.id)"
          >
            {{ li.id }}
          </div>
          <!-- <div class="ddlist_w_huobilist_ul_li" :class="huobi == 'WETH'?'ac':''" @click="xuanzehuobi('WETH')">
                        WETH
                    </div> -->
        </div>
      </div>

      <div class="ddlist_w_ddlist" v-loading="loading">
        <div class="ddlist_w_ddlist_ul">
          <div
            class="ddlist_w_ddlist_ul_li"
            v-for="(li, index) in list"
            :key="index"
          >
            <div class="ddlist_w_ddlist_ul_li_u">
              <div class="ddlist_w_ddlist_ul_li_u_username">
                {{ li.username }}
              </div>
              <span>({{ li.jd_num }}单/{{ li.bfb }}%)</span>
              <span class="price-lab" style="margin-left: auto">订单号：{{ li.ddid }}</span>
            </div>
            <div class="ddlist_w_ddlist_ul_li_conn">
              <div class="ddlist_w_ddlist_ul_li_conn_li">
                <span>数量:&nbsp;{{ li.num }} {{ huobi }}</span>
                <span class="price-lab" style="opacity: 0.7">单价</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_li">
                <span
                  >限额:&nbsp;{{ li.zd_mun }}-{{ li.zg_mun }} {{ huobi }}</span
                >
                <span class="price-lab jiage">{{ li.danjia }} {{ fabi }}</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_lit">
                  <span 
                      >保证金:&nbsp;{{ li.bzj_u }}%</span
                  >
                  <span  style="margin-left: auto">
                    <div class="ddlist_w_ddlist_ul_li_conn_li">
                      <van-button
                        type="info"
                        @click="openmairu(li.ddid)"
                        :disabled="li.user_u"
                        v-if="tcode == 1"
                        >出售{{ huobi }}</van-button
                      >
                      <van-button
                        type="info"
                        @click="openmairu(li.ddid)"
                        :disabled="li.user_u"
                        v-if="tcode == 2"
                        >购买{{ huobi }}</van-button
                      >
                    </div>
                 </span>
               </div>
            </div>
          </div>
          <div class="ddlist_w_ddlist_ul_append">
            <van-button plain type="primary" :disabled="load" @click="loadajax"
              >加载更多...</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";

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

    console.log(window.ethereum);

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
        // if (
        //   window.ethereum.isImToken ||
        //   window.ethereum.isMetaMask ||
        //   window.ethereum.isHbWallet
        // ) {
        //   var wlcode = window.ethereum.networkVersion;
        //   //imtoken只能查看 无法操作 出发是ETF主网
        //   if (window.ethereum.isImToken) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //   }
        //   //检测是否是火币钱包
        //   if (window.ethereum.isHbWallet) {
        //     Address = window.ethereum.address;
        //     web3.setProvider(config["hyue"]["huobi"]["Url"]);
        //   }
        //   //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
        //   if (window.ethereum.isMetaMask && wlcode != 4) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        //   }
        // } else {
        //   web3.setProvider(config["hyue"][config["key"]]["Url"]);
        // }
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
      list: [],
      load: false,
    };
  },
  watch: {
    tcode(e) {
      this.count = 20;
      this.getlist(e, this.huobi, this.fabi);
    },
    huobi(e) {
      this.count = 20;
      this.getlist(this.tcode, e, this.fabi);
    },
    fabi(e) {
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
      this.$router.push({ path: "./mairu", query: { did: e } });
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
      var list = [];
      dotsconn.methods
        .sort(order_type, asset_type, money_type, 1000, dq.count, lowmar)
        .call((err, ret) => {
          dq.loading = false;
          if (ret) {
            if (ret[0].length > 0) {
              for (let index = 0; index < ret[0].length; index++) {
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
                obj["danjia"] = (Number(ret[0][index][4]) / 100).toFixed(2);
                obj["bzj"] = (Number(ret[0][index][8]) / 10 ** bzj_num).toFixed(
                  2
                );
                obj["bzj_u"] = Number(ret[0][index][5]) / 10 ** 4;
                list.push(obj);
              }
              dq.list = list;
            } else {
              dq.list = list;
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
                for (let a = 0; a < dq.list.length; a++) {
                  if (dq.list[index]["ddid"] == Number(ret[0][index][0])) {
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
                  obj["bzj_u"] = Number(ret[0][index][5]) / 10 ** 4;
                  dq.list.push(obj);
                }
              }
              dq.load = false;
            }
          }
        });
    },
  },
};
</script>