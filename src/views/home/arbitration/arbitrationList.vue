<template>
	<div>
		<!-- pc -->
		<div class="hidden-sm-and-down">
			<div class="f c_b top_nav">
					<div class="f a_c cursor fz14" style="color: #000000;">
						<span>{{$t('message.join1')}}<span class="c935" style="text-decoration:underline ;" @click="toDiscard">Discard</span></span>
						<img @click="toDiscard" src="../../../assets/img/discard.png" style="width: 24px;">
						<span>{{$t('message.join2')}}</span>
						<span class="c935" style="text-decoration:underline ;" @click="toGazOTC">GazOTCarb</span>
						<i @click="toGazOTC" class="el-icon-s-promotion" style="color: #333;font-size: 24px;margin-top: -4px;margin-right: 5px;"></i>
						<span>{{$t('message.join3')}}</span>
					</div>
				
				<div class="f">
					<div class="f c_c a_c cursor" @click="sq_zcy_dialog(2)">
						<img :src="addIcon" width="22px" height="21px" style="margin-top: -2px;">
						<span class="top_text">{{$t("message.arbitration.applyArbitration")}}</span>
					</div>
					<div class="f c_c a_c cursor"  @click="sq_zcy_dialog(3)" style="margin-left: 50px;">
						<img :src="exitlIcon" width="24px" height="21px">
						<span class="top_text">{{$t("message.arbitration.exitArbitration")}}</span>
					</div>
				</div>
			</div>
			<el-container class="fc table_nav">
			 
			  <el-table :data="zc_list" style="width: 100%">
			    <el-table-column align="center" fixed prop="index" :label="$t('message.arbitration.serial')"></el-table-column>
			    <el-table-column align="center" prop="store" :label="$t('message.arbitration.arbitrator')">
			      <template slot-scope="scope">
			        <div class="zcy_list_user">{{ scope.row.username }}</div>
			        <div class="zcy_list_username">{{ scope.row.user_b }}</div>
			      </template>
			    </el-table-column>
			    <el-table-column align="center" prop="invite" :label="$t('message.arbitration.inviteNumber')"></el-table-column>
			    <el-table-column align="center" prop="succeed" :label="$t('message.arbitration.singular')"></el-table-column>
			    <el-table-column align="center" prop="appl" :label="$t('message.arbitration.regNumber')"></el-table-column>
			    <el-table-column align="center" prop="balanceMar" :label="$t('message.arbitration.balance')">
			      <template slot-scope="scope">
			        {{scope.row.balanceMar  }} GAZ
			      </template>
			    </el-table-column>
			    <el-table-column  align="center" prop="lock" :label="$t('message.state')">
			      <template slot-scope="scope">
			        <span :class="[scope.row.lock == 0 ? 'normal_style':'frozen_style']">{{scope.row.lock == 0 ? $t('message.arbitration.normal'):$t('message.arbitration.frozen')  }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column align="center" :label="$t('message.operation')">
			      <template slot-scope="scope">
			        <el-button round class="invitationBnt" size="mini" :loading="scope.row.jiazai" :disabled="scope.row.lock == 1 ? true:false" @click="yaoqingajax(scope.row)">{{$t('message.arbitration.invite')}}</el-button>
			      </template>
			    </el-table-column>
				<div slot="empty">
					<div style="padding-top: 20px;" class="f a_c c_c">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p>暂无数据</p>
				</div>
			  </el-table>
			</el-container>
		</div>
		<!-- wap -->
		<div class="hidden-sm-and-up">
			<!-- 申请   退出 -->
			<div class="fc">
				<div class="f">
					<div class="f c_c a_c cursor" @click="sq_zcy_dialog(2)">
						<img :src="addIcon" width="22px" height="21px" style="margin-top: -2px;">
						<span class="top_text">{{$t("message.arbitration.applyArbitration")}}</span>
					</div>
					<div class="f c_c a_c cursor"  @click="sq_zcy_dialog(3)" style="margin-left: 50px;">
						<img :src="exitlIcon" width="24px" height="21px">
						<span class="top_text">{{$t("message.arbitration.exitArbitration")}}</span>
					</div>
				</div>
				<div class="f a_c cursor fz14 mart-10" style="color: #000000;">
					<span>{{$t('message.join1')}}<span class="c3c" style="text-decoration:underline ;" @click="toDiscard">discard</span></span>
					<img @click="toDiscard" src="../../../assets/img/discard.png" style="width: 24px;">
					<span>{{$t('message.join2')}}</span>
					<span class="c3c" style="text-decoration:underline ;">Telegram</span>
					<i @click="toGazOTC" class="el-icon-s-promotion" style="color: #333;font-size: 24px;margin-top: -4px;margin-right: 5px;"></i>
					<span>{{$t('message.join3')}}</span>
				</div>
			</div>
			<div class="listWap" v-for="(item,index) in zc_list" :key="index">
				<div class="listItem">
					<div class="topWap">
						<span class="topLabel fwb">{{$t('message.arbitration.arbitrator')}}:</span>
						<!-- {{ item.username }} -->
						<div class="topMain">
							<div class="topUser">{{ item.username }}</div>
							<div class="topUsername">{{ item.user_b }}</div>
						</div>
					</div>
					<div class="mainWap" style="margin-top: 10px;">
						<div class="mainLeft">
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.serial')}}：</span>
								<span class="">{{item.index}}</span>
							</div>
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.balance')}}：</span>
								<span>{{item.balanceMar}} GAZ</span>
							</div>
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.frozenState')}}：</span>
								<span :class="[item.lock == 0 ? 'normal_style':'frozen_style']">{{item.lock == 0 ? $t('message.arbitration.normal'):$t('message.arbitration.frozen')  }}</span>
							</div>
						</div>
						<div class="mainRight">
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.inviteNumber')}}：</span>
								<span>{{item.invite}}</span>
							</div>
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.singular')}}：</span>
								<span>{{item.succeed}}</span>
							</div>
							<div class="mainItem">
								<span class="fwb">{{$t('message.arbitration.regNumber')}}：</span>
								<span>{{item.appl}}</span>
							</div>
						</div>
					</div>
					<div class="footerWap" style="margin-top: 10px;">
						<el-button round class="invitationBnt invitationBnt_wap"  size="normal" :loading="item.jiazai" :disabled="item.lock == 1 ? true:false" @click="yaoqingajax(item)">{{$t('message.arbitration.invite')}}</el-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 邀请弹框 -->
		<el-dialog :title="tetle" :visible.sync="dialogFormVisible" center :width="isphone ? '90%':'50%'" :show-close="false">
		  <el-form :model="zc_user_yq" label-position="left" :label-width="formLabelWidth">
		    <el-form-item :label="$t('message.arbitration.account')+':'"   v-if="btnType == 1">
		      <span @click="copy(zc_user_yq.my_user)">{{isphone ? $getStr(zc_user_yq.my_user) : zc_user_yq.my_user}}</span>
		    </el-form-item>
			<el-form-item :label="$t('message.arbitration.nickname')+':'" v-if="btnType == 1">
				<span>{{zc_user_yq.my_name == 'Not filled in yet' ? $t('message.arbitration.haveName') : zc_user_yq.my_name}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.order')+':'" v-if="btnType == 1" class="input_nav">
			   <div class="f c_b a_c sarch_nav">
			  	<el-input v-model="zc_user_yq.did" autocomplete="off" size="mini" class="search_input" :placeholder="$t('message.arbitration.enterOrderNum')"></el-input>
				<el-button icon="el-icon-search" circle @click="sousou_dd" :loading="loadingsoudd"></el-button>
			  </div>
				<!-- <el-input v-model="zc_user_yq.did"style="padding: 1px;border: 1px solid;border-radius: 30px; width: 15%;" autocomplete="off" size="mini" class="search_input" :placeholder="$t('message.arbitration.enterOrderNum')"></el-input>
				<el-button icon="el-icon-search" style="position: absolute; bottom: 2px;" circle @click="sousou_dd" :loading="loadingsoudd"></el-button> -->
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.character')+':'" v-if="btnType == 1">
			  <span>{{zc_user_yq.juese}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.cost')+':'" v-if="btnType == 1">
			  <span>{{zc_user_yq.zc_je}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.mark')+':'"  v-if="btnType == 1">
			  <el-radio-group v-model="zc_user_yq.zc_key" text-color="#fed52c" fill="#000">
			      <el-radio label="1" :disabled="zc_user_yq.zc_key!=0">{{$t('message.arbitration.assets')}}</el-radio>
			      <el-radio label="2" :disabled="zc_user_yq.zc_key!=0">{{$t('message.arbitration.margin')}}</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.invite')+':'" v-if="btnType == 1">
			  <span  @click="copy(zc_user_yq.form_user)">{{isphone ? $getStr(zc_user_yq.form_user) : zc_user_yq.form_user}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.invited')+':'" v-if="btnType == 1">
			  <div class=""  v-for="(li,index) in zc_user_yq.u_array" :key="index">
			  	<span>{{ index+1 }}.{{ li.username }}</span>
				<span class="cf0">{{li.user}}</span>
			  </div>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.account')+':'" v-if="btnType == 2 || btnType == 3">
			  <span>{{sq_zc_data.info.user}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.nickname')+':'" v-if="btnType == 2 || btnType == 3">
				<span>{{sq_zc_data.info.username == 'Not filled in yet' ? $t('message.arbitration.haveName') : sq_zc_data.info.username}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.Serial')+':'" v-if="btnType == 3">
			  <span>{{sq_zc_data.info.cg_zcid}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.orderNum')+':'" v-if="btnType == 2 || btnType == 3">
			  <span>{{sq_zc_data.info.sq_ddnum}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.successNum')+':'" v-if="btnType == 2">
			  <span>{{sq_zc_data.info.cg_zcddnum}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.marginBalan')+':'" v-if="btnType == 2">
			  <span>{{sq_zc_data.info.user_bzj.toFixed(2)+' GAZ'}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.canUse')+':'" v-if="btnType == 1 || btnType == 2">
			  <span>{{Number(balance / 10 ** 18).toFixed(2)+'GAZ'}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.payBalance')+':'"  v-if="btnType == 2">
			  <div class="f c_b a_c sarch_nav">
			  	<el-input v-model="sq_zc_data.je" autocomplete="off" size="mini" class="search_input" :placeholder="$t('message.arbitration.enterAmount')"></el-input>
			  </div>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.invitedNum')+':'" v-if="btnType == 3">
			  <span>{{sq_zc_data.info.yq_ddnum}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.partOrderNum')+':'" v-if="btnType == 3">
			  <span>{{sq_zc_data.info.del_ddnum}}</span>
			</el-form-item>
			<el-form-item :label="$t('message.arbitration.marginBalan')+':'" v-if="btnType == 3">
			  <span>{{sq_zc_data.info.user_bzj.toFixed(2)+' GAZ'}}</span>
			</el-form-item>
			
			<el-form-item :label="$t('message.arbitration.withdrawalAmount')+':'"  v-if="btnType == 3">
			  <div class="f c_b a_c sarch_nav">
			  	<el-input v-model="sq_zc_data.je" autocomplete="off" size="mini" class="search_input" :placeholder="$t('message.arbitration.enterAmount')"></el-input>
			  </div>
			</el-form-item>
			
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button v-if="btnType == 1" round class="invitationBnt submitBtn" :disabled="zc_user_yq.jyong" @click="yq_zc_ajax" >{{$t('message.sumbmit')}}</el-button>
			<el-button v-else round class="invitationBnt submitBtn" @click="yq_zc_ajax" >{{$t('message.sumbmit')}}</el-button>
		  </div>
		</el-dialog>
	</div>
	
</template>

<script>
	//新版配置 模块化
	import config from "@/config";
	
	//数据MODEL
	import ZclistModel from "@/conn/zc/ZclistModel.json";
	
	var bzjnum = config['hyue'][config['key']]['Bzj']['num'];
	//模块
	let Base64 = require('js-base64').Base64;
	import Web3 from "web3";
	import Web3Modal from "web3modal";
	var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;
	import { Dialog, Toast } from 'vant';
	var hbilist = config['hbi'][config['key']];
	var hbarr = [];
	var i = 1;
	for (const key in hbilist) {
	  i++;
	  hbarr.push({
	    id: i,
	    key: hbilist[key]['heyue'],
	    abi: hbilist[key]['abi'],
	    title: hbilist[key]['id'],
	    num: hbilist[key]['num']
	  });
	}
	export default{
		data(){
			return {
			    hbilist: hbarr,
			    hbindex: 0,
				loadingsoudd:false,
				isphone: false,
				zc_list: [],
				btnType: 1, // 点击按钮位置  1： 邀请   2： 申请    3： 退出
				// 弹框数据
				zc_user_yq: {
				  dinfo: {
				    sj_user: '',
				    u_user: '',
				    sj_bzj: 0,
				    what: 0,
				    u_bjz: 0
				  },
				  jyong: true,
				  show: false,
				  my_user: '',
				  my_name: '',
				  did: '',
				  juese: '',
				  zc_je: 0,
				  zc_key: "1",
				  form_user: '',
				  u_array: [],
				  index: 0,
				  jiazai: false
				},
				balance:'',
				dialogFormVisible: false,
				formLabelWidth: '210px',
				searchIcon: require('@/assets/img/search.png'),
				exitlIcon: require('@/assets/img/exitIcon.png'),
				addIcon: require('@/assets/img/add.png'),
				//申请仲裁者
				sq_zc_data: {
				  show: false,
				  sign: [
				    { value: "0", label: "sign up" },
				    { value: "1", label: "Withdrawal" },
				  ],
				  signDefualt: "0",
				  inputDevice: null,
				  info: {
				    user: '',
				    username: '',
				    sq_ddnum: 0,
				    yq_ddnum: 0,
				    del_ddnum: 0,
				    cg_zcddnum: 0,
				    cg_zcid: 0,
				    user_bzj: 0,
					payBalance: 0, // 缴纳保证金额
					withdrawalAmount: 0 // 提现余额
				  },
				  je: null
				},
			}
		},
		computed:{
			tetle(){
				if(this.btnType == 1){
					return this.$t('message.arbitration.invitetion')
				}else if(this.btnType == 2){
					return this.$t('message.arbitration.apply')
				}else if(this.btnType == 3){
					return this.$t('message.arbitration.exit')
				}
			}
		},
		created() {
		  var dq = this;
		  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		    dq.isphone = true;
			this.formLabelWidth = '100px'
		  } else {
		    dq.isphone = false;
		  }
		  if (this.$route.query.title) {
		    for (let index = 0; index < this.hbilist.length; index++) {
		  	  if (this.hbilist[index]['title'] == this.$route.query.title) {
		  	    this.hbindex = index;
		  	    break;
		  	  }
		    }
		  }
		  
		  //监测用户是否安装MASK
		  if (typeof ethereum === "undefined") {
		    web3 = new Web3(config['hyue'][config['key']]['Url']);
		  } else {
		    //初始化
		    webinit();
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
		      ArbOne = new web3.eth.Contract(
		        config['hyue'][config['key']]['ArbOne']['abi'],
		        config['hyue'][config['key']]['ArbOne']['heyue']
		      );
		      ArbTwo = new web3.eth.Contract(
		        config['hyue'][config['key']]['arbTwo']['abi'],
		        config['hyue'][config['key']]['arbTwo']['heyue']
		      );
		      GazConn = new web3.eth.Contract(
		        config['hyue'][config['key']]['gaz']['abi'],
		        config['hyue'][config['key']]['gaz']['heyue']
		      );
		      Dotc = new web3.eth.Contract(
		        config['hyue'][config['key']]['dotc']['abi'],
		        config['hyue'][config['key']]['dotc']['heyue']
		      );
		      Arbdate = new web3.eth.Contract(
		        config['hyue'][config['key']]['Arbdate']['abi'],
		        config['hyue'][config['key']]['Arbdate']['heyue']
		      );
		      dq.getList()
		      dq.user = address.toLowerCase();
			  dq.getBalane()
		      dq.tabindex = "3";
		    }
		  }
		},
		methods:{
			async copy(value) {
			  await this.$nextTick(e => { })
			  // var Url2 = document.querySelector(".copy .van-field__control");
			  if (!value) return
			  const input = document.createElement('input');
			  document.body.appendChild(input);
			  input.setAttribute('value', value);
			  input.select();
			  if (document.execCommand('copy')) {
			    document.execCommand('copy');
			    this.$toast('复制成功')
			  }
			  document.body.removeChild(input);
			},
			toDiscard(){
				window.open("https://discord.gg/2DVfmvUBgH")
			},
			toGazOTC(){
				window.open("https://t.me/GazotcArb")
			},
			getList(){
				var dq = this;
				var list = [];
				ArbOne.methods.list_arbitrators().call((err, ret) => {
				  if (ret) {
					  console.log(ret)
				    if (ret[2].length > 0) {
				      var userarr = ret[0];
				      var namearr = ret[1];
				      var infoarr = ret[2];
				      for (let index = 0; index < infoarr.length; index++) {
				        var obj = {};
				        for (const key in ZclistModel) {
				          obj[key] = ZclistModel[key];
				        }
				        var user = userarr[index].substring(0, 5) + "····" + userarr[index].substring(userarr[index].length - 5, userarr[index].length);
				        obj['index'] = index + 1;
				        obj['user'] = userarr[index];
				        obj['username'] = Base64.decode(namearr[index]);
				        obj['user_b'] = user;
				        obj['succeed'] = Number(infoarr[index][0]);
				        obj['balanceMar'] = (Number(infoarr[index][1]) / (10 ** bzjnum)).toFixed(2);
				        obj['lock'] = Number(infoarr[index][2]);
				        obj['invite'] = Number(infoarr[index][3]);
				        obj['appl'] = Number(infoarr[index][4]);
				        list.push(obj);
				      }
					  console.log(list)
				      dq.zc_list = list;
					  console.log(dq.zc_list)
				    }
				  }
				});
			},
			
			async getBalane(){
				var dq = this
				const providerOptions = {
				  /* See Provider Options Section */
				};
				const web3Modal = new Web3Modal({
				  // network: "mainnet",
				  // cacheProvider: true,
				  providerOptions,
				});
				var provider = await web3Modal.connect();
				web3 = new Web3(provider);
				// console.log(web3);
				var proconn = new web3.eth.Contract(config['hbi'][config['key']][dq.hbilist[3]['title']]['abi'],config['hbi'][config['key']][dq.hbilist[3]['title']]['heyue']);
				dq.balance = await proconn.methods.balanceOf(address).call();
				console.log(dq.balance)
			},
    //如果过亿请转换
    getFNum(num_str) {
      num_str = num_str.toString();
      if (num_str.indexOf("+") != -1) {
        num_str = num_str.replace("+", "");
      }
      if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
        var resValue = "",
          power = "",
          result = null,
          dotIndex = 0,
          resArr = [],
          sym = "";
        var numStr = num_str.toString();
        if (numStr[0] == "-") {
          // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
          numStr = numStr.substr(1);
          sym = "-";
        }
        if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
          var regExp = new RegExp(
            "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
            "ig"
          );
          result = regExp.exec(numStr);
          console.log(1324)
          console.log(result)
          if (result != null) {
            resValue = result[2];
            power = result[5];
            result = null;
          }
          console.log(!resValue)
          console.log(!power)
          if (!resValue && !power) {
            return false;
          }
          dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
          resValue = resValue.replace(".", "");
          resArr = resValue.split("");
          console.log(resArr)
          if (Number(power) >= 0) {
            var subres = resValue.substr(dotIndex);
            var length = dotIndex == 0 ? 0 : subres.length;
            power = Number(power);
            //幂数大于小数点后面的数字位数时，后面加0
            for (var i = 0; i < power - length; i++) {
              resArr.push("0");
            }
            if (power - subres.length < 0) {
              resArr.splice(dotIndex + power, 0, ".");
            }
          } else {
            power = power.replace("-", "");
            power = Number(power);
            //幂数大于等于 小数点的index位置, 前面加0
            for (let i = 0; i < power - dotIndex; i++) {
              resArr.unshift("0");
            }
            var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
            resArr.splice(n, 0, ".");
          }
        }
        resValue = resArr.join("");

        return sym + resValue;
      } else {
        return num_str;
      }
    },
			//邀请仲裁者
			async yaoqingajax(row) {
			  this.btnType = 1
			  var index = row['index'] - 1;
			  var rows = this.zc_list[index];
			  this.zc_user_yq['show'] = true;
			  this.zc_user_yq['my_user'] = address;
			  var uname = await ArbOne.methods.message(address + "", "0").call();
			  this.zc_user_yq['my_name'] = uname ? Base64.decode(uname) : '未填写';
			  this.zc_user_yq['form_user'] = rows['user'];
			  this.zc_user_yq['index'] = index;
			  this.dialogFormVisible = true
			},
			//邀请仲裁
			async yq_zc_ajax() {
				// 邀请
			  if(this.btnType == 1){
				  if (!this.zc_user_yq['form_user']) {
				    return;
				  }
				  this.dialogFormVisible = false
				  var dq = this;
				  //查询授权状态与GAZ余额
				  var gaz_sq = await GazConn.methods.allowance(address + "", config['hyue'][config['key']]['ArbOne']['heyue']).call();
				  var gaz_sqa = Number(gaz_sq) / (10 ** bzjnum);
				  if (gaz_sqa < 1000) {
				    //需要先授权
				    dq.loadingsoudd = true;
				    Dialog.confirm({
				      message: 'GAZ未经授权。它是授权的吗？',
				      confirmButtonText: 'determine',
				      cancelButtonText: 'cancel',
				      cancelButtonColor: '',
				      getContainer: 'body'
				    }).then(() => {
				      GazConn.methods.approve(config['hyue'][config['key']]['ArbOne']['heyue']).send({ from: address }, () => {
				        Gazis();
				      });
				    }).catch(() => { });
				    return;
				  } else { add_sq_ajax(); }
				  //轮询检测授权是否成功
				  function Gazis() {
				    GazConn.methods.allowance(address + "", config['hyue'][config['key']]['ArbOne']['heyue']).call((err, ret) => {
				      if ((Number(ret) / (10 ** bzjnum)) > gaz_sqa) {
				        add_sq_ajax();
				      } else {
				        setTimeout(() => {
				          Gazis();
				        }, 3000);
				      }
				    });
				  }
				  function add_sq_ajax() {
				    ArbOne.methods.hope(dq.zc_user_yq['did'] + "", dq.zc_user_yq['zc_key'], dq.zc_user_yq['form_user'] + "").send({
				      from: address
				    }, (err, ret) => {
				      console.log(ret);
				    });
				  }
			  }else if(this.btnType == 2){ //申请
				  this.sq_zcy_ajax()
			  }else{ // 退出
				  this.sq_zc_data.signDefualt=1
				  this.sq_zcy_ajax()
			  }
			},
			
			// 申请成为仲裁员 按钮
			async sq_zcy_dialog(type) {
			  this.btnType = type
			  this.sq_zc_data.info = Object.assign(this.sq_zc_data.info,{
			    user: '',
			    username: '',
			    sq_ddnum: 0,
			    yq_ddnum: 0,
			    del_ddnum: 0,
			    cg_zcddnum: 0,
			    cg_zcid: 0,
			    user_bzj: 0,
			  });
			  this.dialogFormVisible = true;
			  ArbOne.methods.ownermess(address + "").call((err, ret) => {
			    this.sq_zc_data['info'] = {
			      user: address,
			      username: ret[0] ? Base64.decode(ret[0]) : 'Not filled in yet',
			      sq_ddnum: ret[1][2],
			      yq_ddnum: ret[1][3],
			      del_ddnum: ret[1][4],
			      cg_zcddnum: ret[1][5],
			      cg_zcid: ret[1][1],
			      user_bzj: Number(ret[1][0]) / (10 ** bzjnum),
			      suo: ret[1][6]
			    };
				  let sq=this.sq_zc_data.info.user;
				  console.log(sq.length)
				  if(sq.length>12){
					let stars='****';
					let str=''
					str=sq.substr(0,4) + stars + sq.substr(sq.length-4);
					this.sq_zc_data.info.user=str
				  }
			  });
			},
			//申请仲裁员或者提款
			async sq_zcy_ajax() {
			  var dq = this;
			  if (this.sq_zc_data['signDefualt'] == 1) {
			    if (this.sq_zc_data['je'] == 0) {
			      return;
			    }
			    console.log(this.sq_zc_data['info']['user_bzj'])
			    if (this.sq_zc_data['je'] > this.sq_zc_data['info']['user_bzj']) {
			      return;
			    }
			    if (this.sq_zc_data['info']['suo'] == 1) {
			      dq.$confirm('Freezing, cannot withdraw cash!', dq.$t('message.prompt'), {
			        confirmButtonText: 'determine',
			        cancelButtonText: 'cancel',
			        type: 'warning'
			      }).then(() => { }).catch(() => { });
			      return;
			    }
			    var tk_je = dq.getFNum(this.sq_zc_data['je'] * (10 ** bzjnum));
				console.log(this.sq_zc_data['je'])
			    console.log(tk_je,bzjnum)
			    //执行提款AJAX exitArb
			    ArbOne.methods.exitArb(address + "", tk_je + "").send({
			      from: address
			    }, (err, ret) => {
			      if (ret) {
			        Toast.clear();
			        Toast.success('提现成功。请稍后再查');
					this.dialogFormVisible=false
					this.sq_zc_data.je=0
			      } else {
			        Toast.clear();
			        Toast.fail('请同意授权！');
			      }
			    });
			  } else {
			    if (this.sq_zc_data['info']['cg_zcid'] != 0) {
			      alert('Registered');
			      return;
			    }
			    if (this.sq_zc_data['je'] <= 0) {
					console.log(this.sq_zc_data)
			      alert('Please fill in the amount correctly');
			      return;
			    }
			    var lea = await ArbOne.methods.lea().call();
			    lea = Number(lea) / (10 ** bzjnum);
			    if (this.sq_zc_data['je'] < lea) {
			      alert('Not less than the minimum deposit');
			      return;
			    }
			    //查询授权状态与GAZ余额
			    var gaz_sq = await GazConn.methods.allowance(address + "", config['hyue'][config['key']]['ArbOne']['heyue']).call();
			    var gaz_sqa = Number(gaz_sq) / (10 ** bzjnum);
				console.log(gaz_sqa)
			    if (gaz_sqa < this.sq_zc_data['je']) {
			      //需要先授权
			      Dialog.confirm({
			        message: 'GAZ未经授权。它是授权的吗？',
			        confirmButtonText: 'determine',
			        cancelButtonText: 'cancel',
			        cancelButtonColor: '',
			        getContainer: 'body'
			      }).then(() => {
			        Toast.loading({
			          message: 'GAZ授权。。。',
			          forbidClick: true,
			          loadingType: 'spinner',
			        });
			        GazConn.methods.approve(config['hyue'][config['key']]['ArbOne']['heyue']).send({ from: address }, () => {
			          Gazis();
			        });
			      }).catch(() => { });
			      return;
			    }
			
			    add_sq_ajax();
			
			  }
			
			
			  //轮询检测授权是否成功
			  function Gazis() {
			    GazConn.methods.allowance(address + "", config['hyue'][config['key']]['ArbOne']['heyue']).call((err, ret) => {
			      if ((Number(ret) / (10 ** bzjnum)) > gaz_sqa) {
			        add_sq_ajax();
			      } else {
			        setTimeout(() => {
			          Gazis();
			        }, 3000);
			      }
			    });
			  }
			
			  //提交申请
			  function add_sq_ajax() {
			    var num = dq.getFNum(Number(dq.sq_zc_data['je']) * (10 ** bzjnum));
			    //var cznum = dq.getFNum(Number(dq.je) * (10**dq.hbilist[dq.hbindex]['num']));
			    //执行报名 arbApply
			    ArbOne.methods.arbApply(num + "").send({
			      from: address
			    }, (err, ret) => {
			      if (ret) {
			        Toast.clear();
			        Toast.success('提交成功，请稍后检查');
					this.dialogFormVisible=false
					this.sq_zc_data.je=0
			      } else {
			        Toast.clear();
			        Toast.fail('请同意授权！');
			      }
			    });
			  }
			},
			//订单搜索详情
			async sousou_dd() {
			  if (this.zc_user_yq['did'] == 0) {
			    return;
			  }
			  var dq = this;
			  dq.loadingsoudd = true;
			  this.zc_user_yq['dinfo'] = {
			    sj_user: '',
			    what: '',
			    u_user: '',
			    sj_bzj: 0,
			    u_bzj: 0
			  };
			  var ddinfo = await ArbOne.methods.user(this.zc_user_yq['did'] + "").call();
			  //查询订单是否存在
			  if (JSON.stringify(ddinfo).indexOf('0x0000000000000000000000000000000000000000') != -1) {
			    var ddis = await Dotc.methods.users(this.zc_user_yq['did']).call();
			    if (ddis['Madd'] == "0x0000000000000000000000000000000000000000") {
			      this.$message.error('Order does not exist!');
			      dq.loadingsoudd = false;
			    } else {
			      dq.loadingsoudd = false;
			      Dialog.confirm({
			        title: '提升',
			        message: '订单未初始化，请单击“确定”！',
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        cancelButtonColor: '',
			        getContainer: 'body'
			      })
			        .then(() => {
			          ddinit();
			        })
			        .catch(() => {
			        });
			      return;
			    }
			  } else {
			    initdata();
			  }
			
			  //初始化订单
			  async function ddinit() {
			    dq.loadingsoudd = true;
			    ArbOne.methods.init(dq.zc_user_yq['did']).send({ from: address }, (err, ret) => {
			      if (ret) {
			        ddinitlx();
			      } else {
			        dq.loadingsoudd = false;
			        dq.$message.error('Please click OK!');
			      }
			    });
			
			  }
			
			  //轮询查询是否已初始化
			  async function ddinitlx() {
			    ddinfo = await ArbOne.methods.user(dq.zc_user_yq['did'] + "").call();
			    if (JSON.stringify(ddinfo).indexOf('0x0000000000000000000000000000000000000000') == -1) {
			      initdata();
			    } else {
			      setTimeout(() => {
			        ddinitlx();
			      }, 3000);
			    }
			  }
			
			
			  async function initdata() {
			    dq.loadingsoudd = false;
			    var ddinfo_obj = {
			      sj_user: ddinfo['mad'].toLowerCase(),
			      what: ddinfo['what'],
			      u_user: ddinfo['uad'].toLowerCase(),
			      sj_bzj: Number(ddinfo['mma']) / (10 ** bzjnum),
			      u_bzj: Number(ddinfo['uma']) / (10 ** bzjnum)
			    };
			    dq.zc_user_yq['zc_key'] = ddinfo['what'];
			    if (ddinfo_obj['sj_user'] == address) {
			      dq.zc_user_yq['juese'] = dq.$t('message.arbitration.merchant');
			      dq.zc_user_yq['jyong'] = false;
			    } else if (ddinfo_obj['u_user'] == address) {
			      dq.zc_user_yq['juese'] = dq.$t('message.arbitration.user');
			      dq.zc_user_yq['jyong'] = false;
			    } else {
			      dq.zc_user_yq['juese'] = '';
			      dq.zc_user_yq['jyong'] = true;
			    }
			    dq.zc_user_yq['dinfo'] = ddinfo_obj;
			    //查询仲裁费用
			    var zc_je = await ArbOne.methods.bma(dq.zc_user_yq['did'] + "", ddinfo_obj['what'] + "", address + "").call();
			    dq.zc_user_yq.zc_je = Number(zc_je) / (10 ** bzjnum);
			    //查询我邀请的列表
			    dq.zc_user_yq.u_array = [];
			    var zc_user_list = await ArbOne.methods.hopers(address + "", dq.zc_user_yq['did'] + "", dq.zc_user_yq['zc_key'] + "").call();
				// console.log(zc_user_list);
			    for (let index = 0; index < zc_user_list[0].length; index++) {
			      dq.zc_user_yq.u_array.push({
			        user: zc_user_list[0][index],
			        username: zc_user_list[1][index] ? Base64.decode(zc_user_list[1][index]) : '未填写'
			      });
				  console.log(dq.zc_user_yq)
			    }
			    for (let index = 0; index < dq.zc_user_yq.u_array.length; index++) {
			      if (dq.zc_user_yq.u_array[index]['user'] == dq.zc_user_yq['form_user']) {
			        dq.zc_user_yq['jyong'] = true;
			        break;
			      }
			    }
			  }
			},
			
		}
	}
</script>

<style scoped="scoped">
	.top_nav{
		height: 60px;
		/* background-color: #fff; */
	}
	.table_nav{
		/* margin-top: 10px; */
		/* padding-left: ; */
	}
	.top_text{
		color: #000000;
		margin-left: 6px;
		font-size: 16px;
	}
	.normal_style{
		color: #08A99C;
	}
	.frozen_style{
		/* color: #F04F73; */
	}
	.invitationBnt{
		background-color: #fdc600;
		color: #fff;
		border: none;
	}
	.invitationBnt_wap{
		height: 100%;
		border-radius: 8px;
		font-size: 14px;
		font-weight: bolder;
	}
	div >>> .el-dialog__header{
		background-color: #FDC500;
	}
	div >>> .el-dialog__title{
		color: #fff;
		font-size: 28px;
	}
	.sarch_nav{
		background-color: #fff;
		padding: 0px 0 0 5px;
		border-radius: 30px;
		border: 1px solid #333;
	}
	.search_input >>> .el-input__inner{
		background-color: #fff;
		border: none;
		/* color: #fff; */
	}
	.search_input >>> .el-input__inner:focus{
		border: none;
	}
	.search_input >>> .el-input__inner:active{
		border: none;
	}
	div >>> .el-form-item{
		margin-bottom: 0;
	}
	
	div >>> .el-form-item__content{
		text-align: center;
	}
	.submitBtn{
		width: 75%;
	}
	
	.list_nav{
		font-size: 12px;
		margin-top: 20px;
	}
	.list_item{
		padding: 5px 4px 5px 10px;
		box-shadow: 0 0 5px 0.1rem #dcdcdc;
		margin-top: 10px;
		border-radius: 4px;
	}
	.list_item>div:nth-child(1){
		margin-top: 10px;
	}
	.list_item>div:nth-child(2){
		flex: 2;
	}
	.center_top{
		position: relative;
	}
	.center_top:before {
            content: "";
            position: absolute;
            left: 0px;
            bottom:0;
            width: 2px;
            height: 50%;
            background-color: #DCDCDC
    }
	.center_top:after {
	        content: "";
	        position: absolute;
	        right: 0px;
	        bottom:0;
	        width: 2px;
	        height: 50%;
	        background-color: #DCDCDC
	}
	.center_bottmom{
		position: relative;
	}
	.center_bottmom:after {
	        content: "";
	        position: absolute;
	        right: 0px;
	        top:0;
	        width: 2px;
	        height: 50%;
	        background-color: #DCDCDC
	}
	.center_bottmom:before {
            content: "";
            position: absolute;
            left: 0px;
            top:0;
            width: 2px;
            height: 50%;
            background-color: #DCDCDC
    }
	.center_top>div{
		width: 50%;
	}
	.maxWidth{
		max-width: 700px !important;
	}
	.listWap{
		padding: 10px 4px 5px 10px;
		box-shadow: 0 0 5px 0.1rem #dcdcdc;
		margin-top: 20px;
		border-radius: 4px;
	}
	.topWap{
		display: flex;
	}
	.topMain{
		display: flex;
		flex: 1;
	}
	.topUser{
		flex: 1;
	}
	.topUsername{
		flex: 6;
	}
	.mainWap{
		display: flex;
		line-height: 30px;
	}
	.mainLeft{
		flex: 2;
		text-align: left !important;
	}
	.mainRight{
		flex: 1;
	}
	.mainItem{
		display: flex;
	}
	.listItem{
		font-size: 13px;
		/* margin-top: 20px; */
	}
	
	@media only screen and (max-width: 991px){
			
		}
	@media only screen and (min-width: 991px){
		div >>> .el-dialog--center .el-dialog__body{
			padding: 25px 50px 0;
		}
		.input_nav >>> .el-form-item__content{
			display: flex;
			justify-content: center;
		}
		.sarch_nav{
			width: 50%
		}
	}
</style>
