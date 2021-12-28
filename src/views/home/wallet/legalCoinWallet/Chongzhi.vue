
<template>
  <div class="chongzhi">
    <el-form size='mini' ref="form" :model="form" label-width="80px">
     
      <el-form-item label="选择币种">
        <el-select v-model="form.region" placeholder="请选择币种" @change="changeSelect">
          <el-option v-for="item in hbilist" :key="item.key" :label="item.title" :value="item.title"></el-option>
        </el-select>
      </el-form-item>
	  <el-form-item label="充值金额">
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
        <!-- <van-button size='small' color="#fdc500" type="primary" block >{{$t('message.Recharge')}}</van-button> -->
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { Notify, Dialog, Toast } from 'vant';
import Web3 from "web3";
import Web3Modal from "web3modal";

import config from "@/config";
import usdtapi from "@/api/usdt.json";
import dotcapi from "@/api/dots.json";
import wethapi from "@/api/weth.json";
var hbilist = config['hbi'][config['key']];
var hbarr = [];
var i = 1;
for (const key in hbilist) {
  i++;
  hbarr.push({
    id: i,
    key: hbilist[key]['heyue'],
    abi: hbilist[key]['abi'],
    title: hbilist[key]['id'],
    num: hbilist[key]['num']
  });
}
var address = '';
var web3 = '';
var usdt;
var u_abi = config["hbi"]["bian"]["USDT"]["abi"];
var u_key = config["hbi"]["bian"]["USDT"]["heyue"];
export default {
  data() {
    return {
      hbilist: hbarr,
      hbindex: 0,
      je: '',
      key: config['key'],
      form: {
		  region: ''
	  },
	  balance: ''
    }
  },
  props:['type','flag'],
  created() {
  	this.form.region = this.type
	this.je = ''
	if(this.type){
		this.changeSelect(this.type)
	}
  },
  watch:{
	  type(){
	  	this.form.region = this.type
		this.je = ''
	  	if(this.type){
	  		this.changeSelect(this.type)
	  	}
	  },
	  flag(){
		 this.je = ''
		 if(this.flag){
		 	this.changeSelect(this.type)
		 }
	  }
  },
  mounted() {
	  var dq = this
    Toast.setDefaultOptions('loading', {
      forbidClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      overlay: true
    });
    if (this.$route.query.title) {
      for (let index = 0; index < this.hbilist.length; index++) {
        if (this.hbilist[index]['title'] == this.$route.query.title) {
          this.hbindex = index;
          break;
        }
      }
    }
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      alert("请先安装METAMASK插件");
    } else {
      //初始化
      webinit();
    }
    async function webinit() {
      const providerOptions = {
        /* See Provider Options Section */
      };
      const web3Modal = new Web3Modal({
        // network: "mainnet",
        // cacheProvider: true,
        providerOptions,
      });
      var provider = await web3Modal.connect();
      web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      if (web3 && provider) {
        address = provider.selectedAddress;
      }
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
	changeSelect(e){
		
		for (let i = 0; i < this.hbilist.length; i++) {
			if(this.hbilist[i].title == e){
				this.hbindex = i
				setTimeout(()=>{
					this.getBalane()
				},300)
			}
		}
	},
	async getBalane(){
		var dq = this
		const providerOptions = {
		  /* See Provider Options Section */
		};
		const web3Modal = new Web3Modal({
		  // network: "mainnet",
		  // cacheProvider: true,
		  providerOptions,
		});
		var provider = await web3Modal.connect();
		web3 = new Web3(provider);
		// console.log(web3);
		var proconn = new web3.eth.Contract(config['hbi'][config['key']][dq.hbilist[dq.hbindex]['title']]['abi'],config['hbi'][config['key']][dq.hbilist[dq.hbindex]['title']]['heyue']);
		dq.balance = await proconn.methods.balanceOf(address).call();
		this.$forceUpdate()
	},
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
    chongzhi(){
        if (this.je <= 0) {
            Notify({ type: 'warning', message: '金额不能小于0' });
            return;
        }
        Toast.loading({
            message: '加载中...'
        });
        var proconn = new web3.eth.Contract(config['hbi'][config['key']][this.hbilist[this.hbindex]['title']]['abi'],config['hbi'][config['key']][this.hbilist[this.hbindex]['title']]['heyue']);
        var dotcconn = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'],config['hyue'][config['key']]['dotc']['heyue']);
        var dq = this;
        var pro = this.hbilist[this.hbindex]['title'];
        var proust = config['hbi'][config['key']][this.hbilist[this.hbindex]['title']]['heyue'];
        var dotcust = config['hyue'][config['key']]['dotc']['heyue'];
        var dec = 10**config['hbi'][config['key']][this.hbilist[this.hbindex]['title']]['num'];
        var usdtlxtime = "";
        var usdt_yue = 0;
        //开始充值 监测授权余额 
            //查询代币初始余额
        dotcconn.methods.balancepro(address+"",proust).call((err,ret)=>{
                if (ret) {
                    usdt_yue = Number(ret) /dec;
                    proconn.methods.balanceOf(address+"").call((errb,retb)=>{
                        if (retb) {
                            var balanceOf = Number(retb) /dec;
                            if (balanceOf < Number(dq.je)) {
                                Toast.clear();
                                Dialog.alert({
                                    title: '警告',
                                    message: pro + '余额不足！',
                                }).then(() => {
                                // on close
                                });
                                return;
                            }else{
                                get_shouquan();
                            }
                        }
                    });
                }
            })
    
        //提交充值
        function chongzhiajax() {
            Toast.loading({
                message: '正在充值中...'
            });
            var cznum = dq.getFNum((Number(dq.je) * dec));
            console.log("充值中")
            dotcconn.methods.deposit(proust,cznum+"").send({
                from:address
            },(err,ret)=>{
				console.log(ret);
                if (ret) {
                    chongzhi_lx();
                }else{
					Toast.clear()
				}
            });
        }
        var mm = 0  // 轮询 次数
        function chongzhi_lx() {
            dotcconn.methods.balancepro(address+"",proust).call((err,ret)=>{
                if (ret) {
                    var balancepro = Number(ret) / dec;
                    if (balancepro >= (usdt_yue+Number(dq.je))) {
                        Toast.clear();
                        clearTimeout(usdtlxtime);
                        Dialog.alert({
                            title: '充值成功',
                            message: '您已成功充值'+ dq.je +' '+ dq.hbilist[dq.hbindex]['title'] +'',
                        }).then(() => {
							dq.je = 0
                            dq.$emit('Recharge')
							// window.location.reload();
                        });
    
                    }else{
						mm++
						if(mm > 3){
							Toast.clear();
							clearTimeout(usdtlxtime);
							Dialog.alert({
							    title: '充值成功',
							    message: '您已成功充值'+ dq.je +' '+ dq.hbilist[dq.hbindex]['title'] +'',
							}).then(() => {
								dq.je = 0
							    dq.$emit('Recharge')
								// window.location.reload();
							});
							return
						}
                        usdtlxtime = setTimeout(() => {
                            chongzhi_lx();
                        }, 3000);
                    }
                }
            });
        }
        //查询授权余额
        function get_shouquan() {
            proconn.methods.allowance(address+"",dotcust).call((err,ret)=>{
                if (ret) {
                    Toast.clear();
                    var allowance = Number(ret) /dec;
                    if (allowance < Number(dq.je)) {
                        set_shouquan();
                    }else 
                        chongzhiajax();                          
                }
            });
        }
        //授权
        function set_shouquan() {
            Toast.loading({
                message: pro +'授权中....',
            });
            proconn.methods.approve(dotcust,dq.getFNum((Number(dq.je) * 100) * dec)+"").send({
                from:address
            },(err,ret)=>{
                if (ret) {
                    lunxun(2);
                }
                else{
                    console.log('GG');
                }
            })
        }
    
        //轮询
        function lunxun(c) {
            proconn.methods.allowance(address+"",dotcust).call((err,ret)=>{
                if (ret) {
                    var allowance = Number(ret) /dec;
                        if (allowance >= Number(dq.je)) {
                            Toast.clear();
                            clearTimeout(usdtlxtime);
                            chongzhiajax();
                        }else{
                            usdtlxtime = setTimeout(() => {
                                lunxun(c);
                            }, 3000);
                        }
                    }
            });
        }
    
    }
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