
<template>
  <el-row type="flex"  justify="center">
	  <el-col :sm="24" :md="12" :lg="8">
		<div class="fabu">
		  <!-- 表单 -->
		  <div class="add111">
		    <div class="add_form">
		      <div class="add_form_item_xuanze c_b">
		        <div class="add_form_item xz" style="margin: 0;width: 100%;">
				  <div class="add_form_item_t">{{$t('message.securedAssets')}}</div>
		          <div class="add_form_item_input">
		            <el-select v-model="pro" placeholder="Please select" :disabled="true"  style="width: 100%;">
		              <el-option v-for="item in data['huobi']" :key="item.id" :label="item.id" :value="item.id">
		              </el-option>
		            </el-select>
		          </div>
		        </div>
		      </div>
		      <div class="add_form_item">
		        <div class="add_form_item_t">{{$t('message.dapp.guaranteeAmount')}}</div>
		        <div class="add_form_item_input">
		          <el-input :placeholder="$t('message.enterAmount')" v-model="form.num" :disabled="true"></el-input>
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] > 0">
		          {{$t('message.exceedTips')}}（{{user['num']}}）, {{$t('message.rechargeTips1')}}
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] <= 0">
		          {{$t('message.rechargeTips')}}
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.num">
		          {{$t('message.contEmpty')}}
		        </div>
		      </div>
			  <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.FinancingParty')}}</div>
				 <div class="add_form_item_input f c_a" style="padding: 10px 0">
					<el-radio :disabled="true" v-model="radio" label="0x73616c6500000000000000000000000000000000000000000000000000000000">{{$t('message.Initiator')}}</el-radio>
					<el-radio :disabled="true" v-model="radio" label="0x6275790000000000000000000000000000000000000000000000000000000000">{{$t('message.Receiver')}}</el-radio>
				 </div>
				 
			   </div>
			  
		      <div class="add_form_item">
		        <div class="add_form_item_t">{{$t('message.SponsorMargin')}}</div>
		        <div class="add_form_item_input">
		          <el-input :placeholder="$t('message.enterMargin')" v-model="form.defaultMar" :disabled="true">
		            <template slot="append">
						<div style="width: 40px;text-align: center;">
							%
						</div>
					</template>
		          </el-input>
		        </div>
				<div class="add_form_item_input errormsg" v-if="form.num && user.user != ''" style="color: #0d92f1;">
				  {{(form.num * (form.defaultMar / 100) / (pros.pri / 10**6)).toFixed(2) + ' Gaz'}}
				</div>
		      </div>
			  <div class="add_form_item">
			    <div class="add_form_item_t">{{$t('message.RecipientDeposit')}}</div>
			    <div class="add_form_item_input">
			      <el-input :placeholder="$t('message.enterMargin')" v-model="form.mar" :disabled="true">
			        <template slot="append">
						<div style="width: 40px;text-align: center;">
						%
						</div>
					</template>
			      </el-input>
			    </div>
				<div class="add_form_item_input errormsg" v-if="form.sjbzj && form.num" style="color: #0d92f1;">
				  {{form.sjbzj + ' Gaz'}}
				</div>
			  </div>
			  <div class="add_form_item">
			    <div class="add_form_item_t">{{$t('message.Receiver')}}</div>
			    <div class="add_form_item_input">
			      <el-input placeholder="Not" v-model="form.dj" :disabled="true">
			      </el-input>
			    </div>
			  </div>
			  <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.ContractHash')}}</div>
			     <div class="add_form_item_input"  style="padding: 10px 0;word-break: break-word;">
			       <span class="c9 fz12">{{form.hash || $t('message.noMsg')}}</span>
			     </div>
			   </div>
			   <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.remarks')}}</div>
			     <div class="add_form_item_input">
			       <el-input type="textarea" :placeholder="form.beizhu?form.beizhu:$t('message.notFill')" :disabled="maskDis" v-model="form.beizhu">
			       </el-input>
			     </div>
			   </div>
		      <el-button type="primary" style="margin-top: 30px;background:#fdc500;border:0" @click="buyWay" :disabled="user.user == '' ? true:false">{{$t('message.receive')}}</el-button>
		    </div>
		  </div>
		</div> 
	  </el-col>
  </el-row>

</template>
<script>
import Web3 from "web3"
import config from "@/config";
import tools from '@/api/public.js'
let Base64 = require('js-base64').Base64;
import { Dialog, Toast, Notify } from 'vant';
// import VConsole from "vconsole";
// new VConsole();

//公共变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;

//定义新版相关配置
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var dotsconn = ''
var huobi = config['hbi'][config['key']];
var fabi = config['fabi'][config['key']];
var huobi_arr = [];
var fabi_arr = [];
for (const key in huobi) {
  huobi_arr.push(huobi[key]);
}
for (const key in fabi) {
  fabi_arr.push(fabi[key]);
}
var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
export default {
  //初始化WEB3
  created() {
	let strId =  this.$route.query.did
	if(strId){
		this.ddid = strId;
	} else {
	  this.ddshow = true;
	}
    var dq = this;
	// 监测用户是否安装MASK
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		address = dq.user['user'] = id
		dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
		if (dq.ddid) {
		  //判断是否传入订单号
		  dq.getddinfo();
		}
	}).catch((err)=>{
		web3 = new Web3(config["hyue"][config["key"]]["Url"]);
		dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
		console.log(err);
		if (dq.ddid) {
		  //判断是否传入订单号
		  dq.getddinfo();
		}
	})
  },
  mounted() {
    Toast.setDefaultOptions({
      overlay: true,
      forbidClick: true,
      closeOnClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      getContainer: 'body'
    });
  },
  data() {
    return {
	  ddid: '',
      m: '0x6275790000000000000000000000000000000000000000000000000000000000',
	  radio: '0x6275790000000000000000000000000000000000000000000000000000000000',
      pro: huobi_arr[0]['id'],
      fi: fabi_arr[0]['id'],
      data: {
        huobi: huobi_arr,
        fabi: fabi_arr
      },
	  maskDis: true,

      //用户数据
      user: {
        user: '',
        balancemar: 0,
        balancepro: 0,
        num: 0
      },
	  pros: {
	    one: '',
	    uni: '',
	    pri: '',
	    mar: '',
	    rati: '',
	  
	  },

      hbi: {
        pri: 0, //保证金单价
        mara: 0,
        uni: 0,
        rati: 0,
        one: 0
      },

      //验证
      isform: {
        dj: false,
        zcye: false,
        num: false,
        sjbzj: false,
        zd_num: false,
        zg_num: false,
        user_bzj: false
      },
      //表单
      form: {
        dj: '',
        num: '',
		recipient: '',
        sjbzj: '',
		defaultMar: '20',
        zd_num: '',
        zg_num: '',
        user_bzj: '',
        beizhu: '',
		content: '',
		hash: '',
		mar_Gaz: '',
      },

      sq_code: 0, //0默认 1余额大于1 2直接授权
    }
  },
  methods: {
	getddinfo() {
	  var dq = this;
	  if (this.ddid) {
	    var jiazai = Toast.loading({
	      message: dq.$t('message.frienchOtc.requesting'),
	      closeOnClick: false,
	      closeOnClickOverlay: false,
	      loadingType: 'spinner',
	      getContainer: "body",
	      duration: 0
	    });
	    //获取Order details
	    dotsconn.methods.merch(this.ddid + "").call((error, ret) => {
	      jiazai.clear();
		  // console.log(ret)
	      if (ret && !error) {
	        if (ret.Mmark == '0x0000000000000000000000000000000000000000000000000000000000000000') {
	          dq.code = true;
	        } else {
	          var huobi = '';
	          for (let index = 0; index < huobi_arr.length; index++) {
	            if (huobi_arr[index]['key'] == ret.pro) {
	              huobi = huobi_arr[index]['id'];
	              break;
	            }
	          }
			  // 币种
			  dq.pro = huobi
			  var pro_dec = 10**config['hbi'][config['key']][huobi]['num'];
			  // 数量
			  dq.form.num = (Number(ret.Moa) / pro_dec).toFixed(2)
			  // 出资放
			  dq.radio  = ret.Mmark
			  // 保证金比例
			  dq.form.mar = (Number(ret.mar) / (10**16)).toFixed(2)
			  // 接受放
			  // console.log(ret.unit);
			  dq.form.dj = ret.unit.length < 10 ? '' : web3.utils.numberToHex(ret.unit)
			  // 合同哈希
			  dq.form.hash = web3.utils.toUtf8(ret.fiat)
			  
			  
	          dq.pros['mar'] = ret['mar'];
	          
			  
	          // 组装数据
	          dq.ddinfo = {
	              username:'',
	              fabi:ret.fiat,
	              Mowner:ret.Mowner,
	              unit:tools.getnume(Number(ret.unit / 100)),
	              zer:(Number(ret.zer) / pro_dec).toFixed(2),
	              Moa:(Number(ret.Moa) / pro_dec).toFixed(2),
	              bMar:0,
	              mar:(Number(ret.mar) / (10**16)).toFixed(2),
	              mlive:ret.mlive,
	              beizhu:'',
	              huobi:huobi,
	              Mmark:ret.Mmark
	          };
			  // console.log(dq.ddinfo)
	          dq.code = false;
	          dotsconn.methods.balancemar(ret.Mowner).call((errb, bzj) => {
	            if (bzj) {
	              dq.ddinfo['bMar'] = (Number(bzj) / (10 ** bzj_num)).toFixed(2);
	            } else {
	              dq.ddinfo['bMar'] = 0.00;
	            }
	          });
			  // 没链接钱包的返回
			  if(dq.user.user == '') return
	          //获取当前用户的保证金 资产余额
	          var zicheyue = config['hbi'][config['key']][huobi]['heyue'];
			  var cpro = config['hbi'][config['key']][huobi]['key'];
	
	          dotsconn.methods.balancepro(address + "", zicheyue + "").call((errb, balancepro) => {
	            dq.user['balancepro'] = Number(balancepro);
	          });
	          dotsconn.methods.balancemar(address + "").call((errc, balancemar) => {
	            dq.user['balancemar'] = Number(balancemar);
	          });
	
	          // getddbeizhu(ret['Mowner']);
	          getddsjusername(ret['Mowner']);
	          dq.getpros(cpro);
	        }
	      } else {
	        dq.code = true;
	      }
	    });
	  } else {
	    setTimeout(() => {
	      this.ddshow = true;
	    }, 200);
	  }
	  function getddbeizhu(uaddress) {
	    var beizhucon = new web3.eth.Contract(dotc_abi, dotc_key);
	    beizhucon.methods.message(uaddress + "", "0").call((error, ret) => {
	      if (ret && !error) {
	        dq.ddinfo.username = Base64.decode(ret);
	      } else {
	        dq.ddinfo.username = dq.$t('message.frienchOtc.noNickname');
	      }
	    });
	  }
	  // 获取备注
	  function getddsjusername(uaddress) {
	    var beizhucon = new web3.eth.Contract(dotc_abi, dotc_key);
	    beizhucon.methods.message(uaddress + "", "6").call((error, ret) => {
	      if (ret && !error) {
	        dq.form.beizhu = Base64.decode(ret);
	      } else {
	        dq.form.beizhu = dq.$t('message.notFill');
	      }
	    });
	  }
	},
	//查询 pros pri
	getpri() {
	  var pricon = new web3.eth.Contract(dotc_abi, dotc_key);
	  var dq = this
	  pricon.methods.pri().call((err, result) => {
	    dq.pros['pri'] = result;
		//计算保证金
		dq.form.sjbzj = (dq.form.num * (dq.form.mar / 100) / (dq.pros.pri / 10**6)).toFixed(2)
	  })
	},
	//pros
	getpros(zicheyue) {
	  var dq = this
	  var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
	  contracts.methods.pros(zicheyue + "").call((err, result) => {
		  // console.log(result);
	    dq.pros['one'] = result['one'];
	    dq.pros['uni'] = result['uni'];
	    dq.pros['rati'] = Number(result['rati']);
	    dq.getpri();
	  })
	},
	// buy
	buyWay(){
		var dq = this
		// 判断 当前用户是否为 接收方 (接收方地址不为空)
		if(dq.form.dj != address && dq.form.dj != ''){
			return
		}
		// 判断商家保证金
		if(dq.form['num'] * dq.pros['uni'] * 0.2 / dq.pros.pri > Number(dq.ddinfo.bMar)){
			  Notify({ type: 'warning', message: this.$t('message.notMar') });
			  return;
		}
		// 判断 此用户的保证金是否足够
		if (dq.form.sjbzj > dq.user.balancemar) {
		  Dialog.confirm({
		    title: dq.$t('message.prompt'),
		    message: dq.$t('message.frienchOtc.insufficient'),
		    confirmButtonText: dq.$t('message.cancel'),
		    cancelButtonText: dq.$t('message.Recharge'),
		    cancelButtonColor: '',
		    getContainer: 'body'
		  })
		    .catch(() => {
		      dq.$router.push('/home/wallet/legalCoinWallet');
		    });
		  return;
		}
		// 判断是购买 还是出售 
		if (dq.radio != '0x6275790000000000000000000000000000000000000000000000000000000000') {
		  adddingdanajax('Buying');
		} else {
			  //判断User deposit 与 资产
			  if (dq.form['num'] > dq.user['balancepro']) {
					Dialog.confirm({
					  title: dq.$t('message.prompt'),
					  message: dq.$t('message.assetRchargeTips') ,
					  confirmButtonText: dq.$t('message.cancel'),
					  cancelButtonText: dq.$t('message.Recharge'),
					  cancelButtonColor: '',
					  getContainer: 'body'
					})
					  .catch(() => {
						dq.$router.push('/home/wallet/legalCoinWallet');
					  });
					return;
			  }
		  adddingdanajax('On sale');
		}
		//提交订单
		function adddingdanajax(msg) {
		  var jiazai = Toast.loading({
		    message: dq.$t('message.frienchOtc.requesting'),
		    closeOnClick: false,
		    closeOnClickOverlay: false,
		    loadingType: 'spinner',
		    getContainer: "body",
		    duration: 0
		  });
		  dq.ddcode = true;
		  //提交订单 计算后面的零
		  var num = dq.form['num'];
		  for (let index = 0; index < huobi_arr.length; index++) {
		    if (dq.ddinfo.huobi == huobi_arr[index]['id']) {
		      num = (dq.form['num'] * (10 ** huobi_arr[index]['num']));
		      break;
		    }
		  }
		  num = tools.getnume(num);
		  var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
		  doctconn.methods.taker(dq.ddid, num + "").send({
		    from: address
		  }, (err, ret) => {
				  jiazai.clear();
		    if (!err && ret) {
					  // console.log(ret);
					  setTimeout(()=>{
						  Dialog.alert({
						    title: dq.$t('message.frienchOtc.successful'),
						    message: dq.$t('message.frienchOtc.check'),
						  }).then(() => {
						    // window.location.reload();
							dq.$router.push('/home/orderCenter/LCTransaction');
							dq.ddcode = false;
						    dq.getddinfo()
						  });
					  },4000)
		      // doctconn.events.Taker({}, function (error, event) {
		      //   if (!error && event) {
		      //     jiazai.clear();
		      //     dq.ddcode = false;
		      //     if (address == event.returnValues['Madd'].toLowerCase()) {
		      //       Dialog.alert({
		      //         title: '交易成功',
		      //         message: msg.indexOf('On sale') != -1 ? '出售成功！订单号为：' + +event['returnValues']['uorder'] + '' : '购买成功！订单号为：' + +event['returnValues']['uorder'] + '',
		      //       }).then(() => {
		      //         window.location.reload();
		      //       });
		      //     }
		      //   }
		      // });
		    } else {
		      Dialog.alert({
		        title: dq.$t('message.frienchOtc.fail'),
		        message: dq.$t('message.frienchOtc.clickOk'),
		      });
		      dq.ddcode = false;
		      jiazai.clear();
		    }
		  });
		
		}
	}
  }
}
</script>

<style lang="less">
.fabu {
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  overflow: auto;
}
.fabu_head {
  width: calc(100% - 30px);
  height: 70px;
  font-size: 16px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fabu_head i {
  margin-left: auto;
  font-size: 20px;
}

.fabu_tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edf0fa;
  padding: 10px;
}
.fabu_tab_item {
  opacity: 0.5;
  transition: all 0.3s;
  text-align: center;
  flex: 1;
  cursor: pointer;
  line-height: 40px;
}
.fabu_tab_item.ac {
  opacity: 1;
  color: rgb(51, 75, 211);
  font-size: 22px;
  background: #fff;
}

/* 表单 */
.add111 {
  width: 100%;
  flex: 1;
  overflow: auto;
}

.add_form {
  display: flex;
  flex-direction: column;
}

.add_form_item {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.add_form_item_input {
  margin-top: 10px;
}
.add_form_item_input textarea {
  margin-top: 10px;
}

.add_form_item_xuanze {
  display: flex;
  flex-direction: row;
}

.add_form_item.xz {
  margin-left: 15px;
}

.errormsg {
  font-size: 14px;
  color: #f33;
}

.add_form_item_input_p {
  padding-top: 10px;
  font-size: 12px;
  color: #409eff;
}
.el-textarea{
	textarea{
		min-height: 100px !important;
	}
}
</style>