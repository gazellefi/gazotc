<style>
    .hindex{
        width: 100%;
        float: left;
    }
    .hindex_view{
        width: 100%;
        height: 48px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    .hindex_view_ul{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 48px;
    }

    .hindex_view_ul_l{
        margin: 0 15px;
        font-size: 16px;
        opacity: 0.5;
    }
    .hindex_view_ul_l.ac{
        opacity: 1;
        color: rgb(11, 108, 253);
    }

    .hindex_view_b{
        width: 100%;
        float: left;
        background-color: rgb(245, 245, 245);
        display: flex;
        align-items: center;
    }

    .hindex_view_b_l{
        margin-right: auto;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .hindex_view_b_l_t{
        font-size: 36px;
        opacity: 0.6;
    }
    .hindex_view_b_l_msg{
        font-size: 14px;
        opacity: 0.5;
        padding-top: 15px;
    }

    .hindex_view_b_r{
        margin-right: auto;
        margin-left: auto;
        height: calc(100vh - (48px * 2) - 60px);
        overflow-y: scroll;
        margin-top: 30px;
        margin-bottom: 30px;
         box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .hindex_view_ul_r{
        margin-left: auto;
        padding-right: 15px;
        font-size: 14px;
        opacity: 0.5;
    }
    .hindex_view_ul_r:active{
        opacity: 1;
        color: rgb(1, 217, 255);
    }
</style>
<template>
    <div class="hindex">
        <div class="hindex_view">
            <div class="hindex_view_ul">
                <div class="hindex_view_ul_l anniucss" :class="cindex == 0 ? 'ac':''" @click="cindex = 0">
                    交易列表
                </div>
                <div class="hindex_view_ul_l anniucss" :class="cindex == 1 ? 'ac':''" @click="cindex = 1">
                    发布订单
                </div>
                
            </div>
        </div>

        <div class="hindex_view_b" v-if="cindex == 1">
            <div class="hindex_view_b_r hidden-xs-only">
                <Fabu />
            </div>
            <Fabu class="hidden-sm-and-up"/>
        </div>
        <div class="hindex_view_b hidden-xs-only" v-if="cindex == 0" style="margin-top: 10px;">
            <Ddlist />
        </div>
        <div class="hindex_view_c hidden-sm-and-up" v-if="cindex == 0" style="margin-top: 10px;">
            <Ddlist />
        </div>
    </div>
</template>
<script>
import Fabu from "../page/Fabu";
import Ddlist from "../page/Ddlist";
export default {
    components:{
        Fabu,Ddlist
    },
    data(){
        return{
            cindex:0
        }
    },
    created(){
        var dq = this;
        this.$Jt.$on('fabu_dd',()=>{
            dq.cindex = 1;
        });
    },
    methods:{
        openmairu(){
            this.cindex = 0;
        }
    }
}
</script>