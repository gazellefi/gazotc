<template>
  <div class='Coremechanism content'>
    <div class="left">
      <li v-for="(v,i) in mid" :key="i">
        <div class="index">
          <div>{{getI(i)}}</div>
          <img src="@/assets/index/ty.png" alt="">
        </div>
        <div class="cont">{{v}}</div>
      </li>
    </div>
    <div class="right">
      <div class="line"></div>
      <div class="text">Transaction rules</div>
    </div>
  </div>
</template>
<script>
import consts from './const'
let { mid } = consts.Transactionrules
console.log('mid: ', mid);
export default {
  name: 'Coremechanism',
  data() {
    return {
      mid
    };
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {
    getI(i) {
      return i < 10 ? '0' + i : i
    }
  },
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
.Coremechanism {
  position: relative;
  display: flex;
  margin-top: 30px;
  .right {
    position: absolute;
    transform: rotate(90deg);
    top: 220px;
    right: -200px;
    .line {
      width: 425px;
      height: 34px;
      background: #ffcc00;
      border-bottom: 8px solid #ffe785;
    }
    .text {
      font-size: 60px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #cccccc;
      line-height: 36px;
      margin-top: 20px;
    }
  }
}

li {
  font-size: 20px;
  font-family: SF Pro Display;
  color: #666666;
  line-height: 36px;
  display: flex;
  margin: 30px 0;
  .index {
    transform: translateY(-20px);
    > div {
      font-size: 46px;
      font-family: DIN;
      font-weight: bold;
      color: #ffcc00;
      line-height: 37px;
      margin-right: 25px;
    }
    img {
      transform: translate(5px, -8px);
    }
  }
  .cont {
    max-width: 800px;
    font-size: 20px;
    font-family: SF Pro Display;
    font-weight: bold;
    color: #666666;
    line-height: 36px;
    // text-decoration: underline dotted;
  }
}

@media screen and (max-width: 1200px) {
  .Coremechanism {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 10px;
    .right {
      position: unset;
      transform: rotate(0);
      order: -1;
      .line {
        display: none;
      }
      .text {
        font-size: 20px;
        letter-spacing: 0;
        margin-top: 0;
        font-weight: 400;
        border-bottom: 5px solid #ffcc00;
      }
    }
    .left {
      li {
        margin: 10px;
        line-height: 20px !important;
        align-items: center;
        .index {
          margin-right: 20px;
          transform: none;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > div {
            font-size: 16px;
            margin-right: 0;
            line-height: 32px;
            margin-left: 7px;
            margin-bottom: 4px;
          }
          img {
            width: 21px;
            height: 7px;
          }
        }
        .cont {
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
        }
      }
    }
  }
}
</style>