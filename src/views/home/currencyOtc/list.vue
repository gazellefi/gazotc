<template>
	<div class="bblist">
		<!-- pc -->
		<div class="hidden-xs-only">
			<div class="bblist_table">
				<div class="bblist_table_left">
					<span class="typeSelect">{{ $t("message.dapp.currency")}}：</span>
					<el-select size="mini" v-model="huobi" placeholder="Please select" @change="changeH">
						<el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
						</el-option>
					</el-select>
					<span class="typeSelect">{{ $t("message.dapp.unit")}}：</span>
					<el-select size="mini" v-model="fabi" placeholder="Please select" @change="changeH">
						<el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
						</el-option>
					</el-select>

					<!-- <el-input size="mini" v-model="form.zdnum" placeholder="请输入数量"
						style="margin-left: 15px; max-width: 150px"></el-input> -->

					<!-- <el-button size="mini" type="primary" icon="el-icon-search" circle style="margin-left: 15px"
						@click="listajax"></el-button> -->
				</div>
				<el-table v-loading="jiazai" :data="list">
					<el-table-column align=center prop="iorder" :label="$t('message.arbitration.order')">
					</el-table-column>
					<el-table-column align=center prop="moa" :label="$t('message.dapp.amount')"> </el-table-column>
					<!-- <el-table-column align=center prop="zer" :label="$t('message.dapp.minAmount')"> </el-table-column> -->
					<el-table-column align=center prop="uni" :label="$t('message.dapp.unitPrice')">
					</el-table-column>
					<el-table-column :label="$t('message.operation')">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="opengoumai(scope.row)">
								{{ $t("message.dapp.buy")}}</el-button>
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

		<!-- wap -->
		<div class="hidden-sm-and-up">
			<el-row style="border-bottom: 1px solid #EEEEEE;">
				<el-col :span="12">
					<span class="typeSelect">{{ $t("message.dapp.currency")}}：</span>
					<el-select size="mini" v-model="huobi"  placeholder="Please select" style="width: 50%;"  @change="changeH">
						<el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="12">
					<span class="typeSelect">{{ $t("message.dapp.unit")}}：</span>
					<el-select size="mini" v-model="fabi" placeholder="Please select" style="margin-left: 15px;width: 50%;"
						 @change="changeH">
						<el-option v-for="item in hbarr" :key="item.key" :label="item.id" :value="item.key">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="12" style="margin-top: 20px;padding-bottom: 10px;">
					<div class="ddgl_fabu_p_head_sxan_i">
						<!-- <el-input size="mini" v-model="form.zdnum" :placeholder="$t('message.enterOrderId')"
							style="max-width: 150px"></el-input> -->
						<!-- <el-button size="mini" type="primary" icon="el-icon-search" circle style="margin-left: 15px;"
							@click="listajax"></el-button> -->
					</div>
				</el-col>
			</el-row>
			<!-- 列表 -->
			<div class="list_nav">
				<div v-if="list.length<1" class="fc a_c">
					<div style="padding-top: 20px;" class="f a_c c_c">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p style="margin-top: 20px; color: #DCDCDC;">{{$t('message.NoData')}}</p>
				</div>
				<div class="list_item f a_e c_b" v-for="(item,index) in list" :key="index">
					<div class="fc">
						<div class="mart-10 f a_c">
							<span class="fwb">{{$t('message.arbitration.order')}} : </span>
							<span class="fwb fz18">{{' '+item.iorder}}</span>
						</div>
						<div class="mart-10">
							<span>{{$t('message.dapp.unitPrice')}}</span>
							<span>{{' '+item.uni}}</span>
						</div>
						<div class="mart-10">
							<span>{{$t('message.dapp.amount')}}</span>
							<span>{{' '+item.moa}}</span>
						</div>
						<!-- <div class="mart-10">
							<span>{{$t('message.dapp.minAmount')}}</span>
							<span>{{' '+item.zer}}</span>
						</div> -->
					</div>
					<div>
						<el-button plain size="mini" @click="opengoumai(item)"
							style="border-color: #FDC500;color: #FDC500;">
							{{ $t("message.dapp.buy")}}
						</el-button>
					</div>
				</div>
			</div>
		</div>


		<!-- 弹出购买框 -->
		<el-dialog :title='$t("message.dapp.buy")' :visible.sync="mairucode" width=350px>
			<el-form :model="mr_form" label-width="80px">
				<el-form-item :label="$t('message.arbitration.order')">
					<el-input v-model="mr_form.ddinfo['iorder']" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.unitPrice')">
					<el-input v-model="mr_form.ddinfo['uni']" disabled></el-input>
				</el-form-item>
				<el-form-item :label="$t('message.dapp.amount')">
					<el-input v-model="mr_form.num"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="mairucode = false">{{$t('message.cancel')}}</el-button>
				<el-button :loading="isLoading" type="primary" @click="mairuajax">{{$t("message.dapp.buy")}}</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import config from "@/config";
    import Web3 from "web3";
	var ccdotc_abi = config["hyue"][config["key"]]["Ccdotc"]["abi"];
	var ccdotc_key = config["hyue"][config["key"]]["Ccdotc"]["heyue"];

	//货币
	var huoarr = config["hbi"][config["key"]];

	import tools from '@/api/public.js'

	var ccdotconn, web3, address;

	export default {
		created() {
			if (document.body.clientWidth >= 1000) {
				this.type = "pc";
			} else {
				this.type = "wap";
			}
			var dq = this;

			for (const key in huoarr) {
				dq.hbarr.push(huoarr[key]);
			}

			dq.fabi = dq.hbarr[0]["key"];
			dq.huobi = dq.hbarr.length >= 1 ? dq.hbarr[3]["key"] : dq.hbarr[0]["key"];
			//监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
				dq.listajax();
			}).catch((err)=>{
				web3 = new Web3(config["hyue"][config["key"]]["Url"]);
				ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
				dq.listajax();
			})
		},
		data() {
			return {
				type: "pc",
				list: [],
				huobi: "",
				fabi: "",
				mairucode: false,
				isLoading: false,

				hbarr: [],
				fbarr: [],
				mr_form: {
					ddinfo: {},
					num: null,
				},
				form: {
					type: "",
					type_b: "",
					zdnum: 0,
				},

				jiazai: false,
			};
		},
		watch: {
			// huobi(e) {
			// 	this.count = 20;
			// 	this.listajax(this.tcode, e, this.fabi);
			// },
			// fabi(e) {
			// 	this.count = 20;
			// 	this.listajax(this.tcode, this.huobi, e);
			// },
		},
		methods: {
			changeH(e) {
				this.listajax()
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
			listajax() {
				var dq = this;
				dq.jiazai = true;
				var js_num = 0;
				for (let index = 0; index < dq.hbarr.length; index++) {
					if (dq.huobi == dq.hbarr[index]["key"]) {
						js_num = Number(dq.hbarr[index]["num"]);
						break;
					}
				}
				// 输入框的内容
				var sounum = "000001";
				// if (dq.form["zdnum"]) {
				// 	sounum = dq.getFNum(dq.form["zdnum"] * 10 ** js_num);
				// }
				// console.log(sounum)
				//加载列表数据
				ccdotconn.methods.sort(dq.huobi, dq.fabi, 30, 30, sounum + "")
					.call((error, ret) => {
						// console.log(ret)
						dq.jiazai = false;
						if (ret) {
							var list = [];
							var list_arr = ret[0];
							var user_arr = ret[1];
							for (let index = 0; index < list_arr.length; index++) {
								var obj = {
									pro_num: js_num,
									iorder: Number(list_arr[index][0]),
									moa: (Number(list_arr[index][1]) / 10 ** js_num).toFixed(2),
									zer: (Number(list_arr[index][2]) / 10 ** js_num).toFixed(2),
									uni: dq.getFNum(Number(list_arr[index][3]) / 10 ** 6),
									order: user_arr[index],
								};
								list.push(obj);
							}
							// console.log(list);
							dq.list = list;
						}
					});
			},

			opengoumai(row) {
				this.mr_form["ddinfo"] = row;
				this.mairucode = true;
			},
			mairuajax() {
				var dq = this;
				if (!this.mr_form["num"]) {
					alert(this.$t('message.frienchOtc.quantity'));
					return;
				}
				if (this.mr_form["num"] < Number(this.mr_form["ddinfo"]["zer"])) {
					alert(this.$t('message.NotMinNum'));
					return;
				}
				if (this.mr_form["num"] > Number(this.mr_form["ddinfo"]["moa"])) {
					alert(this.$t('message.NotMaxNum'));
					return;
				}

				var mr_num =
					Number(this.mr_form["num"]) * 10 ** this.mr_form["ddinfo"]["pro_num"];
				var mr_danjia = this.getFNum(
					Number(this.mr_form["ddinfo"]["uni"]) * 10 ** 6
				);
				//提交
				dq.isLoading = true
				ccdotconn.methods
					.cctaker(this.mr_form["ddinfo"]["iorder"], dq.getFNum(mr_num) + "", mr_danjia + "")
					.send({
							from: address,
						},
						(err, ret) => {
							if (ret) {
								dq.mairucode = false;
								dq.isLoading = false
								dq.$message.success(this.$t('message.frienchOtc.buySuccess'));
							} else {
								dq.isLoading = false
							}
						}
					);
			},
		},
	};
</script>

<style lang="less" scoped>
	.bblist {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: auto;
	}

	.bblist_table {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.bblist_table_left {
		display: flex;
		flex-direction: row;
		padding: 10px;
		background: #fff;
		margin-bottom: 10px;
		justify-content: flex-end;
		align-items: center;

		.typeSelect {
			margin-left: 20px;
		}
	}

	.el-table {
		display: flex;
		flex-direction: column;
	}

	.list_item {
		padding: 20px 10px;
		border-bottom: 1px solid #DCDCDC;
	}
</style>
