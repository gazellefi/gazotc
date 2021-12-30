<template>
	<div class="chooseMain">
		<div class="chooseClick" @click="changeShow">下拉</div>
		<div class="chooseModel" v-show="showModel">
			<div class="choose" v-for="(v,i) in chooseList" :key="i">
				<div class="title">{{v.title}}</div>
				<div class="chooseList">
					<div class="chooseItem" v-for="(val,ind) in v.child" :key="ind">{{val}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'choose',
  data() {
    return {
		chooseList:[
				{
					title:'数量',
					child:['11','22','33'],
				},{
					title:'限额',
					child:['11','22','33'],
				},
			],
			showModel:false
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
	  }
  },
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
/deep/.el-dropdown {
  color: #ffffff !important;
}
/* /deep/.el-dropdown {
  color: #333 !important;
} */
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
			.chooseList{
				display: flex;
				justify-content: space-around;
				
				.chooseItem{
					flex: 1;
					text-align: center;
					background-color: #fff;
					padding:5px 10px;
					border-radius: 5px;
					margin: 5px;
				}
			}
		}
		.choose:not(:first-of-type){
			margin-top: 20px;
		}
	}
}
</style>