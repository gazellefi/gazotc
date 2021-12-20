<template>
  <div class='app'>
    <div class="hidden-sm-and-down f">
    	<rulesOfArbitratorsItem header="message.dapp.QualificationArbitrators" :listData="listData1"></rulesOfArbitratorsItem>
    	<rulesOfArbitratorsItem header="message.dapp.firstRules" :listData="listData2"></rulesOfArbitratorsItem>
    	<rulesOfArbitratorsItem header="message.dapp.twoRules" :listData="listData3"></rulesOfArbitratorsItem>
    </div>
	<div class="hidden-sm-and-up">
		<van-tabs v-model="active" color="#FDC500">
		  <van-tab :title="$t('message.dapp.QualificationArbitrators')">
			  <rulesOfArbitratorsItem header="message.dapp.QualificationArbitrators" :listData="listData1"></rulesOfArbitratorsItem>
		  </van-tab>
		  <van-tab :title="$t('message.dapp.firstRule')">
			  <rulesOfArbitratorsItem header="message.dapp.firstRules" :listData="listData2"></rulesOfArbitratorsItem>
		  </van-tab>
		  <van-tab :title="$t('message.dapp.twoRules')">
			  <rulesOfArbitratorsItem header="message.dapp.twoRules" :listData="listData3"></rulesOfArbitratorsItem>
		  </van-tab>
		</van-tabs>
	</div>
  </div>
</template>
<script>
import rulesOfArbitratorsItem from './rulesOfArbitratorsItem'
export default {
  name: 'app',
  data() {
    return {
	  active: 0,
      listData1: [
        'rulesOfArbitratorsOne1',
        'rulesOfArbitratorsOne2',
        'rulesOfArbitratorsOne3',
        'rulesOfArbitratorsOne4',
        'rulesOfArbitratorsOne5',
        'rulesOfArbitratorsOne6',
        'rulesOfArbitratorsOne7',
        'rulesOfArbitratorsOne8',
        'rulesOfArbitratorsOne9',
      ],
      listData2: [
        'rulesOfArbitratorsTwo1',
        'rulesOfArbitratorsTwo2',
        'rulesOfArbitratorsTwo3',
        'rulesOfArbitratorsTwo4',
        'rulesOfArbitratorsTwo5',
        'rulesOfArbitratorsTwo6',
        'rulesOfArbitratorsTwo7',
        'rulesOfArbitratorsTwo8',
        'rulesOfArbitratorsTwo9',
        'rulesOfArbitratorsTwo10',
        'rulesOfArbitratorsTwo11',
        'rulesOfArbitratorsTwo12',
        'rulesOfArbitratorsTwo13',
        'rulesOfArbitratorsTwo14',
        'rulesOfArbitratorsTwo15',
        'rulesOfArbitratorsTwo16',
      ],
      listData3: [
        'rulesOfArbitratorsThr1',
        'rulesOfArbitratorsThr2',
        'rulesOfArbitratorsThr3',
        'rulesOfArbitratorsThr4',
        'rulesOfArbitratorsThr5',
        'rulesOfArbitratorsThr6',
        'rulesOfArbitratorsThr7',
        'rulesOfArbitratorsThr8',
        'rulesOfArbitratorsThr9',
        'rulesOfArbitratorsThr10',
        'rulesOfArbitratorsThr11',
        'rulesOfArbitratorsThr12',
        'rulesOfArbitratorsThr13',
        'rulesOfArbitratorsThr14',
        'rulesOfArbitratorsThr15',
        'rulesOfArbitratorsThr16',
      ],
    };
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: { rulesOfArbitratorsItem },
  props: []
};
</script>
<style lang='less' scoped='scoped'>
	.app{
		height: 100%;
	}
</style>