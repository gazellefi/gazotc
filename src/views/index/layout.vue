<template>
  <div class='index' ref="index">
    <!-- topNav -->
    <ul class="nav" :class="[isScorll?'isScorll':'']">
      <div class="content">
        <li :class="[currentRoute==v.route?'currentRoute':'']" @click="navClick(v)" v-for="v in navRoutes">{{v.title}}</li>
        <li><a target="_blank" href="/GazOTC.pdf">WhitePaper</a></li>

      </div>
    </ul>
    <van-popup class="nav2" v-model="show" position="left" :style="{ width: '50%' ,height:'100%'}">
      <li :class="[currentRoute==v.route?'currentRoute':'']" @click="navClick(v)" v-for="v in $t('message.navRoutes')">
        {{v.title}}
        <van-icon name="arrow" style="float:right" />
      </li>
      <li><a target="_blank" href="/GazOTC.pdf">{{$t('message.WhitePaper')}}</a>
        <van-icon name="arrow" style="float:right" />
      </li>
    </van-popup>
    <div class="topNav">
      <div class="fold" @click="show=true">
        <div class="item" v-for="v in 3"></div>
      </div>
      <lang class="lang"></lang>

      <el-carousel :autoplay="false" height="100%">
        <el-carousel-item style="position:relative">
          <img src="@/assets/index/nav.png" alt="">
          <div class="info content">
            <div class="Gazotc">Gazotc</div>
            <div class="otc">Leader of decentralized OTC</div>
            <div class="trackInitiative">
              <div class="track">Defi new track</div>
              <div class="Initiative">Global Initiative</div>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/index/nav2.png" alt="">
          <div class="info content" style="margin-top:50px;margin-left:120px">
            <div class="top"><span>gazelle</span> = gain + zelle</div>
            <div class="mid">Zelle-American Express Transfer Network <br /> Gazelle implies financial attributes</div>
            <div class="bot">
              Antelope is a very agile animal. It is not big, runs fast and jumps high, which means that the project can grow rapidly
              Compared with unicorn of uniswap, gazelle enterprise is a high growth enterprise, which can easily surpass more than one, ten, 100 and 1000 times (Baidu Encyclopedia's definition of gazelle enterprise).
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="topNav">
      <el-carousel height="470px">
        <el-carousel-item>
          <div class="Gazotc">Gazotc</div>
          <div class="otc">Leader of decentralized OTC</div>
          <div class="trackInitiative">
            <div class="track">Defi new track</div>
            <div class="Initiative">Global Initiative</div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="Gazotc">Gazotc</div>
          <div class="otc">Leader of decentralized OTC</div>
          <div class="trackInitiative">
            <div class="track">Defi new track</div>
            <div class="Initiative">Global Initiative</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <router-view></router-view>
    <!-- contactUs -->
    <div class="contactUs">
      <div class="content">
        <div class="left">
          <div class="title">contact us</div>
          <div class="info">Welcome to gazelle.fi global community!</div>
          <input type="text" placeholder="name" v-model="text1"><br>
          <input type="text" placeholder="E-mail" v-model="text2"><br>
          <div class="tips">Please enter a valid email address.</div>
          <div class="send">send out</div>
        </div>
        <div class="right">
          <textarea rows="3" placeholder="mail" cols="20">

         </textarea>
          <br>
          <div class="list">
            <li>content</li>
            <li>abyss</li>
            <li>Antelope ferry</li>
            <li>High spirited</li>
          </div>
          <div class="info">
            Technical support provided by Godaddy
          </div>
          <div class="copyright">
            copyright © 2020 gazelle - all rights reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lang from '../../components/lang'
export default {
  name: 'index',
  data() {
    return {
      show: false,
      text1: '',
      text2: '',
      currentRoute: '',
      isScorll: '',
      navRoutes: [
        { title: 'Home page', route: '/Homepage' },
        { title: 'Core mechanism', route: '/Coremechanism' },
        { title: 'Security rules', route: '/Securityrules' },
        { title: 'Transaction rules', route: '/Transactionrules' },
        { title: 'Arbitration rules', route: '/Arbitrationrules' },
        { title: 'Exchange', route: '/Exchange' },
        { title: 'Public sale', route: '/Activities' },
      ],
    };
  },
  mounted() {
    this.currentRoute = '/' + location.hash.split('/')[1]
    window.addEventListener('scroll', this.handleScroll, true);
  },
  watch: {},
  computed: {},
  methods: {

    navClick(v) {
      this.show = false
      if (v.route == '/Publicsale') {
        this.$router.push('/GAZ');
      } else if (v.route == '/Exchange') {
        this.$router.push('/home');
      } else if (v.route == '/WhitePaper') {
        this.$router.push(v.route);
        this.currentRoute = v.route
      } else if (v.route == "/Activities") {
        this.$router.push('/Activities');
      } else {
        this.$router.push(v.route);
        this.currentRoute = v.route
      }
    },
    async  handleScroll() {
      // await this.$nextTick(() => { })
      // console.dir(document.documentElement.scrollTop);
      let scrollTop = document.documentElement.scrollTop
      this.isScorll = scrollTop > 20 ? true : false
    },
  },
  components: { lang }
};
</script>
<style lang='less' scoped='scoped'>
/deep/.el-carousel__button {
  height: 6px;
  border-radius: 2px;
}
/deep/.is-active {
  .el-carousel__button {
    background: #ffcc00;
  }
}
.isScorll {
  background: #000;
  // transition: 1s;
}
.currentRoute {
  color: #ffcc00;
}
.nav {
  position: fixed;
  line-height: 60px;
  height: 60px;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .content {
    display: flex;
    justify-content: space-between;
  }
  li {
    cursor: pointer;
    font-size: 20px;
    font-family: SF Pro Display;
    font-weight: bold;
    line-height: 60px;
    a {
      font-size: 20px;
      font-family: SF Pro Display;
      font-weight: bold;
      line-height: 60px;
      color: #fff;
    }
  }
}
.index {
  .topNav {
    .el-carousel {
      height: 100%;
    }
    height: 460px;
    text-align: center;
    .info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 60%;
    }
    .top {
      font-size: 24px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #fff;
      line-height: 36px;
      text-align: left;
      letter-spacing: 0;

      span {
        display: inline-block;
        padding: 3px 0;
        background: #ffcc00;
        font-weight: bold;
        color: #000;
      }
    }
    .mid {
      width: 310px;
      border: 2px dotted #ffcc00;
      border-radius: 8px;
      margin-top: 10px;
      font-size: 16px;
      font-family: SF Pro Display;
      // font-weight: bold;
      color: #ffffff;
      line-height: 26px;
      letter-spacing: -1px;
      padding: 5px;
      text-align: left;
      margin-bottom: 10px;
    }
    .bot {
      width: 480px;
      color: #ffffff;
      text-align: left;
      line-height: 24px;
      letter-spacing: 0;
    }
    .Gazotc {
      font-size: 48px;
      font-family: SF Pro Display;
      font-weight: 800;
      color: #fdc000;
      line-height: 36px;
      margin-top: 50px;
      margin-bottom: 40px;
      text-transform: uppercase;
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .topNav {
    .lang {
      position: fixed;
      right: 30px;
      top: 20px;
      color: #fff;
      z-index: 1001;
    }
  }
  .contactUs {
    padding: 70px 0;
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
          width: 100%;
          height: 41px;
          border: 1px solid #999999;
          margin-bottom: 25px;
          background: transparent;
          padding-left: 10px;
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
          cursor: pointer;
          color: #fff;
        }
      }
      .right {
        textarea {
          width: 100%;
          height: 138px;
          border: 1px solid #999999;
          background: transparent;
          margin-bottom: 25px;
          line-height: 24px;
          padding-left: 10px;
          padding-top: 10px;
        }
        .list {
          display: flex;
          margin-bottom: 62px;
          color: #999999;
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
@media screen and (max-width: 1200px) {
  .index {
    .nav {
      display: none;
    }
  }
  .nav2 {
    padding-top: 100px;
    li {
      font-size: 12px;
      margin: 25px 10px;
      font-weight: 400;
      line-height: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      a {
        display: inline-block;
        width: calc(100% - 20px);
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        color: #000;
      }
    }
  }
  .topNav {
    height: 140px !important;
    position: relative;
    .fold {
      position: absolute;
      // background: red;
      width: 40px;
      height: 40px;
      top: 30px;
      left: 20px;
      z-index: 1000;
      .item {
        width: 20px;
        height: 3px;
        border-radius: 2px;
        background: #fff;
        margin: 3px;
      }
    }
    .lang {
      position: absolute !important;
      // background: red;
      width: 40px;
      height: 40px;
      top: 10px !important;
      right: 10px !important;
      z-index: 1000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info {
      margin: 0 !important;
      transform: 0;
      .top {
        font-weight: 600 !important;
        font-size: 12px !important;
        transform: translateX(95px);
        line-height: 16px;

        span {
          // height: 20px;
          padding: 2px;
          line-height: 14px;
        }
      }
      .mid {
        margin: 0;
        font-size: 12px;
        padding: 4px;
        line-height: 12px;
        transform: translateX(65px) scale(0.8);
      }
      .bot {
        font-size: 12px;
        line-height: 10px;
        transform: translateX(25px) scale(0.7);
        letter-spacing: 0;
      }
      .Gazotc {
        font-size: 20px;
        margin: 10px;
        line-height: 16px;
      }
      .otc {
        font-size: 12px;
        line-height: 10px;
        margin-bottom: 10px;
        font-weight: normal;
      }
      .track {
        height: 20px;
        font-size: 12px;
        line-height: 12px;
        padding: 2px !important;
        width: auto;
        margin-right: 10px;
      }
      .trackInitiative {
        align-items: center;
      }
      .Initiative {
        font-size: 10px !important;
        line-height: 10px !important;
      }
    }
  }
  .content {
    width: auto;
  }
  .contactUs {
    padding-top: 0px !important;
    .content {
      padding: 20px;
      padding-top: 0;
      display: flex;
      flex-direction: column;
      .left {
        margin-bottom: 20px;
      }
      .right {
        .list {
          font-size: 12px;
        }
        .info,
        .copyright {
          text-align: center !important;
        }
      }
    }
  }
}
</style>
<style>
.content {
  margin: 0 auto;
  height: 100%;
  width: 1200px;
  letter-spacing: -1px;
}

@media screen and (max-width: 1200px) {
  .content {
    width: auto !important;
  }
}
</style>