<template>
</template>

<script>
	import tools from '@/api/public.js'
	import Web3 from "web3"
	import axios from "axios";
	export default{
		data(){
			return {
				url: 'https://gazotc.com/Activities'
			}
		},
		mounted() {
			let flag = location.href.includes("?");
			if(flag){
				let str = location.href.substr(location.href.indexOf('?')+1,location.href.length)
				let fristStr = location.href.substr(0,location.href.indexOf('?')-4)+'/Activities'
				// 监测用户是否安装MASK
				tools.testMASK().then(res=>{
					let {web,id} = res
					axios({
					    method: "post",
					    url: `https://gazotc.com:8083/ref/${str}?meAddress=${id}`,
						// url: `https://192.168.0.48:8083/ref/${str}?meAddress=${id}`,
					    headers: {"Content-Type": "application/json; charset=utf-8"}
					  }).then((res) => {
						  let {code,result} = res
					        switch (code){
					        	case 0:
									if(result == id){
										alert('不能自己推荐自己')
										window.location.href = this.url
										return
									}else{
										if(result){
											window.location.href = fristStr + '?ref=' + result
										}else{
											window.location.href = this.url
										}
									}
					        		break;
					        	default:
					        		break;
					        }
					      }).catch(function (error) {
					        alert("error");
					      });
				}).catch((err)=>{
				})
				
				
			}else{
				window.location.href = this.url
			}
			
		}
	}
</script>

<style>
</style>
