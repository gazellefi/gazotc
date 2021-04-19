<style>
    body,html{
        background-color: #fff;
    }

    .lqcsb{
        width: 100%;
        margin: auto;
    }
    .lqcsb_w{
        width: 375px;
        margin: auto;
    }
    .lqcsb_w_top{
        border-bottom: 1px solid #eee;
    }
    .lqcsb_w_ul{
        width: 100%;
        float: left;
        display: flex;
        flex-direction: column;
    }
    .lqcsb_w_ul_t{
        padding: 15px 15px;
        font-size: 14px;
        opacity: 0.7;
    }
    .lqcsb_w_ul_item{
        display: flex;
        margin: 10px 0;
    }
    .lqcsb_w_ul_item_l{
        margin-right: auto;
        margin-left: 15px;
    }
    .lqcsb_w_ul_item_r{
        margin-left: auto;
        text-align: right;
        margin-right: 15px;
    }
    .lqcsb_w_ul_item.temsg{
        margin-left: 15px;
        font-size: 14px;
        opacity: 0.8;
    }
    .qianbao_view_head_item_li_num{
        display: flex;
        padding: 2.5px 15px;
        font-size: 28px;
        color: rgb(67, 57, 207);
        align-content: center;
    }
    .qianbao_view_head_item_li{
        display: flex;
        padding: 2.5px 15px;
        color: rgb(67, 57, 207);
        align-items: center;
    }
</style>
<template>
    <div class="lqcsb">
        <van-nav-bar
            class="lqcsb_w_top"
            title="领取测试币"
            left-arrow
            :fixed="true"
            :placeholder="true"
            z-index="55"
            :safe-area-inset-top="true"
            @click-left="goback"
        />

        <div class="lqcsb_w" v-if="key == 'huobi'">
            <div class="lqcsb_w_ul">
                <div class="lqcsb_w_ul_t">请选择资产</div>
                <div class="lqcsb_w_ul_item">
                    <div class="lqcsb_w_ul_item_l">
                        <el-select v-model="zckey" placeholder="请选择">
                            <el-option
                            v-for="item in zclisthb"
                            :key="item['id']"
                            :label="item['id']"
                            :value="item['heyue']">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lqcsb_w_ul_item_r">
                        <van-button type="primary" @click="lqajax" :loading="jiazai">领 取</van-button>
                    </div>
                </div>
                <div class="lqcsb_w_ul_item temsg">
                    如领取测试币失败<br /> 请联系微信:lulusun2016
                </div>
                <div class="qianbao_view_head_item_li" style="opacity: 1.5;">你的测试币余额(Test)：</div>               
                <div class="qianbao_view_head_item_li_num">{{ user_sc.toFixed(2) }}</div>
            </div>
        </div>
        <div class="lqcsb_w" v-if="key != 'huobi'">
            <div class="lqcsb_w_ul">
                <div class="lqcsb_w_ul_t">请选择资产</div>
                <div class="lqcsb_w_ul_item">
                    <div class="lqcsb_w_ul_item_l">
                        <el-select v-model="zckey" placeholder="请选择">
                            <el-option
                            v-for="item in zclist"
                            :key="item['id']"
                            :label="item['id']"
                            :value="item['key']">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lqcsb_w_ul_item_r">
                        <van-button type="primary" @click="lqajax" :loading="jiazai">领 取</van-button>
                    </div>
                </div>
                <div class="lqcsb_w_ul_item temsg">
                    领取测试币需要账号内有以太坊Rinkeby测试网ETH！<br /> 如未有，请联系微信:lulusun2016
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import lquapi from "../../api/lqu.json";
import lquapihb from "../../abi/huobi/lqabi.json";

import { Dialog,Notify  } from 'vant';
import config from "../../config";

import Web3 from "web3";
import Web3Modal from "web3modal";

var test_abi = config['hyue'][config['key']]['test']['abi'];
var test_key = config['hyue'][config['key']]['test']['heyue'];

var address;
var web3;
var testonn;
export default {
    data(){
        return{
            key:config['key'],
            jiazai:false,
            user_sc:0,
            zclisthb:[
                {
                    id:"Test",
                    key:"0x7465737400000000000000000000000000000000000000000000000000000000",
                    heyue:"0x489B639BC2D68bB6D6f21d8Ee0f3bdbf41fE1C88",
                    num:10000
                }
            ],
            zclist:[
                {
                    id:'USDT',
                    key:'0xEc8053A77D432A08b2C59363D98eCA903a12df5a',
                    num:10000
                },{
                    id:'WETH',
                    key:'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',
                    num:10
                },{
                    id:'GAZ',
                    key:'0x429E01aC4534682a5f3dDc186334d9160460348E',
                    num:3000
                }
            ],
            zckey:config['key'] != 'huobi' ? '0xEc8053A77D432A08b2C59363D98eCA903a12df5a':'0x489B639BC2D68bB6D6f21d8Ee0f3bdbf41fE1C88'
        }
    },
    created(){
        //监测用户是否安装MASK
        if (typeof ethereum === "undefined") {
            console.log('a');
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
                providerOptions,
            });
            var provider = await web3Modal.connect();
            web3 = new Web3(provider);
            if (web3 && provider) {
                address = provider.selectedAddress;
                testonn = new web3.eth.Contract(test_abi, test_key);
                dq.getsczc();
                //其他钱包使用测试网络
                // if (window.ethereum.isImToken || window.ethereum.isMetaMask || window.ethereum.isHbWallet) {
                //     var wlcode = window.ethereum.networkVersion;
                //     //imtoken只能查看 无法操作 出发是ETF主网
                //     if (window.ethereum.isImToken) {
                //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
                //     }
                //     //检测是否是火币钱包
                //     if (window.ethereum.isHbWallet) {
                //         address = window.ethereum.address;
                //         web3.setProvider(config["hyue"]['huobi']["Url"]);
                //     }
                //     //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
                //     if (window.ethereum.isMetaMask && wlcode != 4) {
                //         web3.setProvider(config["hyue"][config["key"]]["Url"]);
                //     }
                // }else{
                //     web3.setProvider(config["hyue"][config["key"]]["Url"]);
                // }
            }
        }
    },
    methods:{
         async getsczc(){
            var scze = await testonn.methods.balanceOf(address).call();
            this.user_sc = scze/(10**6);
        },
        goback(){
            this.$router.go(-1);
        },
        lqajax(){
            var dq = this;
            var lquconn;
            var ktitle = '';
            var knum = 0;

            if (this.key == 'huobi') {
                lquconn = new web3.eth.Contract(lquapihb,"0xA03A26810b4091dB521d13379bc7551FB807C9C1");
                for (let index = 0; index < dq.zclisthb.length; index++) {
                    if (dq.zclisthb[index]['heyue'] == dq.zckey) {
                        ktitle = dq.zclisthb[index]['id'];
                        knum = dq.zclisthb[index]['num'];
                        break;
                    }
                }
            }else{
                lquconn = new web3.eth.Contract(lquapi,"0x4648336c4C2Bf8671FdeD5bF7B8F97c5fCD3a0A4");
                for (let index = 0; index < dq.zclist.length; index++) {
                    if (dq.zclist[index]['key'] == dq.zckey) {
                        ktitle = dq.zclist[index]['id'];
                        knum = dq.zclist[index]['num'];
                        break;
                    }
                }
            }

            var timestamp = Date.parse( new Date() ).toString().substr(0,10);
                    
            
            


            dq.jiazai = true;


            async function ispan_time() {
                var time = await lquconn.methods.tim(dq.zckey+"",address+"").call();
                
                if (timestamp - time >= 3600) {
                   lqzicanajax();
                }else{
                    dq.jiazai = false;
                    var fen = 3600 - (timestamp - time);
                    Dialog.alert({
                        title: '提示',
                        message: '您已领取过了！,请在'+ (fen / 60) +'分钟后重新领取！',
                    });
                }
            }
            
            ispan_time();

            function lqzicanajax() {
                lquconn.methods.faucet(dq.zckey+"").send({
                    from:address
                },(err,ret)=>{
                    console.log(err)
                    dq.jiazai = false;
                    if (ret) {
                        var msg = knum+'个'+ktitle+'已发送到您的账户！';
                        Dialog.alert({
                            title: '提示',
                            message: msg,
                        });
                    }else{
                        Notify({ type: 'warning', message: '请同意授权！' });
                    }
                });
            }
        }
    }
}
</script>