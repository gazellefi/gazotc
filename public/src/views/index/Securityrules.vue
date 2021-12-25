<template>
  <div class='Securityrules'>
    <div class="content">
      <img src="@/assets/index/12.png" alt="">
      <div class="info">
        <div class="top">Margin rules</div>
        <li v-for="v in Securityrules">{{v}}</li>
        <div class="btn">
          <div>Management deposit </div>
          <img src="@/assets/index/to.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import consts from './const'
let { Securityrules } = consts
export default {
  name: 'Securityrules',
  data() {
    return {
      Securityrules
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
.Securityrules {
  background: #fff;
  padding: 40px 0;
  .content {
    position: relative;
    height: 544px;
    img {
      height: 100%;
    }
  }
  .info {
    width: 830px;
    height: 412px;
    background: #ffcc00;
    position: absolute;
    top: 70px;
    left: 366px;
    padding: 40px;
    .top {
      font-size: 36px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #333333;
      margin-bottom: 46px;
    }
    li {
      font-size: 16px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #333333;
      line-height: 40px;
      letter-spacing: -1px;
    }
    .btn {
      width: 203px;
      height: 40px;
      background: #333333;
      border-radius: 4px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15px;
      div {
        color: #fff;
        font-size: 16px;
        font-family: SF Pro Display;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: -1px;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .Securityrules {
    padding: 10px;
  }
  .content {
    height: auto !important;
    text-align: center;
  }
  img {
    width: 60%;
  }
  .info {
    padding: 20px !important;
    position: unset !important;
    width: auto !important;
    height: auto !important;
    .top {
      font-size: 24px !important;
      margin-bottom: 20px !important;
    }
    li {
      font-size: 14px !important;
      line-height: 16px !important;
      text-align: left;
      font-weight: 400 !important;
      margin-bottom: 10px;
    }
    .btn {
      > div {
        width: auto !important;
        font-size: 14px !important;
      }
    }
  }
}
</style>