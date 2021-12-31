<template>
	<div class="chooseMain">
		<div class="chooseClick" @click="changeShow">更多筛选<div class="arrow"></div></div>
		<div class="chooseModel" v-show="showModel">
			<div class="choose" v-for="(v,i) in chooseList" :key="i">
				<div class="title">{{v.title}}:</div>
				<input class="textInput" type="text" name="" v-model="v.value" />
			</div>
			<div class="butBox">
				<button type="button" @click="filter()">确认</button>
				<button type="button">重置</button>
			</div>
		</div>
		<div class="cover" v-show="showModel" @click="changeShow">
			
		</div>
	</div>
</template>
<script>
export default {
  name: 'choose',
  props:{
	  Ldata:{
		  type:Array
	  }
  },
  data() {
    return {
		chooseList:[
				{
					title:'数量',
					value:0,
				},
				{
					title:'限额',
					value:0,
				},
				{
					title:'保证金',
					value:0,
				},
				{
					title:'保证金比例',
					value:0,
				}
			],
			showModel:false,
			arr:[],
			arr1:[],
			arr2:[],
			arr3:[],
	};
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {
	  changeShow(){
		  if(this.showModel==false){
			  this.showModel=true
		  }else{
			  this.showModel=false
		  }
	  },
	  filter(){
		  console.log(this.Ldata)
		for(let k in this.chooseList){
				console.log(this.chooseList[k].title)
			if(this.chooseList[k].title=='数量'){
				console.log(this.chooseList[k])
				this.arr=this.Ldata.filter((v)=>{
					return Number(v.num)>=this.chooseList[k].value
				})
			}else if(this.chooseList[k].title=='限额'){
				// console.log(this.arr)
				this.arr1=this.arr.filter((v)=>{
					return Number(v.zg_mun)>=this.chooseList[k].value
				})
				console.log(this.chooseList[k].value)
			}else if(this.chooseList[k].title=='保证金'){
				// console.log(this.arr)
				this.arr2=this.arr1.filter((v)=>{
					return Number(v.bzj)>=this.chooseList[k].value
				})
			}else if(this.chooseList[k].title=='保证金比例'){
				this.arr3=this.arr2.filter((v)=>{
					return Number(v.bzj_u)>=this.chooseList[k].value
				})
			}
		}
		// this.arr=this.Ldata.filter((v)=>{
		// 	return v.num>e
		// })
		this.$emit("getdata",this.arr3)
		this.showModel=false
		console.log(this.arr3)
	  }
  },
  components: {}
};
</script>
<style lang='less' scoped='scoped'>
.chooseMain{
	position: relative;
	display: flex;
	align-items: center;
	.chooseModel{
		position: absolute;
		top: 26px;
		width: 300px;
		z-index: 999;
		border: 1px solid #eee;
		background-color: #eee;
		padding: 20px;
		border-radius: 20px;
		.choose{
			.textInput{
				width: 100%;
				margin-top: 5px;
				border-radius: 5px;
				border: 1px solid #DCDFE6;
				padding: 5px;
			}
		}
		.choose:not(:first-of-type){
			margin-top: 10px;
		}
		.butBox{
			margin-top:10px;
			display: flex;
			justify-content: space-around;
			button{
				padding: 5px 20px;
				border-radius: 3px;
			}
			button:first-of-type{
				background-color: rgb(64, 158, 255);
				color: #fff;
			}
		}
	}
	.arrow{
		display: inline-block;
		width: 10px;
		height: 10px;
		border-bottom: 1px solid #333;
		border-right: 1px solid #333;
		transform: rotate(45deg);
		margin-left: 3px;
	}
	.cover{
		display: none;
	}
}
@media only screen and (max-width: 991px){
	.chooseMain{
		position: static;
		display: flex;
		align-items: center;
		.chooseModel{
			position: fixed;
			top: 0;
			bottom: 0;
			width: 200px;
			right: 0;
			z-index: 999;
			border: 1px solid #eee;
			background-color: #eee;
			padding: 20px;
			border-radius: 0;
			.choose{
				.textInput{
					width: 100%;
					margin-top: 5px;
					border-radius: 5px;
					border: 1px solid #DCDFE6;
					padding: 5px;
				}
			}
			.choose:not(:first-of-type){
				margin-top: 10px;
			}
			.butBox{
				margin-top:10px;
				display: flex;
				justify-content: space-around;
				button{
					padding: 5px 20px;
					border-radius: 3px;
				}
				button:first-of-type{
					background-color: rgb(64, 158, 255);
					color: #fff;
				}
			}
		}
		.arrow{
			display: inline-block;
			width: 10px;
			height: 10px;
			border-bottom: 1px solid #333;
			border-right: 1px solid #333;
			transform: rotate(45deg);
			margin-left: 3px;
		}
		.cover{
			position: fixed;
			/* display: none; */
			display: block;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: #333;
			opacity: 0.8;
		}
	}
}
</style>