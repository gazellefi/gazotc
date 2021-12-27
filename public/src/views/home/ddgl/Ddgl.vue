
<template>
  <div class="ddlist">
    <div class="ddlist_head">
      <div class="ddlist_head_kj">
        <div align=center class="ddlist_head_kj_item one anniucss" :class="acindex == 0 ? 'ac':''" style="margin-left: 0;" @click="acindex = 0">Legal currency release</div>
        <div align=center class="ddlist_head_kj_item two anniucss" :class="acindex == 1 ? 'ac':''" @click="acindex = 1">Legal currency transaction</div>
        <div align=center class="ddlist_head_kj_item three anniucss" :class="acindex == 2 ? 'ac':''" @click="acindex = 2">Currency release</div>
        <div align=center class="ddlist_head_kj_item four anniucss" :class="acindex == 3 ? 'ac':''" @click="acindex = 3">Currency transaction</div>
      </div>
      <div class="right">4564</div>
    </div>
    <div class="ddlist_view hidden-xs-only">
      <DdglFabu v-if="acindex == 0" />
      <DdglJyi v-if="acindex == 1" />
    </div>
    <div class="ddlist_vieww hidden-sm-and-up">
      <DdglFabu v-if="acindex == 0" />
      <DdglJyi v-if="acindex == 1" />
    </div>
    <template>
      <CCDdglFabu v-if="acindex == 2" />
      <CCDdglJyi v-if="acindex == 3" />
    </template>
  </div>
</template>
<script>
import DdglFabu from "./DdglFabu";
import DdglJyi from "./DdglJyi";

import CCDdglFabu from "./ccdd/DdglFabu";
import CCDdglJyi from "./ccdd/DdglJyi";


export default {
  components: {
    DdglFabu, DdglJyi, CCDdglFabu, CCDdglJyi
  },
  data() {
    return {
      acindex: 0
    }
  },
}
</script>

<style lang="less" scoped>
.ddlist_head {
  width: 100%;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.ddlist_head_kj {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  .one {
    background: linear-gradient(#82bcfc, #0f79f1);
  }
  .two {
    background: linear-gradient(#9df6a2, #0be618);
  }
  .three {
    background: linear-gradient(#f38a7c, #e6240b);
  }
  .four {
    background: linear-gradient(#a077f3, #5a08ff);
  }
}
.ddlist_head_kj_item {
  font-size: 16x;
  color: #fff;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 4px;
}
.ddlist_head_kj_item.ac {
}

.ddlist_view {
  width: 70%;
  margin: auto;
}
.ddlist_vieww {
  width: 100%;
}
</style>