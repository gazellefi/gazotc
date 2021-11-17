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
      Second round arbitration rules
    </div>
    <div class="jygz_msg">
      1. Entering the second round of arbitration, assets will not be arbitrated separately, but one-time arbitration assets and deposit (except asset released);<br /><br />
      2. The second round of arbitration shall arbitrate the acts of the first round of arbitration at the same time. If the arbitrators in the first round commit crimes, the deposit may be deducted;<br /><br />
      3. The registration system shall be adopted for the second round of arbitration, and the following conditions shall be met at the same time<br /><br />
      1) The number of arbitrators shall be within n digits;<br /><br />
      2) The balance of the deposit is greater than the balance required by the arbitration order;<br /><br />
      3) The deposit has not been frozen in other cases that have not participated in the second round of arbitration;<br /><br />
      4. Up to K people can sign up;<br /><br />
      5. After registration, the j arbitrators with the largest random number shall enter the arbitration panel;<br /><br />
      6. The same order can only be registered once at one address;<br /><br />
      7. The deposit balance of the applicants will be temporarily frozen until the end of arbitration;<br /><br />
      8. The arbitration panel shall jointly discuss and vote on the arbitration scheme;<br /><br />
      9. The scheme with voting weight greater than half is adopted;<br /><br />
      10. The adopted scheme shall be adopted by one of the transaction parties. If it is not adopted within the specified time, the arbitration panel will be dissolved and the second round of arbitration will be restarted;<br /><br />
      12. After the restart, the deposit of the original arbitrator is unfrozen and can be registered again;<br /><br />
      13. After the scheme is adopted by one party, if the other party or any other interested party has objections within the specified time, the scheme can be revoked through community governance;<br /><br />
      14. After voting, the community decides whether to maintain the original judgment or send it back for retrial. If the original judgment is maintained, the scheme will be final, and the chain governance will end. If it is sent back for retrial, the original arbitration panel will be dissolved and the second round of arbitration will be restarted;
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
