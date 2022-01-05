<template>
	<div class="verifyPage">
		<div class="start" style="opacity: 1;height: 100%;" v-show="showStepOne">
			<div class="verification">
				<div class="content">
					<div class="title">
						Start verification
					</div>
					<div class="main">
						<div class="topMain">
							This process is designed to verify your identity and protect you from identity theft.
						</div>
						<div class="bottomMain">
							Please have your ID ready and click 'Start'.
						</div>
					</div>
					<div class="Footerbtn">
						<button type="button" @click="showStepGo(1)">Start</button>
					</div>
				</div>
			</div>
		</div>
		<div class="ChooseCountry" v-show="showStepTwo">
			<div class="verification">
				<div class="title">Choose issuing country/region</div>
				<el-select v-model="value" class="m-2 selectCountry" placeholder="Select" size="large">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value"
				    >
				    </el-option>
			    </el-select>
				<div class="main">
					<div class="mainTitle">Select ID type</div>
					<div class="mainList">
						<div class="topContent">Use a valid government-issued photo ID.</div>
						<button class="mainItem" @click='showStepGo(2)'>Passport</button>
						<button class="mainItem" @click='showStepGo(2)'>Driver's license</button>
						<button class="mainItem" @click='showStepGo(2)'>Identity card</button>
					</div>
				</div>
			</div>
		</div>
		<div class="ChooseCountry" v-show="showStepThree">
			<div class="verification">
				<div class="title">Choose an upload method</div>
				<div class="main">
					<div class="mainList">
						<!-- <button class="mainItem" @click='showStepGo(3)'>Continue on mobile</button> -->
						<button class="mainItem" @click='showStepGo(3)'>Take photo using webcam</button>
					</div>
				</div>
			</div>
		</div>
		<div class="ChooseCountry" v-show="showStepFour">
			<div class="verification">
				<div class="title">Photo page of passport</div>
				
				<div class="main" v-show="showFourBtn">
					<div class="mainTips">
						Step 1 of 2
					</div>
					<div class="mainList">
						<div class="topContent">Center your ID and take a photo. Make sure all details are clear.</div>
					</div>
					<div class="Footerbtn">
						<button type="button" @click="showStepGo(4)">Start</button>
					</div>
				</div>
				
				<div class="photoBox" v-show="showPhoto">
					<img class="imgFace" :src="srcImg1" id="img"/>
					<button type="button" class="faceBox" v-show="srcImg1==''" @click="showStepGo(5)">上传身份证正面</button>
					<!-- <input id="fileBtn" type="file" @change="upload1('#fileBtn', '#img');" accept="image/*" multiple  v-show="srcImg1==''"/> -->
					<button type="button" class="faceBox"  v-show="srcImg1!=''" @click="showStepGo(5)">下一步</button>
				</div>
				
				<div class="photoBox" v-show="showPhotoTwo">
					<img class="imgFace" :src="srcImg2" id="img"/>
					<button type="button" class="faceBox" v-show="srcImg2==''">上传身份证背面</button>
					<input id="fileBtn1" type="file" @change="upload2('#fileBtn1', '#img');" accept="image/*" multiple  v-show="srcImg2==''"/>
					<button type="button" class="faceBox"  v-show="srcImg2!=''" @click="showStepGo(6)">下一步</button>
				</div>
				
				<div class="photoBox" v-show="showPhotoThree">
					<img class="imgFace" :src="srcImg3" id="img"/>
					<button type="button" class="faceBox" v-show="srcImg3==''">上传人脸照片</button>
					<input id="fileBtn2" type="file" @change="upload3('#fileBtn2', '#img');" accept="image/*" multiple  v-show="srcImg3==''"/>
					<button type="button" class="faceBox"  v-show="srcImg3!=''" @click="showStepGo(7)">下一步</button>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	// import { ref } from 'vue'
	
	// const value = ref('')
	import api from '@/api/api'
	import Web3 from "web3";
	import Web3Modal from "web3modal";
	import Sha256 from "crypto-js/sha256";
	import { Base64 } from "js-base64";
	import config from "../../../config.js";
	import { Toast } from "vant";
	import axios from "axios";
	import QRCode from "qrcodejs2";
	import WalletConnectProvider from "@walletconnect/web3-provider";
	import QRCodeModal from "@walletconnect/qrcode-modal";
	// import VConsole from "vconsole";
	// new VConsole();
	
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
		data(){
			return{
				showStepOne:true,
				showStepTwo:false,
				showStepThree:false,
				showStepFour:false,
				showFourBtn:false,
				showPhoto:false,
				showPhotoTwo:false,
				showPhotoThree:false,
				value:'',
				options:[{
					value:'中国',
					label:'中国',
				}],
				srcImg1:'',
				srcImg2:'',
				srcImg3:'',
				address:'',
				// forntData:{
				// 	address:address,
				// 	front: this.srcImg2,
				// 	groupId: 0
				// }
			}
		},
		mounted() {
			//监测用户是否安装MASK
			if (typeof ethereum === "undefined") {
			  web3 = new Web3(config["hyue"][config["key"]]["Url"]);
			} else {
			  //初始化
			  webinit();
			}
			var dq = this;
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			  dq.isphone = true;
			  this.formLabelWidth = "100px";
			} else {
			  dq.isphone = false;
			}
			if (dq.$route.query.user) {
			  dq.user = dq.$route.query.user;
			}
			if (dq.$route.query.ref) {
			  dq.recommender = dq.$route.query.user;
			}
			async function webinit() {
			  const providerOptions = {
				/* See Provider Options Section */
			  };
			  const web3Modal = new Web3Modal({
				network: "mainnet",
				cacheProvider: true,
				providerOptions,
			  });
			  var provider = await web3Modal.connect();
			  web3 = new Web3(provider);
			  
			  if (web3 && provider) {
				//其他钱包使用测试网络
				// if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
				//     var wlcode = window.ethereum.networkVersion;
				//     //imtoken只能查看 无法操作 出发是ETF主网
				//     if (window.ethereum.isImToken) {
				//         web3.setProvider(config["hyue"][config["key"]]["Url"]);
				//     }
				//     //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
				//     if (window.ethereum.isMetaMask && wlcode != 4) {
				//         web3.setProvider(config["hyue"][config["key"]]["Url"]);
				//     }
				// }else{
				//     web3.setProvider(config["hyue"][config["key"]]["Url"]);
				// }
				address = provider.selectedAddress;
				dq.address = address;
				dq.address = address;
				console.log(dq.address.length);
				console.log(dq.address);
				if (dq.address.length > 20) {
				  let stars = "****";
				  dq.addressRm =
					dq.address.substr(0, 4) +
					stars +
					dq.address.substr(dq.address.length - 4);
				}
			
			  }
			}
		},
		methods:{
			showStepGo(e){
				if(e==1){
					this.showStepOne=false;
					this.showStepTwo=true;
				}else if(e==2){
					this.showStepTwo=false;
					this.showStepThree=true;
				}else if(e==3){
					this.showStepThree=false;
					this.showStepFour=true;
					this.showFourBtn=true;
				}else if(e==4){
					this.showFourBtn=false;
					this.showPhoto=true;
					
				}else if(e==5){
					// navigator.getUserMedia({ "video": true }, function (stream) {video.src = stream;video.play();}, ()=>{console.log(111);})
				  let verifyData={
				  	address:address,
				  	front: this.srcImg1,
				  	groupId: 0
				  }
				  console.log(verifyData);
				  axios({
					method: "post",
					url: "https://gazotc.com:8083/face/faceAdd",
					data: verifyData,
					headers: { "Content-Type": "application/json" }
					
				  })
					.then((res) => {
						if(res.code==0){
							this.showPhotoTwo=true;
							this.showPhoto=false;
						}else{}
					  // window.location.href = res;
					})
					.catch(function (error) {
					  alert("error");
					});
					
				}else if(e==6){
					let verifyData={
						address:address,
						back: this.srcImg2,
						groupId: 0
					}
					console.log(address);
				  axios({
					method: "post",
					url: "https://gazotc.com:8083/face/faceBack",
					data: verifyData,
					headers: { "Content-Type": "application/json" },
					
				  })
					.then((res) => {
						console.log(res)
						console.log('success');
						if(res.code==0){
							this.showPhotoTwo=false;
							this.showPhotoThree=true;
						}
						
					  // window.location.href = res;
					})
					.catch(function (error) {
					  alert("error");
					});
					
				}else if(e==7){
					let verifyData={
						address:address,
						front: this.srcImg3,
						groupId: 0
					}
				  console.log(verifyData);
					axios({
						method: "post",
						url: "https://gazotc.com:8083/face/faceSearch",
						data: verifyData,
						headers: { "Content-Type": "application/json" },
					})
					.then((res) => {
						console.log(address);
						console.log(res)
						console.log('success');
					  // window.location.href = res;
					})
					.catch(function (error) {
					  alert("error");
					});
				}
			},
			upload1(c, d){
				var that = this
			    var c = document.querySelector(c),
			        d = document.querySelector(d),
			        file = c.files[0],
			        reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e){
						that.$nextTick(()=>{
							that.srcImg1=e.target.result
							console.log(address)
						})
			        // $d.setAttribute("src", e.target.result);
			    }
			},
			upload2(c, d){
				var that = this
			    var c = document.querySelector(c),
			        d = document.querySelector(d),
			        file = c.files[0],
			        reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e){
						that.$nextTick(()=>{
							that.srcImg2=e.target.result
							console.log(address)
						})
			        // $d.setAttribute("src", e.target.result);
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
			        // $d.setAttribute("src", e.target.result);
			    }
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	body{
		width: 100%;
		height: 100%;
	}
	.verifyPage{
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
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
			width: 80%;
			margin: 10%;
			border-radius: 5px;
			display: flex;
			// flex-direction: column;
			text-align: center;
			align-items: center;
			justify-content: center;
			.content{
				max-width: 415px;
				.title{
					font-size: 40px;
					vertical-align: baseline;
					font-weight: 400;
				}
				.main{
					font-weight: 400;
					font-size: 20px;
					line-height: 1.5;
					text-align: left;
					padding: 20px;
					.bottomMain{
						margin-top: 20px;
					}
				}
				.Footerbtn{
					button{
						padding: 20px;
						width: 100%;
						background-color: rgb(151, 190, 13);
						color: #fff;
						text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
						border-radius: 5px;
					}
				}
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
		width: 80%;
		margin: 10%;
		border-radius: 5px;
		display: flex;
		// flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
		.title{
			font-size: 32px;
			vertical-align: baseline;
			font-weight: 400;
			margin: 28px 0 6px;
			
		}
		.photoBox{
			display: flex;
			flex-direction: column;
			text-align: center;
			img{
				width: 80%;
				margin: 0 10%;
			}
			.imgFace{
				max-height: 500px;
				max-width: 400px;
				margin-top: 10px;
			}
			#fileBtn{
				position: absolute;
				opacity: 0;
				padding: 15px;
			}
			#fileBtn1{
				position: absolute;
				opacity: 0;
				padding: 15px;
			}
			#fileBtn2{
				position: absolute;
				opacity: 0;
				padding: 15px;
			}
			.faceBox{
				padding: 15px;
				width: 100%;
				background-color: rgb(151, 190, 13);
				color: #fff;
				text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
				border-radius: 5px;
				margin-top: 15px;
			}
		}
		.main{
			.mainTitle{
				font-size: 28px;
				margin-top:20px;
				margin-bottom: 10px;
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
					margin-bottom: 20px;
				}
				.mainItem{
					margin-bottom: 10px;
					height: 60px;
					background-color: #fff;
					padding: 0 28px;
					border-radius: 4px;
					border: 0;
					box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,.2);
					cursor: pointer;
					text-align: left;
				}
				.mainItem:hover{
					background-color: #dfdfdf;
				}
			}
		}
		.Footerbtn{
			button{
				padding: 20px;
				width: 100%;
				background-color: rgb(151, 190, 13);
				color: #fff;
				text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
				border-radius: 5px;
			}
		}
	}
	@media screen and (max-width: 991px) {
	.start{
		box-sizing: border-box;
			.verification{
				background-color: #fff;
				width: 100%;
				height: 100%;
			    margin: 0 !important;
				display: flex;
				border-radius: 0px;
				padding: 10%;
				// flex-direction: column;
				text-align: center;
				align-items: center;
				justify-content: center;
				.content{
					max-width: 415px;
					.Footerbut{
						button{
							padding: 20px;
							width: 100%;
							background-color: rgb(151, 190, 13);
							color: #fff;
							text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
						}
					}
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
			width: 100% !important;
			margin: 0 !important;
			border-radius: 5px;
			display: flex;
			// flex-direction: column;
			text-align: center;
			align-items: center;
			justify-content: center;
			.title{
				font-size: 32px;
				vertical-align: baseline;
				font-weight: 400;
				margin: 28px 0 6px;
				
			}
			.main{
				.mainTitle{
					font-size: 28px;
					margin-top:20px;
					margin-bottom: 10px;
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
						margin-bottom: 20px;
					}
					.mainItem{
						margin-bottom: 10px;
						height: 60px;
						background-color: #fff;
						padding: 0 28px;
						border-radius: 4px;
						border: 0;
						box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,.2);
						cursor: pointer;
						text-align: left;
					}
					.mainItem:hover{
						background-color: #dfdfdf;
					}
				}
			}
			.Footerbtn{
				button{
					padding: 20px;
					width: 100%;
					background-color: rgb(151, 190, 13);
					color: #fff;
					text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
				}
			}
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
</style>
