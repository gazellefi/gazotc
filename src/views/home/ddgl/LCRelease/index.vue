<template>
	<div class="ddgl_fabu">
		<!-- PC -->
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
						<span>{{ $t("message.dapp.type")}}：</span>

						<el-dropdown class="ddlistaa_head_item" @command="saixuantcode">
							<span class="el-dropdown-link">
								{{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? $t('message.dapp.sell'):$t('message.dapp.buy') }} <i
									class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
								<el-dropdown-item command="C">{{$t('message.dapp.sell')}}</el-dropdown-item>
								<el-dropdown-item command="M">{{$t('message.dapp.buy')}}</el-dropdown-item>
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
			<div class="">
				<el-table :data="list" stripe style="width: 100%">
					<el-table-column align="center" prop="ddid" :label="$t('message.arbitration.orderId')" width="100px"> </el-table-column>
					<el-table-column align="center" prop="pro" :label="$t('message.dapp.type')"></el-table-column>
					<el-table-column align="center" prop="Mmark" :label="$t('message.dapp.orderType')">
						<template slot-scope="scope">
							<span>{{ scope.row.Mmark =='for sale' ? $t("message.dapp.sell") : $t("message.dapp.buy") }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.dapp.amount')">
						<template slot-scope="scope">
							{{ scope.row.Moa }} {{ scope.row.pro }}
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.dapp.limit')">
						<template slot-scope="scope">
							{{ scope.row.zer }} - {{ scope.row.mal }} {{ scope.row.pro }}
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.dapp.unitPrice')">
						<template slot-scope="scope">
							<span class="cba">{{ scope.row.unit }} {{ scope.row.fiat }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.dapp.MarginRatio')">
						<template slot-scope="scope">
							<span class="cba">{{ scope.row.mar }}%</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.dapp.orderStatus')">
						<template slot-scope="scope">
							<span style="color: #E6240B;">{{ scope.row.mlive == 1 ? $t('message.OnTheShelf'):$t('message.OffTheShelf') }}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t('message.operation')">
						<template slot-scope="scope">
							<van-button plain type="info" size="small" @click="pcxiugaidd(1,scope.$index)">{{$t('message.modify') }}</van-button>
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

		</div>
		<!-- WAP -->
		<div class="hidden-sm-and-up ddgl_fabu_wapview">
			<el-row style="border-bottom: 1px solid #EEEEEE;">
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
						<span>{{ $t("message.dapp.type")}}：</span>
								
						<el-dropdown class="ddlistaa_head_item" @command="saixuantcode">
							<span class="el-dropdown-link">
								{{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? $t('message.dapp.sell'):$t('message.dapp.buy') }} <i
									class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
								<el-dropdown-item command="C">{{$t('message.dapp.sell')}}</el-dropdown-item>
								<el-dropdown-item command="M">{{$t('message.dapp.buy')}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</el-col>
				<el-col :span="12" style="margin-top: 20px;padding-bottom: 10px;">
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
						<div class="f c_b a_c">
							<div class="f c_c">
								<span class="fwb">{{ item.Mmark =='for sale' ? $t("message.dapp.sell") : $t("message.dapp.buy") }}</span>
								<span class="fwb">{{item.pro}}</span>
								<div class="f c_c marty_nav">
									<span>保证金{{item.mar}}%</span>
								</div>
							</div>
						</div>
						<div class="mart-10">
							<span class="marr-10">{{$t('message.dapp.unitPrice')}}</span>
							<span class="cba">{{ item.unit }} {{ item.fiat }}</span>
						</div>
						<div class="mart-10">
							<span class="marr-10">{{$t('message.dapp.amount')}}</span>
							<span class="fz14">{{ item.Moa }} {{ item.pro }}</span>
						</div>
						<div class="mart-10">
							<span class="marr-10">{{$t('message.dapp.limit')}}</span>
							<span class="fz14">{{ item.zer }} - {{ item.mal }} {{ item.pro }}</span>
						</div>
						<div class="mart-10">
							<span class="marr-10">{{$t('message.dapp.orderStatus')}}</span>
							<span class="fz14" style="color: #E6240B;">{{ item.mlive == 1 ? $t('message.OnTheShelf'):$t('message.OffTheShelf') }}</span>
						</div>
					</div>
					<div class="fc c_b">
						<span>{{$t('message.arbitration.orderId')+' | '+ item.ddid}}</span>
						<van-button plain type="info" color="#FDC500" size="small" @click="pcxiugaidd(2,index)">{{$t('message.modify')}}</van-button>
					</div>
				</el-col>
			</el-row>
		</div>
        <myDialog  :width="type_code == 1 ? '30%':'90%'" :title="$t('message.modify')" :closeModal="false" :closePress="false" :visible.sync="pcxgcode"
		@confirm="xiugaiajax(2)" @cancel="xiugaiajax(1)">
			<el-form label-width="120px" v-model="set_form" style="padding: 20px;">
				<el-form-item  :label="$t('message.arbitration.orderId')">
					<el-input disabled v-model="set_form.ddid"></el-input>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.ModifyType')">
					<el-select v-model="set_form.tcode" :placeholder="$t('message.SelectType')">
						<el-option
							v-for="item in [{code:1,name: $t('message.dapp.ModifyPrice')},{code:2,name:$t('message.dapp.ModifiedQuantity')},{code:3,name: $t('message.dapp.ModifyOrderStatus')}]"
							:key="item.code" :label="item.name" :value="item.code">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.orderStatus')" v-if="set_form.tcode == 3">
					<el-button>{{ set_form.mlive == 1 ? $t('message.OnTheShelf'):$t('message.OffTheShelf') }}</el-button>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.amount')" v-if="set_form.tcode == 2">
					<el-input v-model="set_form.num"></el-input>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.unitPrice')" v-if="set_form.tcode == 1">
					<el-input v-model="set_form.danjia"></el-input>
				</el-form-item>
				<el-form-item  v-if="set_form.tcode == 1">
					<span>{{$t('message.dapp.preiceDes')}}</span>
				</el-form-item>
			</el-form>
		</myDialog>
	</div>
</template>
<script>
	import Web3 from "web3"
	import Web3Modal from "web3modal"
	let Base64 = require('js-base64').Base64;
	import {
		Toast
	} from 'vant';


	import config from "@/config";
	var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
	var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
	var huobi = {
		huobi: [],
		fabi: []
	};
	var harr = config['hbi'][config['key']];
	var fbarr = config['fabi'][config['key']];
	for (const key in harr) {
		huobi['huobi'].push({
			id: harr[key]['id'],
			key: harr[key]['key'],
			num: harr[key]['num']
		});
	}
	for (const key in fbarr) {
		huobi['fabi'].push({
			id: fbarr[key]['id'],
			key: fbarr[key]['key']
		});
	}

	//公共变量
	var web3 = "";
	var ethereum = window.ethereum;
	var Address = '';

	export default {
		//初始化WEB3
		created() {
			var dq = this;
			//监测用户是否安装MASK
			if (typeof ethereum === 'undefined') {
				alert('Please install the metamask plug-in first');
			} else {
				//初始化
				webinit();
			}
			Toast.setDefaultOptions('loading', {
				overlay: true,
				forbidClick: true,
				closeOnClick: false,
				closeOnClickOverlay: false,
				duration: 0,
				getContainer: 'body'
			});
			async function webinit() {
				const providerOptions = {
					/* See Provider Options Section */
				};
				const web3Modal = new Web3Modal({
					network: "mainnet",
					cacheProvider: true,
					providerOptions
				});
				var provider = await web3Modal.connect();
				web3 = new Web3(provider);
				if (web3 && provider) {
					// var wlcode = window.ethereum.networkVersion;
					// if (window.ethereum.isImToken && wlcode != 1) {
					//     web3.setProvider(config["hyue"][config["key"]]["Url"]);
					// }
					// if (window.ethereum.isMetaMask && wlcode != 4) {
					//     web3.setProvider(config["hyue"][config["key"]]["Url"]);
					// }
					Address = provider.selectedAddress;
					dq.getuinfo(Address);
					dq.getlist();
				}
			}
		},
		data() {
			return {
				// 出售弹框
				pcxgcode: false,
				type_code: 1,
				xgindex: 0,
				value1: false,
				set_form: {
					ddid: 0,
					num: 0,
					danjia: 0,
					mlive: 0,
					tcode: 1,
					obj: {}
				},


				list: [],
				list_to: [],

				uinfo: {
					quan: '',
					user: '',
					user_u: '',
					username: ''
				},

				sxarr: {
					pro: "ALL",
					fli: "ALL",
					tcode: "ALL"
				}
			}
		},
		watch: {
			'sxarr.pro'(e) {
				this.getsxlist(e, this.sxarr['fli'], this.sxarr['tcode']);
			},
			'sxarr.fli'(e) {
				this.getsxlist(this.sxarr['pro'], e, this.sxarr['tcode']);
			},
			'sxarr.tcode'(e) {
				this.getsxlist(this.sxarr['pro'], this.sxarr['fli'], e);
			}
		},
		methods: {
			openfabu() {
				this.$router.push('./');
			},
			saixuanpro(e) {
				this.sxarr.pro = e;
			},
			saixuanfli(e) {
				this.sxarr.fli = e;

			},
			saixuantcode(e) {
				this.sxarr.tcode = e;
			},
			pcxiugaidd(c, index) {
				this.pcxgcode = true;
				this.type_code = c;
				this.xgindex = index;
				this.set_form = {
				  ddid: this.list[index]['ddid'],
				  num: this.list[index]['Moa'],
				  danjia: this.list[index]['unit'],
				  mlive: this.list[index]['mlive'],
				  obj: this.list[index]
				};

			},
			xiugaiajax(c) {
				var dq = this;
				if (c == 1) {
					this.pcxgcode = false;
					this.xgindex = 0;
					this.set_form = {
						ddid: 0,
						num: 0,
						danjia: 0,
						mlive: 0,
						tcode: 0,
						obj: {}
					};
				} else {
					if (this.set_form['tcode'] == 1) {
						//Unit Price 不用判断
						set_modify_unit();
					} else if (this.set_form['tcode'] == 2) {
						//quantity 需要判断
						if (dq.set_form['num'] == dq.set_form['obj']['Moa']) {
							return;
						}
						if (dq.set_form['obj']['Umark'] ==
							'0x73616c6500000000000000000000000000000000000000000000000000000000') {
							//sell 需要判断
							getusdt(dq.set_form['obj']['pro'], dq.uinfo['user'], (ret) => {
								if (ret < (Number(dq.set_form['num']) - Number(dq.set_form['obj']['Moa']))) {
									dq.pcxgcode = false;
									Toast.fail(dq.set_form['obj']['pro'] + 'Sorry, your credit is running low!');
									return;
								} else {
									set_modify_moa();
								}
							});
						} else {
							set_modify_moa();
						}
					} else if (this.set_form['tcode'] == 3) {
						set_mlive();
					}

				}


				function getusdt(key, user, ck) {
					var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
					var key_hy = '';
					var key_num = '';
					for (let index = 0; index < huobi['huobi'].length; index++) {
						if (key == huobi['huobi'][index]['id']) {
							key_hy = huobi['huobi'][index]['hyue'];
							key_num = huobi['huobi'][index]['num'];
							break;
						}
					}
					dotsconn.methods.balancepro(user, key_hy).call((err, ret) => {
						if (ret) {
							var balancepro = Number(ret) / (10 ** key_num);
							ck(balancepro);
						}
					});
				}
				//修改订单状态
				function set_mlive() {
					dq.pcxgcode = false;
					Toast.loading({
						message: '正在进行修改请求。。。'
					});
					var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
					contracts.methods.cageMlive(Number(dq.set_form['obj']['ddid'])).send({
						from: dq.uinfo['user']
					}, (err, ret) => {
						Toast.clear();
						if (ret) {
							Toast.success('修改请求已提交！');
						} else {
							Toast.fail('请点击同意授权！');
						}
					});
				}
				//Modify unit price
				function set_modify_unit() {
					dq.pcxgcode = false;
					Toast.loading({
						message: '正在进行修改请求。。。'
					});
					var danjia = Number(dq.set_form['danjia']) * 100;
					console.log(danjia)
					var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
					contracts.methods.modify_unit(Number(dq.set_form['obj']['ddid']), Number(danjia)).send({
						from: dq.uinfo['user']
					}, (err, ret) => {
						Toast.clear();
						if (ret) {
							Toast.success('修改请求已提交！');
						} else {
							Toast.fail('请点击同意授权！');
						}
					});
				}
				//Modified quantity
				function set_modify_moa() {
					dq.pcxgcode = false;
					Toast.loading({
						message: '正在进行修改请求。。。'
					});
					var key_num = 0;
					var set_num = 0;
					for (let index = 0; index < huobi['huobi'].length; index++) {
						if (dq.set_form['obj']['pro'] == huobi['huobi'][index]['id']) {
							key_num = huobi['huobi'][index]['num'];
							break;
						}
					}
					var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
					if (key_num >= 18) {
						set_num = dq.getFNum(Number(dq.set_form['num']) * (10 ** key_num));
					} else {
						set_num = Number(dq.set_form['num']) * (10 ** key_num);
					}
					contracts.methods.modify_moa(Number(dq.set_form['obj']['ddid']), set_num + "").send({
						from: dq.uinfo['user']
					}, (err, ret) => {
						Toast.clear();
						if (ret) {
							Toast.success('修改请求已提交！');
						} else {
							Toast.fail('请点击同意授权！');
						}
					});
				}
			},
			getuinfo(Address) {
				this.uinfo['user'] = Address;
				this.uinfo['user_u'] = Address.substr(0, 5) + "...." + Address.substr(Address.length - 5, Address.length);
				// var dq = this;
				// var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
				// contracts.methods.message(Address + "", "0").call((err, result) => {
				// 	if (result) {
				// 		var jiename = Base64.decode(result);
				// 		dq.uinfo['quan'] = jiename.substr(0, 1);
				// 		dq.uinfo['username'] = jiename;
				// 	}
				// });
			},
			getsxlist(e, e1, e2) {
				// var array = [];
				// var list = [];
				if (e == 'ALL' && e1 == "ALL" && e2 == "ALL") {
					this.list = this.list_to;
				} else {
					// var e2key = 'ALL';
					// if (e2 == 'M') {
					//     e2key = 'purchase';
					// }else if (e2 == 'C') {
					//     e2key = 'for sale';
					// }
					// this.list = this.list_to.filter(
					//     function(item) {
					//         console.log('=====');
					//         return e != "ALL" ? item['pro'] == e:'';
					//     }
					// );
					console.log('a');
				}
			},
			getlist() {
				var list = [];
				var dq = this;
				var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
				contracts.methods.ownerIssue(Address + "", 20 + "").call((err, result) => {
					if (result) {
						// 有数据才会 执行后面的
						if (result[0].length > 0) {
							for (let index = 0; index < result[0].length; index++) {
								var h_num = 0;
								for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
									if (result[1][index][1] == huobi['huobi'][huobii]['key']) {
										h_num = Number(huobi['huobi'][huobii]['num']);
										break;
									}
								}
								var obj = {
									ddid: Number(result[0][index][0]),
									Moa: (Number(result[0][index][1]) / (10 ** h_num)).toFixed(2),
									zer: (Number(result[0][index][2]) / (10 ** h_num)).toFixed(2),
									mal: (Number(result[0][index][3]) / (10 ** h_num)).toFixed(2),
									unit: (Number(result[0][index][4]) / 100).toFixed(2),
									mar: (Number(result[0][index][5]) / (10 ** 16)).toFixed(2),
									mlive: Number(result[0][index][6]),

									Mmark: result[1][index][0],
									pro: result[1][index][1],
									fiat: result[1][index][2]
								};
								list.push(obj);
							}
							for (let index = 0; index < list.length; index++) {
								if (list[index]['Mmark'] ==
									'0x73616c6500000000000000000000000000000000000000000000000000000000') {
									list[index]['Mmark'] = 'for sale';
								} else {
									list[index]['Mmark'] = 'purchase';
								}
								for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
									if (list[index]['pro'] == huobi['huobi'][huobii]['key']) {
										list[index]['pro'] = huobi['huobi'][huobii]['id'];
										break;
									}
								}
								for (let huobii = 0; huobii < huobi['fabi'].length; huobii++) {
									if (list[index]['fiat'] == huobi['fabi'][huobii]['key']) {
										list[index]['fiat'] = huobi['fabi'][huobii]['id'];
										break;
									}
								}
							}
							// console.log(list);
							dq.list = list;
							dq.list_to = list;
						}
					}
				})
			},
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
		}
	}
</script>

<style lang="less" scoped>
	.ddgl_fabu {
		width: 100%;
	}

	.ddlistaa_head_item {
		border: 1px solid #ccc;
		padding: 5px 20px;
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

	.ddgl_fabu_ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 10px;
	}

	.ddgl_fabu_ul_head {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #ddd;
	}

	.ddgl_fabu_ul_li {
		display: flex;
		align-items: center;
		width: 11.1111%;
		margin-top: 20px;
		padding: 0 10px;
		font-size: 14px;
		opacity: 0.8;
	}

	.ddgl_fabu_ul_item {
		display: flex;
	}

	.danjiayanse {
		color: rgb(7, 203, 252);
	}

	.bzjyanse {
		color: #000;
		font-weight: 900;
	}

	.ddgl_fabu_p_head_sxan .ddgl_fabu_p_head_sxan_i {
		display: flex;
		align-items: center;
		padding: 0 15px;
	}

	/* wap */

	.ddgl_fabu_wapview {
		width: 100%;
	}

	.ddgl_fabu_wap_head {
		display: flex;
		padding: 15px 0;
		align-items: center;
		margin-left: 15px;
	}

	.ddgl_fabu_wap_head_q {
		width: 45px;
		height: 45px;
		background-color: #ddd;
		border-radius: 100%;
		text-align: center;
		line-height: 45px;
		margin-right: 15px;
	}

	.ddgl_fabu_wap_head_u {
		display: flex;
		flex-direction: column;
	}

	.ddgl_fabu_wap_head_u_name {
		font-size: 15px;
	}

	.ddgl_fabu_wap_head_u_msg {
		font-size: 13px;
		opacity: 0.7;
		padding: 3px 0;
	}

	.ddgl_fabu_wap_head_u_user {
		font-size: 13px;
		opacity: 0.5;
	}

	.ddgl_fabu_wap_saixuan {
		display: flex;
		flex-direction: row;
		padding-bottom: 15px;
		border-bottom: 1px solid #ddd;
		align-items: center;
	}

	.ddgl_fabu_wap_saixuan_item {
		display: flex;
		flex-direction: row;
	}

	.ddgl_fabu_wap_saixuan_item_a {
		margin-left: 15px;
		margin-top: 15px;
		font-size: 14px;
		opacity: 0.5;
	}

	.ddgl_fabu_wap_ul {
		width: 100%;
	}

	.ddgl_fabu_wap_ul_li {
		width: calc(100% - 30px);
		margin-left: 15px;
		margin-right: 15px;
		border-bottom: 1px solid #ddd;
		display: flex;
		flex-direction: column;
		padding: 20px 0;
	}

	.ddgl_fabu_wap_ul_li_item {
		display: flex;
		flex-direction: row;
	}

	.ddgl_fabu_wap_ul_li_itemt {
		display: flex;
		flex-direction: row;
	}

	.ddgl_fabu_wap_ul_li_item_l {
		margin-right: auto;
		font-size: 15px;
		padding: 5px 0;
		opacity: 0.8;
	}

	.ddgl_fabu_wap_ul_li_item_r {
		font-size: 15px;
		margin-left: auto;
	}

	.ddgl_fabu_wap_ul_li_item button {
		margin-left: auto;
		margin-top: 20px;
	}
	.marty_nav{
		background-color: #FDC500;
		color: #fff;
		padding: 3px 10px;
		font-size: 12px;
		margin-left:5px
	}
	.list_item{
		border-bottom: 1px solid #DCDCDC;
		padding: 20px 10px;
	}
</style>
