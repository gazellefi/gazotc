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
            仲裁员资格
        </div>
        <div class="jygz_msg">
            1. 仲裁员需要先报名，并向合约抵押不低于系统最低要求的保证金；<br /><br />
            2. 报名成功后，合约按顺序返回一个编号,只有前n位才能参与仲裁；<br /><br />
            3. 保证金不可以添加，一个地址只能同时拥有一个编号；<br /><br />
            4. 参与仲裁会释放部分保证金，保证金也可以提现；<br /><br />
            5. 参与第二轮仲裁会暂时冻结保证金直到仲裁结束；<br /><br />
            6. 保证金低于最低要求后，系统收回该地址编号；<br /><br />
            7. 空缺编号由该编号以后的第n位地址填补；<br /><br />
            8. 如果n位以后对应的地址为空，则由最后一位地址来填补；<br /><br />
            9. 如果有仲裁员作恶，社区可以提案罢免仲裁员资格。<br /><br />
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
