<template>
  <div class='arbitrationrules'>
    <li v-for="(v,i) in arbitrationrules" :id="v.id" :class="[(i+1)%2==0?'Odd':'even']">
      <div class="items">
        <div class="goTo" v-if="i==0">
          <div class="goItem" :class="[curIndex==i?'curIndex':'']" @click="leftClick(v,i)" v-for="(v,i) in goItemList">
            {{v.title}}
          </div>
        </div>
        <div class="right">
          <div v-if="i==0" class="top">arbitration <span>rules</span></div>
          <div class="title"><span>NO.{{i+1}}</span>{{v.title}}</div>
          <div class="cont">
            <div class="item" v-for="v2 in v.cont">
              {{v2}}
            </div>
          </div>
        </div>
      </div>
    </li>

  </div>

  <!-- </div> -->
</template>
<script>
import consts from './const'
// import { nextTick } from '../../../../../uniapp/uniapp-X/uniapp-study/wxcomponents/vant/common/utils';
let { arbitrationrules } = consts
export default {
  name: 'arbitrationrules',
  data() {
    return {
      arbitrationrules,
      curIndex: 0,
      goItemList: [
        {
          id: 'qqq',
          title: 'Qualification of arbitrators',
        },
        {
          id: 'www',
          title: 'First round arbitration',
        },
        {
          id: 'eee',
          title: 'Second round of arbitration',
        },
      ]
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    async leftClick(v, i) {
      await this.$nextTick(e => { })
      this.curIndex = i
      document.getElementById(v.id).scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        // 上边框与视窗顶部平齐。默认值
      });
    }
  },
  components: {},
  props: []
};
</script>
<style lang='less' scoped='scoped'>
.arbitrationrules {
  padding-bottom: 20px;
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .goTo {
    width: 286px;
    height: 183px;
    background: #cccccc;
    display: flex;
    flex-direction: column;
    transform: translateX(-100px);
    // margin-right: 100px;
    .goItem {
      cursor: pointer;
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 30px;
      font-size: 16px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #fff;
      line-height: 36px;
    }
  }
  .right {
    // margin-left: 100px;
    width: 800px;
  }

  li {
    display: flex;
    margin-top: 20px;
    padding: 20px 0;
    .items {
      width: 1200px;
      margin: 0 auto;

      padding-bottom: 0px;
      display: flex;
      justify-content: flex-end;
      // justify-content: space-between;
    }
    .top {
      font-size: 36px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #333333;
      line-height: 36px;
      padding-bottom: 10px;
      border-bottom: 5px solid #ffcc00;
      margin-bottom: 20px;
      text-transform: Uppercase;
      span {
        color: #ffcc00;
      }
    }
    .title {
      font-size: 24px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #666666;
      line-height: 36px;
      margin-bottom: 10px;
      span {
        font-size: 28px;
        font-family: SF Pro Display;
        font-weight: bold;
        color: #ffcc00;
        line-height: 36px;
        margin-right: 10px;
      }
    }
    .cont {
      font-size: 18px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #666666;
      line-height: 36px;
    }
  }
  .Odd {
    background: #f5f5f5;
  }
  .even {
    background: #fff;
  }
}
.curIndex {
  background: #ffcc00;
}
@media screen and (max-width: 1200px) {
  .arbitrationrules {
    li {
      padding: 20px;
      margin-top: 0;
      .items {
        width: auto !important;
        display: flex;
        flex-direction: column;
        .goTo {
          display: none;
        }
        > div {
          width: auto !important;
          .top {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .title {
            font-size: 16px;
            line-height: 20px !important;
            span {
              font-size: 16px;
            }
          }
          .cont {
            .item {
              font-size: 12px;
              line-height: 16px;
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>