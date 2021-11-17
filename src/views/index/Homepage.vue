<template>
  <div class='index'>
    <!-- therefore -->
    <div class="therefore">
      <div class="content">
        <ul>
          <li v-for="v in thereforeList">
            <div class="title">{{v.title}}</div>
            <div class="cont">{{v.cont}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- whiteInfo -->
    <div class="whiteInfo">
      <div class="content">
        <div class="safety">
          <li v-for="v in safetyList">
            <div class="title"> <img :src="v.icon" alt=""><span>{{v.title}}</span></div>
            <div class="cont">{{v.cont}}</div>
          </li>
        </div>
        <div class="fourInfo">
          <li v-for="v in fourInfoList">{{v}}</li>
        </div>
        <div class="Market">
          <div class="title">Market <span>participants</span></div>
          <div class="infos">
            <li v-for="(v,i) in infosList" :class="[(i+1)%2==0?'Odd':'even']">
              <div class="left">
                <!-- <div class="title"> {{v.title}}</div> -->
                <div class="info">
                  <div class="i">{{v.i}}</div>
                  <img class="imgTop" :src="v.icon2" alt="">
                  <img class="imgBot" :src="v.icon" alt="">
                </div>
              </div>
              <div class="right">
                <div class="title"> {{v.title}}</div>
                <div class="cont"> {{v.cont}}</div>
              </div>
            </li>
          </div>
        </div>
        <div class="model">
          Gazelle platform currency<br /> economic <span> model</span>
        </div>
        <div class="total">
          The total number of tokens is <span>6300W</span>，Token allocation
        </div>
        <div class="img">
          <img src="@/assets/index/round.png" alt="">
        </div>
      </div>
    </div>
    <!-- blackInfo -->
    <div class="blackInfo ">
      <div class="content">
        <div class="title">Gazelle trading system <span>diagram</span></div>
        <img src="@/assets/index/8.png" alt="">
      </div>
    </div>
    <!-- grayInfo -->
    <div class="grayInfo">
      <div class="content">
        <div class="title">Gazelle contract interaction <span>system diagram</span></div>
        <img src="@/assets/index/7.png" alt="">
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      navRoutes: [
        { title: 'Home page', route: 'Home page' },
        { title: 'Core mechanism', route: 'Core mechanism' },
        { title: 'Security rules', route: 'Security rules' },
        { title: 'Transaction rules', route: 'Transaction rules' },
        { title: 'Arbitration rules', route: 'Arbitration rules' },
        { title: 'Exchange', route: 'Exchange' },
        { title: 'Public sale', route: 'Public sale' },
      ],
      thereforeList: [
        { title: 'At one time', cont: 'we thought that the centralized exchange was safe and trustworthy, and it was the first choice for legal tender trading.' },
        { title: 'Until one day', cont: 'one of the three suspended the withdrawal of money.Defi believers believe that asset freedom should depend on technology, not people.' },
        { title: 'Therefore', cont: 'The gateway to the world of defi decentralized legal currency transactions Born!' },

      ],
      safetyList: [
        { icon: require('@/assets/index/3.png'), title: 'safety', cont: 'Assets are managed by smart contracts and can only be transferred between trading parties, The platform has no right to use and lock user assets.' },
        { icon: require('@/assets/index/4.png'), title: 'No license', cont: 'Traders through third-party social software and verification interfaces,Mutual KYC, personal retained information' },
        { icon: require('@/assets/index/5.png'), title: 'Community autonomy', cont: 'In case of any dispute, it shall be decided by the centralized arbitration mechanism in the chain;Platform parameters are set by community voting.' },
      ],
      fourInfoList: [
        'OTC is the channel for legal currency to enter and exit digital currency, and centralized exchange can not ensure the safety of assets.',
        'In 2020, the defi market broke out, and the decentralized transactions between currencies were recognized by users',
        'However, the market lacks a decentralized OTC.',
        'Gazelle platform currency economic model'
      ],
      infosList: [
        { icon: require('@/assets/index/9.png'), icon2: require('@/assets/index/a.png'), i: '01', title: 'business', cont: 'The order issuer needs to mortgage the platform currency' },
        { icon: require('@/assets/index/10.png'), icon2: require('@/assets/index/b.png'), i: '02', title: 'user', cont: 'The order issuer needs to mortgage the platform currency' },
        { icon: require('@/assets/index/11.png'), icon2: require('@/assets/index/c.png'), i: '03', title: 'arbiter', cont: 'Arbitration of disputes requires the mortgage of platform currency' }
      ]
    };
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {},
  components: {}
};
</script>
<style lang='less' scoped='scoped'>
.content {
  margin: 0 auto;
  height: 100%;
  width: 1200px;
}
.index {
  .topNav {
    height: 410px;
    text-align: center;
    background: url('~@/assets/index/nav.png') no-repeat;
    background-size: cover;

    .nav {
      line-height: 60px;
      height: 60px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      li {
        cursor: pointer;
        font-size: 20px;
        font-family: SF Pro Display;
        font-weight: bold;
        line-height: 60px;
      }
    }
    .Gazotc {
      font-size: 48px;
      font-family: SF Pro Display;
      font-weight: 800;
      color: #fdc000;
      line-height: 36px;
      margin-top: 50px;
      margin-bottom: 40px;
    }
    .otc {
      font-size: 30px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #ffffff;
      line-height: 36px;
      margin-bottom: 52px;
    }
    .trackInitiative {
      display: flex;
      justify-content: center;
    }
    .track {
      width: 149px;
      height: 38px;
      background: #ffcc00;
      margin-right: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #000000;
      line-height: 36px;
    }
    .Initiative {
      font-size: 20px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #ffcc00;
      line-height: 36px;
    }
  }
  .therefore {
    height: 472px;
    background: url('~@/assets/index/2.png') no-repeat;
    background-position: right;
    background-color: #ededed;
    ul {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      padding: 30px;
      li {
        .title {
          font-size: 24px;
          font-family: SF Pro Display;
          font-weight: bold;
          color: #000000;
          line-height: 36px;
          text-transform: uppercase;
        }
        .cont {
          max-width: 610px;
          font-size: 20px;
          font-family: SF Pro Display;
          color: #333333;
          line-height: 30px;
        }
      }
    }
  }
  .whiteInfo {
    padding-top: 50px;
    padding-bottom: 100px;
    .safety {
      display: flex;
      justify-content: center;
      li {
        margin-right: 20px;

        .title {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-size: 26px;
          font-family: SF Pro Display;
          font-weight: 600;
          color: #333333;
          line-height: 36px;
          img {
            width: 44px;
          }
          span {
            font-size: 26px;
            font-family: SF Pro Display;
            font-weight: 600;
            color: #333333;
            line-height: 36px;
          }
        }
        .cont {
          width: 300px;
          font-size: 14px;
          font-family: SF Pro Display;
          font-weight: 400;
          color: #666666;
          letter-spacing: -1px;
          line-height: 18px;
        }
      }
    }
    .fourInfo {
      margin-top: 77px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        border: 1px solid #999999;
        border-radius: 10px;
        width: 560px;
        height: 124px;
        display: flex;
        // align-items: center;
        font-size: 16px;
        font-family: SF Pro Display;
        font-weight: 400;
        color: #333333;
        line-height: 36px;
        padding: 25px 21px 33px 40px;
        margin-bottom: 30px;
        letter-spacing: -1px;
        position: relative;
        &::before {
          position: absolute;
          top: 40px;
          content: '';
          display: block;
          width: 9px;
          height: 9px;
          background: #fdc000;
          border-radius: 50%;
          transform: translateX(-20px);
        }
      }
    }
    .Market {
      .title {
        font-size: 36px;
        font-family: SF Pro Display;
        font-weight: 500;
        color: #333333;
        line-height: 36px;
        text-transform: uppercase;
        text-align: center;
        span {
          color: #fdc100;
        }
      }
      .infos {
        margin-top: 60px;
        li {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 120px;
          .left {
            .title {
              font-size: 30px;
              font-family: SF Pro Display;
              font-weight: 400;
              color: #333333;
              line-height: 36px;
              margin-bottom: 30px;
            }

            .info {
              position: relative;
              .i {
                width: 39px;
                height: 34px;
                font-size: 48px;
                font-family: DIN;
                font-weight: 500;
                color: #cccccc;
                line-height: 36px;
                position: absolute;
                z-index: 11;
                top: -10px;
                left: -80px;
              }
              .imgTop {
                box-shadow: 0 0 20px 0 #ccc;
                width: 220px;
                height: 220px;
                border-radius: 50%;
              }

              .imgBot {
                // transform: translate(-40px, -160px);
                position: absolute;
                z-index: -1;
                top: 60px;
                left: -34px;
                width: 220px;
                height: 220px;
              }
            }
          }
          .right {
            .title {
              font-size: 30px;
              font-family: SF Pro Display;
              font-weight: 400;
              color: #333333;
              line-height: 36px;
              text-align: left;
              margin-bottom: 20px;
            }
            .cont {
              width: 385px;
              font-size: 24px;
              font-family: SF Pro Display;
              font-weight: 400;
              color: #666666;
              line-height: 36px;
              letter-spacing: -1px;
            }
          }
        }
      }
    }
    .model {
      font-size: 36px;
      font-family: SF Pro Display;
      font-weight: 500;
      color: #333333;
      line-height: 48px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 20px;
      span {
        color: #fdc100;
      }
    }
    .total {
      text-align: center;
      font-size: 24px;
      font-family: SF Pro Display;
      font-weight: 500;
      color: #666666;
      line-height: 36px;
      margin-bottom: 67px;
      span {
        color: #fdc100;
      }
    }

    .img {
      text-align: center;
    }
  }
  .blackInfo {
    // height: 860px;
    background: #000;
    text-align: center;
    .title {
      font-size: 36px;
      font-family: SF Pro Display;
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
      padding-top: 70px;
      padding-bottom: 50px;
      span {
        color: #ffcc00;
      }
    }
    img {
      width: 1190px;
      // height: 700px;
    }
  }
  .grayInfo {
    // height: 637px;
    background: #333333;
    text-align: center;
    .title {
      font-size: 36px;
      font-family: SF Pro Display;
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
      padding-top: 70px;
      padding-bottom: 50px;
      span {
        color: #ffcc00;
      }
    }
    img {
      // width: 1190px;
      // height: 440px;
    }
  }
  .contactUs {
    padding: 70px 0;
    height: 458px;
    background: #eeeeee;
    .content {
      display: flex;
      justify-content: space-between;
      .left {
        .title {
          font-size: 24px;
          font-family: SF Pro Display;
          font-weight: 500;
          color: #333333;
          line-height: 48px;
        }
        .info {
          font-size: 18px;
          font-family: SF Pro Display;
          font-weight: 400;
          color: #333333;
          line-height: 48px;
        }
        input {
          width: 380px;
          height: 41px;
          border: 1px solid #999999;
          margin-bottom: 25px;
          background: transparent;
        }
        .tips {
          font-size: 12px;
          font-family: SF Pro Display;
          font-weight: 400;
          color: #ff3333;
        }
        .send {
          width: 103px;
          height: 29px;
          background: #cccccc;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
      }
      .right {
        input {
          width: 512px;
          height: 138px;
          border: 1px solid #999999;
          background: transparent;
          margin-bottom: 25px;
        }
        .list {
          display: flex;
          margin-bottom: 62px;
          li {
            margin-right: 30px;
          }
        }
        .info,
        .copyright {
          text-align: right;
          font-size: 12px;
          font-family: SF Pro Display;
          font-weight: 400;
          color: #666666;
          line-height: 28px;
        }
      }
    }
  }
}
.Odd {
  justify-content: space-between !important;
  .left {
    order: 1 !important;
  }
}
@media screen and (max-width: 1200px) {
  .blackInfo,
  .grayInfo {
    img {
      width: 100% !important;
      padding: 20px;
    }
    .title {
      font-size: 9px !important;
      padding: 10px 0 !important;
    }
  }
  .whiteInfo {
    padding-bottom: 20px !important;
    padding-top: 20px !important;
    .img {
      img {
        width: 100% !important;
        padding: 20px;
      }
    }
    .Market {
      .title {
        font-size: 24px !important;
        line-height: 28px !important;
      }
      .infos {
        margin-top: 40px !important;
        .Odd {
          justify-content: center !important;
          .left {
            order: -1 !important;
          }
        }
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px !important;
          .right {
            margin-top: 30px;
            .title {
              font-size: 18px !important;
              text-align: center !important;
              margin-bottom: 5px !important;
              font-weight: 600 !important;
            }
            .cont {
              font-size: 14px !important;
              width: 230px !important;
              line-height: 18px !important;
              letter-spacing: 0 !important;
            }
          }
          .left {
            // width: 30% !important;
            .title {
              font-size: 16px !important;
            }
            .info {
              .i {
                font-size: 28px !important;
              }
              .baise {
                width: 200px !important;
              }
              img {
                top: 40px !important;
                width: 160px !important;
                height: 160px !important;
              }
            }
          }
        }
      }
    }
    .total {
      margin-bottom: 20px !important;
      font-size: 12px !important;
    }
    .model {
      font-size: 18px !important;
      line-height: 22px !important;
      margin-bottom: 10px !important;
    }
    .safety {
      display: flex;
      flex-direction: column;
      li {
        margin-bottom: 20px;
        .title {
          justify-content: center;
          img {
            width: 30px !important;
          }
          span {
            font-size: 14px !important;
          }
        }
        .cont {
          text-align: center !important;
          margin: 0;
          width: auto !important;
          padding: 0 20px;
        }
      }
    }
    .fourInfo {
      margin-top: 0px !important;
      padding: 20px;
      li {
        padding: 10px !important;
        margin-bottom: 15px !important;
        font-size: 14px !important;
        height: 88px !important;
        line-height: 20px !important;
        letter-spacing: 0 !important;
        &::before {
          content: none !important;
        }
      }
    }
  }

  .therefore {
    height: auto !important;
    .content {
      ul {
        padding: 10px 20px;
        li {
          .title {
            font-size: 18px;
          }
          .cont {
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>