<template>
	<div class="chongzhi">
		<el-form size='mini' ref="form" :model="form" label-width="90px">

			<el-form-item :label="$t('message.chooseCoin')">
				<el-select v-model="form.region" :placeholder="$t('message.chooseContent')"  @change="changeSelect">
					<el-option v-for="item in huobi" :key="item.key"  :label="item.id" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('message.extract')">
				<el-input v-model="je"></el-input>
			</el-form-item>
			<el-form-item label-width="0">
				<span style="color: #DCDCDC;">{{$t('message.canWithdraw')}}：{{ (huobi[hbindex]['je']/ (10**huobi[hbindex]['num'])).toFixed(2)  }}</span>
			</el-form-item>
			<el-form-item class="chongzhiBtn" label-width="0">
				<span @click="tixianajax" class="f c_c a_c fz14 cursor" style="width: 100%;height: 30px;background-color: #fdc500;color: #fff;">{{$t('message.WithdrawMoney')}}</span>
				<!-- <van-button size='small' color="#fdc500" type="primary" block @click="tixianajax">{{$t('message.WithdrawMoney')}}</van-button> -->
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
	import {
		Toast
	} from 'vant';

	import tools from '@/api/public.js'
	import config from "@/config";
	var hbarr = [];
	
	for (const key in config['hbi'][config['key']]) {
	  config['hbi'][config['key']][key]['je'] = 0;
	  hbarr.push(config['hbi'][config['key']][key]);
	}

	var web3 = "";
	var address = "";
	var ethereum = window.ethereum;
	export default {
		data() {
			return {
				huobi: hbarr,
				hbindex: 0,
				je: 0,
				form: {
					region: ''
				}
			}
		},
		props: ['type'],
		created() {
			this.form.region = this.type
			this.je = 0
			if(this.type){
				this.changeSelect(this.type)
			}
		},
		watch: {
			type(){
				this.form.region = this.type
				this.je = 0
				if(this.type){
					this.changeSelect(this.type)
				}
			}
		},
		mounted() {
			if (this.$route.query.title) {
				for (let index = 0; index < this.huobi.length; index++) {
					if (this.huobi[index]['id'] == this.$route.query.title) {
						this.hbindex = index;
						
					}
				}
			}

			var dq = this;
			//监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
			}).catch((err)=>{
				console.log(err);
			})

		},
		methods: {
			changeSelect(e) {
				for (let i = 0; i < this.huobi.length; i++) {
					if (this.huobi[i].id == e) {
						this.hbindex = i
					}
				}
				setTimeout(()=>{
					this.gethuobizichan();
				},500)
			},
			async gethuobizichan() {
			  //查询资产余额
			  var czconn = new web3.eth.Contract(
			    config['hyue'][config['key']]['Ccdotc']['abi'],
			    config['hyue'][config['key']]['Ccdotc']['heyue']
			  );
			  var pro = await czconn.methods.balancepro(address, this.huobi[this.hbindex]['heyue']).call();
			  this.huobi[this.hbindex]['je'] = pro;
			},
			tixianajax() {
			  Toast.loading({ message: this.$t('message.wallet.withdrawing') });
			  var dq_je = this.huobi[this.hbindex]['je'];
			  var dq = this;
			  var czconn = new web3.eth.Contract(
			    config['hyue'][config['key']]['Ccdotc']['abi'],
			    config['hyue'][config['key']]['Ccdotc']['heyue']
			  );
			  var tkje = this.je * (10 ** this.huobi[this.hbindex]['num']);
			  tkje = tools.getnume(tkje);
			  if (this.huobi[this.hbindex]['je'] >= Number(tkje)) {
			    //执行提款操作
			    czconn.methods.withdraw(this.huobi[this.hbindex]['heyue'], tkje).send({
			      from: address
			    }, (err, ret) => {
					console.log(ret);
			      if (ret) {
			        tikchaxun();
			      } else {
			        Toast.clear();
			        Toast.fail(this.$t('message.wallet.submit1'));
			      }
			    });
			  } else {
			    Toast.clear();
			    // Toast.fail('The withdrawal amount cannot exceed the withdrawal limit');
				Toast.fail(this.$t('message.wallet.withdrawAmount'));
			  }
			
			  //轮询查询是否提款成功
			  function tikchaxun() {
			    var tk_je = dq_je - (dq.je * (10 ** dq.huobi[dq.hbindex]['num']));
			    czconn.methods.balancepro(address, dq.huobi[dq.hbindex]['heyue']).call((err, ret) => {
			      if (ret) {
			        if (ret == tk_je) {
			          Toast.clear();
			          // Toast.success('Successful withdrawal');
					  Toast.success(this.$t('message.wallet.withdrawSuccess'));
			          dq.huobi[dq.hbindex]['je'] = tk_je;
					  dq.je = 0
					  dq.$emit('drawal')
			        } else {
			          setTimeout(() => {
			            tikchaxun();
			          }, 3000);
			        }
			      }
			    });
			  }
			}
		}
	}
</script>

<style scoped>
	.chongzhi {
		width: 100%;
		overflow: auto;
		padding: 35px 60px;
		padding-bottom: 80px;
	}

	.czhiview {
		width: 375px;
		margin-left: calc((100% - 375px) / 2);
		float: left;
	}

	.czhiview_form {
		width: 100%;
		float: left;
	}

	.czhiview_form_hblist {
		width: calc(100% - 30px);
		float: left;
		overflow: hidden;
		background-color: #fff;
		margin-top: 15px;
		margin-left: 15px;
		height: 50px;
		border-radius: 5px;
	}

	.czhiview_form_hblist_t {
		float: left;
		line-height: 50px;
		font-size: 14px;
		padding: 0 15px;
		opacity: 0.8;
	}

	.czhiview_form_hblist_ul {
		display: flex;
		overflow-x: scroll;
		height: 50px;
		align-items: center;
		margin-right: 15px;
	}

	.czhiview_form_hblist_item {
		margin: 0 10px;
		font-size: 14px;
		opacity: 0.5;
	}

	.czhiview_form_hblist_item.ac {
		color: rgb(19, 208, 255);
		opacity: 1;
	}

	.czhiview_form_shurk {
		width: calc(100% - 60px);
		margin-left: 15px;
		background-color: #fff;
		margin-top: 15px;
		float: left;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		padding: 15px 15px;
	}

	.czhiview_form_shurk_t {
		font-size: 18px;
		opacity: 0.9;
	}

	.czhiview_form_shurk_input {
		display: flex;
		margin-top: 15px;
		align-items: center;
	}

	.czhiview_form_shurk_input_l {
		margin-right: 10px;
		font-size: 24px;
		font-weight: 500;
		opacity: 0.8;
	}

	.czhiview_form_shurk_input input {
		flex-grow: 1;
	}

	.czhiview_form_czhi {
		float: left;
		width: calc(100% - 30px);
		margin-left: 15px;
		margin-top: 30px;
	}

	.czhiview_form_shurk_msg {
		padding-top: 15px;
		opacity: 0.5;
		font-size: 14px;
		padding-left: 10px;
	}
</style>
