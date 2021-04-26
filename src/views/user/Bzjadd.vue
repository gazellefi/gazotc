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
    .czhiview_form_shurk span{
        font-size: 14px;
        opacity: 0.5;
        padding-top: 15px;
    }

    .czhiview_form_czhi button{
        width: 49%;
    }


</style>
<template>
    <div class="chongzhi">
        <van-nav-bar
            title="保证金"
            right-text=""
            left-arrow
            :fixed="true"
            :placeholder="true"
            z-index="99"
            @click-left="goback"
        />
        
        <div class="czhiview">
            <div class="czhiview_form">
                <div class="czhiview_form_shurk">
                    <div class="czhiview_form_shurk_t">保证金</div>
                    <div class="czhiview_form_shurk_input">
                        <div class="czhiview_form_shurk_input_l">USDT</div>
                        <el-input placeholder="请输入内容" v-model="je"></el-input>
                    </div>
                    <span>当前保证金余额：{{ balancemar_num }}</span>
                    <span>USDT余额：{{ usdt_num }}</span>
                </div>

                <div class="czhiview_form_czhi">
                    <van-button type="primary" @click="chongzhi">转 入</van-button>
                    <van-button type="info" style="margin-left: 2%;" @click="zhuanchu">转 出</van-button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { Notify,Toast,Dialog  } from 'vant';
import Web3 from "web3";
import Web3Modal from "web3modal";

// import dotcapi from "../../api/dots.json";

import config from "../../config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var usdt_key = config['hbi'][config['key']]['USDT']['heyue'];
var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
var address = '';
var web3 = '';
export default {
    data(){
        return{
            je:0,
            balancemar_num:0,
            usdt_num:0
        }
    },
    mounted(){
        Toast.setDefaultOptions('loading',{
            forbidClick:false,
            closeOnClickOverlay:false,
            duration:0,
            overlay:true
        });

        //监测用户是否安装MASK
        if (typeof ethereum === "undefined") {
            alert("请先安装METAMASK插件");
        } else {
        //初始化
            webinit();
        }
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
                //查询该用户的保证金余额
                dq.balancemarajax();
            }
        }
    },

    
    methods:{
        goback(){
            this.$router.go(-1);
        },
        balancemarajax(){
            Toast.loading({
                message: '查询中...'
            });
            var dq = this;
            var index = 0;
            var doctconn = new web3.eth.Contract(dotc_abi,dotc_key);
            doctconn.methods.balancemar(address+"").call((err,ret)=>{
                if (ret) {
                    index++;
                    var balancemar = Number(ret) / (10**bzj_num);
                    dq.balancemar_num = balancemar;
                    if (index == 2) {
                        Toast.clear();
                    }
                }
            });
            doctconn.methods.balancepro(address+"",usdt_key).call((error,ret)=>{
                if (ret) {
                    index++;
                    var usdt_num = Number(ret) / (10**bzj_num);
                    dq.usdt_num = usdt_num;
                    if (index == 2) {
                        Toast.clear();
                    }
                }
            });
        },
        chongzhi(){
            if (this.je <= 0) {
                Notify({ type: 'warning', message: '请输入正确的金额' });
                return;
            }
            if (this.je > this.usdt_num) {
                Notify({ type: 'warning', message: '转入金额不能大于USDT余额' });
                return;
            }
            var dq = this;
            
            Toast.loading({
                message: '转入中...'
            });
            var lx_time = "";
            //开始转入保证金
            var doctconn = new web3.eth.Contract(dotc_abi,dotc_key);
            doctconn.methods.transfer("1",(Number(this.je)*(10**bzj_num))+"").send({
                from:address
            },(error,ret)=>{
                if (ret) {
                    zhuanru_lx();
                }
            });
            
            //轮询查询是否转入成功 
            function zhuanru_lx() {
                doctconn.methods.balancemar(address+"").call((err,ret)=>{
                    if (ret) {
                        var balancemar = Number(ret) / (10**bzj_num);
                        if (balancemar >= dq.balancemar_num + Number(dq.je)) {
                            Toast.clear();
                            clearTimeout(lx_time);
                            Dialog.alert({
                                title: '转入成功',
                                message: '已转入 '+ dq.je +' USDT到保证金',
                            }).then(() => {
                                 dq.balancemarajax();
                                 dq.je=0;
                            });
                        }else{
                            lx_time = setTimeout(() => {
                                zhuanru_lx();
                            }, 3000);
                        }
                    }
                });
            }
        },
        zhuanchu(){
            if (this.je <= 0) {
                Notify({ type: 'warning', message: '请输入正确的金额' });
                return;
            }
            if (this.je > this.balancemar_num) {
                Notify({ type: 'warning', message: '转出金额不能大于保证金余额余额' });
                return;
            }
            var dq = this;
            Toast.loading({
                message: '转出中...'
            });

            var lx_time = "";
            var doctconn = new web3.eth.Contract(dotc_abi,dotc_key);
            doctconn.methods.transfer("2",(Number(this.je)*(10**bzj_num))+"").send({
                from:address
            },(error,ret)=>{
                if (ret) {
                    zhuanchu_lx();
                }
            });

            //轮询查询是否转入成功 
            function zhuanchu_lx() {
                doctconn.methods.balancemar(address+"").call((err,ret)=>{
                    if (ret) {
                        var balancemar = Number(ret) / (10**bzj_num);
                        if (balancemar == dq.balancemar_num - Number(dq.je)) {
                            Toast.clear();
                            clearTimeout(lx_time);
                            Dialog.alert({
                                title: '转出成功',
                                message: '已转出 '+ dq.je +'',
                            }).then(() => {
                                 dq.balancemarajax();
                                 dq.je=0;
                            });
                        }else{
                            lx_time = setTimeout(() => {
                                zhuanchu_lx();
                            }, 3000);
                        }
                    }
                });
            }
        }
    }
}
</script>