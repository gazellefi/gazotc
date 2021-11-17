<style>
.fabu {
  width: 375px;
  margin: auto;
  background-color: #fff;
  margin: 5px 5px;
}
.fabu_head {
  width: calc(100% - 30px);
  float: left;
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
  width: calc(100% - 30px);
  float: left;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 15px;
}
.fabu_tab_item {
  margin-left: 30px;
  opacity: 0.5;
  transition: all 0.3s;
}
.fabu_tab_item.ac {
  opacity: 1;
  color: rgb(51, 75, 211);
  font-size: 22px;
}

/* 表单 */
.add {
  width: 100%;
  margin-top: 30px;
  float: left;
}

.add_form {
  width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  margin: 0 15px;
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
</style>
<template>
  <div class="fabu">
    <div class="fabu_tab">
      <div class="fabu_tab_item" style="margin-left: 0px;" @click="m = '0x6275790000000000000000000000000000000000000000000000000000000000'" :class="m == '0x6275790000000000000000000000000000000000000000000000000000000000' ? 'ac':''">purchase</div>
      <div class="fabu_tab_item" @click="m = '0x73616c6500000000000000000000000000000000000000000000000000000000'" :class="m == '0x73616c6500000000000000000000000000000000000000000000000000000000' ? 'ac':''">sell</div>
    </div>
    <!-- 表单 -->
    <div cclass="add">
      <div class="add_form">
        <div class="add_form_item_xuanze">
          <div class="add_form_item xz" style="margin-left: 0;">
            <div class="add_form_item_input">
              <el-select v-model="pro" placeholder="Please select" :disabled="user['user'] ? false:true">
                <el-option v-for="item in data['huobi']" :key="item.id" :label="item.id" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="add_form_item xz">
            <div class="add_form_item_input">
              <el-select v-model="fi" placeholder="Please select" :disabled="user['user'] ? false:true">
                <el-option v-for="item in data['fabi']" :key="item.id" :label="item.id" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Unit Price</div>
          <div class="add_form_item_input">
            <el-input placeholder="Please enter the content" v-model="form.dj" @blur="jsbzj" :disabled="user['user'] ? false:true">
              <template slot="append">{{ fi }}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.dj">
            Unit price cannot be blank
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">quantity</div>
          <div class="add_form_item_input">
            <el-input placeholder="Please enter the content" v-model="form.num" @blur="jsbzj" :disabled="user['user'] ? false:true">
              <template slot="append">{{pro}}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] > 0">
            * This quantity cannot exceed（{{user['num']}}）, please reduce the quantity or recharge!
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] <= 0">
            * You need to recharge before publishing a sales order!
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.num">
            Quantity cannot be empty
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Merchant deposit</div>
          <div class="add_form_item_input">
            <el-input placeholder="" v-model="form.sjbzj" disabled></el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.sjbzj" style="color: #0d92f1;">
            * The margin balance is insufficient, but it can still be published
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Minimum quantity</div>
          <div class="add_form_item_input">
            <el-input placeholder="Please enter the content" v-model="form.zd_num" :disabled="user['user'] ? false:true">
              <template slot="append">{{pro}}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.zd_num">
            Minimum quantity cannot be empty
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Maximum quantity</div>
          <div class="add_form_item_input">
            <el-input placeholder="Please enter the content" v-model="form.zg_num" :disabled="user['user'] ? false:true">
              <template slot="append">{{pro}}</template>
            </el-input>
          </div>
          <div class="add_form_item_input errormsg" v-if="isform.zg_num">
            Maximum quantity cannot be empty
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">User deposit</div>
          <div class="add_form_item_input">
            <el-input placeholder="Please enter the content" v-model="form.user_bzj" :disabled="user['user'] ? false:true">
              <template slot="append">%</template>
            </el-input>
          </div>
        </div>
        <div class="add_form_item">
          <div class="add_form_item_t">Entrustment remarks</div>
          <div class="add_form_item_input">
            <el-input type="textarea" placeholder="Please enter the content" maxlength="30" disabled v-model="form.beizhu" show-word-limit>
            </el-input>
          </div>
          <p class="add_form_item_input_p" @click="beizhuxiugai()">Modify comments</p>
        </div>
        <el-button type="primary" style="margin-top: 30px;" @click="tijiao" :disabled="isform.zcye ? true:false">Submit</el-button>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";

import Web3 from "web3"
import Web3Modal from "web3modal"
let Base64 = require('js-base64').Base64;
import { Dialog, Toast, Notify } from 'vant';

//公共变量
var web3 = "";
var ethereum = window.ethereum;

//定义新版相关配置
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
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
export default {
  //初始化WEB3
  created() {
    var dq = this;
    // 监测用户是否安装MASK
    if (typeof ethereum === 'undefined') {
      web3 = new Web3('https://rinkeby.infura.io/v3/eae681441c2243b3969a2e663290ffc4');
    } else {
      //初始化
      webinit();
    }
    async function webinit() {
      const providerOptions = {
        /* See Provider Options Section */
      };
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
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
        dq.user['user'] = provider.selectedAddress;
      }
    }
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
      m: '0x6275790000000000000000000000000000000000000000000000000000000000',
      pro: huobi_arr[0]['id'],
      fi: fabi_arr[0]['id'],
      data: {
        huobi: huobi_arr,
        fabi: fabi_arr
      },


      //用户数据
      user: {
        user: '',
        balancemar: 0,
        balancepro: 0,
        num: 0
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

        sjbzj: '',
        zd_num: '',
        zg_num: '',
        user_bzj: '',
        beizhu: ''
      },

      sq_code: 0, //0默认 1余额大于1 2直接授权
    }
  },
  //数据监听
  watch: {
    'm'() {
      //初始化表单
      this.form = {
        dj: '',
        num: '',

        sjbzj: '',
        zd_num: '',
        zg_num: '',
        user_bzj: '',
        beizhu: ''
      }
      this.isform = {
        dj: false,
        zcye: false,
        num: false,
        sjbzj: false,
        zd_num: false,
        zg_num: false,
        user_bzj: false
      }
    },
    'user.user'(e) {
      var dq = this;
      //读取会员资料
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
      dotsconn.methods.message(e + "", '6').call((err, ret) => {
        if (ret) {
          dq.form.beizhu = Base64.decode(ret);
        }
      });
      //获取查询条件所需数据
      dotsconn.methods.pri().call((err, ret) => {
        if (ret) {
          dq.hbi['pri'] = ret;
        }
      });
      dotsconn.methods.mara().call((err, ret) => {
        if (ret) {
          dq.hbi['mara'] = ret;
        }
      });
      var cpro = config['hbi'][config['key']][dq.pro]['key'];
      dotsconn.methods.pros(cpro).call((err, ret) => {
        if (ret) {
          dq.hbi['uni'] = ret['uni'];
          dq.hbi['rati'] = ret['rati'];
          dq.hbi['one'] = ret['one'];
        }
      });
      var zicheyue = config['hbi'][config['key']][dq.pro]['heyue'];
      // 如果发布卖单
      dotsconn.methods.balancemar(e).call((err, balancemar) => {
        //保证金
        if (balancemar) {
          var balancemarb = Number(balancemar);
          dotsconn.methods.balancepro(e, zicheyue).call((errb, balancepro) => {
            //用户资产余额
            if (balancepro) {
              var balanceprob = Number(balancepro);
              dq.user['balancepro'] = balanceprob;
              dq.user['balancemar'] = balancemarb;
            }
          });
        }
      });
    },
    'form.dj'(e) {
      if (!e || e == 0) {
        this.isform['dj'] = true;
      } else {
        this.isform['dj'] = false;
      }
      var result = e.indexOf(".");
      if (result != -1) {
        var eaa = e.substr((e.indexOf(".") + 1), e.length);
        if (eaa.length > 2) {
          var ea = parseFloat(e);
          this.form.dj = ea.toFixed(2);
        }
      }
      if (e && this.form.num) {
        this.jsbzj();
      }
    },
    'form.num'(e) {
      if (!e || e == 0) {
        this.isform['num'] = true;
      } else {
        this.isform['num'] = false;
      }
      var result = e.indexOf(".");
      if (result != -1) {
        var eaa = e.substr((e.indexOf(".")), e.length);
        if (eaa.length > 2) {
          var ea = parseFloat(e);
          this.form.num = ea.toFixed(2);
        }
      }
      if (e && this.form.dj) {
        this.jsbzj();
      }
    },
    'form.zd_num'(e) {
      if (!e || e == 0) {
        this.isform['zd_num'] = true;
      } else {
        this.isform['zd_num'] = false;
      }
      var result = e.indexOf(".");
      if (result != -1) {
        var eaa = e.substr((e.indexOf(".") + 1), e.length);
        if (eaa.length > 2) {
          var ea = parseFloat(e);
          this.form.zd_num = ea.toFixed(2);
        }
      }
    },
    'form.zg_num'(e) {
      if (!e || e == 0) {
        this.isform['zg_num'] = true;
      } else {
        this.isform['zg_num'] = false;
      }
      var result = e.indexOf(".");
      if (result != -1) {
        var eaa = e.substr((e.indexOf(".") + 1), e.length);
        if (eaa.length > 2) {
          var ea = parseFloat(e);
          this.form.zg_num = ea.toFixed(2);
        }
      }
    },
    'form.user_bzj'(e) {
      if (!e || e == 0) {
        this.isform['user_bzj'] = true;
      } else {
        this.isform['user_bzj'] = false;
      }
      var result = e.indexOf(".");
      if (result != -1) {
        var eaa = e.substr((e.indexOf(".") + 1), e.length);
        if (eaa.length > 2) {
          var ea = parseFloat(e);
          this.form.user_bzj = ea.toFixed(2);
        }
      }
    },
    'pro'(e) {
      var dq = this;
      //读取会员资料
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
      //获取查询条件所需数据
      dotsconn.methods.pri().call((err, ret) => {
        if (ret) {
          dq.hbi['pri'] = ret;
        }
      });
      dotsconn.methods.mara().call((err, ret) => {
        if (ret) {
          dq.hbi['mara'] = ret;
        }
      });
      var zichepros = config['hbi'][config['key']][e]['key'];
      dotsconn.methods.pros(zichepros + "").call((err, ret) => {
        if (ret) {
          dq.hbi['uni'] = ret['uni'];
          dq.hbi['rati'] = ret['rati'];
          dq.hbi['one'] = ret['one'];
        }
      });
      var zicheyue = config['hbi'][config['key']][e]['heyue'];
      // 如果发布卖单
      dotsconn.methods.balancemar(dq.user['user']).call((err, balancemar) => {
        //保证金
        if (balancemar) {
          var balancemarb = Number(balancemar);
          dotsconn.methods.balancepro(dq.user['user'], zicheyue).call((errb, balancepro) => {
            //用户资产余额
            if (balancepro) {
              var balanceprob = Number(balancepro);
              dq.user['balancepro'] = balanceprob;
              dq.user['balancemar'] = balancemarb;
            }
          });
        }
      });
    }
  },
  methods: {
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

      return Number(result);
    },
    tijiao() {
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
      if (!this.form['dj']) {
        return;
      }
      if (!this.form['num']) {
        return;
      }
      if (!this.form['zd_num']) {
        return;
      }
      if (!this.form['zg_num']) {
        return;
      }
      if (!this.form['user_bzj']) {
        return;
      }
      if (Number(this.form['zd_num']) > Number(this.form['num'])) {
        Notify({ type: 'warning', message: 'The minimum quantity cannot be greater than the total' });
        return;
      }
      if (Number(this.form['zg_num']) > Number(this.form['num'])) {
        Notify({ type: 'warning', message: 'The maximum quantity cannot be greater than the total' });
        return;
      }
      if (Number(this.form['user_bzj']) > 100) {
        Notify({ type: 'warning', message: 'User Deposit cannot be greater than 100%' });
        return;
      }
      var dq = this;
      if (dq.isform.sjbzj) {
        Dialog.confirm({
          title: 'warning',
          message: 'This order can be released, but the margin balance is too low and may not be traded. Please supplement the margin in time!',
          confirmButtonText: 'Supplementary margin',
          cancelButtonText: 'Release order',
          cancelButtonColor: '',
          getContainer: 'body'
        })
          .then(() => {
            dq.$router.push('./baozhengjin');
          })
          .catch(() => {
            isdingdan();
          });

        return;
      }
      isdingdan();

      function isdingdan() {
        //监听订单发布结果
        dotsconn.events.Merch("", (err, ret) => {
          console.log(err, ret)
          //结果
          if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
            Toast.clear();
            dq.sq_code = 0;
            //判断是购买还是出售
            if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            } else {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            }

          }
        });
        dotsconn.events.Taker("", (err, ret) => {
          //结果
          if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
            Toast.clear();
            dq.sq_code = 0;
            //判断是购买还是出售
            if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            } else {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            }
          }
        });
        Toast.loading({
          message: 'Submitting...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        addajax();
      }
      //Release order
      function addajax() {
        Toast.loading({
          message: 'Please confirm the submission...',
          forbidClick: true,
          loadingType: 'spinner',
        });

        var postpro = '0x7573647400000000000000000000000000000000000000000000000000000000';
        var postfi = '';
        var postd = '';
        var posta = '';
        var postb = '';
        var postc = '';

        var num_bs = 0;

        for (let index = 0; index < fabi_arr.length; index++) {
          if (fabi_arr[index]['id'] == dq.fi + "") {
            postfi = fabi_arr[index]['key'];
            break;
          }
        }

        for (let index = 0; index < huobi_arr.length; index++) {
          if (huobi_arr[index]['id'] == dq.pro + "") {
            num_bs = huobi_arr[index]['num'];
            postpro = huobi_arr[index]['key'];
            break;
          }
        }

        postd = Number(dq.form['dj']) * 100;

        posta = parseFloat(dq.form['num']) * (10 ** num_bs);
        postb = parseFloat(dq.form['zd_num']) * (10 ** num_bs);
        postc = parseFloat(dq.form['zg_num']) * (10 ** num_bs);
        dotsconn.methods.setMerch(
          postpro,
          dq.m,
          dq.getFNum(posta) + "",
          dq.getFNum(postb) + "",
          dq.getFNum(postc) + "",
          postfi,
          postd + "",
          (dq.form['user_bzj'] * (10 ** 4)) + ""
        ).send({
          from: dq.user['user']
        }, (err, ret) => {
          console.log(err, ret, dq.user['user'])
          if (!ret) {
            Toast.clear();
            Toast({
              message: 'Please click authorization!',
              icon: 'cross',
              duration: 2000
            });
          } else {
            Toast.clear();
            Toast.loading({
              message: 'Release order中...',
              forbidClick: true,
              loadingType: 'spinner',
            });
            setTimeout(() => {              Toast.clear();
              Dialog.alert({
                title: 'Published successfully',
                message: 'Can be viewed or modified in my order',
              }).then(() => {
                this.$router.push('./ddguanli');
              });
            }, 5000);
          }
        });
      }
    },
    //保证金计算
    jsbzj() {
      var dq = this;
      if (this.form['dj'] && this.form['num']) {
        //保证金计算单位
        var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
        var pro_key = config['hbi'][config['key']][dq.pro]['key'];

        var prosconn = new web3.eth.Contract(dotc_abi, dotc_key);
        prosconn.methods.pros(pro_key).call((err, ret) => {
          if (ret) {
            console.log(ret);
            var i_num = dq.form['num'];
            var one = parseInt(ret['one']);
            var uni = parseInt(ret['uni']);
            var pri = parseInt(dq.hbi['pri']);
            var mara = parseInt(dq.hbi['mara']);
            var jisuan = (mul(mul((i_num * one), uni), mara) / mul(pri, one) / (10 ** bzj_num)).toFixed(2);
            dq.form['sjbzj'] = jisuan;
            if ((parseInt(dq.user['balancemar']) / (10 ** bzj_num)) >= jisuan) {
              dq.isform['sjbzj'] = false;
            } else {
              dq.isform['sjbzj'] = true;
            }
          }
        });
        //获取当前用户选择的资产进行查询 判断是买家与卖家
        if (this.m == '0x73616c6500000000000000000000000000000000000000000000000000000000') {
          var pro_num = config['hbi'][config['key']][dq.pro]['num'];
          var inum = Number(dq.form['num']) * (10 ** pro_num);
          if (inum > dq.user['balancepro']) {
            dq.isform['zcye'] = true;
            dq.user['num'] = (dq.user['balancepro']) / (10 ** pro_num);
          } else {
            dq.isform['zcye'] = false;
          }
        }
      }
      function mul(x, y) {
        var z = x * y;
        return z;
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
    beizhuxiugai() {
      this.$router.push('./beizhu');
    },
    fanhui() {
      this.$router.go(-1);
    }
  }
}
</script>