<template>
  <div class='index' ref="index">
    <!-- topNav -->
    <ul class="nav" :class="[isScorll?'isScorll':'']">
		<div class="content">
			<div class="logo">
				<img src="../../assets/img/navLogo.png" >
			</div>
			<!-- <li :class="[currentRoute==v.route?'currentRoute':'']" @click="navClick(v)" v-for="v in navRoutes">{{v.title}}</li> -->
			<li @click="navClick(v)" v-for="(v,index) in navRoutes" :key="index" :class="[activeIndex == v.value ? 'currentRoute' : '']">{{$t(`message.home.${v.title}`)}}</li>
			<div class="langBox">
				
				<lang class="lang"></lang>
				EN
			</div>
		</div>
    </ul>
    <van-popup class="nav2" v-model="show" position="left" :style="{ width: '50%' ,height:'100%'}">
      <!-- <li :class="[currentRoute==v.route?'currentRoute':'']" @click="navClick(v)" v-for="v in navRoutes"> -->
      <li @click="navClick(v)"  v-for="(v,index) in navRoutes" :key="index" :class="[activeIndex == v.value ? 'currentRoute' : '']">
        {{$t(`message.home.${v.title}`)}}
        <van-icon name="arrow" style="float:right" />
      </li>
      <!-- <li><a target="_blank" href="/GazOTC.pdf">{{$t('message.WhitePaper')}}</a>
        <van-icon name="arrow" style="float:right" />
      </li> -->
    </van-popup>
    <div class="topNav">
      <div class="fold" @click="show=true">
        <div class="item" v-for="v in 3"></div>
      </div>
      <lang class="lang"></lang>
     <!-- <el-carousel :autoplay="false"  arrow="nerver"  indicator-position="none" height="100%">
        <el-carousel-item style="position:relative">
          <img src="../../assets/img/giphy.gif" alt="">
        </el-carousel-item>
      </el-carousel> -->
    </div>
    <router-view></router-view>
    <!-- contactUs -->
    <div class="contactUs" v-if="showBottom">
      <div class="content">
        <!-- <div class="title">Get the latest news and updates</div> -->
        <div class="info">
          <div class="left">
            <a class="item" @click="goLink(v)" v-for="v in linklist">
              <img :src="v.img" alt="">
              <div class="text">{{$t(`message.home.${v.text}`)}}</div>
            </a>
          </div>
          <div class="right">{{$t('message.home.leader')}}</div>
        </div>
		<div class="botTop">
			<span>{{$t('message.home.copyright')}}</span>
			<span>{{$t('message.home.companyNum')}}</span>
			<span>{{$t('message.home.address')}}</span>
		</div>
        <div class="bot">
          <!-- <span>2021 Vimeo.com, Inc. All rights reserved.</span> -->
		  {{$t('message.home.terms')}}
          <!-- <span>Help: support@gazotc.com</span> -->
        </div>
      </div>
    </div>
	<div class="mask" v-show="maskShow==true">
		<img src="../../assets/img/giphy.gif" >
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
          text: 'github',
          img: require('@/assets/link/1.png'),
          href: 'https://github.com/gazellefi/gazotc',
        },
        {
          text: 'twitter',
          img: require('@/assets/link/2.png'),
          href: 'https://twitter.com/gazellefi',
        },
        {
          text: 'facebook',
          img: require('@/assets/link/3.png'),
          href: 'https://www.facebook.com/gazotc',
        },
        {
          text: 'medium',
          img: require('@/assets/link/4.png'),
          href: 'https://medium.com/@gazotc',
        },
        {
          text: 'youtube',
          img: require('@/assets/link/5.png'),
          href: 'https://www.youtube.com/channel/UCv2XLAJZg5bge_hGMXoPFTg',
        },
        {
          text: 'telegram',
          img: require('@/assets/link/6.png'),
          href: 'https://t.me/gazotcE',
        },
        // {
        //   text: 'telegram',
        //   img: require('@/assets/link/7.png'),
        //   href: 'https://t.me/gazotcCN',
        // },
        {
          text: 'discord',
          img: require('@/assets/link/8.png'),
          href: 'https://discord.gg/2DVfmvUBgH',
        }
      ],
      show: false,
      text1: '',
      text2: '',
      currentRoute: '',
      isScorll: '',
	  maskShow:true,
      navRoutes: [
        // { title: 'Home page', route: '/Homepage' },
        // { title: 'Core mechanism', route: '/Coremechanism' },
        // { title: 'Security rules', route: '/Securityrules' },
        // { title: 'Transaction rules', route: '/Transactionrules' },
        // { title: 'Arbitration rules', route: '/Arbitrationrules' },
        // { title: 'DAPP', route: '/Exchange' },
		{ title: 'Home', route: '/Homepage',value: 1 },
		{ title: 'About', route: '/about',value: 2 },
		{ title: 'Document', route: '/file',value: 3 },
		{ title: 'Rule', route: '/rule',value: 4 },
		{ title: 'News', route: '/news',value: 5 },
		{ title: 'Dapp', route: '/Exchange',value: 6 },
		{ title: 'Paper', route: '/GazOTC',value: 7 },
		{ title: 'Contact', route: '/contact',value: 8 },
        { title: 'Activities', route: '/Activities',value: 9 },
      ],
	  activeIndex: 1
    };
  },
  created() {
	  this.loading()
	// setTimeout(this.maskShow=false,2000000)
  },
  mounted() {
	  // console.log(this.maskShow)
    this.currentRoute = '/' + location.hash.split('/')[1]
    window.addEventListener('scroll', this.handleScroll, true);
  },
  watch: {},
  computed: {
	  showBottom(){
		  if(this.activeIndex == 8 || this.activeIndex == 5 || this.activeIndex == 7){
			  return false
		  }else{
			  return true
		  }
	  }
  },
  methods: {
    goLink(v) {
      window.open(v.href, '_blank')
    },

    navClick(v) {
      this.show = false
	  this.activeIndex = v.value
      if (v.route == '/Publicsale') {
        this.$router.push('/GAZ');
      } else if (v.route == '/Exchange') {
        this.$router.push('/home');
      } else if (v.route == '/GazOTC') {
		let lang = localStorage.getItem('lang')
		if(lang == 'zh'){
			window.location.href = '/GazOTC_ZH.pdf'
		}else{
			window.location.href = '/GazOTC_EN.pdf'
		}
        // this.currentRoute = v.route
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
	loading() {
		setTimeout(()=>{
			this.maskShow=false
			},2000)
	}
  },
  components: { lang }
};
</script>
<style lang='less' scoped='scoped'>
	div{
		/deep/ .el-carousel__arrow{
			display: none;
		}
	}
	.mask{
		background: #fff;
		width: 100%;
		height: 100%;
		z-index: 10000;
		position: fixed;
		top: 0;
		/* opacity: 0.8; */
		display: flex;
		justify-content: center;
		align-items: center;
		img{
			width: 25%;
		}
	}
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
  background: #fff
  // transition: 1s;
}
.currentRoute {
  color: #ffcc00;
}
.nav {
  position: fixed;
  line-height: 60px;
  height: 60px;
  color: #333;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .contentMain{
    display: flex;
  }
  .logo{
	  img{
		  width: 4.125rem;
		  height: 3.5rem;
	  }
  }
  .content {
	display: flex;
    justify-content: space-between;
	  .langBox{
		  font-size: 12px;
	  }
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
      color: #333;
    }
  }
}
.index {
  .topNav {
    .el-carousel {
      height: 100%;
	  margin-top: 4.1875rem;
    }
    /* height: 460px; */
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
      /* width: 100%; */
      height: 100%;
    }
  }
  .topNav {
    .lang {
      position: fixed;
      right: 30px;
      top: 20px;
      color: #333;
      z-index: 1001;
	  display: none;
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
		/* flex-wrap: wrap; */
        .item {
          margin-right: 30px;
          cursor: pointer;
        }
        img {
          width: 30px;
		  height: 30px;
          margin-bottom: 10px;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
	.botTop{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      letter-spacing: 0;
	  margin-bottom: 20px;
      span {
        color: #f5f5f5 ;
      }
	}
    .bot {
      display: flex;
      justify-content: center;
      font-size: 14px;
      letter-spacing: 0;
      span {
        color: #f5f5f5 ;
		margin-right: 200px;
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
  
	.mask{
		img{
			width: 40% !important;
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
	  
    height: 60px !important;
    position: relative;
	
	.el-carousel {
		height: 100%;
		margin-top: 0px !important;
	}
    .fold {
		color: #000;
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
        background: #000;
        margin: 3px;
      }
    }
    .lang {
		margin-right: 10px;
      position: absolute !important;
      // background: red;
      width: 40px;
      height: 40px;
      top: 10px !important;
      right: 10px !important;
      z-index: 1000;
      color: #fff;
      display: flex !important;
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
    padding:5px 20px 20px 20px!important;
    color: #ccc !important;
    .info {
      display: block !important;
      padding-bottom: 0 !important;
      margin-bottom: 8px !important;
      .left {
        display: flex;
        justify-content: space-around;
		flex-wrap: wrap;
      }
      .item {
		position: relative;
		/* width: 20%; */
		font-size: 11px;
        margin: 0px !important;
		margin-top: 8px !important;
        img {
          opacity: 1 !important;
		  transform: scale(0.9);
		  margin-bottom: 4px !important;
        }
		span{
			position: absolute;
			bottom: 16px;
			right: 10px;
			transform: scale(0.8);
		}
      }
      .right {
        margin-top: 20px;
        margin-bottom: 5px !important;
		text-align: center;
      }
    }
	.botTop{
		text-align: center;
		display: block !important;
		margin-bottom: 0px !important;
		span {
		  display: inline-block;
		  line-height: 22px;
		  font-size: 12px !important;
		   color: #ccc !important;
		  //  white-space: nowrap;
		  //  word-break: break-all;
		}
	}
    .bot {
		text-align: center;
		display: block !important;
        line-height: 22px;
        font-size: 12px !important;
      /* span {
        line-height: 22px;
        font-size: 12px !important;
        display: inline-block;
         color: #ccc !important;
        //  white-space: nowrap;
        //  word-break: break-all;
      } */
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