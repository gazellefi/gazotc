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
      Qualification of Arbitrators
    </div>
    <div class="jygz_msg">
      1. Arbitrators need to sign up first and pledge a deposit not less than the minimum requirement of the system to the contract;<br /><br />
      2. After successful registration, the contract will return a number in order,Only the top n can participate in arbitration;<br /><br />
      3. Deposit cannot be added. One address can only have one number at the same time;<br /><br />
      4. Participate in the Arbitration Commission to release part of the deposit, and the deposit can also be withdrawn;<br /><br />
      5. Participate in the second round of arbitration and temporarily freeze the deposit until the end of arbitration;<br /><br />
      6. After the deposit is lower than the minimum requirement, the system will withdraw the address number;<br /><br />
      7. The vacancy number shall be filled by the nth address after the number;<br /><br />
      8. If the corresponding address after n bits is empty, it is filled by the last bit address;<br /><br />
      9. If an arbitrator does evil, the community can propose to remove the qualification of the arbitrator.<br /><br />
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
