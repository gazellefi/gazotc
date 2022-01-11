<template>
	<div class="container fc c_c">
		<div class="f c_b a_c top_nav mart-20">
			<div class="">
				<span class="btn" :class="[popType == 1 ? 'active_btn' : '']" @click="changeActive(1)">启动</span>
				<span class="btn marl-10" :class="[popType == 0 ? 'active_btn' : '']" @click="changeActive(0)">收割</span>
			</div>
			<span class="btn active_btn" @click="changeActive(2)">领取</span>
		</div>
		<el-table v-loading="jiazai" :data="list" :header-row-class-name="headerStyle" class="table">
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
			<el-table-column align=center label="总收益">
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
		</el-table>
		
		<!-- 弹框 -->
		<van-popup v-model="show" class="pop_nav" @closed="closePop">
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
		</van-popup>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				jiazai: false,
				show:false,
				bg1: require('@/assets/img/mine/popBg1.png'),
				bg2: require('@/assets/img/mine/popBg2.png'),
				bg3: require('@/assets/img/mine/popBg3.png'),
				redeemNum: '',
				popType: 1, // 0 ：收割    1：启动    2：领取
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
		methods:{
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
