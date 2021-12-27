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
								<el-dropdown-item command="ALL">whole</el-dropdown-item>
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
								<el-dropdown-item command="ALL">whole</el-dropdown-item>
								<el-dropdown-item command="CNY">CNY</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

				</div>
			</div>
			<!-- table -->
			<el-table :data="list" stripe style="width: 100%">
				<el-table-column align="center" prop="did" width="100px" :label="$t('message.arbitration.orderId')">
				</el-table-column>
				<el-table-column align="center" :label="$t('message.amount')">
					<template slot-scope="scope">
						{{ scope.row.moa }} {{ scope.row.pro }}
					</template>
				</el-table-column>
				<el-table-column align="center" :label="$t('message.minOrder')">
					<template slot-scope="scope">
						{{ scope.row.zer }} {{ scope.row.pro }}
					</template>
				</el-table-column>
				<el-table-column align="center" :label="$t('message.dapp.unitPrice')">
					<template slot-scope="scope">
						{{ scope.row.uni }} {{ scope.row.swap }}
					</template>
				</el-table-column>
				<el-table-column align="center" :label="$t('message.operation')">
					<template slot-scope="scope">
						<el-button type="text" @click="setdd(scope.row)">{{$t('message.modify') }}</el-button>
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
							<span class="marr-10">{{$t('message.amount')}}</span>
							<span class="fz14">{{ item.moa }} {{ item.pro }}</span>
						</div>
						<div class="mart-10">
							<span class="marr-10">{{$t('message.dapp.minAmount')}}</span>
							<span class="fz14">{{ item.zer }} {{ item.pro }}</span>
						</div>
					</div>
					<div class="fc c_r">
						
						<van-button plain type="info"  color="#FDC500" size="small" @click="setdd(item)">{{$t('message.modify') }}</van-button>
					</div>
				</el-col>
			</el-row>
		</div>

         <!-- 修改订单  弹框 -->
		 <myDialog  :width="isphone ? '90%':'30%'" title="修改订单" :closeModal="false" :closePress="false" :visible.sync="dialogVisible"
		 @confirm="dialogClose(2)" @cancel="dialogClose(1)">
			 <div class="setdd_form" v-loading="loading" element-loading-text="Modifying...">
				<el-input v-model="form.did" placeholder="Please enter order ID" :disabled="true"></el-input>
				<el-select v-model="form.type" placeholder="请选择" style="margin-top: 15px">
					<el-option v-for="item in [
			   { value: 1, label: '修改单价' },
			   { value: 2, label: '修改数量' },
			 ]" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input v-model="form.danj" placeholder="请输入价格" v-if="form.type == 1"
					style="margin-top: 15px"></el-input>
				<el-input v-model="form.num" :placeholder="$t('message.activit.enterQuant')" v-if="form.type == 2"
					style="margin-top: 15px"></el-input>
			 </div>
		 
		 </myDialog>
	</div>
</template>
<script>
	import Web3 from "web3";
	import Web3Modal from "web3modal";
	let Base64 = require("js-base64").Base64;

	import config from "@/config";
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
				web3 = new Web3(config["hyue"][config["key"]]["Url"]);
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
					//   var wlcode = window.ethereum.networkVersion;
					//   //imtoken只能查看 无法操作 出发是ETF主网
					//   if (window.ethereum.isImToken) {
					//     web3.setProvider(config["hyue"][config["key"]]["Url"]);
					//   }
					//   //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
					//   if (window.ethereum.isMetaMask && wlcode != 4) {
					//     web3.setProvider(config["hyue"][config["key"]]["Url"]);
					//   }
					// } else {
					//   web3.setProvider(config["hyue"][config["key"]]["Url"]);
					// }
					Address = provider.selectedAddress;
					dq.getuinfo(Address);
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
					username: "",
				},

				list: [],

				form: {
					did: 0,
					type: 1,
					num: null,
					danj: null,
					ddinfo: {},
				},

				isphone: false,
				dialogVisible: false,
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
			// 修改弹窗 点击按钮
			dialogClose(num){
				// 确定
				if(num == 2){
					this.setdd_ajax()
				}else{ // 取消
					this.dialogVisible = false
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
			openfabu() {
				this.$router.push("./");
			},
			getuinfo(Address) {
				this.uinfo["user"] = Address;
				this.uinfo["user_u"] =
					Address.substr(0, 5) +
					"...." +
					Address.substr(Address.length - 5, Address.length);
				// var dq = this;
				// var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
				// contracts.methods.message(Address + "", "0").call((err, result) => {
				// 	if (result) {
				// 		var jiename = Base64.decode(result);
				// 		dq.uinfo["quan"] = jiename.substr(0, 1);
				// 		dq.uinfo["username"] = jiename;
				// 	}
				// });
			},

			//获取列表
			getuser_list(Address) {
				var dq = this;
				var ccdotc = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
				ccdotc.methods.ownerIssue(Address + "", "9999").call((err, result) => {
					if (result) {
						var larr = result[0];
						var parr = result[1];
						var list = [];
						for (let index = 0; index < larr.length; index++) {
							var pro_num = 0;
							var pro_id = "";
							var swap_id = "";
							// var swap_num = 0;
							for (let huobii = 0; huobii < huobi.length; huobii++) {
								if (parr[index][0] == huobi[huobii]["key"]) {
									pro_num = huobi[huobii]["num"];
									pro_id = huobi[huobii]["id"];
									break;
								}
							}
							for (let huobii = 0; huobii < huobi.length; huobii++) {
								if (parr[index][1] == huobi[huobii]["key"]) {
									// swap_num = huobi[huobii]['num'];
									swap_id = huobi[huobii]["id"];
									break;
								}
							}

							var obj = {
								did: larr[index][0],
								moa: dq.getFNum(
									(Number(larr[index][1]) / 10 ** pro_num).toFixed(2)
								),
								zer: dq.getFNum(
									(Number(larr[index][2]) / 10 ** pro_num).toFixed(2)
								),
								uni: dq.getFNum(Number(larr[index][3]) / 10 ** 6),

								pro: pro_id,
								swap: swap_id,
							};
							list.push(obj);
						}
						dq.list = list;
					}
				});
			},
			setdd(row) {
				this.dialogVisible = true;
				this.form["did"] = row["did"];
				this.form["num"] = Number(row["moa"]);
				this.form["danj"] = Number(row["uni"]);
				this.form["ddinfo"] = row;
			},

			setdd_ajax() {
				var dq = this;
				var ccdotc = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
				//初始化 获取heyue
				var pro_key = "";
				var pro_num = "";
				dq.loading = true;
				for (let index = 0; index < huobi.length; index++) {
					if (this.form["ddinfo"]["pro"] == huobi[index]["id"]) {
						pro_key = huobi[index]["heyue"];
						pro_num = huobi[index]["num"];
					}
				}
				if (this.form["type"] == 1) {
					if (Number(this.form["ddinfo"]["uni"]) == this.form["danj"]) {
						dq.loading = false;
						return;
					}
					set_ccmodify_unit();
				} else {
					if (Number(this.form["ddinfo"]["moa"]) >= this.form["num"]) {
						if (Number(this.form["ddinfo"]["moa"]) == this.form["num"]) {
							dq.loading = false;
							return;
						}
						set_dd_num();
					} else {
						//查询资产余额
						ccdotc.methods
							.balancepro(Address + "", pro_key + "")
							.call((err, ret) => {
								if (ret) {
									var num = Number(ret) / 10 ** pro_num;
									if (num >= this.form["num"]) {
										set_dd_num();
									} else {
										dq.loading = false;
										dq.$message.error("Insufficient asset balance!");
									}
								}
							});
					}
				}

				//轮询查询是否修改成功
				function lx_chaxun() {
					ccdotc.methods.ownerIssue(Address + "", "9999").call((err, ret) => {
						if (ret) {
							for (let index = 0; index < ret[0].length; index++) {
								if (ret[0][index][0] == dq.form["did"]) {
									//判断价格是否与修改后价格一样 数量
									if (dq.form["type"] == 1) {
										if (
											dq.getFNum(
												(Number(ret[0][index][3]) / 10 ** 6).toFixed(2)
											) == Number(dq.form["danj"]).toFixed(2)
										) {
											dq.loading = false;
											for (let liisti = 0; liisti < dq.list.length; liisti++) {
												if (dq.list[liisti]["did"] == dq.form["did"]) {
													dq.list[liisti]["uni"] = dq.form["danj"];
												}
											}
											dq.$message({
												message: "Modified successfully",
												type: "success",
											});
										} else {
											setTimeout(() => {
												lx_chaxun();
											}, 3000);
										}
									} else {
										if (
											dq.getFNum(
												(Number(ret[0][index][1]) / 10 ** pro_num).toFixed(2)
											) == Number(dq.form["num"]).toFixed(2)
										) {
											dq.loading = false;
											for (let liisti = 0; liisti < dq.list.length; liisti++) {
												if (dq.list[liisti]["did"] == dq.form["did"]) {
													dq.list[liisti]["moa"] = dq.form["num"];
												}
											}
											dq.$message({
												message: "Modified successfully",
												type: "success",
											});
										} else {
											setTimeout(() => {
												lx_chaxun();
											}, 3000);
										}
									}
									break;
								}
							}
						}
					});
				}

				function set_ccmodify_unit() {
					var danjia = Number(dq.form["danj"]) * 10 ** 6;
					ccdotc.methods.ccmodify_unit(dq.form["did"] + "", danjia + "").send({
							from: Address,
						},
						(err, result) => {
							if (result) {
								lx_chaxun();
							} else {
								dq.loading = false;
								dq.$message.error("Please agree to the authorization");
							}
						}
					);
				}

				function set_dd_num() {
					var setnum = Number(dq.form["num"]) * 10 ** pro_num;
					ccdotc.methods.ccmodify_moa(dq.form["did"] + "", setnum + "").send({
							from: Address,
						},
						(err, result) => {
							if (result) {
								lx_chaxun();
							} else {
								dq.loading = false;
								dq.$message.error("Please agree to the authorization");
							}
						}
					);
				}
			},
		},
	};
</script>

<style lang="less">
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
		padding: 20px;
	}
	.list_item{
		border-bottom: 1px solid #DCDCDC;
		padding: 20px 10px;
	}
</style>
