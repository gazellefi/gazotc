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
				<el-collapse v-model="activeName" accordion>
				  <el-collapse-item :title="item.title" :name="(index+1)" v-for="(item,index) in list" :key="index">
					<!-- <div  v-html="item.content"></div> -->
				  </el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
	</div>
	
</template>

<script>
	export default{
		data(){
			return {
				list: [
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
					}
				],
				activeName:0
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
		padding: 80px 20px;
	    margin: 0 auto;
	    height: 100%;
	    width: 1200px;
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
	@media screen and (min-width: 1200px) {
		.news_contetn {
			min-height: 700px;
		}
	}
	
	@media screen and (max-width:991px) {
		.a_c{
			margin-top: 0px !important;
		}
	}
</style>
