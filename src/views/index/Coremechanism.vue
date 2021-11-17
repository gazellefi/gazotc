<template>
  <div class='Coremechanism'>
    <div class="content">
      <li v-for="(v,i) in  Coremechanism" :class="[(i+1)%2==0?'Odd':'even']">
        <img :src="v.img" alt="">
        <div class="right">
          <div class="index">0{{i+1}}</div>
          <div class="title">{{v.title}}</div>
          <div class="contList">
            <div class="item" v-for="v2 in v.cont">
              {{v2}}
            </div>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>
<script>
import consts from './const'
let { Coremechanism } = consts
export default {
  name: 'Coremechanism',
  data() {
    return {
      Coremechanism
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
.Coremechanism {
  margin-top: 40px;
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    .right {
      width: 590px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 100px;
      .index {
        font-size: 48px;
        font-family: DIN;
        font-weight: bold;
        color: #000000;
        border-bottom: 5px solid #ffcc00;
        padding-bottom: 10px;
      }
      .title {
        font-size: 20px;
        font-family: SF Pro Display;
        font-weight: bold;
        color: #333333;
        line-height: 24px;
        margin-top: 10px;
      }
      .contList {
        margin-top: 30px;
        .item {
          margin: 20px 0;
          font-size: 16px;
          font-family: SF Pro Display;
          font-weight: bold;
          color: #666666;
          line-height: 24px;
          letter-spacing: -1px;
        }
      }
    }
  }
}
.Odd {
  .right {
    order: -1 !important;
    margin-left: 0 !important;
    margin-right: 100px;
  }
}
@media screen and (max-width: 1200px) {
  .Coremechanism {
    margin-top: 0px !important;
  }
  li {
    flex-direction: column;
    padding: 10px 20px;
    margin-bottom: 0px !important;
    .right {
      margin: 0 !important;
      width: auto !important;
      .index {
        font-size: 14px !important;
        line-height: 16px;
        margin-top: 10px;
      }
      .title {
        font-size: 16px !important;
        line-height: 16px !important;
      }
      .contList {
        margin-top: 10px !important;
        .item {
          margin: 10px 0 !important;
          font-size: 10px !important;
          font-weight: 400 !important;
          line-height: 14px !important;
          letter-spacing: normal !important;
        }
      }
    }
    img {
      height: 200px !important;
      background-size: cover !important;
    }
  }
  .Odd {
    .right {
      order: 0 !important;
    }
  }
}
</style>