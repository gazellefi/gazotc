<template>
	<div class="container fc c_c">
		<div class="f c_b a_c top_nav mart-20">
			<div class="f">
				<div class="fc a_c">
					<span class="btn" :class="[popType == 1 ? 'active_btn' : '', isclick?'cursor': 'disable']" @click="changeActive(1)">启动</span>
					<span class="mart-10 fz12">保证金余额</span>
					<span class="mart-10 fz12">{{bzjNum}} Gaz</span>
				</div>
				<div class="fc a_c  marl-10">
					<span class="btn" :class="[popType == 0 ? 'active_btn' : '', isclick && (Profit > 0) ?'cursor': 'disable']" @click="changeActive(0)">收割</span>
					<span class="mart-10 fz12">待收益</span>
					<span class="mart-10 fz12">{{Profit}} Gaz</span>
				</div>
				
			</div>
			<span>已领取: {{ draw }}</span>
		</div>
		
		<!-- 弹框 -->
<!-- 		<van-popup v-model="show" class="pop_nav" @closed="closePop">
			<div class="pop_out">
				<img :src="popType == 0 ? bg3 : popType == 1 ? bg1 : bg2" >
				<div class="pop_content fc a_c c_b">
					<div class="ca6 fwb fz18">
						<span v-if="popType == 0">当前可收割奖金为</span>
						<span v-else-if="popType == 1">当前保证金余额为</span>
						<span v-else>当前可领取奖金余额为</span>
						<span class="fz20" style="color: #5CB997;">1000</span>
						<span>GAZ</span>
					</div>
					<div class="ca6 fwb fz18">
						<span v-if="popType == 0">确定收割利益?</span>
						<span v-else-if="popType == 1">确定启动挖矿?</span>
						<span v-else>确定领取?</span>
					</div>
					<span class="ca6 fz12">(此操作需要区块链钱包消息签名,本操作不消耗GAZ)</span>
					<div class="fc" style="width: 100%;">
						<span class="pop_btn mart-10 f a_c c_c pop_btn_a">是</span>
						<span class="pop_btn f a_c c_c mart-10" @click="show = false">否</span>
					</div>
				</div>
			</div>
		</van-popup> -->
	</div>
</template>

<script>
	import tools from '@/api/public.js'
	import config from "@/config";
	import Web3 from "web3"
	import { Dialog, Toast, Notify } from 'vant';
	var dotsconn,web3,address,abrcont,ArbOne;
	var dotc_abi = config["hyue"][config["key"]]["dotc"]["abi"];
	var dotc_heyue = config["hyue"][config["key"]]["dotc"]["heyue"];
	var bzjnum = config['hyue'][config['key']]['Bzj']['num'];
	export default{
		data(){
			return{
				jiazai: false,
				show:false,
				bg1: require('@/assets/img/mine/popBg1.png'),
				bg2: require('@/assets/img/mine/popBg2.png'),
				bg3: require('@/assets/img/mine/popBg3.png'),
				popType: 1, // 0 ：收割    1：启动    2：领取
				bzjNum: 0,  //用户保证金
				Profit: 0, // 用户待收益数量
				abrId: '', // 仲裁编号
				isclick: false,  // 是否可以点击启动和收割
				draw: 0 // 已领取数量 
			}
		},
		mounted() {
			// 监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				// dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
				abrcont = new web3.eth.Contract(config.mine[0].abi, config.mine[0].contract);
				ArbOne = new web3.eth.Contract(
				  config['hyue'][config['key']]['ArbOne']['abi'],
				  config['hyue'][config['key']]['ArbOne']['heyue']
				);
				console.log(ArbOne);
				this.getBlond()
				this.getProfit()
				this.getharvest()
				this.getUserInfo()
			}).catch((err)=>{
				// web3 = new Web3(config["hyue"][config["key"]]["Url"]);
				// dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
				console.log(err);
			})
		},
		methods:{
			// 获取用户信息
			getUserInfo(){
				abrcont.methods.userInfo(address).call((err,res) =>{
					// console.log(res);
					this.draw = res.harved
				})
			},
			// 获取用户保证金 和 仲裁编号
			getBlond(){
				ArbOne.methods.arber(address).call((err, res) => {
				  //仲裁编号
				  if (res) {
				    this.abrId = res
					//保证金
					ArbOne.methods.ownermess(address + "").call((err, ret) => {
						this.bzjNum = Number(ret[1][0]) / (10 ** bzjnum)
						if(this.abrId && this.bzjNum){
							this.isclick = true
						}else{
							this.isclick = false
						}
					})
				  }
				});
			},
			// 获取 待收益
			getProfit(){
				abrcont.methods.beharvest(address).call((err,res) =>{
					if(res){
						this.Profit = res
					}
				})
			},
			// 预期收割数量
			getharvest(){
				abrcont.methods.harvest().call((err,res) =>{
					console.log(res);
				})
			},
			// 收割
			harvest(){
				abrcont.methods.harvest().send({from: address},(err,res) =>{
					console.log(res);
				})
			},
			// 启动
			start(){
				var loading = Toast.loading({
				  message: '请求中... ',
				  closeOnClick: false,
				  closeOnClickOverlay: false,
				  loadingType: 'spinner',
				  getContainer: "body",
				  duration: 0,
				  overlay: true
				});
				abrcont.methods.startfarm().send({from: address},(err,res) =>{
					// 提交后轮询 交易是否成功
					if(res){
						let timer = setInterval(()=>{
							web3.eth.getTransactionReceipt(res).then(res1=>{
								// console.log(res1);
								if(res1){
									clearInterval(timer)
									loading.clear()
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
					}else{
						loading.clear()
						Toast({
						  message: '交易失败',
						  overlay: true,
						  forbidClick: true,
						});
					}
					
				})
			},
			// 显示弹框 
			changeActive(num){
				if(num == 1){ //启动
				   this.start()
				}else if(num == 0) {// 收割
				   this.harvest()
				}
				// this.popType = num
				// this.show = true
			},
			// 表头样式
			headerStyle(row, rowIndex){
				return 'tableHead'
			},
			// closePop
			closePop(){
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
		width: 400px;
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
