<template>
  <div class='transactionRules'>
	  <el-row  justify="center" type="flex">
		  <el-col :sm="24" :md="12">
			  <div class="cont">
			    <div class="header">
			      {{ $t("message.dapp.TransactionRules")}}
			    </div>
			    <div class="list">
			      <div class="listItem" v-for="(v,i) in langList">
			        {{ $t(`message.dapp.`+v)}}
			      </div>
			    </div>
			  </div>
		  </el-col>
	  </el-row>
    
  </div>
</template>
<script>
import lang from '@/assets/lang'
export default {
  name: 'transactionRules',
  data() {
    return {
      langList: [
        'transactionRules1',
        'transactionRules2',
        'transactionRules3',
        'transactionRules4',
        'transactionRules5',
        'transactionRules6',
        'transactionRules7',
        'transactionRules8',
        'transactionRules9',
        'transactionRules10',
        'transactionRules11',
        'transactionRules12',
        'transactionRules13',
        'transactionRules14',
        'transactionRules15',
        'transactionRules16',
      ]
    };
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
.transactionRules {
  height: 100%;
  .cont {
    padding: 0.25rem;
    /* width: 740px; */
    margin: 0 auto;
    background: #fff;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .header {
      color: #fff;
      background: linear-gradient(to left, #09deea, #4451fa);
      padding: 15px 0;
      text-align: center;
      border-radius: 5px;
	  font-size: 18px;
	  
    }
    .list {
      flex: 1;
      overflow: auto;
      margin-top: 20px;
	  
    }
	.listItem {
	  padding: 15px 0;
	  color: #333;
	  border-bottom: 1px dotted #ccc;
	  font-size: 14px;
	  &:hover{
			color: red;
			font-weight: bolder;
	  }
	}
  }
}
</style>