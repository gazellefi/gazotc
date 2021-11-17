<template>
  <div class='Title'>
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'Title',
  data() {
    return {};
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: {},
  props: ['title']
};
</script>
<style lang='less' scoped='scoped'>
.Title {
  height: 30px;
  margin: 20px 0;
  line-height: 30px;
  span {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 30px;
      background: #004655;
      margin-right: 5px;
    }
  }
}
</style>