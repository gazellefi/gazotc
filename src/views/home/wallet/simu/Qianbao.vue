
<template>
  <div class="">
  	<el-row :gutter="30">
		<el-col :sm="24" :md="8" v-for="(item,index) in items" :key="index" style="margin-top: 20px;">
			<div class="item_nav">
				<img :src="item.bg" style="width: 100%;">
				<div class="item_content f">
					<div class="item_left fc a_c c_c">
						<img :src="item.icon" style="width: 30%;">
						<span class="fz14">{{$t(`message.${item.text}`)}}</span>
						<div class="line"></div>
					</div>
					<div class="item_right" :class="[index != 1? 'a_e f c_r' : 'fc c_b a_e']">
						<div class="withdrawalBtn" v-if="index == 1" @click="tixianajax">
							<span>{{$t('message.Withdrawal')}}</span>
						</div>
						<span class="cf">{{item.num}}</span>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
  </div>
</template>
<script>
import tools from '@/api/public.js'
import { Toast } from 'vant';


import config from "@/config";

var huobiarr = config['hbi'][config['key']];
var simu_abi = config['hyue'][config['key']]['Pripla']['abi'];
var simu_key = config['hyue'][config['key']]['Pripla']['heyue'];

//全局变量
var web3 = "";
var address = "";
var simuonn;
var free;
var ethereum = window.ethereum;


export default {
  data() {
    return {
      huobi: [],
      user_sc: 0,
      user_fr: 0,
	  gazone: 0,
	  items:[
		  {
			  bg: require('@/assets/img/bg1.png'),
			  icon: require('@/assets/img/money1.png'),
			  num: 0,
			  text: 'AssetsLock'
		  },
		  {
			  bg: require('@/assets/img/bg2.png'),
			  icon: require('@/assets/img/money2.png'),
			  num: 0,
			  text: 'AssetsWith'
		  },
  {
			  bg: require('@/assets/img/bg5.png'),
			  icon: require('@/assets/img/money3.png'),
			  num: 0,
			  text: 'AssetsRelease'
		  }
	  ]
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
		simuonn = new web3.eth.Contract(simu_abi, simu_key);
		dq.getsczc();
	}).catch((err)=>{
		console.log(err);
	})
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    openurl(url) {
      this.$router.push(url);
    },
    async getsczc() {
      Toast.loading({ message: this.$t('message.wallet.requesting') });
      var scze = await simuonn.methods.balanceOf(address).call();
      this.items[0].num = Math.round(scze / (10 ** 18));
      free = await simuonn.methods.callfree(address).call();
      this.items[1].num = Math.round(free / (10 ** 18));
	  let gazone = await simuonn.methods.balanceOne(address).call();
	  this.items[2].num = Math.round(free / (10 ** 18))
      Toast.clear();

    },
    tixianajax() {
      Toast.loading({ message: this.$t('message.wallet.withdrawing1') });
      var tkje = tools.getnume(free);
      simuonn.methods.withdraw(tkje).send({
        from: address
      }, (err, ret) => {
        if (ret) {
          tikchaxun();
        } else {
          Toast.clear();
          Toast.fail(this.$t('message.wallet.submit1'));
        }
      }
      );

      //轮询查询是否提款成功
      function tikchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success(this.$t('message.wallet.withdrawSuccess'));
        }, 3000);
      }
    }
  }
}
</script>

<style scoped lang="less">
.item_nav{
	position: relative;
	.item_content{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		justify-content: space-between;
		align-items: flex-end;
		padding: 18px 20px;
		.item_left{
			width: 50%;
			min-width: 143px;
			font-size: 12px;
			color: #FFFFFF;
			position: relative;
			.line{
				position: absolute;
				right: 0;
				bottom: 0;
				width: 0;
				height: 30px;
				border-right: 1px solid #fff;
			}
			>span{
				margin-top: 10px;
			}
		}
		.item_right{
			width: 50%;
			height: 100%;
			.withdrawalBtn{
				cursor: pointer;
				padding: 5px 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				// font-size: 14px;
				border: 1px solid #FFFFFF;
				border-radius: 30px;
			}
			>span{
				font-size: 30px;
				// font-weight: bolder;
				
			}
		}
	}
}
</style>
