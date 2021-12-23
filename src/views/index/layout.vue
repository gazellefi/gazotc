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
              <!-- <div class="Initiative">Global Initiative</div> -->
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/index/nav2.png" alt="">
          <div class="info content">
            <div class="top"><span>gazelle</span> = gain + zelle</div>
            <div class="mid">Zelle-American Express Transfer Network <br /> Gazelle implies financial attributes</div>
            <!-- <div class="bot">
              Antelope is a very agile animal. It is not big, runs fast and jumps high, which means that the project can grow rapidly
              Compared with unicorn of uniswap, gazelle enterprise is a high growth enterprise, which can easily surpass more than one, ten, 100 and 1000 times (Baidu Encyclopedia's definition of gazelle enterprise).
            </div> -->
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
        <div class="title">Get the latest news and updates</div>
        <div class="info">
          <div class="left">
            <a class="item" @click="goLink(v)" v-for="v in linklist">
              <img :src="v.img" alt="">
              <div class="text">{{v.text}}</div>
            </a>
          </div>
          <div class="right">Gazotc --- Gate of the meta universe</div>
        </div>
        <div class="bot">
          <span>©2021 UNITED KINGDOM GZELLE DEFI FOUNDATION,copyright</span>
          <span>Address: 69, Aberdeen Avenue, Cambridge, England, CB2 8DL</span>
          <span>Help: support@gazotc.com</span>
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
      linklist: [
        {
          text: 'Github',
          img: require('@/assets/link/2.png'),
          href: 'https://github.com/gazellefi/gazotc'
        },
        {
          text: 'Twitter',
          img: require('@/assets/link/6.png'),
          href: 'https://twitter.com/gazellefi'
        },
        {
          text: 'Facebook',
          img: require('@/assets/link/1.png'),
          href: 'https://www.facebook.com/gazotc'
        },
        {
          text: 'Medium',
          img: require('@/assets/link/3.png'),
          href: 'https://medium.com/@gazotc'
        },
        {
          text: 'Telegram',
          img: require('@/assets/link/4.png'),
          href: 'https://t.me/gazotcfi'
        },
        {
          text: 'Youtube',
          img: require('@/assets/link/5.png'),
          href: 'https://www.youtube.com/channel/UCv2XLAJZg5bge_hGMXoPFTg'
        },
      ],
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
        { title: 'DAPP', route: '/Exchange' },
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
    goLink(v) {
      window.open(v.href, '_blank')
    },

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
  opacity: 1;
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
      // border: 2px dotted #ffcc00;
      border-radius: 8px;
      margin-top: 10px;
      font-size: 16px;
      font-family: SF Pro Display;
      // font-weight: bold;
      color: #ffffff;
      line-height: 26px;
      letter-spacing: -1px;
      // padding: 5px;
      text-align: left;
      margin-bottom: 10px;
      margin-top: 30px;
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
      letter-spacing: 2px;
    }
    .trackInitiative {
      display: flex;
      justify-content: center;
    }
    .track {
      width: 149px;
      height: 28px;
      padding: 10px;
      // background: #ffcc00;
      // margin-right: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ffcc00;
      font-size: 16px;
      border-radius: 15px;
      font-family: SF Pro Display;
      font-weight: bold;
      color: #ffcc00;
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
    padding: 20px 0;
    background-image: radial-gradient(#313131, #000);
    color: #f5f5f5;
    .title {
      font-size: 16px;
      margin-bottom: 30px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 30px;

      .left {
        display: flex;
        text-align: center;

        .item {
          margin-right: 30px;
          cursor: pointer;
        }
        img {
          width: 30px;
          margin-bottom: 10px;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    .bot {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      letter-spacing: 0;
      span {
        color: #f5f5f5 ;
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
        // transform: translateX(95px);
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
        line-height: 16px;
        margin-top: 20px;
        // transform: translateX(65px) scale(0.8);
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
        letter-spacing: 1px;
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
    padding: 20px !important;
    color: #ccc !important;
    .info {
      display: block !important;
      padding-bottom: 0 !important;
      margin-bottom: 8px !important;
      .left {
        display: flex;
        justify-content: space-between;
      }
      .item {
        margin: 0px !important;
        img {
          opacity: 1 !important;
        }
      }
      .right {
        margin-top: 20px;
        margin-bottom: 5px !important;
      }
    }
    .bot {
      display: block !important;
      span {
        display: inline-block;
        line-height: 22px;
        font-size: 12px !important;
         color: #ccc !important;
        //  white-space: nowrap;
        //  word-break: break-all;
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