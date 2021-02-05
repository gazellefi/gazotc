<style>
    .ccdotc{
        width: 100%;
        height: auto;
        background-color: #fff;
    }
    .ccdotc_header{
        width: auto;
        display: flex;
        height: 45px;
        align-items: center;
        margin: 0 35px;
        border-bottom: 1px solid #ddd;
    }
    .ccdotc_header_item{
        margin-left: 30px;
        font-size: 16px;
    }
    .ccdotc_header_item.ac{
        color: rgb(11, 108, 253);
        font-size: 16px;
    }
</style>
<template>
    <div class="ccdotc">
        <div class="ccdotc_header">
            <div class="ccdotc_header_item" :class="index == 0 ? 'ac':''"  style="margin-left: 0;" @click="index = 0">交易列表</div>
            <div class="ccdotc_header_item" :class="index == 1 ? 'ac':''" @click="index = 1">发布订单</div>
        </div>
        <div class="ccdotc_view">
            <List v-if="index == 0"/>
            <Fabu v-if="index == 1"/>
        </div>
    </div>
</template>
<script>
import List from "./List";
import Fabu from "./Fabu";
export default {
    data(){
        return{
            index:0
        }
    },
    components:{
        List,Fabu
    }
}
</script>