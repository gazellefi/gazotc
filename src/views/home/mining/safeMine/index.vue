<template>
	<div class="container fc c_c">
		<div class="f c_b a_c top_nav mart-20">
			<div class="f">
				<div class="fc a_c">
					<span class="btn cursor" :class="[popType == 1 ? 'active_btn' : '']" @click="changeActive(1)">质押</span>
					<span class="mart-10 fz12">质押金额</span>
					<span class="mart-10 fz12">{{userInfo.amount}} Gaz</span>
				</div>
				<div class="fc a_c">
					<span class="btn marl-10 cursor" :class="[popType == 0 ? 'active_btn' : '']" @click="changeActive(0)">赎回</span>
				</div>
			</div>
			<div class="f a_c">
				<span>总领取：{{userInfo.harved}}</span>
				<span class="marl-10">待收益：{{Beharvest}}</span>
				<span class="btn active_btn marl-10" @click="changeActive(2)">领取</span>
			</div>
		</div>
<!-- 		<el-table v-loading="jiazai" :data="list" :header-row-class-name="headerStyle" class="table">
			<el-table-column align=center label="开始时间">
				<template slot-scope="scope">
					<span class="fwb c6e">{{scope.row.time}}</span>
				</template>
			</el-table-column>
			<el-table-column align=center label="质押币种">
				<template slot-scope="scope">
					<span class="fwb c6e">{{scope.row.type}}</span>
				</template>
			</el-table-column>
			<el-table-column align=center label="质押数量">
				<template slot-scope="scope">
					<span class="fwb c6e">{{scope.row.num}}</span>
				</template>
			</el-table-column>
			<el-table-column align=center label="区间收益">
				<template slot-scope="scope">
					<span class="fwb c6e">{{scope.row.profit_q}}</span>
				</template>
			</el-table-column>
			<el-table-column align=center label="累计收益">
				<template slot-scope="scope">
					<span class="fwb c6e">{{scope.row.profit_a}}</span>
				</template>
			</el-table-column>
			<el-table-column align=center label="已领取收益">
				<template slot-scope="scope">
					<span class="fwb c361">{{scope.row.get_p}}</span>
					<span class="fz10 marl-5">Gaz</span>
				</template>
			</el-table-column>
			<div slot="empty">
				<div style="padding-top: 20px;" class="f a_c c_c">
					<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
				</div>
				<p>{{$t('message.NoData')}}</p>
			</div>
		</el-table> -->
		
		<!-- 弹框 -->
		<van-popup v-model="show" class="pop_nav" @closed="closePop">
			<div class="pop_out">
				<img :src="popType == 0 ? bg1 : popType == 1 ? bg2 : bg3" >
				<div class="pop_content fc a_c c_b">
					<span class="ca6 fwb fz18">{{popType == 0 ? '赎回' : popType == 1 ? '质押' : '领取'}}</span>
					<span class="c6ec fwb fz14 mart-10">保险池质押挖矿</span>
					<div class="f a_c c_c" style="width: 100%;">
						<div class="f a_c input_nav" v-if="popType == 1 || popType == 0">
							<van-field v-model="redeemNum" type="digit" label-width="0" placeholder="请输入数量" :input-align=" popType == 1 ? 'center' : 'right'" :border="false" size="mini" class="input_content"/>
							<div class="f a_c" v-if="popType == 0">
								<van-tag plain color="#4163ec" class="marl-5">25%</van-tag>
								<van-tag plain color="#4163ec" class="marl-5">50%</van-tag>
								<van-tag plain color="#4163ec" class="marl-5">100%</van-tag>
							</div>
						</div>
						<div class="f a_c fz16 c6e fwb" v-else>
							<span>当前可领取收益为 </span>
							<span class="fz18 marl-5" style="color: #5CB997;">{{Beharvest}}</span>
						</div>
						<span class="fwb fz16 c6e marl-5">GAZ</span>
					</div>
					<span class="ca6 mart-10">本次操作消耗 0.2 BNB,是否继续?</span>
					<span class="fz10 ca6 mart-10" v-if="popType == 0">(赎回质押币需要区块链钱包消息签名)</span>
					<span class="fz10 ca6 mart-10" v-if="popType == 1">(质押币需要区块链钱包消息签名)</span>
					<span class="pop_btn mart-10 f a_c c_c pop_btn_a" @click="submit">是</span>
					<span class="pop_btn f a_c c_c mart-10" @click="show = false">否</span>
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import tools from '@/api/public.js'
	import config from "@/config";
	import Web3 from "web3"
	import { Dialog, Toast, Notify } from 'vant';
	
	var dotc_abi = config["hyue"][config["key"]]["dotc"]["abi"];
	var dotc_heyue = config["hyue"][config["key"]]["dotc"]["heyue"];
	var dotsconn,web3,address,poolcont;
	export default{
		data(){
			return{
				jiazai: false,
				show:false,
				Beharvest: 0,
				userInfo:{
					amount: '0',
					harved: '0',
					rewardDebt: '0'
				},
				bg1: require('@/assets/img/mine/popBg1.png'),
				bg2: require('@/assets/img/mine/popBg2.png'),
				bg3: require('@/assets/img/mine/popBg3.png'),
				redeemNum: '',
				popType: 1, // 0 ：赎回    1：质押    2：领取
				hbarr: [],
				list:[
					{
						time: '2020-01-01  13:23:22',
						type: 'GAZ',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'GAZ',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'GAZ',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'GAZ',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20
					}
				]
			}
		},
		mounted() {
			//初始化货币
			var hbar = config['hbi'][config['key']];
			for (const key in hbar) {
				this.hbarr.push({
					id: hbar[key]['id'],
					hyue: hbar[key]['heyue'],
					num: hbar[key]['num'],
					key: hbar[key]['key']
				});
			}
			// 监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
				poolcont = new web3.eth.Contract(config.mine[3].abi, config.mine[3].contract);
				console.log(poolcont);
				this.getBeharvest()
				this.getUser()
			}).catch((err)=>{
				// web3 = new Web3(config["hyue"][config["key"]]["Url"]);
				// dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
				console.log(err);
			})
		},
		methods:{
			// 获取用户信息
			getUser(){
				poolcont.methods.userInfo(address).call((error, res) => {
					console.log(res);
				})
			},
			//预估收割
			getBeharvest(){
				poolcont.methods.beharvest(address).call((error, res) => {
					console.log('beharvest：'+res);
				})
			},
			// 提交
			submit(){
				if(this.popType == 1){
					this.pledge()
				}else if(this.popType == 0){
					this.redeem()
				}else{
					this.receive()
				}
			},
			// 质押
			pledge(){
				this.showTost()
				poolcont.methods.deposit(Number(this.redeemNum)).send({from: address},(err, res) => {
					console.log(res);
					if(res){
						this.monitor(res)
					}else{
						Toast.clear()
					}
				})
			},
			// 赎回
			redeem(){
				this.showTost()
				poolcont.methods.withdraw(Number(this.redeemNum)).send({from: address},(err, res) => {
					console.log(res);
					if(res){
						this.monitor(res)
					}else{
						Toast.clear()
					}
				})
			},
			// 领取
			receive(){
				this.showTost()
				poolcont.methods.harvest().send({from: address},(err, res) => {
					console.log(res);
					if(res){
						this.monitor(res)
					}else{
						Toast.clear()
					}
				})
			},
			// 轮询
			monitor(str){
				let timer = setInterval(()=>{
					web3.eth.getTransactionReceipt(str).then(res1=>{
						if(res1){
							clearInterval(timer)
							Toast.clear()
							console.log(res1);
							if(res1.status){
								Toast({
								  message: '交易成功',
								  overlay: true,
								  forbidClick: true,
								});
							}else{
								Toast({
								  message: '交易失败',
								  overlay: true,
								  forbidClick: true,
								});
							}
						}
					})
				},1000)
			},
			// 显示加载
			showTost(){
				Toast.loading({
				  message: '请求中... ',
				  closeOnClick: false,
				  closeOnClickOverlay: false,
				  loadingType: 'spinner',
				  getContainer: "body",
				  duration: 0,
				  overlay: true
				});
			},
			// 修改 列表
			changeActive(num){
				this.popType = num
				this.show = true
			},
			// 表头样式
			headerStyle(row, rowIndex){
				return 'tableHead'
			},
			// closePop
			closePop(){
				this.redeemNum = ''
			}
		}
	}
</script>

<style lang="less"  scoped="scoped">
	.container{
		.top_nav{
			width: 100%;
			background-color: #fff;
			padding: 20px;
		}
		.btn{
			font-size: 14px;
			padding: 8px 30px;
			background-color: #e2efff;
			color: #4B62E6;
			border-radius: 5px;
		}
		.active_btn{
			background-color: #4a5eee;
			color: #fff;
		}
		/* table  */
		.table{
			margin-top: 20px;
			/deep/ .tableHead{
				font-weight: bolder;
				color: #A6A6A6;
			}
		}
		
	}
	.pop_nav{
		width: 500px;
		border-radius: 12px;
		.pop_out{
			position: relative;
		}
		img{
			width: 100%;
		}
		/deep/ .van-overlay{
			background-color: rgba(0,0,0,.7);
			filter: blur(8px);
		}
		.pop_content{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			padding: 30px 50px;
			.pop_btn{
				width: 100%;
				height: 40px;
				color: #A6A6A6;
				border-radius: 5px;
			}
			.pop_btn_a{
				background-color: #5176EC;
				color: #fff;
			}
		}
		.input_nav{
			flex: 1;
			position: relative;
			.input_content{
				padding: 10px 0;
				line-height: 100%;
				border-bottom: 1px solid #EEEEFC;
				background-color: transparent;
			}
		}
		.input_nav:before{
		       content: '';
		       position: absolute;
		       width: 200%;
		       height: 200%;
			   left: 0;
			   top: 0;
			   // z-index: 50;
		       border-bottom: 1px solid #DCDCDC;
		       -webkit-transform-origin: 0 0;
		       -moz-transform-origin: 0 0;
		       -ms-transform-origin: 0 0;
		       -o-transform-origin: 0 0;
		       transform-origin: 0 0;
		       -webkit-transform: scale(0.5, 0.5);
		       -ms-transform: scale(0.5, 0.5);
		       -o-transform: scale(0.5, 0.5);
		       transform: scale(0.5, 0.5);
		       -webkit-box-sizing: border-box;
		       -moz-box-sizing: border-box;
		       box-sizing: border-box;
		}
	}
	@media only screen and (max-width: 991px){
		.pop_nav{
			width: 90%;
		}
	}
</style>
