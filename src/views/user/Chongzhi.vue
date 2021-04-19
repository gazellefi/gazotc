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



</style>
<template>
    <div class="chongzhi">
        <van-nav-bar
            title="充值中心"
            right-text=""
            left-arrow
            :fixed="true"
            :placeholder="true"
            z-index="99"
            @click-left="goback"
        />
        
        <div class="czhiview">
            <div class="czhiview_form">
                <div class="czhiview_form_hblist">
                    <div class="czhiview_form_hblist_t">选择货币</div>
                    <div class="czhiview_form_hblist_ul">
                        <div class="czhiview_form_hblist_item" v-for="(li,index) in hbilist" :key="index" @click="hbindex = index" :class="hbindex == index ? 'ac':''">{{li.title}}</div>
                    </div>
                </div>
                <div class="czhiview_form_shurk">
                    <div class="czhiview_form_shurk_t">充值金额</div>
                    <div class="czhiview_form_shurk_input">
                        <div class="czhiview_form_shurk_input_l">{{ hbilist[hbindex].title }}</div>
                        <el-input placeholder="请输入内容" v-model="je"></el-input>
                    </div>
                </div>

                <div class="czhiview_form_czhi">
                    <van-button type="primary" block @click="chongzhi">充 值</van-button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { Notify,Dialog,Toast  } from 'vant';
import Web3 from "web3";
import Web3Modal from "web3modal";

// import usdtapi from "../../api/usdt.json";
// import dotcapi from "../../api/dots.json";
// import wethapi from "../../api/weth.json";

import config from "../../config";

var hbilist = config['hbi'][config['key']];
var hbarr = [];
var i = 1;
for (const key in hbilist) {
    i++;
    hbarr.push({
        id:i,
        key:hbilist[key]['heyue'],
        abi:hbilist[key]['abi'],
        title:hbilist[key]['id'],
        num:hbilist[key]['num']
    });
}
var address = '';
var web3 = '';
export default {
    data(){
        return{
            hbilist:hbarr,
            hbindex:0,
            je:0,
            key:config['key']
        }
    },
    mounted(){
        Toast.setDefaultOptions('loading',{
            forbidClick:false,
            closeOnClickOverlay:false,
            duration:0,
            overlay:true
        });
        if (this.$route.query.title) {
            for (let index = 0; index < this.hbilist.length; index++) {
                if (this.hbilist[index]['title'] == this.$route.query.title) {
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
        async function webinit() {
            const providerOptions = {
                /* See Provider Options Section */
            };
            const web3Modal = new Web3Modal({
                // network: "mainnet",
                // cacheProvider: true,
                providerOptions,
            });
            var provider = await web3Modal.connect();
            console.log('aaaaaaaaaaaaa', provider)
            web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)
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
            }
        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
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
                power = Number(power);
                //幂数大于小数点后面的数字位数时，后面加0
                for (var i = 0; i <= power - subres.length; i++) {
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
        async hbczhi(){
            console.log("充值定位")
            //火币充值专用
            Toast.loading({
                message: '加载中...'
            });
            var dqyue = 0;
            var dq = this;
            var Testconn = new web3.eth.Contract(config['hbi'][config['key']]['Test']['abi'],config['hbi'][config['key']]['Test']['heyue']);
            var doctconn = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'],config['hyue'][config['key']]['dotc']['heyue']);
            //判断充值wth或者test
            if (this.hbilist[this.hbindex]['title'] == 'WHT') {
                Toast.clear();
                Notify({ type: 'warning', message: 'WHT暂不支持充值！' });
                return;
            }else if (this.hbilist[this.hbindex]['title'] == 'Test'){
                var balanceOf = await Testconn.methods.balanceOf(address).call();
                if (Number(balanceOf) < this.getFNum(Number(this.je) * (10**6))) {
                    Toast.clear();
                    Notify({ type: 'warning', message: 'Test资产余额不足！' });
                    return;
                }
                //获取当前余额
                dqyue = await doctconn.methods.balancepro(address,config['hbi'][config['key']]['Test']['heyue']).call();
                //查询授权余额
                var sqyue = await Testconn.methods.allowance(address,config['hyue'][config['key']]['dotc']['heyue']).call();
                if (Number(sqyue) >= Number(this.je) * (10**6)) {
                    //直接充值
                    chongzhiajax();
                }else{
                    var cznum = this.getFNum((Number(this.je) * (10**6))* 100);
                    console.log(web3)
                    const accounts = await web3.eth.getAccounts()
                    console.log(accounts)
                    Testconn.methods.approve(config['hyue'][config['key']]['dotc']['heyue'],cznum).send({
                        from:address
                    },(err,ret)=>{
                        console.log(err)
                        if (ret) {
                            //轮询查询是否授权成功
                            Testconnlx(cznum);
                        }else{
                            Toast.clear();
                            Notify({ type: 'warning', message: '请点击同意！' });
                        }
                    });
                }
            }

            //轮询检测是否授权成功
            function Testconnlx(cznum) {
                Testconn.methods.allowance(address,config['hyue'][config['key']]['dotc']['heyue']).call((err,ret)=>{
                    if (ret) {
                        if (Number(ret) >= cznum) {
                            chongzhiajax();
                        }else{
                            setTimeout(() => {
                                Testconnlx(cznum);
                            }, 3000);
                        }
                    }
                });
            }
            //是否充值成功
            function Testconnczlx() {
                doctconn.methods.balancepro(address,config['hbi'][config['key']]['Test']['heyue']).call((err,ret)=>{
                    if (ret) {
                        var isje = (Number(dq.je) * (10**6)) + Number(dqyue);
                        if (Number(ret) >= isje) {
                            Toast.clear();
                            Dialog.alert({
                                title: '充值成功',
                                message: '您好，您已成功充值'+ dq.je +' '+ dq.hbilist[dq.hbindex]['title'] +'',
                            }).then(() => {
                                
                            });
                        }else{
                            setTimeout(() => {
                                Testconnczlx();
                            }, 3000);
                        }
                    }
                });
            }

            //充值
            function chongzhiajax() {
                    var cznumb  = dq.getFNum((Number(dq.je) * (10**6)));
                    console.log(cznumb)
                    var zictype = config['hbi'][config['key']]['Test']['heyue']
                    console.log(zictype)
                    doctconn.methods.deposit(zictype, cznumb).send({
                        from:address
                    },(err,ret)=>{
                        if (ret) {
                            //轮询查询是否授权成功
                            Testconnczlx();
                        }else{
                            Toast.clear();
                            Notify({ type: 'warning', message: '请点击同意！' });
                        }
                    });
            }

        },
        chongzhi(){
            if (this.je <= 0) {
                Notify({ type: 'warning', message: '金额不能小于1' });
                return;
            }
            if (this.key == 'huobi' && this.hbilist[this.hbindex]['title'] == 'WHT' || this.hbilist[this.hbindex]['title'] == 'Test' || this.hbilist[this.hbindex]['title'] == 'WETH') {
                this.hbczhi();
                return;
            }
            // if (this.key == 'huobi' &&  this.hbilist[this.hbindex]['title'] == 'USDT') {
            //     Notify({ type: 'warning', message: 'USDT暂不支持充值！' });
            //     return;
            // }

            Toast.loading({
                message: '加载中...'
            });
            var usdtconn = new web3.eth.Contract(config['hbi'][config['key']]['USDT']['abi'],config['hbi'][config['key']]['USDT']['heyue']);
            var wethconn = this.key == 'huobi' ? '':new web3.eth.Contract(config['hbi'][config['key']]['WETH']['abi'],config['hbi'][config['key']]['WETH']['heyue']);
            var doctconn = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'],config['hyue'][config['key']]['dotc']['heyue']);
            var dq = this;
            var usdtlxtime = "";
            var usdt_yue = 0;
            //开始充值 监测授权余额 
            if (this.hbilist[this.hbindex]['title'] == 'USDT') {
                //查询USDT初始余额
                doctconn.methods.balancepro(address+"","0xa71EdC38d189767582C38A3145b5873052c3e47a").call((err,ret)=>{
                    if (ret) {
                        usdt_yue = Number(ret) / (10**18);
                        usdtconn.methods.balanceOf(address+"").call((errb,retb)=>{
                            if (retb) {
                                var balanceOf = Number(retb) / (10**18);
                                if (balanceOf < Number(dq.je)) {
                                    Toast.clear();
                                    Dialog.alert({
                                        title: '警告',
                                        message: 'USDT余额不足！',
                                    }).then(() => {
                                    // on close
                                    });
                                    return;
                                }else{
                                    get_usdt_shouquan();
                                }
                            }
                        });
                    }
                });
            }else if (this.hbilist[this.hbindex]['title'] == 'WETH') {
                //查询USDT初始余额
                doctconn.methods.balancepro(address+"","0x23D58bd73136888ffAa3fDE672FC41870E928AA3").call((err,ret)=>{
                    if (ret) {
                        usdt_yue = Number(ret) / (10**18);
                        wethconn.methods.balanceOf(address+"").call((errb,retb)=>{
                            if (retb) {
                                var balanceOf = Number(retb) / (10**18);
                                if (balanceOf < Number(dq.je)) {
                                    Toast.clear();
                                    Dialog.alert({
                                        title: '警告',
                                        message: 'WETH余额不足！',
                                    }).then(() => {
                                    // on close
                                    });
                                    return;
                                }else{
                                    get_weth_shouquan();
                                }
                            }
                        });
                    }
                });
            }

            //提交充值
            function chongzhiajax() {
                Toast.loading({
                    message: '正在充值中...'
                });
                var zictype = dq.hbilist[dq.hbindex]['title'] == 'USDT' ? '0xa71EdC38d189767582C38A3145b5873052c3e47a':'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F';
               
                var num = dq.hbilist[dq.hbindex]['title'] == 'USDT' ? 18:18;
                var cznum = dq.getFNum((Number(dq.je) * (10**num)));
                console.log("充值中")
                doctconn.methods.deposit(zictype,cznum+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        chongzhi_lx();
                    }
                });
            }

            function chongzhi_lx() {
                var num = dq.hbilist[dq.hbindex]['title'] == 'USDT' ? 18:18;
                var zictype = dq.hbilist[dq.hbindex]['title'] == 'USDT' ? '0xa71EdC38d189767582C38A3145b5873052c3e47a':'0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F';
                doctconn.methods.balancepro(address+"",zictype).call((err,ret)=>{
                    if (ret) {
                        var balancepro = Number(ret) / (10**num);
                        if (balancepro >= (usdt_yue+Number(dq.je))) {
                            Toast.clear();
                            clearTimeout(usdtlxtime);
                            Dialog.alert({
                                title: '充值成功',
                                message: '您好，您已成功充值'+ dq.je +' '+ dq.hbilist[dq.hbindex]['title'] +'',
                            }).then(() => {
                                
                            });

                        }else{
                            usdtlxtime = setTimeout(() => {
                                chongzhi_lx();
                            }, 3000);
                        }
                    }
                });
            }
            
            // ============= weth ===============
            function get_weth_shouquan() {
                wethconn.methods.allowance(address+"","0xc25eFa9c0052856e4e4B713a180649b8c088a913").call((err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        var allowance = Number(ret) / (10**18);
                        if (allowance >= Number(dq.je)) {
                            //执行充值
                            chongzhiajax();
                        }else{
                            set_weth_shouquan();
                        }
                    }
                });
            }
            function set_weth_shouquan() {
                Toast.loading({
                    message: 'WETH余额授权中....',
                });
                var cznum = dq.getFNum(((Number(dq.je) * 100) * (10**18)));
                console.log("授权中")
                wethconn.methods.approve("0xc25eFa9c0052856e4e4B713a180649b8c088a913",cznum+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        weth_lunxun();
                    }
                    else{
                        console.log('GG');
                    }
                })
            }
            function weth_lunxun() {
                wethconn.methods.allowance(address+"","0xc25eFa9c0052856e4e4B713a180649b8c088a913").call((err,ret)=>{
                    if (ret) {
                        var allowance = Number(ret) / (10**18);
                        if (allowance >= Number(dq.je)) {
                            Toast.clear();
                            clearTimeout(usdtlxtime);
                            chongzhiajax();
                        }else{
                            usdtlxtime = setTimeout(() => {
                                weth_lunxun();
                            }, 3000);
                        }
                    }
                });
            }
            // ============= usdt ===============
            function get_usdt_shouquan() {
                usdtconn.methods.allowance(address+"","0x23D58bd73136888ffAa3fDE672FC41870E928AA3").call((err,ret)=>{
                    if (ret) {
                        Toast.clear();
                        var allowance = Number(ret) / (10**18);
                        if (allowance == 0) {
                            set_usdt_shouquan();
                        }else{
                            if (allowance >= Number(dq.je)) {
                                //执行充值
                                chongzhiajax();
                            }else{
                                dede_usdt_shouquan();
                            }
                        }
                    }
                });
            }

            //USDT清除0
            function dede_usdt_shouquan() {
                Toast.loading({
                    message: 'USDT授权余额不足，正在清零，请稍等...',
                });
                usdtconn.methods.approve("0x23D58bd73136888ffAa3fDE672FC41870E928AA3",0+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        usdt_lunxun(1);
                    }
                    else{
                        console.log('GG');
                    }
                })
            }
            //USDT设置
            function set_usdt_shouquan() {
                Toast.loading({
                    message: 'USDT余额重新授权中....',
                });
                usdtconn.methods.approve("0x23D58bd73136888ffAa3fDE672FC41870E928AA3",((Number(dq.je) * 100) * (10**18))+"").send({
                    from:address
                },(err,ret)=>{
                    if (ret) {
                        usdt_lunxun(2);
                    }
                    else{
                        console.log('GG');
                    }
                })
            }

            //usdt轮询
            function usdt_lunxun(c) {
                usdtconn.methods.allowance(address+"","0x23D58bd73136888ffAa3fDE672FC41870E928AA3").call((err,ret)=>{
                    if (ret) {
                        var allowance = Number(ret) / (10**18);
                        if (c == 1) {
                            if (allowance == 0) {
                                Toast.clear();
                                clearTimeout(usdtlxtime);
                                set_usdt_shouquan();
                            }else{
                                usdtlxtime = setTimeout(() => {
                                    usdt_lunxun(c);
                                }, 3000);
                            }
                        }else{
                            if (allowance >= Number(dq.je)) {
                                Toast.clear();
                                clearTimeout(usdtlxtime);
                                chongzhiajax();
                            }else{
                                usdtlxtime = setTimeout(() => {
                                    usdt_lunxun(c);
                                }, 3000);
                            }
                        }
                    }
                });
            }

        }
    }
}
</script>