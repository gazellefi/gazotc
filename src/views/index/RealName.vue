<template>
	<div style="height: 100vh;width: 100wh;">
		<!-- <iframe :src="url" width="100%" height="100%" allow="camera"></iframe> -->
		<iframe :src="url" width="70%" height="100%" allow="camera;fullscreen;accelerometer;gyroscope;magnetometer" allowfullscreen></iframe>

	</div>
</template>

<script>
	export default{
		data(){
			return {
				resData: '',
				url: ''
			}
		},
		created() {
			this.url = this.$route.query.url;
		},
		methods:{
			// getData(address1){
			// 	let aa = {
			// 		address: address1
			// 	}
			// 	api.RealName('address='+ address1).then((res)=>{
			// 		this.url = res.result.redirectUrl
			// 		this.resData = JSON.stringify(res)
			// 	})
			// }
		}
	}
</script>

<style>
</style>
