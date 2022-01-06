<template>
	<el-container>
		<!-- pc -->
		<div class="hidden-sm-and-down" style="width: 100%;">
			<el-table :data="del_list" style="width: 100%">
				<el-table-column align="center" fixed prop="did" :label="$t('message.arbitration.orderId')">
				</el-table-column>
				<el-table-column align="center" prop="mad_b" :label="$t('message.arbitration.merchant')">
				</el-table-column>
				<el-table-column align="center" prop="uad_b" :label="$t('message.arbitration.user')"> </el-table-column>
			 <el-table-column align="center" prop="uoa" :label="$t('message.arbitration.assetsNum')">
					<template slot-scope="scope">
						<div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
					</template>
				</el-table-column>
				<el-table-column align="center" prop="mma" :label="$t('message.arbitration.merchantMargin')">
					<template slot-scope="scope">
						{{ scope.row.mma }} USDT
					</template>
				</el-table-column>
				<el-table-column align="center" prop="uma" :label="$t('message.arbitration.userMargin')">
					<template slot-scope="scope">
						{{ scope.row.uma }} USDT
					</template>
				</el-table-column>
				<el-table-column :label="$t('message.arbitration.arbitrationState')">
					<template slot-scope="scope">
						<div v-if="scope.row.timc == 0">Not registered</div>
						<div v-if="scope.row.timc != 0 && scope.row.timd == 0">{{$t('message.arbitration.signing')}}
						</div>

						<div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">
							{{$t('message.arbitration.voteing')}}</div>
						<div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">
							{{$t('message.arbitration.waiting')}}</div>

						<div v-if="scope.row.finish != 0">{{$t('message.arbitration.executed')}}</div>

					</template>
				</el-table-column>
				<!-- <el-table-column align="center" :label="$t('message.arbitration.countdown')">
					<template slot-scope="scope">
						<div v-if="scope.row.timc != 0 && scope.row.timd == 0">
							<van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
						</div>
						<div v-if="scope.row.timd != 0 && scope.row.time == 0">
							<van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
						</div>
						<div v-if="scope.row.time != 0 && scope.row.finish == 0">
							<van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
						</div>
					</template>
				</el-table-column> -->
				<el-table-column align="center" :label="$t('message.operation')">
					<template slot-scope="scope">
						<!-- v-if="options_value_b == 0" -->
						<div>
							<el-button :disabled="(scope.row.timc == 0 ? false:(scope.row.timc != 0 && scope.row.timd == 0) ? false:true)" 
							:class="[(scope.row.timc == 0 ? 'favorBtn':(scope.row.timc != 0 && scope.row.timd == 0) ? 'favorBtn':'')]" size="mini" @click="derlunbaomingajax(scope.row)">
								{{$t('message.arbitration.singUp')}}</el-button>
						</div>
						<!-- <div v-if="options_value_b == 1">
					  <el-button size="mini" @click="openqb('openzcgl')">{{$t('message.details')}}</el-button>
					</div> -->
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
		<div class="hidden-sm-and-up" style="width: 100%;">
			<div class="list_nav">
				<div v-if="del_list.length<1" class="fc a_c">
					<div style="padding-top: 20px;">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p :style="{'marginTop': '23px'}">{{$t('message.NoData')}}</p>
				</div>
				<div class="list_item" v-for="(item,index) in del_list" :key="index">
					<div class="f" style="width: 100%;">
						<div class="fc a_c c_b" style="width: 50px;padding-top: 5px;">
							<span class="fwb">{{$t('message.arbitration.orderId')}}</span>
							<span class="fwb mart-10" style="font-size: 28px;">{{item.did}}</span>
							<span></span>
						</div>
						<div style="width: 100%;">
							<div class="f c_b top_first"
								style="padding-bottom: 10px;border-bottom: 2px solid #DCDCDC;padding-top: 6px;">
								<div class="fc a_c c_b marr-5 marl-5">
									<span class="fwb">{{$t('message.arbitration.merchant')}}</span>
									<span class="mart-10">{{ item.mad_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.user')}}</span>
									<span class="mart-10">{{ item.uad_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.assetsNum')}}</span>
									<span class="mart-10">{{ item.uoa }} - {{ item.pro }}</span>
								</div>
							</div>
							<div class="f c_b top_two" style="padding: 10px;">
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.merchantMargin')}}</span>
									<span class="mart-10">{{ item.mma }} USDT</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.userMargin')}}</span>
									<span class="mart-10">{{ item.uma }} USDT</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.arbitrationState')}}</span>
									<div v-if="item.timc == 0">Not registered</div>
									<div v-if="item.timc != 0 && item.timd == 0">{{$t('message.arbitration.signing')}}
									</div>

									<div v-if="item.timd != 0 && item.time == 0 && item.timc != 0">
										{{$t('message.arbitration.voteing')}}</div>
									<div v-if="item.time != 0 && item.finish == 0 && item.timc != 0">
										{{$t('message.arbitration.waiting')}}</div>

									<div v-if="item.finish != 0">{{$t('message.arbitration.executed')}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="f c_b a_c" style="padding: 10px 20px;">
						<van-count-down :time="item.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
						<el-button :disabled="(item.timc == 0 ? false:(item.timc != 0 && item.timd == 0) ? false:true)"
						 :class="[(item.timc == 0 ? 'favorBtn':(item.timc != 0 && item.timd == 0) ? 'favorBtn':'')]" size="mini" @click="derlunbaomingajax(item)">{{$t('message.arbitration.singUp')}}
						</el-button>
					</div>
				</div>
			</div>
		</div>
		
		<el-dialog :title="$t('message.arbitration.secondDetail')" class="listType" :visible.sync="deldata['dialogcode']" width=350px>
		  <div>
		    <p>
		      {{$t('message.arbitration.account')}}：<span>{{  deldata.myuser.user }}</span>
		    </p>
		    <p>
		      {{$t('message.arbitration.nickName')}}：<span>{{  deldata.myuser.name }}</span>
		    </p>
		    <p>
		      {{$t('message.arbitration.idNum')}}：<span>{{ deldata.data.did }}</span>
		    </p>
		    <div>
		      <p>{{$t('message.arbitration.orderDetail')}}</p>
		      <ul class="list-number">
		        <li>{{$t('message.arbitration.merchant')}}：{{deldata.data.mad_b}}</li>	
		        <li>{{$t('message.arbitration.userAccount')}}：{{deldata.data.uad_b}}</li>
		        <li>{{$t('message.arbitration.asset')}}：{{deldata.data.uoa}} {{ deldata.data.pro }}</li>
		        <li>{{$t('message.arbitration.merMargin')}}：{{deldata.data.uma}} USDT</li>
		        <li>{{$t('message.arbitration.userMargin')}}：{{deldata.data.mma}} USDT</li>
		      </ul>
		    </div>
		    <p>{{$t('message.arbitration.arbitrators1')}}：<span>{{deldata.Arbs.aid}} / {{deldata.renshunum}}</span></p>
		    <p>{{$t('message.arbitration.countDown')}}：<span><van-count-down :time="deldata.data.djs_val" :format="'DD'+$t('message.day')+'HH'+$t('message.hour')+'mm'+$t('message.minute')+'ss'+$t('message.second')" /></span></p>
		    <div>
		      <p>{{$t('message.arbitration.arbitratorsList')}}</p>
		      <ul class="list-number">
		        <li v-for="(li,index) in deldata['Uarr']" :key="index">{{li}}</li>
		      </ul>
		    </div>
		    <p v-if="deldata.ubmcode">{{$t('message.arbitration.entered')}}</p>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="kaishibaomingajax" :disabled="deldata.ubmcode" :loading="deldata.loading">{{$t('message.arbitration.apply')}}</el-button>
		  </span>
		</el-dialog>

	</el-container>
</template>

<script>
	//新版配置 模块化
	import config from "@/config";

	//数据MODEL
	import ZcDylList from "@/conn/zc/ZcDylList.json";
	import deldata from "./zhongcai.json";

	import ZcModel from "@/conn/zc/ZcinfoModel.json";
	import ZcDelList from "@/conn/zc/ZcDelList.json";

	var bzjnum = config['hyue'][config['key']]['Bzj']['num'];
	//模块
	let Base64 = require('js-base64').Base64;
	import tools from '@/api/public.js'
	import Web3 from "web3";
	import {
		Dialog,
		Toast
	} from 'vant';
	var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;

	function Lettertolowercase(值) {
		var 需要返回的值 = 值.toLowerCase();
		return 需要返回的值;
	}

	export default {
		data() {
			return {
				del_list: [],
				towLeveThree: [{
						value: "1",
						text: this.$t('message.arbitration.signing')
					},
					{
						value: "2",
						text: this.$t('message.arbitration.voteing')
					},
					{
						value: "3",
						text: this.$t('message.arbitration.waiting')
					},
					{
						value: "4",
						text: this.$t('message.arbitration.executed')
					},
				],
				formLabelWidth: '150px',
				dyl_zc: {
				 code: false,
					my_user: '',
					my_name: '',
					did: '',
					byqf: '',
					zccode: '',
					zc_user: '',
					ddifno: {
						uoa: '',
						uma: '',
						mma: '',
						uad: '',
						mad: ''
					},
					zcinfo: ZcModel
				},
				deldata: deldata,
			}
		},
		created() {
			var dq = this;
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				ArbOne = new web3.eth.Contract(
					config['hyue'][config['key']]['ArbOne']['abi'],
						config['hyue'][config['key']]['ArbOne']['heyue']
					);
					ArbTwo = new web3.eth.Contract(
						config['hyue'][config['key']]['arbTwo']['abi'],
						config['hyue'][config['key']]['arbTwo']['heyue']
					);
				// 	GazConn = new web3.eth.Contract(
				// 		config['hyue'][config['key']]['gaz']['abi'],
				// 		config['hyue'][config['key']]['gaz']['heyue']
				// );
				// Dotc = new web3.eth.Contract(
				// 		config['hyue'][config['key']]['dotc']['abi'],
				// 		config['hyue'][config['key']]['dotc']['heyue']
				// 	);
				// 	Arbdate = new web3.eth.Contract(
				// 		config['hyue'][config['key']]['Arbdate']['abi'],
				// 		config['hyue'][config['key']]['Arbdate']['heyue']
				// 	);
					dq.getList()
					dq.user = address.toLowerCase();
			}).catch((err)=>{
				web3 = new Web3(config['hyue'][config['key']]['Url']);
				ArbOne = new web3.eth.Contract(
				config['hyue'][config['key']]['ArbOne']['abi'],
					config['hyue'][config['key']]['ArbOne']['heyue']
				);
				ArbTwo = new web3.eth.Contract(
					config['hyue'][config['key']]['arbTwo']['abi'],
					config['hyue'][config['key']]['arbTwo']['heyue']
				);
				dq.getList()
				console.log(err);
			})
		},
		methods: {
			openqb(e) {
				// this.wapcd = false;
				this.$router.push(e);
			},
			//第二轮仲裁结果
			async getList() {
				var num = 25;
				var dq = this;
				//读取时间
				var Timc = await ArbTwo.methods.Timc().call((err, ret) => {
					return Number(ret);
				});
				var Timd = await ArbTwo.methods.Timd().call((err, ret) => {
					return Number(ret);
				});
				var Time = await ArbTwo.methods.Timd().call((err, ret) => {
					return Number(ret);
				});
				var dqtime = Math.round(new Date() / 1000);
			 ArbOne.methods.list_arbtwo(num).call((err, ret) => {
					if (ret) {
						if (ret[0].length > 0) {
							var list = [];
							var infoarr = ret[0];
							var typearr = ret[1];
							var userarr = ret[2];
							for (let index = 0; index < infoarr.length; index++) {
								var zc_num = '';
								var zc_id = '';
								var huobiarr = config['hbi'][config['key']];
								for (const key in huobiarr) {
									if (typearr[index][0] == huobiarr[key]['key']) {
										zc_id = huobiarr[key]['id'];
										zc_num = Number(huobiarr[key]['num']);
										break;
									}
								}
			 				var obj = {};
								for (const key in ZcDelList) {
									obj[key] = ZcDelList[key];
								}
								obj['did'] = Number(infoarr[index][0]);
								obj['uoa'] = (Number(infoarr[index][1]) / (10 ** zc_num)).toFixed(2);
								obj['uma'] = (Number(infoarr[index][2]) / (10 ** bzjnum)).toFixed(2);
								obj['mma'] = (Number(infoarr[index][3]) / (10 ** bzjnum)).toFixed(2);
								obj['timc'] = Number(infoarr[index][4]);
								obj['timd'] = Number(infoarr[index][5]);
								obj['time'] = Number(infoarr[index][6]);
								obj['finish'] = Number(infoarr[index][7]);

								obj['pro'] = zc_id;
								obj['mark'] = typearr[index][1];

								obj['uad'] = userarr[index][0];
								obj['mad'] = userarr[index][1];

								var uad_b = userarr[index][0].substring(0, 5) + "····" + userarr[index][0]
									.substring(userarr[index][0].length - 5, userarr[index][0].length);
								var mad_b = userarr[index][1].substring(0, 5) + "····" + userarr[index][1]
									.substring(userarr[index][1].length - 5, userarr[index][1].length);
								obj['uad_b'] = uad_b;
								obj['mad_b'] = mad_b;


								obj['Timed'] = Number(Timd);
								obj['Timec'] = Number(Timc);
								obj['Timee'] = Number(Time);

								//倒计时获取
								if (obj['timc'] != 0 && obj['timd'] == 0) {
									obj['djs_val'] = ((obj['timc'] + obj['Timec']) - dqtime) * 1000;
								}
								if (obj['timd'] != 0 && obj['time'] == 0) {
									obj['djs_val'] = ((obj['timd'] + obj['Timed']) - dqtime) * 1000;
								}
								if (obj['time'] != 0 && obj['finish'] == 0) {
									obj['djs_val'] = ((obj['time'] + obj['Timee']) - dqtime) * 1000;
			
				}

								list.push(obj);
							}
			  		dq.del_list = list;
							console.log(this.del_list);
						}
					}
				});
			},
			//赞成提交
			agree() {
				ArbOne.methods.arbAsse(this.dyl_zc.did + "", this.dyl_zc.what + "").send({
					from: address
				}, (err, ret) => {
			 	console.log(ret);
				});
			},
			// 执行
			async zhixingajax() {
				// exAss 先查询user what
				var user = await ArbOne.methods.user(this.dyl_zc['did'] + "").call();
				ArbOne.methods.exAss(this.dyl_zc['did'] + "", user['what']).send({
					from: address
				}, (err, ret) => {
					if (ret) {
						Toast.clear();
						Toast.success(this.$t('message.arbitration.arbitrationPerformed'));
					} else {
						Toast.clear();
						Toast.fail(this.$t('message.wallet.submit1'));
					}
			 });
			},

			filterTag() {},

			// 获取详情
			async open_dylzc(rows, openc) {
				var row = {};
				for (const key in rows) {
					row[key] = rows[key];
				}
				if (openc == 2) {
					console.log(rows);
					row['can_user'] = '';
					row['what'] = rows['what'];
					row['did'] = rows['did'];
					row['u_user'] = rows['uad'];
					row['m_user'] = rows['mad'];
					row['mma'] = rows['mma'];
					row['uma'] = rows['uma'];
					row['uoa'] = rows['uoa'];
				}
				//获取我的名称
				var uname = await ArbOne.methods.message(address, 0 + "").call();
				var zcy_user = await ArbOne.methods.ama(row.did + "", row['what'] + "", 0).call();
				var zc_info = await ArbOne.methods.arbwhat(row.did + "", row['what'] + "").call();
				var Tima = await ArbOne.methods.Tima().call();
				var dqtime = Math.round(new Date() / 1000);
				var ZcModela = ZcModel;
				ZcModela['uadd'] = zc_info[0];
				ZcModela['madd'] = zc_info[1];
				ZcModela['tima'] = zc_info[2][0];
				ZcModela['arb'] = zc_info[2][1];
				ZcModela['execone'] = zc_info[2][2];
				var ztitle = '';
			 if (row.m_user == row.can_user) {
			  ztitle = 'business';
				} else if (row.u_user == row.can_user) {
			  ztitle = 'user';
				}
			 //倒计时计算
				if (Number(ZcModela['tima']) != 0) {
					if ((Number(ZcModela['tima']) + Number(Tima)) >= dqtime) {
						//倒计时
						ZcModela['djs_val'] = ((Number(ZcModela['tima']) + Number(Tima)) - dqtime) * 1000;
					} else {
						ZcModela['djs_val'] = 1.1;
					}
				}
				var arber = await ArbOne.methods.arber(address + "").call();
				var peg = await ArbOne.methods.peg().call();
				var lock = await ArbOne.methods.lock(address + "").call();
				var balanceMar = await ArbOne.methods.balanceMar(address + "").call();
				if (ZcModela['madd'] == '0x0000000000000000000000000000000000000000') {
					ZcModela['madd'] = '';
				}
				if (ZcModela['uadd'] == '0x0000000000000000000000000000000000000000') {
					ZcModela['uadd'] = '';
			 }
				//时间大于当前时间
				if (((Number(ZcModela['tima']) + Number(Tima)) > dqtime) || Number(ZcModela['tima']) == 0) {
					//获取被邀请方
					if (row.m_user == row.can_user) {
						//business
						if (!ZcModela['madd']) {
							if (Number(arber) <= Number(peg) && lock == 0 && balanceMar >= (row['mma'] * (10 **
									bzjnum))) {
								ZcModela['an_code'] = false;
							} else {
								ZcModela['an_code'] = true;
							}
						}
					} else if (row.u_user == row.can_user) {
						//user
						if (!ZcModela['uadd']) {
							if (Number(arber) <= Number(peg) && lock == 0 && balanceMar >= (row['mma'] * (10 **
									bzjnum))) {
								ZcModela['an_code'] = false;
							} else {
								ZcModela['an_code'] = true;
							}
						}
					}
				}
				var zhixingcode = true;
				//执行按钮状态
			 console.log(ZcModela['arb']);
				if (ZcModela['arb'] == 1 || ZcModela['arb'] == 2) {
					//仲裁时间已结束
					if ((Number(ZcModela['tima']) + Number(Tima)) <= dqtime) {
						if (ZcModela['execone'] == 0) {
							zhixingcode = false;
						} else {
							zhixingcode = true;
						}
					} else {
						zhixingcode = true;
					}
				}
				this.dyl_zc = {
			 	code: true,
					my_user: address,
					my_name: uname ? Base64.decode(uname) : 'Not filled in yet',
					did: row.did,
					byqf: ztitle,
					what: row['what'],
					zccode: false,
					zc_user: zcy_user,
					ddifno: {
						uoa: Number(row.uoa) + '' + row.pro,
						uma: Number(row.uma),
						mma: Number(row.mma),
						uad: row.u_user,
						mad: row.m_user
					},
					zhixingcode: zhixingcode,
					zcinfo: ZcModela
				};
				console.log(this.dyl_zc);
			},


			async webinit() {
				var dq = this
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
					ArbOne = new web3.eth.Contract(
			 		config['hyue'][config['key']]['ArbOne']['abi'],
						config['hyue'][config['key']]['ArbOne']['heyue']
					);
					ArbTwo = new web3.eth.Contract(
						config['hyue'][config['key']]['arbTwo']['abi'],
						config['hyue'][config['key']]['arbTwo']['heyue']
					);
					GazConn = new web3.eth.Contract(
						config['hyue'][config['key']]['gaz']['abi'],
						config['hyue'][config['key']]['gaz']['heyue']
			 	);
			 	Dotc = new web3.eth.Contract(
						config['hyue'][config['key']]['dotc']['abi'],
						config['hyue'][config['key']]['dotc']['heyue']
					);
					Arbdate = new web3.eth.Contract(
						config['hyue'][config['key']]['Arbdate']['abi'],
						config['hyue'][config['key']]['Arbdate']['heyue']
					);
					dq.getList()
					dq.user = address.toLowerCase();
			 	dq.tabindex = "3";
				}
			},

			//第二轮报名
			async derlunbaomingajax(row) {
				var Orderdetails = row;
				this.deldata['dialogcode'] = true;
				this.deldata['data'] = Orderdetails;
				var 仲裁详情 = await ArbTwo.methods.arbs(Orderdetails['did']).call();
				var user = await ArbTwo.methods.user(Orderdetails['did']).call();
				if (user.mma == 0) {
					Toast.loading({
						message: 'Order not initialized, please confirm first',
						forbidClick: true,
						loadingType: 'spinner',
					});
					inittwo();
				}
				var 报名人数列表 = await ArbTwo.methods.applySuceed(Orderdetails['did']).call();
				if (仲裁详情) {
					//查询最多人数
					var 总人数 = await ArbTwo.methods.neg().call();
					this.deldata['renshunum'] = 总人数;
					//查询我的昵称
					var add=address
					if(address.length>15){
						let star='****';
						let str=''
						str=address.substr(0,5) + star + address.substr(address.length-5);
						add=str
					}
					this.deldata['myuser']['user'] = add;
					
					var 我的名字 = await ArbOne.methods.message(address, "0").call();
					this.deldata['myuser']['name'] = 我的名字 ? Base64.decode(我的名字) : this.$t('message.arbitration.haveName');
					console.log(仲裁详情)
					this.deldata['Arbs'] = 仲裁详情;
					var 人员列表 = [];
					for (let index = 0; index < 报名人数列表[0].length; index++) {
						if (报名人数列表[0][index] != '0x0000000000000000000000000000000000000000') {
							if(报名人数列表[0][index].length>15){
								let star='****';
								let str=''
								str=报名人数列表[0][index].substr(0,5) + star + 报名人数列表[0][index].substr(报名人数列表[0][index].length-5);
								人员列表.push(str);
							}else{
								人员列表.push(报名人数列表[0][index]);
							}
						}
					}
					var 查询我是否报名 = Lettertolowercase(JSON.stringify(人员列表));
							console.log(人员列表)
					if (查询我是否报名.indexOf(address) != -1) {
						this.deldata['ubmcode'] = true;
					}
					this.deldata['Uarr'] = 人员列表;
						console.log(this.deldata['Uarr'])
					
				} else {
					this.deldata['dialogcode'] = false;
				}

				async function inittwo() {
					ArbTwo.methods.init(Orderdetails['did']).send({
						from: address
					}, (err, ret) => {
						if (ret) {
							Toast.clear();
							Toast.success(this.$t('message.arbitration.orderInit'));
						} else {
							Toast.clear();
							Toast.fail(this.$t('message.wallet.submit1'));
						}
					});
				}
			},
			
			//第二轮报名提交
			async kaishibaomingajax(){
			  var dq = this;
			  dq.deldata.loading = true;
			  var arber = await ArbOne.methods.arber(address).call();
			  var peg = await ArbOne.methods.peg().call();
			  var lock = await ArbOne.methods.lock(address).call();
			  var balanceMar = await ArbOne.methods.balanceMar(address).call();
			  var user = await ArbOne.methods.user(dq.deldata['data']['did']).call();
			  console.log(user)
			  if (this.deldata['Arbs']['arb'] == 3 && this.deldata['Arbs']['timd'] == 0) {
			    if (Number(arber) <= Number(peg) && lock == 0 &&  Number(balanceMar) >= Number(user.mma)) {
			      //获取加密字符串
			      var arbTwoApply = await Arbdate.methods.arbTwoApply(address,this.deldata['Arbs']['timc']).call();
			      //查询是否存在
			      var slot = await ArbTwo.methods.slot(arbTwoApply).call();
			      if (slot != 0) {
			        dq.$message.error(this.$t('message.arbitration.enrolledSuccess'));
			        return;
			      }
			
			      ArbTwo.methods.arbTwoApply(this.deldata['data']['did']).send({from:address},(err,ret)=>{
			        if (ret) {
			          bmlxsql();
			        }else{
			          dq.deldata.loading = false;
			          dq.$message.error(this.$t('message.arbitration.clickOk'));
			        }
			      });
			    }else{
			      dq.deldata.loading = false;
			      this.$message.error(this.$t('message.arbitration.failed'));
			    }
			    
			  }else{
			    dq.deldata.loading = false;
			    this.$message.error(this.$t('message.arbitration.stopEnrolment'));
			  }
			  //轮询查询是否报名成功
			  async function bmlxsql() {
			     var bmarr = await ArbTwo.methods.applySuceed(dq.deldata['data']['did']).call();
			     var JSONS = 字母转小写(JSON.stringify(bmarr));
			     if (JSONS.indexOf(address) != -1) {
			        dq.$message({
			          showClose: true,
			          message: this.$t('message.arbitration.enrolledSuccess')
			        });
			        dq.deldata.loading = false;
			        dq.deldata['ubmcode'] = true;
			     }else{
			       setTimeout(() => {
			         bmlxsql();
			       }, 3000);
			     }
			  }
			}
		}
	}
</script>

<style scoped="scoped">
	div>>>.el-dialog__header {
		background-color: #FDC500;
	}

	div>>>.el-dialog__title {
		color: #fff;
		font-size: 28px;
	}

	div>>>.el-form-item {
		margin-bottom: 20px;
	}

	div>>>.el-dialog--center .el-dialog__body {
		padding: 25px 50px 0;
	}

	div>>>.el-form--label-left .el-form-item__label {
		line-height: 180%;
	}

	div>>>.el-form-item__content {
		line-height: 180%;
	}

	.invitationBnt {
		color: #fff;
		border: none;
		width: 26%;
	}

	.favorBtn {
		background-color: #fdd62c;
	}

	.implementBtn {
		background-color: #489cfe;
	}


	.list_nav {
		font-size: 12px;
		margin-top: 20px;
	}

	.list_item {
		padding: 5px 10px 5px 10px;
		box-shadow: 0 0 5px 0.1rem #dcdcdc;
		margin-top: 10px;
		border-radius: 4px;
	}

	.top_first {
		position: relative;
	}

	.top_first:before {
		content: "";
		position: absolute;
		left: 0px;
		bottom: 0;
		width: 2px;
		height: 50%;
		background-color: #DCDCDC
	}

	.top_two {
		position: relative;
	}

	.top_two:before {
		content: "";
		position: absolute;
		left: 0px;
		top: 0;
		width: 2px;
		height: 50%;
		background-color: #DCDCDC
	}
	.listType{
		line-height: 1.5625rem;
	}
</style>
