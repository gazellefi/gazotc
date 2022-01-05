<style lang="less" scoped>
	.ddinfo_w {
		background-color: #fff;
		padding: 0px;

		.title {
			background-color: #ECF0F9;
			padding: 20px 10px;
			font-size: 18px;
			color: #5BAEAC;
		}

		.item {
			display: flex;
			align-items: center;
			padding: 5px 10px 10px;
			font-size: 14px;
		}

		.item2 {
			padding: 5px 10px 10px;
			font-size: 14px;

			>div {
				margin-bottom: 10px;
			}
		}

		.item3 {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}

	.ddinfo_w_anarr {
		display: flex;
		flex-direction: column;
	}

	.ddinfo_w_anarr .van-button {
		margin-top: 15px;
	}

	.msg {
		padding: 5px 0;
		font-size: 14px;
		// opacity: 0.8;
		position: absolute;
		color: #999;
		bottom: -20px;

	}

	.btnStyle {
		width: 90%;
		border: 1px solid #5BAEAC;
		color: #5BAEAC;
		margin-top: 20px;
	}

	// @media only screen and (max-width: 991px){
	// 	.itemb_r{
	// 		border: none;
	// 		border-bottom: 1px solid #CCCCCC;
	// 	}
	// }
	// @media only screen and (min-width: 991px){
	// 	.itemb_r{
	// 		border-right: 1px solid #CCCCCC;
	// 	}
	// }
</style>
<template>
	<div class="ddinfo_w">
		<el-row>
			<el-col :span="24" class="title">
				<span>{{$t('message.arbitration.orderDes')}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.t_orderId')}}：</span>
				<span>{{ddifo.iorder}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.fromOrder')}}：</span>
				<span>{{ddifo.faddid}}</span>
				<!-- <el-button type="text" size="mini" @click="openddinfos(ddifo['faddid'])">详情</el-button> -->
				<el-link class="marl-10" type="primary" @click="openddinfos(ddifo['faddid'])">{{$t('message.details')}}
				</el-link>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.orderType')}}：</span>
				<span>{{$t(`message.dapp.${ddifo.Umark_b}`)}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.userAress')}}：</span>
				<span>{{ddifo.Uadd_b}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.merchantAdress')}}：</span>
				<span>{{ddifo.Madd_b}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.userMarginLock')}}：</span>
				<span>{{ ddifo.uma.toFixed(2) }} GAZ</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.arbitration.merchantMarginLock')}}：</span>
				<span>{{ ddifo.mma }} GAZ</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.transactionNum')}}：</span>
				<span>{{ ddifo.Uoa }} {{ ddifo.pro_c }}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.orderTime')}}：</span>
				<span>{{ ddifo.tima != 0 ? gettime_zh(ddifo.tima):'' }}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.assetRelease')}}：</span>
				<span v-if="ddifo.timc == 0 && ddifo.release == 0">{{$t('message.dapp.notReleased')}}</span>
				<span v-if="ddifo.timc != 0 && ddifo.release == 0">{{$t('message.dapp.released')}}</span>
				<span v-if="ddifo.timc == 0 && ddifo.release != 0">{{$t('message.cancel')}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.payTime')}}：</span>
				<span>{{ ddifo.timb != 0 ? gettime_zh(ddifo.timb):$t('message.unknown') }}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.marginRelease')}}：</span>
				<span v-if="ddifo.time != 0">{{$t('message.dapp.released')}}</span>
				<span v-if="ddifo.time == 0">{{$t('message.dapp.notReleased')}}</span>
			</el-col>
			<el-col :sm="24" :md="8" :lg="6" class="item">
				<span>{{$t('message.dapp.Arbitration')}}：</span>
				<span>{{ ddifo.arb == 0 ? $t('message.arbitration.NotStart'):ddifo.arb == 1? $t('message.arbitration.userVictory'):$t('message.arbitration.MerchantsVictory') }}</span>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24" class="title">
				<span>{{$t('message.dapp.PrivateMessage')}}</span>
			</el-col>
			<el-col :sm="24" class="item2 itemb_r">
				<div class="f a_c">
					<span>{{$t('message.pwd')}}：</span>
					<el-input style="width: 30%;" :placeholder="$t('message.enterPrivateTips')" v-model="input"
						size="mini"></el-input>
					<el-link type="primary" class="marl-10" @click="geStr">{{$t('message.decrypt')}}</el-link>
				</div>
				<div class="f c_b">
					<span class="hidden-sm-and-down" style="visibility: hidden;">{{$t('message.dapp.message')}}：</span>
					<el-input :placeholder="$t('message.noMsg')" v-model="letter" size="mini" type="textarea" :rows="2">
					</el-input>
					<el-link type="primary" class="marl-10" @click="copy">{{$t('message.copy')}}</el-link>
				</div>
			</el-col>
			<!-- <el-col :sm="24" :md="12" class="item2">
				<div>
					<span>{{$t('message.arbitration.nick')}}：</span>
					<span></span>
				</div>
				<div>
					<span>{{$t('message.activit.addr')}}：</span>
					<span></span>
				</div>
				<div class="f a_c">
					<span>{{$t('message.dapp.message')}}：</span>
					<el-input style="width: 30%;" :placeholder="$t('message.enterPrivateTips')" v-model="input" size="mini"></el-input>
					<el-link type="primary" class="marl-10">{{$t('message.decrypt')}}</el-link>
				</div>
				<div class="f a_c">
					<span class="hidden-sm-and-down" style="visibility: hidden;">{{$t('message.dapp.message')}}：</span>
					<el-input :placeholder="$t('message.enterContent')" v-model="input1" size="mini" type="textarea" :rows="2"></el-input>
				</div>
			</el-col> -->
		</el-row>
		<el-row>
			<el-col :span="24" class="title">
				<span>{{$t('message.orderStateNow')}}</span>
			</el-col>
			<el-col :span="24" class="item mart-10">
				<span>{{$t('message.arbitration.balandCountdown')}}：</span>
				<van-count-down :time="ddifo['djs_val']" format="DD day HH hour mm minute ss second" v-if="ddifo['timc'] > 0 && ddifo['time'] == 0" />
				<van-count-down time="0" format="DD day HH hour mm minute ss second" v-if="ddifo['timc'] > 0 && ddifo['time'] != 0" />
				<div class="ddinfo_w_djs_msg_djs" v-if="ddifo['timc'] == 0 || !ddifo['timc']">
					<!-- 判断是否暂停 或者取消 -->
					<span v-if="ddifo['pau'] != 0">{{$t('message.dapp.orderSuspended')}}</span>
					<span v-if="ddifo['release'] != 0">{{$t('message.dapp.orederCancelled')}}</span>
				</div>
			</el-col>
			 <!-- 当前登录为商家   订单类型为购买 -->
			<el-col :span="24" v-if="ddifo['myuser'] == ddifo['Madd'] && ddifo['Umark_b'] == 'buy' ">
				<!-- 购买 -->
				<el-row style="padding-bottom: 20px;">
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('qx_ddajax')"
							:disabled="anarr('qx_ddajax')">{{$t('message.cancel')}}</van-button>
					</el-col>
					<!-- <el-col :sm="8" :lg="24"><van-button plain type="primary" @click="setddcode('fk_ddajax')" :disabled="anarr('qx_ddajax')">已付款</van-button></el-col> -->
					<el-col :sm="24" :lg="8" class="fc c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('zt_ddajax',2)"
							:disabled="anarr('zt_ddajax')">{{$t('message.suspendBalad')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.pau == 1">{{$t('message.UserPause')}}</span>
							<span v-if="ddifo.pau == 2">{{$t('message.MerchantSuspension')}}</span>
						</div>
					</el-col>
					<!-- <el-col :sm="8" :lg="24"><van-button plain type="primary" @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax','Madd')">提前释放</van-button></el-col> -->
					<el-col :sm="24" :lg="8" class="fc c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('tq_ddajax')"
							:disabled="anarr('tq_ddajax','Madd')">{{$t('message.UserAgreesRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.agree == 1">{{$t('message.UserAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 2">{{$t('message.MerchantAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 3">{{$t('message.allAgrees')}}</span>
						</div>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('sf_ddajax')"
							:disabled="anarr('sf_ddajax')">{{$t('message.ReleaseMargin')}}</van-button>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="openurl('./zhongcai')"
							:disabled="anarr('ss_ddajax')">{{$t('message.appeal')}}</van-button>
					</el-col>
				</el-row>
			</el-col>
			<!-- 当前登录为商家   订单类型为出售 -->
			<el-col :span="24" v-if=" ddifo['myuser'] == ddifo['Madd'] && ddifo['Umark_b'] == 'sell'">
				<el-row style="padding-bottom: 20px;">
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="pr	imary" @click="setddcode('fb_ddajax')" :disabled="anarr('fb_ddajax')">{{$t('message.putMoney')}}</van-button>
					</el-col>
					<el-col :sm="24" :lg="8" class="fc c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('zt_ddajax',2)"
							:disabled="anarr('zt_ddajax')">{{$t('message.pushMarginRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.pau == 1">{{$t('message.UserPause')}}</span>
							<span v-if="ddifo.pau == 2">{{$t('message.MerchantSuspension')}}</span>
						</div>
					</el-col>
					<el-col :sm="24" :lg="8" class="fc c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('tq_ddajax')"
							:disabled="anarr('tq_ddajax','Madd',1)">{{$t('message.MerchantAgreesRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.agree == 1">{{$t('message.UserAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 2">{{$t('message.MerchantAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 3">{{$t('message.allAgrees')}}</span>
						</div>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('sf_ddajax')"
							:disabled="anarr('sf_ddajax')">{{$t('message.ReleaseMargin')}}</van-button>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="openurl('./zhongcai')"
							:disabled="anarr('ss_ddajax')">{{$t('message.appeal')}}</van-button>
					</el-col>
				</el-row>
			</el-col>
			<!-- 当前登录为用户  订单类型为出售 -->
			<el-col :span="24" v-if=" ddifo['myuser'] == ddifo['Uadd'] && ddifo['Umark_b'] == 'sell' ">
				<el-row style="padding-bottom: 20px;">
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('fb_ddajax')"
							:disabled="anarr('fb_ddajax')">{{$t('message.putMoney')}}</van-button>
					</el-col>
					<el-col :sm="24" :lg="8" class="fc c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('zt_ddajax',1)"
							:disabled="anarr('zt_ddajax')">{{$t('message.suspendBalad')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.pau == 1">{{$t('message.UserPause')}}</span>
							<span v-if="ddifo.pau == 2">{{$t('message.MerchantSuspension')}}</span>
						</div>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c a_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('tq_ddajax')"
							:disabled="anarr('tq_ddajax','Uadd')">{{$t('message.MerchantAgreesRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.agree == 1">{{$t('message.UserAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 2">{{$t('message.MerchantAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 3">{{$t('message.allAgrees')}}</span>
						</div>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('sf_ddajax')"
							:disabled="anarr('sf_ddajax')">{{$t('message.ReleaseMargin')}}</van-button>
					</el-col>
					<el-col :sm="24" :lg="8" class="f c_c">
						<van-button class="btnStyle" plain type="primary" @click="openurl('./zhongcai')"
							:disabled="anarr('ss_ddajax')">{{$t('message.appeal')}}</van-button>
					</el-col>
				</el-row>
			</el-col>
			<!-- 当前登录为用户   订单类型为出售 -->
			<el-col :span="24" v-if="ddifo['myuser'] == ddifo['Uadd'] && ddifo['Umark_b'] == 'buy'">
				<el-row style="padding-bottom: 20px;">
					<el-col class="f c_c" :sm="24" :lg="8">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('qx_ddajax')"
							:disabled="anarr('qx_ddajax')">{{$t('message.cancel')}}</van-button>
					</el-col>
					<!-- <el-col :sm="24" :lg="8"><van-button plain type="primary" @click="setddcode('fk_ddajax')" :disabled="anarr('qx_ddajax')">已付款</van-button></el-col> -->
					<el-col class="fc c_c a_c" :sm="24" :lg="8">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('zt_ddajax',1)"
							:disabled="anarr('zt_ddajax')">{{$t('message.pushMarginRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.pau == 1">{{$t('message.UserPause')}}</span>
							<span v-if="ddifo.pau == 2">{{$t('message.MerchantSuspension')}}</span>
						</div>
					</el-col>
					<el-col class="fc c_c a_c" :sm="24" :lg="8">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('tq_ddajax')"
							:disabled="anarr('tq_ddajax','Uadd',2)">{{$t('message.UserAgreesRelease')}}</van-button>
						<div class="msg">
							<span v-if="ddifo.agree == 1">{{$t('message.UserAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 2">{{$t('message.MerchantAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 3">{{$t('message.allAgrees')}}</span>
						</div>
					</el-col>
					<el-col class="f c_c" :sm="24" :lg="8">
						<van-button class="btnStyle" plain type="primary" @click="setddcode('sf_ddajax')"
							:disabled="anarr('sf_ddajax')">{{$t('message.ReleaseMargin')}}</van-button>
					</el-col>
					<el-col class="f c_c" :sm="24" :lg="8">
						<van-button class="btnStyle" plain type="primary" @click="openurl('./zhongcai')"
							:disabled="anarr('ss_ddajax')">{{$t('message.appeal')}}</van-button>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="24" v-if="ddifo['myuser'] != ddifo['Uadd'] && ddifo['myuser'] != ddifo['Madd']">
				<!-- 不是商家也不是卖家 -->
				<el-row style="padding-bottom: 20px;">
					<el-col :sm="12" :md="8" class="item3">
						<van-button plain type="primary" class="btnStyle" :disabled="true">
							<span v-if="ddifo.pau == 0">{{$t('message.suspendBalad')}}</span>
							<span v-if="ddifo.pau == 1">{{$t('message.UserPause')}}</span>
							<span v-if="ddifo.pau == 2">{{$t('message.MerchantSuspension')}}</span>
						</van-button>
					</el-col>
					<el-col :sm="12" :md="8" class="item3">
						<van-button plain type="primary" class="btnStyle" :disabled="true">
							<span v-if="ddifo.agree == 0">{{$t('message.earlyReleaseMargin')}}</span>
							<span v-if="ddifo.agree == 1">{{$t('message.UserAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 2">{{$t('message.MerchantAgreesRelease')}}</span>
							<span v-if="ddifo.agree == 3">{{$t('message.allAgrees')}}</span>
						</van-button>
					</el-col>
					<el-col :sm="12" :md="8" class="item3">
						<van-button plain type="primary" class="btnStyle" :disabled="true">
							{{$t('message.ReleaseMargin')}}</van-button>
					</el-col>
					<el-col :sm="12" :md="8" class="item3">
						<van-button plain type="primary" class="btnStyle" :disabled="true">{{$t('message.appeal')}}
						</van-button>
					</el-col>
				</el-row>
			</el-col>

		</el-row>
	</div>
</template>
<script>
	import ddinfomodel from "./ddinfo.json";
	import {
		Toast
	} from 'vant';

	import config from "@/config";
	import JSEncrypt from "jsencrypt"
	let Base64 = require('js-base64').Base64;
	import SeededRSA from "@/views/home/user/seededrsa/rsa.js";
	var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
	var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
	var huobijson = {
		huobi: [],
		fabi: []
	};
	var harr = config['hbi'][config['key']];
	var fbarr = config['fabi'][config['key']];
	for (const key in harr) {
		huobijson['huobi'].push({
			hyue: harr[key]['heyue'],
			id: harr[key]['id'],
			key: harr[key]['key'],
			num: harr[key]['num']
		});
	}
	for (const key in fbarr) {
		huobijson['fabi'].push({
			id: fbarr[key]['id'],
			key: fbarr[key]['key']
		});
	}


	//全局变量
	var web3 = "";
	var address = "";
	var ethereum = window.ethereum;
	var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];
	var uarm;

	import tools from '@/api/public.js'
	import moment from "moment";
	import {
		Dialog
	} from 'vant';

	export default {
		data() {
			return {
				ddid: null,
				ddidcode: true,
				activeNames: ['1', '2', '3'],
				input: '',
				input1: '',
				dquser: '',
				letter: '',
				ddifo: ddinfomodel,
				traState: 0,  //  1:当前登录为商家   订单类型为购买  2:当前登录为商家   订单类型为出售   3:当前登录为用户  订单类型为购买   4: 当前登录为用户   订单类型为出售   5:不是商家也不是卖家
			}
		},
		watch: {
			'ddifo'(e) {
				console.log(e);
			}
		},
		created() {
			var dq = this;
			var ddid = this.$route.query.ddid;
			if (ddid) {
				this.ddidcode = false;
				this.ddid = ddid;
			} else {
				this.ddidcode = true;
			}
			
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				dq.dquser = address;
				if (dq.ddid) {
					dq.getddinfo(dq.ddid);
					dq.getId(dq.ddid).then(res => {
						let {
							Uadd,
							Madd
						} = res
						var id = ''
						// 判断 当前用户是商家还是用户(转小写比较)
						if (address == Uadd.toLowerCase()) {
							id = Madd
						} else {
							id = Uadd
						}
						// 通过对方id 获取返回id
						dq.getHasLetter(id).then(res => {
							//  返回id 等于 此订单id  获取公钥
							console.log(res);
							if (res == dq.ddid) {
								// 获取 私信内容
								dq.getLetter(id).then(res => {
									dq.letter = res
								}).catch((err) => {
									console.log('获取私信失败');
								})
							}
						}).catch((err) => {
							console.log('获取id失败');
						})
				
				
					}).catch((err) => {
						console.log('获取商家id和用户id失败');
					})
				}
			}).catch((err)=>{
				console.log(err);
			})


		},
		methods: {
			async copy() {
				await this.$nextTick(e => {})
				var Url2 = document.querySelector(".copy .van-field__control");
				if (!this.letter) return
				const input = document.createElement('input');
				document.body.appendChild(input);
				input.setAttribute('value', this.letter);
				input.select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					this.$toast('私信复制成功')
				}
				document.body.removeChild(input);

			},
			// 解密
			async geStr() {
				if (this.input == '') return
				// 解密
				const key = new SeededRSA(this.input);
				// 获取密钥
				const value = await key.generate(2048).catch(console.log);
				let ss = value.privateKey
				let privkey = new JSEncrypt()
				privkey.setPrivateKey(ss)
				let origin = privkey.decrypt(this.letter)
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
				this.letter = str
				// console.log(str);
			},
			// 通过对方id 获取私信
			getLetter(id) {
				var beizhucon = new web3.eth.Contract(
					config["hyue"][config["key"]]["Letter"]["abi"],
					config["hyue"][config["key"]]["Letter"]["heyue"]
				);
				return new Promise((resolve, reject) => {
					beizhucon.methods.message(id, '16').call(function(error, ret) {
						if (ret) {
							resolve(ret)
						} else {
							reject(error)
						}
					});
				})
			},
			// 通过Id 获取 订单号
			getHasLetter(id) {
				var beizhucon = new web3.eth.Contract(
					config["hyue"][config["key"]]["Letter"]["abi"],
					config["hyue"][config["key"]]["Letter"]["heyue"]
				);
				return new Promise((resolve, reject) => {
					beizhucon.methods.indicator(id).call(function(error, ret) {
						if (ret) {
							let id = ret
							resolve(id)
						} else {
							reject(error)
						}
					});
				})
			},
			// 通过订单获取 id
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
			// 通过用户id 获取公钥
			getPubKey(id) {
				console.log(id);
				var beizhucon = new web3.eth.Contract(
					config["hyue"][config["key"]]["Letter"]["abi"],
					config["hyue"][config["key"]]["Letter"]["heyue"]
				);
				return new Promise((resolve, reject) => {
					beizhucon.methods.message(id, '15').call(function(error, ret) {
						if (ret) {
							let key = ret
							resolve(key)
						} else {
							reject(error)
						}
					});
				})
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
			//时间转换
			gettime_zh(e) {
				if (e) {
					var stime = moment.unix(Number(e)).format('YYYY-MM-DD  HH:mm:ss');
					return stime;
				} else {
					return '';
				}
			},
			openddinfos(e) {
				this.$router.push({
					name: 'mairu',
					query: {
						did: e
					}
				});
			},
			getddinfo(ddid) {
				//获取订单详情
				var dq = this;
				if (!dq.ddid) {
					return;
				} else {
					ddid = dq.ddid;
				}
				dq.ddidcode = false;
				var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
				dotsconn.methods.users(ddid).call(function(error, ret) {
					// console.log(ret);
					if (ret) {

						dq.ddifo['iorder'] = ret['iorder'];
						dq.ddifo['Umark'] = ret['Umark'];
						dq.ddifo['pro'] = ret['pro'];
						dq.ddifo['Uadd'] = ret['Uadd'].toLowerCase();
						dq.ddifo['Madd'] = ret['Madd'].toLowerCase();
						dq.ddifo['release'] = ret['release'];
						dq.ddifo['timc'] = ret['timc'];
						console.log(ret['timc']);
						dq.ddifo['agree'] = Number(ret['agree']);
						dq.ddifo['pau'] = ret['pau'];
						dq.ddifo['uma'] = Number(ret['uma']) / (10 ** bzj_num);
						dq.ddifo['mma'] = Number(ret['mma']) / (10 ** bzj_num);
						//扩展数据
						// console.log(ret['Uadd']);
						// dq.ddifo['Umark_b'] =  ret['Umark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? 'buy':'sell';

						let udd = dq.lowerCase(ret['Uadd'])
						console.log(ret['pro'])
						dq.ddifo['Umark_b'] = udd != dq.dquser ? 'sell' : 'buy'
						for (let index = 0; index < huobijson['huobi'].length; index++) {

							if (huobijson['huobi'][index]['key'] == ret['pro']) {
								console.log(huobijson['huobi'][index]['id'])
								dq.ddifo['pro_c'] = huobijson['huobi'][index]['id'];
							}
						}
						// dq.ddifo['pro_c'] = ret['pro'] == '0x7573647400000000000000000000000000000000000000000000000000000000' ? 'usdt' : 'Test';
						for (let index = 0; index < huobijson['huobi'].length; index++) {
							var num = 0;
							if (huobijson['huobi'][index]['key'] == ret['pro']) {
								dq.ddifo['pro_b'] = huobijson['huobi'][index]['id'];
								num = Number(huobijson['huobi'][index]['num']);
								//价格转换
								dq.ddifo['Uoa'] = (Number(ret['Uoa']) / (10 ** num)).toFixed(2);
								break;
							}
						}
						dq.ddifo['Madd_b'] = ret['Madd'].substring(0, 5) + '.....' + ret['Madd'].substring(ret[
							'Madd'].length - 5, ret['Madd'].length);
						dq.ddifo['Uadd_b'] = ret['Uadd'].substring(0, 5) + '.....' + ret['Uadd'].substring(ret[
							'Uadd'].length - 5, ret['Uadd'].length);
						dq.ddifo['myuser'] = address;
						ddifoget();
					}
				});

				//获取附加时间
				async function ddifoget() {
					var timb = await dotsconn.methods.timb(dq.ddid).call(function(error, ret) {
						return ret;
					});
					var tima = await dotsconn.methods.tima(dq.ddid).call(function(error, ret) {
						return ret;
					});
					var time = await dotsconn.methods.time(dq.ddid).call(function(error, ret) {
						return ret;
					});
					var Timc = await dotsconn.methods.Timc().call(function(error, ret) {
						return ret;
					});
					var faddid = await dotsconn.methods.Morder(dq.ddid).call(function(error, ret) {
						return Number(ret);
					});


					dq.ddifo['timb'] = Number(timb);
					dq.ddifo['tima'] = Number(tima);
					dq.ddifo['time'] = Number(time);
					console.log(time);

					dq.ddifo['Timc'] = Number(Timc);
					dq.ddifo['faddid'] = faddid;
					//倒计时 tc + Tc - 当前时间  = 倒计时
					var djs = (Number(dq.ddifo['timc']) + dq.ddifo['Timc']) - Math.round(new Date() / 1000);
					dq.ddifo['djs_val'] = djs * 1000;
					console.log(dq.ddifo['djs_val']);
				}
			},

			//订单操作 cancel 付款 放币等
			setddcode(type, c = '') {
				var dq = this;
				var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
				if (JSON.stringify(dq.ddifo).indexOf(address) == -1) {
					return;
				}
				if (type == 'qx_ddajax') {
					//判断是否放币
					// if (dq.ddifo['timb']) {
					//     alert('The order cannot be cancelled');
					//     return;
					// }
					console.log('订单不能取消')
					qx_ddajax();
				}
				if (type == 'fk_ddajax') {
					if (dq.ddifo['timb']) {
						alert('此订单无法付款');
						// alert('This order cannot be paid');
						return;
					}
					fk_ddajax();
				}
				if (type == 'zt_ddajax') {
					zt_ddajax(c);
				}
				if (type == 'tq_ddajax') {
					tq_ddajax();
				}
				if (type == 'sf_ddajax') {
					if (dq.ddifo['agree'] == 3 || (dq.ddifo.pau == 0 && dq.ddifo.timc != 0)) {
						sf_ddajax();
					} else {
						alert('Cannot click');
					}
				}
				if (type == 'fb_ddajax') {
					fb_ddajax();
				}

				function qx_ddajax() {
					dotsconn.methods.releAss(dq.ddid + "").send({
						from: address
					}, (err, ret) => {
						if (ret) {
							Toast.clear();
							Toast.success('订单已取消，请稍后查看');
						} else {
							Toast.clear();
							Toast.fail('请同意授权！');
						}
					});
				}

				function fk_ddajax() {
					dotsconn.methods.paid(dq.ddid).send({
						from: address
					}, (err, ret) => {
						if (ret) {
							console.log(ret);
						} else {
							console.log('error');
						}
					});
				}

				function zt_ddajax(c) {
					//有暂停不可点击
					if (dq.ddifo['pau'] != 0) {
						return;
					}

					function mul(x, y) {
						var z = x * y;
						return z;
					}
					//判断是否可以暂停 是否需要追加保证金
					async function user_pan_is(ck) {
						var uara = await dotsconn.methods.uara().call((err, ret) => {
							return ret;
						});
						var pros = await dotsconn.methods.pros(dq.ddifo['pro'] + "").call((err, ret) => {
							return ret;
						});
						var pri = await dotsconn.methods.pri().call((err, ret) => {
							return ret;
						});

						var Uoa = 0;
						for (let index = 0; index < huobijson['huobi'].length; index++) {
							if (huobijson['huobi'][index]['key'] == dq.ddifo['pro']) {
								Uoa = Number(dq.ddifo.Uoa) * (10 ** Number(huobijson['huobi'][index]['num']));
								break;
							}
						}
						uarm = mul((mul(Uoa, Number(pros.uni)) / mul(Number(pri), Number(pros.one))), Number(uara));
						if (dq.ddifo['uma'] >= uarm / (10 ** bzj_num)) {
							ck(true);
						} else {
							ck(false, uarm);
						}
					}

					//判断是用户还是商家 买家需要判断
					/*
					    2不需要判断 
					*/
					if (c == 1) {
						user_pan_is((e, uarm) => {
							if (!e) {
								Dialog.confirm({
										title: '提升',
										message: '保证金不足，要求最低保证金‘' + (uarm / (
												10 ** bzj_num)).toFixed(2) +
											'’, 请在添加保证金后操作！',
										confirmButtonText: '追加保证金',
										cancelButtonText: '放弃'
									})
									.then(() => {
										mar_add();
									})
									.catch(() => {
										// on cancel
									});
							} else {
								user_pan();
							}
						});
					} else {
						user_pan();
					}

					//操作
					function user_pan() {
						dotsconn.methods.pauseMar(dq.ddid).send({
							from: address
						}, (err, ret) => {
							if (ret) {
								Toast.clear();
								Toast.success('订单已暂停，请稍后查看');
							} else {
								Toast.clear();
								Toast.fail('请同意授权！');
							}
						});
					}

					function mar_add() {
						dotsconn.methods.addMar(dq.ddid, dq.getFNum(uarm)).send({
							from: address
						}, (err, ret) => {
							if (ret) {
								Toast.clear();
								Toast.success('押金已经增加，请稍后再查');
							} else {
								Toast.clear();
								Toast.fail('请同意授权！');
							}
						});
					}
				}

				function tq_ddajax() {
					dotsconn.methods.aheadMar(dq.ddid).send({
						from: address
					}, (err, ret) => {
						if (ret) {
							Toast.clear();
							Toast.success('同意保证金发放，请稍后查看');
						} else {
							Toast.clear();
							Toast.fail('请同意授权！');
						}
					});
				}

				function sf_ddajax() {
					dotsconn.methods.releMar(dq.ddid).send({
						from: address
					}, (err, ret) => {
						if (ret) {
							Toast.clear();
							Toast.success('押金已经释放了。请稍后再查');
						} else {
							Toast.clear();
							Toast.fail('请同意授权！');
						}
					});
				}

				function fb_ddajax() {
					dotsconn.methods.releAss(dq.ddid + "").send({
						from: address
					}, (err, ret) => {
						if (ret) {
							Toast.clear();
							Toast.success('资产已被释放。请稍后再查');
						} else {
							Toast.clear();
							Toast.fail('请同意授权！');
						}
					});
				}
			},

			onClickLeft() {
				this.$router.go(-1);
			},
			openurl(url) {
				this.$router.push({
					name: 'arbitrationRoll'
				});
			},

			//按钮状态
			anarr(tcode, code, i) {
				var ddinfo = this.ddifo;
				if (tcode == 'qx_ddajax') {
					if (ddinfo['release'] == 0 && ddinfo['timc'] == 0) {
						return false;
					} else {
						return true;
					}
				}
				if (tcode == 'zt_ddajax') {
					if (ddinfo['release'] != 0 || ddinfo['pau'] != 0 || ddinfo['agree'] == 3) {
						return true;
					} else {
						//没有放币  并且 没有付款 显示 
						return false;
					}
				}
				if (tcode == 'fb_ddajax') {
					if (ddinfo['release'] == 0 && ddinfo['timc'] == 0) {
						return false;
					} else {
						return true;
					}
				}
				if (tcode == 'tq_ddajax') {
					console.log(code)

					if (ddinfo['time'] != 0) {
						return true;
					} else {
						//我是否点击了 

						if (code == 'Madd') {
							//商家
							if (ddinfo['agree'] == 2 || ddinfo['agree'] == 3) {
								return true;
							} else {
								return false;
							}
						} else {
							//用户
							console.log(ddinfo['agree'])
							if (ddinfo['agree'] == 1 || ddinfo['agree'] == 3) {
								return true;
							} else {
								return false;
							}
						}
					}
				}
				if (tcode == 'sf_ddajax') {
					//双方都没有点击
					if (ddinfo['agree'] == 3) {
						if (ddinfo['time'] != 0) {
							return true;
						} else {
							return false;
						}
					} else {
						return true;
					}
				}

				if (tcode == 'ss_ddajax') {
					if ((ddinfo['release'] == 0 && ddinfo['timc'] == 0) || ddinfo['time'] == 0) {
						return false;
					} else {
						return true;
					}
				}
			},
			lowerCase(str) {
				let arr = str.split("");
				let newStr = "";
				//通过for循环遍历数组
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] >= 'A' && arr[i] <= 'Z')
						newStr += arr[i].toLowerCase();
					else
						newStr += arr[i];
				}
				return newStr;
			}
		}
	}
</script>
