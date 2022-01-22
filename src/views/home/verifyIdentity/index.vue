<template>
	<div class="verifyPage faSF">
		<!-- StepOne -->
		<div class="start" style="opacity: 1;height: 100%;" v-show="showStepOne">
			<div class="verification">
				<lang style="position: absolute;left: 3%;top: 4%;cursor: pointer;"></lang>
				<div class="content">
					<div class="title">
						<img src="../../../assets/img/check.png" width="20px">
						<span class="fz24">Start verification</span>
					</div>
					<div class="main c4d4">
						<div class="topMain fz16">
							This process is designed to verify your identity and protect you from identity theft.
						</div>
						<div class="bottomMain fz16">
							Please have your ID ready and click 'Start'.
						</div>
					</div>
				</div>
				<button class="btn" type="button" @click="showStepGo(1)">Start</button>
				<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
			</div>
		</div>
		<!-- StepTwo Choose -->
		<div class="ChooseCountry" v-show="showStepTwo">
			<div class="verification">
				<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(1)"> <img src="../../../assets/img/back.png" width="16px"> </span>
				<div class="title fz24">Choose issuing country/region</div>
				<el-select v-model="value" @change="ChooseCountrys($event)" class="m-2 selectCountry" placeholder="Select" size="large">
				    <el-option
				      v-for="(item,index) in options"
				      :key="index"
				      :label="$t('message.country.country'+index)"
				      :value="index"
				    >
				    </el-option>
			    </el-select>
				<div class="main">
					<div class="mainTitle fz24">Select ID type</div>
					<div class="mainList">
						<button class="mainItem" @click='showStepGo(2)'>
							<img src="../../../assets/img/passport.png" width="16px" style="margin-right: 10px;">Passport</button>
						<button class="mainItem" @click='showStepGo(2)'>
							<img src="../../../assets/img/driving.png" width="16px" style="margin-right: 10px;">Driver's license</button>
						<button class="mainItem" @click='showStepGo(2)'>
							<img src="../../../assets/img/idChoose.png" width="16px" style="margin-right: 10px;">Identity card</button>
					</div>
				</div>
				<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
			</div>
		</div>
		<!-- StepThree Method -->
		<div class="ChooseCountry" v-show="showStepThree">
			<div class="verification">
				<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(2)"> <img src="../../../assets/img/back.png"  width="16px">  </span>
				<div class="title fz24">Choose an upload method</div>
				<div class="main">
					<div class="mainList" style="flex-direction: row;justify-content: space-around;">
						<button class="mainItem" style="flex: 1;height: 140px;max-width: 140px;flex-direction: column;justify-content: center;align-items: center;margin: 10px 10px;text-align:center;" @click='showStepGo(10)'>
							<img src="../../../assets/img/chat.png" width="50px">
							<span style="font-size: 12px;">Continue on mobile</span>
						</button>
						<button class="mainItem" style="flex: 1;height: 140px; max-width: 140px;flex-direction: column;justify-content: center;align-items: center;margin: 10px 10px;text-align:center;" @click='showStepGo(3)'>
							<img src="../../../assets/img/camera.png"  width="50px">
							<span style="font-size: 12px;">Take photo using webcam</span>
						</button>
					</div>
				</div>
				<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
			</div>
		</div>
		<!-- StepFour One QR -->
		<div class="ChooseCountry" v-show="showStepFive">
			<div class="verification">
				<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(4)"> <img src="../../../assets/img/back.png"  width="16px">  </span>
				<div class="title">Continue on mobile</div>
				<div id="qrCode" ref="qrCodeDiv"></div>
				<div class="QR">Scan QR code instead</div>
				<div class="QRC">Scan this QR code using your mobile camera or QR code app. Please keep this page open while you are using your mobile.</div>
				<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
			</div>
		</div>
		<!-- StepFour Two Upload -->
		<div class="ChooseCountry" v-show="showStepFour">
			<div class="verification">
				<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(3)"> <img src="../../../assets/img/back.png"  width="16px">  </span>
				<img src="../../../assets/img/groupF.png" v-show="showPhoto">
				<img src="../../../assets/img/groupB.png" v-show="showPhotoTwo">
				<img src="../../../assets/img/groupFace.png" v-show="showPhotoThree">
				<div class="title">Photo page of passport</div>
				<div class="main">
					<div class="mainTips" v-show="showPhoto">
						Step 1 of 3
					</div>
					<div class="mainTips" v-show="showPhotoTwo">
						Step 2 of 3
					</div>
					<div class="mainTips" v-show="showPhotoThree">
						Step 3 of 3
					</div>
					<div class="mainList">
						<div class="topContent">Center your ID and take a photo. Make sure all details are clear.</div>
					</div>
					<!-- <button class="btn" type="button" @click="showStepGo(4)">Start</button> -->
				</div>
				
				<div class="photoBox" v-show="showPhoto">
					<!-- <img class="imgFace" :src="srcImg1" id="img1"/> -->
					<button type="button" class="btn" >Start</button>
					<input id="fileBtn" type="file" @change="upload1($event,'#fileBtn', '#img1');" accept="image/*"  capture="camera"  multiple />
					<!-- <button type="button" class="faceBox btn btn"  v-show="srcImg1!=''" @click="showStepGo(5)">Next</button> -->
				</div>
				
				<div class="photoBox" v-show="showPhotoTwo">
					<!-- <img class="imgFace" :src="srcImg2" id="img2"/> -->
					<button type="button" class="faceBox btn">Start</button>
					<input id="fileBtn1" type="file" @change="upload2('#fileBtn1', '#img2');" accept="image/*" capture="camera"  multiple />
					<!-- <button type="button" class="faceBox btn"  v-show="srcImg2!=''" @click="showStepGo(6)">Next</button> -->
				</div>
				
				<div class="photoBox" v-show="showPhotoThree">
					<!-- <img class="imgFace" :src="srcImg3"  id="img3"/> -->
					<button type="button" class="faceBox btn">Start</button>
					<input id="fileBtn2" type="file" @change="upload3('#fileBtn2', '#img3');" accept="image/*" multiple capture="camera"/>
					<!-- <button type="button" class="faceBox btn"  v-show="srcImg3!=''" @click="showStepGo(9)">Next</button> -->
				</div>
				<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
			</div>
		</div>
		<!-- Step ID Card -->
		<div class="ChooseCountry" style="display: flex;flex-direction: column;justify-content: flex-start;padding-top: 80px;"  v-show="showStepSix">
			<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(5)"> <img src="../../../assets/img/back.png"  width="16px">  </span>
			<div class="imgBox" style="width: 305px; max-height: 250px;overflow: hidden;">
				<img class="imgFace" width="305px" v-if="showPhoto" :src="srcImg1" id="img1"/>
				<img class="imgFace" v-if="showPhotoTwo" :src="srcImg2" id="img2"/>
				<img class="imgFace" v-if="showPhotoThree" :src="srcImg3" id="img3"/>
			</div>
			<div class="fz24" style="margin-top: 30px;margin-bottom: 20px;">Check  photo</div>
			<div class="QAList" style="text-align: left;">
				<div class="QAItem">
					<div class="dot"></div>Can  you  read the details?
				</div>
				<div class="QAItem">
					<div class="dot"></div> Can  you see the whole ID?
				</div>
			</div>
			
			<button class="btn" type="button" style="bottom: 20%;" v-if="showPhoto" @click="showStepGo(5)">Confirm</button>
			<button class="btn" type="button" style="bottom: 20%;" v-if="showPhotoTwo" @click="showStepGo(6)">Confirm</button>
			<button class="btn" type="button" style="bottom: 20%;" v-if="showPhotoThree" @click="showStepGo(9)">Confirm</button>
			<button class="btn" style="color: #333;background: #fff;box-shadow: 0px 5px 10px rgba(190, 190, 190, 0.74);margin-top: 12px;" type="button" @click="BackTake()">Retake</button>
			<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
		</div>
		<!-- Step Face -->
		<div class="ChooseCountry" style="display: flex;flex-direction: column;justify-content: flex-start;padding-top: 20%;"  v-show="showStepSeven">
			<span style="position: absolute;left: 2%;top: 3%; font-size: 30px;cursor: pointer;" @click="back(6)"> <img src="../../../assets/img/back.png"  width="16px">  </span>
			<div class="imgBox" style="width: 305px; max-height: 250px;overflow: hidden;">
				<img class="imgFace" :src="srcImg3" id="img3"/>
			</div>
			<div class="fz24" style="margin-top: 30px;margin-bottom: 20px;">Face  not  recognized</div>
			<div class="QAList" style="text-align: left;">
				<div class="QAItem">
					<div class="dot"></div>Center your camera
				</div>
				<div class="QAItem">
					<div class="dot"></div>Avoid reflections and glare on glasses.
				</div>
				<div class="QAItem">
					<div class="dot"></div>Don it  click or leave the page while capturing
				</div>
			</div>
			
			<button class="btn" type="button" @click="BackTake()">Try  again</button>
			<div  style="position: absolute;left: 0;right:0;bottom:4%;color: #999999FF;font-size: 12px;">Powered by GazOTC</div>
		</div>
		<!-- Mark Loading -->
		<div class="mask" v-show="maskShow==true">
			<img src="../../../assets/img/giphy.gif" >
		</div>
	</div>
	
</template>

<script>
	// import { ref } from 'vue'
	import lang from "../../../components/lang.vue"
	// const value = ref('')
	import Web3 from "web3";
	import Web3Modal from "web3modal";
	import { Base64 } from "js-base64";
	import config from "../../../config.js";
	import { Toast } from "vant";
	import axios from "axios";
	import QRCode from "qrcodejs2";
	import WalletConnectProvider from "@walletconnect/web3-provider";
	import QRCodeModal from "@walletconnect/qrcode-modal";
	// import VConsole from "vconsole";
	// new VConsole();
	import request from "../../../utils/request/request.js"
	
	
	var web3 = "";
	var address = "";
	var dotc;
	var pri;
	var usdt;
	var ethereum = window.ethereum;
	//var huobiarr = config['hbi'][config['key']];
	var dotc_abi = config["hyue"]["bian"]["dotc"]["abi"];
	var dotc_key = config["hyue"]["bian"]["dotc"]["heyue"];
	var pri_abi = config["hyue"]["bian"]["Pripla"]["abi"];
	var pri_key = config["hyue"]["bian"]["Pripla"]["heyue"];
	var u_abi = config["hbi"]["bian"]["USDT"]["abi"];
	var u_key = config["hbi"]["bian"]["USDT"]["heyue"];
	
	export default {
  components: { lang },
		data(){
			return{
				maskShow:false,
				videoWidth: 350,
				videoHeight: 350,
				showStepOne:true,
				showStepTwo:false,
				showStepThree:false,
				showStepFour:false,
				showFourBtn:false,
				showPhoto:false,
				showPhotoTwo:false,
				showPhotoThree:false,
				takePhoto:false,
				showStepFive:false,
				showStepSix:false,
				showStepSeven:false,
				value:'',
				options: new Array(157),
				srcImg1:'',
				srcImg2:'',
				srcImg3:'',
				address:'',
				thisCancas: null,
				thisContext: null,
				thisVideo: null,
				openVideo:false,
				groupId:'',
				verifyUrl:'https://gazotc.com:8080/verifyIdentity',
				requestUrl:'https://gazotc.com:8083',
			}
		},
		mounted() {
			console.log(document.body.clientWidth);
			// this.callCamera()
			axios.defaults.withCredentials = true;
			for(let k in this.options){
				this.options[k]['groupId']=k;
			}
			//监测用户是否安装MASK
			console.log(typeof ethereum);
			
			var dq = this;
			let isGO = location.href.includes("?ref");
			if (isGO) {
			  let str = location.href.substring(
			    location.href.indexOf("?ref=") + 5,
			    location.href.indexOf("&")
			  );
			  let lang = location.href.substring(
			    location.href.indexOf("&lang=") + 6,
			    location.href.indexOf("#")
			  );
			  this.$i18n.locale = lang.substring(0, 2);
			  dq.recommender = str.substring(0, 42);
			}
			
			//监测用户是否安装MASK
			if (typeof ethereum === "undefined") {
			  webinit(false);
			} else {
			  //初始化
			  webinit(true);
			}
			Toast.setDefaultOptions("loading", {
			  forbidClick: false,
			  closeOnClickOverlay: false,
			  duration: 0,
			  overlay: true,
			});
			
			async function webinit(use_metamask) {
			  const web3Modal = new Web3Modal({
			    network: use_metamask ? "mainnet" : null,
			    cacheProvider: false,
			    providerOptions: use_metamask
			      ? {}
			      : {
			        walletconnect: {
			          package: WalletConnectProvider,
			          options: {
			            rpc: {
			              56: "https://bsc-dataseed.binance.org/",
			            },
			            network: "binance",
			            qrcodeModal: QRCodeModal,
			          },
			        },
			      },
			  });
			  var provider = await web3Modal.connect();
			  web3 = new Web3(provider);
			  console.log("walletcounnect", provider);
			  if (web3 && provider) {
			    address = provider.selectedAddress;
			    if (!address) {
			      address = provider.accounts[0];
			    }
				console.log(address);
			    dq.queryAddr = address;
			    dotc = new web3.eth.Contract(dotc_abi, dotc_key);
			    pri = new web3.eth.Contract(pri_abi, pri_key);
			    usdt = new web3.eth.Contract(u_abi, u_key);
			  }
			}
		},
		methods:{
			back(e){
				if(e==1){
					this.showStepOne=true;
					this.showStepTwo=false;
				}else if(e==2){
						this.showStepTwo=true;
						this.showStepThree=false;
				}else if(e==3){
					if(document.body.clientWidth<991){
						this.showStepTwo=true;
						this.showStepFour=false;
						this.showPhoto=false;
					}else{
						this.showStepThree=true;
						this.showStepFour=false;
						this.showFourBtn=false;
						this.showPhoto=false;
						this.showPhotoTwo=false;
						this.showPhotoThree=false;
						this.takePhoto=false;
					}
				}else if(e==4){
					this.showStepThree=true;
					this.showStepFive=false
				}else if(e==5){
					this.showStepFour=true;
					this.showStepSix=false;
				}else if(e==6){
					this.showStepFour=true;
					this.showStepSeven=false;
				}
			},
			showStepGo(e){
				if(e==1){
					this.showStepOne=false;
					this.showStepTwo=true;
				}else if(e==2){
					if(this.groupId===''){
						alert('请选择国家或地区')
					}else{
						if(document.body.clientWidth<991){
							this.showStepTwo=false;
							this.showStepFour=true;
							this.showPhoto=true;
						}else{
							this.showStepTwo=false;
							this.showStepThree=true;
						}
					}
				}else if(e==3){
					this.showStepThree=false;
					this.showStepFour=true;
					// this.showFourBtn=true;
					this.showPhoto=true;
				}else if(e==4){
					// this.callCamera()
					this.showFourBtn=false;
					this.showPhoto=true;
				}else if(e==5){
				  let verifyData={
				  	address:address,
				  	front: this.srcImg1,
				  	groupId: this.groupId
				  }
				  // console.log(verifyData);
				  console.log(verifyData);
				  this.maskShow=true;
				  axios.post(this.requestUrl+"/face/faceAdd",verifyData)
				  .then((res)=>{
					  console.log(res);
						if(res.code==0){
							this.showStepSix=false;
							this.showStepFour=true;
							this.showPhotoTwo=true;
							this.showPhoto=false;
						}else{
							// this.srcImg1=''
							alert(res.serviceMessage)
						}
						this.maskShow=false;
				  }).catch((err)=>{
					  this.maskShow=false;
					  console.log(err);
				  })
				}else if(e==6){
					let verifyData={
						address:address,
						back: this.srcImg2,
						groupId: this.groupId
					}
					console.log(address);
					
					this.maskShow=true;
					axios.post(this.requestUrl+"/face/faceBack",verifyData)
					.then((res)=>{
					  console.log(res);
						if(res.code==0){
							this.showStepSix=false;
							this.showStepFour=true;
							this.showPhotoTwo=false;
							this.showPhotoThree=true;
						}else{
							// this.srcImg2=''
							alert(res.serviceMessage)
						}
					  this.maskShow=false;
					}).catch((err)=>{
					  this.maskShow=false;
					  console.log(err);
					})
					
				}else if(e==7){
					this.showPhotoThree=false;
					this.takePhoto=true;
					this.getCompetence()//进入页面就调用摄像头
				}else if(e==8){
					console.log(this.srcImg3);
					this.showPhotoThree=true;
					this.takePhoto=false;
				}else if(e==9){
					
						let verifyData={
							address:address,
							front: this.srcImg3,
							groupId: this.groupId
						}
					  console.log(verifyData);
					this.maskShow=true;
					axios.post(this.requestUrl+"/face/faceSearch",verifyData)
					.then((res)=>{
					  console.log(res);
						if(res.code==0){
							alert('实名验证成功')
							this.$router.go(-1) 
						}else{
							if(res.serviceMessage=="NO_FACE_DETECTED"){
								this.showStepSeven=true;
								this.showStepFour=false;
							}else{
								this.srcImg3="";
								alert(res.serviceMessage)
							}
						}
					  this.maskShow=false;
					}).catch((err)=>{
					  this.maskShow=false;
					  console.log(err);
					})
				}else if(e==10){
					this.bindQRCode();
					this.showStepThree=false;
					this.showStepFive=true;
				}
			},
			upload1(e,c, d){
				// console.log('111');
				var that = this
				console.log(e);
			    var $c = document.querySelector(c),
			        $d = document.querySelector(d),
			        file = $c.files[0],
			        reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e){
						that.$nextTick(()=>{
							that.srcImg1=e.target.result
							console.log(address)
						})
						that.showStepSix=true;
						that.showStepFour=false;
						console.log(that.showPhoto);
					}
			},
			upload2(c, d){
				var that = this
			    var $c = document.querySelector(c),
			        $d = document.querySelector(d),
			        file = $c.files[0],
			        reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e){
						that.$nextTick(()=>{
							that.srcImg2=e.target.result
							console.log(address)
						})
						that.showStepSix=true;
						that.showStepFour=false;
					}
			},
			upload3(c, d){
				var that = this
			    var c = document.querySelector(c),
			        d = document.querySelector(d),
			        file = c.files[0],
			        reader = new FileReader();
					console.log(file,c.files);
					reader.readAsDataURL(file);
					reader.onload = function(e){
						that.$nextTick(()=>{
							console.log(e.target)
							that.srcImg3=e.target.result
						})
						that.showStepSix=true;
						that.showStepFour=false;
					}
			},
			async bindQRCode() {
			  await this.$nextTick((e) => {
			  });
			  this.$refs.qrCodeDiv.innerHTML = "";
			  new QRCode(this.$refs.qrCodeDiv, {
				text: this.verifyUrl,
				width: 100,
				height: 100,
				colorDark: "#333333", //二维码颜色
				colorLight: "#ffffff", //二维码背景色
				correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
			  });
			},
			ChooseCountrys(e){
				console.log(e);
				this.groupId=Number(e)
				console.log(this.groupId);
			},
			callCamera () {
				// H5调用电脑摄像头API
				navigator.mediaDevices.getUserMedia({
					video: true
				}).then(success => {
					this.showFourBtn=false;
					this.showPhoto=true
				}).catch(error => {
					alert("摄像头开启失败，请检查摄像头是否可用！");
					this.bindQRCode();
					this.showStepFour=false;
					this.showFourBtn=false;
					this.showStepFive=true;
					console.log('摄像头开启失败，请检查摄像头是否可用！')
					
				})
			},
			BackTake(){
				this.showStepSix=false;
				this.showStepFour=true;
				if(this.showPhoto==true){
					this.showStepSix=false;
					this.srcImg1='';
				}else if(this.showPhotoTwo==true){
					this.showStepSix=false;
					this.srcImg2='';
				}else if(this.showPhotoThree==true){
					this.showStepSeven=false;
					this.srcImg3='';
				}
				this.showStepFour=true;
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.mask{
		background: #fff;
		width: 100%;
		height: 100%;
		z-index: 10000;
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.8;
		img{
			width: 25%;
		}
	}
	body{
		width: 100%;
		height: 100%;
	}
	.verifyPage{
		height: 100%;
		background-color: rgb(70, 82, 103);
	}
	.start{
		box-sizing: border-box;
		line-height: 1.5;
		.verification{
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: #fff;
			width: 50%;
			margin: 10% 25%;
			border-radius: 5px;
			display: flex;
			flex-direction: column;
			text-align: center;
			align-items: center;
			justify-content: center;
			.content{
				line-height: 19px;
				max-width: 415px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.main{
					font-weight: 400;
					font-size: 18px;
					line-height: 1.5;
					text-align: left;
					padding: 10px 0px;
					.bottomMain{
						margin-top: 20px;
					}
				}
			}
			.btn{
				padding: 20px;
				width: 100%;
				color: #fff;
				border-radius: 5px;
				background: linear-gradient(130deg, #8E9EFF 0%, #4B62E6 100%);
				border: none;
				max-width: 400px;
			}
		}
	}
	.ChooseCountry{
		text-align: center;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #fff;
		width: 50%;
		margin: 10% 25%;
		border-radius: 5px;
		display: flex;
		// flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
		.title{
			font-size: 24px;
			vertical-align: baseline;
			font-weight: 400;
			margin: 28px 0 6px;
			
		}
		.imgFace{
			// width: 100%;
			width: 305px;
		}
		.photoBox{
			width: 100%;
			display: flex;
			flex-direction: column;
			text-align: center;
			img{
				width: 80%;
				margin: 0 10%;
			}
			#fileBtn,#fileBtn1,#fileBtn2{
				position: absolute;
				opacity: 0;
				padding: 15px;
			}
		}
		.main{
			width: 100%;
			.mainTitle{
				font-size: 28px;
				margin-top:20px;
				margin-bottom: 10px;
				text-align: left;
			}
			.mainTips{
				line-height: 28px;
				color: #444;
				margin: 6px 0 18px;
			}
			.mainList{
				display: flex;
				flex-direction: column;
				.topContent{
					text-align: left;
					margin-bottom: 20px;
					line-height: 19px;
				}
				.mainItem{
					margin-bottom: 10px;
					height: 60px;
					background-color: #fff;
					padding: 12px 14px;
					border-radius: 4px;
					border: 1px solid #CCCCCCFF;
					color: #666666FF;
					cursor: pointer;
					text-align: left;
					display: flex;
					align-items: center;
				}
				.mainItem:hover{
					background-color: #dfdfdf;
				}
			}
		}
		.btn{
			padding: 20px;
			width: 90%;
			color: #fff;
			border-radius: 5px;
			background: linear-gradient(130deg, #8E9EFF 0%, #4B62E6 100%);
			border: none;
		}
	}
	@media screen and (max-width: 991px) {
		.start{
			.verification{
				width: 100%;
				height: 100%;
				margin: 0 !important;
				border-radius: 0px;
				padding: 0 28px;
				text-align: center;
				align-items: center;
				justify-content: center;
				.content{
					max-width: 415px;
				}
				.btn{
					width: 90%;
					border: none;
					position: absolute;
					bottom: 10%;
				}
			}
		}
		
		.btn{
			width: 90% !important;
			border: none;
			position: absolute;
			bottom: 10%;
		}
		#fileBtn,#fileBtn1,#fileBtn2{
			width: 90% !important;
			bottom: 10%;
		}
		.mask{
			img{
				width: 40% !important;
			}
		}
		
		.verification{
			margin: 0 !important;
			display: flex;
			border-radius: 0px;
			padding: 0 28px;
			flex-direction: column;
			text-align: center;
			align-items: center;
			justify-content: center;
		}
		.ChooseCountry{
			border-radius: 0px;
			text-align: center;
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: #fff;
			width: 100% !important;
			margin: 0 !important;
		}
	}
	// 相机
	 .camera_outer{
	    position: relative;
	    overflow: hidden;
	    background-size: 100%;
	    video,canvas,.tx_img{
	      -moz-transform:scaleX(-1);
	      -webkit-transform:scaleX(-1);
	      -o-transform:scaleX(-1);
	      transform:scaleX(-1);
	    }
	    .btn_camera{
	      position: absolute;
	      bottom: 4px;
	      left: 0;
	      right: 0;
	      height: 50px;
	      background-color: rgba(0,0,0,0.3);
	      line-height: 50px;
	      text-align: center;
	      color: #ffffff;
	    }
	    .bg_r_img{
	      position: absolute;
	      bottom: 0;
	      left: 0;
	      right: 0;
	      top: 0;
	    }
	    .img_bg_camera{
	      position: absolute;
	      bottom: 0;
	      left: 0;
	      right: 0;
	      top: 0;
	      img{
	        width: 100%;
	        height: 100%;
	      }
	      .img_btn_camera{
	        position: absolute;
	        bottom: 0;
	        left: 0;
	        right: 0;
	        height: 50px;
	        line-height: 50px;
	        text-align: center;
	        background-color: rgba(0,0,0,0.3);
	        color: #ffffff;
	        .loding_img{
	          width: 50px;
	          height: 50px;
	        }
	      }
	    }
	  }
	.selectCountry{
		margin-top: 20px;
		width: 100%;
	}
	#qrCode,
	.copy {
	  background-color: #fff;
	  padding: 10px 0;
	  text-align: center;
	  border-radius: 0 0 10px 10px;
	  transform: translateY(-1px);
	
	  
	}
	
	#qrCode {
	  border-radius: 0;
	  transform: translateY(0px);
      display: flex;
      justify-content: center;
	}
	.QR{
		font-size: 23px;
		vertical-align: baseline;
		font-weight: 400;
	}
	.QAList{
		width: 100%;
		padding: 0 34px;
		.QAItem{
			display: flex;
			align-items: center;
			font-size: 16px;
			line-height: 19px;
			margin-top: 12px;
			.dot{
				background: #999999FF;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				display: inline-block;
				line-height: 19px;
				margin-right: 10px;
			}
		}
	}
</style>
