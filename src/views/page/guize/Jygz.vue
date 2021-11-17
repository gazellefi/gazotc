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
      Transaction rules
    </div>
    <div class="jygz_msg">
      1.Traders can recharge any asset to the smart contract, but only the assets approved by community governance can issue orders;<br /><br />
      2.Except that the assets and deposits in the transaction are frozen and cannot be withdrawn, other assets can be withdrawn freely;<br /><br />
      3.When a merchant issues an order, it does not need a deposit, but the deposit balance is insufficient, and the user may fail to take the order;<br /><br />
      4.Merchant The freeze ratio of deposit is 20%, the proportion can be modified according to community governance in the later stage;<br /><br />
      5.The margin proportion frozen by the user is set by the merchant;<br /><br />
      6.When a merchant issues a purchase order, it does not need to recharge the assets first;<br /><br />
      7.When a merchant issues a sales order, it needs to recharge first and freeze the corresponding amount of assets;<br /><br />
      8.The merchant can modify the transaction quantity and unit price in the order;<br /><br />
      9.Assets and margin can only be transferred between the two parties to the transaction;<br /><br />
      10.Cancellation can only be triggered by the payer, and there is no handling charge for the cancellation contract;<br /><br />
      11.The currency release can only be triggered by the payee, and the service charge will be deducted from the contract during currency release;<br /><br />
      12.If the payer fails to pay or the seller fails to release money, it may apply for arbitration;<br /><br />
      13.The deposit shall be released 3 days after the currency is released, and both parties can release it in advance by agreement;<br /><br />
      14.Before the release of the deposit, either party can trigger the suspension of release;<br /><br />
      15.In order to prevent malicious suspension, the deposit shall be more than 10% when the user triggers the suspension;<br /><br />
      16.If the funds of the payee are frozen, both parties can negotiate the compensation proportion of the deposit. If no agreement can be reached, they can apply for arbitration.
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
