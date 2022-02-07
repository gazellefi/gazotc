
<template>
  <div class="viewaaaa">
	  <!-- 作为页面时有返回上一级 -->
	<el-row style="padding: 20px;" v-if="type == 2">
		<el-col>
			<el-link class="marl-10" type="primary" @click="back">{{$t('message.backUp')}}</el-link>
		</el-col>
	</el-row>
	<el-row type="flex" justify="center" v-if="type == 2">
		<el-col :sm="24" :md="12">
			<div class="view">
				<div class="f c_c">
					<span class="fwb fz18">{{ddinfo['Mmark'] != '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.buy'):$t('message.dapp.sell')}}</span>
				</div>
			  <div class="view_ul padt-10">
			    <div class="view_ul_li bordd">
			      {{$t('message.arbitration.order')}}:{{ ddid }}
			    </div>
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.dapp.unitPrice')}}</div>
			      <div class="view_ul_li_r">{{ getnumsing(ddinfo.unit) }} {{ ddinfo.fabi }}</div>
			    </div>
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.dapp.limit')}}</div>
			      <div class="view_ul_li_r">{{ getnumsing(ddinfo.zer) }} - {{ getnumsing(ddinfo.mal) }} {{ddinfo.huobi}}</div>
			    </div>
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.dapp.amount')}}</div>
			      <div class="view_ul_li_r">{{ getnumsing(ddinfo.Moa) }} {{ddinfo.huobi}}</div>
			    </div>
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.arbitration.merchantMargin')}}</div>
			      <div class="view_ul_li_r">{{ getnumsing(ddinfo.bMar) }} GAZ</div>
			    </div>
			
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.dapp.MarginRatio')}}</div>
			      <div class="view_ul_li_r">{{ getnumsing(ddinfo.mar) }} %</div>
			    </div>
			    <div class="view_ul_li bordd">
			      <div class="view_ul_li_l">{{$t('message.dapp.orderStatus')}}</div>
			      <div class="view_ul_li_r">{{ ddinfo.mlive == 1 ? $t('message.dapp.ReceivingOrder'):$t('message.dapp.Resting') }}</div>
			    </div>
			      <div class="view_ul_li_l beizhuTtile">{{$t('message.remarks')}}：</div>
			    <div class="view_ul_li bordd beizhu">
			      <div>{{ ddinfo.beizhu == 'No remarks are filled in' ? $t('message.notFill') : ddinfo.beizhu}}</div>
			    </div>
			   <!-- <div class="view_ul_li beizhu_conn">
			      <el-button type="text" @click="openlxfs">{{$t('message.contactDes')}}</el-button>
			    </div> -->
			  </div>
			
			  <div class="view_form">
			    <div class="view_form_item">
			      <div class="view_form_item_t">
			        {{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.sell'):$t('message.dapp.buy')  }}
			        <span v-if="form.num">{{$t('message.frienchOtc.charge')}} {{ ddinfo['sxf_je'] }} {{ddinfo.huobi}}</span>
			      </div>
			      <div class="view_form_item_input">
			        <div class="view_form_item_input_srk f c_c a_c" style="border: 1px solid #DCDCDC; width: 80%;height: 40px;">
			          <van-field placeholder="0.00" v-model="form.num" :disabled="code"/>
			        </div>
			        <div class="view_form_item_input_msg">{{ddinfo.huobi}}</div>
			      </div>
			    </div>
			    <div class="view_form_item">
			      <div class="view_form_item_t">{{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.received'):$t('message.dapp.pay') }}</div>
			      <div class="view_form_item_input">
			        <div class="view_form_item_input_srk">
			          <van-field :placeholder="$t('message.dapp.getCurrency')" v-model="form.je" :disabled="true" />
			        </div>
			        <div class="view_form_item_input_msg">CNY</div>
			      </div>
			    </div>
			    <div class="view_form_item">
			      <div class="view_form_item_t">{{$t('message.arbitration.margin')}}</div>
			      <div class="view_form_item_input">
			        <div class="view_form_item_input_srk">
			          <van-field :placeholder="$t('message.dapp.mortgageDes')" v-model="form.bzj" :disabled="true" />
			        </div>
			        <div class="view_form_item_input_msg">GAZ</div>
			      </div>
			    </div>
			    <div class="view_form_item options">
			      <!-- <van-button type="default" style="margin-right: auto;width: 40%;" @click="urlgo">{{$t('message.cancel')}}</van-button> -->
			      <van-button type="warning" color="#fdc500" style="margin-left: auto;width: 40%;" :loading="ddcode"
				   @click="adddingdan">{{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000'? $t('message.dapp.sell'):$t('message.dapp.buy')}}{{ddinfo.huobi}}</van-button>
			    </div>
			  </div>
			</div>
		</el-col>
		
	</el-row>
    <div class="view" v-else>
      <div class="view_ul">
        <div class="view_ul_li">
          {{$t('message.arbitration.order')}}:{{ ddid }}
        </div>
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.dapp.unitPrice')}}</div>
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.unit) }} {{ ddinfo.fabi }}</div>
        </div>
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.dapp.limit')}}</div>
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.zer) }} - {{ getnumsing(ddinfo.mal) }} {{ddinfo.huobi}}</div>
        </div>
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.dapp.amount')}}</div>
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.Moa) }} {{ddinfo.huobi}}</div>
        </div>
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.arbitration.merchantMargin')}}</div>
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.bMar) }} GAZ</div>
        </div>
    
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.dapp.MarginRatio')}}</div>
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.mar) }} %</div>
        </div>
        <div class="view_ul_li">
          <div class="view_ul_li_l">{{$t('message.dapp.orderStatus')}}</div>
          <div class="view_ul_li_r">{{ ddinfo.mlive == 1 ? $t('message.dapp.ReceivingOrder'):$t('message.dapp.Resting') }}</div>
        </div>
        <div class="view_ul_li beizhu">
			<div class="view_ul_li_l">{{$t('message.remarks')}}：</div>
          <span>{{$t('message.remarks')}}：{{ ddinfo.beizhu == 'No remarks are filled in' ? $t('message.notFill') : ddinfo.beizhu}}</span>
        </div>
       <!-- <div class="view_ul_li beizhu_conn">
          <el-button type="text" @click="openlxfs">{{$t('message.contactDes')}}</el-button>
        </div> -->
      </div>
    
      <div class="view_form">
        <div class="view_form_item">
          <div class="view_form_item_t">
            {{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.sell'):$t('message.dapp.buy')  }}
            <span v-if="form.num">{{$t('message.frienchOtc.charge')}} {{ ddinfo['sxf_je'] }} {{ddinfo.huobi}}</span>
          </div>
          <div class="view_form_item_input">
            <div class="view_form_item_input_srk f c_c a_c" style="border: 1px solid #DCDCDC; width: 80%;height: 40px;">
              <van-field placeholder="0.00" v-model="form.num" :disabled="code"/>
            </div>
            <div class="view_form_item_input_msg">{{ddinfo.huobi}}</div>
          </div>
        </div>
        <div class="view_form_item">
          <div class="view_form_item_t">{{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.received'):$t('message.dapp.buy') }}</div>
          <div class="view_form_item_input">
            <div class="view_form_item_input_srk">
              <van-field :placeholder="$t('message.dapp.getCurrency')" v-model="form.je" :disabled="true" />
            </div>
            <div class="view_form_item_input_msg">CNY</div>
          </div>
        </div>
        <div class="view_form_item">
          <div class="view_form_item_t">{{$t('message.arbitration.margin')}}</div>
          <div class="view_form_item_input">
            <div class="view_form_item_input_srk">
              <van-field :placeholder="$t('message.dapp.mortgageDes')" v-model="form.bzj" :disabled="true" />
            </div>
            <div class="view_form_item_input_msg">GAZ</div>
          </div>
        </div>
        <div class="view_form_item options">
          <van-button type="default" style="margin-right: auto;width: 40%;" @click="urlgo">{{$t('message.cancel')}}</van-button>
          <van-button type="warning" color="#fdc500" style="margin-left: auto;width: 40%;" :loading="ddcode"
    	   @click="adddingdan">{{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000'? $t('message.dapp.sell'):$t('message.dapp.buy')}}{{ddinfo.huobi}}</van-button>
        </div>
      </div>
    </div>

    <!-- 输入订单ID弹框 -->
    <van-dialog v-model="ddshow" title="Order ID" show-cancel-button @confirm="getddinfo" @cancel="quxiao">
      <el-input v-model="ddid" placeholder="Please enter order ID" class="shurukuang"></el-input>
    </van-dialog>
  </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
import { Dialog, Notify, Toast } from 'vant';
import tools from '@/api/public.js'

import config from "@/config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var hbjson = {
  huobi: [],
  fabi: []
};
var hbarr = config['hbi'][config['key']];
var fbarr = config['fabi'][config['key']];
for (const key in hbarr) {
  hbjson.huobi.push({
    hyue: hbarr[key]['heyue'],
    id: hbarr[key]['id'],
    key: hbarr[key]['key'],
    num: hbarr[key]['num']
  });
}
for (const key in fbarr) {
  hbjson.fabi.push({
    key: fbarr[key]['key'],
    id: fbarr[key]['id']
  });
}
var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
//全局变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;

export default {
  data() {
    return {
      ddid: "",
      ddshow: false,
      code: true,
	  type: 1,  // 1: 作为弹框   2：订单详情页


      ddinfo: {
        username: '',
        Mowner: '',
        unit: '',
        mal: 0,
        zer: 0,
        Moa: '',
        bMar: '',
        mar: '',
        mlive: '',
        beizhu: '',
        huobi: '',
        fabi: '',
        Mmark: '0x6275790000000000000000000000000000000000000000000000000000000000'
      },
      pros: {
        one: '',
        uni: '',
        pri: '',
        mar: '',
        rati: '',

      },
      form: {
        bzj: null,
        je: null,
        num: null
      },

      ddcode: false,

      //新版
      user: {
        balancemar: null,
        balancepro: null
      }
    };
  },
  props:['did'],
  watch: {
	ddid(){
		// console.log('1111')
		// this.getddinfo()
	},
    'form.num'(e) {
      
      var sxf = 0;
      var shuere = (e * Number(this.pros['rati'])) / (10 ** 6);
      // var bilie = (1 / Number(this.pros['uni'])) * 10 ** 6;
      // if (shuere >= bilie) {
        sxf = shuere;
      // }
      // else { sxf = bilie; }
      this.ddinfo['sxf_je'] = sxf;
      this.ddinfo['sxf_shuere'] = shuere;

      if (this.ddinfo['Mmark'] != '0x6275790000000000000000000000000000000000000000000000000000000000') {
        this.form['je'] = this.getnumsing((!e ? 0 : (e)) * this.ddinfo['unit']);
      } else {

        this.form['je'] = this.getnumsing((!e ? 0 : (e - sxf)) * this.ddinfo['unit']);
      }

      if (this.ddinfo.mar == 0) {
        return;
      }
      //计算保证金
      function mul(x, y) {
        var z = x * y;
        return z;
      }
      this.form['bzj'] = Number(tools.getnume(mul(mul(e, this.pros.uni), this.pros.mar) / mul(this.pros.pri, (10 ** 18)))).toFixed(2);
    },
    'form.je'(e) {
      if (!e) {
        return;
      }
      // this.form['num'] = ((!e ? 0:e) / this.ddinfo['unit']).toFixed(2);
    }
  },
  mounted() {
	let strId =  this.$route.query.did
    if (this.did) {
      this.ddid = this.did;
      this.ddshow = false;
    }else if(strId){
		this.ddid = strId;
		this.type = 2
		this.ddshow = false;
	} else {
      this.ddshow = true;
    }
    var dq = this;
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		address = id
		if (dq.ddid) {
		  //判断是否传入订单号
		  dq.getddinfo();
		}
	}).catch((err)=>{
		console.log(err);
	})
  },

  methods: {
    urlgo() {
      // this.$router.go(-1);
      this.$emit('visibleDialogShowFn', false)

    },
    quxiao() {
      this.code = true;
    },
    //数字保留两位数
    getnumsing(num) {
      let numStr = num.toString()
      let index = numStr.indexOf('.')
      let result
      if (index != -1) {
        result = numStr.slice(0, index + 3);
      } else {
        result = num;
      }
      if (result < 1) {
        return result;
      } else {
        return Number(result);
      }
    },
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
        var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
        dotsconn.methods.merch(this.ddid + "").call((error, ret) => {
          jiazai.clear();
          if (ret && !error) {
            if (ret.Mmark == '0x0000000000000000000000000000000000000000000000000000000000000000') {
              dq.code = true;
            } else {
              var fabi = '';
              var huobi = '';
              for (let index = 0; index < hbjson['fabi'].length; index++) {
                if (hbjson['fabi'][index]['key'] == ret.fiat) {
                  fabi = hbjson['fabi'][index]['id'];
                  break;
                }
              }
              for (let index = 0; index < hbjson['huobi'].length; index++) {
                if (hbjson['huobi'][index]['key'] == ret.pro) {
                  huobi = hbjson['huobi'][index]['id'];
                  break;
                }
              }
              dq.pros['mar'] = ret['mar'];
              var pro_dec = 10**config['hbi'][config['key']][huobi]['num'];
              // 组装数据
              dq.ddinfo = {
                  username:'',
                  fabi:fabi,
                  Mowner:ret.Mowner,
                  unit:Number(ret.unit / 100),
                  mal:(Number(ret.mal) / pro_dec).toFixed(2),
                  zer:(Number(ret.zer) / pro_dec).toFixed(2),
                  Moa:(Number(ret.Moa) / pro_dec).toFixed(2),
                  bMar:0,
                  mar:(Number(ret.mar) / (10**16)).toFixed(2),
                  mlive:ret.mlive,
                  beizhu:'',
                  huobi:huobi,
                  Mmark:ret.Mmark
              };
			  console.log(dq.ddinfo)
              dq.code = false;
              dotsconn.methods.balancemar(ret.Mowner).call((errb, bzj) => {
                if (bzj) {
                  dq.ddinfo['bMar'] = (Number(bzj) / (10 ** bzj_num)).toFixed(2);
                } else {
                  dq.ddinfo['bMar'] = 0.00;
                }
              });
              //获取当前用户的保证金 资产余额
              var zicheyue = config['hbi'][config['key']][dq.ddinfo.huobi]['heyue'];

              dotsconn.methods.balancepro(address + "", zicheyue + "").call((errb, balancepro) => {
                dq.user['balancepro'] = Number(balancepro);
              });
              dotsconn.methods.balancemar(address + "").call((errc, balancemar) => {
                dq.user['balancemar'] = Number(balancemar);
              });

              // getddbeizhu(ret['Mowner']);
              getddsjusername(ret['Mowner']);
              getpros();
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

      //获取用户名 + 备注
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
      function getddsjusername(uaddress) {
        var beizhucon = new web3.eth.Contract(dotc_abi, dotc_key);
        beizhucon.methods.message(uaddress + "", "6").call((error, ret) => {
          if (ret && !error) {
            dq.ddinfo.beizhu = Base64.decode(ret);
          } else {
            dq.ddinfo.beizhu = dq.$t('message.notFill');
          }
        });
      }

      //查询 pros pri
      function getpri() {
        var pricon = new web3.eth.Contract(dotc_abi, dotc_key);
        pricon.methods.pri().call((err, result) => {
          dq.pros['pri'] = result;
		  console.log(dq.pros)
        })
      }
      //pros
      function getpros() {
        var wsql = config['hbi'][config['key']][dq.ddinfo.huobi]['key'];
        var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
        contracts.methods.pros(wsql + "").call((err, result) => {
          dq.pros['one'] = result['one'];
          dq.pros['uni'] = result['uni'];
          dq.pros['rati'] = Number(result['rati']);
          getpri();
        })
      }
    },
    //提交订单 买入卖出
    adddingdan() {
      var dq = this;
      if (!dq.form['num']) {
        Notify({ type: 'warning', message: this.$t('message.frienchOtc.quantity') });
        return;
      }
	  if (dq.form['num'] < Number(this.ddinfo['zer'])) {
	    Notify({ type: 'warning', message: this.$t('message.frienchOtc.noLess') + this.ddinfo['zer'] });
	    return;
	  }
	  
	  if (dq.form['num'] > Number(this.ddinfo['mal'])) {
	    Notify({ type: 'warning', message: this.$t('message.exceedTips') + this.ddinfo['mal'] });
	    return;
	  }
	  if (dq.form['num'] > Number(this.ddinfo['Moa'])) {
	    Notify({ type: 'warning', message: this.$t('message.frienchOtc.exceedTips') + this.ddinfo['Moa'] });
	    return;
	  }
      if (!dq.form['je']) {
        Notify({ type: 'warning', message: this.$t('message.frienchOtc.enterAmount') });
        return;
      }
      if (dq.form['num'] > Number(dq.ddinfo['mal'])) {
        Notify({ type: 'warning', message: this.$t('message.NotMaxNum') });
        return;
      }
      if (dq.form['num'] < Number(dq.ddinfo['zer'])) {
        Notify({ type: 'warning', message: this.$t('message.NotMinNum') });
        return;
      }
	  // 判断商家保证金
	  console.log(dq.ddinfo.bMar)
	  console.log(dq.form['num'] * dq.pros['uni'] * 0.2 / dq.pros.pri)
	  if(dq.form['num'] * dq.pros['uni'] * 0.2 / dq.pros.pri > dq.ddinfo.bMar){
		  Notify({ type: 'warning', message: this.$t('message.notMar') });
		  return;
	  }
      
      if (dq.form['bzj'] > dq.user['balancemar']) {
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
			console.log('dq.$router.push(./baozhengjin)');
          });
        return;
      }

      if (dq.ddinfo['Mmark'] != '0x6275790000000000000000000000000000000000000000000000000000000000') {
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
          message: msg == 'Buying' ? dq.$t('message.dapp.buy') + '...' : dq.$t('message.dapp.sell') + '...',
          closeOnClick: false,
          closeOnClickOverlay: false,
          loadingType: 'spinner',
          getContainer: "body",
          duration: 0
        });
        dq.ddcode = true;
        //提交订单 计算后面的零
        var num = dq.form['num'];
        for (let index = 0; index < hbjson['huobi'].length; index++) {
          if (dq.ddinfo.huobi == hbjson['huobi'][index]['id']) {
            num = (dq.form['num'] * (10 ** hbjson['huobi'][index]['num']));
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
    },
    back(){
		this.$router.go(-1)
	}
  },
  props: ['did']
};
</script>
<style>
.viewaaaa {
  /* width: 375px; */
  margin: auto;
}
.shurukuang {
  width: calc(100% - 30px);
  padding: 15px;
}

.view {
  /* width: calc(100% - 40px); */
  margin: 0 20px;
  padding-bottom: 20px;
}

.view_head {
  display: flex;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
}

.view_head_quan {
  width: 50px;
  height: 50px;
  background-color: cadetblue;
  color: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
}

.view_head_info {
  display: flex;
  flex-direction: column;
}
.view_head_info_title {
  font-size: 16px;
  margin-left: 10px;
}
.view_head_info_user {
  overflow: hidden;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 8px;
  opacity: 0.8;
  overflow: hidden;
}

.view_head_ddid {
  padding: 10px;
  width: 100%;
  background: #fff;
}

.view_ul {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.view_ul_li {
  display: flex;
  /* flex-direction: column; */
  min-height: 20px;
  align-items: center;
  background: #fff;
  /* margin: 10px 0; */
  padding: 10px 0;
}
.bordd{
	border-bottom: 1px dashed  #999;
}
.view_ul_li_l {
  margin-right: auto;
  opacity: 0.7;
  font-size: 14px;
}
.view_ul_li_r {
  margin-left: auto;
  opacity: 1;
  font-size: 14px;
}

.beizhu {
  /* width: 100%; */
  opacity: 0.5;
  padding: 10px 15px;
  border: 1px solid rgb(100, 99, 99);
  font-size: 14px; 
  line-height: 20px;
}
.beizhuTtile{ 
  margin-top: 15px;
}
.view_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.view_form_item {
  /* padding: 10px 0; */
  width: 100%;
  overflow: hidden;
  /* border: 1px solid rgba(160, 158, 158, 0.603); */
  /* margin-top: 20px; */
  border-radius: 5px;
  align-items: center;
  background: #fff;
}

.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.view_form_item_t {
  padding: 7px 15px;
  font-size: 14px;
  opacity: 0.8;
}
.view_form_item_input {
  margin-right: auto;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.view_form_item_input_msg {
  margin-left: auto;
  padding-right: 15px;
  font-size: 14px;
  opacity: 0.8;
}
.options {
  display: flex;
  align-items: center;
  background: transparent;
}

.view_form_item_l {
  display: flex;
  align-items: center;
  background: #eeeefc;
  border: 0;
}
</style>
