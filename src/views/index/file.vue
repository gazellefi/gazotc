<template>
	<div class="">
		<div class="f a_c c_c" style="height: 315px;margin-top: 3.75rem;width: 100%;">
			<el-carousel :autoplay="false"  arrow="nerver"  indicator-position="none" height="100%">
			  <el-carousel-item style="position:relative">
				<img src="../../assets/img/giphy.gif" alt="" style="width:100%;">
			  </el-carousel-item>
			</el-carousel>
		</div>
		<el-row class="news_contetn" type="flex" justify="center">
			<el-col :sm="24" :md="24" :lg="24">
				<el-collapse  v-model="activeName" accordion>
				  <el-collapse-item :title="item.title" :name="(index+1)" v-for="(item,index) in list" :key="index">
					<!-- <div  v-html="item.content"></div> -->
					<el-collapse class="otherModle" v-model="otherName" accordion v-if="item.title==$t('message.home.otherD')">
					  <el-collapse-item class="fz16" :title="k.title" :name="(i+1)" v-for="(k,i) in otherList" :key="i">
						 <!-- <div  v-html="k.content"></div> -->
						 <img src="../../assets/img/psd4.jpg" width="100%" v-if="k.title=='个人中心'"/>
						 <img src="../../assets/img/psd3.jpg" width="100%" v-if="k.title=='法币钱包'"/>
						 <img src="../../assets/img/psd1.jpg" width="100%" v-if="k.title=='发布订单'"/>
						 <img src="../../assets/img/psd2.jpg" width="100%" v-if="k.title=='法币交易订单详情'"/>
					  </el-collapse-item>
					</el-collapse>
					<airDrop v-if="item.title==$t('message.home.airDrop')"></airDrop>
				  </el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
		<!-- <img src="../../assets/img/psd1.jpg" > -->
	</div>
	
</template>

<script>
	import airDrop from "../../components/airDrop.vue"
	export default{
		components: { airDrop },
		data(){
			return {
				list: [
					{
						title: this.$t('message.home.airDrop'),
						content: `<img src="https://only.cam/images/ambassador2.jpg" />`
					},
					{
						title: this.$t('message.home.textD'),
						content: `<img src="https://only.cam/images/ambassador2.jpg" />`
					},
					{
						title: this.$t('message.home.videoD'),
						content: `<img src="https://only.cam/images/ambassador2.jpg" />`
					},
					{
						title: this.$t('message.home.otherD'),
						content: `<img src="https://only.cam/images/ambassador2.jpg" />`
					},
				],
				otherList: [
					{
						title: this.$t('message.dapp.PersonalCenter'),
						// content:`<img src="../../assets/img/psd4.jpg" width="100%"/>`
					},
					{
						title: this.$t('message.dapp.legalWallet'),
						// content:`<img src="../../assets/img/psd3.jpg" width="100%"/>`
					},
					{
						title: this.$t('message.dapp.ReleaseOrder'),
						// content:`<img src="../../assets/img/psd1.jpg" width="100%"/>`
					},
					{
						title: this.$t('message.arbitration.orderDes'),
						// content:`<img src="../../assets/img/psd2.jpg" width="100%"/>`
					},
				],
				activeName:1,
				otherName:0,
			}
		},
		mounted() {
			// this.getData(this.$route.query.jh)
			console.log(this.$route.query.type);
			
		},
		methods:{
			goDocument(e){
				console.log(e);
				if(e==1){
					window.location.href='/airDrop.html'
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	/deep/.el-carousel__arrow{
		opacity: 0;
	}
	.news_contetn{
		width: 100%;
		padding: 80px 0;
	    margin: 0 auto;
	    height: 100%;
	}
	div{
		/deep/ .el-collapse-item__header{
				padding: 15px 0;
				text-align: center;
				border-radius: 5px;
				font-size: 18px;
				font-weight: bolder;
			}
	}
	.f18{
		font-size: 18px;
		padding: 14px 0;
	}
	@media screen and (min-width: 1200px) {
		.news_contetn {
			min-height: 700px;
			max-width: 1200px;
		}
	}
	
	@media screen and (max-width:991px) {
		.a_c{
			margin-top: 0px !important;
		}
		.news_contetn{
			padding: 0 20px;
		}
	}
	.otherModle{
		padding: 10px;
		font-size: 16px;
		/deep/ .el-collapse-item__header{
				text-align: center;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bolder;
			}
	}
</style>
