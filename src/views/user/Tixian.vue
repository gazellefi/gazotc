<style scoped>
    .chongzhi{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: #ddd;
    }

    .czhiview{
        width: 375px;
        margin-left: calc((100% - 375px)/2);
        float: left;
    }

    .czhiview_form{
        width: 100%;
        float: left;
    }
    .czhiview_form_hblist{
        width: calc(100% - 30px);
        float: left;
        overflow: hidden;
        background-color: #fff;
        margin-top: 15px;
        margin-left: 15px;
        height: 50px;
        border-radius: 5px;
    }
    .czhiview_form_hblist_t{
        float: left;
        line-height: 50px;
        font-size: 14px;
        padding: 0 15px;
        opacity: 0.8;
    }
    .czhiview_form_hblist_ul{
        display: flex;
        overflow-x: scroll;
        height: 50px;
        align-items: center;
        margin-right: 15px;
    }
    .czhiview_form_hblist_item{
        margin: 0 10px;
        font-size: 14px;
        opacity: 0.5;
    }
    .czhiview_form_hblist_item.ac{
        color: rgb(19, 208, 255);
        opacity: 1;
    }

    .czhiview_form_shurk{
        width: calc(100% - 60px);
        margin-left: 15px;
        background-color: #fff;
        margin-top: 15px;
        float: left;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: 15px 15px;
    }
    .czhiview_form_shurk_t{
        font-size: 18px;
        opacity: 0.9;
    }

    .czhiview_form_shurk_input{
        display: flex;
        margin-top: 15px;
        align-items: center;
    }
    .czhiview_form_shurk_input_l{
        margin-right: 10px;
        font-size: 24px;
        font-weight: 500;
        opacity: 0.8;
    }
    .czhiview_form_shurk_input input{
        flex-grow: 1;
    }
    .czhiview_form_czhi{
        float: left;
        width: calc(100% - 30px);
        margin-left: 15px;
        margin-top: 30px;
    }
    .czhiview_form_shurk_msg{
        padding-top: 15px;
        opacity: 0.5;
        font-size: 14px;
        padding-left: 10px;
    }



</style>
<template>
    <div class="chongzhi">
        <van-nav-bar
            title="提款"
            right-text=""
            left-arrow
            :fixed="true"
            :placeholder="true"
            @click-left="goback"
            z-index="99"
        />
        
        <div class="czhiview">
            <div class="czhiview_form">
                <div class="czhiview_form_hblist">
                    <div class="czhiview_form_hblist_t">选择货币</div>
                    <div class="czhiview_form_hblist_ul">
                        <div class="czhiview_form_hblist_item" v-for="(li,index) in huobi" :key="index" @click="hbindex = index" :class="hbindex == index ? 'ac':''">{{li.id}}</div>
                    </div>
                </div>
                <div class="czhiview_form_shurk">
                    <div class="czhiview_form_shurk_t"> </div>
                    <div class="czhiview_form_shurk_input">
                        <div class="czhiview_form_shurk_input_l">{{ huobi[hbindex]['id'] }}</div>
                        <el-input placeholder="请输入内容" v-model="je"></el-input>
                    </div>
                    <div class="czhiview_form_shurk_msg">
                        你可提额度 {{ huobi[hbindex]['je']  }}
                    </div>
                </div>

                <div class="czhiview_form_czhi">
                    <van-button type="primary" block @click="tixianajax">提 币</van-button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { Notify,Dialog,Toast  } from 'vant';

import Web3 from "web3";
import Web3Modal from "web3modal";
import config from "../../config";


import dotsapi from "../../api/dots.json";

//全局变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;
export default {
    data(){
        return{
            huobi:[
                {
                    id:"USDT",
                    hyue:'0xEc8053A77D432A08b2C59363D98eCA903a12df5a',
                    je:0,
                    sdje:0,
                    num:6
                },
                {
                    id:"WETH",
                    hyue:'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',
                    je:0,
                    sdje:0,
                    num:18
                }
            ],
            hbindex:0,
            je:0
        }
    },
    mounted(){
        if (this.$route.query.title) {
            for (let index = 0; index < this.huobi.length; index++) {
                if (this.huobi[index]['id'] == this.$route.query.title) {
                    this.hbindex = index;
                    break;
                }
            }
        }
        //监测用户是否安装MASK
        if (typeof ethereum === "undefined") {
            alert("请先安装METAMASK插件");
        } else {
        //初始化
         webinit();
        }

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
                dq.gethuobizichan();
            }
        }
        
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        gethuobizichan(){
            var index = 0;
            var dq = this;
            function listajax() {
                if (index >= dq.huobi.length) {
                    Toast.clear();
                    return;
                }
                Toast.loading({
                    message: '查询中...'
                });
                var dotsconn = new web3.eth.Contract(dotsapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
                //开始查询
                dotsconn.methods.balancepro(address+"",dq.huobi[index]['hyue']+"").call((error,ret)=>{
                    if (ret) {
                        var balancepro = Number(ret);
                        dotsconn.methods.lockpro(address+"",dq.huobi[index]['hyue']+"").call((error,ret)=>{
                            if (ret) {
                                var lockpro = Number(ret);
                                var numa = Number(dq.huobi[index]['num']);
                                dq.huobi[index]['je'] = (balancepro / (10**numa)).toFixed(2);
                                dq.huobi[index]['sdje'] = (lockpro/ (10**numa)).toFixed(2);
                                index = index+1;
                                listajax();
                            }
                        });
                    }
                });
            }

            listajax();
        },

        tixianajax(){
            if (this.huobi[this.hbindex]['je'] < Number(this.je)) {
                Notify({ type: 'danger', message: '提款金额不能大于可提额度' });
                return;
            }
            Toast.loading({
                message: '正在提款中...'
            });
            var dq = this;
            var lx_time = "";
            //执行提款操作
            var dotsconn = new web3.eth.Contract(dotsapi,'0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            var tk_je = dq.huobi[dq.hbindex]['je'] - Number(dq.je);
            var numa = Number(dq.huobi[dq.hbindex]['num']);
            dotsconn.methods.withdraw(dq.huobi[dq.hbindex]['hyue']+"",(Number(dq.je)*(10**numa))+"").send({
                from:address
            },(error,ret)=>{
                if (ret) {
                    tik_lunxun();
                }
            });

            function tik_lunxun() {
                dotsconn.methods.balancepro(address+"",dq.huobi[dq.hbindex]['hyue']+"").call((error,ret)=>{
                    if (ret) {
                        var balancepro = Number(ret) / (10**numa);
                        if (balancepro == tk_je) {
                            Toast.clear();
                            clearTimeout(lx_time);
                            Dialog.alert({
                                title: '提示',
                                message: '提款成功！',
                            }).then(() => {
                                window.location.reload();
                            });
                        }else{
                            lx_time = setTimeout(() => {
                                tik_lunxun();
                            }, 3000);
                        }
                    }
                });
            }
        }
    }
}
</script>