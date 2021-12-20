
<template>
  <div class="viewaaaa">
    <!-- <van-nav-bar :title="ddinfo['Mmark'] != '0x6275790000000000000000000000000000000000000000000000000000000000' ? 'purchase':'for sale'" left-text="return" left-arrow :fixed="true" :placeholder="true" z-index="99" @click-left="urlgo" /> -->

    <div class="view">
      <!-- <div class="view_head">
        <div class="view_head_quan">{{ddinfo.username.substring(0,1)}}</div>
        <div class="view_head_info">
          <div class="view_head_info_title">{{ ddinfo.username }}</div>
          <div class="view_head_info_user">
            <span>{{ ddinfo.Mowner }}</span>
          </div>
        </div>
      </div> -->

      <!-- <div class="view_head_ddid">
        order number:{{ ddid }}
      </div> -->

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
          <div class="view_ul_li_r">{{ getnumsing(ddinfo.bMar) }} USDT</div>
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
          <span>交易备注：{{ ddinfo.beizhu == 'No remarks are filled in' ? $t('message.notFill') : ddinfo.beizhu}}</span>
        </div>
       <!-- <div class="view_ul_li beizhu_conn">
          <el-button type="text" @click="openlxfs">{{$t('message.contactDes')}}</el-button>
        </div> -->
      </div>

      <div class="view_form">
        <div class="view_form_item">
          <div class="view_form_item_t">
            {{ ddinfo['Mmark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? $t('message.dapp.sell'):$t('message.dapp.buy')  }}
            <span v-if="form.num">Service Charge {{ ddinfo['sxf_je'] }} {{ddinfo.huobi}}</span>
          </div>
          <div class="view_form_item_input">
            <div class="view_form_item_input_srk">
              <van-field placeholder="0.00" v-model="form.num" :disabled="code" />
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
            <div class="view_form_item_input_msg">USDT</div>
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
import Web3 from "web3";
import Web3Modal from "web3modal";
let Base64 = require('js-base64').Base64;
import { Dialog, Notify, Toast } from 'vant';

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
  watch: {
    'form.num'(e) {
      if (!e) {
        return;
      }

      if (e < Number(this.ddinfo['zer'])) {
        Notify({ type: 'warning', message: 'Quantity cannot be less than' + this.ddinfo['zer'] });
        return;
      }

      if (e > Number(this.ddinfo['mal'])) {
        Notify({ type: 'warning', message: 'Quantity cannot be greater than' + this.ddinfo['mal'] });
        return;
      }
      if (e > Number(this.ddinfo['Moa'])) {
        Notify({ type: 'warning', message: 'Quantity cannot be greater than' + this.ddinfo['Moa'] });
        return;
      }
      var sxf = 0;
      var shuere = (e * Number(this.pros['rati'])) / (10 ** 6);
      var bilie = (3 / Number(this.pros['uni'])) * 10 ** 6;
      if (shuere >= bilie) {
        sxf = shuere;
      }
      else { sxf = bilie; }

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
      this.form['bzj'] = Number(this.getnume(mul(mul(e, this.pros.uni), this.pros.mar) / mul(this.pros.pri, (10 ** 6)))).toFixed(2);
    },
    'form.je'(e) {
      if (!e) {
        return;
      }
      // this.form['num'] = ((!e ? 0:e) / this.ddinfo['unit']).toFixed(2);
    }
  },
  mounted() {
    if (this.did) {
      this.ddid = this.did;
      this.ddshow = false;
    } else {
      this.ddshow = true;
    }
    var dq = this;
    // 监测用户是否安装MASK
    if (typeof ethereum === 'undefined') {
      web3 = new Web3(config['hyue'][config['key']]['Url']);
      address = "";
      if (dq.ddid) {
        //判断是否传入订单号
        dq.getddinfo();
      }
    } else {
      webinit();
    }

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
        if (dq.ddid) {
          //判断是否传入订单号
          dq.getddinfo();
        }
      }
    }
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

    //数值E转换
    getnume(num_str) {
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
    getddinfo() {
      var dq = this;
      if (this.ddid) {
        var jiazai = Toast.loading({
          message: 'In query',
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
              console.log(ret);
              // 组装数据
              dq.ddinfo = {
                username: '',
                fabi: fabi,
                Mowner: ret.Mowner,
                unit: Number(ret.unit / 100),
                mal: huobi == 'USDT' ? (Number(ret.mal) / (10 ** bzj_num)).toFixed(2) : (Number(ret.mal) / (10 ** 6)).toFixed(2),
                zer: huobi == 'USDT' ? (Number(ret.zer) / (10 ** bzj_num)).toFixed(2) : (Number(ret.zer) / (10 ** 6)).toFixed(2),
                Moa: huobi == 'USDT' ? (Number(ret.Moa) / (10 ** bzj_num)).toFixed(2) : (Number(ret.Moa) / (10 ** 6)).toFixed(2),
                bMar: 0,
                mar: (Number(ret.mar) / (10 ** 4)).toFixed(2),
                mlive: ret.mlive,
                beizhu: '',
                huobi: huobi,
                Mmark: ret.Mmark
              };
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

              getddbeizhu(ret['Mowner']);
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
            dq.ddinfo.username = 'No nickname is filled in';
          }
        });
      }
      function getddsjusername(uaddress) {
        var beizhucon = new web3.eth.Contract(dotc_abi, dotc_key);
        beizhucon.methods.message(uaddress + "", "6").call((error, ret) => {
          if (ret && !error) {
            dq.ddinfo.beizhu = Base64.decode(ret);
          } else {
            dq.ddinfo.beizhu = 'No remarks are filled in';
          }
        });
      }

      //查询 pros pri
      function getpri() {
        var pricon = new web3.eth.Contract(dotc_abi, dotc_key);
        pricon.methods.pri().call((err, result) => {
          dq.pros['pri'] = result;
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
        Notify({ type: 'warning', message: 'Quantity cannot be empty' });
        return;
      }
      if (!dq.form['je']) {
        Notify({ type: 'warning', message: 'Please enter payment amount' });
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
      //判断User deposit 与 资产
      if (dq.form['num'] > dq.user['balancepro']) {
        Dialog.confirm({
          title: 'warning',
          message: this.$t('message.assetRchargeTips') ,
          confirmButtonText: this.$t('message.cancel'),
          cancelButtonText: 'Recharge',
          cancelButtonColor: '',
          getContainer: 'body'
        })
          .catch(() => {
            dq.$router.push('./chongzhi');
          });
        return;
      }
      if (dq.form['bzj'] > dq.user['balancemar']) {
        Dialog.confirm({
          title: 'warning',
          message: '押金不足，请先补足押金！',
          confirmButtonText: $t('message.cancel'),
          cancelButtonText: '充值',
          cancelButtonColor: '',
          getContainer: 'body'
        })
          .catch(() => {
            // dq.$router.push('./baozhengjin');
			console.log('dq.$router.push(./baozhengjin)');
          });
        return;
      }

      if (dq.ddinfo['Mmark'] != '0x6275790000000000000000000000000000000000000000000000000000000000') {
        adddingdanajax('Buying');
      } else {
        adddingdanajax('On sale');
      }

      //提交订单
      function adddingdanajax(msg) {
        var jiazai = Toast.loading({
          message: '' + msg + '...',
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
		num = dq.getnume(num);
		console.log(num);
        var doctconn = new web3.eth.Contract(dotc_abi, dotc_key);
        doctconn.methods.taker(dq.ddid, num + "").send({
          from: address
        }, (err, ret) => {
          if (!err && ret) {
            doctconn.events.Taker({}, function (error, event) {
              if (!error && event) {
                jiazai.clear();
                dq.ddcode = false;
                if (address == event.returnValues['Madd'].toLowerCase()) {
                  Dialog.alert({
                    title: 'success',
                    message: msg.indexOf('On sale') != -1 ? 'Sold successfully! The order number is:' + +event['returnValues']['uorder'] + '' : 'Purchase succeeded! The order number is:' + +event['returnValues']['uorder'] + '',
                  }).then(() => {
                    window.location.reload();
                  });
                }
              }
            });
          } else {
            Dialog.alert({
              title: 'fail',
              message: 'Please click OK!',
            });
            dq.ddcode = false;
            jiazai.clear();
          }
        });

      }
    }
    , openlxfs() {
      var user = this.ddinfo['Mowner'];
      this.$router.push({
        path: './beizhu',
        query: { user: user }
      });
    }
  },
  props: {
    did: {

    },
  }
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
  margin: 20px;
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
  min-height: 50px;
  align-items: center;
  background: #fff;
  margin: 10px 0;
  padding: 10px;
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
  margin-top: 15px;
}

.view_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.view_form_item {
  padding: 10px 0;
  width: 100%;
  overflow: hidden;
  /* border: 1px solid rgba(160, 158, 158, 0.603); */
  margin-top: 20px;
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
  margin-bottom: 5px;
}
.view_form_item_input_msg {
  margin-left: auto;
  padding-right: 15px;
  font-size: 16px;
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
