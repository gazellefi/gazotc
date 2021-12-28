<template>
	<el-row class="news_contetn" type="flex" justify="center">
		<el-col :sm="24" :md="12" :lg="12">
			<el-collapse v-model="activeName" accordion>
			  <el-collapse-item :title="item.title" :name="(index+1)" v-for="(item,index) in list" :key="index">
			    <div  v-html="item.content"></div>
			  </el-collapse-item>
			</el-collapse>
		</el-col>
	</el-row>
</template>

<script>
	export default{
		data(){
			return {
				list: [
					{
						title: '圣诞快乐！！！',
						content: `<img src="https://only.cam/images/ambassador2.jpg" />`
					}
				],
				activeName:0
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.news_contetn{
		width: 100%;
		padding: 80px 20px;
	}
	div{
		/deep/ .el-collapse-item__header{
				padding: 15px 0;
				text-align: center;
				border-radius: 5px;
				// font-size: 18px;
				font-weight: bolder;
			}
	}
	@media screen and (min-width: 1200px) {
		.news_contetn {
			min-height: 700px;
		}
	}
</style>
