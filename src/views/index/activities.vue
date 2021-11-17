<style lang="less" scoped>
.awards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  line-height: 30px;
  flex-wrap: wrap;
  span {
    font-size: 14px;
  }
  &:nth-of-type(2) {
    border-bottom: 1px solid #000;
    margin-bottom: 14px;
  }
}
.urlContent {
  padding: 20px;
  .url {
    word-break: break-all;
    line-height: 24px;
  }
  .copy {
    cursor: pointer;
    margin-left: 10px;
    transform: translateY(-5px);
  }
  .disc {
    margin-top: 10px;
    font-weight: bold;
  }
  /deep/ #qrCode {
    text-align: center;
    img {
      display: inline-block;
      margin: 10px auto;
    }
  }
}

.publicity {
  line-height: 25px;
  span {
    font-size: 16px;
    color: #000;
  }
  i {
    font-size: 12px;
    color: #333;
  }
}
.Submit {
  text-align: center;
  background-color: #333;
  span {
    display: inline-block;
    margin: 8px 0;
    box-shadow: none !important;
  }
}
.record {
  border-top: 1px solid #000;
  margin: 10px 0;
  padding: 5px;
  .record_title {
    height: 30px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
    }
  }
  .record_list {
    max-height: 200px;
    overflow: auto;
    li {
      padding: 5px 8px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;
      // border-bottom: 1px solid #ccc;
      span {
        font-size: 14px;
        text-align: center;
        flex: 1;
      }
      .ecli {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        border-right: 1px solid #ccc;
      }
    }
  }
  &:nth-of-type(1) {
    li {
      span {
        &:nth-of-type(1) {
          flex: 0.6;
        }
        &:nth-of-type(2) {
          flex: 1.3;
        }
        &:nth-of-type(3) {
          flex: 1.4;
        }
        &:nth-of-type(4) {
          flex: 2.2;
        }
      }
    }
  }
  &:nth-of-type(2) {
    background: #efefef;
    border-top: 0;
    li {
      span {
        &:nth-of-type(4) {
          flex: 4;
        }
        &:nth-of-type(5) {
          flex: 2;
        }
      }
    }
  }
  &:nth-of-type(3) {
    border-top: 0;
    border-bottom: 1px solid #000;
    li {
      span {
        &:nth-of-type(3) {
          flex: 1.1;
        }
        &:nth-of-type(5) {
          flex: 0.7;
          background: #178cff;
          color: #fff;
          padding: 6px 0;
          border-radius: 3px;
          box-shadow: 0 0 2px 0 #ccc;
        }
      }
    }
  }
}
.shift {
  display: flex;
  padding: 15px;
  flex-direction: column;
  .shif_number {
    font-size: 12px;
    padding: 10px 0;
  }
}
.shif_let {
  display: flex;
  span {
    font-size: 14px;
    display: inline-block;
    width: 20%;
    height: 30px;
    line-height: 30px;
  }
}
input {
  display: inline-block;
  line-height: 30px;
  height: 30px;
  font-size: 14px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 4px;
  flex: 1;
}
.details_wrap {
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  margin-top: 10px;
  img {
    width: 100%;
  }
}
.banner {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 30px auto 8px auto;
  text-align: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #333;
  border-radius: 5px;
  height: 80px;
  h6 {
    margin-bottom: 10px;
  }
}
.progress-x {
  width: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #333;
  flex-wrap: wrap;
}
.progress-x > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress-x > div.zb-div {
  border: 1px solid #666666;
  border-radius: 5px;
  font-size: 12px;
  margin: 5px 0;
  span {
    padding: 4px;
  }
}
.progress-x {
  div.zb-line {
    width: 7%;
    height: 0.5px;
    border: 1px solid #ddd;
    margin-right: 12px;
    position: relative;
  }
}
.zb-line::after,
.zb-line:before {
  border: 10px solid transparent;
  border-left: 10px solid #fff;
  right: 10;
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  right: -20px;
  content: ' ';
}
.zb-line::before {
  border-left-color: #333;
  right: -20px;
}
.progress-x > div.current-n {
  border: 1px solid #178cff;
  color: #fff;
  background: #178cff;
}
table {
  width: 100%;
}
th {
  font-size: 16px;
}
td {
  width: 33.3%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.vhtml_head {
  display: flex;
  align-items: center;
}
.hindex {
  width: 100%;
  float: left;
  height: 100%;
}
.hindex_view {
  width: 100%;
  height: 48px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.hindex_view_ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
}

.hindex_view_ul_l {
  margin: 0 15px;
  font-size: 16px;
  opacity: 0.5;
}
.hindex_view_ul_l.ac {
  opacity: 1;
  color: rgb(11, 108, 253);
}

.hindex_view_b {
  width: 100%;
  float: left;
  background-color: rgb(245, 245, 245);
  display: flex;
  align-items: center;
}

.hindex_view_b_l {
  margin-right: auto;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.hindex_view_b_l_t {
  font-size: 36px;
  opacity: 0.6;
}
.hindex_view_b_l_msg {
  font-size: 14px;
  opacity: 0.5;
  padding-top: 15px;
}

.hindex_view_b_r {
  margin-right: auto;
  margin-left: auto;
  height: calc(100vh - (48px * 2) - 60px);
  overflow-y: scroll;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.hindex_view_ul_r {
  margin-left: auto;
  padding-right: 15px;
  font-size: 14px;
  opacity: 0.5;
}
.hindex_view_ul_r:active {
  opacity: 1;
  color: rgb(1, 217, 255);
}
.my-swipe {
  .van-swipe-item {
    img {
      width: 100%;
    }
  }
}
.main {
  width: 100%;
  float: left;
  padding: 8px 15px;
  .userName {
    height: 20x;
    line-height: 20px;
    font-size: 12px;
  }
  .Invitation {
    line-height: 24px;
    height: 24px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .rule {
      i {
        font-size: 12px;
        display: inline-block;
        text-align: center;
        line-height: 15px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #333;
      }
    }
  }
  table {
    td {
      padding: 4px;
    }
  }
  .currency {
    text-align: right;
    margin-right: 10px;
    span {
      font-size: 12px;
    }
  }
}
.shade {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vh;
  height: 100vh;
  opacity: 0.5;
  background: #000;
}
.hide_wrap,
.dialogue {
  position: fixed;
  border-radius: 10px;
  width: 80%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: 0.6s;
  padding: 20px 15px;
  span {
    font-size: 12px;
    display: block;
  }
  li {
    width: 100%;
    display: flex;
    align-items: flex-end;
    span {
      font-size: 16px;
      // min-width: 23%;
    }
    > div {
      flex: 1;
    }
    input {
      width: 100%;
      display: block;
      border: 0;
      border-bottom: 1px solid #666;
      border-radius: 0;
      padding: 0 8px;
    }
  }
  .state {
    span {
      vertical-align: middle;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  .enrollBtn {
    width: 100%;
    justify-content: center;
    margin-top: 20px;
  }
}
.cssBtn {
  background: #178cff;
  color: #fff;
  padding: 4px 4px;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 #ccc;
}
.lang {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 1001;
  color: #fff;
}
</style>
<template>
  <div class="activities">
    <div class="vhtml_head_left">
      <div class="vhtml_head">
        <van-icon @click="$router.push('/')" style="margin-top: 2px" name="arrow-left" />
        <div class="vhtml_head_left_logo">
          <p>
            <img src="@/assets/title.png" alt="GAZOTC" width="48" height="45" />
          </p>
        </div>
        <lang class="lang"></lang>
      </div>
    </div>
    <div class="hindex">
      <van-swipe class="my-swipe hidden-md-and-up" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="~@/assets/s1.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="~@/assets/s2.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="~@/assets/s3.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="~@/assets/s4.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <div class="awards">
        <div class="userName" @click="showPopFn">
          <span class="cssBtn">{{ $t("message.activit.title") }}</span>
        </div>
        <span>{{ $t("message.activit.addr") }}:{{ user }}</span>
      </div>
      <van-popup class="urlContent" v-model="showPop" round :style="{ height: '35%', width: '80%' }">
        <span class="url">URL:{{ friendUrl }}</span>
        <van-button type="primary" @click="copyFn" class="copy" size="mini">{{
          $t("message.activit.copyURL")
        }}</van-button>
        <div class="disc">{{ $t("message.activit.share") }}</div>
        <div id="qrCode" ref="qrCodeDiv"></div>
      </van-popup>
      <div class="awards">
        <span>{{ $t("message.activit.nickname") }}:{{
            nickname ? nickname : this.$t("message.activit.unregistered")
          }}</span>
        <span>{{ $t("message.activit.name") }}:{{
            name ? name : this.$t("message.activit.unregistered")
          }}</span>
        <span>{{ $t("message.activit.IDnumber") }}:{{
            identity ? identity : this.$t("message.activit.unregistered")
          }}</span>
      </div>

      <div class="Invitation">
        <span>{{ $t("message.activit.First") }}:</span>
        <div class="rule">
          <span> {{ $t("message.activit.Airdroprules") }} </span>
          <i @click="hideFull">i</i>
        </div>
      </div>
      <table class="reg" border="1">
        <tr>
          <th></th>
          <th>{{ $t("message.activit.积分") }}</th>
          <th>{{ $t("message.activit.已发放") }}</th>
        </tr>
        <tr>
          <td>{{ $t("message.activit.空投奖励") }}</td>
          <td>{{ air }}</td>
          <td>0</td>
        </tr>
        <tr>
          <td>{{ $t("message.activit.分享奖励") }}</td>
          <td>{{ rec }}</td>
          <td>0</td>
        </tr>
      </table>
      <div class="step">
        <div class="progress-x">
          <div class="zb-div">
            <span class="zb-title" @click="ruleHideFull">{{
              $t("message.activit.一键注册")
            }}</span>
          </div>
          <div class="zb-line"></div>
          <div class="zb-div current-n">
            <span class="zb-title" @click="getpoints">{{
              $t("message.activit.领取积分")
            }}</span>
          </div>
          <div class="zb-line"></div>
          <div class="zb-div">
            <span class="zb-title" @click="ruleHideAuth">{{
              $t("message.activit.实名认证")
            }}</span>
          </div>
          <div class="zb-line"></div>
          <div class="zb-div">
            <span class="zb-title">{{ $t("message.activit.空投发放") }}</span>
          </div>
        </div>
      </div>
      <div class="details">
        <div class="details_wrap">
          <img src="@/assets/banner1.jpg" alt="" />
          <div class="currency">
            <span>{{ $t("message.activit.可用USDT") }}:{{
                Number(numberHb / 10 ** 18).toFixed(2)
              }}</span>
          </div>
          <div class="shift">
            <div class="shif_let">
              <span>USDT</span>
              <input v-model="USTDVal" type="text" :placeholder="$t('message.activit.请输入数量')" />
            </div>
            <div class="shif_number">
              <span>1GAZ = 0.5USDT</span>
            </div>
            <div class="shif_let">
              <span>GAZ</span>
              <input type="text" v-model="GAZVal" :placeholder="$t('message.activit.请输入数量')" />
            </div>
          </div>
        </div>
        <div class="Submit">
          <span class="cssBtn" @click="exchange">{{
            $t("message.activit.兑换")
          }}</span>
        </div>
      </div>
      <div class="record_panel">
        <div class="record">
          <div class="record_title">
            <span>{{ $t("message.activit.兑换记录") }}</span>
          </div>
          <ul class="record_list">
            <li>
              <span>{{ $t("message.activit.序号") }}</span>
              <span>{{ $t("message.activit.usdt") }}</span>
              <span>{{ $t("message.activit.gaz") }}</span>
              <span>{{ $t("message.activit.日期") }}</span>
            </li>
            <li v-for="v in duihuanjilu">
              <span v-for="(v2, index) in v">{{ handleVal(v2, index) }}</span>
            </li>
          </ul>
        </div>
        <div class="record">
          <div class="record_title">
            <span>{{ $t("message.activit.返佣记录") }}</span>
          </div>
          <ul class="record_list">
            <li>
              <span>{{ $t("message.activit.日期") }}</span>
              <span>usdt</span>
              <span>gaz</span>
              <span>{{ $t("message.activit.返佣记录") }}</span>
              <span>{{ $t("message.activit.推荐地址") }}</span>
            </li>
            <li v-for="(v, index) in fanyongjilu">
              <span :class="[index == 4 ? `ecli` : '']" v-for="(v2, index) in v">{{ handleVal2(v2, index) }}</span>
            </li>
          </ul>
        </div>
        <div class="record">
          <div class="record_title">
            <span>{{ $t("message.activit.锁仓数量") }}</span>
          </div>
          <ul class="record_list">
            <li>
              <span>{{ $t("message.activit.一次释放") }}:</span>
              <span>{{ Number(gazone / 10 ** 18).toFixed(2) }} gaz</span>
              <span></span>
              <span></span>
              <span @click="getone"> {{ $t("message.activit.提取") }}</span>
            </li>
            <li>
              <span>{{ $t("message.activit.线性释放") }}:</span>
              <span>{{ Number(gazlock / 10 ** 18).toFixed(2) }} gaz</span>
              <span>{{ $t("message.activit.可提取数量") }}:</span>
              <span>{{ Number(gazfree / 10 ** 18).toFixed(2) }} gaz</span>
              <span @click="getfree"> {{ $t("message.activit.提取") }}</span>
            </li>
          </ul>
        </div>
        <div class="publicity">
          <span>
            {{ $t("message.activit.公开销售说明") }}:<br />
            <i>
              {{ $t("message.activit.1") }}<br />
              {{ $t("message.activit.2") }}<br />
              {{ $t("message.activit.3") }}<br />
              {{ $t("message.activit.4") }}<br />
            </i>
          </span>
        </div>
      </div>
    </div>
    <div class="hide" v-show="ruleHide">
      <div class="shade" @click="hideFull"></div>
      <div class="hide_wrap">
        <span>
          {{ $t("message.activit.5") }}:<br />
          <i>
            {{ $t("message.activit.51") }}<br />
            {{ $t("message.activit.52") }}<br />
            {{ $t("message.activit.53") }}<br />
            {{ $t("message.activit.54") }}<br />
            {{ $t("message.activit.55") }}<br />
            {{ $t("message.activit.56") }}<br />
            {{ $t("message.activit.57") }}<br />
            {{ $t("message.activit.58") }}<br />
          </i>
        </span>
      </div>
    </div>
    <div class="enroll" v-show="enroll">
      <div class="shade" @click="ruleHideFull"></div>
      <ul class="dialogue">
        <li>
          <span>* {{ $t("message.activit.nickname") }}</span>
          <div>
            <input type="text" v-model="regForm.nickname" />
          </div>
        </li>
        <li>
          <span>** {{ $t("message.activit.name") }} </span>
          <div> <input type="text" v-model="regForm.name" /> </div>
        </li>
        <li>
          <span>** {{ $t("message.activit.IDnumber") }}</span>
          <div> <input type="text" v-model="regForm.identity" /></div>
        </li>
        <li class="state">
          <span>{{ $t("message.activit.61") }} </span>
        </li>
        <li class="enrollBtn">
          <el-button @click="register">
            {{ $t("message.activit.注册") }}
          </el-button>
        </li>
      </ul>
    </div>
    <div class="enauth" v-show="enauth">
      <div class="shade" @click="ruleHideAuth"></div>
      <ul class="dialogue">
        <li>
          <span> {{ $t("message.activit.name") }} </span>
          <div> <input type="text" v-model="name" /></div>
        </li>
        <li>
          <span> {{ $t("message.activit.IDnumber") }}</span>
          <div> <input type="text" v-model="identity" /></div>
        </li>
        <li class="state">
          <span>{{ $t("message.activit.62") }}</span>
        </li>
        <li class="enrollBtn">
          <el-button @click="getauth(name.text, identity.text)">
            {{ $t("message.activit.认证") }}
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import Sha256 from "crypto-js/sha256";
import { Base64 } from "js-base64";
import config from "../../config";
import { Toast } from "vant";
import axios from "axios";
import lang from "@/components/lang";
import QRCode from 'qrcodejs2';
// import WalletConnectProvider from "@walletconnect/web3-provider";
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
  data() {
    return {
      regForm: {
        nickname: '',
        name: '',
        identity: '',
      },
      ymAddr: "https://gazotc.com",
      showPop: false,
      USTDVal: "",
      GAZVal: "",
      numberHb: "",
      active: 0,
      userName: true,
      ruleHide: false,
      enroll: false,
      enauth: false,
      air: "",
      rec: "",
      user: "",
      nickname: "",
      name: "",
      identity: "",
      recom: "",
      duihuanjilu: [],
      fanyongjilu: [],
      queryAddr: "",
      recommender: "",
      gazone: "",
      gazlock: "",
      gazfree: "",
      recommend_er: "",
      str1: "",
    };
  },
  mounted() {
    var dq = this;
    let isGO = location.href.includes("?ref");
    if (isGO) {
      let str = location.href.substring(
        location.href.indexOf("?ref=") + 5,
        location.href.indexOf("&")
      );
      let lang = location.href.substring(
        location.href.indexOf("&lang=") + 6,
        location.href.indexOf("#")
      );
      this.$i18n.locale = lang.substring(0, 2);
      dq.recommender = str.substring(0, 42);
    }

    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      alert(this.$t("message.activit.tips"));
    } else {
      //初始化
      webinit();
    }
    Toast.setDefaultOptions("loading", {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true,
    });

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
      // console.log("web3", provider)
      // var provider = new WalletConnectProvider({
      //   rpc: {
      //     56: "https://bsc-dataseed1.binance.org"
      //   },
      // });
      // await provider.enable();
      web3 = new Web3(provider);
      console.log("walletcounnect", provider)
      if (web3 && provider) {
        address = provider.selectedAddress;
        dq.queryAddr = address;
        dotc = new web3.eth.Contract(dotc_abi, dotc_key);
        pri = new web3.eth.Contract(pri_abi, pri_key);
        usdt = new web3.eth.Contract(u_abi, u_key);
        dq.getsczc();
      }
    }
  },
  methods: {
    async bindQRCode() {
      await this.$nextTick(e => { })
      this.$refs.qrCodeDiv.innerHTML = ''
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.friendUrl,
        width: 100,
        height: 100,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })

    },
    showPopFn() {
      if (
        !this.str1 &&
        this.recommend_er == "0x0000000000000000000000000000000000000000"
      )
        return this.$toast("请先注册");
      this.showPop = true;
      this.bindQRCode()

    },
    async copyFn() {
      await this.$nextTick((e) => { });
      if (!this.friendUrl) return;
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", this.friendUrl);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$toast("URL copied successfully");
      }
      document.body.removeChild(input);
      this.showPop = false;
    },
    handleVal(v, i) {
      if (i == 1) {
        return (v / 100).toFixed(2);
      }
      if (i == 2) {
        return (v / 10 ** 18).toFixed(2);
      } else if (i == 3) {
        return this.$date(Number(v) * 1000);
      } else {
        return v;
      }
    },
    handleVal2(v, i) {
      if (i == 1) {
        return (v / 10 ** 18).toFixed(2);
      }
      if (i == 2) {
        return (v / 10 ** 18).toFixed(2);
      } else if (i == 3) {
        return this.$date(Number(v) * 1000);
      } else {
        return v;
      }
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
    async getsczc() {
      Toast.loading({ message: "查询中..." });
      var data = await dotc.methods.message(address, 0).call();
      this.str1 = data;
      let arr = data.split("|");
      this.nickname = Base64.decode(arr[0]);
      this.name = arr[1];
      this.identity = arr[2];
      this.recom = arr[3];

      Toast.clear();
      let index;
      for (let item in address) {
        index = item - 3;
      }
      this.user = address.substring(0, 5) + "***" + address.substring(index);
      this.air = await pri.methods.balanceAd(address).call();
      this.rec = await pri.methods.balanceRe(address).call();
      this.numberHb = await usdt.methods.balanceOf(address).call();
      this.gazone = await pri.methods.balanceOne(address).call();
      this.gazlock = await pri.methods.balanceOf(address).call();
      this.gazfree = await pri.methods.callfree(address).call();
      this.recommend_er = await pri.methods.recommend(address).call();
      this.getlist();
    },
    async getlist() {
      //查询兑换记录
      this.duihuanjilu = await pri.methods.ownerExch(address).call();
      let bbbval = await pri.methods.returncom(address).call();
      let obj = Object.assign({}, JSON.parse(JSON.stringify(bbbval)));
      obj[0].forEach((v, i) => {
        obj[1].forEach((v2, i2) => {
          if (i === i2) v.push(v2);
        });
      });
      this.fanyongjilu = obj[0];
    },

    hideFull() {
      this.ruleHide = this.ruleHide ? false : true;
    },
    ruleHideFull() {
      this.enroll = this.enroll ? false : true;
    },
    ruleHideAuth() {
      Toast.success(this.$t("message.activit.还未开放"));
      //this.enauth = this.enauth ? false : true;
    },
    async register() {
      // if(this.regForm.identity)
      // this.regForm.Web3
      // let arr = Object.values(this.regForm)
      //
      // if (arr.some(v => v == '')) return Toast.success(this.$t("message.activit.参数不完整"));
      //
      //
      // let res = await axios({
      //   method: "post",
      //   url: "https://gazotc:8083/member/register",
      //   data: {
      //     idNo: this.regForm.identity, name: this.regForm.name, nickname: this.regForm.nickname, address: address,
      //     parentAddress: this.queryAddr || 0
      //   },
      // })
      // if (res.code != 0) return false
      Toast.loading({ message: "注册中..." });
      let nickname = Base64.encode(this.regForm.nickname);
      let name = Sha256(this.regForm.name).toString().substring(0, 10);
      let identity = Sha256(this.regForm.identity).toString().substring(0, 15);
      let data = `${nickname}|${name}|${identity}|${this.recommender}`;
      dotc.methods.commun(0, data).send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            zcchaxun();
          } else {
            Toast.clear();
            Toast.fail("注册失败");
          }
        }
      );

      //轮询注册是否成功
      function zcchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("注册成功");
        }, 3000);
      }

    },
    async exchange() {
      if (this.USTDVal < 100) return Toast.success("低于最低要求额度");
      if (this.USTDVal > this.numberHb / 10 ** 18)
        return Toast.success("usdt大于可用余额");
      var recommer = this.recommend_er != "0x0000000000000000000000000000000000000000"
        ? this.recommend_er
        : this.recom
          ? this.recom
          : this.recommender
            ? this.recommender
            : "0x0000000000000000000000000000000000000000";
      var number = this.getFNum(this.USTDVal * 10 ** 18);
      var allo = await usdt.methods.allowance(address, pri_key).call();
      var appve = this.getFNum(Number(number) * 100);
      var usdtlxtime = "";
      if (Number(number) > Number(allo)) set_shouquan();
      else sale();
      //授权
      function set_shouquan() {
        Toast.loading({
          message: "usdt授权中....",
        });
        usdt.methods.approve(pri_key, appve).send(
          {
            from: address,
          },
          (err, ret) => {
            if (ret) {
              lunxun(2);
            } else {
              Toast.clear();
              Toast.fail("授权失败");
            }
          }
        );
      }

      //轮询
      function lunxun(c) {
        usdt.methods.allowance(address, pri_key).call((err, ret) => {
          if (ret) {
            if (Number(ret) >= Number(number)) {
              Toast.clear();
              clearTimeout(usdtlxtime);
              sale();
            } else {
              usdtlxtime = setTimeout(() => {
                lunxun(c);
              }, 3000);
            }
          }
        });
      }

      function sale() {
        Toast.loading({ message: "兑换中..." });
        pri.methods.publicsale(recommer, number).send(
          {
            from: address,
          },
          (err, ret) => {
            if (ret) {
              getchaxun();
            } else {
              Toast.clear();
              Toast.fail("兑换失败");
            }
          }
        );
      }

      //轮询兑换是否成功
      function getchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("兑换成功");
        }, 3000);
      }
    },
    getauth() {
      let idNo = this.identity;
      let name = this.name;

      axios({
        method: "post",
        url: "https://gazotc:8083/member/face",
        data: { idNo: idNo, name: name },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
      })
        .then((res) => {
          window.location.href = res;

        })
        .catch(function (error) {
          alert("error");

        });
    },
    getpoints() {
      if (!this.str1)
        return Toast.success(this.$t("message.activit.unregistered"));
      if (this.air != 0) return Toast.success(this.$t("message.activit.已领取"));
      Toast.loading({ message: this.$t("message.activit.领取中") });
      var recommer = this.recommend_er != "0x0000000000000000000000000000000000000000"
        ? this.recommend_er
        : this.recom
          ? this.recom
          : this.recommender
            ? this.recommender
            : "0x0000000000000000000000000000000000000000";
      pri.methods.receiveair(recommer, 0).send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            getchaxun();
          } else {
            Toast.clear();
            Toast.fail("领取失败");
          }
        }
      );

      //轮询是否成功
      function getchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("领取成功");
        }, 3000);
      }
    },
    async getone() {
      var start = await pri.methods.onetime().call();
      if (start == 0) {
        Toast.success(this.$t("message.activit.还未开放"));
        return;
      }
      Toast.loading({ message: "提取中..." });
      var number = this.getFNum(this.gazone);

      pri.methods.withdrawOne(number).send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            getchaxun();
          } else {
            Toast.clear();
            Toast.fail("提取失败");
          }
        }
      );

      //轮询是否成功
      function getchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("提取成功");
        }, 3000);
      }
    },
    async getfree() {
      var start = await pri.methods.ltim().call();
      if (start == 0) {
        Toast.success(this.$t("message.activit.还未开放"));
        return;
      }
      Toast.loading({ message: "提取中..." });
      var number = this.getFNum(this.gazfree);
      pri.methods.withdraw(number).send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            getchaxun();
          } else {
            Toast.clear();
            Toast.fail("提取失败");
          }
        }
      );

      //轮询是否成功
      function getchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("提取成功");
        }, 3000);
      }
    },
  },
  watch: {
    USTDVal(newval) {
      this.GAZVal = Number(newval) / 0.5;
    },
    GAZVal(newval) {
      this.USTDVal = Number(newval) * 0.5;
    },
  },
  computed: {
    friendUrl() {
      return (
        this.ymAddr +
        "?ref=" +
        this.queryAddr +
        "&lang=" +
        this.$i18n.locale +
        "#/Activities"
      );
    },
  },
  components: {
    lang,
  },
};
</script>
