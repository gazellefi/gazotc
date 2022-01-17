<template>
	<el-row justify="center" type="flex">
		<el-col :sm="24" :md="12">
			<div class='marginRules'>
			  <div class="cont">
			    <div class="header">
			      {{ $t("message.dapp.MarginRules")}}
			    </div>
			    <div class="list">
			      <div class="listItem" v-for="(v,i) in langList">
			        <span>No.{{i+1}}</span>{{ $t(`message.dapp.`+v)}}
			      </div>
			    </div>
			  </div>
			</div>
		</el-col>
	</el-row>
  
</template>
<script>
import lang from '@/assets/lang'
export default {
  name: 'marginRules',
  data() {
    return {
      langList: [
        'marginRules1',
        'marginRules2',
        'marginRules3',
        'marginRules4',
        'marginRules5',
		'marginRules6',
		'marginRules7',
		'marginRules8',
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
.marginRules {
  height: 100%;
  .cont {
    padding: 36px;
    /* width: 740px; */
    margin: 0 auto;
    // background: #fff;
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
      // padding: 20px;
      overflow: visible;
      .listItem {
        transition: 0.5s;
        padding: 15px 0;
        background: #fff;
        margin: 50px 0;
        padding-left: 50px;
        border-radius: 30px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.16);
        }
        &:first-child {
          margin: 0;
        }

        span {
          margin-right: 15px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>