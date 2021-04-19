<style>
    
    .ddlist_head{
        width: 100%;
        float: left;
        height: 50px;
    }
    .ddlist_head_kj{
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: center;
        /* width: 70%; */
        margin: auto;
    }
    .ddlist_head_kj_item{
        font-size: 16x;
        margin: 0 15px;
        color: rgb(201, 196, 196);
        height: 30px;
    }
    .ddlist_head_kj_item.ac{
        color: rgb(0, 0, 0);
        position: relative;
        height: 30px;
    }
    .ddlist_head_kj_item.ac::after{
        content: "";
        position: absolute;
        bottom: 0;
        /* width: 50px; */
        height: 2px;
        background-color: rgb(40, 209, 68);
        left: 0;
        right: 0;
        border-radius: 5px;
    }

    .ddlist_view{
        width: 70%;
        margin: auto;
    }
    .ddlist_vieww{
        width: 100%;
        float: left;
    }
</style>
<template>
    <div class="ddlist">
        <div class="ddlist_head">
            <div class="ddlist_head_kj">
                <div align=center class="ddlist_head_kj_item anniucss" :class="acindex == 0 ? 'ac':''" style="margin-left: 0;" @click="acindex = 0">法币发布</div>
                <div align=center class="ddlist_head_kj_item anniucss" :class="acindex == 1 ? 'ac':''" @click="acindex = 1">法币交易</div>
                <div align=center class="ddlist_head_kj_item anniucss" :class="acindex == 2 ? 'ac':''"  @click="acindex = 2">币币发布</div>
                <div align=center class="ddlist_head_kj_item anniucss" :class="acindex == 3 ? 'ac':''" @click="acindex = 3">币币交易</div>
            </div>
        </div>
        <div class="ddlist_view hidden-xs-only">
            <DdglFabu  v-if="acindex == 0" />
            <DdglJyi  v-if="acindex == 1" />
        </div>
        <div class="ddlist_vieww hidden-sm-and-up">
            <DdglFabu  v-if="acindex == 0" />
            <DdglJyi  v-if="acindex == 1" />
        </div>
        <div>
            <CCDdglFabu v-if="acindex == 2" />
            <CCDdglJyi v-if="acindex == 3" />
        </div>
    </div>
</template>
<script>
import DdglFabu from "../page/ddgl/DdglFabu";
import DdglJyi from "../page/ddgl/DdglJyi";

import CCDdglFabu from "../page/ddgl/ccdd/DdglFabu";
import CCDdglJyi from "../page/ddgl/ccdd/DdglJyi";


export default {
    components:{
        DdglFabu,DdglJyi,CCDdglFabu,CCDdglJyi
    },
    data(){
        return{
            acindex:0
        }
    },
}
</script>