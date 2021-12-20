<style>
.ddgl_fabu {
  width: 100%;
  float: left;
}

.ddgl_fabu_p_head {
  width: calc(100% - 20px);
  float: left;
  background-color: rgba(0, 0, 0, 0.212);

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px;

  margin-top: 20px;
}

.ddgl_fabu_p_head_u {
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
}
.ddgl_fabu_p_head_u_q {
  margin-right: 30px;
  width: 50px;
  height: 50px;
  background-color: #ddd;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
}
.ddgl_fabu_p_head_u_c {
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_p_head_u_c_name {
  font-size: 15px;
}
.ddgl_fabu_p_head_u_c_msg {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}
.ddgl_fabu_p_head_u_c_user {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}

.ddgl_fabu_p_head_sxan {
  margin-left: 50px;
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_p_head_fabu {
  width: 120px;
  height: 35px;
  background-color: rgb(47, 0, 255);
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  margin-left: auto;
}

.ddgl_fabu_ul {
  width: 100%;
  float: left;
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_ul_head {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.ddgl_fabu_ul_li {
  display: flex;
  align-items: center;
  width: 11.1111%;
  margin-top: 20px;
  padding: 0 10px;
  font-size: 14px;
  opacity: 0.8;
}

.ddgl_fabu_ul_item {
  display: flex;
}
.danjiayanse {
  color: rgb(7, 203, 252);
}
.bzjyanse {
  color: #000;
  font-weight: 900;
}
.ddgl_fabu_p_head_sxan .ddgl_fabu_p_head_sxan_i {
  display: flex;
  padding: 0 15px;
}

/* wap */

.ddgl_fabu_wapview {
  width: 100%;
  float: left;
}
.ddgl_fabu_wap_head {
  display: flex;
  padding: 15px 0;
  align-items: center;
  margin-left: 15px;
}
.ddgl_fabu_wap_head_q {
  width: 45px;
  height: 45px;
  background-color: #ddd;
  border-radius: 100%;
  text-align: center;
  line-height: 45px;
  margin-right: 15px;
}
.ddgl_fabu_wap_head_u {
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_wap_head_u_name {
  font-size: 15px;
}
.ddgl_fabu_wap_head_u_msg {
  font-size: 13px;
  opacity: 0.7;
  padding: 3px 0;
}
.ddgl_fabu_wap_head_u_user {
  font-size: 13px;
  opacity: 0.5;
}
.ddgl_fabu_wap_saixuan {
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
.ddgl_fabu_wap_saixuan_item {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_wap_saixuan_item_a {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 14px;
  opacity: 0.5;
}

.ddgl_fabu_wap_ul {
  width: 100%;
  float: left;
}
.ddgl_fabu_wap_ul_li {
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-right: 15px;
  float: left;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
.ddgl_fabu_wap_ul_li_item {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_wap_ul_li_itemt {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_wap_ul_li_item_l {
  margin-right: auto;
  font-size: 15px;
  padding: 5px 0;
  opacity: 0.8;
}
.ddgl_fabu_wap_ul_li_item_r {
  font-size: 15px;
  margin-left: auto;
}
.ddgl_fabu_wap_ul_li_item button {
  margin-left: auto;
  margin-top: 20px;
}
</style>
<template>
  <div class="ddgl_fabu">
    <!-- PC -->
    <div class="hidden-xs-only">
      <div class="ddgl_fabu_p_head">
        <div class="ddgl_fabu_p_head_u">
          <div class="ddgl_fabu_p_head_u_q">
            {{ uinfo['quan'] }}
          </div>
          <div class="ddgl_fabu_p_head_u_c">
            <div class="ddgl_fabu_p_head_u_c_name">{{ uinfo['username'] }}</div>
            <div class="ddgl_fabu_p_head_u_c_user">{{ uinfo['user_u'] }}</div>
          </div>
        </div>
        <div class="ddgl_fabu_p_head_sxan">
          <div class="ddgl_fabu_p_head_sxan_i">
            <el-dropdown @command="saixuanpro">
              <span class="el-dropdown-link">
                {{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ALL">whole</el-dropdown-item>
                <el-dropdown-item command="USDT">USDT</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="ddgl_fabu_p_head_sxan_i">
            <el-dropdown @command="saixuantcode">
              <span class="el-dropdown-link">
                {{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? 'for sale':'purchase' }} <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ALL">whole</el-dropdown-item>
                <el-dropdown-item command="C">sell</el-dropdown-item>
                <el-dropdown-item command="M">purchase</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="ddgl_fabu_p_head_sxan_i">
            <el-dropdown @command="saixuanfli">
              <span class="el-dropdown-link">
                {{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ALL">whole</el-dropdown-item>
                <el-dropdown-item command="CNY">CNY</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>

        <!-- <div class="ddgl_fabu_p_head_fabu anniucss" @click="openfabu">Issue entrustment order</div> -->
      </div>

      <!-- 列表 -->
      <div class="ddgl_fabu_ul">
        <div class="ddgl_fabu_ul_head">
          <div class="ddgl_fabu_ul_li">
            order number
          </div>
          <div class="ddgl_fabu_ul_li">
            type
          </div>
          <div class="ddgl_fabu_ul_li">
            Order type
          </div>
          <div class="ddgl_fabu_ul_li">
            quantity
          </div>
          <div class="ddgl_fabu_ul_li">
            quota
          </div>
          <div class="ddgl_fabu_ul_li">
            Unit Price
          </div>
          <!-- <div class="ddgl_fabu_ul_li">
                        保证金余额
                    </div> -->
          <div class="ddgl_fabu_ul_li">
            User margin ratio
          </div>
          <div class="ddgl_fabu_ul_li">
            Order status
          </div>
          <div class="ddgl_fabu_ul_li">
            operation
          </div>
        </div>

        <div class="ddgl_fabu_ul_item" v-for="(li,index) in list" :key="index">
          <div class="ddgl_fabu_ul_li">
            {{ li.ddid }}
          </div>
          <div class="ddgl_fabu_ul_li">
            {{ li.pro }}
          </div>
          <div class="ddgl_fabu_ul_li">
            {{ li.Mmark }}
          </div>
          <div class="ddgl_fabu_ul_li">
            {{ li.Moa }} {{ li.pro }}
          </div>
          <div class="ddgl_fabu_ul_li">
            {{ li.zer }} - {{ li.mal }} {{ li.pro }}
          </div>
          <div class="ddgl_fabu_ul_li danjiayanse">
            {{ li.unit }} {{li.fiat}}
          </div>
          <!-- <div class="ddgl_fabu_ul_li">
                        {{ li.mar }} USDT
                    </div> -->
          <div class="ddgl_fabu_ul_li bzjyanse">
            {{ li.mar }}%
          </div>
          <div class="ddgl_fabu_ul_li bzjyanse">
            {{ li.mlive == 1 ? 'On the shelf':'Removed'  }}
          </div>
          <div class="ddgl_fabu_ul_li" style="opacity: 1;">
            <van-button plain type="info" size="small" @click="pcxiugaidd(1,index)">Modification</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- WAP -->
    <div class="hidden-sm-and-up ddgl_fabu_wapview">
      <div class="ddgl_fabu_wap_head">
        <div class="ddgl_fabu_wap_head_q">{{uinfo['quan']}}</div>
        <div class="ddgl_fabu_wap_head_u">
          <div class="ddgl_fabu_wap_head_u_name">{{ uinfo['username'] }}</div>
          <!-- <div class="ddgl_fabu_wap_head_u_msg">(78787878单/15%)</div> -->
          <div class="ddgl_fabu_wap_head_u_user">{{ uinfo['user_u'] }}</div>
        </div>
      </div>
      <div class="ddgl_fabu_wap_saixuan">
        <div class="ddgl_fabu_wap_saixuan_item">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>whole</el-dropdown-item>
              <el-dropdown-item>USDT</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="ddgl_fabu_wap_saixuan_item">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? 'for sale':'purchase' }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>whole</el-dropdown-item>
              <el-dropdown-item>sell</el-dropdown-item>
              <el-dropdown-item>purchase</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="ddgl_fabu_wap_saixuan_item">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>whole</el-dropdown-item>
              <el-dropdown-item>CNY</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 列表 -->
      <div class="ddgl_fabu_wap_ul">
        <div class="ddgl_fabu_wap_ul_li" v-for="(li,index) in list" :key="index">
          <div class="ddgl_fabu_wap_ul_li_item">
            <div class="ddgl_fabu_wap_ul_li_item_l">order number:{{ li.ddid }}</div>
            <div class="ddgl_fabu_wap_ul_li_item_r">{{ li.mlive == 1 ? 'On the shelf':'Removed' }}</div>
          </div>
          <div class="ddgl_fabu_wap_ul_li_item">
            <div class="ddgl_fabu_wap_ul_li_item_l">Type:{{ li.Mmark }}</div>
          </div>
          <div class="ddgl_fabu_wap_ul_li_item">
            <div class="ddgl_fabu_wap_ul_li_item_l">number:{{ li.Moa }} {{ li.pro }}</div>
            <div class="ddgl_fabu_wap_ul_li_item_r">Unit Price</div>
          </div>
          <div class="ddgl_fabu_wap_ul_li_item">
            <div class="ddgl_fabu_wap_ul_li_item_l">quota:{{ li.zer }} - {{ li.mal }} {{ li.pro }}</div>
            <div class="ddgl_fabu_wap_ul_li_item_r" style="color: rgb(0, 110, 255);">{{ li.unit }} {{li.fiat}}</div>
          </div>
          <div class="ddgl_fabu_wap_ul_li_item">
            <div class="ddgl_fabu_wap_ul_li_item_l">bond:{{ li.mar }}%</div>
            <van-button type="primary" @click="pcxiugaidd(2,index)">Modification</van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <el-dialog title="Modify order" :visible.sync="pcxgcode" :width="type_code == 1 ? '30%':'90%'">
      <span>
        <el-form label-width="80px" v-model="set_form">
          <el-form-item label="Order ID">
            <el-input disabled v-model="set_form.ddid"></el-input>
          </el-form-item>
          <el-form-item label="Modification type">
            <el-select v-model="set_form.tcode" placeholder="Please select the modification type">
              <el-option v-for="item in [{code:1,name:'Modify unit price'},{code:2,name:'Modified quantity'},{code:3,name:'修改订单状态'}]" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Order status" v-if="set_form.tcode == 3">
            <el-button>{{ set_form.mlive == 1 ? 'On the shelf':'Removed' }}</el-button>
          </el-form-item>
          <el-form-item label="quantity" v-if="set_form.tcode == 2">
            <el-input v-model="set_form.num"></el-input>
          </el-form-item>
          <el-form-item label="Unit price" v-if="set_form.tcode == 1">
            <el-input v-model="set_form.danjia"></el-input>
          </el-form-item>
          <el-form-item label="" v-if="set_form.tcode == 1">If the unit price is 0, it means that both parties agree!</el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xiugaiajax(1)">Cancel</el-button>
        <el-button type="primary" @click="xiugaiajax(2)">Modification {{ set_form.tcode == 1 ? 'Unit Price':set_form.tcode == 2 ? 'quantity':'' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Web3 from "web3"
import Web3Modal from "web3modal"
let Base64 = require('js-base64').Base64;
import { Toast } from 'vant';


import config from "../../../config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var huobi = {
  huobi: [],
  fabi: []
};
var harr = config['hbi'][config['key']];
var fbarr = config['fabi'][config['key']];
for (const key in harr) {
  huobi['huobi'].push({
    id: harr[key]['id'],
    key: harr[key]['key'],
    num: harr[key]['num']
  });
}
for (const key in fbarr) {
  huobi['fabi'].push({
    id: fbarr[key]['id'],
    key: fbarr[key]['key']
  });
}

//公共变量
var web3 = "";
var ethereum = window.ethereum;
var Address = '';

export default {
  //初始化WEB3
  created() {
    var dq = this;
    //监测用户是否安装MASK
    if (typeof ethereum === 'undefined') {
      alert('Please install the metamask plug-in first');
    } else {
      //初始化
      webinit();
    }
    Toast.setDefaultOptions('loading', {
      overlay: true,
      forbidClick: true,
      closeOnClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      getContainer: 'body'
    });
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
        // var wlcode = window.ethereum.networkVersion;
        // if (window.ethereum.isImToken && wlcode != 1) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        // }
        // if (window.ethereum.isMetaMask && wlcode != 4) {
        //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
        // }
        Address = provider.selectedAddress;
        dq.getuinfo(Address);
        dq.getlist();
      }
    }
  },
  data() {
    return {
      pcxgcode: false,
      type_code: 1,
      xgindex: 0,
      value1: false,
      set_form: {
        ddid: 0,
        num: 0,
        danjia: 0,
        mlive: 0,
        tcode: 0,
        obj: {}
      },


      list: [],
      list_to: [],

      uinfo: {
        quan: '',
        user: '',
        user_u: '',
        username: ''
      },

      sxarr: {
        pro: "ALL",
        fli: "ALL",
        tcode: "ALL"
      }
    }
  },
  watch: {
    'sxarr.pro'(e) {
      this.getsxlist(e, this.sxarr['fli'], this.sxarr['tcode']);
    },
    'sxarr.fli'(e) {
      this.getsxlist(this.sxarr['pro'], e, this.sxarr['tcode']);
    },
    'sxarr.tcode'(e) {
      this.getsxlist(this.sxarr['pro'], this.sxarr['fli'], e);
    }
  },
  methods: {
    openfabu() {
      this.$router.push('./');
    },
    saixuanpro(e) {
      this.sxarr.pro = e;
    },
    saixuanfli(e) {
      this.sxarr.fli = e;

    },
    saixuantcode(e) {
      this.sxarr.tcode = e;
    },
    pcxiugaidd(c, index) {
      this.pcxgcode = true;
      this.type_code = c;
      this.xgindex = index;
      this.set_form = {
        ddid: this.list[index]['ddid'],
        num: this.list[index]['Moa'],
        danjia: this.list[index]['unit'],
        mlive: this.list[index]['mlive'],
        obj: this.list[index]
      };

    },
    xiugaiajax(c) {
      var dq = this;
      if (c == 1) {
        this.pcxgcode = false;
        this.xgindex = 0;
        this.set_form = {
          ddid: 0,
          num: 0,
          danjia: 0,
          mlive: 0,
          tcode: 0,
          obj: {}
        };
      } else {
        if (this.set_form['tcode'] == 1) {
          //Unit Price 不用判断
          set_modify_unit();
        } else if (this.set_form['tcode'] == 2) {
          //quantity 需要判断
          if (dq.set_form['num'] == dq.set_form['obj']['Moa']) {
            return;
          }
          if (dq.set_form['obj']['Umark'] == '0x73616c6500000000000000000000000000000000000000000000000000000000') {
            //sell 需要判断
            getusdt(dq.set_form['obj']['pro'], dq.uinfo['user'], (ret) => {
              if (ret < (Number(dq.set_form['num']) - Number(dq.set_form['obj']['Moa']))) {
                dq.pcxgcode = false;
                Toast.fail(dq.set_form['obj']['pro'] + 'Sorry, your credit is running low!');
                return;
              } else {
                set_modify_moa();
              }
            });
          } else {
            set_modify_moa();
          }
        } else if (this.set_form['tcode'] == 3) {
          set_mlive();
        }

      }


      function getusdt(key, user, ck) {
        var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
        var key_hy = '';
        var key_num = '';
        for (let index = 0; index < huobi['huobi'].length; index++) {
          if (key == huobi['huobi'][index]['id']) {
            key_hy = huobi['huobi'][index]['hyue'];
            key_num = huobi['huobi'][index]['num'];
            break;
          }
        }
        dotsconn.methods.balancepro(user, key_hy).call((err, ret) => {
          if (ret) {
            var balancepro = Number(ret) / (10 ** key_num);
            ck(balancepro);
          }
        });
      }
      //修改订单状态
      function set_mlive() {
        dq.pcxgcode = false;
        Toast.loading({
          message: 'Modification request in progress...'
        });
        var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
        contracts.methods.cageMlive(Number(dq.set_form['obj']['ddid'])).send({
          from: dq.uinfo['user']
        }, (err, ret) => {
          Toast.clear();
          if (ret) {
            Toast.success('Modification request submitted!');
          } else {
            Toast.fail('Please click agree to authorize!');
          }
        });
      }
      //Modify unit price
      function set_modify_unit() {
        dq.pcxgcode = false;
        Toast.loading({
          message: 'Modification request in progress...'
        });
        var danjia = Number(dq.set_form['danjia']) * 100;
        console.log(danjia)
        var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
        contracts.methods.modify_unit(Number(dq.set_form['obj']['ddid']), Number(danjia)).send({
          from: dq.uinfo['user']
        }, (err, ret) => {
          Toast.clear();
          if (ret) {
            Toast.success('Modification request submitted!');
          } else {
            Toast.fail('Please click agree to authorize!');
          }
        });
      }
      //Modified quantity
      function set_modify_moa() {
        dq.pcxgcode = false;
        Toast.loading({
          message: 'Modification request in progress...'
        });
        var key_num = 0;
        var set_num = 0;
        for (let index = 0; index < huobi['huobi'].length; index++) {
          if (dq.set_form['obj']['pro'] == huobi['huobi'][index]['id']) {
            key_num = huobi['huobi'][index]['num'];
            break;
          }
        }
        var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
        if (key_num >= 18) {
          set_num = dq.getFNum(Number(dq.set_form['num']) * (10 ** key_num));
        } else {
          set_num = Number(dq.set_form['num']) * (10 ** key_num);
        }
        contracts.methods.modify_moa(Number(dq.set_form['obj']['ddid']), set_num + "").send({
          from: dq.uinfo['user']
        }, (err, ret) => {
          Toast.clear();
          if (ret) {
            Toast.success('Modification request submitted!');
          } else {
            Toast.fail('Please click agree to authorize!');
          }
        });
      }
    },
    getuinfo(Address) {
      this.uinfo['user'] = Address;
      this.uinfo['user_u'] = Address.substr(0, 5) + "...." + Address.substr(Address.length - 5, Address.length);
      var dq = this;
      var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
      contracts.methods.message(Address + "", "0").call((err, result) => {
        if (result) {
          var jiename = Base64.decode(result);
          dq.uinfo['quan'] = jiename.substr(0, 1);
          dq.uinfo['username'] = jiename;
        }
      });
    },
    getsxlist(e, e1, e2) {
      // var array = [];
      // var list = [];
      if (e == 'ALL' && e1 == "ALL" && e2 == "ALL") {
        this.list = this.list_to;
      } else {
        // var e2key = 'ALL';
        // if (e2 == 'M') {
        //     e2key = 'purchase';
        // }else if (e2 == 'C') {
        //     e2key = 'for sale';
        // }
        // this.list = this.list_to.filter(
        //     function(item) {
        //         console.log('=====');
        //         return e != "ALL" ? item['pro'] == e:'';
        //     }
        // );
        console.log('a');
      }
    },
    getlist() {
      var list = [];
      var dq = this;
      var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
      contracts.methods.ownerIssue(Address + "", 20 + "").call((err, result) => {
        if (result) {
          if (result[0].length > 0) {
            for (let index = 0; index < result[0].length; index++) {
              var h_num = 0;
              for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
                if (result[1][index][1] == huobi['huobi'][huobii]['key']) {
                  h_num = Number(huobi['huobi'][huobii]['num']);
                  break;
                }
              }
              var obj = {
                ddid: Number(result[0][index][0]),
                Moa: (Number(result[0][index][1]) / (10 ** h_num)).toFixed(2),
                zer: (Number(result[0][index][2]) / (10 ** h_num)).toFixed(2),
                mal: (Number(result[0][index][3]) / (10 ** h_num)).toFixed(2),
                unit: (Number(result[0][index][4]) / 100).toFixed(2),
                mar: (Number(result[0][index][5]) / (10 ** 4)).toFixed(2),
                mlive: Number(result[0][index][6]),

                Mmark: result[1][index][0],
                pro: result[1][index][1],
                fiat: result[1][index][2]
              };
              list.push(obj);
            }
            for (let index = 0; index < list.length; index++) {
              if (list[index]['Mmark'] == '0x73616c6500000000000000000000000000000000000000000000000000000000') {
                list[index]['Mmark'] = 'for sale';
              } else {
                list[index]['Mmark'] = 'purchase';
              }
              for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
                if (list[index]['pro'] == huobi['huobi'][huobii]['key']) {
                  list[index]['pro'] = huobi['huobi'][huobii]['id'];
                  break;
                }
              }
              for (let huobii = 0; huobii < huobi['fabi'].length; huobii++) {
                if (list[index]['fiat'] == huobi['fabi'][huobii]['key']) {
                  list[index]['fiat'] = huobi['fabi'][huobii]['id'];
                  break;
                }
              }
            }

            dq.list = list;
            dq.list_to = list;
          }
        }
      })
    },
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
  }
}
</script>