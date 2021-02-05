<style>
    /* html,body{
        background-color: #ddd;
    } */
    .beizhua{
        width: 375px;
        background-color: #fff;
        height: 100vh;
        margin-left: calc((100vw - 375px) / 2);
    }
    .view{
        width: calc(100% - 40px);
        margin: 0 20px;
        float: left;
    }

    .view_page_a{
        width: 100%;
        float: left;
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }
    .view_page_a_t{
        padding: 15px 0;
        font-size: 14px;
        opacity: 0.5;
    }

    div.view_page_a_item{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        margin: 10px 0;
    }
    .view_page_a_item_left{
        min-width: 80px;
        max-width: 100px;
    }
    .view_page_a_item_reft{
        font-size: 14px;
        opacity: 0.8;
        overflow: hidden;
    }
    .view_page_a_item_reft p{
        width: 90%;
    }
</style>
<template>
    <div class="beizhua">
        <van-nav-bar
            title="联系信息"
            right-text="刷新"
            left-arrow
            :fixed="true"
            :placeholder="true"
            z-index="99"
            @click-left="urlgo"
            @click-right="infoinit"
        />

        <div class="view">
            <div class="view_page_a" style="margin-top: 0px">
                <div class="view_page_a_t">联络信息</div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        账户：
                    </div>
                    <div class="view_page_a_item_reft">
                        <p>
                            {{ user ? user : address}}
                        </p>
                    </div>
                </div>
                <div class="view_page_a_item" v-if="!user">
                    <div class="view_page_a_item_left">
                        类型：
                    </div>
                    <div class="view_page_a_item_reft">
                        <el-select v-model="lxkey" placeholder="请选择" style="opacity:1;">
                            <el-option
                                v-for="item in clist"
                                :key="item.key"
                                :label="item.title"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="view_page_a_item"  v-if="!user">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="inputval">
                        </el-input>
                </div>
                <div class="view_page_a_item"  v-if="!user">
                    <el-button type="primary" @click="setbeizhu">修改</el-button>
                </div>
            </div>


            <div class="view_page_a">
                <div class="view_page_a_t">资料展示</div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        昵称：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.nc?beizhu_arr.nc:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        团队名称：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.team_beizhu?beizhu_arr.team_beizhu:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        仲裁昵称：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.zc_beizhu?beizhu_arr.zc_beizhu:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        电话：
                    </div>
                    <div class="view_page_a_item_reft">
                         {{ beizhu_arr.dh?beizhu_arr.dh:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        微信：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.wx?beizhu_arr.wx:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        QQ：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.qq?beizhu_arr.qq:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        微博：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.wb?beizhu_arr.wb:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        今日头条：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.jrtt?beizhu_arr.jrtt:'暂未设置' }}
                    </div>
                </div>
                <div class="view_page_a_item">
                    <div class="view_page_a_item_left">
                        商家备注：
                    </div>
                    <div class="view_page_a_item_reft">
                        {{ beizhu_arr.beizhu?beizhu_arr.beizhu:'暂未设置' }}
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import { Notify,Dialog,Toast  } from 'vant'
import Beizhujson from "../../conn/Beizhu.json"

import Web3 from "web3"
import Web3Modal from "web3modal"
import config from '../../config';

let Base64 = require('js-base64').Base64;



//全局变量
var web3 = "";
var address = "";
var  ethereum = window.ethereum;


export default {
    mounted(){
        if (Beizhujson) {
            this.clist = Beizhujson;
        }
        //监测用户是否安装MASK
        if (typeof ethereum === 'undefined') {
            web3 =  new Web3(config['hyue'][config['key']]['Url']);
        }else{
            //初始化
            webinit();
        }
        var dq = this;
        if (dq.$route.query.user) {
            dq.user = dq.$route.query.user;
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
                dq.address = address;
                //读取用户默认备注
                var beizhucon = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'], config['hyue'][config['key']]['dotc']['heyue']);
                for (let index = 0; index < Beizhujson.length; index++) {
                    beizhucon.methods.message(dq.user ? dq.user:address+"",Beizhujson[index]['id']).call((err,ret)=>{
                        if (ret) {
                            dq.beizhu_arr[Beizhujson[index]["key"]] = Base64.decode(ret);
                        }
                    });
                }

                //查询仲裁备注
                var zc_conn = new web3.eth.Contract(config['hyue'][config['key']]['ArbOne']['abi'], config['hyue'][config['key']]['ArbOne']['heyue']);
                for (let index = 0; index < Beizhujson.length; index++) {
                    if (Beizhujson[index]['id'] == 8) {
                        zc_conn.methods.message(dq.user ? dq.user:address+"",0+"").call((err,ret)=>{
                            if (ret) {
                                dq.beizhu_arr[Beizhujson[index]["key"]] = Base64.decode(ret);
                            }
                        });
                        break;
                    }
                }
            }   
        }
    },
    data(){
        return{
            user:'',
            clist:[],
            lxkey:'team_beizhu',

            inputval:'',

            address:'',

            beizhu_arr:{
                nc:'',
                team_beizhu:'',
                zc_beizhu:'',
                dh:'',
                wx:'',
                qq:'',
                wb:'',
                jrtt:'',
                beizhu:''
            }
        }
    },
    watch:{
        lxkey(e){
            this.inputval = this.beizhu_arr[e];
        },
        'beizhu_arr.team_beizhu'(e){
            for (let index = 0; index < this.clist.length; index++) {
                if(this.clist[index]['key'] == 'nc'){
                    this.inputval = e;
                    break;
                }
            }
        }
    },
    methods:{
        infoinit(){
            var dq = this;
            //读取用户默认备注
            var beizhucon = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'], config['hyue'][config['key']]['dotc']['heyue']);
            for (let index = 0; index < Beizhujson.length; index++) {
                beizhucon.methods.message(address+"",Beizhujson[index]['id']).call((err,ret)=>{
                    if (ret) {
                        dq.beizhu_arr[Beizhujson[index]["key"]] = Base64.decode(ret);
                    }
                });
            }
        },
        
        setbeizhu(){
            if(!this.inputval){
                Notify({ type: 'warning', message: '请输入内容' });
                return;
            }
            var loading = Toast.loading({
                message: '修改中...',
                closeOnClick: false,
                closeOnClickOverlay:false,
                loadingType: 'spinner',
                getContainer:"body",
                duration:0
            });
            if (this.lxkey == 'zc_beizhu') {
                var zcbeizhucon = new web3.eth.Contract(config['hyue'][config['key']]['ArbOne']['abi'], config['hyue'][config['key']]['ArbOne']['heyue']);
                zcbeizhucon.methods.commun(0+"",Base64.encode(this.inputval+"")).send({
                    from:address
                },(err,ret)=>{
                    if (ret && !err) {
                        loading.clear();
                        Dialog.alert({
                            title: '提示',
                            message: '资料修改成功！',
                        }).then(() => {
                            // on close
                        });
                    }else{
                        loading.clear();
                        Dialog.alert({
                            title: '提示',
                            message: '资料修改失败！',
                        }).then(() => {
                            // on close
                        });
                    }
                    
                });
                return;
            }
            //提交修改
            var lxkey = 0;
            for (let index = 0; index < this.clist.length; index++) {
                if (this.clist[index]['key'] == this.lxkey) {
                    lxkey = this.clist[index]['id'];
                    break;
                }
            }
            var beizhucon = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'], config['hyue'][config['key']]['dotc']['heyue']);
            beizhucon.methods.commun(lxkey+"",Base64.encode(this.inputval+"")).send({
                from:address
            },(err,ret)=>{
                if (ret && !err) {
                    loading.clear();
                    Dialog.alert({
                        title: '提示',
                        message: '资料修改成功！',
                    }).then(() => {
                        // on close
                    });
                }else{
                    loading.clear();
                    Dialog.alert({
                        title: '提示',
                        message: '资料修改失败！',
                    }).then(() => {
                        // on close
                    });
                }
                
            });
        },
        urlgo(){
            this.$router.go(-1);
        }
    }
}
</script>