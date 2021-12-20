<template>
  <div class='app'>
    <div class="header hidden-sm-and-down">
      {{ $t(header)}}
    </div>
    <div class="list">
      <div class="listItem" v-for="(v,i) in listData">
        {{ $t(`message.dapp.`+v)}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {};
  },
  mounted() {
  },
  watch: {

  },
  computed: {},
  methods: {},
  components: {},
  props: {
    header: {

    },
    listData: {

    },
  }
};
</script>
<style lang='less' scoped='scoped'>
.app {
  font-size: 14px;
  flex: 1;
  background: #fff;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  box-shadow: 0 0 5px 0 #ccc;
  &:last-child {
    margin: 0;
  }
  .header {
    color: #5baeac;
    // background: linear-gradient(to left, #09deea, #4451fa);
    // padding: 15px 0;
    font-size: 18px;
    // text-align: center;
    // border-radius: 5px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 48px;
      background: #5baeac;
      margin-right: 20px;
    }
  }
  .list {
    padding: 16px;

    flex: 1;
    overflow: auto;
    .listItem {
      padding: 15px 0;
      border-bottom: 1px dotted #ccc;
      line-height: 20px;
	  color: #333;
	  &:hover{
		color: red;
		font-weight: bolder;
	  }
    }
  }
}
</style>