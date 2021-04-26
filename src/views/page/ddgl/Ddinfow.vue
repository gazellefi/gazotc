<style>
    .ddinfo_w{
        width: 100%;
        float: left;
    }
    .ddinfo_w_v{
        width: 375px;
        float: left;
        margin-left: calc((100%  - 375px) / 2);
    }
    .ddinfo_w_v_ul{
        display: flex;
        flex-direction: column;
    }
    .ddinfo_w_v_ul_item{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
    }
    .ddinfo_w_v_ul_item_l{
        padding-right: 15px;
    }
    .ddinfo_w_v_ul_item_r{
        margin-left: auto;
        max-width: 80%;
    }

    .ddinfo_w_djs{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ddinfo_w_anarr{
        display: flex;
        flex-direction: column;
    }
    .ddinfo_w_anarr .van-button{
        margin-top: 15px;
    }
    .msg{
        padding: 5px 0;
        font-size: 14px;
        opacity: 0.8;
    }
</style>
<template>
    <div class="ddinfo_w">
        <van-nav-bar
            title="订单详情"
            left-text="返回"
             @click-left="onClickLeft"
            left-arrow
            :fixed="true"
            :placeholder="true"
        />

        <div class="ddinfo_w_v">
            <van-collapse v-model="activeNames">
            <van-collapse-item title="订单详情" name="1">
                <div class="ddinfo_w_v_ul">
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">订单编号:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.iorder }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">来自发布订单:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.faddid }} <el-button type="text" @click="openddinfos(ddifo['faddid'])">详情</el-button></div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">订单类型:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.Umark_b }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">资产类型:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.pro_c }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">用户地址:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.Uadd_b }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">商家地址:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.Madd_b }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">用户锁定的保证金:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.uma.toFixed(2) }} USDT</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">商家锁定的保证金:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.mma }} USDT</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">交易数量:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.Uoa }} {{ ddifo.pro_c }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">下单时间:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.tima != 0 ? gettime_zh(ddifo.tima):'' }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">付款时间:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.timb != 0 ? gettime_zh(ddifo.timb):'未知' }}</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">资产释放:</div>
                        <div class="ddinfo_w_v_ul_item_r"  v-if="ddifo.timc == 0 && ddifo.release == 0">未释放</div>
                        <div class="ddinfo_w_v_ul_item_r" v-if="ddifo.timc != 0 && ddifo.release == 0">已释放</div>
                        <div class="ddinfo_w_v_ul_item_r" v-if="ddifo.timc == 0 && ddifo.release != 0">已取消</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">保证金释放:</div>
                        <div class="ddinfo_w_v_ul_item_r" v-if="ddifo.time != 0">已释放</div>
                        <div class="ddinfo_w_v_ul_item_r" v-if="ddifo.time == 0">未释放</div>
                    </div>
                    <div class="ddinfo_w_v_ul_item">
                        <div class="ddinfo_w_v_ul_item_l">仲裁:</div>
                        <div class="ddinfo_w_v_ul_item_r">{{ ddifo.arb == 0 ? '未仲裁':ddifo.arb == 1? '用户胜':'商家胜' }}</div>
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="保证金释放倒计时" name="2">
                <div class="ddinfo_w_djs">
                    <!-- <div class="ddinfo_w_djs_msg">释放保证金倒计时</div> -->
                    <van-count-down :time="ddifo['djs_val']" format="DD 天 HH 时 mm 分 ss 秒" v-if="ddifo['timc'] > 0 && ddifo['time'] == 0"/>
                    <van-count-down time="0" format="DD 天 HH 时 mm 分 ss 秒" v-if="ddifo['timc'] > 0 && ddifo['time'] != 0"/>
                    <div class="ddinfo_w_djs_msg_djs" v-if="ddifo['timc'] == 0 || !ddifo['timc']">
                        <!-- 判断是否暂停 或者取消 -->
                        <span v-if="ddifo['pau'] != 0">该订单已暂停</span>
                        <span v-if="ddifo['release'] != 0">该订单已取消</span>
                    </div>
                </div>
            </van-collapse-item>
            <van-collapse-item title="当前交易状态" name="3">
                <div class="ddinfo_w_anarr" v-if="
                    ddifo['myuser'] == ddifo['Madd'] && ddifo['Umark_b'] == '购买'
                ">
                    <van-button plain type="primary" @click="setddcode('qx_ddajax')" :disabled="anarr('qx_ddajax')">取消</van-button>
                    <!-- <van-button plain type="primary" @click="setddcode('fk_ddajax')" :disabled="anarr('qx_ddajax')">已付款</van-button> -->
                    <van-button plain type="primary" @click="setddcode('zt_ddajax',2)" :disabled="anarr('zt_ddajax')">暂停释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.pau == 1">用户暂停</span>
                        <span v-if="ddifo.pau == 2">商家暂停</span>
                    </div>
                    <!-- <van-button plain type="primary" @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax','Madd')">提前释放</van-button> -->
                    <van-button plain type="primary" @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax')">提前释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.agree == 1">用户同意释放</span>
                        <span v-if="ddifo.agree == 2">商家同意释放</span>
                        <span v-if="ddifo.agree == 3">双方同意释放</span>
                    </div>
                    <van-button plain type="primary"  @click="setddcode('sf_ddajax')" :disabled="anarr('sf_ddajax')">释放保证金</van-button>
                    <van-button plain type="primary" @click="openurl('./zhongcai')" :disabled="anarr('ss_ddajax')">申诉</van-button>
                </div>

                <div class="ddinfo_w_anarr" v-if="
                    ddifo['myuser'] == ddifo['Madd'] && ddifo['Umark_b'] == '出售'
                ">
                    <van-button plain type="primary" @click="setddcode('fb_ddajax')" :disabled="anarr('fb_ddajax')">放币</van-button>
                    <van-button plain type="primary" @click="setddcode('zt_ddajax',2)" :disabled="anarr('zt_ddajax')">暂停释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.pau == 1">用户暂停</span>
                        <span v-if="ddifo.pau == 2">商家暂停</span>
                    </div>
                    <van-button plain type="primary" @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax','Madd')">提前释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.agree == 1">用户同意释放</span>
                        <span v-if="ddifo.agree == 2">商家同意释放</span>
                        <span v-if="ddifo.agree == 3">双方同意释放</span>
                    </div>
                    <van-button plain type="primary" @click="setddcode('sf_ddajax')" :disabled="anarr('sf_ddajax')">释放保证金</van-button>
                    <van-button plain type="primary" @click="openurl('./zhongcai')" :disabled="anarr('ss_ddajax')">申诉</van-button>
                </div>


                <div class="ddinfo_w_anarr" v-if="
                    ddifo['myuser'] == ddifo['Uadd'] && ddifo['Umark_b'] == '出售'
                ">
                    <van-button plain type="primary" @click="setddcode('qx_ddajax')" :disabled="anarr('qx_ddajax')">取消</van-button>
                    <!-- <van-button plain type="primary" @click="setddcode('fk_ddajax')" :disabled="anarr('qx_ddajax')">已付款</van-button> -->
                    <van-button plain type="primary" @click="setddcode('zt_ddajax',1)" :disabled="anarr('zt_ddajax')">暂停释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.pau == 1">用户暂停</span>
                        <span v-if="ddifo.pau == 2">商家暂停</span>
                    </div>
                    <van-button plain type="primary" @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax','Uadd')">提前释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.agree == 1">用户同意释放</span>
                        <span v-if="ddifo.agree == 2">商家同意释放</span>
                        <span v-if="ddifo.agree == 3">双方同意释放</span>
                    </div>
                    <van-button plain type="primary"  @click="setddcode('sf_ddajax')" :disabled="anarr('sf_ddajax')">释放保证金</van-button>
                    <van-button plain type="primary" @click="openurl('./zhongcai')" :disabled="anarr('ss_ddajax')">申诉</van-button>
                </div>

                <div class="ddinfo_w_anarr" v-if="
                    ddifo['myuser'] == ddifo['Uadd'] && ddifo['Umark_b'] == '购买'
                ">
                    <van-button plain type="primary" @click="setddcode('fb_ddajax')" :disabled="anarr('fb_ddajax')">放币</van-button>
                    <van-button plain type="primary" @click="setddcode('zt_ddajax',1)" :disabled="anarr('zt_ddajax')">暂停释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.pau == 1">用户暂停</span>
                        <span v-if="ddifo.pau == 2">商家暂停</span>
                    </div>
                    <van-button plain type="primary"  @click="setddcode('tq_ddajax')" :disabled="anarr('tq_ddajax','Madd')">提前释放保证金</van-button>
                    <div class="msg">
                        <span v-if="ddifo.agree == 1">用户同意释放</span>
                        <span v-if="ddifo.agree == 2">商家同意释放</span>
                        <span v-if="ddifo.agree == 3">双方同意释放</span>
                    </div>
                    <van-button plain type="primary" @click="setddcode('sf_ddajax')" :disabled="anarr('sf_ddajax')">释放保证金</van-button>
                    <van-button plain type="primary" @click="openurl('./zhongcai')" :disabled="anarr('ss_ddajax')">申诉</van-button>
                </div>

                <!-- 不是商家也不是卖家 -->
                <div class="ddinfo_w_anarr"
                v-if="ddifo['myuser'] != ddifo['Uadd'] && ddifo['myuser'] != ddifo['Madd']">
                    <van-button plain type="primary" :disabled="true">
                        <span v-if="ddifo.pau == 0">暂停释放保证金</span>
                        <span v-if="ddifo.pau == 1">用户暂停</span>
                        <span v-if="ddifo.pau == 2">商家暂停</span>
                    </van-button>
                    <van-button plain type="primary" :disabled="true">
                        <span v-if="ddifo.agree == 0">提前释放保证金</span>
                        <span v-if="ddifo.agree == 1">用户同意释放</span>
                        <span v-if="ddifo.agree == 2">商家同意释放</span>
                        <span v-if="ddifo.agree == 3">双方同意释放</span>
                    </van-button>
                    <van-button plain type="primary" :disabled="true">释放保证金</van-button>
                    <van-button plain type="primary" :disabled="true">申诉</van-button>
                </div>
            </van-collapse-item>
            </van-collapse>
        </div>

        <!-- 弹框 -->
        <el-dialog
        title="请输入订单ID"
        :visible.sync="ddidcode"
        width="90%">
        <span class="ddform">
            <el-input placeholder="请输入订单ID" v-model="ddid"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="ddidcode = false">取 消</el-button>
            <el-button type="primary" @click="getddinfo">查 询</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import ddinfomodel from "./ddinfo.json";
import { Toast  } from 'vant';

import config from "../../../config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var huobijson = {
    huobi:[],
    fabi:[]
};
var  harr = config['hbi'][config['key']];
var  fbarr = config['fabi'][config['key']];
for (const key in harr) {
    huobijson['huobi'].push({
        key:harr[key]['key'],
        num:harr[key]['num']
    });
}
for (const key in fbarr) {
    huobijson['fabi'].push({
        id:fbarr[key]['id'],
        key:fbarr[key]['key']
    });
}


//全局变量
var web3 = "";
var address = "";
var  ethereum = window.ethereum;
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];
var uarm;

import Web3 from "web3"
import Web3Modal from "web3modal"
import moment from "moment";
import { Dialog } from 'vant';

export default {
    data(){
        return{
            ddid:null,
            ddidcode:true,
            activeNames:['1','2','3'],


            ddifo:ddinfomodel
        }
    },
    watch:{
        'ddifo'(e){
            console.log(e);
        }
    },
    created(){
        var dq = this;
        var ddid = this.$route.query.ddid;
        if (ddid) {
            this.ddidcode = false;
            this.ddid = ddid;
        }else{
            this.ddidcode = true;
        }

        if (typeof ethereum === 'undefined') {
            alert('请先安装METAMASK插件');
        }else{
            //初始化
            webinit();
        }
        async function webinit(){
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
                address = provider.selectedAddress;
                dq.dquser = address;
                if (dq.ddid) {
                    dq.getddinfo(dq.ddid);
                }
            }
        }

        
    },
    methods:{
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
        //时间转换
        gettime_zh(e){
            if (e) {
                var stime = moment.unix(Number(e)).format('YYYY-MM-DD  HH:mm:ss');
                return stime;
            }else{
                return '';
            }
        },
        openddinfos(e){
            this.$router.push({
                path:'./mairu',
                query:{
                    did:e
                }
            });
        },
        getddinfo(ddid){
            //获取订单详情
            var dq = this;
            if (!dq.ddid) {
                return;
            }else{
                ddid = dq.ddid;
            }
            dq.ddidcode = false;
            var dotsconn = new web3.eth.Contract(dotc_abi,dotc_key);
            dotsconn.methods.users(ddid).call(function(error,ret){
                if (ret) {
                    console.log(ret);
                    dq.ddifo['iorder'] = ret['iorder'];
                    dq.ddifo['Umark'] = ret['Umark'];
                    dq.ddifo['pro'] = ret['pro'];
                    dq.ddifo['Uadd'] = ret['Uadd'].toLowerCase();
                    dq.ddifo['Madd'] = ret['Madd'].toLowerCase();
                    dq.ddifo['release'] = ret['release']; 
                    dq.ddifo['timc'] = ret['timc']; 
                    dq.ddifo['agree'] = Number(ret['agree']); 
                    dq.ddifo['pau'] = ret['pau'];
                    dq.ddifo['uma'] = Number(ret['uma'])/ (10**bzj_num);
                    dq.ddifo['mma'] = Number(ret['mma']) / (10**bzj_num);
                    //扩展数据
                    dq.ddifo['Umark_b'] =  ret['Umark'] == '0x6275790000000000000000000000000000000000000000000000000000000000' ? '购买':'出售';
                    dq.ddifo['pro_c'] =  ret['pro'] == '0x7573647400000000000000000000000000000000000000000000000000000000' ? 'usdt':'Test';
                    for (let index = 0; index < huobijson['huobi'].length; index++) {
                        var num = 0;
                        if (huobijson['huobi'][index]['key'] == ret['pro']) {
                            dq.ddifo['pro_b'] = huobijson['huobi'][index]['id'];
                            num = Number(huobijson['huobi'][index]['num']);
                            //价格转换
                            dq.ddifo['Uoa'] = (Number(ret['Uoa']) / (10**num)).toFixed(2);
                            break;
                        }
                    }
                    dq.ddifo['Madd_b'] = ret['Madd'].substring(0,5)+'.....'+ret['Madd'].substring(ret['Madd'].length - 5,ret['Madd'].length); 
                    dq.ddifo['Uadd_b'] = ret['Uadd'].substring(0,5)+'.....'+ret['Uadd'].substring(ret['Uadd'].length - 5,ret['Uadd'].length); 
                    dq.ddifo['myuser'] = address;
                    ddifoget();
                }
            });

            //获取附加时间
            async function ddifoget() {
                var timb = await dotsconn.methods.timb(dq.ddid).call(function(error,ret){
                    return ret;
                });
                var tima = await dotsconn.methods.tima(dq.ddid).call(function(error,ret){
                    return ret;
                });
                var time = await dotsconn.methods.time(dq.ddid).call(function(error,ret){
                    return ret;
                });
                var Timc = await dotsconn.methods.Timc().call(function(error,ret){
                    return ret;
                });
                var faddid = await dotsconn.methods.Morder(dq.ddid).call(function(error,ret){
                    return Number(ret);
                });


                dq.ddifo['timb'] = Number(timb);
                dq.ddifo['tima'] = Number(tima);
                dq.ddifo['time'] = Number(time);
                
                dq.ddifo['Timc'] = Number(Timc);
                dq.ddifo['faddid'] = faddid;
                //倒计时 tc + Tc - 当前时间  = 倒计时
                var  djs = (Number(dq.ddifo['timc']) + dq.ddifo['Timc']) - Math.round(new Date() / 1000);
                dq.ddifo['djs_val'] = djs * 1000;
            }
        },

        //订单操作 取消 付款 放币等
        setddcode(type,c = ''){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotc_abi,dotc_key);
            if (JSON.stringify(dq.ddifo).indexOf(address) == -1) {
                return;
            }
            if (type == 'qx_ddajax') {
                //判断是否放币
                // if (dq.ddifo['timb']) {
                //     alert('该订单无法取消');
                //     return;
                // }
                console.log('该订单无法取消')
                qx_ddajax();
            }
            if (type == 'fk_ddajax') {
                if (dq.ddifo['timb']) {
                    alert('该订单无法付款');
                    return;
                }
                fk_ddajax();
            }
            if (type == 'zt_ddajax') {
                zt_ddajax(c);
            }
            if (type == 'tq_ddajax') {
                tq_ddajax();
            }
            if (type == 'sf_ddajax') {
                if (dq.ddifo['agree']  == 3 || (dq.ddifo.pau == 0 && dq.ddifo.timc != 0)) {
                    sf_ddajax();
                }else{
                    alert('无法点击');
                }
            }
            if (type == 'fb_ddajax') {
                fb_ddajax();
            }
            function qx_ddajax() {
                dotsconn.methods.releAss(dq.ddid+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('订单已取消,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
            }
            function fk_ddajax() {
                dotsconn.methods.paid(dq.ddid).send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        console.log(ret);
                    }else{
                        console.log('出错');
                    }
                });
            }
            function zt_ddajax(c) {
                //有暂停不可点击
                if (dq.ddifo['pau'] != 0) {
                    return;
                }
                function mul(x, y){
                    var z = x * y;
                    return z;
                }
                //判断是否可以暂停 是否需要追加保证金
                async function user_pan_is(ck) {
                    var uara = await dotsconn.methods.uara().call((err,ret)=>{
                        return ret;
                    });
                    var pros = await dotsconn.methods.pros(dq.ddifo['pro']+"").call((err,ret)=>{
                        return ret;
                    });
                    var pri = await dotsconn.methods.pri().call((err,ret)=>{
                        return ret;
                    });

                    var Uoa = 0;
                    for (let index = 0; index < huobijson['huobi'].length; index++) {
                        if (huobijson['huobi'][index]['key'] == dq.ddifo['pro']) {
                            Uoa = Number(dq.ddifo.Uoa) * (10**Number(huobijson['huobi'][index]['num']));
                            break;
                        }
                    }
                    uarm = mul((mul(Uoa,Number(pros.uni))/mul(Number(pri),Number(pros.one))),Number(uara));
                    if (dq.ddifo['uma']  >= uarm/(10**bzj_num)) {
                        ck(true);
                    }else{
                        ck(false,uarm);
                    }
                }

                //判断是用户还是商家 买家需要判断
                /*
                    2不需要判断 
                */
                if (c == 1) {
                    user_pan_is((e,uarm)=>{
                        if (!e) {
                            Dialog.confirm({
                                title: '警告',
                                message: '保证金不足，最低需要保证金‘'+ (uarm / (10**bzj_num)).toFixed(2) +'’，请追加保证金后操作！',
                                confirmButtonText:'追加保证金',
                                cancelButtonText:'放弃'
                            })
                            .then(() => {
                                mar_add();
                            })
                            .catch(() => {
                                // on cancel
                            });
                        }else{
                            user_pan();
                        }
                    });
                }else{
                    user_pan();
                }
                
                //操作
                function user_pan() {
                    dotsconn.methods.pauseMar(dq.ddid).send({
                        from:address
                    },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('订单已暂停,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
                }
                function mar_add() {
                    dotsconn.methods.addMar(dq.ddid,dq.getFNum(uarm)).send({
                        from:address
                    },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('保证金已追加,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
                }
            }
            function tq_ddajax() {
                dotsconn.methods.aheadMar(dq.ddid).send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('同意保证金释放,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
            }
            function sf_ddajax() {
                dotsconn.methods.releMar(dq.ddid).send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('保证金已释放,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
            }
            function fb_ddajax(){
                dotsconn.methods.releAss(dq.ddid+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        Toast.success('资产已释放,请稍后查看');
                    }else{
                        Toast.clear();
                        Toast.fail('请同意授权！');
                    }
                });
            }
        },

        onClickLeft(){
            this.$router.go(-1);
        },
        openurl(url){
            this.$router.push(url);
        },

        //按钮状态
        anarr(tcode,code) {
            var ddinfo = this.ddifo;
            if(tcode == 'qx_ddajax'){
                if (ddinfo['release'] == 0 && ddinfo['timc'] == 0 ) {
                    return false;
                }else{
                    return true;
                }
            }  
            if(tcode == 'zt_ddajax'){
                if (ddinfo['release'] != 0 || ddinfo['pau'] != 0 || ddinfo['agree'] == 3) {
                    return true;
                }else{
                    //没有放币  并且 没有付款 显示 
                    return false;
                }
            } 
            if(tcode == 'fb_ddajax'){
                if (ddinfo['release'] == 0 && ddinfo['timc'] == 0 ) {
                    return false;
                }else{
                    return true;
                }
            } 
            if(tcode == 'tq_ddajax'){
                console.log(ddinfo['time'])
                if (ddinfo['time'] != 0 ) {
                        return true;
                }else {
                    //我是否点击了 
                    if (code == 'Madd') {
                        //商家
                        if (ddinfo['agree'] == 2 || ddinfo['agree'] == 3) {
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        //用户
                        if (ddinfo['agree'] == 2 || ddinfo['agree'] == 3) {
                            return true;
                        }else{
                            return false;
                        }
                    }
                }
            }
            if (tcode == 'sf_ddajax') {
                //双方都没有点击
                if (ddinfo['agree'] == 3) {
                    if (ddinfo['time'] != 0 ) {
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return true;
                }
            }
            
            if (tcode == 'ss_ddajax') {
                if ((ddinfo['release'] == 0 && ddinfo['timc'] == 0 )|| ddinfo['time'] == 0 ) {
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}
</script>