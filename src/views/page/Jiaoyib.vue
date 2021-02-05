<style>
    html,body{
        background-color: #ddd;
    }
    .jiaoyi{
        width: 100%;
        height: 100%;
        float: left;
        background-color: #fff;
        display: flex;
    }
    .jiaoyi_a{
        max-width: 33.33333%;
        min-width: 33.33333%;
    }
    .jiaoyi_b{
        height: 100vh;
        max-width: 33.33333%;
        min-width: 33.33333%;
    }
    .jiaoyi_c{
        max-width: 33.33333%;
        min-width: 33.33333%;
    }
    .jiaoyi_a_head{
        margin-left: 30px;
        margin-top: 50px;
        margin-bottom: 50px;
        float: left;
    }
    .jiaoyi_a_view{
        width: calc(100% - 60px);
        margin: 0 30px;
        float: left;
    }
    .jiaoyi_a_view_input{
        width: 100%;
        float: left;
        display: flex;
    }
    .jiaoyi_a_view_input .el-input{
        margin-right: 50px;
    }
    .jiaoyi_a_view_info_t{
        opacity: 0.7;
        font-size: 20px;
        padding: 15px 0;
        text-align: center;
        width: 100%;
        float: left;
    }
    .jiaoyi_a_view_info_ul{
        width: 100%;
        float: left;
        overflow: hidden;
        margin-bottom: 50px;
    }
    .jiaoyi_a_view_info_ul_item{
        width: calc(100% - 30px);
        float: left;
        background-color: #ddd;
        margin-top: 10px;
        padding: 10px 15px;
        word-wrap: break-word; word-break: normal;
    }
    .jiaoyi_b_t{
        width: 100%;
        float: left;
        height: 100px;
        line-height: 100px;
        text-indent: 30px;
        font-size: 20px;
        opacity: .5;
    }
    .jiaoyi_b_view{
        width: calc(100% - 60px);
        margin: auto;
        display: flex;
        flex-direction: column;
    }
    .jiaoyi_b_view_user{
        display: flex;
        flex-direction: row;
    }
    .jiaoyi_b_view_user_quan{
        width: 45px;
        height: 45px;
        min-width: 45px;
        min-height: 45px;
        background-color: #ddd;
        margin-right: 10px;
        border-radius: 100%;
        text-align: center;
        line-height: 45px;
        font-size: 24px;
    }
    .jiaoyi_b_view_user_info{
        display: flex;
        flex-direction: column;
    }
    .jiaoyi_b_view_user_info_a{
        font-size: 16px;
    }
    .jiaoyi_b_view_user_info_b{
        font-size: 14px;
        padding: 5px 0;
        color: rgb(131, 129, 129);
    }
    .jiaoyi_b_view_user_info_c{
        font-size: 15px;
    }

    .jiaoyi_b_view_djs{
        position: absolute;
        width: 410px;
        left:calc((33.33333% * 2) - (410px / 2));
        right: 0;
        top: 230px;
        /* margin: 50px 0; */
        background-color: #e6e3e3;
        padding: 50px 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .jiaoyi_b_view_djs span{
        padding-bottom: 10px;
        color: #f33;
    }

    .jiaoyi_b_view_anarr{
        display: flex;
        flex-direction: column;
        position: relative;
        margin-top: 230px;
    }
    .jiaoyi_b_view_anarr button{
        margin-top: 5px;
    }

    .jiaoyi_b_view_anarr_mc{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(156, 156, 156, 0.493);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sshuax{
        position: fixed;
        width: auto;
        padding: 5px 15px;
        bottom: 5px;
        right: 30px;
        background-color: rgba(0, 0, 0, 0.534);
        font-size: 14px;
        border-radius: 7px;
        color: #fff;
    }

    .jiaoyi_b_view_user_quan.ac{
        background-color: blue;
        color: #fff;
    }
</style>
<template>
    <div class="jiaoyi">
        <div class="jiaoyi_a">
            <div class="jiaoyi_a_head">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a>接单详情</a></el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <!-- 订单详情 -->
            <div class="jiaoyi_a_view">
                <div class="jiaoyi_a_view_input">
                    <el-input v-model="ddid" placeholder="请输入订单号"></el-input>
                    <el-button type="primary" @click="getddinfo">查询</el-button>
                </div>
                <div class="jiaoyi_a_view_info">
                    <div class="jiaoyi_a_view_info_t">=======  订单详情 =========</div>
                    <div class="jiaoyi_a_view_info_ul">
                        <div class="jiaoyi_a_view_info_ul_item">
                           订单类型:{{ ddinfo['Umark'] != '0x6275790000000000000000000000000000000000000000000000000000000000' ? '出售':'购买' }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           货币类型:{{ isshuxing('pro',ddinfo['pro']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           用户地址:{{ isshuxing('Uadd',ddinfo['Uadd']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           商家地址:{{ isshuxing('Uadd',ddinfo['Madd']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           订单编号:{{ ddinfo['iorder'] }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           用户锁定的保证金:{{ ddinfo['uma'] }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           商家锁定的保证金:{{ ddinfo['mma'] }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           交易数量:{{ ddinfo['Uoa'] }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           下单时间:{{ isshuxing('tima',ddinfo['tima']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           付款时间:{{ isshuxing('tima',ddinfo['timb']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           资产释放时间:{{ isshuxing('tima',ddinfo['timc']) }}
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           保证金提前释放标示:
                           <span v-if="ddinfo['timo'] == 0">未释放</span>
                           <span v-if="ddinfo['timo'] == 1">买家释放</span>
                           <span v-if="ddinfo['timo'] == 2">商家释放</span>
                           <span v-if="ddinfo['timo'] == 3">已释放</span>
                        </div>
                        <div class="jiaoyi_a_view_info_ul_item">
                           资产仲裁:
                           <span v-if="!ddinfo['arb'] || ddinfo['arb'] == 0">未申请仲裁</span>
                           <span v-if="ddinfo['arb'] && ddinfo['arb'] != 0">仲裁中</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jiaoyi_b">
            <div class="jiaoyi_b_t">商家</div>
            <div class="jiaoyi_b_view">
                <div class="jiaoyi_b_view_user">
                    <div class="jiaoyi_b_view_user_quan" :class="uarr['Madd']['user'] == dquser ? 'ac':''">
                        {{ !uarr['Madd']['username'] ? '无':uarr['Madd']['username'].substring(0,1) }}
                    </div>
                    <div class="jiaoyi_b_view_user_info">
                        <div class="jiaoyi_b_view_user_info_a">{{ uarr['Madd']['username'] }}</div>
                        <div class="jiaoyi_b_view_user_info_b">3，9825单 | 98.85%</div>
                        <div class="jiaoyi_b_view_user_info_c">{{ uarr['Madd']['user'] }}</div>
                    </div>
                </div>

                <!-- 商家 但是我是卖家 -->
                <div class="jiaoyi_b_view_anarr"
                    v-if="
                        ddinfo && ddinfo['Umark'] == '0x73616c6500000000000000000000000000000000000000000000000000000000'
                    "
                >
                    <van-button :disabled="anarris('Madd','sj','fb')" @click="fangbi">放币</van-button>
                    <van-button :disabled="anarr['Madd']['sj']['ztbzj']['disabled']" @click="ztsfbzj">暂停保证金释放</van-button>
                    <van-button :disabled="anarr['Madd']['sj']['tqsf']['disabled']" @click="tqsfbzj">提前释放</van-button>
                    <van-button :disabled="anarr['Madd']['sj']['sfbzj']['disabled']" @click="sfbzj">释放保证金</van-button>
                    <van-button :disabled="anarr['Madd']['sj']['sqzc']['disabled']" @click="sqzc">申请仲裁</van-button>
                </div>

                <!-- 商家 但是我是买家 -->
                <div class="jiaoyi_b_view_anarr"
                    v-if="
                        ddinfo && ddinfo['Umark'] == '0x6275790000000000000000000000000000000000000000000000000000000000'
                    "
                >
                    <van-button :disabled="anarris('Madd','mj','qx')" @click="quexiao">取消</van-button>
                    <van-button :disabled="anarris('Madd','mj','yfk')" @click="yespay">已付款</van-button>
                    <van-button :disabled="anarris('Madd','mj','ztbzj')" @click="mjztsfbzj">暂停保证金释放</van-button>
                    <van-button :disabled="anarris('Madd','mj','tqsf')" @click="tqsfbzj">提前释放</van-button>
                    <van-button :disabled="anarris('Madd','mj','sfbzj')" @click="sfbzj">释放保证金</van-button>
                    <van-button :disabled="anarris('Madd','mj','sqzc')" @click="sqzc">申请仲裁</van-button>
                </div>
            </div>
        </div>
        <div class="jiaoyi_b">
            <div class="jiaoyi_b_t">买家</div>
            <div class="jiaoyi_b_view">
                <div class="jiaoyi_b_view_user">
                    <div class="jiaoyi_b_view_user_quan" :class="uarr['Uadd']['user'] == dquser ? 'ac':''">
                        {{ !uarr['Uadd']['username'] ? '无':uarr['Uadd']['username'].substring(0,1) }}
                    </div>
                    <div class="jiaoyi_b_view_user_info">
                        <div class="jiaoyi_b_view_user_info_a">{{ uarr['Uadd']['username'] }}</div>
                        <div class="jiaoyi_b_view_user_info_b">3，9825单 | 98.85%</div>
                        <div class="jiaoyi_b_view_user_info_c">{{ uarr['Uadd']['user'] }}</div>
                    </div>
                </div>

                <div class="jiaoyi_b_view_djs">
                    <span>释放保证金倒计时</span>
                    <van-count-down :time="djstime" format="DD 天 HH 时 mm 分 ss 秒" />
                </div>

                
                <div class="jiaoyi_b_view_anarr"
                    v-if="
                        ddinfo && ddinfo['Umark'] == '0x73616c6500000000000000000000000000000000000000000000000000000000'
                    "
                >
                    <van-button :disabled="anarris('Uadd','mj','qx')" @click="quexiao">取消</van-button>
                    <van-button :disabled="anarr['Uadd']['mj']['yfk']['disabled']" @click="yespay">已付款</van-button>
                    <van-button :disabled="anarr['Uadd']['mj']['ztbzj']['disabled']" @click="mjztsfbzj">暂停保证金释放</van-button>
                    <van-button :disabled="anarr['Uadd']['mj']['tqsf']['disabled']" @click="tqsfbzj">提前释放</van-button>
                    <van-button :disabled="anarr['Uadd']['mj']['sfbzj']['disabled']" @click="sfbzj">释放保证金</van-button>
                    <van-button :disabled="anarr['Uadd']['mj']['sqzc']['disabled']" @click="sqzc">申请仲裁</van-button>
                </div>

                <div class="jiaoyi_b_view_anarr"
                    v-if="
                        ddinfo && ddinfo['Umark'] == '0x6275790000000000000000000000000000000000000000000000000000000000'
                    "
                >
                    <van-button :disabled="anarris('Uadd','sj','fb')" @click="fangbi">放币</van-button>
                    <van-button :disabled="anarris('Uadd','sj','ztbzj')" @click="ztsfbzj">暂停保证金释放</van-button>
                    <van-button :disabled="anarris('Uadd','sj','tqsf')" @click="tqsfbzj">提前释放</van-button>
                    <van-button :disabled="anarris('Uadd','sj','sfbzj')" @click="sfbzj">释放保证金</van-button>
                    <van-button :disabled="anarris('Uadd','sj','sqzc')" @click="sqzc">申请仲裁</van-button>
                </div>
            </div>
        </div>

        <div class="sshuax">订单实时同步，无需刷新网页！</div>
    </div>
</template>
<script>
import dotsapi from "../../api/dots.json";
import beizhuapi from "../../api/beizhu.json";

import config from "../../config";

//MODEL
import huobi from "../../conn/fabu.json";
import anarr from "../../conn/anarr.json";

//全局变量
var web3 = "";
var address = "";
var  ethereum = window.ethereum;


import Web3 from "web3"
import Web3Modal from "web3modal"
let Base64 = require('js-base64').Base64;
import moment from "moment";

export default {
    created(){
        var dq = this;
        if (typeof ethereum === 'undefined') {
            web3 =  new Web3(config['hyue'][config['key']]['Url']);
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
                if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
                    var wlcode = window.ethereum.networkVersion;
                    //imtoken只能查看 无法操作 出发是ETF主网
                    if (window.ethereum.isImToken) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                    //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
                    if (window.ethereum.isMetaMask && wlcode != 4) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                }else{
                    web3.setProvider(config["hyue"][config["key"]]["Url"]);
                }
                address = provider.selectedAddress;
                dq.dquser = address;

                //查询倒计时时间
                var dotsconn = new web3.eth.Contract(dotsapi,"0xc25eFa9c0052856e4e4B713a180649b8c088a913");
                dotsconn.methods.Timc().call(function(error,ret){
                    if (ret && !error) {
                        dq.djstimemiao = ret;
                    }
                });
            }
        }

    },
    data(){
        return{
            dquser:'',
            ddid:'',

            djstime:null,
            djstimemiao:null,

            //用户信息
            uarr:{
                Uadd:{
                    user:'XXXXXXXXXXXXXXXX',
                    username:'请查询订单'
                },
                Madd:{
                    user:'XXXXXXXXXXXXXXXX',
                    username:'请查询订单'
                }
            },
            lunxun_time:'',
            ddinfo:{},
            ddinfoobj:{},
            anarr:anarr
        }
    },
    watch:{
        'ddinfo'(e){
            if (!e.Uadd || !e.Madd) {
                this.uarr.Uadd = {
                    user:'',
                    username:'请查询订单'
                };
                this.uarr.Madd = {
                    user:'',
                    username:'请查询订单'
                };
                return;
            }
            //倒计时
            if (e['timc'] && (this.djstimemiao > 0)) {
                var time = Date.parse( new Date() ).toString().substr(0,10);
                var djstime = ((parseFloat(e['timc']) + parseFloat(this.djstimemiao)));
                if ((time - djstime) >= 0) {
                    this.djstime = null;
                }else{
                    //判断是否结束
                    if (this.ddinfo['uma'] == 0 && this.ddinfo['mma'] == 0) {
                        this.djstime = 0;
                    }else{
                        this.djstime = (djstime - time) * 1000;
                    }
                }
            }
            this.anarr = anarr;
        }
    },
    methods:{
        //按钮状态判断
        anarris(u,sm,tn){
            var code = true;
            if (this.ddinfo['Madd'].toLowerCase() == address || this.ddinfo['Uadd'].toLowerCase() == address) {
                //优先判断是否取消订单
                if (this.ddinfo['cancel'] == 1) {
                    return true;
                }else{
                    if (u == 'Madd') {
                        if (sm == 'sj') {
                            if ( this.ddinfo['Madd'].toLowerCase() != address) {
                                return true;
                            }else{
                                if (tn == 'fb') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = true;
                                    }else{
                                        code = false;
                                    }
                                }
                                if (tn == 'ztbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'tqsf') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sfbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        //增加判断倒计时是否结束
                                        code = this.ddinfo['timo'] == 3 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sqzc') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        //增加判断倒计时是否结束
                                        code = this.ddinfo['pau'] != 0 ? false:true;
                                    }else{  
                                        code = true;
                                    }
                                }
                            }
                        }else{
                            if (this.ddinfo['Madd'].toLowerCase() != address) {
                                return true;
                            }else{
                                //没有放币
                                if (tn == 'qx') {
                                    if (this.ddinfo['Uoa'] > 1 && this.ddinfo['timc'] < 1) {
                                        code = this.ddinfo['timb'] > 1 ? true:false;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'yfk') {
                                    if (this.ddinfo['timb'] > 1) {
                                        code = true;
                                    }else{
                                        code = this.ddinfo['pau'] != 0 ? true:false;
                                    }
                                }
                                if (tn == 'ztbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'tqsf') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sfbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['timo'] == 3 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sqzc') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] != 0 ? false:true;
                                    }else{  
                                        code = true;
                                    }
                                }
                            }
                        }
                    }else{
                        if (sm == 'sj') {
                            //商家  买家
                            if ( this.ddinfo['Uadd'].toLowerCase() != address) {
                                return true;
                            }else{
                                if (tn == 'fb') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = true;
                                    }else{
                                        code = false;
                                    }
                                }
                                if (tn == 'ztbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'tqsf') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sfbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        //增加判断倒计时是否结束
                                        code = this.ddinfo['timo'] == 3 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sqzc') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        //增加判断倒计时是否结束
                                        code = this.ddinfo['pau'] != 0 ? false:true;
                                    }else{  
                                        code = true;
                                    }
                                }
                            }
                            
                        }else{
                            if (this.ddinfo['Uadd'].toLowerCase() != address) {
                                return true;
                            }else{
                                //没有放币
                                if (tn == 'qx') {
                                    if (this.ddinfo['Uoa'] > 1 && this.ddinfo['timc'] < 1) {
                                        code = this.ddinfo['timb'] > 1 ? true:false;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'yfk') {
                                    if (this.ddinfo['timb'] > 1) {
                                        code = true;
                                    }else{
                                        code = this.ddinfo['pau'] != 0 ? true:false;
                                    }
                                }
                                if (tn == 'ztbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'tqsf') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] == 0 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sfbzj') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['timo'] == 3 ? false:true;
                                    }else{
                                        code = true;
                                    }
                                }
                                if (tn == 'sqzc') {
                                    if (this.ddinfo['Uoa'] < 1 && this.ddinfo['timc'] > 1) {
                                        code = this.ddinfo['pau'] != 0 ? false:true;
                                    }else{  
                                        code = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }else{
                return true;
            }

            return code;
        },
        //查询订单信息
        getddinfo(){
            var dq = this;
            if (!this.ddid) {
                this.$message.error('订单号不能为空');
                return;
            }
            clearTimeout(dq.lunxun_time);
            dq.ddinfo = dq.isshuxing('ddinfoinit',1);
            var dotsconn = new web3.eth.Contract(dotsapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.users(this.ddid).call((err,ret)=>{
                console.log(ret);
                if(ret['Madd'] == '0x0000000000000000000000000000000000000000' && ret['Uadd'] == '0x0000000000000000000000000000000000000000'){
                    dq.$message.error('此订单无效');
                    clearTimeout(dq.lunxun_time);
                }else{
                    if(ret['Madd'] == ret['Uadd']){
                        dq.$message.error('此订单无效');
                        clearTimeout(dq.lunxun_time);
                    }else{
                        dq.ddinfo = ret;
                        dq.ddinfo['Uoa'] = (Number(ret.Uoa) / (10**8)).toFixed(2);
                        dq.ddinfo['uma'] = (Number(ret.uma) / (10**6)).toFixed(2);
                        dq.ddinfo['mma'] = (Number(ret.mma) / (10**8)).toFixed(2);
                        dq.getuser(ret);
                        dq.lunxungetddinfo();
                    }
                }
            })
        },
        getuser(e) {
           var dq = this;
            var beizhuconn = new web3.eth.Contract(beizhuapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            //买家资料
            beizhuconn.methods.message(e['Uadd'],'0').call((err,ret)=>{
                dq.uarr.Uadd = {
                    user:e['Uadd'].toLowerCase(),
                    username:ret ? Base64.decode(ret):'暂未填写'
                };
            })
            //卖家
            beizhuconn.methods.message(e['Madd'],'0').call((err,ret)=>{
                dq.uarr.Madd = {
                    user:e['Madd'].toLowerCase(),
                    username:ret ? Base64.decode(ret):'暂未填写'
                };
            })
        },
        //轮询获取订单详情
        lunxungetddinfo(){
            var dq = this;
            function ddinfoajax() {
                var dotsconn = new web3.eth.Contract(dotsapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
                dotsconn.methods.users(dq.ddid).call((err,ret)=>{
                    if(ret['Madd'] == '0x0000000000000000000000000000000000000000' && ret['Uadd'] == '0x0000000000000000000000000000000000000000'){
                        dq.$message.error('此订单无效');
                        clearTimeout(dq.lunxun_time);
                    }else{
                        if(ret['Madd'] == ret['Uadd']){
                            dq.$message.error('此订单无效');
                            clearTimeout(dq.lunxun_time);
                        }else{
                            console.log(ret.mma / (10**6));
                            dq.ddinfo = ret;
                            dq.ddinfo['Uoa'] = (Number(ret.Uoa) / (10**8)).toFixed(2);
                            dq.ddinfo['uma'] = (Number(ret.uma) / (10**6)).toFixed(2);
                            dq.ddinfo['mma'] = (Number(ret.mma) / (10**8)).toFixed(2);
                            dq.lunxun_time = setTimeout(() => {
                                ddinfoajax();
                            }, 5000);
                        }
                    }
                });
            }
            ddinfoajax();
        },
        //放币
        fangbi(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.releAss(dq.ddid+"").send({
                from:address
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },
        //取消
        quexiao(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.releAss(dq.ddid).send({
                from:dq.dquser
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },
        //暂停释放保证金
        ztsfbzj(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xB5078F029E972170FabbDA512b04dB4705359456');
            dotsconn.methods.pauseMar(dq.ddid).send({
                from:dq.dquser
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },
        //买家点击暂停
        mjztsfbzj(){
            var dq = this;
            this.$confirm('暂停释放保证金, 是否确定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ztsfbzjajax();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '你取消了'
                });          
            });
            function ztsfbzjajax() {
                var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
                dotsconn.methods.pauseMar(dq.ddid).send({
                    from:dq.dquser
                },(err,ret)=>{
                    if (ret) {
                        console.log(ret);
                    }else{
                        console.log('出错');
                    }
                });
            }
            
        },
        //提前释放
        tqsfbzj(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.aheadMar(dq.ddid).send({
                from:dq.dquser
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },
        //释放保证金
        sfbzj(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.releMar(dq.ddid).send({
                from:dq.dquser
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },
        //申请仲裁
        sqzc(){
            console.log('此功能还未做！');
        },
        //已付款
        yespay(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            dotsconn.methods.paid(dq.ddid).send({
                from:dq.dquser
            },(err,ret)=>{
                if (ret) {
                    console.log(ret);
                }else{
                    console.log('出错');
                }
            });
        },


        //计算属性
        isshuxing(e,e2){
            var sing = '';
            if (!e2) {
                return sing;
            }
            //计算类型 返回
            if (e == 'pro') {
                for (const key in huobi['huobi']) {
                    if (e2 == huobi['huobi'][key]['key']) {
                        sing = ''+ huobi['huobi'][key]['id'] +'';
                    }
                }
            }
            if (e == 'Uadd') {
                sing = e2.toLowerCase().substring(0,5)+'·····'+e2.toLowerCase().substring((e2.length - 5),e2.length);
            }
            if (e == 'tima') {
                if (e2 == 0) {
                    sing = '';
                }else{
                    sing = moment.unix(e2).format('YYYY-MM-DD  HH:mm:ss')
                }
            }

            if (e == 'ddinfoinit') {
                sing = {};
            }
            return sing;
        }
    }
}
</script>