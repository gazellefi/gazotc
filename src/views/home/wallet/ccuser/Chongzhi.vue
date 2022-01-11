
<template>
  <div class="chongzhi">
    <el-form size='mini' ref="form" :model="form" label-width="80px">
     
      <el-form-item :label="$t('message.chooseCoin')">
        <el-select v-model="form.region" :placeholder="$t('message.chooseContent')" @change="changeSelect">
          <el-option v-for="item in hbilist" :key="item.key" :label="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
	  <el-form-item :label="$t('message.charge')">
	    <el-input v-model="je"></el-input>
	  </el-form-item>
	  <el-form-item label-width="0">
	  	<span style="color: #DCDCDC;">{{$t('message.available')}}{{hbilist[hbindex].title}}:{{
	        Number(balance / 10 ** 18).toFixed(2)
	      }}</span>
	  		  <!-- 你可提额度：{{ (hbilist[hbindex]['je']/ (10**hbilist[hbindex]['num'])).toFixed(2)  }} -->
	  </el-form-item>
      <el-form-item class="chongzhiBtn" label-width="0">
		  <span @click="chongzhi" class="f c_c a_c fz14 cursor" style="width: 100%;height: 30px;background-color: #fdc500;color: #fff;">{{$t('message.Recharge')}}</span>
        <!-- <van-button size='small' color="#fdc500" type="primary" block @click="chongzhi">{{$t('message.Recharge')}}</van-button> -->
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { Notify, Dialog, Toast } from 'vant';
import tools from '@/api/public.js'

import config from "@/config";
import usdtapi from "@/api/usdt.json";
import dotcapi from "@/api/dots.json";
import wethapi from "@/api/weth.json";
var arr = [];
var hbarr = config["hbi"][config["key"]];
for (const key in hbarr) {
  hbarr[key]["je"] = 0;
  hbarr[key]["sq_je"] = 0;
  arr.push(hbarr[key]);
}
console.log(arr);
var address = '';
var web3 = '';
var proconn;
var usdt;
var u_abi = config["hbi"]["bian"]["USDT"]["abi"];
var u_key = config["hbi"]["bian"]["USDT"]["heyue"];
export default {
  data() {
    return {
      hbilist: arr,
      hbindex: 0,
      je: 0,
      key: config['key'],
      form: {
		  region: ''
	  },
	  balance: ''
    }
  },
  props:['type'],
  created() {
  	this.form.region = this.type
	this.je = 0
	if(this.type){
		this.changeSelect(this.type)
	}
  },
  watch:{
	  type(){
	  	this.form.region = this.type
		this.je = 0
	  	if(this.type){
	  		this.changeSelect(this.type)
	  	}
	  }
  },
  mounted() {
	var dq = this
    //监测用户是否安装MASK
    tools.testMASK().then(res=>{
    	let {web,id} = res
    	web3 = web
    	address = id
		chaxunje();
		dq.getBalane()
    }).catch((err)=>{
    	console.log(err);
    })
	async function chaxunje() {
	  for (let index = 0; index < dq.hbilist.length; index++) {
	    var sqlconn = await new web3.eth.Contract(
	      dq.hbilist[index]["abi"],
	      dq.hbilist[index]["heyue"]
	    );
	    var je = await sqlconn.methods.balanceOf(address).call();
	    var sq_je = await sqlconn.methods
	      .allowance(
	        address,
	        config["hyue"][config["key"]]["Ccdotc"]["heyue"]
	      )
	      .call();
	    dq.hbilist[index]['je'] = tools.getnume(Number(je) / (10 ** dq.hbilist[index]["num"]));
	    dq.hbilist[index]['sq_je'] = tools.getnume(Number(sq_je / (10 ** dq.hbilist[index]["num"])));
	  }
	}
  },
  methods: {
	changeSelect(e){
		for (let i = 0; i < this.hbilist.length; i++) {
			if(this.hbilist[i].id == e){
				this.hbindex = i
				setTimeout(()=>{
					this.getBalane()
				},300)
			}
		}
	},
	async getBalane(){
		var dq = this
		proconn = new web3.eth.Contract(config['hbi'][config['key']][dq.hbilist[dq.hbindex]['id']]['abi'],config['hbi'][config['key']][dq.hbilist[dq.hbindex]['id']]['heyue']);
		dq.balance = await proconn.methods.balanceOf(address).call();
		this.$forceUpdate()
	},
    chongzhi() {
      Toast.loading({ message: this.$t('message.wallet.depositing') });
      var dq = this;
      //查询该授权余额 -》查询余额- >充值-》轮询 倍数18需要转换
      if (this.je <= 0) {
		Toast.clear();
        return;
      }
    
      var sqlconn = new web3.eth.Contract(
        dq.hbilist[dq.hbindex]["abi"],
        dq.hbilist[dq.hbindex]["heyue"]
      );
      if (Number(this.hbilist[this.hbindex]['je']) > Number(this.je)) {
        if (Number(this.hbilist[this.hbindex]['sq_je']) >= Number(this.je)) {
          //充值
          Toast.clear();
          Toast.loading({ message: this.$t('message.wallet.depositing'),forbidClick: true,duration: 0 });
          czhiajax();
        } else {
          //授权
          if (this.hbilist[this.hbindex]['deling']) {
            if (this.hbilist[this.hbindex]['sq_je'] > 0) {
              //清除
              Toast.clear();
              Toast.loading({ message: this.$t('message.wallet.clear') });
              shouquan(1);
            } else {
              Toast.clear();
              Toast.loading({ message: this.$t('message.wallet.authorized') });
              //授权
              shouquan(2);
            }
          } else {
            //直接授权
            Toast.clear();
            Toast.loading({ message: this.$t('message.wallet.authorized') });
            shouquan(2);
          }
        }
      } else {
        //Insufficient funds
        // alert('Insufficient funds');
		alert(this.$t('message.wallet.insufficientFund'))
		Toast.clear();
      }
    
      /*
          code 零 2直接授权
      */
      function shouquan(code) {
        var sqconn = new web3.eth.Contract(
          dq.hbilist[dq.hbindex]["abi"],
          dq.hbilist[dq.hbindex]["heyue"]
        );
        var num = code == 1 ? 0 + "" : ((Number(dq.je) * 100) * (10 ** dq.hbilist[dq.hbindex]["num"]));
        //var num = code == 1 ? 0+"" : Number.MAX_VALUE * (10**dq.hbilist[dq.hbindex]["num"])
        num = tools.getnume(num);
        sqconn.methods.approve(config["hyue"][config["key"]]["Ccdotc"]["heyue"], num).send({
          from: address
        }, (err, ret) => {
          if (ret) {
            sq_lunxun(code);
          }else{
			  Toast('授权失败')
		  }
        });
      }
    
    
      //轮询查询是否授权成功
      async function sq_lunxun(code) {
        var sq_je = await sqlconn.methods
          .allowance(
            address,
            config["hyue"][config["key"]]["Ccdotc"]["heyue"]
          )
          .call();
        sq_je = Number(sq_je) / (10 ** dq.hbilist[dq.hbindex]["num"]);
        sq_je = tools.getnume(Number(sq_je));
        if (code == 1) {
          if (sq_je == 1) {
            //清除成功
            shouquan(2);
          } else {
            setTimeout(() => {
              sq_lunxun(code);
            }, 3000);
          }
        } else {
          if (sq_je >= dq.je) {
            Toast.clear();
            Toast.loading({ message: dq.$t('message.wallet.depositing'),forbidClick: true,duration: 0 });
            czhiajax();
          } else {
            setTimeout(() => {
              sq_lunxun(code);
            }, 3000);
          }
        }
      }
    
      //充值资产
      var dq_je = 0;
    
      function czhiajax() {
        var czconn = new web3.eth.Contract(
          config['hyue'][config['key']]['Ccdotc']['abi'],
          config['hyue'][config['key']]['Ccdotc']['heyue']
        );
        var cznum = tools.getnume(Number(dq.je) * (10 ** dq.hbilist[dq.hbindex]['num']));
        czconn.methods.deposit(dq.hbilist[dq.hbindex]['heyue'], cznum).send({
          from: address
        }, (err, ret) => {
          if (ret) {
            //获取当前金额 并赋值
            czconn.methods.balancepro(address, dq.hbilist[dq.hbindex]['heyue']).call((erra, reta) => {
              if (reta) {
                dq_je = Number(reta) + Number(cznum);
              }
            });
            czhi_lunxun();
          }
        });
      }
    
      //充值轮询
      function czhi_lunxun() {
        var czconn = new web3.eth.Contract(
          config['hyue'][config['key']]['Ccdotc']['abi'],
          config['hyue'][config['key']]['Ccdotc']['heyue']
        );
        //查询当前的余额  
        czconn.methods.balancepro(address, dq.hbilist[dq.hbindex]['heyue']).call((erra, reta) => {
          if (reta) {
            if (Number(reta) >= dq_je) {
              Toast.success(dq.$t('message.wallet.depositeSuccess'));
			  dq.je = 0
			  dq.$emit('Recharge')
            } else {
              setTimeout(() => {
                czhi_lunxun();
              }, 3000);
            }
          }
        });
      }
    },
  }
}
</script>

<style scoped lang="less">
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
</style>