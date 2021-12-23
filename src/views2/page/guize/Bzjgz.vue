<style>
.jygz {
  width: calc(375px - 30px);
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.jygz_t {
  font-size: 16px;
  opacity: 0.8;
}

.jygz_msg {
  padding: 10px 0;
  font-size: 18px;
}
</style>
<template>
  <div class="jygz" :style="{'width':isphone ? ' calc(375px - 30px)':' calc(1200px - 30px)'}">
    <div class="jygz_t">
      Margin rules
    </div>
    <div class="jygz_msg">
      1. In stage 1, the mainstream stable currency is used for the transaction margin and the platform currency is used for the arbitration margin gaz;<br /><br />
      2. Ethereum and wave field use usdt as security deposit, and Huo coin ecological chain uses husd as security deposit;<br /><br />
      3. The deposit needs to be recharged before transfer;<br /><br />
      4. The deposit will be automatically frozen when the order is taken;<br /><br />
      5. The insufficient available balance of any party's margin will lead to the failure of bidding;<br /><br />
    </div>
  </div>
</template>
<script>
export default {
  created() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
    //判断
    if (isMobile) {
      this.isphone = true;
    } else {
      this.isphone = false;
    }
  },
  data() {
    return {
      isphone: false
    }
  }
}
</script>
