<template>
	<el-row class="fc a_c contact_content">
		<el-col :sm="24" :md="12" :lg="6">
			<div style="line-height: 150%;">
				<span class="fwb">{{$t('message.PagecontactDes')}}</span>
			</div>
			<div class="mart-20">
				<span>{{$t('message.userName')+':'}}</span>
			</div>
			<div class="input_nav mart-20">
				<van-field v-model="name" label-width="0" :placeholder="$t('message.setName')" />
			</div>
			<div class="mart-20">
				<span>{{$t('message.userEmail')+':'}}</span>
			</div>
			
			<div class="input_nav mart-20">
				<van-field v-model="email" label-width="0" :placeholder="$t('message.enterEmail')" />
			</div>
			<div class="mart-20">
				<span>{{$t('message.leaveMessage')+':'}}</span>
			</div>
			
			<div class="input_nav mart-20">
				<van-field rows="5" autosize type="textarea" v-model="email" label-width="0" :placeholder="$t('message.enterContent')" />
			</div>
			<div class="f c_c mart-20">
				<van-button round  :loading="loading" type="info" :loading-text="$t('message.loading')" block @click="submit">{{$t('message.sumbmit')}}</van-button>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
				name: '',
				email: '',
				loading: false
			}
		},
		methods:{
			submit(){
				this.loading = true
				setTimeout(()=>{
					this.$nextTick(()=>{
						this.loading = false
					})
				},3000)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.contact_content{
		padding: 80px 20px 80px;
		.input_nav{
			padding: 0 10px;
			border: 1px solid #DCDCDC;
			border-radius: 8px;
		}
	}
</style>
