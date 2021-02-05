<style scoped>
    html,body{
        background-color: #ddd;
    }
    .qianbao{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: rgb(233, 229, 229);
    }

    .qianbao_view{
        width: 375px;
        height: auto;
        background-color: #fff;
        float: left;
        margin-left: calc((100% - 375px)/2);
    }
    .qianbao_view_head{
        width: 90%;
        height: 110px;
        background-color: rgba(45, 92, 222, 1);
        margin: 10px 5%;
        border-radius: 15px;
        display: flex;
        align-items: center;
    }
    .qianbao_view_head_item{
        display: flex;
        flex-direction: column;
    }
    .qianbao_view_head_item_li{
        display: flex;
        padding: 2.5px 15px;
        align-items: center;
    }
    .qianbao_view_head_item_li i{
        margin-left: 10px;
        
    }
    .qianbao_view_head_item_li_num{
        font-size: 28px;
        color: #fff;
    }
    .qianbao_view_head_item_li.numarr{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
    .qianbao_view_head_item_li span{
        margin-left: 15px;
        color: #fff;
        font-size: 14px;
    }

    .qianbao_view_cd{
        width: 90%;
        margin: 0 5%;
        display: flex;
        height: 70px;
        align-items: center;
    }
    .qianbao_view_cd_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
    }
    .qianbao_view_cd_item i{
        font-size: 20px;
        font-weight: 900;
    }
    .qianbao_view_cd_item span{
        padding: 2px 0;
        font-size: 14px;
        opacity: 0.8;
    }
    .qianbao_view_ul{
        width: 90%;
        float: left;
        margin-top: 15px;
        height: calc(100vh - 215px);
        margin-left: 5%;
        overflow-y: scroll;
        flex-direction: column;
    }
    .qianbao_view_ul_li{
        width: 100%;
        float: left;
        display: flex;
        height: auto;
        align-items: center;
        
    }
    .qianbao_view_ul_li_item.head{
        width: 25%;
        font-size: 14px;
        opacity: 0.5;
    }

    .qianbao_view_ul_li_item.item{
        overflow: hidden;
        width: 100%;
        margin: 10px 0;
        font-size: 14px;
    }
</style>
<template>
    <div class="qianbao">
        <van-nav-bar
            title="我的钱包"
            right-text=""
            left-arrow
            :fixed="true"
            :placeholder="true"
            z-index="99"
            @click-left="goback"
        />
        <div class="qianbao_view">
            <div class="qianbao_view_head">
                <div class="qianbao_view_head_item">
                    <div class="qianbao_view_head_item_li" style="
                    font-size: 14px;
                    color: #fff;">
                        <div style="opacity: 0.5;">资金净资产</div> <i class="el-icon-view" style="opacity:0.5"></i>
                    </div>
                    <div class="qianbao_view_head_item_li numarr">
                        <div class="qianbao_view_head_item_li_num">{{ user_zc }}</div> 
                    </div>
                </div>
            </div>

            <div class="qianbao_view_cd">
                <div class="qianbao_view_cd_item" style="margin-left: 0px;" @click="openurl('./chongzhi')">
                    <i class="el-icon-refresh-left"></i><span>充币</span>
                </div>
                <div class="qianbao_view_cd_item"  @click="openurl('./tixian')">
                    <i class="el-icon-refresh-right"></i><span>提币</span>
                </div>
                <div class="qianbao_view_cd_item"  @click="openurl('./baozhengjin')">
                    <i class="el-icon-refresh-right"></i><span>保证金划转</span>
                </div>
            </div>


            <!-- 列表 -->
            <div class="qianbao_view_ul">
                <div class="qianbao_view_ul_li" style="margin-bottom: 10px;">
                    <div class="qianbao_view_ul_li_item head" style="width: 24%;">币种</div>
                    <div class="qianbao_view_ul_li_item head" style="width: 28%;">可用</div>
                    <div class="qianbao_view_ul_li_item head" style="width: 28%;">冻结</div>
                    <div class="qianbao_view_ul_li_item head" style="width: 20%;">操作</div>
                </div>
                <div class="qianbao_view_ul_li" v-for="(li,index) in list" :key="index">
                    <div class="qianbao_view_ul_li_item item" style="width: 24%; opacity: 0.8;">{{li.name}}</div>
                    <div class="qianbao_view_ul_li_item item" style="width: 28%; opacity: 0.8;">{{li.balancepro}}</div>
                    <div class="qianbao_view_ul_li_item item" style="width: 28%; opacity: 0.8;">{{li.lockpro}}</div>
                    <div class="qianbao_view_ul_li_item item" style="width: 20%;" v-if="li.key == 'baozhengjing'">
                        <el-link type="primary"  @click="openurl('./baozhengjin')">转入</el-link>
                        <el-link type="danger" style="margin-left: 5px;"  @click="openurl('./baozhengjin')">转出</el-link>
                    </div>
                    <div class="qianbao_view_ul_li_item item" style="width: 20%;" v-if="li.key != 'baozhengjing'">
                        <el-link type="primary" @click="opencztk(1,index)">充币</el-link>
                        <el-link type="danger" style="margin-left: 5px;" @click="opencztk(2,index)">提币</el-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Toast  } from 'vant';


import config from "../../config";

var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];

import VConsole from "vconsole";

new VConsole();
//全局变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;


export default {
    data(){
        return{
            huobi:[{
                id:"保证金",
                hyue:'baozhengjing',
                num:6
            }],
            list:[],
            user_zc:0
        }
    },
    mounted(){
        //监测用户是否安装MASK
        if (typeof ethereum === "undefined") {
            alert("请先安装METAMASK插件");
        } else {
        //初始化
         webinit();
        }

        //初始化货币
        var hbar = config['hbi'][config['key']];
        for (const key in hbar) {
            this.huobi.push({
                id:hbar[key]['id'],
                hyue:hbar[key]['heyue'],
                num:hbar[key]['num']
            });
        }

        console.log(this.huobi);
        
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
                address = provider.selectedAddress;
                //其他钱包使用测试网络
                if (window.ethereum.isImToken || window.ethereum.isMetaMask || window.ethereum.isHbWallet) {
                    var wlcode = window.ethereum.networkVersion;
                    //imtoken只能查看 无法操作 出发是ETF主网
                    if (window.ethereum.isImToken) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                    //检测是否是火币钱包
                    if (window.ethereum.isHbWallet) {
                        address = window.ethereum.address;
                        web3.setProvider(config["hyue"]['huobi']["Url"]);
                    }
                    //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
                    if (window.ethereum.isMetaMask && wlcode != 4) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                }else{
                    web3.setProvider(config["hyue"][config["key"]]["Url"]);
                }
                dq.getqblist();
            }
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        openurl(url){
            this.$router.push(url);
        },
        getqblist(){
            var dq = this;
            //新版查询
            function gethuobi() {
                Toast.loading({
                    message: '查询中...'
                });
                var sqllist = [];
                for (let index = 0; index < dq.huobi.length; index++) {
                    if (dq.huobi[index]['hyue'] != 'baozhengjing') {
                        sqllist.push(dq.huobi[index]['hyue']);
                    }
                }
                var dotsconn = new web3.eth.Contract(dotc_abi,dotc_key);
                dotsconn.methods.ownerpro(address+"",sqllist).call((error,ret)=>{
                    if (ret) {
                        var uzc = 0;
                        var yue_arr = ret[0];
                        var lock_yue_arr = ret[1];
                        for (let index = 0; index < dq.huobi.length; index++) {
                            var num = Number(dq.huobi[index]['num']);
                            dq.list.push({
                                id:index,
                                key:dq.huobi[index]['hyue'],
                                name:dq.huobi[index]['id'],
                                balancepro:(Number(yue_arr[index]) / (10**num)).toFixed(2),
                                lockpro:(Number(lock_yue_arr[index]) / (10**num)).toFixed(2)
                            });

                            uzc = (Number(yue_arr[index]) / (10**num).toFixed(2)) + uzc;
                            dq.user_zc = uzc;
                        }
                        Toast.clear();
                    }
                });
            }
            gethuobi();
        },
        opencztk(e,index){
            var htitle = this.huobi[index]['id'];
            if (e == 1) {
                this.$router.push({ path: './chongzhi', query: { title:htitle+"" }});
            }else{
                this.$router.push({ path: './tixian', query: { title:htitle+"" }});
            }
        }
    }
}
</script>