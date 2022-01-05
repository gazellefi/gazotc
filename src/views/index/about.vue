<template>
	<div class="about_content fc a_c">
		<el-row type="flex" justify="center">
			<el-col :sm="24" :md="12" class="des_nav fc fz18">
				<span class="fwb" style="font-size: 30px;">{{$t('message.home.aboutUs')}}：</span>
				<span class="des_text">{{$t('message.home.aboutUsContent')}}</span>
			</el-col>
			<el-col :sm="24" :md="12" class="des_nav fc fz14 des_img">
				<img src="../../assets/img/aboutUs.png"  style="width: 100%;">
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
			<div class="title">{{$t('message.home.cooperator')}}</div>
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
				  {color:'#fff',background:require('../../assets/img/about1.png')},
				  {color:'#fff',background:require('../../assets/img/about2.png')},
				  {color:'#fff',background:require('../../assets/img/about3.png')},
				  {color:'#fff',background:require('../../assets/img/about4.png')},
				  // {color:'#fff',background:require('../../assets/img/logo5.jpg')},
				  // {color:'#fff',background:require('../../assets/img/logo6.jpg')},
				  // {color:'#fff',background:require('../../assets/img/logo7.jpg')},
				  // {color:'#fff',background:require('../../assets/img/logo8.jpg')},
				]
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.about_content{
	  margin: 80px auto;
	  height: 100%;
	  width: 1200px;
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
		img{
			margin-top: 64px;
			width: 80%;
		}
	}
	@media screen and (max-width: 1200px) {
		.mediaBox{
			width: 80%;
		}
		.about_content{
		  width: 100%;
		}
		
	}
	@media screen and (max-width: 991px){
		.des_img{
			display: none;
		}
	}
</style>
