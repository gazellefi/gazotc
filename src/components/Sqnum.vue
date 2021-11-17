<style>
.shouquan {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 555555;
  background-color: #fff;
  overflow: hidden;
}

.shouquan_head {
  width: 100%;
  height: 45px;
  background-color: #fff;
  line-height: 45px;
  float: left;
  text-align: center;
  color: #000;
  font-size: 14px;
}

.shouquan_view {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.shouquan_view_item {
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
}
.shouquan_view_item_t {
  font-size: 16px;
  opacity: 0.8;
}
.shouquan_view_item_msg {
  font-size: 14px;
  opacity: 0.5;
  padding-top: 5px;
}
.shouquan_view_item_msg i {
  float: right;
}
</style>
<template>
  <div class="shouquan">
    <div class="shouquan_head">Authorization center</div>
    <div class="shouquan_view">
      <div class="shouquan_view_item">
        <div class="shouquan_view_item_t">
          Step 2: set amount
        </div>
        <div class="shouquan_view_item_msg">
          <span v-if="jecode == 1">Detecting</span>
          <span v-if="jecode == 2">correct</span>
          <span v-if="jecode == 3">Setting amount</span>

          <i v-if="jecode != 2" class="el-icon-loading"></i>
          <i v-if="jecode == 2" class="el-icon-check"></i>
        </div>
      </div>
      <div class="shouquan_view_item">
        <div class="shouquan_view_item_t">
          Step 2: clear quantity
        </div>
        <div class="shouquan_view_item_msg">
          <span v-if="numcode == 1">Detecting</span>
          <span v-if="numcode == 2">complete</span>
          <span v-if="numcode == 3">Setting</span>

          <i v-if="numcode != 2" class="el-icon-loading"></i>
          <i v-if="numcode == 2" class="el-icon-check"></i>
        </div>
      </div>
      <div class="shouquan_view_item">
        <div class="shouquan_view_item_t">
          Step 3: set quantity
        </div>
        <div class="shouquan_view_item_msg">
          <span v-if="numcodeb == 1">Please wait patiently for the second step to be completed!</span>
          <span v-if="numcodeb == 2">correct</span>
          <span v-if="numcodeb == 3">Setting</span>

          <i v-if="numcodeb != 2" class="el-icon-loading"></i>
          <i v-if="numcodeb == 2" class="el-icon-check"></i>
        </div>
      </div>

      <div class="shouquan_view_item" style="margin-top:30px">
        <!-- <van-button type="primary" :loading="jiance_an" v-if="bindex == 0">开始检测</van-button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      numcodeb: 1,
      numcode: 1,
      jecode: 1
    }
  }
}
</script>