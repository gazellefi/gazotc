<template>
	<div class="container fc">
		<div class="right" @click="scoll('next')" v-show="tabIndx == 0">
			<img :src="right">
		</div>
		<div class="left">
			<img :src="left" @click="scoll('pra')" v-show="tabIndx == 1">
		</div>
		<el-row class="top_nav mart-20">
			<el-col :sm="24" :md="6" class="f">
				<span class="btn active_btn" @click="changeActive(2)">推广</span>
			</el-col>
			<el-col :sm="24" :md="18">
				<div class="f a_c c_r c6ec" style="height: 30px;">
					<div class="fz14 c6ec" style="margin-right: 30px;">
						<span>节点名称：</span>
						<span>0022e....322654</span>
					</div>
					<div class="fz14 c6ec" style="margin-right: 30px;">
						<span>节点等级：</span>
						<span>1</span>
					</div>
					<div class="fz14 c6ec">
						<span>返佣比例：</span>
						<span>30%</span>
					</div>
				</div>
			</el-col>
		</el-row>
		<!-- 滚动 -->
		<el-row type="flex" class="sollor_nav" ref="sollor_nav">

			<el-col :span="24" class="list1">
				<div>
					<span class="fz14 c6e">交易手续费奖励明细</span>
				</div>
				<el-row class="fz14 c6e mart-20">
					<el-col :span="8">
						<div class="f c_c">
							<span>序号</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c">
							<span>币种</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c">
							<span>奖励</span>
						</div>
					</el-col>
				</el-row>
				<el-row v-for="(item,index) in list" :key="index" class="mart-10 list_item c6e">
					<el-col :span="8">
						<div class="f c_c fwb fz20">
							<span>{{item.orderId}}</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c fwb fz18">
							<span>{{item.type}}</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c a_e">
							<span class="c361 fwb fz20">{{item.profit_a}}</span>
							<span class="fz12 marl-5">{{item.type}}</span>
						</div>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="24" class="list2">
				<div>
					<span class="fz14 c6e">挖矿奖励明细</span>
				</div>
				<el-row class="fz14 c6e mart-20">
					<el-col :span="8">
						<div class="f c_c">
							<span>序号</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c">
							<span>币种</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c">
							<span>奖励</span>
						</div>
					</el-col>
				</el-row>
				<el-row v-for="(item,index) in list" :key="index" class="mart-10 list_item fz20 c6e">
					<el-col :span="8">
						<div class="f c_c fwb">
							<span>{{item.orderId}}</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c fwb">
							<span>{{item.type}}</span>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="f c_c a_e">
							<span class="c361 fwb">{{item.profit_a}}</span>
							<span class="fz12 marl-5">{{item.type}}</span>
						</div>
					</el-col>
				</el-row>
			</el-col>

		</el-row>

		<!-- 弹框 -->
		<van-popup v-model="show" class="pop_nav" @closed="closePop">
			<div class="pop_out">
				<img :src="popType == 0 ? bg3 : popType == 1 ? bg1 : bg2">
				<div class="pop_content fc a_c c_b">
					<div class="ca6 fwb fz20">
						<span>收割</span>
					</div>
					<span class="c6ec fwb fz14 mart-10">成交奖励</span>
					<div class="ca6 mart-10 f a_c fz18">
						<span class="fwb">距离上一次收割时间为</span>
						<van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" class="fz18 fwb ca6 marl-10" />
					</div>
					<div class="ca6 mart-10 fz12">本次操作消耗 1.2 BNB,奖励 <span style="color: #5CB997;">12</span> GAZ 是否继续?
					</div>
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
	export default {
		data() {
			return {
				show: false,
				tabIndx: 0,
				bg1: require('@/assets/img/mine/popBg1.png'),
				bg2: require('@/assets/img/mine/popBg2.png'),
				bg3: require('@/assets/img/mine/popBg3.png'),
				right: require('@/assets/img/mine/right.png'),
				left: require('@/assets/img/mine/left.png'),
				time: 30 * 60 * 60 * 1000,
				popType: 0,
				list: [{
						time: '2020-01-01  13:23:22',
						type: 'GAZ',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20,
						orderId: 0
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'USDT',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20,
						orderId: 1
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'BTC',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 0,
						orderId: 2
					},
					{
						time: '2020-01-01  13:23:22',
						type: 'ETH',
						num: 700,
						profit_q: 33,
						profit_a: 80,
						get_p: 20,
						orderId: 3
					}
				]
			}
		},
		methods: {
			// 修改 列表
			changeActive(num) {
				this.popType = num
				this.show = true
			},
			// 表头样式
			headerStyle(row, rowIndex) {
				return 'tableHead'
			},
			// closePop
			closePop() {
				this.redeemNum = ''
			},
			// 滚动
			scoll(f) {
				var that = this
				this.$nextTick(() => {
					let box = this.$el.querySelector(".sollor_nav")
					let aa = box.offsetWidth
					if (f == 'next') {
						box.scrollLeft = aa / 2
						this.tabIndx = 1
					} else {
						box.scrollLeft = 0
						this.tabIndx = 0
					}
				})

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container {
		height: 100%;
		position: relative;

		.left,
		.right {
			width: 50px;
			height: 50px;
			position: absolute;
			top: 50%;
			z-index: 2;
			img {
				width: 100%;
			}
		}

		.left {
			left: 0;
		}

		.right {
			right: 0;
		}

		.top_nav {
			width: 100%;
			background-color: #fff;
			padding: 20px;
		}

		.btn {
			font-size: 14px;
			padding: 8px 30px;
			background-color: #e2efff;
			color: #4B62E6;
			border-radius: 5px;
		}

		.active_btn {
			background-color: #4a5eee;
			color: #fff;
		}

		.list1,
		.list2 {
			// height: 200px;
			width: 100%;
			flex-shrink: 0;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			position: relative;
			background-color: #fff;
			padding: 20px;
		}

		.sollor_nav {
			scroll-snap-type: x mandatory;
			overflow: scroll;
			-ms-overflow-style: none;
			overflow: -moz-scrollbars-none;
			margin-top: 20px;
			border-radius: 10px;
			.list_item{
				border-bottom: 1px solid rgba(238, 239, 241, .5);
				padding: 15px 0;
			}
		}

		.sollor_nav::-webkit-scrollbar {
			height: 0;
			width: 0;
		}

	}

	.pop_nav {
		width: 500px;
		border-radius: 12px;

		.pop_out {
			position: relative;
		}

		img {
			width: 100%;
		}

		/deep/ .van-overlay {
			background-color: rgba(0, 0, 0, .7);
			filter: blur(8px);
		}

		.pop_content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			padding: 30px 50px;

			.pop_btn {
				width: 100%;
				height: 40px;
				color: #A6A6A6;
				border-radius: 5px;
			}

			.pop_btn_a {
				background-color: #5176EC;
				color: #fff;
			}
		}

		.input_nav {
			flex: 1;
			position: relative;

			.input_content {
				padding: 10px 0;
				line-height: 100%;
				border-bottom: 1px solid #EEEEFC;
				background-color: transparent;
			}
		}

		.input_nav:before {
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

	@media only screen and (max-width: 991px) {
		.pop_nav {
			width: 90%;
		}
	}
</style>
