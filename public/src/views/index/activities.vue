
<template>
  <div class="activities">
    <div class="vhtml_head_left">
      <div class="vhtml_head">
        <van-icon @click="$router.push('/HomePage')" style="margin-top: 2px" name="arrow-left" />
        <div class="vhtml_head_left_logo">
          <p>
            <img src="@/assets/img/title.png" alt="GAZOTC" width="48" height="45" />
          </p>
        </div>
        <lang class="lang"></lang>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo">
      <div class="left">
        <img src="~@/assets/img/avt.png" alt="" />
        <div class="info">
          <div class="nick">
            {{ $t("message.activit.nickname") }}:{{
              nickname ? nickname : this.$t("message.activit.unregistered")
            }}
          </div>
          <div class="name fontS">
            {{ $t("message.activit.name") }}:{{
              name ? name : this.$t("message.activit.unregistered")
            }}
          </div>
          <div class="idc fontS">
            {{ $t("message.activit.IDnumber") }}:{{
              identity ? identity : this.$t("message.activit.unregistered")
            }}
          </div>
        </div>
      </div>
      <div class="right">
        <span @click="showPopFn" class="btn">{{
          $t("message.activit.title")
        }}</span>
        <div class="addr fontS">
          {{ $t("message.activit.addr") }}:{{ user }}
        </div>
      </div>
      <van-popup class="urlContent" v-model="showPop" round :style="{ height: '75%', width: '80%' }">
        <div class="cont">
          <div class="disc">{{ $t("message.activit.share") }}</div>
          <div class="url">URL:{{ friendUrl }}</div>

          <div id="qrCode" ref="qrCodeDiv"></div>
          <div class="copy">
            <span @click="copyFn">
              {{ $t("message.activit.copyURL") }}
            </span>
          </div>
        </div>
        <div class="close" @click="showPop = false">
          <img src="~@/assets/img/close.png" alt="" />
        </div>
      </van-popup>
      <van-popup class="urlContent2" v-model="showPop2" round :style="{ height: '80%', width: '73%' }">
        <div class="title">{{ $t("message.activit.Airdroprules") }}</div>
        <div class="cont">
          <div class="item">
            {{ $t("message.activit.51") }}
          </div>
          <div class="item">
            {{ $t("message.activit.52") }}
          </div>
          <div class="item">
            {{ $t("message.activit.53") }}
          </div>
          <div class="item">
            {{ $t("message.activit.54") }}
          </div>
          <div class="item">
            {{ $t("message.activit.55") }}
          </div>
          <div class="item">
            {{ $t("message.activit.56") }}
          </div>
          <div class="item">
            {{ $t("message.activit.57") }}
          </div>
          <div class="item">
            {{ $t("message.activit.58") }}
          </div>
        </div>
        <div class="close" @click="showPop2 = false">
          <img src="~@/assets/img/close.png" alt="" />
        </div>
      </van-popup>
    </div>
    <!-- 注册 -->
    <div class="reg">
      <div class="item" :id="dongtaiId(i)" @click="clickFn(v, i)" v-for="(v, i) in regList">
        <img :src="v.img" alt="" />
        <div>{{ v.text }}</div>
        <img v-if="i != 3" class="jt" src="~@/assets/img/jt.png" alt="" />
      </div>
      <van-popup class="urlContent3" v-model="showPop3" round :style="{ height: '53%', width: '80%' }">
        <van-nav-bar :title="$t(`message.activit.register`)" fixed left-arrow @click-left="onClickLeft" />
        <div class="cont">
          <van-field v-model="regForm.nickname" :label="'*' + $t('message.activit.nickname')" :placeholder="$t('message.activit.enterNick')" />
          <van-field v-model="regForm.name" :label="'**' + $t('message.activit.name')" :placeholder="$t('message.activit.enterName')" />
          <van-field v-model="regForm.identity" :label="'**' + $t('message.activit.IDnumber')" :placeholder="$t('message.activit.enterIdCard')" />
          <div class="tips">{{ $t("message.activit.61") }}</div>
          <div @click="register" class="btn">
            {{ $t("message.activit.register") }}
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 空头 -->
    <div class="Airdrop">
      <div class="top">
        <div class="left">
          <span class="t">{{ $t("message.activit.First") }}</span>
          <span>{{ $t("message.activit.reg") }}</span>
          <span class="guanzhu" @click="goTW">{{ $t("message.activit.followWeb")
            }}<img src="~@/assets/img/t.png" alt="" />{{
              $t("message.activit.save5")
            }}</span>
        </div>
        <div class="right" @click="showPop2 = true">
          {{ $t("message.activit.Airdroprules")
          }}<img src="~@/assets/img/gz.png" alt="" />
        </div>
      </div>
      <div class="bot">
        <div class="left">
          <span class="t"> {{ $t("message.activit.AirdropReward") }} </span>
          <div class="item">
            <span>{{ $t("message.activit.BeIssued") }} <i>{{ air }}</i></span>
            <span>{{ $t("message.activit.Issued") }} <i>{{ 0 }}</i></span>
          </div>
        </div>
        <div class="right">
          <span class="t">{{ $t("message.activit.ShareRewards") }}</span>
          <div class="item">
            <span>{{ $t("message.activit.BeIssued") }} <i>{{ rec }}</i></span>
            <span>{{ $t("message.activit.Issued") }} <i>{{ 0 }}</i></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 预售 -->
    <div class="yushou">
      <div class="ysTop">
        <div class="title">{{ $t("message.activit.partSale") }}</div>
        <div class="info">{{ $t("message.activit.630") }}</div>
        <van-field label-width="50" v-model="USTDVal" label="USDT：" :placeholder="$t('message.activit.enterQuant')" />
        <div class="tt">
          <span> 1GAZ = 0.5USDT</span>
          {{ $t("message.activit.UseUSDT") }}:{{
            Number(numberHb / 10 ** 18).toFixed(2)
          }}
        </div>
        <van-field label-width="50" v-model="GAZVal" label="Gaz：" :placeholder="$t('message.activit.enterQuant')" />
        <div @click="exchange" class="btn">
          {{ $t("message.activit.exchange") }}
        </div>
      </div>
      <div class="ysBot">
        <div class="title">{{ $t("message.activit.publicDes") }}</div>
        <div class="cont">
          <div class="contItem">
            {{ $t("message.activit.1") }}
          </div>
          <div class="contItem">
            {{ $t("message.activit.2") }}
          </div>
          <div class="contItem">
            {{ $t("message.activit.3") }}
          </div>
          <div class="contItem">
            {{ $t("message.activit.4") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 记录 -->
    <div class="record">
      <van-tabs v-model="active">
        <van-tab :title="$t('message.activit.exchangeRecord')">
          <div class="item2" v-for="v in duihuanjilu">
            <span>{{ $t("message.activit.SerialNumbe") }}:<i>{{ v[0] }}</i></span>
            <span>{{ $t("message.activit.usdt") }}:<i>{{
                (v[1] / 100).toFixed(2)
              }}</i></span>
            <span>{{ $t("message.activit.gaz") }}:<i>{{
                (v[2] / 10 ** 18).toFixed(2)
              }}</i></span>
            <span>{{ $t("message.activit.date") }}:<i>{{
                $date(Number(v[3]) * 1000)
              }}</i></span>
          </div>
        </van-tab>
        <van-tab :title="$t('message.activit.CommissionRecord')">
          <div class="item2" v-for="v in fanyongjilu">
            <span>{{ $t("message.activit.SerialNumbe") }}:<i>{{ v[0] }}</i></span>
            <span>usdt:<i>{{ (v[1] / 10 ** 18).toFixed(2) }}</i></span>
            <span>gaz:<i>{{ (v[2] / 10 ** 18).toFixed(2) }}</i></span>
            <span>{{ $t("message.activit.date") }}:<i>{{
                $date(Number(v[3]) * 1000)
              }}</i></span>
            <span class="tjdz">{{ $t("message.activit.RecommendedAddress") }}:<i>{{ v[4] }}</i></span>
          </div>
        </van-tab>
        <van-tab :title="$t('message.activit.LockQuantity')">
          <div class="item">
            <div>
              {{ $t("message.activit.PrimaryRelease") }}:{{
                Number(gazone / 10 ** 18).toFixed(2)
              }}
              gaz
            </div>
            <span class="btn" @click="getone">
              {{ $t("message.activit.extract") }}</span>
          </div>
          <div class="item">
            <div>
              <div class="line">
                {{ $t("message.activit.LinearRelease") }}:{{
                  Number(gazlock / 10 ** 18).toFixed(2)
                }}
                gaz
              </div>
              <div class="line">
                {{ $t("message.activit.ExtractableQuantity") }}:{{
                  Number(gazfree / 10 ** 18).toFixed(2)
                }}
                gaz
              </div>
            </div>
            <span class="btn" @click="getfree">
              {{ $t("message.activit.extract") }}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>

import api from '@/api/api'
import Web3 from "web3";
import Web3Modal from "web3modal";
import Sha256 from "crypto-js/sha256";
import { Base64 } from "js-base64";
import config from "../../config";
import { Toast } from "vant";
import axios from "axios";
import lang from "@/components/lang";
import QRCode from "qrcodejs2";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
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
      showPop3: false,
      showPop2: false,
      value33: "",
      active: 2,
      regForm: {
        nickname: "",
        name: "",
        identity: "",
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
	  transactionStatus: '' // 实名认证 返回状态
    };
  },
  mounted() {
	  // 判断  url 是否携带 实名认证返回参数
	  // this.ruleChangeHideAuth()
	  this.transactionStatus = this.$route.query.transactionStatus
	  if(this.transactionStatus && this.transactionStatus == "SUCCESS"){  //实名认证成功
		  let result = {
			  "customerInternalReference": this.$route.query.customerInternalReference,
			  "errorCode": this.$route.query.errorCode,
			  "transactionReference": this.$route.query.transactionReference,
			  "transactionStatus": this.$route.query.transactionStatus
			}
		  api.RealNameAfter(result).then((res)=>{
			  console.log(res);
		  })
	  }
	  // else if(this.transactionStatus && this.transactionStatus == "ERROR"){  // 实名认证失败
		 //  this.$confirm('实名认证失败', '', {
			//   confirmButtonText: '确定',
			//   cancelButtonText: '取消',
			//   type: 'warning',
			//   callback: action => {
			// 	if (action === 'confirm') {
			// 	  console.log('按下 确定')
			// 	}
			// 	else {
			// 	  console.log('按下 取消')
			// 	}
			//   }
			// })
	  // }


    // let startIdentityVerification = () => {
    //   console.log(78979);
    // }

    // const startButton = document.querySelector('#create-verification-session');

    // startButton.addEventListener('click', startIdentityVerification);



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
      webinit(false);
    } else {
      //初始化
      webinit(true);
    }
    Toast.setDefaultOptions("loading", {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true,
    });

    async function webinit(use_metamask) {
      const web3Modal = new Web3Modal({
        network: use_metamask ? "mainnet" : null,
        cacheProvider: false,
        providerOptions: use_metamask
          ? {}
          : {
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                rpc: {
                  56: "https://bsc-dataseed.binance.org/",
                },
                network: "binance",
                qrcodeModal: QRCodeModal,
              },
            },
          },
      });
      var provider = await web3Modal.connect();
      web3 = new Web3(provider);
      console.log("walletcounnect", provider);
      if (web3 && provider) {
        address = provider.selectedAddress;
        if (!address) {
          address = provider.accounts[0];
        }
        dq.queryAddr = address;
        dotc = new web3.eth.Contract(dotc_abi, dotc_key);
        pri = new web3.eth.Contract(pri_abi, pri_key);
        usdt = new web3.eth.Contract(u_abi, u_key);
        dq.getsczc();
		dq.ruleChangeHideAuth()
      }
    }
  },
  methods: {
    dongtaiId(i) {
      return i == 2 && 'create-verification-session'
    },
    goTW() {
      window.open("https://twitter.com/gazellefi", "_blank");
    },
    onClickLeft() {
      this.showPop3 = false;
    },
    clickFn(v, i) {
      console.log("i: ", i);
      if (i == 0) {
        // this.getpoints()
        this.showPop3 = true;
      }
      if (i == 1) {
        this.getpoints();
      }
      if (i == 2) {
        this.ruleHideAuth();
      }
      if (i == 3) {
        this.$router.push("/yjzhuce");
      }
    },
    async bindQRCode() {
      await this.$nextTick((e) => { });
      this.$refs.qrCodeDiv.innerHTML = "";
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.friendUrl,
        width: 100,
        height: 100,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
    showPopFn() {
      if (
        !this.str1 &&
        this.recommend_er == "0x0000000000000000000000000000000000000000"
      )
        return this.$toast("请先注册");
      this.showPop = true;
      this.bindQRCode();
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
        this.$toast("URL复制成功");
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
	ruleChangeHideAuth() {
		var that = this
		axios.post('https://gazotc.com:8083/member/jnmioURL?address='+address).then((res)=>{
			if(res.result.state== 'SUCCESS'){ // 已实名认证
				this.regList[2].text='已认证'
			}else{
			}
		})
	},
    ruleHideAuth() {
		var that = this
		Toast.loading({ message: "数据请求中..." });
		axios.post('https://gazotc.com:8083/member/jnmioURL?address='+address).then((res)=>{
			// that.msss = res
			let url = res.result.redirectUrl
			// console.log(code);
			Toast.clear()
			if(res.result.state== 'SUCCESS'){ // 已实名认证
				that.$confirm('您已实名认证', '', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'success',
				  callback: action => {
					if (action === 'confirm') {
					  console.log('按下 确定')
					}
					else {
					  console.log('按下 取消')
					}
				  }
				})
			}else if(res.result.redirectUrl){ //未实名认证
				window.location.href = url
				
				// this.$router.push({
				// 	name: 'RealName',
				// 	query: {
				// 	  url: url
				// 	}
				// })
			}
		})
    },
    async register() {
		var that = this
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
		  let data = {
			  idNo: that.regForm.identity, 
			  name: that.regForm.name, 
			  nickname: that.regForm.nickname, 
			  address: address,
			  parentAddress: that.recommender || 0
		  }
		  // 存数据库
		  api.register(data).then((res)=>{
			  console.log('注册数据存储结果：'+res);
			  console.log(res.code);
			  if(res.code == 0){
				  // 注册成功后 调用实名认证
				  that.ruleHideAuth()
			  }else{
				  that.$confirm( res.result, '', {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'success',
				    callback: action => {
				  	if (action === 'confirm') {
				  	  console.log('按下 确定')
				  	}
				  	else {
				  	  console.log('按下 取消')
				  	}
				    }
				  })
			  }
		  })
		  
        }, 3000);
      }
    },
    async exchange() {
      if (this.USTDVal < 1) return Toast.success("低于最低要求额度");
      if (this.USTDVal > this.numberHb / 10 ** 18)
        return Toast.success("usdt大于可用余额");
      var recommer =
        this.recommend_er != "0x0000000000000000000000000000000000000000"
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
      if (this.air != 0)
        return Toast.success(this.$t("message.activit.Received"));
      Toast.loading({ message: this.$t("message.activit.Receiving") });
      var recommer =
        this.recommend_er != "0x0000000000000000000000000000000000000000"
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
        Toast.success(this.$t("message.activit.notOpen"));
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
        Toast.success(this.$t("message.activit.notOpen"));
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
    regList() {
      return [
        {
          img: require("@/assets/img/1.png"),
          text: this.$t("message.activit.QuickReg"),
        },
        {
          img: require("@/assets/img/2.png"),
          text: this.$t("message.activit.GetPoints"),
        },
        {
          img: require("@/assets/img/3.png"),
          text: this.$t("message.activit.authName"),
        },
        {
          img: require("@/assets/img/4.png"),
          text: this.$t("message.activit.AirDis"),
        },
      ];
    },
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
<style lang="less" scoped>
.activities {
  height: 100%;
  .vhtml_head {
    display: flex;
    align-items: center;
    .lang {
      position: absolute;
      right: 10px;
      top: 20px;
      z-index: 1001;
      color: #fff;
    }
  }
  .userInfo {
    background: #202634;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 15px 10px;
    color: #ffffff;
    .left {
      display: flex;
      img {
        width: 42px;
        height: 42px;
        margin-right: 10px;
      }
      .info {
        .nick {
          font-weight: bold;
          margin-bottom: 15px;
          margin-top: 10px;
        }
        .name {
          margin: 8px 0;
        }
      }
    }
    .fontS {
      color: #bcbec2;
      font-size: 12px;
    }
    .right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .btn {
        display: inline-block;
        border: 1px solid #fff;
        padding: 4px 8px;
        font-size: 12px;
        align-self: flex-end;
        border-radius: 10px;
      }
    }
  }
  .reg {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #333333;
    .item {
      // flex: 1;
      text-align: center;
      position: relative;
      max-width: 60px;
      img {
        width: 42px;
        margin-bottom: 12px;
      }
      .jt {
        position: absolute;
        right: -50px;
        top: 15px;
      }
    }
  }
  .Airdrop {
    padding: 0 20px;
    padding-bottom: 8px;
    color: #fff;
    > .top {
      min-height: 80px;
      background: url('~@/assets/img/11.png') no-repeat;
      background-size: 100% 100%;
      padding: 10px 15px;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      position: relative;
      > .left {
        display: flex;
        flex-direction: column;
        span {
          margin-bottom: 7px;
          font-size: 16px;
          &:last-child {
            margin: 0;
          }
        }
        .t {
          font-size: 16px;
          font-weight: bold;
        }
        img {
          width: 15px;
          vertical-align: middle;
        }
      }
      > .right {
        align-self: flex-start;
        white-space: nowrap;
        img {
          width: 15px;
          vertical-align: sub;
          margin-left: 3px;
        }
      }
    }
    > .bot {
      display: flex;
      justify-content: space-between;
      margin-top: 3px;
      > .left {
        background: url('~@/assets/img/13.png') no-repeat;
        background-size: 100% 100%;
        padding: 15px;
        flex: 1;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          span {
            line-height: 22px;
          }
          i {
            font-size: 16px;
            margin-right: 3px;
          }
        }
      }
      > .right {
        background: url('~@/assets/img/12.png') no-repeat;
        background-size: 100% 100%;
        padding: 15px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          span {
            line-height: 22px;
          }
          i {
            font-size: 16px;
            margin-right: 3px;
          }
        }
      }
    }
  }
  .yushou {
    background: url('~@/assets/img/bg@2x.png') no-repeat;
    background-size: cover;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .ysTop {
      background: #fff;
      flex: 3;
      margin-bottom: 20px;
      border-radius: 10px;
      text-align: center;
      padding: 20px;

      .title {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .tt {
        font-size: 12px;
        color: #ccc;
        text-align: left;
        margin-left: 80px;
        display: flex;
        flex-direction: column;
        span {
          margin-right: 20px;
          line-height: 22px;
        }
      }
      .btn {
        line-height: 40px;
        color: #fff;
        background: url('~@/assets/img/btn.png') no-repeat;
        background-size: cover;
      }
      /deep/.van-field__value {
        border: 1px solid #ccc;
        padding-left: 5px;
      }
    }
    .ysBot {
      background: #fff;
      flex: 5;
      border-radius: 10px;
      padding: 20px;
      .title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 10px;
        text-align: center;
      }
      .cont {
        .contItem {
          line-height: 26px;
          margin-bottom: 15px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .record {
    padding: 10px;
    min-height: 100px;
    .item2 {
      padding: 20px 0;
      border-top: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      span {
        line-height: 26px;
        word-break: break-all;
        color: #aaa;
        i {
          margin-left: 10px;
          color: #333;
        }
      }
    }
    .item {
      padding: 20px 0;
      border-top: 1px solid #ccc;
      display: flex;
      color: #aaa;
      justify-content: space-between;
      align-items: center;
      .line {
        line-height: 22px;
      }
      .btn {
        background: url('~@/assets/img/btn2.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        color: #fff;
        border-radius: 15px;
      }
    }
    .tjdz {
      font-size: 12px;
    }
  }
}
.urlContent {
  top: 45%;
  // padding: 20px;
  background: transparent;
  // background: url('~@/assets/img/bg3.png') no-repeat;
  // background-color: #fff;
  // background-size: 100%;
  // background-position-y: -30px;
  // padding-top: 180px;
  color: #000 !important;
  .cont {
    background: url('~@/assets/img/bg3.png') no-repeat;
    background-position-y: -30px;
    background-size: 100%;
    padding-top: 180px;
    #qrCode,
    .copy {
      background-color: #fff;
      padding: 10px 0;
      text-align: center;
      border-radius: 0 0 10px 10px;
      transform: translateY(-1px);
      span {
        display: inline-block;
        background: url('~@/assets/img/btn2.png') no-repeat;
        background-size: 100% 100%;
        // line-height: 38px;
        color: #fff;
        padding: 10px 10px;
        border-radius: 15px;
      }
    }
    #qrCode {
      border-radius: 0;
      transform: translateY(0px);
    }
  }
  .url {
    word-break: break-all;
    line-height: 24px;
    padding: 0 20px;
  }
  .copy {
    // width: 50%;
    //
    // text-align: center;
    // margin: 0 auto;
    //

    // margin-top: 20px;
  }
  .disc {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
  }
  /deep/ #qrCode {
    text-align: center;
    img {
      display: inline-block;
      margin: 10px auto;
      margin-bottom: 0;
    }
  }
  .close {
    position: absolute;
    z-index: 99999;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    img {
      width: 50px;
    }
  }
}

.urlContent2 {
  top: 50%;
  padding: 20px;
  background: url('~@/assets/img/bg4.png') no-repeat;
  background-size: 100%;
  color: #000;

  .title {
    color: #ffff !important;
    text-align: center;
    font-size: 34px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  .cont {
    margin-top: 10px;
    height: 422px;
    overflow: auto;
    .item {
      line-height: 22px;
      margin-bottom: 5px;
    }
  }

  .close {
    position: absolute;
    z-index: 99999;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    img {
      width: 50px;
    }
  }
}
.urlContent3 {
  padding: 20px;

  padding-top: 80px;
  .cont {
    .tips {
      margin-top: 30px;
      font-size: 12px;
      line-height: 24px;
      color: #666666;
    }
    .btn {
      width: 80%;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      color: #fff;
      margin-top: 30px;
      background: url('~@/assets/img/btn.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
/deep/.van-nav-bar {
  background: #202634;
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .van-tabs__content {
    max-height: 400px;
    overflow: auto;
  }
}
/deep/.van-cell {
  &::after {
    border-bottom: 0;
  }
}
.guanzhu {
  display: inline-block;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
}
</style>
