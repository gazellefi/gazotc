
<template>
  <div class="ddgl_fabu">
    <!-- PC -->
    <div class="hidden-xs-only">
      <div class="ddgl_fabu_p_head c_r">
      	<div class="ddgl_fabu_p_head_sxan">
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.currency")}}：</span>
      			<el-dropdown class="ddlistaa_head_item" @command="saixuanpro">
      				<span class="el-dropdown-link">
      					{{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="USDT">USDT</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.type")}}：</span>
      
      			<el-dropdown class="ddlistaa_head_item" @command="saixuantcode">
      				<span class="el-dropdown-link">
      					{{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? $t('message.dapp.sell'):$t('message.dapp.buy') }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="C">{{$t('message.dapp.sell')}}</el-dropdown-item>
      					<el-dropdown-item command="M">{{$t('message.dapp.buy')}}</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.unit")}}：</span>
      
      			<el-dropdown class="ddlistaa_head_item" @command="saixuanfli">
      				<span class="el-dropdown-link">
      					{{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="CNY">CNY</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      
      	</div>
      </div>

      <!-- table -->
      <div class="">
      	<el-table :data="list" stripe style="width: 100%" :cell-class-name="addClass">
			<!-- 订单ID -->
      		<el-table-column align="center" prop="ddid" :label="$t('message.arbitration.orderId')" width="100px"> </el-table-column>
			<!-- 资产类型 -->
      		<el-table-column align="center" prop="pro"  :label="$t('message.dapp.assetsType')"></el-table-column>
			<!-- 订单类型 -->
      		<el-table-column align="center" prop="type" :label="$t('message.dapp.orderType')"></el-table-column>
			<!-- 数量 -->
      		<el-table-column align="center" :label="$t('message.dapp.amount')">
      			<template slot-scope="scope">
      				{{ scope.row.Uoa }} {{ scope.row.pro }}
      			</template>
      		</el-table-column>
			<!-- 商家保证金 -->
      		<el-table-column align="center" :label="$t('message.arbitration.merchantMargin')">
      			<template slot-scope="scope">
      				{{ scope.row.mma }} GAZ
      			</template>
      		</el-table-column>
			<!-- 用户保证金 -->
      		<el-table-column align="center" :label="$t('message.arbitration.userMargin')">
      			<template slot-scope="scope">
      				{{ scope.row.uma }} GAZ
      			</template>
      		</el-table-column>
			<!-- 单价 -->
      		<el-table-column align="center" :label="$t('message.dapp.unitPrice')">
      			<template slot-scope="scope">
      				{{ scope.row.unit }} CNY
      			</template>
      		</el-table-column>
			<!-- 资产释放 -->
      		<el-table-column align="center" :label="$t('message.dapp.assetRelease')">
      			<template slot-scope="scope">
					<span style="color: #E6240B;">{{ scope.row.zcsf_msg }}</span>
      			</template>
      		</el-table-column>
			<!-- 保证金释放 -->
      		<el-table-column align="center" :label="$t('message.dapp.marginRelease')">
      			<template slot-scope="scope">
					<span style="color: #E6240B;">{{ scope.row.bzj_msg }}</span>
      			</template>
      		</el-table-column>
			<!-- 仲裁中 -->
			<el-table-column align="center" :label="$t('message.arbitration.arbitrationing')">
				<template slot-scope="scope">
					no
				</template>
			</el-table-column>
			<el-table-column align="center" :label="$t('message.operation')" width="120px">
				<template slot-scope="scope">
					<!-- 私信 -->
					<div style="margin-right: 10px; display: inline-block;">
						<van-button  color="#FDC500" plain type="info" size="small"  @click="pcxiugaidd(1,scope.row)">{{$t('message.dapp.privateLetter')}}</van-button>
					</div>
					<!-- 详情 -->
					<van-button  color="#FDC500" plain type="info" size="small"  @click="openinfo(scope.row.ddid)">{{$t('message.details')}}</van-button>
				</template>
			</el-table-column>
      		
      		<div slot="empty">
      			<div style="padding-top: 20px;" class="f a_c c_c">
      				<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
      			</div>
      			<p>{{$t('message.NoData')}}</p>
      		</div>
      	</el-table>
      </div>
    </div>
	
	<!-- 弹窗 -->
	<myDialog  :width="type_code == 1 ? '30%':'90%'" :isShowFooter="false" :title="$t('message.dapp.DMSInformation')" :closeModal="false" :closePress="false" :visible.sync="dialog"
	@confirm="xiugaiajax(2)" @cancel="xiugaiajax(1)">
	   <el-form label-width="60px" v-model="set_form" style="padding: 20px;">
		   <el-form-item  :label="$t('message.arbitration.orderId')+':'">
		   	<span>{{set_form.orderId}}</span>
		   </el-form-item>
		   <el-form-item  :label="$t('message.phoneNumber')+':'">
		   	 <div class="f a_c">
		   	 	<el-input  v-model="set_form.phoneNuber" size="mini"></el-input>
		   	 	<el-checkbox v-model="set_form.phoneNuberCheack" size="medium" class="checkIn"></el-checkbox>
		   	 </div>
		   </el-form-item>
			   
		   <el-form-item  :label="$t('message.email')+':'">
			   <div class="f a_c">
			   	<el-input  v-model="set_form.eMail" size="mini"></el-input>		
					   <el-checkbox v-model="set_form.eMailCheack" size="medium" class="checkIn"></el-checkbox>
			   </div>
		   	
		   </el-form-item>
		   <el-form-item  label="Tele:">
			   <div class="f a_c">
			   	 <el-input  v-model="set_form.tele" size="mini"></el-input> 
				   <el-checkbox v-model="set_form.teleCheack" size="medium" class="checkIn"></el-checkbox>
			   </div>
		   	
		   </el-form-item>
		   <el-form-item  :label="$t('message.WeChat')+':'">
			   <div class="f a_c">
			   		<el-input  v-model="set_form.wechat" size="mini"></el-input>
					<el-checkbox v-model="set_form.wechatCheack" size="medium" class="checkIn"></el-checkbox>
			   </div>
		   	
		   </el-form-item>
		   <el-form-item  :label="$t('message.other')+':'">
			   <div class="f a_c">
			   		<el-input  v-model="set_form.other" size="mini"  type="textarea" :rows="2"></el-input>		
					   <el-checkbox v-model="set_form.otherCheack" size="medium" class="checkIn"></el-checkbox>
			   </div>
		   </el-form-item>
		   <div class="f a_c c_c">
		   		<span class="submitBtn" @click="submitLetter">{{$t('message.sumbmit')}}</span>
		   </div>
		   <el-form-item  :label="$t('message.dapp.explain')+':'">
				  <p class="fz12">{{popDes}}</p>
		   </el-form-item>
	   </el-form>
	</myDialog>
    <!-- WAP -->
    <div class="hidden-sm-and-up ddgl_fabu_wapview">
   <!--   <el-row style="border-bottom: 1px solid #EEEEEE;">
      	<el-col :span="12">
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.currency")}}：</span>
      			<el-dropdown class="ddlistaa_head_item" @command="saixuanpro">
      				<span class="el-dropdown-link">
      					{{ sxarr['pro'] == "ALL"? $t('message.all'):sxarr['pro']  }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="USDT">USDT</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      	</el-col>
      	<el-col :span="12">
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.type")}}：</span>
      					
      			<el-dropdown class="ddlistaa_head_item" @command="saixuantcode">
      				<span class="el-dropdown-link">
      					{{ sxarr['tcode'] == "ALL"? $t('message.all'):sxarr['tcode'] == "C" ? $t('message.dapp.sell'):$t('message.dapp.buy') }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="C">{{$t('message.dapp.sell')}}</el-dropdown-item>
      					<el-dropdown-item command="M">{{$t('message.dapp.buy')}}</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      	</el-col>
      	<el-col :span="12" style="margin-top: 20px;padding-bottom: 10px;">
      		<div class="ddgl_fabu_p_head_sxan_i">
      			<span>{{ $t("message.dapp.unit")}}：</span>
      					
      			<el-dropdown class="ddlistaa_head_item" @command="saixuanfli">
      				<span class="el-dropdown-link">
      					{{ sxarr['fli'] == "ALL"? $t('message.all'):sxarr['fli']  }} <i
      						class="el-icon-arrow-down el-icon--right"></i>
      				</span>
      				<el-dropdown-menu slot="dropdown">
      					<el-dropdown-item command="ALL">{{$t('message.all')}}</el-dropdown-item>
      					<el-dropdown-item command="CNY">CNY</el-dropdown-item>
      				</el-dropdown-menu>
      			</el-dropdown>
      		</div>
      	</el-col>
      </el-row> -->

      <!-- 列表 -->
      <el-row>
      	<div v-if="list.length<1" class="fc a_c">
      		<div style="padding-top: 20px;">
      			<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
      		</div>
      		<p :style="{'marginTop': '23px'}">{{$t('message.NoData')}}</p>
      	</div>
      	<el-col :span="24" v-for="(item,index) in list" :key="index" class="list_item f c_b">
      		<div class="fc">
      			<div class="f c_b a_c">
      				<div class="f c_c">
      					<span class="fwb">{{item.type}}</span>
      					<span class="fwb">{{item.pro}}</span>
      					<div class="f c_c marty_nav marl-5">
      						<span>{{$t('message.arbitration.merchantMargin')}}{{ item.mma }}GAZ</span>
      					</div>
      				</div>
      			</div>
      			<div class="mart-10">
      				<span class="marr-10">{{$t('message.dapp.unitPrice')}}</span>
					<span class="cba">{{ item.unit }} CNY</span>
      			</div>
      			<div class="mart-10">
      				<span class="marr-10">{{$t('message.dapp.amount')}}</span>
      				<span class="fz14">{{ item.Uoa }} {{ item.pro }}</span>
      			</div>
      			<div class="mart-10">
      				<span class="marr-10">{{$t('message.dapp.assetRelease')}}</span>
      				<span style="color: #E6240B;" class="fz14">{{ item.zcsf_msg }}</span>
      			</div>
      			<div class="mart-10">
      				<span class="marr-10">{{$t('message.dapp.marginRelease')}}</span>
      				<span style="color: #E6240B;" class="fz14">{{ item.bzj_msg }}</span>
      			</div>
				<div class="mart-10">
					<span class="marr-10">{{$t('message.arbitration.userMargin')}}</span>
					<span class="fz14">{{ item.uma }} Gaz</span>
				</div>
      		</div>
      		<div class="fc c_b a_e">
      			<span>{{$t('message.arbitration.orderId')+' | '+ item.ddid}}</span>
      			<div class="f a_c">
					<!-- 私信 -->
					<van-button plain type="info"  class="marr-10" color="#FDC500" size="small"  @click="pcxiugaidd(2,item)">{{$t('message.dapp.privateLetter')}}</van-button>
					<!-- 详情 -->
					<van-button plain type="info" color="#FDC500" size="small"  @click="openinfo(item.ddid)">{{$t('message.details')}}</van-button>
				</div>
      		</div>
      	</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import tools from '@/api/public.js'
let Base64 = require('js-base64').Base64;
import { Notify, Dialog, Toast } from "vant";
import JSEncrypt from "jsencrypt"
import SeededRSA from "@/views/home/user/seededrsa/rsa.js";

import config from "@/config";
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];
var huobi = {
  huobi: [],
  fabi: []
};
var harr = config['hbi'][config['key']];
var fbarr = config['fabi'][config['key']];
for (const key in harr) {
  huobi['huobi'].push({
    key: harr[key]['key'],
    id: harr[key]['id'],
    num: harr[key]['num']
  });
}
for (const key in fbarr) {
  huobi['fabi'].push({
    id: fbarr[key]['id'],
    key: fbarr[key]['key']
  });
}

//公共变量
var web3 = "";
var ethereum = window.ethereum;
var Address = '';
export default {
  data() {
    return {
      uinfo: {
        user: '',
        user_u: '',
        quan: '',
        username: '',
      },
	  type_code: 1,
      list: [],
      list_b: [],
	  sxarr: {
	  	pro: "ALL",
	  	fli: "ALL",
	  	tcode: "ALL"
	  },
	  dialog: false,
	  set_form: {
		  orderId: '',
		  phoneNuber: '',
		  phoneNuberCheack: false,
		  eMail: '',
		  eMailCheack: false,
		  tele: '',
		  teleCheack: false,
		  wechat: '',
		  wechatCheack: false,
		  other: '',
		  otherCheack: false,
	  },
	  popDes: ''
    }
  },
  //初始化WEB3
  created() {
    var dq = this;
    //监测用户是否安装MASK
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		Address = id
		dq.getlist();
	}).catch((err)=>{
		console.log(err);
	})
  },
  watch: {
  	'sxarr.pro'(e) {
  		// this.getsxlist(e, this.sxarr['fli'], this.sxarr['tcode']);
  	},
  	'sxarr.fli'(e) {
  		// this.getsxlist(this.sxarr['pro'], e, this.sxarr['tcode']);
  	},
  	'sxarr.tcode'(e) {
  		// this.getsxlist(this.sxarr['pro'], this.sxarr['fli'], e);
  	}
  },
  methods: {
	  // 提交私信
	  	  submitLetter(){
	  		  let form = this.set_form
	  		  // 整理数据
	  		  let newForm = {}
	  		  if(form.phoneNuberCheack){ newForm = Object.assign(newForm,{phoneNuber:form.phoneNuber})}
	  		  if(form.eMailCheack){ newForm = Object.assign(newForm,{eMail:form.eMail})}
	  		  if(form.teleCheack){ newForm = Object.assign(newForm,{tele:form.tele})}
	  		  if(form.wechatCheack){ newForm = Object.assign(newForm,{wechat:form.wechat})}
	  		  if(form.otherCheack){ newForm = Object.assign(newForm,{other:form.other})}
	  		  let str = Base64.encode(JSON.stringify(newForm))
	  		  // 加密 
	  		  let pubkey = new JSEncrypt();
	  		  // console.log(form.pubKey);
	  		  pubkey.setPublicKey(form.pubKey);
	  		  let msg = pubkey.encrypt(str);
	  		  // console.log(msg);
	  		  this.setLetter(msg)
	  	  },
	  	  // 私信存链上
	  	  setLetter(msg){
	  		var that = this
	  		// 存到链上   16
	  		var beizhucon = new web3.eth.Contract(
	  		  config["hyue"][config["key"]]["Letter"]["abi"],
	  		  config["hyue"][config["key"]]["Letter"]["heyue"]
	  		);
	  		Toast.loading({ message: that.$t('message.wallet.loading')+'...' });
	  		that.setLink(beizhucon,msg,'16',that.set_form.setId,that.set_form.orderId).then(()=>{
	  			Dialog.alert({
	  			  title: that.$t("message.prompt"),
	  			  message: that.$t("message.success"),
	  			}).then(() => {
	  				that.dialog = false
	  				that.set_form = {
	  						  orderId: '',
	  						  phoneNuber: '',
	  						  phoneNuberCheack: false,
	  						  eMail: '',
	  						  eMailCheack: false,
	  						  tele: '',
	  						  teleCheack: false,
	  						  wechat: '',
	  						  wechatCheack: false,
	  						  other: '',
	  						  otherCheack: false,
	  				}
	  				Toast.clear()
	  			});
	  		}).catch(()=>{
	  				Dialog.alert({
	  				  title: that.$t("message.prompt"),
	  				  message: that.$t("message.failed"),
	  				}).then(() => {
	  				  Toast.clear()
	  				});
	  		})  
	  	  },
	  	  // 存链公用方法 init:初始化  parma:传的值  type: 存的位置  address:存储id         id:订单id
	  	  setLink(init,parma,type,address,id){
	  	  	return new Promise((resolve,reject)=>{
	  			console.log(type);
	  			console.log(parma);
	  			
	  			console.log(id);
	  			console.log(address);
	  	  		init.methods.dispatch(type, parma,id+'').send( { from: Address, }, (err, ret) => {
	  				console.log(err);
	  	  		      if (ret && !err) {
	  	  		        resolve()
	  	  		      } else {
	  	  				reject()
	  	  		      }
	  	  		    }
	  	  		  );
	  	  	})
	  	  },
	  openinfo(ddid) {
		  console.log(ddid);
	    this.$router.push({
	      name: 'Ddinfow',
	      query: {
	        ddid: ddid
	      }
	    });
	  },
	  saixuanpro(e) {
	  	this.sxarr.pro = e;
	  },
	  saixuanfli(e) {
	  	this.sxarr.fli = e;
	  
	  },
	  saixuantcode(e) {
	  	this.sxarr.tcode = e;
	  },
	  // 私信 弹框 提交
	  xiugaiajax(num){},
	  //  详情弹框 c 1:wep  2:wap
	  pcxiugaidd(c, item) {
		  this.type_code = c
		  		  this.set_form.orderId = item.ddid
		  		  // 通过订单id获取 用户id和商家id
		  		  this.getId(item.ddid).then(res=>{
		  			  let {Uadd,Madd } = res
		  			  var id = ''
		  			  // 判断 当前用户是商家还是用户(转小写比较)
		  			  if(Address == Uadd.toLowerCase()){
		  				  id = Madd
		  			  }else{
		  				  id = Uadd
		  			  }
		  			  // 设置对方id
		  			  this.set_form.setId = id
		  			  console.log(id);
		  			  // 通过对方id 获取 公钥
		  			  this.getPubKey(id).then(res=>{
		  				  // 设置公钥
		  				  this.set_form.pubKey = res
		  				  // 显示弹框
		  				  this.dialog = true
		  			  }).catch((err)=>{
		  				  console.log('获取公钥失败');
		  			  })
		  		  }).catch((err)=>{
		  			  console.log('获取商家id和用户id失败');
		  		  })
	  },
	  // 通过订单获取 id
	  	  getId(id){
	  		  return new Promise((resolve,reject)=>{
	  			  var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
	  			  dotsconn.methods.users(id).call(function(error, ret) {
	  			  	if (ret) {
	  					let ids = {
	  						Uadd: ret.Uadd,
	  						Madd: ret.Madd
	  					}
	  					resolve(ids)
	  			  	}else{
	  					reject()
	  				}
	  			  });
	  		  })
	  	  },
	// 通过用户id 获取公钥
		  getPubKey(id){
			  var beizhucon = new web3.eth.Contract(
			    config["hyue"][config["key"]]["Letter"]["abi"],
			    config["hyue"][config["key"]]["Letter"]["heyue"]
			  );
			  return new Promise((resolve,reject)=>{
				  beizhucon.methods.message(id,15).call(function(error, ret) {
					if (ret) {
						let key = ret
						resolve(key)
					}else{
						reject(error)
					}
				  });
			  })
			  this.dialog = true
		  },
    getlist() {
      var list = [];
      var dq = this;
      var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
      contracts.methods.ownerDeal(Address + "", 10 + "").call((err, result) => {
        if (result) {
			console.log(result);
          if (result[0].length > 0) {
            for (let index = 0; index < result[0].length; index++) {
              var obj = {};
              var h_num = 0;
              var h_pro = 0;
              var ttype = '';
              for (let huobii = 0; huobii < huobi['huobi'].length; huobii++) {
                if (result[1][index][1] == huobi['huobi'][huobii]['key']) {
                  h_num = Number(huobi['huobi'][huobii]['num']);
                  h_pro = huobi['huobi'][huobii]['id'];
                  break;
                }
              }
			  let mid = this.lowerCase(result[2][index][0])
			  let umark_c =  this.lowerCase(result[1][index][0]) == '0x6275790000000000000000000000000000000000000000000000000000000000' ? this.$t('message.dapp.buy'):this.$t('message.dapp.forSale');
              if (mid != Address) {
				  ttype = umark_c
              } else {
                 ttype = umark_c==this.$t('message.dapp.forSale') ? this.$t('message.dapp.buy'):this.$t('message.dapp.forSale');
              }
			  // console.log(mid);
			  // console.log(ttype);
              var zcsf_msg = '';
              var bzj_msg = '...';
              if (result[0][index][5] == 0 && result[0][index][4] == 0) {
				  // 未释放
                zcsf_msg = this.$t('message.dapp.notReleased')
              } else if (result[0][index][5] != 0 && result[0][index][4] == 0) {
				  // 已释放
                zcsf_msg = this.$t('message.dapp.released')
              } else if (result[0][index][5] == 0 && result[0][index][4] != 0) {
				  // 取消
                zcsf_msg = this.$t('message.cancel')
              }
			  
    
              if (result[0][index][9] != 0) {
                bzj_msg = this.$t('message.dapp.released')
              } else {
                bzj_msg = this.$t('message.dapp.notReleased')
              }
			  // console.log(Number(result[0][index][2]));
              obj = {
                ddid: result[0][index][0],
                Uoa: Number(result[0][index][1]) / (10 ** h_num),
                uma: Number(result[0][index][2]) / (10 ** bzj_num),
                mma: Number(result[0][index][3]) / (10 ** bzj_num),
                release: result[0][index][4],
                timc: result[0][index][5],
                agree: result[0][index][6],
                pau: result[0][index][7],
                unit: Number(result[0][index][8]) / 100,
				mid: this.lowerCase(result[2][index][0]),
				uid: this.lowerCase(result[2][index][1]),
    
                zcsf_msg: zcsf_msg,
                bzj_msg: bzj_msg,
    
                pro: h_pro,
                type: ttype
              };
              list.push(obj);
            }
			console.log(list);
            dq.list = list;
            dq.list_b = list;
          }
        }
      })
    },
	lowerCase(str) {
		let arr = str.split("");
		let newStr = "";
		//通过for循环遍历数组
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] >= 'A' && arr[i] <= 'Z')
				newStr += arr[i].toLowerCase();
			else
				newStr += arr[i];
		}
		return newStr;
	},
	//  商家时候改变 table row 颜色
	addClass({row, column, rowIndex, columnIndex }) {
	  // console.log(columnIndex)
	 //  if(row.type == this.$t('message.dapp.forSale') && columnIndex == 4) {
		// return 'weightCell';
	 //  }
	 console.log(row.mid);
	  if(row.mid == Address && columnIndex == 5){
		  return 'weightCell';
	  }
	  if(row.uid == Address && columnIndex == 4){
	  		  return 'weightCell';
	  }
	},
	
    
  }
}
</script>

<style lang="less" scoped>
.checkIn{
	margin-left: 10px;
	/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
			background-color: #67c23a;
			border-color: #67c23a;
	}
}
div{
	/deep/ .el-form-item{
		margin-bottom: 10px;
	}
}
.submitBtn{
	margin-top: 10px;
	width: 100px;
	height: 40px;
	border-radius: 5px;
	background-color: #FDC600;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 12px;
}
	
	
	
.ddgl_fabu {
  width: 100%;
}
.ddlistaa_head_item {
  border: 1px solid #ccc;
  padding: 5px 20px;
}

.ddgl_fabu_p_head {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 10px;
  background: #fff;
  margin-bottom: 10px;
}

.ddgl_fabu_p_head_u {
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
}
.ddgl_fabu_p_head_u_q {
  margin-right: 30px;
  width: 50px;
  height: 50px;
  background-color: #ddd;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
}
.ddgl_fabu_p_head_u_c {
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_p_head_u_c_name {
  font-size: 15px;
}
.ddgl_fabu_p_head_u_c_msg {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}
.ddgl_fabu_p_head_u_c_user {
  font-size: 14px;
  padding: 2px 0;
  opacity: 0.7;
}

.ddgl_fabu_p_head_sxan {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_p_head_sxan .ddgl_fabu_p_head_sxan_i {
  display: flex;
  padding: 0 15px;
  align-items: center;
}
.ddgl_fabu_p_head_fabu {
  width: 120px;
  height: 35px;
  background-color: rgb(47, 0, 255);
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  margin-left: auto;
}

.ddgl_fabu_ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_ul_head {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.ddgl_fabu_ul_li {
  display: flex;
  align-items: center;
  width: 10%;
  margin-top: 20px;
  padding: 0 10px;
  font-size: 14px;
  opacity: 0.8;
}

.ddgl_fabu_ul_item {
  display: flex;
}
.danjiayanse {
  color: rgb(7, 203, 252);
}
.bzjyanse {
  color: #000;
  font-weight: 900;
}

/* wap */

.ddgl_fabu_wapview {
  width: 100%;
}
.ddgl_fabu_wap_head {
  display: flex;
  padding: 15px 0;
  align-items: center;
  margin-left: 15px;
}
.ddgl_fabu_wap_head_q {
  width: 45px;
  height: 45px;
  background-color: #ddd;
  border-radius: 100%;
  text-align: center;
  line-height: 45px;
  margin-right: 15px;
}
.ddgl_fabu_wap_head_u {
  display: flex;
  flex-direction: column;
}
.ddgl_fabu_wap_head_u_name {
  font-size: 15px;
}
.ddgl_fabu_wap_head_u_msg {
  font-size: 13px;
  opacity: 0.7;
  padding: 3px 0;
}
.ddgl_fabu_wap_head_u_user {
  font-size: 13px;
  opacity: 0.5;
}
.ddgl_fabu_wap_saixuan {
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
.ddgl_fabu_wap_saixuan_item {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_wap_saixuan_item_a {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 14px;
  opacity: 0.5;
}

.ddgl_fabu_wap_ul {
  width: 100%;
}
.ddgl_fabu_wap_ul_li {
  width: calc(100% - 30px);
  margin-left: 15px;
  margin-right: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
.ddgl_fabu_wap_ul_li_item {
  display: flex;
  flex-direction: row;
}
.ddgl_fabu_wap_ul_li_item_l {
  margin-right: auto;
  font-size: 15px;
  padding: 5px 0;
  opacity: 0.8;
}
.ddgl_fabu_wap_ul_li_item_r {
  font-size: 15px;
  margin-left: auto;
}
.ddgl_fabu_wap_ul_li_item button {
  margin-left: auto;
  margin-top: 20px;
}
.list_item{
	border-bottom: 1px solid #DCDCDC;
	padding: 20px 10px;
}
.marty_nav{
	background-color: #D0E5FB;
	color: #0D86FE;
	padding: 3px 10px;
	font-size: 12px;
}
div {
	/deep/ .weightCell{
		color: #0D86FE;
	}
}
</style>