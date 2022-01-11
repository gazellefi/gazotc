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
				<el-select v-model="value" @change="ChooseCountrys($event)" class="m-2 selectCountry" placeholder="Select" size="large">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.groupId"
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
					<img class="imgFace" :src="srcImg1" id="img1"/>
					<button type="button" class="faceBox" v-show="srcImg1==''">上传身份证正面</button>
					<input id="fileBtn" type="file" @change="upload1($event,'#fileBtn', '#img1');" accept="image/*"  capture="camera"  multiple v-show="srcImg1==''"/>
					<button type="button" class="faceBox"  v-show="srcImg1!=''" @click="showStepGo(5)">下一步</button>
				</div>
				
				<div class="photoBox" v-show="showPhotoTwo">
					<img class="imgFace" :src="srcImg2" id="img2"/>
					<button type="button" class="faceBox" v-show="srcImg2==''">上传身份证背面</button>
					<input id="fileBtn1" type="file" @change="upload2('#fileBtn1', '#img2');" accept="image/*" capture="camera"  multiple v-show="srcImg2==''"/>
					<button type="button" class="faceBox"  v-show="srcImg2!=''" @click="showStepGo(6)">下一步</button>
				</div>
				
				<div class="photoBox" v-show="showPhotoThree">
					<img class="imgFace" :src="srcImg3"  id="img3"/>
					<button type="button" class="faceBox" v-show="srcImg3==''">上传人脸照片</button>
					<input id="fileBtn2" type="file" @change="upload3('#fileBtn2', '#img3');" accept="image/*" multiple capture="camera"  v-show="srcImg3==''"/>
					<button type="button" class="faceBox"  v-show="srcImg3!=''" @click="showStepGo(9)">下一步</button>
				</div>
				<!-- <div class="other" v-show="takePhoto">
					<div class="camera_outer">
						<video id="videoCamera"  :width="videoWidth" :height="videoHeight" autoplay ></video>
						<canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
						<div v-if="srcImg3" class="img_bg_camera">
						    <p>效果预览</p>
						    <img :src="srcImg3" :width="videoWidth" :height="videoHeight" alt class="tx_img" />
						</div>
						<div class="button" style="display: flex;justify-content: center;background-color: #fff;padding: 5px 0;">
					  <el-button @click="getCompetence()">打开摄像头</el-button>
					  <el-button @click="stopNavigator()">关闭摄像头</el-button>
							<div class="borderBox" style="background-color: #000;width: 50px;height: 50px;border-radius: 50%;display: flex;justify-content: center;align-items: center;border: none;">
								<el-button @click="setImage()" style="background-color: #FF3333;width: 40px;height: 40px;border-radius: 50%;border: none;"></el-button>
							</div>
						</div>
				  </div>
					
				</div> -->
			</div>
		</div>
	</div>
	
</template>

<script>
	// import { ref } from 'vue'
	
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
				value:'',
				options:[
					{
						value:'阿尔巴尼亚',
						label:'阿尔巴尼亚',
					},
					{
						value:'阿富汗',
						label:'阿富汗',
					},
					{
						value:'阿拉伯联',
						label:'阿拉伯联',
					},
					{
						value:'阿曼',
						label:'阿曼',
					},
					{
						value:'阿塞拜疆',
						label:'阿塞拜疆',
					},
					{
						value:'埃塞俄比亚',
						label:'埃塞俄比亚',
					},
					{
						value:'爱尔兰',
						label:'爱尔兰',
					},
					{
						value:'安道尔',
						label:'安道尔',
					},
					{
						value:'安哥拉',
						label:'安哥拉',
					},
					{
						value:'安圭拉',
						label:'安圭拉',
					},
					{
						value:'安提瓜和巴布达',
						label:'安提瓜和巴布达',
					},
					{
						value:'奥地利',
						label:'奥地利',
					},
					{
						value:'巴巴多斯',
						label:'巴巴多斯',
					},
					{
						value:'巴布亚新几内亚',
						label:'巴布亚新几内亚',
					},
					{
						value:'巴哈马',
						label:'巴哈马',
					},
					{
						value:'巴西',
						label:'巴西',
					},
					{
						value:'百慕大',
						label:'百慕大',
					},
					{
						value:'保加利亚',
						label:'保加利亚',
					},
					{
						value:'贝宁',
						label:'贝宁',
					},
					{
						value:'比利时',
						label:'比利时',
					},
					{
						value:'冰岛',
						label:'冰岛',
					},
					{
						value:'波多黎各',
						label:'波多黎各',
					},
					{
						value:'波斯尼亚和黑塞哥维那',
						label:'波斯尼亚和黑塞哥维那',
					},
					{
						value:'玻利维亚',
						label:'玻利维亚',
					},
					{
						value:'伯利兹',
						label:'伯利兹',
					},
					{
						value:'博茨瓦纳',
						label:'博茨瓦纳',
					},
					{
						value:'不丹',
						label:'不丹',
					},
					{
						value:'布隆迪',
						label:'布隆迪',
					},
					{
						value:'赤道几内亚',
						label:'赤道几内亚',
					},
					{
						value:'丹麦',
						label:'丹麦',
					},
					{
						value:'多米尼',
						label:'多米尼',
					},
					{
						value:'厄瓜多尔',
						label:'厄瓜多尔',
					},
					{
						value:'法罗群岛',
						label:'法罗群岛',
					},
					{
						value:'菲律宾',
						label:'菲律宾',
					},
					{
						value:'斐济',
						label:'斐济',
					},
					{
						value:'芬兰',
						label:'芬兰',
					},
					{
						value:'佛得角',
						label:'佛得角',
					},
					{
						value:'冈比亚',
						label:'冈比亚',
					},
					{
						value:'刚果（布）',
						label:'刚果（布）',
					},
					{
						value:'哥斯达黎加',
						label:'哥斯达黎加',
					},
					{
						value:'格鲁吉亚',
						label:'格鲁吉亚',
					},
					{
						value:'古巴',
						label:'古巴',
					},
					{
						value:'圭亚那',
						label:'圭亚那',
					},
					{
						value:'哈萨克斯坦',
						label:'哈萨克斯坦',
					},
					{
						value:'韩国',
						label:'韩国',
					},
					{
						value:'荷兰',
						label:'荷兰',
					},
					{
						value:'洪都拉斯',
						label:'洪都拉斯',
					},
					{
						value:'吉布提',
						label:'吉布提',
					},
					{
						value:'吉尔吉斯斯坦',
						label:'吉尔吉斯斯坦',
					},
					{
						value:'几内亚',
						label:'几内亚',
					},
					{
						value:'几内亚比绍',
						label:'几内亚比绍',
					},
					{
						value:'加拿大',
						label:'加拿大',
					},
					{
						value:'捷克',
						label:'捷克',
					},
					{
						value:'津巴布韦',
						label:'津巴布韦',
					},
					{
						value:'喀麦隆',
						label:'喀麦隆',
					},
					{
						value:'卡塔尔',
						label:'卡塔尔',
					},
					{
						value:'开曼群岛',
						label:'开曼群岛',
					},
					{
						value:'科摩罗',
						label:'科摩罗',
					},
					{
						value:'科索沃',
						label:'科索沃',
					},
					{
						value:'科特迪瓦',
						label:'科特迪瓦',
					},
					{
						value:'科威特',
						label:'科威特',
					},
					{
						value:'克罗地亚',
						label:'克罗地亚',
					},
					{
						value:'肯尼亚',
						label:'肯尼亚',
					},
					{
						value:'库拉索',
						label:'库拉索',
					},
					{
						value:'莱索托',
						label:'莱索托',
					},
					{
						value:'老挝',
						label:'老挝',
					},
					{
						value:'黎巴嫩',
						label:'黎巴嫩',
					},
					{
						value:'立陶宛',
						label:'立陶宛',
					},
					{
						value:'利比里亚',
						label:'利比里亚',
					},
					{
						value:'利比亚',
						label:'利比亚',
					},
					{
						value:'列支敦士登',
						label:'列支敦士登',
					},
					{
						value:'卢森堡',
						label:'卢森堡',
					},
					{
						value:'卢旺达',
						label:'卢旺达',
					},
					{
						value:'罗马尼亚',
						label:'罗马尼亚',
					},
					{
						value:'马尔代夫',
						label:'马尔代夫',
					},
					{
						value:'马耳他',
						label:'马耳他',
					},
					{
						value:'马绍尔群岛',
						label:'马绍尔群岛',
					},
					{
						value:'毛里塔尼亚',
						label:'毛里塔尼亚',
					},
					{
						value:'美属维',
						label:'美属维',
					},
					{
						value:'秘鲁',
						label:'秘鲁',
					},
					{
						value:'密克罗尼西亚',
						label:'密克罗尼西亚',
					},
					{
						value:'缅甸',
						label:'缅甸',
					},
					{
						value:'摩洛哥',
						label:'摩洛哥',
					},
					{
						value:'摩纳哥',
						label:'摩纳哥',
					},
					{
						value:'莫桑比克',
						label:'莫桑比克',
					},
					{
						value:'纳米比亚',
						label:'纳米比亚',
					},
					{
						value:'南非',
						label:'南非',
					},
					{
						value:'南苏丹',
						label:'南苏丹',
					},
					{
						value:'尼加拉瓜',
						label:'尼加拉瓜',
					},
					{
						value:'尼泊尔',
						label:'尼泊尔',
					},
					{
						value:'尼日尔',
						label:'尼日尔',
					},
					{
						value:'尼日利亚',
						label:'尼日利亚',
					},
					{
						value:'帕劳',
						label:'帕劳',
					},
					{
						value:'葡萄牙',
						label:'葡萄牙',
					},
					{
						value:'日本',
						label:'日本',
					},
					{
						value:'瑞士',
						label:'瑞士',
					},
					{
						value:'塞尔维亚',
						label:'塞尔维亚',
					},
					{
						value:'塞拉利昂',
						label:'塞拉利昂',
					},
					{
						value:'塞内加尔',
						label:'塞内加尔',
					},
					{
						value:'塞舌尔',
						label:'塞舌尔',
					},
					{
						value:'沙特阿拉伯',
						label:'沙特阿拉伯',
					},
					{
						value:'圣多美和普林西比',
						label:'圣多美和普林西比',
					},
					{
						value:'圣基茨',
						label:'圣基茨',
					},
					{
						value:'圣文森特和格',
						label:'圣文森特和格',
					},
					{
						value:'斯洛伐克',
						label:'斯洛伐克',
					},
					{
						value:'苏丹',
						label:'苏丹',
					},
					{
						value:'苏里南',
						label:'苏里南',
					},
					{
						value:'索马里',
						label:'索马里',
					},
					{
						value:'塔吉克斯坦',
						label:'塔吉克斯坦',
					},
					{
						value:'台湾',
						label:'台湾',
					},
					{
						value:'泰国',
						label:'泰国',
					},
					{
						value:'坦桑尼亚',
						label:'坦桑尼亚',
					},
					{
						value:'汤加',
						label:'汤加',
					},
					{
						value:'特克斯和凯科斯群岛',
						label:'特克斯和凯科斯群岛',
					},
					{
						value:'特立尼达和多巴哥',
						label:'特立尼达和多巴哥',
					},
					{
						value:'突尼斯',
						label:'突尼斯',
					},
					{
						value:'土耳其',
						label:'土耳其',
					},
					{
						value:'土库曼斯坦',
						label:'土库曼斯坦',
					},
					{
						value:'瓦努阿图',
						label:'瓦努阿图',
					},
					{
						value:'危地马拉',
						label:'危地马拉',
					},
					{
						value:'委内瑞拉',
						label:'委内瑞拉',
					},
					{
						value:'文莱',
						label:'文莱',
					},
					{
						value:'乌干达',
						label:'乌干达',
					},
					{
						value:'乌克兰',
						label:'乌克兰',
					},
					{
						value:'乌拉圭',
						label:'乌拉圭',
					},
					{
						value:'乌兹别克斯坦',
						label:'乌兹别克斯坦',
					},
					{
						value:'西班牙',
						label:'西班牙',
					},
					{
						value:'希腊',
						label:'希腊',
					},
					{
						value:'新加坡',
						label:'新加坡',
					},
					{
						value:'新西兰',
						label:'新西兰',
					},
					{
						value:'匈牙利',
						label:'匈牙利',
					},
					{
						value:'叙利亚',
						label:'叙利亚',
					},
					{
						value:'牙买加',
						label:'牙买加',
					},
					{
						value:'亚美尼亚',
						label:'亚美尼亚',
					},
					{
						value:'也门',
						label:'也门',
					},
					{
						value:'伊拉克',
						label:'伊拉克',
					},
					{
						value:'伊朗',
						label:'伊朗',
					},
					{
						value:'以色列',
						label:'以色列',
					},
					{
						value:'意大利',
						label:'意大利',
					},
					{
						value:'印度',
						label:'印度',
					},
					{
						value:'印度尼西亚',
						label:'印度尼西亚',
					},
					{
						value:'英国',
						label:'英国',
					},
					{
						value:'英属维尔京群岛',
						label:'英属维尔京群岛',
					},
					{
						value:'约旦',
						label:'约旦',
					},
					{
						value:'越南',
						label:'越南',
					},
					{
						value:'赞比亚',
						label:'赞比亚',
					},
					{
						value:'泽西岛',
						label:'泽西岛',
					},
					{
						value:'乍得',
						label:'乍得',
					},
					{
						value:'直布罗陀',
						label:'直布罗陀',
					},
					{
						value:'智利',
						label:'智利',
					},
					{
						value:'中非共和国',
						label:'中非共和国',
					},
					{
						value:'中国',
						label:'中国',
					},
					{
						value:'中国澳门特别行政区',
						label:'中国澳门特别行政区',
					},
					{
						value:'中国香港特别行政区',
						label:'中国香港特别行政区',
					},
				],
				srcImg1:'',
				srcImg2:'',
				srcImg3:'',
				address:'',
				thisCancas: null,
				thisContext: null,
				thisVideo: null,
				openVideo:false,
				// forntData:{
				// 	address:address,
				// 	front: this.srcImg2,
				// 	groupId: 0
				// }
				groupId:''
			}
		},
		mounted() {
			for(let k in this.options){
				this.options[k]['groupId']=k;
			}
			// console.log(this.options);
			// this.getCompetence()//进入页面就调用摄像头
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
			showStepGo(e){
				if(e==1){
					this.showStepOne=false;
					this.showStepTwo=true;
				}else if(e==2){
					if(this.groupId==''){
						alert('请选择国家或地区')
					}else{
						this.showStepTwo=false;
						this.showStepThree=true;
					}
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
				  	groupId: this.groupId
				  }
				  // console.log(verifyData);
				  setTimeout(()=>{
				  console.log(verifyData);
					axios({
						method: "post",
						url: "https://192.168.0.48:8083/face/faceAdd",
						data: verifyData,
						headers: { "Content-Type": "application/json"},
						
					  })
						.then((res) => {
							console.log(res);
							if(res.code==0){
								this.showPhotoTwo=true;
								this.showPhoto=false;
							}else{
								this.srcImg1=''
								alert('脸部数据不详')
							}
						  // window.location.href = res;
						})
						.catch((err)=> {
						  console.log(err,111);
						});
				},300)
				
					
				}else if(e==6){
					let verifyData={
						address:address,
						back: this.srcImg2,
						groupId: this.groupId
					}
					console.log(address);
				  axios({
					method: "post",
					url: "https://192.168.0.48:8083/face/faceBack",
					data: verifyData,
					headers: { "Content-Type": "application/json" },
					
				  })
					.then((res) => {
						console.log(res)
						console.log('success');
						if(res.code==0){
							this.showPhotoTwo=false;
							this.showPhotoThree=true;
						}else{
							this.srcImg2=''
							alert('脸部数据不详')
						}
						
					  // window.location.href = res;
					})
					.catch(function (error) {
					  alert("error");
					});
					
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
						axios({
							method: "post",
							url: "https://192.168.0.48:8083/face/faceSearch",
							data: verifyData,
							headers: { "Content-Type": "application/json" },
						})
						.then((res) => {
							console.log(address);
							console.log(res)
							console.log('success');
							if(res.code==0){
								alert('实名验证成功')
								this.$router.go(-1) 
							}else{
								this.srcImg3=''
								alert('脸部数据不详')
							}
						  // window.location.href = res;
						})
						.catch(function (error) {
						  alert("error");
						});
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
			        // $d.setAttribute("src", e.target.result);
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
			},
			ChooseCountrys(e){
				console.log(e);
				this.groupId=Number(e)
				console.log(this.groupId);
			},
			  // 调用权限（打开摄像头功能）
			  getCompetence() {
			    var _this = this;
			    _this.thisCancas = document.getElementById("canvasCamera");
			    _this.thisContext = this.thisCancas.getContext("2d");
			    _this.thisVideo = document.getElementById("videoCamera");
			    _this.thisVideo.style.display = 'block';
			    // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
			    if (navigator.mediaDevices === undefined) {
			      navigator.mediaDevices = {};
			    }
			    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
			    // 使用getUserMedia，因为它会覆盖现有的属性。
			    // 这里，如果缺少getUserMedia属性，就添加它。
			    if (navigator.mediaDevices.getUserMedia === undefined) {
			      navigator.mediaDevices.getUserMedia = function(constraints) {
			        // 首先获取现存的getUserMedia(如果存在)
			        var getUserMedia =
			          navigator.webkitGetUserMedia ||
			          navigator.mozGetUserMedia ||
			          navigator.getUserMedia;
			        // 有些浏览器不支持，会返回错误信息
			        // 保持接口一致
			        if (!getUserMedia) {//不存在则报错
			          return Promise.reject(
			            new Error("getUserMedia is not implemented in this browser")
			          );
			        }
			        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
			        return new Promise(function(resolve, reject) {
			          getUserMedia.call(navigator, constraints, resolve, reject);
			        });
			      };
			    }
			    var constraints = {
			      audio: false,
			      video: {
			        width: this.videoWidth,
			        height: this.videoHeight,
			        transform: "scaleX(-1)"
			      }
			    };
			    navigator.mediaDevices
			      .getUserMedia(constraints)
			      .then(function(stream) {
			        // 旧的浏览器可能没有srcObject
			        if ("srcObject" in _this.thisVideo) {
			          _this.thisVideo.srcObject = stream;
			        } else {
			          // 避免在新的浏览器中使用它，因为它正在被弃用。
			          _this.thisVideo.src = window.URL.createObjectURL(stream);
			        }
			        _this.thisVideo.onloadedmetadata = function(e) {
			          _this.thisVideo.play();
			        };
			      })
			      .catch(err => {
			        console.log(err);
			      });
			  },
			  //  绘制图片（拍照功能）
			  setImage() {
				  console.log(111);
			    var _this = this;
				_this.showPhotoThree=true;
				_this.takePhoto=true;
			    // canvas画图
			    _this.thisContext.drawImage(
			      _this.thisVideo,
			      0,
			      0,
			      _this.videoWidth,
			      _this.videoHeight
			    );
			    // 获取图片base64链接
			    //var image1 = this.thisCancas.toDataURL("image/png");
				console.log(this.thisCancas.toDataURL("image/png"));
			    _this.srcImg3 = this.thisCancas.toDataURL("image/png");//赋值并预览图片
				console.log(_this.srcImg3);
				_this.showStepGo(8);
			  },
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
		
			.verification{
				background-color: #fff;
				width: 100%;
				height: 100%;
			    margin: 0 !important;
				display: flex;
				border-radius: 0px;
				padding: 10%;
				flex-direction: column;
				text-align: center;
				align-items: center;
				justify-content: center;
			}
			.photoBox{
				width: 100%;
			}
			.faceBox{
				padding: 20px;
				width: 100%;
				background-color: rgb(151, 190, 13);
				color: #fff;
				text-shadow: rgba(0, 0, 0, 0.4) 0px 0px 3px;
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
	.selectCountry{
		margin-top: 20px;
		width: 100%;
	}
</style>
