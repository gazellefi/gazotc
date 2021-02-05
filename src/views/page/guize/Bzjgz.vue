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
            保证金规则
        </div>
        <div class="jygz_msg">
            1.第1阶段，交易保证金用主流稳定币，仲裁保证金用平台币gaz；<br /><br />
            2.以太坊和波场用usdt作保证金，火币生态链用husd作保证金；<br /><br />
            3.保证金需要先充值再划转；<br /><br />
            4.保证金在拍单时自动冻结；<br /><br />
            5.任何一方保证金可用余额不足，将导致拍单失败；<br /><br />
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
