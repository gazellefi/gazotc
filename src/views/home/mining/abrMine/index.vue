<template>
	<div class="container fc c_c">
		<div class="f c_b a_c top_nav mart-20">
			<div class="">
				<span class="btn" :class="[active_btn == 0 ? 'active_btn' : '']" @click="changeActive(0)">质押</span>
				<span class="btn marl-10" :class="[active_btn == 1 ? 'active_btn' : '']" @click="changeActive(1)">赎回</span>
			</div>
			<span class="btn active_btn">领取</span>
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
		</el-table>
		
		<!-- 弹框 -->
		<van-popup v-model="show" class="pop_nav">
			<div class="pop_out">
				<img :src="bg1" >
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active_btn: 0,
				jiazai: false,
				show:true,
				bg1: require('@/assets/img/mine/popBg1.png'),
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
				this.active_btn = num
			},
			// 表头样式
			headerStyle(row, rowIndex){
				return 'tableHead'
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
		width: 50%;
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
	}
	@media only screen and (max-width: 991px){
		.pop_nav{
			width: 80%;
		}
	}
</style>
