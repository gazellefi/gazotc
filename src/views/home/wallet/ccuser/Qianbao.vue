<template>
	<div class="qianbao">
		<el-row class="head hidden-sm-and-down" type="flex" justify="space-between" >
			<el-col :sm="24" :md="8" :lg="5">
				<div class="left c_b">
					<div class="f a_c">
						<img src="@/assets/img/money1.png" style="width: 20px;" class="marr-10">
						<div> {{ $t("message.dapp.capitalAsset")}}</div>
					</div>
					<div class="num">{{ user_zc.toFixed(2) }}</div>
				</div>
			</el-col>
			<el-col :sm="24" :md="10" class="f c_r a_c">
				<div class="right hidden-sm-and-down" style="margin-right: 20px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				<div class="right hidden-sm-and-up" style="margin-top: 10px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				
			</el-col>
		</el-row>
		<el-row class="head hidden-sm-and-up" >
			<el-col :sm="24" :md="5">
				<div class="left c_b">
					<div class="f a_c">
						<img src="@/assets/img/money1.png" style="width: 20px;" class="marr-10">
						<div> {{ $t("message.dapp.capitalAsset")}}</div>
					</div>
					<div class="num">{{ user_zc.toFixed(2) }}</div>
				</div>
			</el-col>
			<el-col :sm="24" :md="10" class="f a_c">
				<div class="right hidden-sm-and-down" style="margin-right: 20px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				<div class="right hidden-sm-and-up" style="margin-top: 10px;">
					<div @click="isShowChongzhi=true" class="btn chongzhi">{{$t('message.ChargeMoney')}}</div>
					<div @click="isShowTixan=true" class="btn tixian">{{$t('message.WithdrawMoney')}}</div>
				</div>
				
			</el-col>
		</el-row>
		<el-row style="margin-top: 5px;">
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{ $t("message.dapp.currency")}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.available')}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.arbitration.frozen')}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav"><span class="fz16 fwb">{{$t('message.operation')}}</span></div>
			</el-col>
		</el-row>
		<el-row v-for="(item,index) in list" :key="index">
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.name}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.balancepro}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav c6"><span>{{item.lockpro}}</span></div>
			</el-col>
			<el-col :span="6">
				<div class="item_nav" v-if="item.key == 'baozhengjing'">
					<span class="cba cursor">{{$t('message.changeInto')}}</span>
					<span class="c935 cursor" style="margin-left: 20px;">{{$t('message.changeOut')}}</span>
				</div>
				<div class="item_nav" v-else>
					<span class="cba cursor" @click="showChongzhi(item)">{{$t('message.ChargeMoney')}}</span>
					<span class="c935 cursor"  @click="showTixian(item)" style="margin-left: 5px;">{{$t('message.WithdrawMoney')}}</span>
				</div>
			</el-col>
		</el-row>
		<myDialog width="320px" :isShowFooter="false" :title="$t('message.Recharge')" :closeModal="false" :closePress="false"
			:visible.sync="isShowChongzhi">
			<Chongzhi :type="type_c" @Recharge="Recharge"></Chongzhi>
		</myDialog>

		<myDialog width="320px" :isShowFooter="false" :title="$t('message.WithdrawMoney')" :closeModal="false" :closePress="false"
			:visible.sync="isShowTixan">
			<Tixian :type="type_t" @drawal="drawal"></Tixian>
		</myDialog>
	</div>
</template>
<script>
	import Chongzhi from './Chongzhi'
	import Tixian from './Tixian'
	import tools from '@/api/public.js'
	import {
		Toast
	} from 'vant';


	import config from "@/config";

	var ccdotc_abi = config['hyue'][config['key']]['Ccdotc']['abi'];
	var ccdotc_key = config['hyue'][config['key']]['Ccdotc']['heyue'];
	var huobiarr = config['hbi'][config['key']];


	//全局变量
	var web3 = "";
	var address = "";
	var ccdotconn;
	var ethereum = window.ethereum;


	export default {
		data() {
			return {
				huobi: [],
				list: [],
				user_zc: 0,
				isShowChongzhi: false,
				isShowTixan: false,
				popoType: 1, // 1： 充值 2：提币  3：转如  4：转出
				type_c: '',
				type_t: '',
			}
		},
		mounted() {

			for (const key in huobiarr) {
				this.huobi.push(huobiarr[key]);
			}
			var dq = this;
			//监测用户是否安装MASK
			tools.testMASK().then(res=>{
				let {web,id} = res
				web3 = web
				address = id
				ccdotconn = new web3.eth.Contract(ccdotc_abi, ccdotc_key);
				dq.getqblist();
			}).catch((err)=>{
				console.log(err);
			})
		},
		methods: {
			// 关闭提现弹框
			drawal(){
				this.isShowTixan = false
				this.getqblist(true)
			},
			// 关闭充值弹框
			Recharge(){
				this.isShowChongzhi = false
				this.getqblist(true)
			},
		  // 充值
		  showChongzhi(item){
		  	this.type_c = item.name
		  	this.popoType = 1
		  	this.isShowChongzhi = true
		  },
		  // 提币
		  showTixian(item){
		  	this.type_t = item.name
		  	this.popoType = 2
		  	this.isShowTixan = true
		  },
		  openurl(url) {
		    this.$router.push(url);
		  },
		  async getqblist(flag) {
		    Toast.loading({ message: this.$t('message.arbitration.waiting') });
		    var list = [];
		    var binum = config['hyue'][config['key']]['Bzj']['num'];
		    if(flag){
		    	this.list = []
		    }
		    //得到资产比例  转换最终USDT价格
		    for (let index = 0; index < this.huobi.length; index++) {
		      var balancepro = await ccdotconn.methods.balancepro(address, this.huobi[index]['heyue']).call();
		      var lockpro = await ccdotconn.methods.lockpro(address, this.huobi[index]['heyue']).call();
		      var pros = await ccdotconn.methods.pros(this.huobi[index]['key']).call();
		      var obj = {
		        name: this.huobi[index]['id'],
		        balancepro: Number(balancepro) / (10 ** this.huobi[index]['num']),
		        lockpro: Number(lockpro) / (10 ** this.huobi[index]['num']),
		        pros: Number(pros['uni'] / (10 ** 6)),
		      };
			  
		      list.push(obj);
		    }
		    this.list = list;
		    for (let index = 0; index < list.length - 1; index++) {
		      this.user_zc += ((list[index]['balancepro'] + list[index]['lockpro']) * list[index]['pros']);
		    }
		    Toast.clear();
		  },
		  opencztk(e, index) {
		    var htitle = this.huobi[index]['id'];
		    if (e == 1) {
		      this.$router.push({ path: './ccuser/chongzhi', query: { title: htitle + "" } });
		    } else {
		      this.$router.push({ path: './ccuser/tixian', query: { title: htitle + "" } });
		    }
		  }
		},
		components: {
			Chongzhi,
			Tixian
		}
	}
</script>

<style scoped lang="less">
	/deep/.myDialog .el-dialog .el-dialog__body {
		background: #fff;
	}

	html,
	body {
		background-color: #ddd;
	}

	.qianbao {
		height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.head {
			padding: 10px 0;
			background: #fff;
			// height: 70px;

			.left {
				display: flex;
				background: linear-gradient(to right, #4451fa, #09deea);
				padding: 15px 10px;
				border-radius: 0 30px 30px 0;
				color: #fff;

				.num {
					margin-left: 30px;
				}
			}

			.right {
				display: flex;

				.btn {
					padding: 8px 30px;
					border-radius: 5px;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
				}

				.chongzhi {
					background: linear-gradient(#82bcfc, #0f79f1);
					margin-right: 30px;
				}

				.tixian {
					background: linear-gradient(#a077f3, #5a08ff);
				}
			}
		}

		.item_nav {
			background-color: #FFF;
			padding: 20px 10px;
			margin-top: 5px;
			font-size: 14px;
		}
	}

	@media only screen and (min-width: 991px){
		.item_nav{
			padding: 20px 0 20px 50px !important;
		}
	}
</style>
