<style>
.vhtml_head {
  background-color: #000;
  width: calc(100%);
  float: left;
  color: #fff;
  height: 48px;
  padding: 0 15px;
}
.vhtml_head_left {
  width: 100%;
  float: left;
  display: flex;
  flex-direction: row;
  height: 48px;
  align-items: center;
  font-size: 14px;
}

.vhtml_head_left_logo {
  /* max-width: 150px; */
  /* margin-right: 15px; */
}
.vhtml_head_left_l {
  height: 48px;
  display: flex;
  flex-direction: row;
  margin-right: auto;
  align-items: center;
}
.vhtml_head_left_l_item {
  margin: 0 15px;
}

.vhtml_head_left_r {
  display: flex;
  align-items: center;
}

.vhtml_head_left_r_item {
  margin: 0 15px;
}

.vhtml_head_left_r_item_view {
  position: absolute;
  top: 48px;
  /* bottom: 0; */
  left: 0;
  right: 0;
  background-color: #000;
  z-index: 999;
  margin-bottom: 50px;
}
.vhtml_head_left_r_item_view_item {
  width: calc(100% - 30px);
  margin: 0 15px;
  float: left;
}
.vhtml_head_left_r_item_view_item_t {
  width: 100%;
  float: left;
  font-size: 16px;
  color: rgb(216, 213, 213);
  padding: 25px 0;
}
.vhtml_head_left_r_item_view_item_ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.vhtml_head_left_r_item_view_item_ul_li {
  height: 45px;
  display: flex;
  align-items: center;
  opacity: 0.5;
  padding-left: 15px;
}
.vhtml_head_left_r_item_view_item_ul_li.ac {
  opacity: 1;
}
.vhtml_head_left_r_item_t i {
  font-size: 18px;
}
.vhtml_head_left_l_item {
  opacity: 0.5;
}
.vhtml_head_left_l_item.ac {
  color: #fff;
  opacity: 1;
}
.el-dropdown {
  display: inline-block;
  position: relative;
  font-size: 14px;
}
.vhtml_head_left_r_item.guize {
  position: relative;
}
.vhtml_head_left_r_item.guize .vhtml_head_left_r_item_ul {
  display: none;
}
.vhtml_head_left_r_item.guize:hover .vhtml_head_left_r_item_ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  background-color: rgb(2, 2, 2);
  min-width: 150px;

  z-index: 60;
}
.vhtml_head_left_r_item_ul_li {
  padding: 5px 15px;
}
.vhtml_head_left_r_item_ul_li_ul {
  margin: 0 15px;
}
.vhtml_head_left_r_item_ul_li_ul_li {
  padding: 5px 0;
}
.vhtml_head_left_r_item_ul_li_ul_li:hover {
  color: rgba(255, 255, 255, 0.473);
}
.vhtml_head_left_r_item_ul_li.hover:hover {
  color: rgba(255, 255, 255, 0.473);
}

.ddinfodialog {
  display: flex;
  flex-direction: column;
}
.ddinfodialog_item {
  display: flex;
  padding: 5px 0;
  align-items: center;
  flex-direction: row;
}
.ddinfodialog_itemcolumn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.ddinfodialog_itemcolumn_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
}
.ddinfodialog_item_form {
  display: flex;
  margin: 5px 15px;
}

.bzj_fangan_ul {
  display: flex;
  flex-direction: column;
}
.bzj_fangan_ul_li {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
}
.bzj_fangan_ul_li span.bzj_fangan_ul_lia {
  margin-right: 5px;
  min-width: 100px;
}
.bzj_fangan_ul_li.title {
  font-size: 26px;
}
.bzj_fangan_ul_li.ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.bzj_fangan_ul_li_ul_li {
  margin: 5px 15px;
}

/* Second round of arbitration management */
.zcglul {
  display: flex;
  flex-direction: column;
}
.zcglul_li_l {
  min-width: 90px;
}
.zcglul_li {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0;
}
.zcglul_li.title {
  font-size: 20px;
  opacity: 0.7;
  padding: 5px 0;
}
.zcglul_li_r.maleftreft {
  margin: 0 1px;
}
.zcglul_li.daojishi {
  height: 70px;
  align-items: center;
  justify-content: center;
}
.zcglul_li.daojishi .zcglul_li_r {
  margin-left: 15px;
}

.zcglul_li.coll {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.zcglul_li_item {
  display: flex;
  flex-direction: row;
  margin: 5px 0;
}
.zcglul_li_r_item {
  margin: 5px 0;
}
</style>
<template>
  <div class="vhtml_head">
    <div class="vhtml_head_left">
      <van-icon @click="$router.push('/')" style="margin-top:2px" name="arrow-left" />
      <!-- <div class="vhtml_head_left_logo">GAZOTC</div> -->
      <div class="vhtml_head_left_logo" @click="openurl">
        <p> <img src="@/assets/title.png" alt="GAZOTC" width="48" height="45"></p>
      </div>
      <div class="vhtml_head_left_l">
        <div class="vhtml_head_left_l_item hidden-xs-only ac anniucss" @click="openurl">
          Official website
        </div>
        <el-dropdown @command="wlxuanze" trigger="click" class="vhtml_head_left_logo">
          <span class="el-dropdown-link anniucss" style="color: #fff">
            <span v-if="morenkey == 'huobi'">Binance Smart Chain</span>
            <span v-if="morenkey == 'huobi2'">Heco main network</span>
            <span v-if="morenkey == 'etfcshi'">Ethereum rinkeby</span>
            <span v-if="morenkey == 'etf'">Ethereum main network</span>
            <span v-if="morenkey == 'tron'">Tron main network</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="huobi">Binance Smart Chain</el-dropdown-item>
            <el-dropdown-item command="huobi">Heco main network</el-dropdown-item>
            <el-dropdown-item command="etfcshi">Ethereum rinkeby</el-dropdown-item>
            <el-dropdown-item command="etf">Ethereum main network</el-dropdown-item>
            <el-dropdown-item command="tron">Tron main network</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="vhtml_head_left_l_item hidden-xs-only ac anniucss" @click="openqb('./')">
          French currency OTC
        </div>
        <div class="vhtml_head_left_l_item hidden-xs-only ac anniucss" @click="openqb('./ccdotc')">
          Currency OTC
        </div>
      </div>
      <div class="vhtml_head_left_r">
        <div class="vhtml_head_left_r_item hidden-sm-and-down url anniucss" @click="openqb('./lqcsb')">
          Receive test currency
        </div>
        <div class="vhtml_head_left_r_item guize hidden-sm-and-down url anniucss">
          <div class="vhtml_head_left_r_item_t">rule</div>
          <div class="vhtml_head_left_r_item_ul">
            <div class="vhtml_head_left_r_item_ul_li hover" @click="openguize('./guize/jygz')">
              Transaction rules
            </div>
            <div class="vhtml_head_left_r_item_ul_li hover" @click="openguize('./guize/bzjgz')">
              Margin rules
            </div>
            <div class="vhtml_head_left_r_item_ul_li">
              <div class="vhtml_head_left_r_item_ul_li_t">arbitration rules</div>
              <div class="vhtml_head_left_r_item_ul_li_ul">
                <div class="vhtml_head_left_r_item_ul_li_ul_li" @click="openguize('./guize/zcygz')">
                  Qualification of Arbitrators
                </div>
                <div class="vhtml_head_left_r_item_ul_li_ul_li" @click="openguize('./guize/dylgz')">
                  Qualification of Arbitrators
                </div>
                <div class="vhtml_head_left_r_item_ul_li_ul_li" @click="openguize('./guize/derlgz')">
                  Second round of arbitration
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dropdown trigger="click" class="vhtml_head_left_r_item hidden-sm-and-down" @command="openqb">
          <span class="el-dropdown-link anniucss" style="color: #fff">
            arbitration <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="./zhongcai">Arbitration list</el-dropdown-item>
            <el-dropdown-item command="openbzjwin">Margin distribution</el-dropdown-item>
            <el-dropdown-item command="openbzcfanwin">Arbitration scheme</el-dropdown-item>
            <el-dropdown-item command="openzcgl">Arbitration management</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="vhtml_head_left_r_item hidden-sm-and-down url anniucss" @click="openqb('./ddguanli')">
          Order center
        </div>
        <div class="vhtml_head_left_r_item hidden-sm-and-down url anniucss" @click="openqb('./beizhu')">
          Contact information
        </div>
        <el-dropdown trigger="click" class="vhtml_head_left_r_item hidden-sm-and-down" @command="openqb">
          <span class="el-dropdown-link anniucss" style="color: #fff">
            wallet <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="./qianbao">Legal Coin Wallet</el-dropdown-item>
            <el-dropdown-item command="./ccuser">Coin Wallet</el-dropdown-item>
            <el-dropdown-item command="./simu">Lock Wallet</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div @click="$router.push('/GAZ')">Public sale</div> -->
        <div class="vhtml_head_left_r_item hidden-md-and-up" style="margin-right: 0">
          <div class="vhtml_head_left_r_item_t" @click="wapcd = wapcd ? false : true">
            <i :class="wapcd ? 'el-icon-close' : 'el-icon-s-operation'"></i>
            menu
          </div>
          <div class="vhtml_head_left_r_item_view" v-if="wapcd">
            <div class="vhtml_head_left_r_item_view_item">
              <!-- <div class="vhtml_head_left_r_item_view_item_t">网络选择</div>
              <div class="vhtml_head_left_r_item_view_item_ul">
                <div
                  class="vhtml_head_left_r_item_view_item_ul_li anniucss"
                  @click="wlxuanze('huobi')"
                >
                  火币Heco主网
                </div>
                <div
                  class="vhtml_head_left_r_item_view_item_ul_li anniucss"
                  @click="wlxuanze('etfcshi')"
                >
                  以太坊Rinkeby
                </div>
                <div
                  class="vhtml_head_left_r_item_view_item_ul_li anniucss"
                  @click="wlxuanze('暂未开放')"
                >
                  以太坊主网
                </div>
                <div
                  class="vhtml_head_left_r_item_view_item_ul_li anniucss"
                  @click="wlxuanze('暂未开放')"
                >
                  波场主网
                </div>
              </div> -->
            </div>
            <div class="vhtml_head_left_r_item_view_item">
              <div class="vhtml_head_left_r_item_view_item_t">wallet</div>
              <div class="vhtml_head_left_r_item_view_item_ul">
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./beizhu')">
                  Contact information
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./qianbao')">
                  Legal Coin Wallet
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./ccuser')">
                  Coin Wallet
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./simu')">
                  Lock Wallet
                </div>
              </div>
            </div>
            <div class="vhtml_head_left_r_item_view_item">
              <div class="vhtml_head_left_r_item_view_item_t">Trading Center</div>
              <div class="vhtml_head_left_r_item_view_item_ul">
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./lqcsb')">
                  Receive test currency
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./')">
                  French currency OTC
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./ccdotc')">
                  Currency OTC
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./ddguanli')">
                  My order
                </div>
              </div>
            </div>
            <div class="vhtml_head_left_r_item_view_item">
              <div class="vhtml_head_left_r_item_view_item_t">arbitration</div>
              <div class="vhtml_head_left_r_item_view_item_ul">
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('./zhongcai')">
                  Arbitration list
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('openbzjwin')">
                  Margin distribution
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('openbzcfanwin')">
                  Arbitration scheme
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openqb('openzcgl')">
                  Arbitration management
                </div>
              </div>
            </div>
            <div class="vhtml_head_left_r_item_view_item">
              <div class="vhtml_head_left_r_item_view_item_t">rule</div>
              <div class="vhtml_head_left_r_item_view_item_ul">
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openguize('./guize/jygz')">
                  Transaction rules
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openguize('./guize/bzjgz')">
                  Margin rules
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openguize('./guize/zcygz')">
                  Qualification of Arbitrators
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openguize('./guize/dylgz')">
                  Qualification of Arbitrators
                </div>
                <div class="vhtml_head_left_r_item_view_item_ul_li anniucss" @click="openguize('./guize/derlgz')">
                  Second round of arbitration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保证金分配弹框 -->
    <el-dialog title="Margin distribution" :visible.sync="bzj_t.code" width=350px>
      <span v-if="bzj_t['ddinfo']['code']">
        <el-input v-model="bzj_t['ddid']" placeholder="Please enter the order number"></el-input>
      </span>
      <div v-if="!bzj_t['ddinfo']['code']" class="ddinfodialog">
        <div class="ddinfodialog_item">account number:{{ bzj_t.ddinfo.user }}</div>
        <div class="ddinfodialog_item">order number:{{ bzj_t.ddid }}</div>
        <div class="ddinfodialog_item">
          My role:{{ bzj_t["ddinfo"]["juese"] }}
        </div>
        <div class="ddinfodialog_itemcolumn">
          <div class="ddinfodialog_itemcolumn_item" style="padding: 0 0">
            Order details:<el-button type="text" @click="
                bzj_t['ddinfo_code'] = bzj_t['ddinfo_code'] ? false : true
              ">{{ bzj_t["ddinfo_code"] ? "shrink" : "Deployment details" }}</el-button>
          </div>
          <div class="ddinfodialog_itemcolumn_item" v-if="bzj_t['ddinfo_code']">
            Merchant address:{{ bzj_t["ddinfo"]["mad"] }}
          </div>
          <div class="ddinfodialog_itemcolumn_item" v-if="bzj_t['ddinfo_code']">
            User address:{{ bzj_t["ddinfo"]["uad"] }}
          </div>
          <div class="ddinfodialog_itemcolumn_item" v-if="bzj_t['ddinfo_code']">
            Merchant deposit:{{ bzj_t["ddinfo"]["mma"].toFixed(2) }}
            usdt
          </div>
          <div class="ddinfodialog_itemcolumn_item" v-if="bzj_t['ddinfo_code']">
            User deposit:{{ bzj_t["ddinfo"]["uma"].toFixed(2) }}
            usdt
          </div>
          <div class="ddinfodialog_itemcolumn_item" v-if="bzj_t['ddinfo_code']">
            Number of transactions:{{ bzj_t["ddinfo"]["uoa"].toFixed(2) }}
            {{ bzj_t["ddinfo"]["pro"] }}
          </div>
        </div>
        <div class="ddinfodialog_itemcolumn">
          Merchant deposit:

          <div class="ddinfodialog_item_form">
            <el-select v-model="bzj_t['bzjcode']" placeholder="Please select" size="small">
              <el-option v-for="item in [
                  { value: 2, label: 'increase' },
                  { value: 1, label: 'reduce' },
                ]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input size="small" v-model="bzj_t['bzjnum']" placeholder="Please enter" style="padding-left: 15px"></el-input>
          </div>
        </div>
        <div class="ddinfodialog_item" v-if="bzj_t['ddinfo']['juese'] != 'other'">
          My settings:<span v-if="bzj_t['ddinfo']['juese'] == 'user'">
            {{
              bzj_t["ddinfo"]["uwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["uwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["usz"].toFixed(2) }}
            usdt
          </span>
          <span v-if="bzj_t['ddinfo']['juese'] == 'business'">{{
              bzj_t["ddinfo"]["mwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["mwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["msz"].toFixed(2) }}
            usdt
          </span>
        </div>
        <div class="ddinfodialog_item" v-if="bzj_t['ddinfo']['juese'] == 'other'">
          User settings:<span v-if="bzj_t['ddinfo']['juese'] == 'other'">
            {{
              bzj_t["ddinfo"]["uwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["uwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["usz"].toFixed(2) }}
            usdt
          </span>
        </div>
        <div class="ddinfodialog_item" v-if="bzj_t['ddinfo']['juese'] == 'business'">
          User settings:<span>{{
              bzj_t["ddinfo"]["uwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["uwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["usz"].toFixed(2) }}
            usdt
          </span>
          <el-button :loading="loading" type="text" style="margin-left: 5px" v-if="bzj_t['ddinfo']['uwho'] != 0" @click="zhixing_shezhi">Execute user settings</el-button>
        </div>
        <div class="ddinfodialog_item" v-if="bzj_t['ddinfo']['juese'] == 'user'">
          Merchant settings:<span>{{
              bzj_t["ddinfo"]["mwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["mwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["msz"].toFixed(2) }}
            usdt
          </span>
          <el-button :loading="loading" type="text" style="margin-left: 5px" v-if="bzj_t['ddinfo']['mwho'] != 0" @click="zhixing_shezhi">Execute merchant settings</el-button>
        </div>
        <div class="ddinfodialog_item" v-if="bzj_t['ddinfo']['juese'] == 'other'">
          Merchant settings:<span>{{
              bzj_t["ddinfo"]["mwho"] == 1
                ? "Add user"
                : bzj_t["ddinfo"]["mwho"] == 2
                ? "Reduce users"
                : "(not set)"
            }}
            {{ bzj_t["ddinfo"]["msz"].toFixed(2) }}
            usdt
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bzj_t.code = false">cancel</el-button>
        <el-button v-if="!bzj_t.ddinfo.code" @click="bzj_t.ddid = null">Back to previous step</el-button>
        <el-button type="primary" @click="ddinfoajax" v-if="bzj_t['ddinfo']['code']" :loading="loading">set up</el-button>
        <el-button type="primary" v-if="!bzj_t['ddinfo']['code']" :loading="loading" @click="ddcodeajax">Submit</el-button>
      </span>
    </el-dialog>

    <!-- 设置仲裁方案 -->
    <el-dialog title="Second round arbitration scheme" :visible.sync="bzj_fangan.code" width=350px>
      <span v-if="!bzj_fangan.data.code">
        <el-input v-model="bzj_fangan['ddid']" placeholder="Please enter the order number"></el-input>
      </span>

      <div v-if="bzj_fangan.data.code" class="bzj_fangan_ul">
        <div class="bzj_fangan_ul_li">
          My Account:{{ bzj_fangan.data["myuser"].substring(0, 8) }} ....
        </div>
        <div class="bzj_fangan_ul_li">
          My nickname:{{ bzj_fangan.data["myname"] }}
        </div>
        <div class="bzj_fangan_ul_li">order number:{{ bzj_fangan.ddid }}</div>
        <div class="bzj_fangan_ul_li ul">
          <div class="bzj_fangan_ul_li_ul">Order details:</div>
          <div class="bzj_fangan_ul_li_ul_li">
            Merchant address:{{ bzj_fangan.data["mad"].substring(0, 8) }} ....
          </div>
          <div class="bzj_fangan_ul_li_ul_li">
            User address:{{ bzj_fangan.data["uad"].substring(0, 8) }} ....
          </div>
          <div class="bzj_fangan_ul_li_ul_li">
            Number of transactions:{{ bzj_fangan.data["uoa"].toFixed(2) }}
            {{ bzj_fangan.data["pro"] }}
          </div>
          <div class="bzj_fangan_ul_li_ul_li">
            Merchant deposit:{{ bzj_fangan.data["mma"].toFixed(2) }} USDT
          </div>
          <div class="bzj_fangan_ul_li_ul_li">
            User certificate fee:{{ bzj_fangan.data["uma"].toFixed(2) }} USDT
          </div>
        </div>
        <div class="bzj_fangan_ul_li title">Arbitration scheme</div>

        <div class="bzj_fangan_ul_li">
          <span class="bzj_fangan_ul_lia">Asset ownership:</span>
          <el-radio v-model="bzj_fangan.from.who" label="1">business</el-radio>
          <el-radio v-model="bzj_fangan.from.who" label="2">user</el-radio>
          <el-radio v-model="bzj_fangan.from.who" label="0">Released</el-radio>
        </div>
        <div class="bzj_fangan_ul_li">
          <span class="bzj_fangan_ul_lia">bond:</span>
          <el-select size="mini" placeholder="Please select" v-model="bzj_fangan.from.bzjt">
            <el-option v-for="item in [
                { label: 'business', value: '1' },
                { label: 'user', value: '2' },
              ]" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select size="mini" placeholder="Please select" style="margin-left: 5px" v-model="bzj_fangan.from.bzjtb">
            <el-option v-for="item in [
                { label: 'increase', value: '1' },
                { label: 'reduce', value: '2' },
              ]" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input size="mini" placeholder="Please enter" style="margin-left: 5px" v-model="bzj_fangan.from.bzjnum">
            <template slot="append">USDT</template>
          </el-input>
        </div>
        <div class="bzj_fangan_ul_li">
          <span class="bzj_fangan_ul_lia">User Arbitrator:</span>
          <el-input size="mini" placeholder="Please enter" v-model="bzj_fangan.from.sjzcy">
            <template slot="append">GAZ</template>
          </el-input>
        </div>
        <div class="bzj_fangan_ul_li">
          <span class="bzj_fangan_ul_lia">Merchant Arbitrator:</span>
          <el-input size="mini" placeholder="Please enter" v-model="bzj_fangan.from.yhzcy">
            <template slot="append">GAZ</template>
          </el-input>
        </div>
        <div class="bzj_fangan_ul_li">
          <span class="bzj_fangan_ul_lia">Second round arbitration fee:</span>
          <el-input size="mini" placeholder="Please enter fee" v-model="bzj_fangan.from.zcfeiyong">
            <template slot="append">GAZ</template>
          </el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="bzj_fangan.code = false">cancel</el-button>
        <el-button type="primary" @click="ddinfoajax_fan" :loading="bzj_fangan.loading" v-if="!bzj_fangan.data.code">set up</el-button>
        <el-button plain v-if="bzj_fangan.data.code" @click="backsyb">Back to previous step</el-button>
        <el-button type="primary" :loading="bzj_fangan.loading" v-if="bzj_fangan.data.code" @click="schemeajax">set up</el-button>
      </span>
    </el-dialog>
    <!-- Second round of arbitration management -->
    <el-dialog title="Second round of arbitration management" :visible.sync="zcgldata.code" width=350px>
      <span v-if="!zcgldata.tcode">
        <el-input v-model="zcgldata.ddid" placeholder="Please enter the order number"></el-input>
      </span>
      <div v-if="zcgldata.tcode" class="zcglul">
        <div class="zcglul_li">
          <div class="zcglul_li_l">My account number:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['myuser'].substring(0,7) }}....</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">My nickname:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['myname'] }}</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">My role:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['myjuese'] }}</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">order number:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['ddid'] }}</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">Order details:</div>
          <div class="zcglul_li_r list">
            <div class="zcglul_li_r_item">
              Merchant address:{{ zcgldata['info']['ddinfo']['mad'].substring(0,7) }}....
            </div>
            <div class="zcglul_li_r_item">
              User address:{{ zcgldata['info']['ddinfo']['uad'].substring(0,7) }}....
            </div>
            <div class="zcglul_li_r_item">
              Number of transactions:{{ zcgldata['info']['ddinfo']['uoa'] }} {{ zcgldata['info']['ddinfo']['pro'] }}
            </div>
            <div class="zcglul_li_r_item">
              Merchant deposit:{{ zcgldata['info']['ddinfo']['mma']  }} USDT
            </div>
            <div class="zcglul_li_r_item">
              User deposit:{{ zcgldata['info']['ddinfo']['uma'] }} USDT
            </div>
          </div>
        </div>
        <div class="zcglul_li title">Arbitration scheme</div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">No.:</div>
          <div class="zcglul_li_r maleftreft">
            <div>
              <el-select v-model="zcgldata.faid" placeholder="Please select" size="mini">
                <el-option v-for="item in zcgldata['bhnum']" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <el-button type="text" style="margin-left: 5px;" @click="openqb('openbzcfanwin')"><i class="el-icon-circle-plus-outline"></i> newly build</el-button>
            </div>
            <div style="margin-top: 5px;">Number of votes {{ !zcgldata['info']['tpjdu']?0:zcgldata['info']['tpjdu'] }}/5</div>
          </div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">Asset ownership:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['zcguishu'] }}</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">bond:</div>
          <div class="zcglul_li_r">({{ zcgldata['info']['who'] == 1 ? `Deduct the merchant's deposit`: `Deduct user's deposit` }}) <br> {{ zcgldata['info']['bzjnum'] }} USDT</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">Merchant Arbitrator:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['sjnum'] }} GAZ</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">User Arbitrator:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['yhnum'] }} GAZ</div>
        </div>
        <div class="zcglul_li">
          <div class="zcglul_li_l">Second round arbitration fee:</div>
          <div class="zcglul_li_r">{{ zcgldata['info']['delnum'] }} GAZ</div>
        </div>
        <div class="zcglul_li daojishi">
          <div class="zcglul_li_l">Vote countdown</div>
          <div class="zcglul_li_r">
            <van-count-down :time="zcgldata['info'].djsval" format="DD day HH hour mm minute ss second" />
          </div>
        </div>
        <div class="zcglul_li coll">
          <div class="zcglul_li_item">
            <van-button type="danger" :loading="zcgldata['loading']" @click="qxtoupiao">Cancel</van-button>
            <van-button type="primary" style="margin-left: 10px;" @click="toupiaoajax" :loading="zcgldata.loading">Vote</van-button>
          </div>
          <div class="zcglul_li_item">
            <van-button type="info" :loading="zcgldata.loading" @click="jieshoutoupiao">Accept</van-button>
            <van-button type="default" style="margin-left: 10px;" :loading="zcgldata.loading">revoke</van-button>
          </div>
          <div class="zcglul_li_item">
            <van-button type="info" :loading="zcgldata.loading" @click="executeajax">Execute</van-button>
            <van-button type="default" style="margin-left: 10px;" :loading="zcgldata.loading" @click="restartlArbajax">Restart</van-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!zcgldata.tcode" @click="getzcinfoajax" :loading="zcgldata.loading">set up</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Base64 } from "js-base64";
import Web3 from "web3";
import Web3Modal from "web3modal";
import config from "../config";
//全局变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;
var webtrue = false;
var ArbOne, Dotc, ArbTwo, Arbdate;
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];


export default {
  data() {
    return {
      morenkey: localStorage.morenkey ? localStorage.morenkey : 'huobi',
      loading: false,
      wapcd: false,

      bzj_t: {
        code: false,
        ddid: "",
        ddinfo_code: false,
        bzjcode: 1,
        bzjnum: null,
        ddinfo: {
          code: true,
          user: "",
          juese: "",
          uad: "",
          mad: "",
          uma: "",
          mma: "",
          uoa: "",
          pro: "",
          mark: "",
          what: "",

          dataobj: {},
          uwho: 0,
          mwho: 0,

          usz: 0,
          msz: 0,
        },
      },

      //bzj_fangan.from.who
      bzj_fangan: {
        loading: false,
        ddid: "",
        code: false,

        data: {
          code: false,
        },

        from: {
          who: "",
          bzjt: "1",
          bzjtb: "1",
          bzjnum: null,
          sjzcy: null,
          yhzcy: null,
          zcfeiyong: null,
        },
      },

      zcgldata: {
        loading: false,
        code: false,
        tcode: false,
        faid: 1,
        bhnum: 0,
        ddid: 0,
        arbs: {},
        info: {
          myuser: '',
          myname: '',
          myjuese: '',
          ddid: '',
          ddinfo: {
            uad: '',
            mad: '',
            pro: '',
            mma: '',
            uma: '',
            uoa: ''
          },
          tpjdu: 0,
          zcguishu: '',
          bzjnum: 0,
          who: 0,
          sjnum: 0,
          yhnum: 0,
          delnum: 0,
          djsval: 0
        }
      }
    };
  },
  watch: {
    "bzj_t.ddid"(e) {
      if (!e) {
        this.bzj_t.ddid = null;
        this.bzj_t.ddinfo_code = false;
        (this.bzj_t.bzjcode = 1),
          (this.bzj_t.bzjnum = null),
          (this.bzj_t.ddinfo = {
            code: true,
            user: "",
            juese: "",
            uad: "",
            mad: "",
            uma: "",
            mma: "",
            uoa: "",
            pro: "",
            mark: "",
            what: "",

            dataobj: {},
            uwho: null,
            mwho: null,

            usz: 0,
            msz: 0,
          });
      }
    },
    'zcgldata.faid'(e) {
      //获取投票结果
      ArbTwo.methods.weight(this.zcgldata.ddid, this.zcgldata.arbs['timc'], e).call((err, ret) => {
        if (ret) {
          this.zcgldata['info']['tpjdu'] = Number(ret);
        }
      });
      var dq = this;
      ArbTwo.methods.slates(dq.zcgldata.ddid, dq.zcgldata['faid']).call((err, ret) => {
        if (ret) {
          if (ret['arb'] == 1) dq.zcgldata.info['zcguishu'] = 'business';
          if (ret['arb'] == 2) dq.zcgldata.info['zcguishu'] = 'user';
          if (ret['arb'] == 0) dq.zcgldata.info['zcguishu'] = 'Released';
          dq.zcgldata.info['who'] = ret['who'];
          dq.zcgldata.info['bzjnum'] = ret['comp'] / 10 ** bzj_num;
          dq.zcgldata.info['delnum'] = Number(ret['fees']) / (10 ** bzj_num);
        }
      });
      ArbTwo.methods.slat(dq.zcgldata.ddid, dq.zcgldata['faid'], 3).call((err, ret) => {
        if (ret) {
          dq.zcgldata.info.sjnum = Number(ret) / (10 ** bzj_num);
        }
      });
      ArbTwo.methods.slat(dq.zcgldata.ddid, dq.zcgldata['faid'], 2).call((err, ret) => {
        if (ret) {
          dq.zcgldata.info.yhnum = Number(ret) / (10 ** bzj_num);
        }
      });
    }
  },
  mounted() {
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      web3 = new Web3(config['hyue'][config['key']]['Url']);
    } else {
      webtrue = true;
      //初始化
      webinit();
    }
    // var dq = this;
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
      console.log('121212121', provider)
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
        console.log(config)
        console.log(config["hyue"][config["key"]]["ArbOne"]["heyue"])
        ArbOne = new web3.eth.Contract(
          config["hyue"][config["key"]]["ArbOne"]["abi"],
          config["hyue"][config["key"]]["ArbOne"]["heyue"]
        );
        ArbTwo = new web3.eth.Contract(
          config["hyue"][config["key"]]["arbTwo"]["abi"],
          config["hyue"][config["key"]]["arbTwo"]["heyue"]
        );
        Dotc = new web3.eth.Contract(
          config["hyue"][config["key"]]["dotc"]["abi"],
          config["hyue"][config["key"]]["dotc"]["heyue"]
        );
        Arbdate = new web3.eth.Contract(
          config["hyue"][config["key"]]["Arbdate"]["abi"],
          config["hyue"][config["key"]]["Arbdate"]["heyue"]
        );
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
    wlxuanze(e) {
      this.wapcd = false;
      if (e == 'etfcshi' || e == 'huobi') {
        localStorage.morenkey = e;
        location.reload();
      } else {
        localStorage.morenkey = 'etfcshi';
        alert('Not yet open');
      }

    },
    openqb(e) {
      this.wapcd = false;
      if (e == "./qianbao") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./ccuser") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./simu") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./chongzhi") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./tixian") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./ddguanli") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./beizhu") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./lqcsb") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "./zhongcai") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not installed",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      if (e == "openbzjwin") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
        this.bzj_t.code = true;
        return;
      }
      if (e == "openbzcfanwin") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
        this.bzj_fangan.code = true;
        return;
      }
      if (e == "openzcgl") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
        this.zcgldata['code'] = true;
        return;
      }
      if (e == "ccdotc") {
        if (!webtrue) {
          this.$notify.error({
            title: "Wallet not connected",
            duration: 2000,
            message: "The system detects that you have not installed wallet plug-in!",
          });
          return;
        }
      }
      this.$router.push(e);
    },
    openurl() {
      // window.open("https://gazelle.fi");
      window.open("https://gazotc.com");
    },

    openguize(e) {
      this.wapcd = false;
      this.$router.push(e);
    },

    //查询Order details 没有请先初始化
    async ddinfoajax() {
      var dq = this;
      this.loading = true;
      var ddinfo = await ArbOne.methods.user(this.bzj_t.ddid).call();
      if (
        ddinfo["mark"] ==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        //先查询订单是否存
        var ddis = await Dotc.methods.users(this.bzj_t.ddid).call();
        if (ddis["iorder"] == 0) {
          dq.loading = false;
          dq.$message({
            message: "Order does not exist",
            type: "warning",
          });
          return;
        }
        if (
          ddis["Uadd"].toLowerCase() == address.toLowerCase() ||
          ddis["Madd"].toLowerCase() == address.toLowerCase()
        ) {
          ArbOne.methods.init(this.bzj_t.ddid).send(
            {
              from: address,
            },
            (err, ret) => {
              if (ret) {
                chushihinit();
              } else {
                dq.loading = false;
                dq.$message({
                  message: "Please agree to the authorization",
                  type: "warning",
                });
              }
            }
          );
        } else {
          this.loading = false;
          this.$message.error("Please enter the correct order!");
        }
      } else {
        if (
          ddinfo["mad"].toLowerCase() == address.toLowerCase() ||
          ddinfo["uad"].toLowerCase() == address.toLowerCase()
        ) {
          //有数据
          ddinfodata(ddinfo);
        } else {
          ddinfodata(ddinfo);
          // this.loading = false;
          // this.$message.error("Please enter the correct order!");
        }
      }

      //轮询查询
      function chushihinit() {
        ArbOne.methods.user(dq.bzj_t.ddid).call((err, ret) => {
          if (ret) {
            if (
              ret["mark"] !=
              "0x0000000000000000000000000000000000000000000000000000000000000000"
            ) {
              ddinfodata(ret);
            } else {
              setTimeout(() => {
                chushihinit();
              }, 3000);
            }
          }
        });
      }

      async function ddinfodata(ret) {
        var bzjnum = config["hyue"][config["key"]]["Bzj"]["num"];
        var hbarr = config["hbi"][config["key"]];
        var pro = "";
        var pro_num = "";
        for (const key in hbarr) {
          if (hbarr[key]["key"] == ret["pro"]) {
            pro = hbarr[key]["id"];
            pro_num = hbarr[key]["num"];
            break;
          }
        }
        var juese;
        //判断我的角色
        if (ret["mad"].toLowerCase() == address.toLowerCase()) {
          juese = "business";
        } else if (ret["uad"].toLowerCase() == address.toLowerCase()) {
          juese = "user";
        } else {
          juese = "other";
        }
        dq.bzj_t["ddinfo"]["code"] = false;
        dq.bzj_t["ddinfo"]["mad"] = ret["mad"].slice(0, 8) + ".....";
        dq.bzj_t["ddinfo"]["mark"] = ret["mark"];
        dq.bzj_t["ddinfo"]["mma"] = Number(ret["mma"]) / 10 ** bzjnum;
        dq.bzj_t["ddinfo"]["pro"] = pro;
        dq.bzj_t["ddinfo"]["uad"] = ret["uad"].slice(0, 8) + ".....";
        dq.bzj_t["ddinfo"]["uma"] = Number(ret["uma"]) / 10 ** bzjnum;
        dq.bzj_t["ddinfo"]["uoa"] = Number(ret["uoa"]) / 10 ** pro_num;
        dq.bzj_t["ddinfo"]["what"] = ret["what"];
        dq.bzj_t["ddinfo"]["juese"] = juese;
        dq.bzj_t["ddinfo"]["user"] = address.slice(0, 8) + ".....";
        //获取我的设置  商家的设置
        var usz = await ArbOne.methods.comp(dq.bzj_t.ddid, ret["uad"]).call();
        var msz = await ArbOne.methods.comp(dq.bzj_t.ddid, ret["mad"]).call();
        var uwho = await ArbOne.methods.who(dq.bzj_t.ddid, ret["uad"]).call();
        var mwho = await ArbOne.methods.who(dq.bzj_t.ddid, ret["mad"]).call();
        dq.bzj_t["ddinfo"]["usz"] = Number(usz) / 10 ** bzjnum;
        dq.bzj_t["ddinfo"]["msz"] = Number(msz) / 10 ** bzjnum;
        dq.bzj_t["ddinfo"]["uwho"] = uwho;
        dq.bzj_t["ddinfo"]["mwho"] = mwho;
        dq.bzj_t["ddinfo"]["dataobj"] = ret;
        dq.loading = false;
      }
    },

    //修改
    async ddcodeajax() {
      var dq = this;
      this.loading = true;
      //需要检测相关数据
      var arb = await ArbOne.methods.arb(this.bzj_t.ddid, 2).call();
      var comp = await ArbOne.methods.comp(this.bzj_t.ddid, address).call();
      if (Number(arb) == 0 && Number(comp) == 0) {
        //判断保证金是否足够
        if (
          this.bzj_t["ddinfo"]["juese"] == "user" ||
          this.bzj_t["ddinfo"]["juese"] == "business"
        ) {
          console.log(667788)
          console.log(Number(this.bzj_t.bzjnum))
          console.log(Number(this.bzj_t["ddinfo"]["uma"]))
          console.log(this.bzj_t.bzjcode)
          if (this.bzj_t.bzjcode == 1) {
            if (Number(this.bzj_t.bzjnum) <= Number(this.bzj_t["ddinfo"]["mma"])) {
              setbzj();
            } else {
              this.loading = false;
              this.$message.error("The decrease of merchant margin cannot be greater than the amount of merchant margin");
            }
          } else {
            console.log(6677899)
            if (Number(this.bzj_t.bzjnum) <= Number(this.bzj_t["ddinfo"]["uma"])) {
              setbzj();
            } else {
              this.loading = false;
              this.$message.error("The merchant's increased margin cannot be greater than the user's margin");
            }
          }
        } else {
          this.loading = false;
          this.$message.error("Inoperable");
        }
      } else {
        if (Number(arb) != 0) {
          this.loading = false;
          this.$message.error("Arbitration has ended, cannot be set!");
          return;
        }
        this.loading = false;
        this.$message.error("Setting cannot be repeated!");
      }

      function setbzj() {
        //保证金倍数
        var bzjnum = config["hyue"][config["key"]]["Bzj"]["num"];
        var bzjnnn = dq.bzj_t.bzjnum * 10 ** bzjnum;
        ArbOne.methods.setComp(dq.bzj_t.ddid, dq.getFNum(dq.bzj_t.bzjcode), dq.getFNum(bzjnnn)).send(
          {
            from: address,
          },
          (err, ret) => {
            dq.loading = false;
            if (ret) {
              dq.$message({
                message: "Submitted modification!",
                type: "success",
              });
            } else {
              dq.$message.error("Please agree to the authorization");
            }
          }
        );
      }
    },

    //执行用户商家设置
    async zhixing_shezhi() {
      this.loading = true;
      var dq = this;
      //agreement
      if (this.bzj_t["ddinfo"]["juese"] == "user") {
        //检测商家是否设置
        var mad = this.bzj_t["ddinfo"]["dataobj"]["mad"];
        var uis = await ArbOne.methods.who(this.bzj_t.ddid, mad).call();
        if (uis == 0) {
          this.loading = false;
          this.$message.error("The merchant has not been set");
          return;
        } else {
          //执行
          zhixingajax();
        }
      } else if (this.bzj_t["ddinfo"]["juese"] == "business") {
        var uad = this.bzj_t["ddinfo"]["dataobj"]["uad"];
        var uibsb = await ArbOne.methods.who(this.bzj_t.ddid, uad).call();
        if (uibsb == 0) {
          this.loading = false;
          this.$message.error("User not set");
          return;
        } else {
          //执行
          zhixingajax();
        }
      } else {
        this.loading = false;
        this.$message.error("Inoperable!");
      }

      function zhixingajax() {
        dq.loading = true;
        ArbOne.methods.agreement(dq.bzj_t.ddid).send(
          {
            from: address,
          },
          (err, ret) => {
            dq.loading = false;
            if (ret) {
              dq.$message({
                message: "Submitted modification!",
                type: "success",
              });
            } else {
              dq.$message.error("Please agree to the authorization");
            }
          }
        );
      }
    },

    //方案操作
    async ddinfoajax_fan() {
      var dq = this;
      dq.bzj_fangan.loading = true;
      dq.bzj_fangan.data.code = false;
      var ddinfo = await ArbOne.methods.user(dq.bzj_fangan.ddid).call();
      if (
        ddinfo["mark"] ==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        //初始化
        var ddis = await Dotc.methods.users(this.bzj_fangan.ddid).call();
        if (ddis["iorder"] == 0) {
          dq.bzj_fangan.loading = false;
          dq.$message({
            message: "Order does not exist",
            type: "warning",
          });
          return;
        }
        initlx();
      } else {
        //组装数据
        setobj(ddinfo);
      }

      //轮询查询是否初始化成功
      function initlx() {
        ArbOne.methods.user(dq.bzj_fangan.ddid).call((err, ret) => {
          if (ret) {
            if (
              ret["mark"] !=
              "0x0000000000000000000000000000000000000000000000000000000000000000"
            ) {
              setobj(ret);
            } else {
              setTimeout(() => {
                initlx();
              }, 3000);
            }
          } else {
            dq.bzj_fangan.loading = false;
            dq.$message({
              message: "Please click agree!",
              type: "warning",
            });
          }
        });
      }

      //组装数据
      async function setobj(data) {
        var bzjnum = config["hyue"][config["key"]]["Bzj"]["num"];
        var pro = {
          num: 0,
          pro: "",
        };
        var hbarr = config["hbi"][config["key"]];
        for (const key in hbarr) {
          if (data.pro == hbarr[key]["key"]) {
            pro.num = hbarr[key]["num"];
            pro.pro = hbarr[key]["id"];
            break;
          }
        }
        var username = await ArbOne.methods.message(address, "0").call();
        dq.bzj_fangan.loading = false;
        dq.bzj_fangan.data.code = true;
        data.uma = Number(data.uma) / 10 ** bzjnum;
        data.mma = Number(data.mma) / 10 ** bzjnum;
        data.uoa = Number(data.uoa) / 10 ** pro.num;
        data.pro = pro.pro;
        data.myuser = address;
        data.myname = username ? Base64.decode(username) : "Not set yet";
        for (const key in data) {
          dq.bzj_fangan.data[key] = data[key];
        }
      }
    },
    //提交方案
    async schemeajax() {
      var dq = this;
      dq.bzj_fangan.loading = true;
      // 分配的数量之和必须等于交易双方及第一轮仲裁费之和
      var _who = 1;
      if (
        this.bzj_fangan["from"]["bzjt"] == 1 &&
        this.bzj_fangan["from"]["bzjtb"] == 1
      ) {
        _who = 2;
      } else if (
        this.bzj_fangan["from"]["bzjt"] == 1 &&
        this.bzj_fangan["from"]["bzjtb"] == 2
      ) {
        _who = 1;
      } else if (
        this.bzj_fangan["from"]["bzjt"] == 2 &&
        this.bzj_fangan["from"]["bzjtb"] == 1
      ) {
        _who = 1;
      } else if (
        this.bzj_fangan["from"]["bzjt"] == 2 &&
        this.bzj_fangan["from"]["bzjtb"] == 2
      ) {
        _who = 2;
      }
      var meg = await ArbTwo.methods.meg().call();
      var arat = await ArbTwo.methods.arat().call();
      var arbs = await ArbTwo.methods.arbs(this.bzj_fangan["ddid"]).call();
      var user = await ArbTwo.methods.user(this.bzj_fangan["ddid"]).call();
      var arm = Number(arbs.arm);
      var mma = Number(user.mma);
      var uma = Number(user.uma);
      var tol =
        Number(this.bzj_fangan.from.sjzcy) * 10 ** bzj_num +
        Number(this.bzj_fangan.from.yhzcy) * 10 ** bzj_num;
      if (
        add(tol, mul(Number(this.bzj_fangan.from.zcfeiyong) * 10 ** bzj_num, meg)) ==
        mul(add(arm, mma), 2)
      ) {
        var numbbbbb = Number(this.bzj_fangan.from.bzjnum) * 10 ** bzj_num;
        //第二轮仲裁员分配的仲裁费必须低于最高比例
        if (
          mul(Number(this.bzj_fangan.from.zcfeiyong) * 10 ** bzj_num, 10 ** 6) <=
          mul(mma, Number(arat))
        ) {
          //设置保证金调整方案,@_who == 1 扣除商家的保证金,@_who == 2 扣除用户的保证金,
          if (_who == 1) {
            if (numbbbbb <= mma) {
              getfanan();
            } else {
              dq.bzj_fangan.loading = false;
              this.$message.error("The set amount cannot be greater than the merchant deposit amount!");
            }
          } else {
            if (numbbbbb <= uma) {
              getfanan();
            } else {
              dq.bzj_fangan.loading = false;
              this.$message.error("The set amount cannot be greater than the user deposit amount!");
            }
          }
        } else {
          dq.bzj_fangan.loading = false;
          this.$message.error("This scenario setting failed");
        }
      } else {
        dq.bzj_fangan.loading = false;
        this.$message.error("This scenario setting failed");
      }

      //提交本次设置方案
      async function getfanan() {
        var numbbbbb = dq.getFNum(dq.bzj_fangan.from.bzjnum * 10 ** 12 * 10 ** 6);
        var zcfeiyong = dq.getFNum(dq.bzj_fangan.from.zcfeiyong * 10 ** 12 * 10 ** 6);
        var sjzcy = dq.getFNum(dq.bzj_fangan.from.sjzcy * 10 ** 12 * 10 ** 6);
        var yhzcy = dq.getFNum(dq.bzj_fangan.from.yhzcy * 10 ** 12 * 10 ** 6);
        var array = new Array(4);
        array[0] = 0;
        array[1] = 0;
        array[2] = sjzcy;
        array[3] = yhzcy;
        //查询编号是否存在
        var shasing = await Arbdate.methods
          .scheme(
            dq.bzj_fangan["ddid"],
            dq.bzj_fangan.from.who + "",
            _who + "",
            numbbbbb + "",
            array,
            zcfeiyong + ""
          )
          .call();
        var isfanan = await ArbTwo.methods.plan(shasing).call();
        if (isfanan != 0) {
          dq.bzj_fangan.loading = false;
          dq.$message.error("Hello, this scheme already exists!, Scheme number is {isfanan}");
          return;
        }
        ArbTwo.methods
          .scheme(
            dq.bzj_fangan["ddid"],
            dq.bzj_fangan.from.who + "",
            _who + "",
            numbbbbb + "",
            array,
            zcfeiyong + ""
          )
          .send({ from: address }, (err, ret) => {
            if (ret) {
              dq.bzj_fangan.loading = false;
              dq.$message({
                message: "Proposal submitted",
                type: "success",
              });
            } else {
              dq.bzj_fangan.loading = false;
              dq.$message.error("Please click agree!");
            }
          });
      }

      function mul(z, y) {
        return z * y;
      }
      function add(z, y) {
        return z + y;
      }
    },
    //方案点击回退上一步
    backsyb() {
      this.bzj_fangan = {
        loading: false,
        ddid: this.bzj_fangan.ddid,
        code: true,

        data: {
          code: false,
        },

        from: {
          who: "",
          bzjt: "1",
          bzjtb: "1",
          bzjnum: null,
          sjzcy: null,
          yhzcy: null,
          zcfeiyong: null,
        },
      };
    },

    //仲裁方案查询 订单信息 方案列表 投票结果 资产归属信息
    async getzcinfoajax() {
      if (!this.zcgldata.ddid || this.zcgldata == 0) {
        this.$message.error('Please enter the order number!');
        return;
      }
      var dq = this;
      var data = dq.zcgldata;
      dq.zcgldata.loading = true;
      //查询订单信息
      var ddinfo = await ArbOne.methods.user(this.zcgldata.ddid).call();
      if (ddinfo['mark'] == '0x0000000000000000000000000000000000000000000000000000000000000000') {
        this.$message.error('Order does not exist!');
        dq.zcgldata.loading = false;
        return;
      }
      getshuju();
      //获取数据 并且组装
      async function getshuju() {
        //查询总票数量
        var bhnum = await ArbTwo.methods.paus(data.ddid).call();
        //查询仲裁数据库
        var arbs = await ArbTwo.methods.arbs(data.ddid).call();
        var Timc = await ArbTwo.methods.Timc().call();
        //查询默认编号投票人数 以及信息
        var guishu;
        var slates = await ArbTwo.methods.slates(data.ddid, data['faid']).call();
        if (slates['arb'] == 1) guishu = 'business';
        if (slates['arb'] == 2) guishu = 'user';
        if (slates['arb'] == 0) guishu = 'Released';
        console.log(34567)
        console.log(data['faid'])
        console.log(slates['comp'])
        var weight = await ArbTwo.methods.weight(data.ddid, arbs['timc'], data['faid']).call();

        var sjzcy_num = 0;
        var yhzcy_num = 0;
        await ArbTwo.methods.slat(data.ddid, data['faid'], 3).call((err, ret) => {
          if (ret) {
            sjzcy_num = ret;
          }
        });
        await ArbTwo.methods.slat(data.ddid, data['faid'], 2).call((err, ret) => {
          if (ret) {
            yhzcy_num = ret;
          }
        });
        var pro_num = 0;
        var pro_id = '';
        var huobi = config['hbi'][config['key']];
        for (const key in huobi) {
          if (ddinfo['pro'] == huobi[key]['key']) {
            pro_num = huobi[key]['num'];
            pro_id = huobi[key]['id'];
            break;
          }
        }

        //获取用户名
        var username = await ArbOne.methods.message(address, 0).call();

        //倒计时
        var dqtime = Math.round(new Date() / 1000);
        var ensjc = Number(Timc) + Number(arbs['timc']);
        var djsval = (dqtime - ensjc) * 1000;
        console.log("Countdown one")
        console.log(dqtime)
        console.log(ensjc)
        console.log(djsval)
        dq.zcgldata = {
          code: data.code,
          loading: false,
          tcode: true,
          faid: 1,
          bhnum: Number(bhnum),
          ddid: data['ddid'],
          arbs: arbs,
          info: {
            myuser: address,
            myname: username ? Base64.decode(username) : 'Not filled in yet',
            myjuese: '',
            ddid: data['ddid'],
            ddinfo: {
              uad: ddinfo['uad'],
              mad: ddinfo['mad'],
              pro: pro_id,
              mma: Number(ddinfo['mma']) / (10 ** bzj_num),
              uma: Number(ddinfo['uma']) / (10 ** bzj_num),
              uoa: Number(ddinfo['uoa']) / (10 ** pro_num)
            },
            tpjdu: weight,
            zcguishu: guishu,
            bzjnum: Number(slates['comp']) / (10 ** bzj_num),
            who: slates['who'],
            sjnum: Number(sjzcy_num) / (10 ** bzj_num),
            yhnum: Number(yhzcy_num) / (10 ** bzj_num),
            delnum: Number(slates['fees']) / (10 ** bzj_num),
            djsval: djsval
          }
        }
        //查询我是否双方交易之一
        if (zmxiaoxie(JSON.stringify(ddinfo)).indexOf(zmxiaoxie(address)) != -1) {
          if (zmxiaoxie(ddinfo['mad']) == zmxiaoxie(address)) {
            dq.zcgldata.info.myjuese = 'business';
          } else if (zmxiaoxie(ddinfo['uad']) == zmxiaoxie(address)) {
            dq.zcgldata.info.myjuese = 'user';
          }
        } else {
          //查询投票者
          ArbTwo.methods.applySuceed(data.ddid).call((err, ret) => {
            if (ret) {
              if (zmxiaoxie(JSON.stringify(ret)).indexOf(zmxiaoxie(address)) != -1) {
                dq.zcgldata.info.myjuese = 'Voter';
              } else {
                dq.zcgldata.info.myjuese = 'other';
              }
            } else {
              dq.zcgldata.info.myjuese = 'other';
            }
          });
        }
        dq.zcgldata.loading = false;
      }
    },

    //取消投票
    async qxtoupiao() {
      var dq = this;
      this.zcgldata.loading = true;
      var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
      var pau = await ArbTwo.methods.arbn(this.zcgldata.ddid, arbs['timc'], address).call();
      console.log(999)
      console.log(arbs['time'])
      console.log(pau)
      if (arbs['time'] == 0 && pau == this.zcgldata.faid) {
        ArbTwo.methods.notVote(this.zcgldata.ddid, this.zcgldata.faid).send({
          from: address
        }, (err, ret) => {
          dq.zcgldata.loading = false;
          if (ret) {
            console.log('ok');
          } else {
            dq.$message.error('Please click agree!');
          }
        });
      } else {
        this.$message.error('You cannot cancel the vote');
        this.zcgldata.loading = false;
      }
    },

    //投票
    async toupiaoajax() {
      var dq = this;
      this.zcgldata.loading = true;
      var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
      var Timd = await ArbTwo.methods.Timd().call();
      var dqtime = Math.round(new Date() / 1000);
      if (Number(Timd) > dqtime - Number(arbs['timd']) && Number(arbs['timd']) != 0) {
        var arbw = await ArbTwo.methods.arbw(this.zcgldata.ddid, address).call();
        var arbn = await ArbTwo.methods.arbn(this.zcgldata.ddid, arbs['timc'], address).call();
        if (arbw == 1 && arbn == 0) {
          ArbTwo.methods.vote(this.zcgldata.ddid, this.zcgldata.faid).send({ from: address }, (err, ret) => {
            dq.zcgldata.loading = false;
            if (ret) {
              console.log('Successful voting');
            } else {
              dq.$message.error('Please click agree!');
            }
          });
        } else {
          this.zcgldata.loading = false;
          dq.$message.error('Voting failed!');
        }
      } else {
        this.zcgldata.loading = false;
        this.$message.error('You cannot vote!');
      }
    },

    //接受投票 accept
    async jieshoutoupiao() {
      /*
        weight arbs leg
      */
      var dq = this;
      this.zcgldata['loading'] = true;
      var sing = this.zcgldata['info']['ddinfo']['mad'] + ',' + this.zcgldata['info']['ddinfo']['uad'];
      if (zmxiaoxie(sing).indexOf(zmxiaoxie(address)) == -1) {
        this.zcgldata['loading'] = false;
        this.$message.error('Not one of the traders!');
        return;
      }
      var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
      var weight = await ArbTwo.methods.weight(this.zcgldata.ddid, arbs['timc'], this.zcgldata['faid']).call();
      var leg = await ArbTwo.methods.leg().call();
      if (Number(weight) >= Number(leg) && Number(arbs['time']) == 0) {
        ArbTwo.methods.accept(this.zcgldata.ddid, this.zcgldata['faid']).send({ from: address }, (err, ret) => {
          dq.zcgldata['loading'] = false;
          if (ret) {
            dq.$message({
              message: 'Submitted for acceptance!',
              type: 'success'
            });
          } else {
            dq.$message.error('Operation failed 1!');
          }
        });
      } else {
        this.zcgldata['loading'] = false;
        this.$message.error('Operation failed 2!');
      }
    },
    //执行投票 execute
    async executeajax() {
      /*
        weight leg arbs Time slates
      */
      var dq = this;
      dq.zcgldata.loading = true;
      var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
      var weight = await ArbTwo.methods.weight(this.zcgldata.ddid, arbs['timc'], this.zcgldata['faid']).call();
      var leg = await ArbTwo.methods.leg().call();
      var Time = await ArbTwo.methods.Time().call();
      var dqtime = Math.round(new Date() / 1000);
      if (Number(weight) >= Number(leg) && Number(arbs['time']) != 0 && Number(Time) < dqtime - Number(arbs['time'])) {
        if (Number(arbs['finish']) != 0) {
          dq.zcgldata.loading = false;
          this.$message.error('Executed!');
          return;
        }
        ArbTwo.methods.execute(this.zcgldata.ddid, this.zcgldata['faid']).send({ from: address }, (err, ret) => {
          dq.zcgldata.loading = false;
          if (ret) {
            dq.$message({
              message: 'Operation submitted!',
              type: 'success'
            });
          } else {
            dq.$message.error('Please click agree!');
          }
        });
      } else {
        dq.zcgldata.loading = false;
        this.$message.error('Execution failed!');
      }
    },
    //重启投票 restartlArbajax
    async restartlArbajax() {
      var dq = this;
      this.zcgldata['loading'] = true;
      var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
      var Timd = await ArbTwo.methods.Timd().call();
      var dqtime = Math.round(new Date() / 1000);
      if (arbs['time'] == 0 && Number(Timd) < (dqtime - Number(arbs['timd'])) && Number(arbs['timd']) != 0) {
        //除交易双方外，本轮入选仲裁员均可撤销本次仲裁团
        var uarr = [];
        var ruxuanarr = await ArbTwo.methods.applySuceed(this.zcgldata.ddid).call();
        for (let index = 0; index < ruxuanarr[0].length; index++) {
          uarr.push(ruxuanarr[0][index]);
        }
        uarr.push(this.zcgldata['info']['ddinfo']['uad']);
        uarr.push(this.zcgldata['info']['ddinfo']['mad']);
        var sing = zmxiaoxie(JSON.stringify(uarr));
        if (sing.indexOf(zmxiaoxie(address)) != -1) {
          ArbTwo.methods.restartlArb(this.zcgldata.ddid).send({ from: address }, (err, ret) => {
            dq.zcgldata['loading'] = false;
            if (ret) {
              dq.$message({
                message: 'The restart operation has been submitted!',
                type: 'success'
              });
            } else {
              dq.$message.error('Please agree to the authorization');
            }
          });
        } else {
          this.zcgldata['loading'] = false;
          this.$message.error('Not one of the traders!');
        }
      } else {
        this.zcgldata['loading'] = false;
        this.$message.error('Restart failed!');
      }
    }
  },
};

function zmxiaoxie(da) {
  return da.toLowerCase();
}
</script>