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
import { Toast,Dialog  } from 'vant';

import Web3 from "web3";
import Web3Modal from "web3modal";
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
			//监测用户是否安装MASK
			if (typeof ethereum === "undefined") {
			    alert("请先安装METAMASK插件");
			} else {
			    //初始化
			    webinit();
			}
			
			Toast.setDefaultOptions('loading',{
			    forbidClick:false,
			    closeOnClickOverlay:false,
			    duration:0,
			    overlay:true
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
			        //其他钱包使用测试网络
			        // if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
			        //     var wlcode = window.ethereum.networkVersion;
			        //     //imtoken只能查看 无法操作 出发是ETF主网
			        //     if (window.ethereum.isImToken) {
			        //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
			        //     }
			        //     //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
			        //     if (window.ethereum.isMetaMask && wlcode != 4) {
			        //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
			        //     }
			        // }else{
			        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
			        // }
			        address = provider.selectedAddress; 
			        dq.gethuobizichan();
			    }
			}

		},
		methods: {
			changeSelect(e) {
				for (let i = 0; i < this.huobi.length; i++) {
					if (this.huobi[i].id == e) {
						this.hbindex = i
					}
					setTimeout(()=>{
						this.gethuobizichan();
					},500)
				}
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
			gethuobizichan(){
			    //查询资产余额
			    var czconn = new web3.eth.Contract(
			        config['hyue'][config['key']]['dotc']['abi'],
			        config['hyue'][config['key']]['dotc']['heyue']
			    );
			    czconn.methods.balancepro(address,this.huobi[this.hbindex]['heyue']).call((err,ret)=>{
			            if (ret) {
			            this.huobi[this.hbindex]['je'] = ret;
			             console.log(ret)
			             console.log(213)
			            }
			        });    
			},
			tixianajax(){
			    Toast.loading({message: '提款中...'});
			    var dq_je = this.huobi[this.hbindex]['je'];
			    var dq = this;
			    var czconn = new web3.eth.Contract(
			        config['hyue'][config['key']]['dotc']['abi'],
			        config['hyue'][config['key']]['dotc']['heyue']
			    );
			    var tkje = this.je * (10**this.huobi[this.hbindex]['num']);
			    tkje = dq.getFNum(tkje);
			    if (Number(dq_je) >= Number(tkje)) {
			        //执行提款操作
			        czconn.methods.withdraw(this.huobi[this.hbindex]['heyue'],tkje).send({
			            from:address
			        },(err,ret)=>{
			            if (ret) {
			                tikchaxun();
			                // setTimeout(() =>{ Toast.clear();
			                //                  Dialog.alert({
			                //                    title: '提现成功',
			                //                    message: '资产已经提现到你的钱包地址',
			                //                  }).then(() => {
			                                    
			                //                  }); 
			                //                 }, 5000); 
			            }else{
			                Toast.clear();
			                Toast.fail('请同意授权！');
			            }
			        });
			    }else{
			        Toast.clear();
			        Toast.fail('提款金额不能超过提款额度');
			    }
				var mm = 0
			
			    //轮询查询是否提款成功
			    function tikchaxun() {
			        var  tk_je = dq_je - (dq.je * (10**dq.huobi[dq.hbindex]['num']));
			        czconn.methods.balancepro(address,dq.huobi[dq.hbindex]['heyue']).call((err,ret)=>{
			            if (ret) {
			                if (ret == tk_je) {
			                    Toast.clear();
			                    Toast.success('提款成功');
			                    dq.gethuobizichan();
								dq.je = 0
								dq.$emit('drawal')
			                    dq.je = 0;
			                }else{
								mm++
								if(mm > 3){
									Toast.clear();
									clearTimeout()
									Dialog.alert({
									    title: '提款成功',
									}).then(() => {
										dq.gethuobizichan();
										dq.je = 0
										dq.$emit('drawal')
									});
								}
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
