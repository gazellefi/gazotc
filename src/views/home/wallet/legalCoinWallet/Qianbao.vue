<template>
	<div class="qianbao">
		<el-row class="head hidden-sm-and-down" type="flex" justify="space-between" >
			<el-col :sm="24" :md="8" :lg="5">
				<div class="left c_b">
					<div class="f a_c">
						<img src="@/assets/img/money1.png" style="width: 20px;" class="marr-10">
						<div> {{ $t("message.dapp.capitalAsset")}}</div>
					</div>
					<!-- <div class="num">{{ user_zc.toFixed(2) }}</div> -->
				</div>
			</el-col>
			<el-col :sm="24" :md="10" class="f c_r a_c">
				<div class="right hidden-sm-and-down" style="margin-right: 20px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				<div class="right hidden-sm-and-up" style="margin-top: 10px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				
			</el-col>
		</el-row>
		<el-row class="head hidden-sm-and-up" >
			<el-col :sm="24" :md="5">
				<div class="left c_b">
					<div class="f a_c">
						<img src="@/assets/img/money1.png" style="width: 20px;" class="marr-10">
						<div> {{ $t("message.dapp.capitalAsset")}}</div>
					</div>
					<!-- <div class="num">{{ user_zc.toFixed(2) }}</div> -->
				</div>
			</el-col>
			<el-col :sm="24" :md="10" class="f a_c">
				<div class="right hidden-sm-and-down" style="margin-right: 20px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				<div class="right hidden-sm-and-up" style="margin-top: 10px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				
			</el-col>
		</el-row>
		
		<el-row style="margin-top: 5px;">
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{ $t("message.dapp.currency")}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.available')}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.arbitration.frozen')}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.operation')}}</span></div>
			</el-col>
		</el-row>
		<el-row v-for="(item,index) in list" :key="index" type="flex" align="middle">
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.name == 'bond' ? $t(`message.bond`) : item.name}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.balancepro}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.lockpro}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav" v-if="item.key == 'baozhengjing'">
					<span class="cba cursor " @click="showRu(item)">{{$t('message.changeInto')}}</span>
					<span class="c935 cursor" @click="showOutPop(item)" style="margin-left: 5px;">{{$t('message.changeOut')}}</span>
				</div>
				<div class="item_nav" v-else>
					<span class="cba cursor" @click="showChongzhi(item)">{{$t('message.ChargeMoney')}}</span>
					<span class="c935 cursor" @click="showTixian(item)" style="margin-left: 5px;">{{$t('message.WithdrawMoney')}}</span>
				</div>
			</el-col>
		</el-row>
		<myDialog width="320px" :isShowFooter="false"  :title="$t('message.Recharge')" :closeModal="false" :closePress="false"
			:visible.sync="isShowChongzhi">
			<Chongzhi :type="type_c" @Recharge="Recharge"></Chongzhi>
		</myDialog>
		<myDialog width="320px" :isShowFooter="false" :title="$t('message.WithdrawMoney')" :closeModal="false" :closePress="false"
			:visible.sync="isShowTixan">
			<Tixian :type="type_t" @drawal="drawal"></Tixian>
		</myDialog>
	</div>
</template>
<script>
	import Chongzhi from './Chongzhi'
	import Tixian from './Tixian'
	import tools from '@/api/public.js'
	import {
		Notify, Toast, Dialog
	} from 'vant';


	import config from "@/config";

	var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
	var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
	var Gaz_key = config['hbi'][config['key']]['GAZ']['heyue'];
	var bzj_num = config['hyue'][config['key']]['Bzj']['num'];

	//new VConsole();
	//全局变量
	var web3 = "";
	var address = "";
	var ethereum = window.ethereum;


	export default {
		data() {
			return {
				huobi: [{
					id: "bond",
					hyue: 'baozhengjing',
					num: 18
				}],
				list: [],
				user_zc: 0,
				isShowChongzhi: false,
				isShowTixan: false,
				isShowZhuanru: false,
				type_c: '',
				type_t: '',
				numRu: 0,
				popoType: 1, // 1： 充值 2：提币  3：转如  4：转出
				balancemar_num: 0,
				usdt_num: 0,
			}
		},
		mounted() {
			//初始化货币
			var hbar = config['hbi'][config['key']];
			// var hbar = config['fabi']['bian'];
			console.log(hbar);
			for (const key in hbar) {
				this.huobi.push({
					id: hbar[key]['id'],
					hyue: hbar[key]['heyue'],
					num: hbar[key]['num']
				});
			}

			Toast.setDefaultOptions(this.$t('message.wallet.loading'), {
				forbidClick: false,
				closeOnClickOverlay: false,
				duration: 0,
				overlay: true
			});
			var dq = this;
			//监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				// 获取钱包数据
				dq.getqblist();
			}).catch((err)=>{
				console.log(err);
			})
		},
		methods: {
			// 关闭提现弹框
			drawal(){
				this.isShowTixan = false
				this.getqblist(true)
			},
			// 关闭充值弹框
			Recharge(){
				this.isShowChongzhi = false
				this.getqblist(true)
			},
			// 转出
			showOutPop(item){
				this.popoType = 4
				this.ajax_fun()
			},
			// 转入
			showRu(item){
				this.popoType = 3
				this.ajax_fun()
			},
			// 转入 转出 请求数据
			ajax_fun(){
				// 先获取 保证金 余额
				this.balancemarajax().then(()=>{
					var _this = this;
					const h = _this.$createElement;
					_this.$msgbox({
					    title: _this.$t('message.wallet.enter')+_this.popoType == 4? _this.$t('message.changeOut'):_this.popoType == 3?_this.$t('message.changeInto') : ''+_this.$t('message.marginBalance'),
						message: h('div', null, [
							h('input', {
								attrs: {
									class: 'el-input__inner',
									autocomplete: 'off',
									rows: 1,
									id:'commentContent'
								},
								value: _this.numRu,
								on: { input: _this.onCommentInputChange }
							}),
							h('div',null,[
								h('i', { style: 'color: teal;display: inline-block;padding-top: 20px;' }, _this.$t('message.currentMarginBalance')+'：'),
								h('i', _this.balancemar_num),
							]),
							h('div',null,[
								h('i', { style: 'color: teal;display: inline-block;padding-top: 20px;' }, 'GAZ：'),
								h('i', _this.usdt_num),
							])
						  ]),
					    showCancelButton: true,
						center: true,
					    confirmButtonText: _this.popoType == 4? _this.$t('message.changeOut'):_this.popoType == 3? _this.$t('message.changeInto') : '',
					    cancelButtonText: _this.$t('message.cancel'),
					    beforeClose: (action, instance, done) => {
					        if (action === 'confirm') {
					            instance.confirmButtonLoading = true;
								if(_this.popoType == 4){
									instance.confirmButtonText = _this.$t('message.rollOut');
									_this.out(instance, done)
								}else if(_this.popoType ==3){
									instance.confirmButtonText = _this.$t('message.rollIn');
									_this.into(instance, done)
								}
					            
					        } else {
								_this.numRu = ''
								_this.onCommentInputChange1()
					            done();
					        }
					    }
					}).then(action => {
					    // _this.$message({
					    //     type: 'info',
					    //     message: 'action: ' + action
					    // });
					});
				})
			},
			onCommentInputChange() {
			    this.numRu = document.getElementById("commentContent").value;
			},
			onCommentInputChange1() {
			     document.getElementById("commentContent").value = this.numRu
			},
			into(instance, done) {
			  if (this.numRu <= 0) {
			    Notify({ type: 'warning', message: this.$t('message.correctAmount') });
				instance.confirmButtonLoading = false;
				instance.confirmButtonText = this.$t('message.changeInto');
			    return;
			  }
			  if (this.numRu > this.usdt_num) {
			    Notify({ type: 'warning', message: this.$t('message.wallet.transferring') });
				instance.confirmButtonLoading = false;
				instance.confirmButtonText = this.$t('message.changeInto');
			    return;
			  }
			  var dq = this;
			
			  Toast.loading({
			    message: dq.$t('message.wallet.transferring')
			  });
			  var lx_time = "";
			  let str = tools.getnume(Number(this.numRu) * (10 ** bzj_num))
			  //开始转入保证金
			  var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
			  doctconn.methods.transfer("1",str).send({
			    from: address
			  }, (error, ret) => {
			    if (ret) {
			      zhuanru_lx(instance, done);
			    }
			  });
			  var mm = 0  // 轮询 次数
			
			  //轮询查询是否转入成功 
			  function zhuanru_lx(instance, done) {
			    doctconn.methods.balancemar(address + "").call((err, ret) => {
			      if (ret) {
			        var balancemar = Number(ret) / (10 ** bzj_num);
			        if (balancemar >= dq.balancemar_num + Number(dq.numRu)) {
			          Toast.clear();
			          clearTimeout(lx_time);
			          Dialog.alert({
			            title: dq.$t('message.wallet.transSuccess'),
			            message: dq.$t('message.wallet.transfer') + dq.numRu,
			          }).then(() => {
						instance.confirmButtonLoading = false;
						instance.confirmButtonText = dq.popoType == 4? dq.$t('message.changeOut'):dq.popoType == 3?dq.$t('message.changeInto') : ''
						done()
						dq.getqblist(true)
			            dq.balancemarajax();
			            dq.numRu = 0;
						dq.onCommentInputChange1()
			          });
			        } else {
						mm++
						// 在轮询3次后 退出
						console.log(mm);
						if(mm > 3){
							Toast.clear();
							clearTimeout(lx_time);
							Dialog.alert({
							  title: dq.$t('message.wallet.transSuccess'),
							  message: dq.$t('message.wallet.transfer') + dq.numRu,
							}).then(() => {
									instance.confirmButtonLoading = false;
									instance.confirmButtonText = dq.popoType == 4? dq.$t('message.changeOut'):dq.popoType == 3?dq.$t('message.changeInto') : ''
									done()
									dq.getqblist(true)
								  dq.balancemarajax();
								  dq.numRu = 0;
								dq.onCommentInputChange1()
							});
							return
						}
			          lx_time = setTimeout(() => {
			            zhuanru_lx(instance, done);
			          }, 3000);
			        }
			      }
			    });
			  }
			},
			// 转出 
			out(instance, done) {
			  if (this.numRu <= 0) {
			    Notify({ type: 'warning', message: this.$t('message.correctAmount') });
			  				instance.confirmButtonLoading = false;
			  				instance.confirmButtonText = dq.$t('message.changeOut');
			    return;
			  }
			  if (this.numRu > this.balancemar_num) {
			    Notify({ type: 'warning', message: dq.$t('message.wallet.withdrawAmount') });
			  				instance.confirmButtonLoading = false;
			  				instance.confirmButtonText = dq.$t('message.changeOut');
			    return;
			  }
			  var dq = this;
			  			
			  Toast.loading({
			    message: dq.$t('message.wallet.withdraw')
			  });
			  var lx_time = "";
			  //开始转出保证金
			  var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
			  let str = tools.getnume(Number(this.numRu) * (10 ** bzj_num))
			  doctconn.methods.transfer("2", str).send({
			    from: address
			  }, (error, ret) => {
				  console.log(ret);
			    if (ret) {
			      zhuanru_lx(instance, done);
			    }
			  });
			  	var mm = 0  // 轮询 次数
			  //轮询查询是否转出成功 
			  function zhuanru_lx(instance, done) {
			    doctconn.methods.balancemar(address + "").call((err, ret) => {
			      if (ret) {
			        var balancemar = Number(ret) / (10 ** bzj_num);
			        if (balancemar == dq.balancemar_num - Number(dq.numRu)) {
			          Toast.clear();
			          clearTimeout(lx_time);
			          Dialog.alert({
			            title: dq.$t('message.wallet.transSuccessful'),
			            message: dq.$t('message.changeOut') + dq.numRu,
			          }).then(() => {
						  instance.confirmButtonLoading = false;
						  instance.confirmButtonText = dq.popoType == 4? dq.$t('message.changeOut') :dq.popoType == 3?dq.$t('message.changeInto'): ''
						  done()
						  dq.getqblist(true)
							dq.balancemarajax();
							dq.numRu = 0;
							dq.onCommentInputChange1()
			          });
			        } else {
					  mm++
					  // 在轮询3次后 退出
					  console.log(mm);
					  if(mm > 3){
					  	Toast.clear();
					  	clearTimeout(lx_time);
					  	Dialog.alert({
					  	  title: dq.$t('message.wallet.transSuccess'),
					  	  message: dq.$t('message.wallet.transfer') + dq.numRu,
					  	}).then(() => {
					  			instance.confirmButtonLoading = false;
					  			instance.confirmButtonText = dq.popoType == 4? dq.$t('message.changeOut'):dq.popoType == 3?dq.$t('message.changeInto') : ''
					  			done()
					  			dq.getqblist(true)
					  		  dq.balancemarajax();
					  		  dq.numRu = 0;
					  		dq.onCommentInputChange1()
					  	});
					  	return
					  }
			          lx_time = setTimeout(() => {
			            zhuanru_lx(instance, done);
			          }, 3000);
			        }
			      }
			    });
			  }
			},
			// 充值
			showChongzhi(item){
				this.type_c = item.name
				this.popoType = 1
				this.isShowChongzhi = true
			},
			// 提币
			showTixian(item){
				this.type_t = item.name
				this.popoType = 2
				this.isShowTixan = true
			},
			openurl(url) {
				this.$router.push(url);
			},
			// 查询列表
			getqblist(flag) {
				var dq = this;
				//新版查询
				function gethuobi() {
					Toast.loading({
						message: dq.$t('message.currencyOtc.dataRequest')
					});
					var sqllist = [];
					for (let index = 0; index < dq.huobi.length; index++) {
						if (dq.huobi[index]['hyue'] != 'baozhengjing') {
							sqllist.push(dq.huobi[index]['hyue']);
						}
					}
					var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
					dotsconn.methods.ownerpro(address + "", sqllist).call((error, ret) => {
						if (ret) {
							if(flag){
								dq.list = []
							}
							var uzc = 0;
							var yue_arr = ret[0];
							var lock_yue_arr = ret[1];
							for (let index = 0; index < dq.huobi.length; index++) {
								var num = Number(dq.huobi[index]['num']);
								
								dq.list.push({
									id: index,
									key: dq.huobi[index]['hyue'],
									name: dq.huobi[index]['id'],
									balancepro: (Number(yue_arr[index]) / (10 ** num)).toFixed(2),
									lockpro: (Number(lock_yue_arr[index]) / (10 ** num)).toFixed(2)
								});
								
							}
							for (let index = 0; index < dq.huobi.length - 1; index++) {
								var num_a = Number(dq.huobi[index]['num']);
								//var zhic = dq.huobi[index]['key'];
								//var pros = dotsconn.methods.pros(zhic).call();
								//var danjia = Number(pros['uni']) / (10**6);
								uzc = ((Number(yue_arr[index]) + Number(lock_yue_arr[index])) / (10 ** num_a)
									.toFixed(2)) + uzc;
								dq.user_zc = uzc;
							}
							Toast.clear();
						}
					});
				}
				gethuobi();
			},
			//  获取保证金 余额和  可用金额
			balancemarajax() {
				var dq = this;
				return new Promise(function(resolve, reject){
					dq.getBalancemar().then((res)=>{
						dq.balancemar_num = res.toFixed(2);
						dq.getUsdt_num().then((res)=>{
							dq.usdt_num = res;
							dq.$forceUpdate()
							resolve()
						})
					})
				})
			},
			// 获取 当前保证金
			getBalancemar(){
				var dq = this
				var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
				return new Promise(function(resolve, reject){
					doctconn.methods.balancemar(address + "").call((err, ret) => {
					  if (ret) {
					    var balancemar = Number(ret) / (10 ** bzj_num);
						console.log(balancemar);
						resolve(balancemar)
					  }
					});
				})
				
			},
			//  获取可用余额
			getUsdt_num(){
				var dq = this
				var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
				return new Promise(function(resolve, reject){
					doctconn.methods.balancepro(address + "", Gaz_key).call((error, ret) => {
					  if (ret) {
						var usdt_num = Number(ret) / (10 ** bzj_num);
						console.log(usdt_num);
						resolve(usdt_num)
					  }
					});
				})
			},
		},
		components: {
			Chongzhi,
			Tixian
		}
	}
</script>

<style scoped lang="less">
	/deep/.myDialog .el-dialog .el-dialog__body {
		background: #fff;
	}

	html,
	body {
		background-color: #ddd;
	}

	.qianbao {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.head {
			padding: 10px 0;
			background: #fff;
			// height: 70px;

			.left {
				display: flex;
				background: linear-gradient(to right, #4451fa, #09deea);
				padding: 15px 10px;
				border-radius: 0 30px 30px 0;
				color: #fff;
				align-items: center;

				.num {
					margin-right: 6%;
				}
			}

			.right {
				display: flex;
				height: 32px;
				.btn {
					padding: 8px 30px;
					border-radius: 5px;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
				}

				.chongzhi {
					background: linear-gradient(#82bcfc, #0f79f1);
					margin-right: 30px;
				}

				.tixian {
					background: linear-gradient(#a077f3, #5a08ff);
				}
			}
		}

		.item_nav {
			width: 100%;
			background-color: #FFF;
			padding: 20px 0;
			margin-top: 5px;
			font-size: 14px;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
		}
	}
	@media only screen and (min-width: 991px){
		.item_nav{
			padding: 20px 0 20px 50px !important;
		}
	}
	@media only screen and (max-width: 991px){
		.item_nav{
			padding: 0;
		}
		// .aa{
		// 	padding: 5px 0 0 0;
		// }
	}
</style>
