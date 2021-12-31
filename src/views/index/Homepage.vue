<template>
  <div class='index'>
	  <div class="f a_c c_c carouser_nav">
	  	<el-carousel :autoplay="false"  arrow="nerver"  indicator-position="none" height="100%"style="width: 100%;margin-top: 20px;"  >
	  	  <el-carousel-item style="position:relative">
	  	    <!-- <img src="../../assets/img/giphy.gif" alt="" style="width: 100%;"> -->
	  	    <img :src="bannerSrc" alt="" style="width: 100%;" @click="goAct">
			<!-- <img src="../../assets/img/banner00.jpg" > -->
	  	  </el-carousel-item>
	  	</el-carousel>
	  </div>
    <!-- therefore -->
    <div class="therefore ">
      <div class="content">
        <!-- <div class="title "><span>The birth</span> of gazotc</div>
        <div class="info">
          Once, we thought that the world’s top centralized exchange was safe and trustworthy, and was the first choice for digital currency in and out of gold.Until one day, a world-famous Exchange suspended currency withdrawal… Now, the business sector of the centralized exchange is eroded step by step by the decentralized exchange, and only OTC trading is spared temporarily. For this reason, OTC trading involves assets under the chain, and the blockchain cannot actively identify it, so the transaction will be controversial. Other defi services are atomic exchange and will not be controversial. The dispute resolution mechanism of OTC business is a problem that every project team involved in decentralized OTC business must face. China is the most active region of digital currency trading in the world. Then, the Chinese government has not supported digital currency trading. When the three exchanges are about to withdraw from China, how should the problem of cash in and out of Chinese traders be solved? Small exchanges are unreliable and private trading is unsafe. The market urgently needs a decentralized OTC trading platform. In this context, GAZOTC — A completely decentralized OTC trading platform, will be launched into the market after one year of polishing.
        </div> -->
		<div class="leftImg">
			<img src="../../assets/img/titleLeft.png" style="width: 31.25rem;height: 26.875rem;">
		</div>
		<div class="rightText">
			<div class="title">
				{{$t('message.home.aboutGAZOTC')}}
			</div>
			<div class="info">
				<div class="">
					{{$t('message.home.aboutContent')}}
				</div>
				<button class="readMore" type="button" @click="goDapp">{{$t('message.home.open')}}</button>
			</div>
		</div>
        <!-- <ul>
          <li v-for="v in thereforeList">
            <div class="title">{{v.title}}</div>
            <div class="cont">{{v.cont}}</div>
          </li>
        </ul> -->
      </div>
    </div>
    <!-- whiteInfo -->
    <div class="whiteInfo">
      <div class="content">
		<div class="safeTitle">
			{{$t('message.home.howDo')}}
		</div>
        <div class="safety">
			<li v-for="v in safetyList" :class="v.title=='Safety'?'safe':v.title=='No License'?'nolicense':'autonomy'">
				<div class="title" align="center">
					<img :src="v.icon" alt="">
					<div>{{$t(`message.home.${v.title}`)}}</div>
				</div>
				<div class="cont">{{$t(`message.home.${v.cont}`)}}</div>
				<!-- <div class="bgBox" style="position: absolute;">
					<img :src="v.background" >
				</div> -->
			</li>
        </div>
        <!-- <div class="fourInfo">
			<div class="infoTitle">
				Market Participants
			</div>
			<div class="infoItem" style="display: flex;">
				<li v-for="v in fourInfoList">{{v}}</li>
			</div>
        </div> -->
        <div class="Market">
          <div class="title">{{$t('message.home.market')}}</div>
          <div class="infos">
            <li v-for="(v,i) in infosList" :class="[(i+1)%2==0?'Odd':'even']">
              <div class="left">
                <!-- <div class="title"> {{v.title}}</div> -->
                <div class="info">
                  <!-- <div class="i">{{v.i}}</div> -->
                  <img class="imgTop" :src="v.icon" alt="">
                  <!-- <img class="imgBot" :src="v.icon" alt=""> -->
                </div>
              </div>
              <div class="right">
                <div class="title"> {{$t(`message.home.${v.title}`)}}<img :src="v.icon3" ></div>
                <div class="cont"> {{$t(`message.home.${v.cont}`)}}</div>
              </div>
            </li>
          </div>
        </div>
		<div class="modelBox">
			<div class="left">
				<div class="model"> {{$t('message.home.economic')}}
				</div>
				<!-- <div class="total">
				  The total number of tokens is 63M，Token allocation
				</div> -->
				<div class="img">
				  <img src="../../assets/img/model.png" alt="">
				</div>
			</div>
			<div class="right">
				<div class="loadingList" v-for="(v,i) in loadingList" :key="i">
					<div class="loadingTitle">
						<div class="">
							 {{$t(`message.home.${v.title}`)}}
						</div>
						<span>{{v.sliderNum}}</span></div>
					<div class="loadingBar">
						<div class="sliderBar" :style="{width:v.sliderNum}"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="mediaBox">
			<div class="title">{{$t('message.home.media')}}</div>
			<div class="mainBox">
				<div class="mediaItem" v-for="(v,i) in mediaList" :key="i" :style="{backgroundColor:v.color}">
					<img :src="v.background" >
				</div>
			</div>
		</div>
      </div>
    </div>
    <!-- blackInfo -->
    <!-- <div class="blackInfo ">
      <div class="content">
        <div class="title">Gazotc trading system <span>diagram</span></div>
        <img src="@/assets/img/1111.png" alt="">
      </div>
    </div> -->
    <!-- grayInfo -->
    <!-- <div class="grayInfo">
      <div class="content">
        <div class="title">Gazotc contract interaction <span>system diagram</span></div>
        <img src="@/assets/index/7.png" alt="">
      </div>
    </div> -->
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
        { title: 'DAPP', route: 'Exchange' },
        { title: 'Public sale', route: 'Public sale' },
		// { title: 'Home', route: 'Home page' },
		// { title: 'About', route: 'Core mechanism' },
		// { title: 'RULE', route: 'Security rules' },
		// { title: 'DOCUMENT', route: 'Arbitration rules' },
		// { title: 'DAPP', route: 'Exchange' },
		// { title: 'CONTACT', route: 'Public sale' },
      ],
      thereforeList: [
        { title: 'At one time', cont: 'we thought that the centralized exchange was safe and trustworthy, and it was the first choice for legal tender trading' },
        { title: 'Until one day', cont: 'one of the three suspended the withdrawal of money.Defi believers believe that asset freedom should depend on technology, not people' },
        { title: 'Therefore', cont: 'The gateway to the world of defi decentralized legal currency transactions Born!' },

      ],
      safetyList: [
        { icon: require('../../assets/img/safe.png'),background:require('../../assets/img/safebg.png'), title: 'safe', cont: 'safeContent' },
        { icon: require('../../assets/img/noLicense.png'),background:require('../../assets/img/licensebg.png'), title: 'noLicense', cont: 'noLicenseContent' },
        { icon: require('../../assets/img/daoAutonomy.png'),background:require('../../assets/img/autonomybg.png'), title: 'daoAutonomy', cont: 'daoAutonomyContent' },
      ],
      fourInfoList: [
        'Decentralized OTC transactions and channels for digital currency in and out of cash',
        'The free exchange of global foreign exchange and the disappearance of underground banks',
        'The portal of physical assets and assets on the chain, and the entrance of the meta universe',
        'Decentralized guarantee makes businesses no longer exploited by e-commerce platforms'
      ],
      infosList: [
        { icon: require('../../assets/img/business_2.jpg'), icon2: require('@/assets/index/a.png'),icon3:require('../../assets/img/Business.png'), i: '01', title: 'business', cont: 'businessContent' },
        { icon: require('../../assets/img/user_2.jpg'), icon2: require('@/assets/index/b.png'),icon3:require('../../assets/img/User.png'), i: '02', title: 'user', cont: 'userContent' },
        { icon: require('../../assets/img/arbiter_2.jpg'), icon2: require('@/assets/index/c.png'),icon3:require('../../assets/img/Arbiter.png'), i: '03', title: 'arbiter', cont: 'arbiterContent' }
      ],
	  loadingList: [
		  {title:'reward',sliderNum:'65%'},
		  {title:'gazelle',sliderNum:'12%'},
		  {title:'private',sliderNum:'10%'},
		  {title:'technical',sliderNum:'8%'},
		  {title:'safePool',sliderNum:'2%'},
		  {title:'airdrop',sliderNum:'2%'},
		  {title:'contributor',sliderNum:'1%'}
	  ],
	  mediaList:[
		  {color:'#fff',background:require('../../assets/img/logo1.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo2.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo3.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo4.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo5.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo6.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo7.jpg')},
		  {color:'#fff',background:require('../../assets/img/logo8.jpg')},
	  ],
	  bannerSrc:''
    };
  },
  mounted() {
	  let lang = localStorage.getItem('lang')
	  console.log(lang);
	  if(lang == 'zh'){
	  	this.bannerSrc=require('../../assets/img/banner01.jpg')
	  }else{
	  	this.bannerSrc=require('../../assets/img/banner00.jpg')
	  }
  },
  watch: {},
  computed: {},
  methods: {
	  goDapp(){
		this.$router.push('/home');
	  },
	  goAct(){
		  this.$router.push('/Activities');
	  }
  },
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
	.carouser_nav{
		padding:50px 0 50px;
	}
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
    /* background: url('~@/assets/index/2.png') no-repeat; */
    background-position: right;
    background-color: #fff;
	margin-top: 4.5625rem;
	.content{
		display: flex;
	}
    .title {
      font-size: 32px;
      padding: 10px 0;
	  margin-left: 110px;
      font-weight: bolder;
      padding-top: 20px;
      span {
        color: #ffcc00;
        font-weight: bold;
      }
    }
    .info {
      line-height: 40px;
      letter-spacing: 1px;
	  margin-left: 110px;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  height: 70%;
	  
    }
	.readMore{
		width: 8.625rem;
		height: 2.9375rem;
		background-color: #FF7361;
		color: #fff;
	}
    // ul {
    //   display: flex;
    //   flex-direction: column;
    //   height: 100%;
    //   justify-content: space-between;
    //   padding: 30px;
    //   li {
    //     .title {
    //       font-size: 24px;
    //       font-family: SF Pro Display;
    //       font-weight: bold;
    //       color: #000000;
    //       line-height: 36px;
    /* //       text-transform: uppercase; */
    //     }
    //     .cont {
    //       max-width: 610px;
    //       font-size: 20px;
    //       font-family: SF Pro Display;
    //       color: #333333;
    //       line-height: 30px;
    //     }
    //   }
    // }
  }
  .whiteInfo {
    padding-top: 50px;
    padding-bottom: 100px;
	.safeTitle{
		font-size: 36px;
		text-align: center;
		margin-bottom:66px ;
	}
    .safety {
      display: flex;
      justify-content: center;
	  .safe,.nolicense,.autonomy{
		  .bgBox{
				position: absolute;
				opacity: 0.2;
		  }
	  }
	  .safe{
		  .bgBox{
			  right: -40px;
			  top: 28px;
			  img{
				  width: 190px;
				  height: 220px;
			  }
		  }
	  }
	  .nolicense{
		  .bgBox{
			  right: -40px;
			  top: 0px;
			  img{
				  width: 171px;
				  height: 254px;
			  }
		  }
	  }
	  .autonomy{
		  .bgBox{
		  right: -12px;
		  top: 15px;
			  img{
				  width: 229px;
				  height: 220px;
			  }
		  }
		  
	  }
      li {
        margin-right: 20px;
		position: relative;
        .title {
          align-items: center;
          margin-bottom: 10px;
          /* text-transform: uppercase; */
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
		  text-align: center;
          color: #666666;
          letter-spacing: -1px;
          line-height: 18px;
        }
      }
    }
    .fourInfo {
      margin-top: 140px;
	  .infoTitle{
		  font-size: 36px;
		  text-align: center;
		  margin-bottom: 66px;
	  }
	  .infoItem{
		  display: flex;
		  flex-wrap: wrap;
		  justify-content: space-between;
	  }
      li {
        border: 1px solid #999999;
        border-radius: 10px;
        width: 560px;
        // height: 124px;
        display: flex;
        // align-items: center;
        font-size: 16px;
        font-family: SF Pro Display;
        font-weight: 400;
        color: #333333;
        line-height: 36px;
        padding: 22px 21px 22px 40px;
        margin-bottom: 30px;
        letter-spacing: -1px;
        position: relative;
        &::before {
          position: absolute;
          top: 35px;
          content: '';
          display: block;
          width: 9px;
          height: 9px;
		  border-radius: 50%;
          background: #FF7361;
          transform: translateX(-20px);
        }
      }
    }
    .Market {
		margin-top: 187px;
      .title {
        font-size: 36px;
        font-family: SF Pro Display;
        font-weight: 500;
        color: #333333;
        line-height: 36px;
        /* text-transform: uppercase; */
        text-align: center;
        span {
          color: #fdc100;
        }
      }
      .infos {
        margin-top: 60px;
		display: flex;
		justify-content: space-around;
        li {
         /* display: flex;
          align-items: center;
          justify-content: space-around; */
          margin-bottom: 120px;
          .left {
            .title {
              font-size: 36px;
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
                /* box-shadow: 0 0 20px 0 #ccc; */
                width: 385px;
                height: 265px;
				
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
			  text-align: center;
				height: 128px;
			  box-shadow: -10px 10px 5px #eee;
            .title {
				padding-top: 28px;
              font-size: 24px;
              font-family: SF Pro Display;
              font-weight: bold;
              color: #333333;
              line-height: 36px;
			  text-align: center;
			  img{
				  width: 20px;
				  height: 20px;
			  }
            }
            .cont {
              width: 385px;
              font-size: 16px;
              font-family: SF Pro Display;
              font-weight: 400;
              color: #666666;
              line-height: 24px;
              letter-spacing: -1px;
            }
          }
        }
      }
    }
	.modelBox{
		display: flex;
		.model {
		  font-size: 36px;
		  font-family: SF Pro Display;
		  font-weight: 500;
		  color: #333333;
		  line-height: 48px;
		  /* text-transform: uppercase; */
		  margin-bottom: 20px;
		}
		.total {
		  text-align: center;
		  font-size: 24px;
		  font-family: SF Pro Display;
		  font-weight: 500;
		  color: #FF7361;
		  line-height: 36px;
		  margin-bottom: 67px;
		  span {
			color: #fdc100;
		  }
		}

		.img {
			img{
				width: 583px;
				height: 409px;
				text-align: center;
			}
		}
		.left{
			flex: 1;
		}
		.right{
			flex: 1;
			margin-top: 109px;
			margin-left: 49px;
			display: flex;
			flex-direction: column;
			.loadingList{
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				flex: 1;
				line-height: 36px;
				.loadingTitle{
					display: flex;
					justify-content: space-between;
					font-size: 24px;
					font-weight: bold;
				}
				.loadingBar{
					width: 100%;
					height: 19px;
					background-color: #E6E6E6;
					
					.sliderBar{
						height: 100%;
						background-color: #FF7361;
					}
				}
			}
		}
	}
	.mediaBox{
		margin-top: 191px;
		.title{
			font-size: 36px;
			font-weight: bold;
			text-align: center;
		}
		.mainBox{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 64px;
			.mediaItem{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 234px;
				height: 148px;
				margin: 7px;
			}
			.mediaItem:first-of-type{
				img{
					width: 80%;
				}
			}
		}
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
      font-size: 18px !important;
      padding: 10px 0 !important;
    }
  }
  .carouser_nav{
  	padding:0 0 50px !important;
  }
  .rightText{
	  .title{
			font-weight: bolder !important;
		    font-size: 24px !important;
		    line-height: 28px !important;
	  }
  }
  .safeTitle,.infoTitle{
		font-weight: bolder !important;
		font-size: 24px !important;
		line-height: 28px !important;
  }
  .modelBox{
	  .left{
		  .model{	  
			font-weight: bolder !important;
			font-size: 24px !important;
			line-height: 28px !important;
		  }
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
		margin-top: 0px !important;
      .title {
		font-weight: bolder !important;
        font-size: 24px !important;
        line-height: 28px !important;
      }
      .infos {
		  display: flex;
		  flex-direction: column;
				text-align: center;
        margin-top: 40px !important;
        .Odd {
          justify-content: center !important;
          .left {
            order: -1 !important;
          }
        }
		.even{
			margin-bottom: 30px !important;
		}
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 60px !important;
          .right {
			  padding: 0 10px;
            .title {
			margin-top: 10px !important;
              font-size: 18px !important;
              text-align: center !important;
              margin-bottom: 5px !important;
              font-weight: 600 !important;
			  img{
				  width: 13px !important;
				  height: 13px !important;
			  }
            }
            .cont {
				/* text-align: left; */
              font-size: 14px !important;
              width: 100% !important;
			  padding-bottom: 20px;
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
                /* width: 160px !important;
                height: 160px !important; */
				width: 80%;
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
	  .safe,.nolicense,.autonomy{
		  .bgBox{
			  display: none;
			img{
				transform: scale(0.8);
			}  
		  }
	  }
	  .title{
	  }
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
		  display: block !important;
		text-indent: 1em;
        padding: 10px !important;
        margin-bottom: 15px !important;
        font-size: 14px !important;
        /* height: 88px !important; */
        line-height: 20px !important;
        letter-spacing: 0 !important;
        /* display: flex; */
        align-items: center;
        /* &::before {
          content: none !important;
        } */
        &::before {
          position: absolute;
          top: 16px !important;
		  left: 30px !important;
          content: '';
          display: block;
          width: 9px;
          height: 9px;
          background: #FF7361;
          transform: translateX(-20px);
        }
      }
    }
  }
	.infoTitle{
		width: 100%;
		font-size: 27px;
		text-align: center;
		margin-bottom: 30px !important;
	}

  .therefore {
	margin-top: 0px !important;
    height: auto !important;
    /* background: #ededed !important; */
    background: #fff !important;
    .content {
      padding: 10px 20px;
      .title {
        font-size: 22px;
        padding-top: 0;
        text-align: center;
      }
	  .leftImg{
		  display:none;
	  }
	  .rightText{
		  text-align: center;
		  .title,.info{
			  margin-left: 0;
		  }
		  .info{
			display: block !important;
		  }
	  }
      .info {
        line-height: 22px;
        letter-spacing: 0;
		/* text-align: center; */
		.readMore{
			margin-top: 20px;
		}
		
      }
      // ul {
      //   padding: 10px 20px;
      //   li {
      //     .title {
      //       font-size: 18px;
      //     }
      //     .cont {
      //       font-size: 12px;
      //       line-height: 16px;
      //     }
      //   }
      // }
    }
  }
  
  .modelBox{
  	text-align: center;
  	display: flex;
	flex-direction: column;
  	.model {
  	  font-size: 36px;
  	  font-family: SF Pro Display;
  	  font-weight: 500;
  	  color: #333333;
  	  line-height: 48px;
  	  /* text-transform: uppercase; */
  	  margin-bottom: 20px;
  	}
  	.total {
  	  text-align: center;
  	  font-size: 24px;
  	  font-family: SF Pro Display;
  	  font-weight: 500;
  	  color: #FF7361;
  	  line-height: 36px;
  	  margin-bottom: 67px;
  	  span {
  		color: #fdc100;
  	  }
  	}
  
  	.img {
  		img{
  			width: 100% !important;
  			height: auto !important;
  			text-align: center;
  		}
  	}
  	.left{
  		flex: 1;
  	}
  	.right{
  		flex: 1;
  		margin-top: 0px !important;
  		margin-left: 0px !important;
		padding: 10px;
  		display: flex;
  		flex-direction: column;
  		.loadingList{
  			display: flex;
  			flex-direction: column;
  			justify-content: flex-end;
  			flex: 1;
  			line-height: 36px;
  			.loadingTitle{
  				display: flex;
  				justify-content: space-between;
  				font-size: 15px !important;
  				font-weight: bold;
  			}
  			.loadingBar{
  				width: 100%;
  				height: 10px !important;
  				background-color: #E6E6E6;
  				
  				.sliderBar{
  					height: 100%;
  					background-color: #FF7361;
  				}
  			}
  		}
  	}
  }
  .mediaBox{
	  margin-top: 40px !important;
	  overflow: hidden;
	  max-height: 538px !important;
	.title{
		font-weight: bolder;
		font-size: 24px !important;
		line-height: 28px !important;
	}
	  .mainBox{
		  margin-top: 20px !important;
	  }
  }
  
  .topNav {
  	  
    height: 140px !important;
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
}
</style>