<style>
    html,body{
        background-color: #ddd; 
    }
    .fabu{
        width: 375px;
        /* float: left; */
        margin: auto;
        background-color: #fff;
    }
    .fabu_head{
        width: calc(100% - 30px);
        float: left;
        height: 70px;
        font-size: 16px;
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .fabu_head i{
        margin-left: auto;
        font-size: 20px;
    }

    .fabu_tab{
        width: calc(100% - 30px);
        float: left;
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 15px;
    }
    .fabu_tab_item{
        margin-left: 30px;
        opacity: 0.5;
        transition: all .3s;
    }
    .fabu_tab_item.ac{
        opacity: 1;
        color:aquamarine;
        font-size: 22px;
    }

    /* 表单 */
    .add{
        width: 100%;
        margin-top: 30px;
        float: left;
    }

    .add_form{
        width: calc(100% - 30px);
        display: flex;
        flex-direction: column;
        margin: 0 15px;
    }

    .add_form_item{
        display: flex;
        flex-direction: column;
        margin-top: 15px;
    }
    .add_form_item_input{
        margin-top: 10px;
    }
    .add_form_item_input textarea{
        margin-top: 10px;
    }

    .add_form_item_xuanze{
        display: flex;
        flex-direction: row;
    }

    .add_form_item.xz{
        margin-left: 15px;
    }

    .errormsg{
        font-size: 14px;
        color: #f33;
    }

    .add_form_item_input_p{
        padding-top: 10px;
        font-size: 12px;
        color: #409EFF;
    }
</style>
<template>
    <div class="fabu">
        <div class="fabu_head">发布委托单 <i class="el-icon-close" @click="fanhui"></i></div>
        <div class="fabu_tab">
            <div class="fabu_tab_item" style="margin-left: 0px;" @click="m = '0x6275790000000000000000000000000000000000000000000000000000000000'" 
            :class="m == '0x6275790000000000000000000000000000000000000000000000000000000000' ? 'ac':''">购买</div>
            <div class="fabu_tab_item" @click="m = '0x73616c6500000000000000000000000000000000000000000000000000000000'"
            :class="m == '0x73616c6500000000000000000000000000000000000000000000000000000000' ? 'ac':''">出售</div>
        </div>
        <!-- 表单 -->
        <div cclass="add">
        <div class="add_form">
            <div class="add_form_item_xuanze">
                <div class="add_form_item xz" style="margin-left: 0;">
                    <div class="add_form_item_input">
                        <el-select v-model="pro" placeholder="请选择">
                            <el-option
                                v-for="item in data['huobi']"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="add_form_item xz">
                    <div class="add_form_item_input">
                        <el-select v-model="fi" placeholder="请选择">
                            <el-option
                                v-for="item in data['fabi']"
                                :key="item.id"
                                :label="item.id"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">购买单价</div>
                <div class="add_form_item_input">
                    <el-input placeholder="请输入内容" v-model="form.dj" @blur="jsbzj">
                        <template slot="append">{{ fi }}</template>
                    </el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.dj">
                   单价不能为空
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">数量</div>
                <div class="add_form_item_input">
                    <el-input  placeholder="请输入内容" v-model="form.num" @blur="jsbzj">
                        <template slot="append">{{pro}}</template>
                    </el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.zcye">
                   资产余额不足
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.num">
                   数量不能为空
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">商家保证金</div>
                <div class="add_form_item_input">
                    <el-input  placeholder="" v-model="form.sjbzj" disabled></el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.sjbzj">
                   保证金余额不足
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">最低量</div>
                <div class="add_form_item_input">
                    <el-input placeholder="请输入内容" v-model="form.zd_num">
                        <template slot="append">{{pro}}</template>
                    </el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.zd_num">
                   最低量不能为空
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">最高量</div>
                <div class="add_form_item_input">
                    <el-input placeholder="请输入内容" v-model="form.zg_num">
                        <template slot="append">{{pro}}</template>
                    </el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.zg_num">
                   最高量不能为空
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">用户保证金</div>
                <div class="add_form_item_input">
                    <el-input placeholder="请输入内容" v-model="form.user_bzj">
                        <template slot="append">%</template>
                    </el-input>
                </div>
                <div class="add_form_item_input errormsg" v-if="isform.user_bzj">
                   保证金不能为空
                </div>
            </div>
            <div class="add_form_item">
                <div class="add_form_item_t">委托备注</div>
                <div class="add_form_item_input">
                    <el-input 
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="30"
                    disabled
                    v-model="form.beizhu"
                    show-word-limit>
                    </el-input>
                </div>
                <p class="add_form_item_input_p" @click="beizhuxiugai">修改备注2</p>
            </div>
            <el-button type="primary" style="margin-top: 30px;" @click="tijiao">提交</el-button>
            <br />
        </div>
    </div>
    </div>
</template>
<script>
import data from "../../conn/fabu.json";
import dotsapi from "../../api/dots.json";
import usdtapi from "../../api/usdt.json";
import wethapi from "../../api/weth.json";

import Web3 from "web3"
import Web3Modal from "web3modal"
let Base64 = require('js-base64').Base64;
import { Dialog,Toast  } from 'vant';

//公共变量
var web3 = "";
var  ethereum = window.ethereum;

export default {
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
                dq.user['user'] = provider.selectedAddress;
            }
        }
    },
    mounted(){
        Toast.setDefaultOptions({
            overlay:true,
            forbidClick:true,
            closeOnClick:false,
            closeOnClickOverlay:false,
            duration:0,
            getContainer:'body'
        });
    },
    data(){
        return{
            m:'0x6275790000000000000000000000000000000000000000000000000000000000',
            pro:data['huobi'][0]['id'],
            fi:data['fabi'][0]['id'],
            data:data,


            //用户数据
            user:{
                user:'',
                balanceof:0,
                sq_balanceof:0,
            },

            hbi:{
                pri:0, //保证金单价
                mara:0,
                uni:0,
                rati:0,
                one:0
            },
            
            //验证
            isform:{
                dj:false,
                zcye:false,
                num:false,
                sjbzj:false,
                zd_num:false,
                zg_num:false,
                user_bzj:false
            },
            //表单
            form:{
                dj:'',
                num:'',

                sjbzj:'',
                zd_num:'',
                zg_num:'',
                user_bzj:'',
                beizhu:''
            },

            sq_code:0, //0默认 1余额大于1 2直接授权
        }
    },
    //数据监听
    watch:{
        'm'(){
            //初始化表单
            this.form ={
                dj:'',
                num:'',

                sjbzj:'',
                zd_num:'',
                zg_num:'',
                user_bzj:'',
                beizhu:''
            }
            this.isform ={
                dj:false,
                zcye:false,
                num:false,
                sjbzj:false,
                zd_num:false,
                zg_num:false,
                user_bzj:false
            }
        },
        'user.user'(e){
            var dq = this;
            //读取会员资料
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            var usdtconn = new web3.eth.Contract(usdtapi, '0xEc8053A77D432A08b2C59363D98eCA903a12df5a');
            dotsconn.methods.message(e+"",'6').call((err,ret)=>{
                if (ret) {
                    dq.form.beizhu = Base64.decode(ret);
                }     
            });
            //查询授权余额
            usdtconn.methods.allowance(e+"",'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
                if (ret) {
                    dq.user['sq_balanceof'] = ret;
                }
            });
            //查询资产余额
            usdtconn.methods.balanceOf(e+"").call((err,ret)=>{
                if (ret) {
                    dq.user['balanceof'] = ret;
                }     
            });

            //获取查询条件所需数据
            dotsconn.methods.pri().call((err,ret)=>{
                if (ret) {
                    dq.hbi['pri'] = ret;
                }     
            });
            dotsconn.methods.mara().call((err,ret)=>{
                if (ret) {
                    dq.hbi['mara'] = ret;
                }     
            });

            dotsconn.methods.pros('0x7573647400000000000000000000000000000000000000000000000000000000').call((err,ret)=>{
                if (ret) {
                    dq.hbi['uni'] = ret['uni'];
                    dq.hbi['rati'] = ret['rati'];
                    dq.hbi['one'] = ret['one'];
                }     
            });
        },
        'form.dj'(e){
            if (!e || e == 0) {
                this.isform['dj'] = true;
            }else{
                this.isform['dj'] = false;
            }
            var result = e.indexOf(".");
            if(result != -1) {
                var eaa = e.substr((e.indexOf(".")+1),e.length);
                if (eaa.length > 2) {
                    var ea = parseFloat(e);
                    this.form.dj = ea.toFixed(2);
                }
            }
            if (e && this.form.num) {
                this.jsbzj();
            }
        },
        'form.num'(e){
            if (!e || e == 0) {
                this.isform['num'] = true;
            }else{
                this.isform['num'] = false;
            }
            var result = e.indexOf(".");
            console.log(e);
            if(result != -1) {
                var eaa = e.substr((e.indexOf(".")),e.length);
                if (eaa.length > 2) {
                    var ea = parseFloat(e);
                    this.form.num = ea.toFixed(2);
                }
            }
            if (e && this.form.dj) {
                this.jsbzj();
            }
        },
        'form.zd_num'(e){
            if (!e || e == 0) {
                this.isform['zd_num'] = true;
            }else{
                this.isform['zd_num'] = false;
            }
            var result = e.indexOf(".");
            if(result != -1) {
                var eaa = e.substr((e.indexOf(".")+1),e.length);
                if (eaa.length > 2) {
                    var ea = parseFloat(e);
                    this.form.zd_num = ea.toFixed(2);
                }
            }
        },
        'form.zg_num'(e){
            if (!e || e == 0) {
                this.isform['zg_num'] = true;
            }else{
                this.isform['zg_num'] = false;
            }
            var result = e.indexOf(".");
            if(result != -1) {
                var eaa = e.substr((e.indexOf(".")+1),e.length);
                if (eaa.length > 2) {
                    var ea = parseFloat(e);
                    this.form.zg_num = ea.toFixed(2);
                }
            }
        },
        'form.user_bzj'(e){
            if (!e || e == 0) {
                this.isform['user_bzj'] = true;
            }else{
                this.isform['user_bzj'] = false;
            }
            var result = e.indexOf(".");
            if(result != -1) {
                var eaa = e.substr((e.indexOf(".")+1),e.length);
                if (eaa.length > 2) {
                    var ea = parseFloat(e);
                    this.form.user_bzj = ea.toFixed(2);
                }
            }
        }
    },
    methods:{
        //数字保留两位数
        getnumsing(num){
            let numStr = num.toString()
            let index = numStr.indexOf('.')
            let result
            if (index != -1) {
                result = numStr.slice(0, index + 3);
            }else{
                result = num;
            }
            
            return Number(result);
        },
        tijiao(){
            //判断是否填写完整
            if (!this.form['dj']) {
                return;
            }
            if (!this.form['num']) {
                return;
            }
            if (!this.form['zd_num']) {
                return;
            }
            if (!this.form['zg_num']) {
                return;
            }
            if (!this.form['user_bzj']) {
                return;
            }

            //判断是否满足条件
            if (this.isform['zcye']) {
                Dialog.alert({
                    title: '提示',
                    message: '余额不足，无法提交订单',
                });
                return;
            }
            if (this.isform['sjbzj']) {
                Dialog.alert({
                    title: '提示',
                    message: '保证金不足，无法提交订单',
                });
                return;
            }
            
            Toast.loading({
                message: '提交中...',
                forbidClick: true,
                loadingType: 'spinner',
            });
            //判断授权余额 根据货币查询对应授权余额
            if (this.pro  == 'USDT') {
                this.usdtappend();
            }else
            if (this.pro  == 'WETH') {
                this.wethappend();
            }
            
            
            
        },

        //usdt提交订单
        usdtappend(){
            var dq = this;
            //轮询时间
            var lunxun_time = '';
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            //监听订单发布结果
            dotsconn.events.Merch("",(err,ret)=>{
                //结果
                if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
                    Toast.clear();
                    dq.sq_code = 0;
                    //判断是购买还是出售
                    if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的购买订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }else{
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的出售订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    
                }
            });
            dotsconn.events.Taker("",(err,ret)=>{
                //结果
                if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
                    Toast.clear();
                    dq.sq_code = 0;
                    //判断是购买还是出售
                    if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的购买订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }else{
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的出售订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    
                }
            });

            var usdtconn = new web3.eth.Contract(usdtapi, '0xEc8053A77D432A08b2C59363D98eCA903a12df5a');

            //发布订单
            function addajax() {
                Toast.loading({
                    message: '请确认提交...',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                var postpro = '0x7573647400000000000000000000000000000000000000000000000000000000';
                var postfi = '';
                var postd = '';
                var posta = '';
                var postb = '';
                var postc = '';

                for (let index = 0; index < data['fabi'].length; index++) {
                    if (data['fabi'][index]['id'] == dq.fi+"") {
                        postfi = data['fabi'][index]['key'];
                        break;
                    }
                }

                if (dq.form['dj'].indexOf('.') != -1) {
                    postd = dq.form['dj'] * 100;
                }else{
                    postd = dq.form['dj'];
                }

                posta = parseFloat(dq.form['num']) * (10**6);
                postb = parseFloat(dq.form['zd_num']) * (10**6);
                postc = parseFloat(dq.form['zg_num']) * (10**6);

                dotsconn.methods.setMerch(
                    postpro,
                    dq.m,
                    posta+"",
                    postb+"",
                    postc+"",
                    postfi,
                    postd+"",
                    (dq.form['user_bzj']*(10**4))+""
                ).send({
                    from:dq.user['user']
                },(err,ret)=>{
                    if (!ret) {
                        Toast.clear();
                        Toast({
                            message: '请点击授权！',
                            icon: 'cross',
                            duration:2000
                        });
                    }else{
                        Toast.clear();
                        Toast.loading({
                            message: '发布订单中...',
                            forbidClick: true,
                            loadingType: 'spinner',
                        });
                    }
                });
            }
            //授权余额
            function setusdtyue() {
                var sqyue = dq.getFNum(((dq.form['sjbzj'] * (10**6)) * 100));
                usdtconn.methods.approve('0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',sqyue+"").send({
                    from:dq.user['user']
                },(err,ret)=>{
                    if (!ret) {
                        Toast.clear();
                        Toast({
                            message: '请点击授权！',
                            icon: 'cross',
                            duration:2000
                        });
                    }else{
                        dq.sq_code = 2;
                        usdtlunxun();
                    }
                });
            }
            //授权余额清0
            function dedeusdtyue() {
                usdtconn.methods.approve('0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',"0").send({
                    from:dq.user['user']
                },(err,ret)=>{
                    if (!ret) {
                        Toast.clear();
                        Toast({
                            message: '请点击授权！',
                            icon: 'cross',
                            duration:2000
                        });
                    }else{
                        dq.sq_code = 1;
                        usdtlunxun();
                    }
                });
            }
            
            //监测授权
            function sqjc() {
                usdtconn.methods.allowance(dq.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
                if (ret) {
                    Toast.clear();
                    if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                        //购买
                        if (ret >= (parseFloat(dq.form['sjbzj']) * (10 ** 6))) {
                            addajax();
                        }else{
                            if (ret > 0) {
                                Toast.loading({
                                    message: '保证金授权余额不足，需先清零再授权...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                dedeusdtyue();
                            }else{
                                Toast.loading({
                                    message: '保证金授权余额不足，请确认授权...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                setusdtyue();
                            }
                        }
                    }else{
                        var jisuana = (parseFloat(dq.form['sjbzj']) + parseFloat(dq.form['num']));
                        if (ret >= jisuana) {
                            addajax();
                        }else{
                            if (ret > 0) {
                                Toast.loading({
                                    message: 'USDT授权余额不足，正在清零...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                dedeusdtyue();
                            }else{
                                Toast.loading({
                                    message: 'USDT授权余额不足，正在授权...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                setusdtyue();
                            }
                        }
                    }
                }
            });

            }
            //轮询查询
            function usdtlunxun() {
                usdtconn.methods.allowance(dq.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
                    if (ret) {
                        if (dq.sq_code == 2) {
                            if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                                if (ret >= (parseFloat(dq.form['sjbzj']) * (10 ** 6))) {
                                    clearTimeout(lunxun_time);
                                    Toast.clear();
                                        Toast({
                                            message: '保证金授权成功，请确认发布！',
                                            icon: 'success',
                                            duration:3000
                                        });
                                    setTimeout(()=>{
                                        addajax();
                                    },3000);
                                }else{
                                    lunxun_time = setTimeout(()=>{
                                        usdtlunxun();
                                    },3000);
                                }
                            }else{
                                var jisuana = (parseFloat(dq.form['sjbzj']) + parseFloat(dq.form['num']));
                                if (ret >= jisuana) {
                                    clearTimeout(lunxun_time);
                                    Toast.clear();
                                        Toast({
                                            message: 'USDT余额授权成功，请确认发布！',
                                            icon: 'success',
                                            duration:3000
                                        });
                                    setTimeout(()=>{
                                        addajax();
                                    },3000);
                                }else{
                                    lunxun_time = setTimeout(()=>{
                                        usdtlunxun();
                                    },3000);
                                }
                            }
                        }else{
                            if (dq.sq_code == 1) {
                                if (ret == 0 || ret == "0") {
                                    clearTimeout(lunxun_time);
                                    Toast.clear();
                                        Toast({
                                            message: '操作成功，重新授权USDT余额！',
                                            icon: 'success',
                                            duration:3000
                                        });
                                    setTimeout(()=>{
                                        Toast.loading({
                                            message: 'USDT授权余额不足，正在授权...',
                                            forbidClick: true,
                                            loadingType: 'spinner',
                                        });
                                        setusdtyue();
                                    },3000);
                                }else{
                                    lunxun_time = setTimeout(()=>{
                                        usdtlunxun();
                                    },3000);
                                }
                            }
                        }
                    }
                })
            }

            sqjc();
        },
        //weth提交订单
        wethappend(){
            var dq = this;
            var dotsconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
            var usdtconn = new web3.eth.Contract(usdtapi, '0xEc8053A77D432A08b2C59363D98eCA903a12df5a');

            var wheresqyue_time = '';
            //监听订单发布通知结果
            dotsconn.events.Merch("",(err,ret)=>{
                //结果
                if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
                    Toast.clear();
                    dq.sq_code = 0;
                    //判断是购买还是出售
                    if (dq.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的购买订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }else{
                        Dialog.alert({
                            title: '发布成功',
                            message: '您好，您的出售订单发布成功，您的订单号是：'+ ret['returnValues']['order'] +'',
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }
            });
            var wethconn = new web3.eth.Contract(wethapi, '0x2D24EdEcbE4B3C158702782FA55F063e9BE823Bb');
            if (this.m == '0x6275790000000000000000000000000000000000000000000000000000000000') {
                //m买
                isbzj();
            }else{
                wethconn.methods.allowance(this.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        var jisuana = (parseFloat(dq.form['sjbzj']));
                        if ((ret / (10**18)) >= jisuana) {
                            isbzj();
                        }else{
                            Toast.loading({
                                message: 'WETH授权余额不足,正在授权...',
                                forbidClick: true,
                                loadingType: 'spinner',
                            });
                            setwthyue();
                        }
                    }
                });
            }

            //监测保证金
            function  isbzj() {
                usdtconn.methods.allowance(dq.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        if (ret >= (parseFloat(dq.form['sjbzj']) * (10 ** 6))) {
                            addajax();
                        }else{
                            if (ret > 0) {
                                Toast.loading({
                                    message: '保证金授权余额不足，正在清零...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                dedeusdtyue();
                            }else{
                                Toast.loading({
                                    message: '保证金授权余额不足，正在授权...',
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                });
                                setusdtyue();
                            }
                        }
                    }
                });
            }
            //授权weth余额
            // function setwthyue() {
            //     Toast.loading({
            //         message: 'WETH授权余额中，请稍后...',
            //         forbidClick: true,
            //         loadingType: 'spinner',
            //     });
            //     var sqyue = dq.getFNum(((dq.form['sjbzj'] * (10**18)) * 100));
            //     console.log(sqyue);
            //     var endnum = dq.getFNum(dq.getFNum(sqyue+""));
            //     wethconn.methods.approve('0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',endnum+"").send({
            //         from:dq.user['user']
            //     },(err,ret)=>{
            //         if (!ret) {
            //             Toast.clear();
            //             Toast({
            //                 message: '请点击授权！',
            //                 icon: 'cross',
            //                 duration:2000
            //             });
            //         }else{
            //             dq.sq_code = 2;
            //             setwthyue_cx();
            //         }
            //     });
            // }

            //轮询weth余额
            // function setwthyue_cx() {
            //     wethconn.methods.allowance(dq.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
            //         if (ret) {
            //             var jisuana = (parseFloat(dq.form['sjbzj']));
            //             if ((ret / (10**18)) >= jisuana) {
            //                 clearTimeout(wheresqyue_time);
            //                 dq.sq_code = 1;
            //                 Toast.clear();
            //                 Toast.loading({
            //                     message: '请稍等...',
            //                     forbidClick: true,
            //                     loadingType: 'spinner',
            //                 });
            //                 isbzj();
            //             }else{
            //                 wheresqyue_time = setTimeout(()=>{
            //                     setwthyue_cx();
            //                 },3000);
            //             }
            //         }
            //     });
            // }

            //授权余额
            // function setusdtyue() {
            //     var sqyue = dq.getFNum(((dq.form['sjbzj'] * (10**18)) * 100));
            //     usdtconn.methods.approve('0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',sqyue+"").send({
            //         from:dq.user['user']
            //     },(err,ret)=>{
            //         console.log(ret);
            //         if (!ret) {
            //             Toast.clear();
            //             Toast({
            //                 message: '请点击授权！',
            //                 icon: 'cross',
            //                 duration:2000
            //             });
            //         }else{
            //             dq.sq_code = 2;
            //             whereusdt_sq();
            //         }
            //     });
            // }

            //授权余额清0
            // function dedeusdtyue() {
            //     usdtconn.methods.approve('0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F',"0").send({
            //         from:dq.user['user']
            //     },(err,ret)=>{
            //         if (!ret) {
            //             Toast.clear();
            //             Toast({
            //                 message: '请点击授权！',
            //                 icon: 'cross',
            //                 duration:2000
            //             });
            //         }else{
            //             dq.sq_code = 1;
            //             whereusdt_sq();
            //         }
            //     });
            // }
            
            //授权余额轮询查询
            // function whereusdt_sq() {
            //     usdtconn.methods.allowance(dq.user['user'],'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F').call((err,ret)=>{
            //         if (ret) {
            //             if (ret >= (parseFloat(dq.form['sjbzj']) * (10 ** 6))) {
            //             //清除定时器
            //                 clearTimeout(wheresqyue_time);
            //                 if (dq.sq_code == 2) {
            //                     Toast({
            //                         message: '保证金授权成功，请确认发布！',
            //                         icon: 'success',
            //                         duration:3000
            //                     });
            //                     setTimeout(()=>{
            //                         addajax();
            //                     },3000);
            //                 }
            //             }else{
            //                 if (dq.sq_code == 1 && ret == 0) {
            //                     //清零成功 提示 发起授权
            //                     Toast({
            //                         message: '操作成功，重新授权USDT余额！',
            //                         icon: 'success',
            //                         duration:3000
            //                     });
            //                     setTimeout(()=>{
            //                         setusdtyue();
            //                     },3000);
            //                 }else{
            //                     wheresqyue_time = setTimeout(()=>{
            //                         whereusdt_sq();
            //                     },3000);
            //                 }
                            
            //             }
            //         }
            //     })
            // }

            //提交订单
            // function addajax() {
            //     Toast.loading({
            //         message: '发布订单中...',
            //         forbidClick: true,
            //         loadingType: 'spinner',
            //     });

            //     var postpro = '0x7765746800000000000000000000000000000000000000000000000000000000';
            //     var postfi = '';
            //     var postd = '';
            //     var posta = '';
            //     var postb = '';
            //     var postc = '';

            //     for (let index = 0; index < data['fabi'].length; index++) {
            //         if (data['fabi'][index]['id'] == dq.fi+"") {
            //             postfi = data['fabi'][index]['key'];
            //             break;
            //         }
            //     }

            //     if (dq.form['dj'].indexOf('.') != -1) {
            //         postd = dq.form['dj'] * 100;
            //     }else{
            //         postd = dq.form['dj'];
            //     }

                

            //     posta = dq.getFNum(""+parseFloat(dq.form['num']) * (10**18));
            //     postb = dq.getFNum(""+parseFloat(dq.form['zd_num']) * (10**18));
            //     postc = dq.getFNum(""+parseFloat(dq.form['zg_num']) * (10**18));

            //     dotsconn.methods.setMerch(
            //         postpro,
            //         dq.m,
            //         posta+"",
            //         postb+"",
            //         postc+"",
            //         postfi,
            //         postd+"",
            //         dq.getFNum(""+(dq.form['user_bzj']*(10**4)))
            //     ).send({
            //         from:dq.user['user']
            //     },(err,ret)=>{
            //         if (!ret) {
            //             Toast.clear();
            //             Toast({
            //                 message: '请点击授权！',
            //                 icon: 'cross',
            //                 duration:2000
            //             });
            //         }
            //     });
            // }

        },
        //保证金计算
        jsbzj(){
            if (this.form['dj'] && this.form['num']) {
                var i_num = this.form['num'];
                var one = parseInt(this.hbi['one']);
                var uni = parseInt(this.hbi['uni']);
                var pri = parseInt(this.hbi['pri']);
                var mara = parseInt(this.hbi['mara']);
                if (this.pro == 'USDT') {
                    var jisuan = (mul(mul((i_num*one),uni),mara) / mul(pri,one) / (10**6)).toFixed(2);
                    this.form['sjbzj'] = jisuan;
                    if ((parseInt(this.user['balanceof']) / (10**6)) >= jisuan) {
                        this.isform['sjbzj'] = false;
                    }else{
                        this.isform['sjbzj'] = true;
                    }
                }else
                if (this.pro == 'WETH') {
                    var prosconn = new web3.eth.Contract(dotsapi, '0xc25eFa9c0052856e4e4B713a180649b8c088a913');
                    prosconn.methods.pros('0x7765746800000000000000000000000000000000000000000000000000000000').call((err,ret)=>{
                        if (ret) {
                            var i_num = this.form['num'];
                            var one = parseInt(ret['one']);
                            var uni = parseInt(ret['uni']);
                            var pri = parseInt(this.hbi['pri']);
                            var mara = parseInt(this.hbi['mara']);
                            var jisuan = (mul(mul((i_num*one),uni),mara) / mul(pri,one) / (10**5)).toFixed(2);
                            this.form['sjbzj'] = jisuan;
                            if ((parseInt(this.user['balanceof']) / (10**6)) >= jisuan) {
                                this.isform['sjbzj'] = false;
                            }else{
                                this.isform['sjbzj'] = true;
                            }
                        }     
                    });
                }
                var dq = this;
                //获取当前用户选择的资产进行查询 判断是买家与卖家
                if (this.m == '0x73616c6500000000000000000000000000000000000000000000000000000000') {
                    //出售
                    if (this.pro == 'USDT') {
                        var usdtconn = new web3.eth.Contract(usdtapi, '0xEc8053A77D432A08b2C59363D98eCA903a12df5a');
                        usdtconn.methods.balanceOf(this.user['user']+"").call((err,ret)=>{
                        if (ret) {
                               var je = parseInt(ret) / (10**6);
                               var where = (i_num * parseInt(dq.form['dj']));
                               if (je >= where) {
                                   dq.isform['zcye'] = false;
                               }else{
                                   dq.isform['zcye'] = true;
                               }
                            }     
                        });
                    }else if (this.pro == 'WETH') {
                        var wethconn = new web3.eth.Contract(wethapi, '0x2D24EdEcbE4B3C158702782FA55F063e9BE823Bb');
                        wethconn.methods.balanceOf(this.user['user']+"").call((err,ret)=>{
                        if (ret) {
                                var je = parseInt(ret) / (10**18);
                                var where = (i_num * dq.form['dj']);
                                if (je >= where) {
                                   dq.isform['zcye'] = false;
                                }else{
                                   dq.isform['zcye'] = true;
                                }
                            }     
                        });
                    }else{
                        console.log('其他货币');
                    }
                }
            }
            function mul(x,y){
                var z = x * y;
                return z;
            }
            
        },
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
        beizhuxiugai(){
            this.$router.push('./beizhu');
        },
        fanhui(){
            this.$router.go(-1);
        }
    }
}
</script>