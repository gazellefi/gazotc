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
            第二轮仲裁规则
        </div>
        <div class="jygz_msg">
            1. 进入第二轮仲裁不单独仲裁资产，一次性仲裁资产和保证金（资产已释放除外）；<br /><br />
            2. 第二轮仲裁同时对第一轮的仲裁行为进行仲裁，如第一轮仲裁员作恶，可以扣除保证金；<br /><br />
            3. 第二轮仲裁采取报名制，需同时具有以下条件<br /><br />
            1）仲裁员编号在n位以内；<br /><br />
            2）保证金余额大于仲裁订单要求的余额；<br /><br />
            3）没有参与其他第二轮仲裁的案子，保证金未被冻结；<br /><br />
            4. 最多可以有k人参与报名；<br /><br />
            5. 报名结束后，随机数最大的j名仲裁员进入仲裁团；<br /><br />
            6. 同一个订单一个地址只能报名一次；<br /><br />
            7. 报名入选者的保证金余额被临时冻结，直到仲裁结束；<br /><br />
            8. 仲裁团共同商议仲裁方案，并对方案投票；<br /><br />
            9. 投票权重大于半数的方案获得通过；<br /><br />
            10. 通过的方案需被交易双方之一采纳，如在规定时间内未被采纳，将解散仲裁团，重启第二轮仲裁；<br /><br />
            12. 重启后，原来仲裁员的保证金解冻，可以再次报名；<br /><br />
            13. 方案被一方采纳后，在规定时间内，另一方或其他任何相关利益方有反对意见，可通过社区治理撤销该方案；<br /><br />
            14. 社区经过投票，决定维持原判还是发回重审，如果维持原判，方案即为终审，链上治理结束，如果发回重审，原仲裁团解散，重启第二轮仲裁；  
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
