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
      First round arbitrator rules
    </div>
    <div class="jygz_msg">
      1. The subject matter of the first round of arbitration may be assets or deposits;<br /><br />
      2. Both parties to the transaction shall invite no more than m arbitrators, but only one arbitrator shall vote in favour;<br /><br />
      3. The arbitration fee must be paid in proportion when inviting;<br /><br />
      4. Each arbitrator can only be invited by one party of the same order;<br /><br />
      5. The arbitrator can only make a positive vote for the invited party, and no vote is required for the negative party, nor can he vote for the other party;<br /><br />
      6. When voting, the arbitrator shall meet four conditions at the same time:<br /><br />
      1) Invited by one of the order participants;<br /><br />
      2) The number of arbitrators shall be within n digits;<br /><br />
      3) The balance of the deposit is greater than the balance required by the arbitration order;<br /><br />
      4) For cases that did not participate in the second round of arbitration, the deposit was not frozen;<br /><br />
      7. The corresponding deposit will be deducted from the balance of the arbitrator's deposit during voting;<br /><br />
      8. After one party makes an affirmative arbitration, the other party shall make the arbitration result within the specified time;<br /><br />
      9. After the expiration, if only one party makes an affirmative arbitration, that party will win;<br /><br />
      10. The arbitrator of the winning party may receive the arbitration fee paid by the invited party;<br /><br />
      11. If the losing party also pays the arbitration fee, it will compensate the winning party;<br /><br />
      12. If both parties have made affirmative arbitration within the specified time, the second round of arbitration shall be entered;
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
