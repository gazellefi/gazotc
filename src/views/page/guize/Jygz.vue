<style>
    .jygz{
        width: calc(375px - 30px);
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 15px;
    }

    .jygz_t{
        font-size: 16px;
        opacity: 0.8;
    }

    .jygz_msg{
        padding: 10px 0;
        font-size: 18px;
    }
</style>
<template>
    <div class="jygz" :style="{'width':isphone ? ' calc(375px - 30px)':' calc(1200px - 30px)'}">
        <div class="jygz_t">
            交易规则
        </div>
        <div class="jygz_msg">
            1.交易者可以充值任何资产到智能合约，但只有通过社区治理批准的资产才能发布订单；<br /><br />
            2.除了交易中的资产和保证金处于冻结状态不能提现外，其余资产可以自由提现；<br /><br />
            3.商家发布订单时，不需要保证金，但保证金余额不足，用户拍单时有可能失败；<br /><br />
            4.商家保证金冻结比例为20%，后期可以根据社区治理修改比例；<br /><br />
            5.用户冻结的保证金比例由商家设置；<br /><br />
            6.商家发布买入订单，不需要先充值资产；<br /><br />
            7.商家发布卖出订单，需要先充值，并冻结相应数量的资产；<br /><br />
            8.商家可以修改订单中的交易数量和单价；<br /><br />
            9.资产和保证金只能在交易双方之间划转；<br /><br />
            10.撤单只能由付款方触发，撤单合约不收取手续费；<br /><br />
            11.放币只能由收款方触发，放币时合约将扣除手续费；<br /><br />
            12.如付款方未付款或卖出方没放币，可以申请仲裁；<br /><br />
            13.保证金在放币3天之后释放，双方达成协议可以提前释放；<br /><br />
            14.保证金释放之前，任何一方可以触发暂停释放；<br /><br />
            15.为防止恶意暂停，用户触发暂停时保证金需要在10%以上；<br /><br />
            16.如收款方资金冻结，双方可以协商保证金赔偿比例，不能达成协议，可以申请仲裁。
        </div>
    </div>
</template>
<script>
export default {
    created(){
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
        //判断
        if(isMobile){
            this.isphone = true;
        }else{
            this.isphone = false;
        }
    },
    data(){
        return{
            isphone:false
        }
    }
}
</script>
