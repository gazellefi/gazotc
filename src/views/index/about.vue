<template>
	<div class="about_content fc a_c">
		<el-row type="flex" justify="center">
			<el-col :sm="24" :md="12" class="des_nav fc fz14">
				<span class="fwb fz16">关于我们：</span>
				<span class="des_text">Gazelle致力于为用户提供小而精的DOTC服务，打造安全、便捷、社区自治的DOTC平台。解决D
				EFI生态中不可或缺的环节：OTC法币业务。GAZOTC利用在BSC上的网络执行的高效性，采取Dapp智能合约运行，用户与用户
				之间采取点对点对应的交易方式。平台具有三大机制：3.资产安全机制。2.争议解决机制。3.反洗钱机制。GAZOTC经由Certik合
				约专业审计给出评价较高的审计报告，同时GAZOTC在整个安全方面涵盖了防黑钱机制，防冻卡机制以及仲裁委员会机制下保证交易
				安全的进行。采用保证金+分布式仲裁制度，确保用户资产安全。</span>
			</el-col>
		</el-row>
		<el-row class="character_nav">
			<el-col :sm="24" :md="8" v-for="(item,index) in list" :key="index" class="character_item">
				<router-link :to="item.url">
					<div class="fc a_c">
						<van-image round width="10rem" height="10rem" fit="cover" :src="item.img"/>
						<span class="mart-10 fwb fz16">{{item.text}}</span>
					</div>
				</router-link>
			</el-col>
		</el-row>
		<el-row class="mediaBox">
			<!-- <div class="title">{{$t('message.home.media')}}</div> -->
			<div class="title">合作者</div>
			<el-col class="mediaItem f c_c" :sm="24" :md="6"  v-for="(v,i) in mediaList" :key="i" :style="{backgroundColor:v.color}">
				<img :src="v.background" />
			</el-col>
		</el-row>
		<!-- <div class="mediaBox">
			
			<div class="mainBox">
				<div class="mediaItem" v-for="(v,i) in mediaList" :key="i" :style="{backgroundColor:v.color}">
					<img :src="v.background" >
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{
						img: require('@/assets/img/about/image1.png'),
						text: 'CEO',
						url: 'https://my.indeed.com/p/edwardse-88msdnt'
					},
					{
						img: require('@/assets/img/about/image3.png'),
						text: 'CMO',
						url: 'https://my.indeed.com/p/robertw-4gz9v5f'
					},
					{
						img: require('@/assets/img/about/image4.png'),
						text: 'CTO',
						url: 'https://my.indeed.com/p/jerryi-kt7mqss'
					}
				],
				mediaList:[
				  {color:'#fff',background:require('../../assets/img/logo1.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo2.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo3.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo4.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo5.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo6.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo7.jpg')},
				  {color:'#fff',background:require('../../assets/img/logo8.jpg')},
				]
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.about_content{
		margin: 3.75rem 0;
		.des_nav{
			padding: 0 20px;
			.des_text{
				display: block;
				padding-top: 20px;
				text-indent: 2em;
				line-height: 150%;
				color: #333;
			}
		}
	}
	.character_nav{
		width: 100%;
		.character_item{
			margin-top: 11.9375rem;
		}
	}
	.mediaBox{
		margin-top: 191px;
		.title{
			font-size: 36px;
			font-weight: bold;
			text-align: center;
		}
		.mainBox{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 64px;
			.mediaItem{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 234px;
				height: 148px;
				margin: 7px;
			}
			.mediaItem:first-of-type{
				img{
					width: 80%;
				}
			}
		}
	}
	@media screen and (min-width: 1200px) {
		.mediaBox{
			width: 80%;
		}
	}
</style>
