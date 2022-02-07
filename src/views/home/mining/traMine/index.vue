<template>
	<div class="container fc c_c">
		<el-row class="top_nav mart-20">
			<el-col :sm="24" :md="6" class="f">
				<span class="btn active_btn" @click="changeActive(2)">收割</span>
			</el-col>
			<el-col :sm="24" :md="18">
				<div class="f a_c c6ec">
					<div class="fc a_c">
						<span class="fz14 fwb">今日奖励倒计时</span>
						<span class="fz12 mart-5">(倒计时结束即可收割奖励)</span>
					</div>
					<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" class="fz24 fwb c6ec marl-10"/>
				</div>
			</el-col>
		</el-row>
		<el-row v-for="(item,index) in list" :key="index" class="list_item">
			<!-- <el-col :span="3" class="fc a_c">
				<span class="fz12 c6e">订单ID</span>
				<span class="fz20 fwb c6e mart-20">{{item.orderId}}</span>
			</el-col> -->
			<!-- <el-col :span="6" class="fc a_c">
				<span class="fz12 c6e">成交订单时间</span>
				<span class="fz18 fwb c6e mart-20">{{item.time}}</span>
			</el-col> -->
			<el-col :span="6" class="fc a_c">
				<span class="fz12 c6e">币种</span>
				<span class="fz20 fwb c6e mart-20">{{item.id}}</span>
			</el-col>
			<el-col :span="5" class="fc a_c">
				<span class="fz12 c6e">数量</span>
				<span class="fz20 fwb c6e mart-20">{{item.frozen}}</span>
			</el-col>
			<el-col :span="4" class="fc a_c">
				<span class="fz12 c6e">奖励</span>
				<div class="c6e mart-20" v-if="item.get_p">
					<span class="fz20 fwb c361">{{item.get_p}}</span>
					<span class="fz12 marl-5">GAZ</span>
				</div>
				<span v-else class="fz20 fwb c361 mart-20">未发放</span>
			</el-col>
		</el-row>
		
		<!-- 弹框 -->
		<van-popup v-model="show" class="pop_nav" @closed="closePop">
			<div class="pop_out">
				<img :src="popType == 0 ? bg3 : popType == 1 ? bg1 : bg2" >
				<div class="pop_content fc a_c c_b">
					<div class="ca6 fwb fz20">
						<span>收割</span>
					</div>
					<span class="c6ec fwb fz14 mart-10">成交奖励</span>
					<div class="ca6 mart-10 f a_c fz18">
						<span class="fwb">距离上一次收割时间为</span>
						<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" class="fz18 fwb ca6 marl-10"/>
					</div>
					<div class="ca6 mart-10 fz12">本次操作消耗 1.2 BNB,奖励 <span  style="color: #5CB997;">12</span> GAZ 是否继续?</div>
					<div class="fc" style="width: 100%;">
						<span class="pop_btn mart-10 f a_c c_c pop_btn_a">是</span>
						<span class="pop_btn f a_c c_c mart-10" @click="show = false">否</span>
					</div>
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
	var dotsconn,web3,address,tracont;
	export default{
		data(){
			return{
				show:false,
				bg1: require('@/assets/img/mine/popBg1.png'),
				bg2: require('@/assets/img/mine/popBg2.png'),
				bg3: require('@/assets/img/mine/popBg3.png'),
				time: 30 * 60 * 60 * 1000,
				popType: 0,
				list:[],
				hbarr: [],
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
				tracont = new web3.eth.Contract(config.mine[2].abi, config.mine[2].contract);
				console.log(tracont);
				this.getFrozen()
				this.getMint()
			}).catch((err)=>{
				// web3 = new Web3(config["hyue"][config["key"]]["Url"]);
				// dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
				console.log(err);
			})
		},
		methods:{
			// 获取 钱包中 的冻结数量
			getFrozen(){
				var dq = this
				var sqllist = [];
				for (let index = 0; index < dq.hbarr.length; index++) {
					sqllist.push(dq.hbarr[index].hyue)
				}
				dotsconn.methods.ownerpro(address, sqllist).call((error, res) => {
					if(res){
						let lock_yue_arr = res[1];
						var list = []
						for (let index = 0; index < dq.hbarr.length; index++) {
							var num = Number(dq.hbarr[index]['num']);
							dq.hbarr[index].frozen = (Number(lock_yue_arr[index+1]) / (10 ** num)).toFixed(2)
							
						}
						dq.list = dq.hbarr.splice(0,4)
						this.getOrdMine()
					}
				})
			},
			// 获取 预估 奖励
			getOrdMine(){
				var sqllist = [this.list[0].key];
				// for (let index = 0; index < this.list.length; index++) {
				// 	// sqllist.push(this.list[index].hyue)
				// 	sqllist.push(this.list[index].key)
				// }
				console.log(sqllist);
				// let str = web3.utils.toHex(sqllist)
				// console.log(str);
				// console.log(web3.utils.isHexStrict(str));
				// tracont.methods.befarm(sqllist,address).call((error, res) => {
				// 	console.log(res);
				// })
			},
			//  获取 mint
			getMint(){
				tracont.methods.mint(address).call((error, res) => {
					console.log(res);
				})
			},
			// 修改 列表
			changeActive(num){
				this.popType = num
				// this.show = true
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
		.list_item{
			background-color: #fff;
			padding: 10px;
			margin-top: 10px;
			border-radius: 8px;
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
