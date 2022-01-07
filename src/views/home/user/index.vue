<template>
  <div>
    <el-row type="flex" justify="center" class="in_nav">
      <el-col :sm="24" :md="18" class="user">
        <div class="head">{{ $t("message.personalInformation") }}</div>
        <div class="one item">
          <div class="top">
            <span class="fwb fz16">{{
              $t("message.essentialInformation")
            }}</span>
          </div>
          <div class="cont">
            <div class="list">
              <li>
                <span class="label_nav"
                  >{{ $t("message.arbitration.AccountNum") }}:</span
                >
                <span class="cba">{{ user ? user : addressRm }}</span>
              </li>
              <li>
                <span class="label_nav">
                  {{ $t("message.activit.nickname") }}:
                </span>
                <span>
                  {{ nickname ? nickname : $t("message.activit.unregistered") }}
                </span>
              </li>
              <li>
                <span class="label_nav">
                  {{ $t("message.activit.name") }}:
                </span>
                <span>{{
                  name ? name : $t("message.activit.unregistered")
                }}</span>
              </li>
              <li>
                <span class="label_nav">
                  {{ $t("message.activit.IDnumber") }}:
                </span>
                <span>{{
                  identity ? identity : $t("message.activit.unregistered")
                }}</span>
              </li>
            </div>
          </div>
          <div class="" style="display: flex; justify-content: space-around">
            <div
              class="btn"
              style="margin-top: 10px"
              @click="dialogVisible = true"
            >
              <span>{{ $t("message.modify") }}</span>
            </div>
            <div class="btn" style="margin-top: 10px" @click="ruleHideAuth">
              <span>{{ $t("message.activit.authIdcard") }}</span>
            </div>
          <!--  <div
              class="btn"
              style="margin-top: 10px"
              @click="ruleHideAuth"
              v-if="false"
            >
              <span>{{ $t("message.activit.IDnumber") }}</span>
            </div> -->
          </div>
        </div>
        <!-- 仲裁员昵称 -->
        <div class="one item">
          <div class="top">
            <!-- <span class="fwb fz16">{{$t('message.arbitration.arbitratorNick')}}</span> -->
          </div>
          <div class="cont">
            <div class="list">
              <li>
                <span class="label_nav"
                  >{{ $t("message.arbitration.arbitratorNick") }}:</span
                >
                <span>{{
                  beizhu_arr.zc_beizhu
                    ? beizhu_arr.zc_beizhu
                    : $t("message.arbitration.NoNickname")
                }}</span>
              </li>
            </div>
          </div>
          <div
            class="btn"
            style="margin-top: 10px"
            @click="dialogVisibleOne = true"
          >
            <span>{{ $t("message.modify") }}</span>
          </div>
        </div>
        <!-- 节点 -->
        <div class="one item">
          <div class="top">
            <!-- <span class="fwb fz16">节点</span> -->
          </div>
          <div class="cont">
            <div class="list">
              <li>
                <span class="label_nav">{{ $t("message.node") }}</span>
                <span>{{
                  beizhu_arr.team_beizhu ? beizhu_arr.team_beizhu : "暂无节点"
                }}</span>
              </li>
            </div>
          </div>
          <div
            class="btn"
            style="margin-top: 10px"
            @click="dialogVisibleTwo = true"
          >
            <span>{{ $t("message.modify") }}</span>
          </div>
        </div>

        <div class="two item">
          <div class="top">
            <span class="fwb fz16">{{ $t("message.remarks") }}</span>
          </div>
          <div style="padding-left: 30px">
            <div class="cont">
              <van-field
                v-if="isshowNoteEdit"
                :autosize="{ maxHeight: 200, minHeight: 100 }"
                type="textarea"
                v-model="beizhu_arr.beizhu"
                :placeholder="$t('message.enterContent')"
                class="input_fied"
              >
                <template #button>
                  <span
                    class="fz12 cba cursor marr-10"
                    @click="isshowNoteEdit = false"
                    >{{ $t("message.return") }}</span
                  >
                  <span class="fz12 cba cursor" @click="setNote">{{
                    $t("message.complete")
                  }}</span>
                </template>
              </van-field>
              <span
                v-else
                style="padding: 20px 0; display: inline-block; font-size: 16px"
              >
                {{
                  beizhu_arr.beizhu ? beizhu_arr.beizhu : $t("message.notFill")
                }}
              </span>
            </div>
            <div
              @click="isshowNoteEdit = true"
              v-if="!isshowNoteEdit"
              class="fz12 cba mart-10 cursor"
            >
              <span>{{ $t("message.editremarks") }}</span>
            </div>
          </div>
        </div>
        <div class="thr item">
          <div class="top">
            <span class="fwb fz16">{{ $t("message.publicKey") }}</span>
          </div>
          <div style="padding-left: 30px">
            <div class="cont">
              <p style="padding: 20px 0">{{ $t("message.keyp") }}</p>
              <div
                style="
                  padding-bottom: 20px;
                  max-width: 100%;
                  text-align: justify;
                  text-justify: newspaper;
                  word-wrap: break-word;
                "
              >
                <span>{{ form.publickeyCopy }}</span>
              </div>
              <el-form
                ref="form"
                :model="form"
                label-width="80px"
                class="form_nav"
              >
                <el-form-item :label="$t('message.setPas')">
                  <div style="border: 1px solid #dcdcdc">
                    <van-field
                      v-model="form.password"
                      type="password"
                      :placeholder="$t('message.enterPas')"
                    />
                  </div>
                </el-form-item>
                <el-form-item
                  :label="$t('message.ConfirmPassword')"
                  class="aaa"
                >
                  <div style="border: 1px solid #dcdcdc">
                    <van-field
                      v-model="form.passwordAggin"
                      type="password"
                      :placeholder="$t('message.enterPasAggin')"
                    />
                  </div>
                </el-form-item>
                <el-form-item>
                  <span class="c6 fz12">{{ $t("message.pasTips") }}</span>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn" @click="apply_password">
              <span>{{ $t("message.set") }}</span>
            </div>
			<!-- 加密 -->
			<div style="border: 1px solid #dcdcdc;padding: 10px;">
				<div class="">
					<el-radio-group v-model="radio" @change="changeRadio" style="width: 100%;">
						<el-row>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="1">公钥</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="2">地址</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="3">发布订单号</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="4">交易订单号</el-radio>
							</el-col>
						</el-row>
					</el-radio-group>
				</div>
				<div class="" style="border: 1px solid #dcdcdc;margin-top: 20px;">
					<van-field v-model="inputs.orderId" :placeholder="$t('message.enterOrderId')" v-if="radio == 3 || radio == 4"/>
					<van-field v-model="inputs.address" :placeholder="$t('message.enterAdress')" v-if="radio == 2"/>
					<van-field v-model="inputs.publicKey" :placeholder="$t('message.enterPublicKey')" v-if="radio == 1"/>
				</div>
				<el-form ref="form" :model="form" class="form_nav">
				  <el-form-item>
				    <div style="border: 1px solid #dcdcdc">
				      <van-field
				        v-model="form.msg_encrypt"
				        :placeholder="$t('message.setEncrypt')"
				      />
				    </div>
				  </el-form-item>
				</el-form>
				<div class="" v-if="ciphertext != ''">
					<span>{{$t('message.ciphertext')}}</span>
					<div style="width: 100%;word-wrap: break-word;font-size: 11px;color: #666;margin-top: 10px;">
						<span >{{ciphertext}}</span>
						<el-link type="primary" class="marl-10" @click="copy(0)">{{$t('message.copy')}}</el-link>
					</div>
					
				</div>
			</div>
            <div class="btn">
              <span @click="encrypt_message">{{ $t("message.encryption") }}</span>
            </div>
			<!-- 解密 -->
			<div style="border: 1px solid #dcdcdc;padding: 10px;">
				<!-- <div class="">
					<el-radio-group v-model="radio1" @change="changeRadio1" style="width: 100%;">
						<el-row>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="1">公钥</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="2">地址</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="3">发布订单号</el-radio>
							</el-col>
							<el-col :sm="24" :md="6" style="margin-top: 10px;">
								<el-radio :label="4">交易订单号</el-radio>
							</el-col>
						</el-row>
					</el-radio-group>
				</div> -->
				<div class="" style="border: 1px solid #dcdcdc;margin-top: 20px;">
					<!-- <van-field v-model="inputs1.orderId" :placeholder="$t('message.enterOrderId')" v-if="radio1 == 3 || radio1 == 4"/>
					<van-field v-model="inputs1.address" :placeholder="$t('message.enterAdress')" v-if="radio1 == 2"/>
					<van-field v-model="inputs1.publicKey" :placeholder="$t('message.enterPublicKey')" v-if="radio1 == 1"/> -->
					<van-field v-model="inputs1.password" :placeholder="$t('message.enterPrivateTips')"/>
				</div>
				<el-form ref="form" :model="form" class="form_nav">
				  <el-form-item>
				    <div style="border: 1px solid #dcdcdc">
				      <van-field
				        v-model="form.msg_decrypt"
				        :placeholder="$t('message.encrypt')"
				      />
				    </div>
				  </el-form-item>
				</el-form>
				<div class="" v-if="Plaintext != ''">
					<span>{{$t('message.Plaintext')}}</span>
					<div style="width: 100%;word-wrap: break-word;font-size: 11px;color: #666;margin-top: 10px;">
						<span >{{Plaintext}}</span>
						<el-link type="primary" class="marl-10" @click="copy(1)">{{$t('message.copy')}}</el-link>
					</div>
					
				</div>
			</div>
            
            <div class="btn">
              <span @click="decrypt_message">{{ $t("message.decrypt") }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <myDialog
      :width="isphone ? '90%' : '40%'"
      :title="$t('message.editInfomation')"
      :closeModal="false"
      :closePress="false"
      :visible.sync="dialogVisible"
      @confirm="xiugaiajax(2)"
      @cancel="xiugaiajax(1)"
    >
      <el-form label-width="110px" v-model="regForm" style="padding: 20px">
        <el-form-item :label="$t('message.activit.nickname') + '*'">
          <el-input
            v-model="regForm.nickname"
            :placeholder="$t('message.setNick')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.activit.name') + '**'" class="aaa">
          <el-input
            v-model="regForm.name"
            :placeholder="$t('message.setName')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.activit.IDnumber') + '**'">
          <el-input
            v-model="regForm.identity"
            :placeholder="$t('message.setIdNumber')"
          ></el-input>
        </el-form-item>
        <el-form>
          <span class="c9">{{ $t("message.changeInfo") }}</span>
        </el-form>
      </el-form>
    </myDialog>
    <myDialog
      :width="isphone ? '90%' : '40%'"
      :title="$t('message.editInfomation')"
      :closeModal="false"
      :closePress="false"
      :visible.sync="dialogVisibleOne"
      @confirm="setbeizhu('zc_beizhu')"
      @cancel="xiugaiajax(1)"
    >
      <el-form label-width="110px" v-model="regForm" style="padding: 20px">
        <el-form-item :label="$t('message.arbitration.nick') + '*'">
          <el-input
            v-model="regForm.zc_beizhu"
            :placeholder="$t('message.arbitration.setArbitration')"
          ></el-input>
        </el-form-item>
        <el-form>
          <span class="c9">{{ $t("message.changeInfo") }}</span>
        </el-form>
      </el-form>
    </myDialog>
    <myDialog
      :width="isphone ? '90%' : '40%'"
      :title="$t('message.editInfomation')"
      :closeModal="false"
      :closePress="false"
      :visible.sync="dialogVisibleTwo"
      @confirm="setbeizhu('team_beizhu')"
      @cancel="xiugaiajax(1)"
    >
      <el-form label-width="110px" v-model="regForm" style="padding: 20px">
        <el-form-item :label="$t('message.node') + '*'">
          <el-input
            v-model="regForm.team_beizhu"
            :placeholder="$t('message.setNode')"
          ></el-input>
        </el-form-item>
        <el-form>
          <span class="c9">{{ $t("message.changeInfo") }}</span>
        </el-form>
      </el-form>
    </myDialog>
  </div>
</template>
<script>
import Web3 from "web3";
import api from "@/api/api";
import Sha256 from "crypto-js/sha256";
import { Base64 } from "js-base64";
import axios from "axios";
import SeededRSA from "./seededrsa/rsa.js";
import JSEncrypt from "jsencrypt"
import lang from "@/components/lang";
import QRCode from "qrcodejs2";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { Notify, Dialog, Toast } from "vant";
import CryptoJs from "crypto-js";
import Beizhujson from "@/conn/Beizhu.json";
import tools from '@/api/public.js'
import config from "@/config";

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
  mounted() {
    if (Beizhujson) {
      this.clist = Beizhujson;
    }
    var dq = this;
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      dq.isphone = true;
      this.formLabelWidth = "100px";
    } else {
      dq.isphone = false;
    }
    if (dq.$route.query.user) {
      dq.user = dq.$route.query.user;
    }
    if (dq.$route.query.ref) {
      dq.recommender = dq.$route.query.user;
    }
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		address = dq.address = id
		if (dq.address.length > 20) {
		  let stars = "****";
		  dq.addressRm =
		    dq.address.substr(0, 4) +
		    stars +
		    dq.address.substr(dq.address.length - 4);
		}
		dq.getsczc();
		dq.getBz();
		dq.getNode()
		dq.getNick_a()
		dq.ruleChangeHideAuth();
		dq.getPubKey(address).then(res=>{
			// console.log(res);
			dq.form.publickey = res
			dq.form.publickeyCopy = res.replace("-----BEGIN PUBLIC KEY-----","").replace("-----END PUBLIC KEY-----","");
		}).catch((err)=>{
			console.log('获取公钥失败');
		})
	}).catch((err)=>{
		web3 = new Web3(config["hyue"][config["key"]]["Url"]);
		console.log(err);
	})
  },
  data() {
    return {
      isshowNoteEdit: false,
      dialogVisible: false,
      dialogVisibleOne: false,
      dialogVisibleTwo: false,
      // textarea: '',
      user: "",
      zc_beizhu: "",
      team_beizhu: "",
      clist: [],
      lxkey: "team_beizhu",
      isphone: false,
      inputval: "",
      name: "",
      identity: "",
      btnText: "身份认证",
      address: "",
      addressRm: "",
      form: {
		msg_encrypt: "",
		msg_decrypt: "",
        password: "",
        passwordAggin: "",
        publickey: "",
		publickeyCopy: '',
		privatekey: ""
      },
      regForm: {
        nickname: "",
        name: "",
        identity: "",
        team_beizhu: "",
        zc_beizhu: "",
      },
      nickname: "",
      beizhu_arr: {
        nc: "",
        team_beizhu: "",
        zc_beizhu: "",
        dh: "",
        wx: "",
        em: "",
        qt: "",
        name: "",
        id: "",
        beizhu: "",
      },
	  radio: 1,
	  inputs:{
		  orderId: '',
		  publicKey: '',
		  address: ''
	  },
	  radio1: 1,
	  inputs1:{
	  		  orderId: '',
	  		  publicKey: '',
	  		  address: '',
			  password: ''
	  },
	  ciphertext: '',
	  Plaintext: ''
    };
  },
  watch: {
    lxkey(e) {
      this.inputval = this.beizhu_arr[e];
    },
    "beizhu_arr.team_beizhu"(e) {
      for (let index = 0; index < this.clist.length; index++) {
        if (this.clist[index]["key"] == "nc") {
          this.inputval = e;
          break;
        }
      }
    },
  },
  methods: {
	async copy(val) {
		await this.$nextTick(e => {})
		var Url2 = document.querySelector(".copy .van-field__control");
		if (val == 1  && !this.Plaintext) return
		if(val == 0 && !this.ciphertext) return
		const input = document.createElement('input');
		document.body.appendChild(input);
		input.setAttribute('value', val ==0 ? this.ciphertext : this.Plaintext);
		input.select();
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			this.$toast('复制成功')
		}
		document.body.removeChild(input);
	
	},
	// 通过用户id 获取公钥
	  getPubKey(id){
		  var beizhucon = new web3.eth.Contract(
			config["hyue"][config["key"]]["Letter"]["abi"],
			config["hyue"][config["key"]]["Letter"]["heyue"]
		  );
		  return new Promise((resolve,reject)=>{
			  beizhucon.methods.message(id,15).call(function(error, ret) {
				if (ret) {
					let key = ret
					resolve(key)
				}else{
					reject(error)
				}
			  });
		  })
	  },
    //读取用户默认备注
    getBz() {
      var dq = this;
      var beizhucon = new web3.eth.Contract(
        config["hyue"][config["key"]]["dotc"]["abi"],
        config["hyue"][config["key"]]["dotc"]["heyue"]
      );
      beizhucon.methods
        .message(dq.user ? dq.user : address + "", 6)
        .call((err, ret) => {
          if (ret) {
            let str = Base64.decode(ret);
            dq.beizhu_arr.beizhu = str;
          }
        });
    },
	// 获取节点
	getNode(){
		var dq = this;
		var beizhucon = new web3.eth.Contract(
		  config["hyue"][config["key"]]["dotc"]["abi"],
		  config["hyue"][config["key"]]["dotc"]["heyue"]
		);
		beizhucon.methods
		  .message(dq.user ? dq.user : address + "", 7)
		  .call((err, ret) => {
		    if (ret) {
		      let str = Base64.decode(ret);
		      dq.beizhu_arr.team_beizhu = str;
		    }
		  });
	},
	// 获取仲裁昵称
	async getNick_a(){
		var dq = this;
		var ArbOne = new web3.eth.Contract(
		  config['hyue'][config['key']]['ArbOne']['abi'],
		  config['hyue'][config['key']]['ArbOne']['heyue']
		);
		var uname = await ArbOne.methods.message(address + "", "0").call();
		dq.beizhu_arr.zc_beizhu = uname ? Base64.decode(uname) : '未填写';
		// console.log(str);
	},

    // 获取 基本信息
    async getsczc() {
      Toast.loading({ message: "查询中..." });
      var dotc = new web3.eth.Contract(dotc_abi, dotc_key);
      var data = await dotc.methods.message(address, 0).call();
      // console.log(data);
      // this.str1 = data;
      let arr = data.split("|");
      this.nickname = Base64.decode(arr[0]);
      this.name = arr[1];
      this.identity = arr[2];
      // this.recom = arr[3];

      Toast.clear();
      // let index;
      // for (let item in address) {
      //   index = item - 3;
      // }
      // this.user = address.substring(0, 5) + "***" + address.substring(index);
      // this.air = await pri.methods.balanceAd(address).call();
      // this.rec = await pri.methods.balanceRe(address).call();
      // this.numberHb = await usdt.methods.balanceOf(address).call();
      // this.gazone = await pri.methods.balanceOne(address).call();
      // this.gazlock = await pri.methods.balanceOf(address).call();
      // this.gazfree = await pri.methods.callfree(address).call();
      // this.recommend_er = await pri.methods.recommend(address).call();
    },
    // 基本信息修改
    xiugaiajax(num) {
      if (num == 2) {
        //提交
        this.register();
      } else {
        this.dialogVisible = false;
      }
    },
    // 注册
    async register() {
      var that = this;
      if (this.regForm.nickname == "") {
        this.$message.error(that.$t('message.setNick'));
        return;
      }
      if (this.regForm.name == "") {
        this.$message.error("请输入姓名");
        return;
      }
      if (this.regForm.identity == "") {
        this.$message.error("请输入身份证号码");
        return;
      }
      // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      // if(reg.test(this.regForm.identity) === false) {
      //  this.$message.error('请输入正确的身份证号码');
      //  return
      // }
      Toast.loading({ message: "注册中..." });
      let nickname = Base64.encode(this.regForm.nickname);
      let name = Sha256(this.regForm.name).toString().substring(0, 10);
      let identity = Sha256(this.regForm.identity).toString().substring(0, 15);
      var dotc = new web3.eth.Contract(dotc_abi, dotc_key);
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
          that.dialogVisible = false;
		  Toast.clear();
          return;
          let data = {
            idNo: that.regForm.identity,
            name: that.regForm.name,
            nickname: that.regForm.nickname,
            address: address,
            parentAddress: that.recommender || 0,
          };
          // 存数据库
          api.register(data).then((res) => {
            console.log("注册数据存储结果：" + res);
            if (res.code == 0) {
              // 注册成功后 调用实名认证
              // that.ruleHideAuth()
            } else {
              that.$confirm(res.result, "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
                callback: (action) => {
                  if (action === "confirm") {
                    console.log("按下 确定");
                  } else {
                    console.log("按下 取消");
                  }
                },
              });
            }
          });
        }, 3000);
      }
    },
    ruleChangeHideAuth() {
      var that = this;
      axios
        .post("https://gazotc.com:8083/member/jnmioURL?address=" + address)
        .then((res) => {
          if (res.result.state == "SUCCESS") {
            // 已实名认证
            this.btnText = "已认证";
          } else {
          }
        });
    },
    // 实名认证
    ruleHideAuth() {
      Toast.loading({ message: "数据请求中..." });
      api.RealName("address=" + address).then((res) => {
        let url = res.result.redirectUrl;
        // console.log(code);
        Toast.clear();
        if (res.result.state == "SUCCESS") {
          // 已实名认证
          this.$confirm("您已实名认证", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
            callback: (action) => {
              if (action === "confirm") {
                console.log("按下 确定");
              } else {
                console.log("按下 取消");
              }
            },
          });
        } else if (res.result.redirectUrl) {
          //未实名认证
          window.location.href = url;
          // this.$router.push({
          // 	name: 'RealName',
          // 	query: {
          // 	  url: url
          // 	}
          // })
        }
      });

      // console.dir(document.querySelector('#create-verification-session'));
      // Toast.success(this.$t("message.activit.notOpen"));
      //this.enauth = this.enauth ? false : true;
    },
    // 提交 备注修改
    setNote() {
      var that = this;
      var loading = Toast.loading({
        message: this.$t("message.Modifying"),
        closeOnClick: false,
        closeOnClickOverlay: false,
        loadingType: "spinner",
        getContainer: "body",
        duration: 0,
      });
      var beizhucon = new web3.eth.Contract(
        config["hyue"][config["key"]]["dotc"]["abi"],
        config["hyue"][config["key"]]["dotc"]["heyue"]
      );
      console.log(that.beizhu_arr.beizhu);
      beizhucon.methods
        .commun(6 + "", Base64.encode(that.beizhu_arr.beizhu + ""))
        .send(
          {
            from: address,
          },
          (err, ret) => {
            if (ret && !err) {
              loading.clear();
              Dialog.alert({
                title: that.$t("message.prompt"),
                message: that.$t("message.success"),
              }).then(() => {
                // on close
              });
            } else {
              loading.clear();
              that.isshowNoteEdit = false;
              Dialog.alert({
                title: that.$t("message.prompt"),
                message: that.$t("message.failed"),
              }).then(() => {
                // on close
              });
            }
          }
        );
    },
    urlgo() {
      this.$router.go(-1);
    },
    setbeizhu(e) {
      var loading = Toast.loading({
        message: this.$t("message.Modifying"),
        closeOnClick: false,
        closeOnClickOverlay: false,
        loadingType: "spinner",
        getContainer: "body",
        duration: 0,
      });
      this.lxkey = e;
      if (this.lxkey == "zc_beizhu") {
        console.log(this.lxkey);
        var zcbeizhucon = new web3.eth.Contract(
          config["hyue"][config["key"]]["ArbOne"]["abi"],
          config["hyue"][config["key"]]["ArbOne"]["heyue"]
        );
		console.log(this.regForm.zc_beizhu);
        zcbeizhucon.methods
          .commun(0 + "", Base64.encode(this.regForm.zc_beizhu + ""))
          .send(
            {
              from: address,
            },
            (err, ret) => {
              if (ret && !err) {
                loading.clear();
                Dialog.alert({
                  title: this.$t("message.prompt"),
                  message: this.$t("message.DataSucceeded"),
                }).then(() => {
                  this.dialogVisibleOne = false;
                  // on close
                });
              } else {
                loading.clear();
                Dialog.alert({
                  title: this.$t("message.prompt"),
                  message: this.$t("message.Datafailed"),
                }).then(() => {
                  this.dialogVisibleOne = false;
                  // on close
                });
              }
            }
          );
        return;
      }

      //提交修改
      var lxkey = 0;
      for (let index = 0; index < this.clist.length; index++) {
        if (this.clist[index]["key"] == this.lxkey) {
          lxkey = this.clist[index]["id"];
          break;
        }
      }
      var beizhucon = new web3.eth.Contract(
        config["hyue"][config["key"]]["dotc"]["abi"],
        config["hyue"][config["key"]]["dotc"]["heyue"]
      );
      var inputval = this.inputval;
      if (lxkey == 5 || lxkey == 9) {
        console.log("encrypt 5,9 = ", inputval);
        inputval = CryptoJs.AES.encrypt(inputval, "gazotc");
      }
      beizhucon.methods
        .commun(lxkey + "", Base64.encode(this.regForm.team_beizhu + ""))
        .send(
          {
            from: address,
          },
          (err, ret) => {
            if (ret && !err) {
              loading.clear();
              Dialog.alert({
                title: this.$t("message.prompt"),
                message: this.$t("message.DataSucceeded"),
              }).then(() => {
                this.dialogVisibleTwo = false;
                // on close
              });
            } else {
              loading.clear();
              Dialog.alert({
                title: this.$t("message.prompt"),
                message: this.$t("message.Datafailed"),
              }).then(() => {
                this.dialogVisibleTwo = false;
                // on close
              });
            }
          }
        );
    },
    async apply_password() {
	  var rep = /^[a-zA-Z\d_]{8,}$/
	  if(!rep.test(this.form.password)){
		  Toast('密码必须大于8位')
		  return
	  }
      if (this.form.password != this.form.passwordAggin) {
        alert(this.$t("message.applyPwd"));
        // alert("password mismatched")
      } else {
        const key = new SeededRSA(this.form.password);
        const value = await key.generate(2048).catch(console.log);
		// 存到链上   15
		var beizhucon = new web3.eth.Contract(
		  config["hyue"][config["key"]]["Letter"]["abi"],
		  config["hyue"][config["key"]]["Letter"]["heyue"]
		);
		var that = this
		Toast.loading({ message: that.$t("message.loading")+'...' });
		that.setPublicKey(beizhucon,value.publicKey).then(()=>{
			Dialog.alert({
			  title: that.$t("message.prompt"),
			  message: that.$t("message.success"),
			}).then(() => {
				that.form.publickey = value.publicKey;
				that.form.publickeyCopy = res.replace("-----BEGIN PUBLIC KEY-----","").replace("-----END PUBLIC KEY-----","")
				that.form.privatekey = value.privateKey;
				Toast.clear();
			});
		}).catch(()=>{
				Dialog.alert({
				  title: that.$t("message.prompt"),
				  message: that.$t("message.failed"),
				}).then(() => {
				  Toast.clear();
				});
		})
      }
    },
	// 存公钥到链
	setPublicKey(beizhucon,publicKey){
		return new Promise((resolve,reject)=>{
			beizhucon.methods .commun(15 + "", publicKey) .send( { from: address, }, (err, ret) => {
				  if (ret && !err) {
					resolve()
				  } else {
					reject()
				  }
				}
			  );
		})
	},
	// 选择 获取公钥的方式
	changeRadio(e){
		this.inputs = {
		  orderId: '',
		  publicKey: '',
		  address: ''
		}
	},
	// 选择 公钥的方式
	changeRadio1(e){
		this.inputs1 = {
		  orderId: '',
		  publicKey: '',
		  address: ''
		}
	},
	// 点击加密
	encrypt_message() {
		if(this.radio == 1){  // 公钥加密
			if(this.inputs.publicKey == "" || this.form.msg_encrypt == ""){
				Toast('请输入明文或公钥')
				return
			}else{
				let msg = this.encryption(this.inputs.publicKey,this.form.msg_encrypt)
				if(!msg){
					Toast('请输入正确的公钥')
					return
				}
				this.ciphertext = msg
			}
		}else if(this.radio == 2){ // 地址获取公钥加密
		    if(this.inputs.address == "" || this.form.msg_encrypt == ""){
		    	Toast('请输入明文或地址')
		    	return
		    }else{
				this.getPubKey(this.inputs.address).then(res=>{
					let msg = this.encryption(res,this.form.msg_encrypt)
					this.ciphertext = msg
				}).catch((err)=>{
					Toast('对方没有设置公钥')
					console.log('获取公钥失败');
				})
			}
			
		}else if(this.radio == 3){   // 发布订单号者地址 获取公钥加密
			if(this.inputs.orderId == "" || this.form.msg_encrypt == ""){
				Toast('请输入明文或发布订单号')
				return
			}else{
				let dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
				dotsconn.methods.merch(this.inputs.orderId).call((error, ret) => {
					if(ret.iorder>0){   //获取到了数据
						// 获取到商家 地址
						let address = ret.Mowner
						this.getPubKey(address).then(res=>{
							let msg = this.encryption(res,this.form.msg_encrypt)
							this.ciphertext = msg
						}).catch((err)=>{
							Toast('对方没有设置公钥')
							console.log('获取公钥失败');
						})
					}else{
						Toast('订单号不存在')
					}
					
				});
			}
		}else if(this.radio == 4){  // 交易订单号 获取对方公钥加密
			if(this.inputs.orderId == "" || this.form.msg_encrypt == ""){
				Toast('请输入明文或交易订单号')
				return
			}else{
				this.getId(this.inputs.orderId).then(res => {
					let {Uadd,Madd} = res
					var id = ''
					// 判断 当前用户是商家还是用户(转小写比较)    ？不是商家或用户
					// 不是商家或用户
					if(address != Uadd.toLowerCase() && address != Madd.toLowerCase()){
						Toast('不是该订单的交易者')
						return
					}
					if (address == Uadd.toLowerCase()) {
						id = Madd
					} else {
						id = Uadd
					}
					// console.log(Madd);
					// console.log(Uadd);
					// console.log(address);
					this.getPubKey(id).then(res=>{
						let msg = this.encryption(res,this.form.msg_encrypt)
						this.ciphertext = msg
					}).catch((err)=>{
						Toast('对方没有设置公钥')
						console.log('获取公钥失败');
					})	
				}).catch((err) => {
					console.log('获取商家id和用户id失败');
				})
			}
		}
	},
	// 加密
	encryption(key,val){
		let pubkey = new JSEncrypt();
		pubkey.setPublicKey(key);
		let msg = pubkey.encrypt(val);
		return msg
	},
	// 解密
	async decrypt_message() {
	  if (this.inputs1.password == "" || this.form.msg_decrypt == "") {
	    Toast('请输入私信密码或密文')
	  }else{
		  const key = new SeededRSA(this.inputs1.password);
		  console.log(key);
		  const value = await key.generate(2048).catch(console.log);
		  let { publicKey,privateKey} = value
		  let privkey = new JSEncrypt()
		  privkey.setPrivateKey(privateKey)
		  let origin = privkey.decrypt(this.form.msg_decrypt)
		  if(origin){
			  let jsonOrigin = JSON.parse(Base64.decode(origin))
			  let str = ''
			  if (jsonOrigin.hasOwnProperty('phoneNuber')) {
			  	str += this.$t('message.phoneNumber') + '：' + jsonOrigin.phoneNuber + ' '
			  }
			  if (jsonOrigin.hasOwnProperty('eMail')) {
			  	str += this.$t('message.email') + '：' + jsonOrigin.eMail + ' '
			  }
			  if (jsonOrigin.hasOwnProperty('tele')) {
			  	str += 'Tele：' + jsonOrigin.tele
			  }
			  if (jsonOrigin.hasOwnProperty('wechat')) {
			  	str += this.$t('message.WeChat') + '：' + jsonOrigin.wechat + ' '
			  }
			  if (jsonOrigin.hasOwnProperty('other')) {
			  	str += this.$t('message.other') + '：' + jsonOrigin.other + ' '
			  }
			  this.Plaintext = str
		  }else{
			  Toast('请输入密码有误')
		  }
		  
	  }
	  
	},
	
	
	
	// 通过交易id  获取商家和用户id
	getId(id) {
		return new Promise((resolve, reject) => {
			var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
			dotsconn.methods.users(id).call(function(error, ret) {
				if (ret) {
					let ids = {
						Uadd: ret.Uadd,
						Madd: ret.Madd
					}
					resolve(ids)
				} else {
					reject()
				}
			});
		})
	},
  },
};
</script>
<style lang='less' scoped='scoped'>
.list {
  li {
    display: flex;
  }
}
.input_fied {
  margin-top: 20px;
  border: 1px solid #dcdcdc;

  /deep/ .van-field__button {
    margin-top: 75px;
    font-size: 18px;
  }
}

.form_nav {
  /deep/ .el-form-item__label {
    display: flex;
    align-items: center;
  }
}
.el-form {
  margin-top: 12px;
}
.el-form-item {
  margin-bottom: 10px;
}
.aaa {
  margin-bottom: 5px;
}

.label_nav {
  display: inline-block;
  width: 100px;
  text-align: left;
  margin-right: 10px;
}
.cba {
  flex: 1;
  max-width: 100px;
}
.user {
  background: #fff;

  .head {
    text-align: center;
    line-height: 60px;
    font-weight: bold;
  }

  .item {
    margin-bottom: 20px;

    .top {
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
    }

    .btn {
      text-align: center;

      span {
        padding: 10px 40px;
        background: #ffc400;
        display: inline-block;
        color: #fff;
        width: 160px;
      }

      margin: 20px;
    }
  }

  .one {
    .cont {
      .list {
        li {
          margin: 15px 5px;
        }
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .itemb_r {
    border: none;
    border-bottom: 1px solid #cccccc;
  }
}

@media only screen and (min-width: 991px) {
  .user {
    padding: 20px 100px;
  }
}
</style>
