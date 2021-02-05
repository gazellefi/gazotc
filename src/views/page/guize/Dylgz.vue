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
            第一轮仲裁员规则
        </div>
        <div class="jygz_msg">
            1. 第一轮仲裁的标的可能是资产，也可能是保证金；<br /><br />
            2. 交易双方分别邀请仲裁员不超过m位，但只需一位仲裁员投出赞成票；<br /><br />
            3. 邀请时必选按比例缴纳仲裁费；<br /><br />
            4. 每位仲裁员只能被同一个订单的一方邀请；<br /><br />
            5. 仲裁员只能做出被邀请方肯定的投票,否定不需要投票,也不能为对方投票；<br /><br />
            6. 投票时，仲裁员需同时满足4个条件：<br /><br />
            1）被该订单交易方之一邀请；<br /><br />
            2）仲裁员编号在n位以内；<br /><br />
            3）保证金余额大于仲裁订单要求的余额；<br /><br />
            4）没有参与第二轮仲裁的案子，保证金未被冻结；<br /><br />
            7. 投票时会从仲裁员的保证金余额中扣除相应保证金；<br /><br />
            8. 在一方做出肯定仲裁后，另一方需在规定的时间内做出仲裁结果；<br /><br />
            9. 过期后，如果只有一方做出肯定仲裁，则该方获胜；<br /><br />
            10. 获胜一方的仲裁员可获得被邀请方缴纳的仲裁费；<br /><br />
            11. 如果失败一方也缴纳了仲裁费，则将弥补给获胜方；<br /><br />
            12. 如果在规定的时间内，双方都做出了肯定的仲裁，则进入第二轮仲裁；
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
