
<template>
  <div class="">
  	<el-row :gutter="30">
		<el-col :sm="24" :md="8" v-for="(item,index) in items" :key="index" style="margin-top: 20px;">
			<div class="item_nav">
				<img :src="item.bg" style="width: 100%;">
				<div class="item_content f">
					<div class="item_left fc a_c c_c">
						<img :src="item.icon" style="width: 30%;">
						<span class="fz14">{{item.text}}</span>
						<div class="line"></div>
					</div>
					<div class="item_right" :class="[index != 1? 'a_e f c_r' : 'fc c_b a_e']">
						<div class="withdrawalBtn" v-if="index == 1" @click="tixianajax">
							<span>提现</span>
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
import Web3 from "web3";
import Web3Modal from "web3modal";
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
	  items:[
		  {
			  bg: require('@/assets/img/bg1.png'),
			  icon: require('@/assets/img/money1.png'),
			  num: '10.0000000000',
			  text: '锁仓中的资产（Gaz）'
		  },
		  {
			  bg: require('@/assets/img/bg2.png'),
			  icon: require('@/assets/img/money2.png'),
			  num: 10.0000000000,
			  text: '可提现资产（Gaz）'
		  },
  {
			  bg: require('@/assets/img/bg5.png'),
			  icon: require('@/assets/img/money3.png'),
			  num: 10.0000000000,
			  text: '一次性可释放资产（Gaz）'
		  }
	  ]
    }
  },
  mounted() {
    //监测用户是否安装MASK
    console.log("111")
    if (typeof ethereum === "undefined") {
      alert("Please install the metamask plug-in first");
    } else {
      //初始化
      webinit();
    }

    for (const key in huobiarr) {
      this.huobi.push(huobiarr[key]);
    }

    Toast.setDefaultOptions('loading', {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true
    });
    var dq = this;
    async function webinit() {
      const providerOptions = {
        /* See Provider Options Section */
      };
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });
      var provider = await web3Modal.connect();
      web3 = new Web3(provider);

      if (web3 && provider) {
        address = provider.selectedAddress;
        console.log(address)
        simuonn = new web3.eth.Contract(simu_abi, simu_key);
        dq.getsczc();
      }
    }
  },
  methods: {
    //如果过亿请转换
    getFNum(num_str) {
      num_str = num_str.toString();
      if (num_str.indexOf("+") != -1) {
        num_str = num_str.replace("+", "");
      }
      if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
        var resValue = "",
          power = "",
          result = null,
          dotIndex = 0,
          resArr = [],
          sym = "";
        var numStr = num_str.toString();
        if (numStr[0] == "-") {
          // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
          numStr = numStr.substr(1);
          sym = "-";
        }
        if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
          var regExp = new RegExp(
            "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
            "ig"
          );
          result = regExp.exec(numStr);
          if (result != null) {
            resValue = result[2];
            power = result[5];
            result = null;
          }
          if (!resValue && !power) {
            return false;
          }
          dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
          resValue = resValue.replace(".", "");
          resArr = resValue.split("");
          if (Number(power) >= 0) {
            var subres = resValue.substr(dotIndex);
            var length = dotIndex == 0 ? 0 : subres.length;
            power = Number(power);
            //幂数大于小数点后面的数字位数时，后面加0
            for (var i = 0; i < power - length; i++) {
              resArr.push("0");
            }
            if (power - subres.length < 0) {
              resArr.splice(dotIndex + power, 0, ".");
            }
          } else {
            power = power.replace("-", "");
            power = Number(power);
            //幂数大于等于 小数点的index位置, 前面加0
            for (let i = 0; i < power - dotIndex; i++) {
              resArr.unshift("0");
            }
            var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
            resArr.splice(n, 0, ".");
          }
        }
        resValue = resArr.join("");

        return sym + resValue;
      } else {
        return num_str;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    openurl(url) {
      this.$router.push(url);
    },
    async getsczc() {
      Toast.loading({ message: 'In query' });
      var scze = await simuonn.methods.balanceOf(address).call();
      this.items[0].num = scze / (10 ** 18);
      free = await simuonn.methods.callfree(address).call();
      this.items[1].num = free / (10 ** 18);
      Toast.clear();

    },
    tixianajax() {
      Toast.loading({ message: 'Withdrawal in progress...' });
      var tkje = this.getFNum(free);
      simuonn.methods.withdraw(tkje).send({
        from: address
      }, (err, ret) => {
        if (ret) {
          tikchaxun();
        } else {
          Toast.clear();
          Toast.fail('Please agree to authorize!');
        }
      }
      );

      //轮询查询是否提款成功
      function tikchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success('Successful withdrawal');
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
				width: 70px;
				height: 30px;
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
