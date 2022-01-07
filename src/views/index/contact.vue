<template>
	<div class="">
		
		<div class="f a_c c_c" style="height: 315px;margin-top: 3.75rem;width: 100%;">
			<el-carousel :autoplay="false"  arrow="nerver"  indicator-position="none" height="100%">
			  <el-carousel-item style="position:relative">
				<img src="../../assets/img/giphy.gif" alt="" style="width:100%;">
			  </el-carousel-item>
			</el-carousel>
		</div>
		<div class="fc a_c" style="line-height: 150%;">
			<span class="fwb" style=" max-width: 60%;">{{$t('message.PagecontactDes')}}</span>
		</div>
		<el-row class="fc a_c contact_content">
			<el-col :sm="24" :md="12" :lg="8">
				
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
	</div>
	
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
    /deep/.el-carousel__arrow{
		opacity: 0;
	}
	.contact_content{
		// font-family: wfont_0fdfff_8589388c04414d99904b08953fbf0fcb,wf_8589388c04414d99904b08953,orig_arizone_unicase_regular;
		padding: 20px 20px 80px;
		.input_nav{
			padding: 1px 10px;
			border: 1px solid #DCDCDC;
			border-radius: 8px;
		}
	}
	
	@media screen and (max-width:991px) {
		.a_c{
			margin-top: 0px !important;
		}
	}
</style>
