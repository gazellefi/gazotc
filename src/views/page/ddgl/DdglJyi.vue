<style>
    .ddgl_fabu{
        width: 100%;
        float: left;
    }

    .ddgl_fabu_p_head{
        width: calc(100% - 20px);
        float: left;
        background-color: rgba(0, 0, 0, 0.212);

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 10px;

        margin-top: 20px;
    }

    .ddgl_fabu_p_head_u{
        margin-right: 30px;
        display: flex;
        flex-direction: row;
        height: 50px;
        align-items: center;
    }
    .ddgl_fabu_p_head_u_q{
        margin-right: 30px;
        width: 50px;
        height: 50px;
        background-color: #ddd;
        text-align: center;
        line-height: 50px;
        border-radius: 100%;
    }
    .ddgl_fabu_p_head_u_c{
        display: flex;
        flex-direction: column;
    }
    .ddgl_fabu_p_head_u_c_name{
        font-size: 15px;
    }
    .ddgl_fabu_p_head_u_c_msg{
        font-size: 14px;
        padding: 2px 0;
        opacity: 0.7;
    }
    .ddgl_fabu_p_head_u_c_user{
        font-size: 14px;
        padding: 2px 0;
        opacity: 0.7;
    }

    .ddgl_fabu_p_head_sxan{
        margin-left: 50px;
        display: flex;
        flex-direction: row;
    }
    .ddgl_fabu_p_head_sxan .ddgl_fabu_p_head_sxan_i{
        display: flex;
        padding: 0 15px;
    }
    .ddgl_fabu_p_head_fabu{
        width: 120px;
        height: 35px;
        background-color: rgb(47, 0, 255);
        color: #fff;
        font-size: 14px;
        line-height: 35px;
        text-align: center;
        margin-left: auto;
    }

    .ddgl_fabu_ul{
        width: 100%;
        float: left;
        display: flex;
        flex-direction: column;
    }
    .ddgl_fabu_ul_head{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

    .ddgl_fabu_ul_li{
        display: flex;
        align-items: center;
        width: 10%;
        margin-top: 20px;
        padding: 0 10px;
        font-size: 14px;
        opacity: 0.8;
    }

    .ddgl_fabu_ul_item{
        display: flex;
        
    }
    .danjiayanse{
        color: rgb(7, 203, 252);
    }
    .bzjyanse{
        color: #000;
        font-weight: 900;
        
    }


    /* wap */

    .ddgl_fabu_wapview{
        width:100%;
        float: left;
    }
    .ddgl_fabu_wap_head{
        display: flex;
        padding: 15px 0;
        align-items: center;
        margin-left: 15px;
    }
    .ddgl_fabu_wap_head_q{
        width: 45px;
        height: 45px;
        background-color: #ddd;
        border-radius: 100%;
        text-align: center;
        line-height: 45px;
        margin-right: 15px;
    }
    .ddgl_fabu_wap_head_u{
        display: flex;
        flex-direction: column;
    }
    .ddgl_fabu_wap_head_u_name{
        font-size: 15px;
    }
    .ddgl_fabu_wap_head_u_msg{
        font-size: 13px;
        opacity: 0.7;
        padding: 3px 0;
    }
    .ddgl_fabu_wap_head_u_user{
        font-size: 13px;
        opacity: 0.5;
    }
    .ddgl_fabu_wap_saixuan{
        display: flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: 1px solid #ddd;
         align-items: center;
    }
    .ddgl_fabu_wap_saixuan_item{
        display: flex;
        flex-direction: row;
    }
    .ddgl_fabu_wap_saixuan_item_a{
        margin-left: 15px;
        margin-top: 15px;
        font-size: 14px;
        opacity: 0.5;
    }

    .ddgl_fabu_wap_ul{
        width: 100%;
        float: left;
    }
    .ddgl_fabu_wap_ul_li{
        width: calc(100% - 30px);
        margin-left: 15px;
        margin-right: 15px;
        float: left;
        border-bottom: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        padding: 20px 0;
    }
    .ddgl_fabu_wap_ul_li_item{
        display: flex;
        flex-direction: row;
    }
    .ddgl_fabu_wap_ul_li_item_l{
        margin-right: auto;
        font-size: 15px;
        padding: 5px 0;
        opacity: 0.8;
    }
    .ddgl_fabu_wap_ul_li_item_r{
        font-size: 15px;
        margin-left: auto;
    }
    .ddgl_fabu_wap_ul_li_item button{
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
                        <!-- <div class="ddgl_fabu_p_head_u_c_msg">(78787878单/15%)</div> -->
                        <div class="ddgl_fabu_p_head_u_c_user">{{ uinfo['user_u'] }}</div>
                    </div>
                </div>
                <div class="ddgl_fabu_p_head_sxan">
                    <div class="ddgl_fabu_p_head_sxan_i">
                        <el-dropdown>
                        <span class="el-dropdown-link">
                            USDT <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="USDT">USDT</el-dropdown-item>
                            <el-dropdown-item command="WTH">WTH</el-dropdown-item>
                            <el-dropdown-item command="ETH">ETH</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="ddgl_fabu_p_head_sxan_i">
                        <el-dropdown>
                        <span class="el-dropdown-link">
                            出售 <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">全部</el-dropdown-item>
                            <el-dropdown-item command="2">出售</el-dropdown-item>
                            <el-dropdown-item command="3">购买</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="ddgl_fabu_p_head_sxan_i">
                        <el-dropdown>
                        <span class="el-dropdown-link">
                            CNY<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="CNY">CNY</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <!-- <div class="ddgl_fabu_p_head_fabu">发布委托单</div> -->
            </div>

            <!-- 列表 -->
            <div class="ddgl_fabu_ul">
                <div class="ddgl_fabu_ul_head">
                    <div class="ddgl_fabu_ul_li">
                        订单号
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        资产类型
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        订单类型
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        数量
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        商家保证金
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        用户保证金
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        单价
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        资产释放
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        保证金释放
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        仲裁中
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        操作
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
                        {{ li.type }}
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.Uoa }} {{ li.pro }}
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.mma }}  usdt
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.uma }}  usdt
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.unit }} CNY
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.zcsf_msg }}
                    </div>
                    <div class="ddgl_fabu_ul_li">
                        {{ li.bzj_msg }}
                    </div>
                    <div class="ddgl_fabu_ul_li bzjyanse">
                        否
                    </div>
                    <div class="ddgl_fabu_ul_li" style="opacity: 1;">
                        <van-button plain type="info" size="small" @click="openinfo(li.ddid)">详 情</van-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- WAP -->
        <div class="hidden-sm-and-up ddgl_fabu_wapview">
            <div class="ddgl_fabu_wap_head">
                <div class="ddgl_fabu_wap_head_q">{{ uinfo['quan'] }}</div>
                <div class="ddgl_fabu_wap_head_u">
                    <div class="ddgl_fabu_wap_head_u_name">>{{ uinfo['username'] }}</div>
                    <!-- <div class="ddgl_fabu_wap_head_u_msg">(78787878单/15%)</div> -->
                    <div class="ddgl_fabu_wap_head_u_user">{{ uinfo['user_u'] }}</div>
                </div>
            </div>
            <div class="ddgl_fabu_wap_saixuan">
                <div class="ddgl_fabu_wap_saixuan_item">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        USDT <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>USDT</el-dropdown-item>
                        <el-dropdown-item disabled>WHT</el-dropdown-item>
                        <el-dropdown-item disabled>GAZ</el-dropdown-item>
                        <el-dropdown-item disabled>HBTC</el-dropdown-item>
                        <el-dropdown-item >TEST</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="ddgl_fabu_wap_saixuan_item">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        出售<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>出售</el-dropdown-item>
                        <el-dropdown-item>购买</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="ddgl_fabu_wap_saixuan_item">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        CNY<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>CNY</el-dropdown-item>
                        <el-dropdown-item disabled>USD</el-dropdown-item>
                        <el-dropdown-item divided>HKD</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

            <!-- 列表 -->
            <div class="ddgl_fabu_wap_ul">
                <div class="ddgl_fabu_wap_ul_li" v-for="(li,index) in list" :key="index">
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">订单号：{{ li.ddid }}</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r">类型：{{ li.type }} </div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">数量：{{ li.Uoa }} {{ li.pro }}</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r">单价</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">商家保证金：{{ li.mma }}  usdt</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r" style="color: rgb(100, 200, 104);">{{ li.unit }} CNY</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">用户保证金：{{ li.uma }}  usdt</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">资产释放：</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r" style="color: #f33;">{{ li.zcsf_msg }}</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">保证金释放：</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r" style="color: #f33;">{{ li.bzj_msg }}</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <div class="ddgl_fabu_wap_ul_li_item_l">仲裁中：</div>
                        <div class="ddgl_fabu_wap_ul_li_item_r" style="color: #f33;">否</div>
                    </div>
                    <div class="ddgl_fabu_wap_ul_li_item">
                        <van-button type="primary" @click="openinfo(li.ddid)">详 情</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Web3 from "web3"
import Web3Modal from "web3modal"
let Base64 = require('js-base64').Base64;

import config from "../../../config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];
var huobi = {
    huobi:[],
    fabi:[]
};
var  harr = config['hbi'][config['key']];
var  fbarr = config['fabi'][config['key']];
for (const key in harr) {
    huobi['huobi'].push({
        key:harr[key]['key'],
        id:harr[key]['id'],
        num:harr[key]['num']
    });
}
for (const key in fbarr) {
    huobi['fabi'].push({
        id:fbarr[key]['id'],
        key:fbarr[key]['key']
    });
}

//公共变量
var web3 = "";
var  ethereum = window.ethereum;
var  Address = '';
export default {
    data(){
        return{
            uinfo:{
                user:'',
                user_u:'',
                quan:'',
                username:'',
            },
            list:[],
            list_b:[]
        }
    },
    //初始化WEB3
    created(){
        var dq = this;
        //监测用户是否安装MASK
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
                Address = provider.selectedAddress;
                dq.getuinfo(Address);
                dq.getlist();
            }
        }
    },
    methods:{
        openinfo(ddid){
            this.$router.push({
                path:'./ddinfow',
                query:{
                    ddid:ddid
                }
            });
        },
        getlist(){
           var list = [];
            var dq = this;
            var contracts = new web3.eth.Contract(dotc_abi,dotc_key);
            contracts.methods.ownerDeal(Address+"",10+"").call((err, result) => {
                if (result) {
                    if (result[0].length > 0) {
                        for (let index = 0; index < result[0].length; index++) {
                            var obj = {};
                            var h_num = 0;
                            var h_pro = 0;
                            var ttype = '';
                            for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
                                if (result[1][index][1] == huobi['huobi'][huobii]['key']) {
                                    h_num = Number(huobi['huobi'][huobii]['num']);
                                    h_pro = huobi['huobi'][huobii]['id'];
                                    break;
                                }
                            }
                            if (result[1][index][0] == '0x73616c6500000000000000000000000000000000000000000000000000000000') {
                                ttype = '出售';
                            }else{
                                ttype = '购买';
                            }
                            var zcsf_msg = '';
                            var bzj_msg = '...';
                            if (result[0][index][5] == 0 && result[0][index][4] == 0) {
                                zcsf_msg = '未释放'
                            }else if(result[0][index][5] != 0 && result[0][index][4] == 0){
                                zcsf_msg = '已释放'
                            }else if(result[0][index][5] == 0 && result[0][index][4] != 0){
                                zcsf_msg = '已取消'
                            }
                            
                            if(result[0][index][9] != 0){
                                bzj_msg = '已释放'
                            }else{
                                bzj_msg = '未释放'
                            }

                            obj = {
                                ddid:result[0][index][0],
                                Uoa:Number(result[0][index][1]) / (10**h_num),
                                uma:Number(result[0][index][2]) / (10**bzj_num),
                                mma:Number(result[0][index][3]) / (10**bzj_num),
                                release:result[0][index][4],
                                timc:result[0][index][5],
                                agree:result[0][index][6],
                                pau:result[0][index][7],
                                unit:Number(result[0][index][8]) / 100,

                                zcsf_msg:zcsf_msg,
                                bzj_msg:bzj_msg,

                                pro:h_pro,
                                type:ttype
                            };
                            list.push(obj);
                        }
                        dq.list = list;
                        dq.list_b = list;
                    }
                }
            })
        },
        getuinfo(Address){
            this.uinfo['user'] = Address;
            this.uinfo['user_u'] = Address.substr(0,5)+"...."+Address.substr(Address.length - 5,Address.length);
            var dq = this;
            var contracts = new web3.eth.Contract(dotc_abi,dotc_key);
            contracts.methods.message(Address+"","0").call((err, result) => {
                if (result) {
                    var jiename = Base64.decode(result);
                    dq.uinfo['quan'] = jiename.substr(0,1);
                    dq.uinfo['username'] = jiename;
                }
            });
        }
    }
}
</script>