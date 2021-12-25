<template>
	<div>
		<!-- pc -->
		<div class="hidden-sm-and-down" style="width: 100%;">
			<el-container>
			  <el-table :data="my_ss_tlist" style="width: 100%">
			    <el-table-column fixed prop="did" align="center" :label="$t('message.arbitration.orderId')"></el-table-column>
			    <el-table-column prop="uad_b" :label="$t('message.arbitration.merchant')">
			      <template slot-scope="scope">
			        <div>{{ scope.row.uad_b }}</div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="mad_b" align="center" :label="$t('message.arbitration.user')">
			      <template slot-scope="scope">
			        <div>{{ scope.row.mad_b }}</div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="uoa" align="center" :label="$t('message.arbitration.assetsNum')">
			      <template slot-scope="scope">
			        <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="mma" align="center" :label="$t('message.arbitration.merchantMargin')">
			      <template slot-scope="scope">
			        {{ scope.row.mma }} USDT
			      </template>
			    </el-table-column>
			    <el-table-column prop="uma" align="center" :label="$t('message.arbitration.userMargin')">
			      <template slot-scope="scope">
			        {{ scope.row.uma }} USDT
			      </template>
			    </el-table-column>
			    <el-table-column prop="what" align="center" :label="$t('message.arbitration.appealType')">
			      <template slot-scope="scope">
			        <div v-if="scope.row.what == 1">{{$t('message.arbitration.assets')}}</div>
			        <div v-if="scope.row.what == 2">{{$t('message.arbitration.margin')}}</div>
			        <div v-if="scope.row.what == 3">{{$t('message.other')}}</div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="arb" align="center" :label="$t('message.arbitration.OnearbitrationResult')" :filters="oneLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
			      <template slot-scope="scope">
					<div v-if="scope.row.arb == 1">{{$t('message.arbitration.userVictory')}}</div>
					<div v-if="scope.row.arb == 2">{{$t('message.arbitration.MerchantsVictory')}}</div>
					<div v-if="scope.row.arb == 3">{{$t('message.arbitration.nextArbitration')}}</div>
					<div v-if="scope.row.arb == 0">{{$t('message.arbitration.NotStart')}}</div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="arb" align="center" :label="$t('message.arbitration.OnearbitrationState')" filter-placement="bottom-end" v-if="my_ss_tindex == 1">
			      <template slot-scope="scope">
			       <div v-if="scope.row.code == 0">
			         <span>{{$t('message.arbitration.NotStart')}}</span>
			       </div>
			       <div v-if="scope.row.code == 1">
			         <span>{{$t('message.arbitration.arbitrationing')}}</span>
			       </div>
			       <div v-if="scope.row.code == 2">
			         <span>{{$t('message.arbitration.arbitrationEnd')}}</span>
			       </div>
			       <div v-if="scope.row.code == 3">
			          <span>{{$t('message.arbitration.executed')}}</span>
			       </div>
			      </template>
			    </el-table-column>
			    <el-table-column prop="arb" align="center" :label="$t('message.arbitration.TwoarbitrationState')">
			      <template slot-scope="scope">
			        <div v-if="scope.row.timc == 0">Not registered</div>
			        <div v-if="scope.row.timc != 0 && scope.row.timd == 0">{{$t('message.arbitration.signing')}}</div>
			        		  
			        <div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">{{$t('message.arbitration.voteing')}}</div>
			        <div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">{{$t('message.arbitration.waiting')}}</div>
			        		  
			        <div v-if="scope.row.finish != 0">{{$t('message.arbitration.executed')}}</div>
			      </template>
			    </el-table-column>
			
			    <!-- <el-table-column prop="countDown" align="center" :label="$t('message.arbitration.countdown')">
			      <template slot-scope="scope">
			        <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
			      </template>
			    </el-table-column> -->
			    <el-table-column align="center" :label="$t('message.operation')">
			      <template slot-scope="scope">
			        <el-button type="text" @click="open_dylzc(scope.row,2)">{{$t('message.details')}}</el-button>
			      </template>
			    </el-table-column>
				<div slot="empty">
					<div style="padding-top: 20px;" class="f a_c c_c">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p>{{$t('message.NoData')}}</p>
				</div>
			  </el-table>
			</el-container>
		</div>
		
		<!-- wap -->
		<div class="hidden-sm-and-up" style="width: 100%;">
			<div v-if="my_ss_tlist.length<1" class="fc a_c">
				<div style="padding-top: 20px;">
					<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
				</div>
				<p :style="{'marginTop': '23px'}">{{$t('message.NoData')}}</p>
			</div>
			<div class="list_nav">
				<div class="list_item" v-for="(item,index) in my_ss_tlist" :key="index">
					<div class="f c_b" style="padding-bottom: 10px;border-bottom: 2px solid #DCDCDC;padding-top: 6px;">
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.orderId')}}</span>
							<span class="fwb mart-10" style="font-size: 28px;">{{item.did}}</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.merchant')}}</span>
							<span class="mart-10">{{ item.uad_b }}</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.user')}}</span>
							<span class="mart-10">{{ item.mad_b }}</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.assetsNum')}}</span>
							<span class="mart-10">{{ item.uoa }} - {{ item.pro }}</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.appealType')}}</span>
							<div v-if="item.what == 1">{{$t('message.arbitration.assets')}}</div>
							<div v-if="item.what == 2">{{$t('message.arbitration.margin')}}</div>
							<div v-if="item.what == 3">{{$t('message.other')}}</div>
						</div>
					</div>
					<div class="f c_b" style="padding-bottom: 10px;border-bottom: 2px solid #DCDCDC;padding-top: 6px;">
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.merchantMargin')}}</span>
							<span class="mart-10">{{ item.mma }} USDT</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.userMargin')}}</span>
							<span class="mart-10">{{ item.uma }} USDT</span>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.OnearbitrationResult')}}</span>
							<div class="mart-10" v-if="item.arb == 1">{{$t('message.arbitration.userVictory')}}</div>
							<div class="mart-10" v-if="item.arb == 2">{{$t('message.arbitration.MerchantsVictory')}}</div>
							<div class="mart-10" v-if="item.arb == 3">{{$t('message.arbitration.nextArbitration')}}</div>
							<div class="mart-10" v-if="item.arb == 0">{{$t('message.arbitration.NotStart')}}</div>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.OnearbitrationState')}}</span>
							<div class="mart-10" v-if="item.code == 0">
							  <span>{{$t('message.arbitration.NotStart')}}</span>
							</div>
							<div class="mart-10" v-if="item.code == 1">
							  <span>{{$t('message.arbitration.arbitrationing')}}</span>
							</div>
							<div class="mart-10" v-if="item.code == 2">
							  <span>{{$t('message.arbitration.arbitrationEnd')}}</span>
							</div>
							<div class="mart-10" v-if="item.code == 3">
							   <span>{{$t('message.arbitration.executed')}}</span>
							</div>
						</div>
						<div class="fc a_c">
							<span class="fwb">{{$t('message.arbitration.TwoarbitrationState')}}</span>
							<div class="mart-10" v-if="item.timc == 0">Not registered</div>
							<div class="mart-10" v-if="item.timc != 0 && item.timd == 0">{{$t('message.arbitration.signing')}}</div>
									  
							<div class="mart-10" v-if="item.timd != 0 && item.time == 0 && item.timc != 0">{{$t('message.arbitration.voteing')}}</div>
							<div class="mart-10" v-if="item.time != 0 && item.finish == 0 && item.timc != 0">{{$t('message.arbitration.waiting')}}</div>
									  
							<div class="mart-10" v-if="item.finish != 0">{{$t('message.arbitration.executed')}}</div>
						</div>
					</div>
					<div class="fc a_c" style="padding-bottom: 10px;padding-top: 6px;">
						<span class="fwb">{{$t('message.arbitration.countdown')}}</span>
						<van-count-down :time="item.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
					</div>
					<div class="f c_r">
						<div class="f a_c" @click="open_dylzc(item,2)">
							<span class="marr-10">查看详情</span>
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<!-- 详情弹框 -->
		<el-dialog :title="$t('message.arbitration.myPartOrderSuccssTitle')" :visible.sync="dyl_zc.code" center :show-close="false" :width="isphone ? '90%':'50%'">
			<el-form :model="dyl_zc" label-position="left">
				<el-form-item :label="$t('message.arbitration.account') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.my_user}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.nickname') + ':'" :label-width="formLabelWidth">
					<span>{{dyl_zc.my_name == 'Not filled in yet' ? $t('message.notFill') : dyl_zc.my_name}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.orderNum') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.did}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.orderDes') + ':'"  :label-width="formLabelWidth">
				  <span></span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.assets') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.ddifno.uoa}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.merchantAdress') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.ddifno.mad}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.userAress') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.ddifno.uad}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.merchantMargin') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.ddifno.mma + ' USDT'}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.userMargin') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.ddifno.uma + ' USDT'}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.beInvited') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.byqf}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.arbitrationResult') + ':'"  :label-width="formLabelWidth">
				  <span>{{ dyl_zc['zcinfo']['arb'] == 0 ? $t('message.arbitration.NotStart') : dyl_zc['zcinfo']['arb'] == 1 ? $t('message.arbitration.userVictory'): dyl_zc['zcinfo']['arb'] == 2 ? $t('message.arbitration.MerchantsVictory'):$t('message.arbitration.nextArbitration')}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.M_arbitrator') + ':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.zcinfo.madd}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.U_arbitrator')+':'"  :label-width="formLabelWidth">
				  <span>{{dyl_zc.zcinfo.uadd}}</span>
				</el-form-item>
				<el-form-item :label="$t('message.arbitration.ab_coutdown') + ':'"  :label-width="formLabelWidth">
				  <span v-if="dyl_zc.zcinfo.djs_val == 0">{{$t('message.arbitration.NotStart')}}</span>
				  <span v-if="dyl_zc.zcinfo.djs_val == 1.1">{{$t('message.arbitration.hasEend')}}</span>
				  <div v-if="dyl_zc.zcinfo.djs_val != 0 && dyl_zc.zcinfo.djs_val != 1.1">
				    <van-count-down :time="dyl_zc.zcinfo.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
				  </div>
				</el-form-item>
			</el-form>
			
			<div slot="footer" class="dialog-footer">
			  <div class="f c_a a_c">
			  	<el-button  class="invitationBnt favorBtn" :disabled="dyl_zc.zcinfo.an_code" @click="agree">{{$t('message.arbitration.favor')}}</el-button>
			  	<el-button  class="invitationBnt implementBtn" :disabled="dyl_zc.zhixingcode" @click="zhixingajax">{{$t('message.arbitration.implement')}}</el-button>
			  </div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	//新版配置 模块化
	import config from "@/config";
	
	//数据MODEL
	import ZcDylList from "@/conn/zc/ZcDylList.json";
	
	import ZcModel from "@/conn/zc/ZcinfoModel.json";
	
	var bzjnum = config['hyue'][config['key']]['Bzj']['num'];
	//模块
	let Base64 = require('js-base64').Base64;
	import Web3 from "web3";
	import Web3Modal from "web3modal";
	import { Dialog, Toast } from 'vant';
	var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;
	export default{
		data(){
			return {
				my_ss_tlist: [],
				isphone:false,
				dyl_zc: {
				  code: false,
				  my_user: '',
				  my_name: '',
				  did: '',
				  byqf: '',
				  zccode: '',
				  zc_user: '',
				  ddifno: {
				    uoa: '',
				    uma: '',
				    mma: '',
				    uad: '',
				    mad: ''
				  },
				  zcinfo: ZcModel
				},
				my_ss_tindex: 2,
				formLabelWidth: '150px',
				oneLeveThree: [
				  { value: "1", text: this.$t('message.arbitration.merchant') },
				  { value: "2", text: this.$t('message.arbitration.user')},
				  { value: "3", text: this.$t('message.arbitration.dogfall') },
				],
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
		  //监测用户是否安装MASK
		  if (typeof ethereum === "undefined") {
		    web3 = new Web3(config['hyue'][config['key']]['Url']);
		  } else {
		    //初始化
		    this.webinit();
		  }
		},
		methods:{
			filterTag () { },
			//我参与的仲裁列表
			async getList() {
			  var num = 25;
			  var list;
			
			  //读取时间
			  var Timc = await ArbTwo.methods.Timc().call((err, ret) => {
			    return Number(ret);
			  });
			  var Timd = await ArbTwo.methods.Timd().call((err, ret) => {
			    return Number(ret);
			  });
			  var Time = await ArbTwo.methods.Timd().call((err, ret) => {
			    return Number(ret);
			  });
			  var tima = await ArbOne.methods.Tima().call((err, ret) => {
			    return Number(ret);
			  });
			  var dqtime = Math.round(new Date() / 1000);
			
			  if (this.my_ss_tindex == 1) {
			    list = await ArbOne.methods.ownerappeal(address + "", num).call();
			  } else {
			    list = await ArbOne.methods.arbsucc(address + "", num).call();
			  }
			  var huobiarr = config['hbi'][config['key']];
			  var dinfo = list[0];
			  var type = list[1];
			  var addr = list[2];
			  if (this.my_ss_tindex == 1) {
			    var listarr = [];
			    for (let index = 0; index < dinfo.length; index++) {
			      var obj = {};
			      for (const key in MySqZcList) {
			        obj[key] = MySqZcList[key];
			      }
			      var pro = '';
			      var pro_num = 0;
			      for (const key in huobiarr) {
			        if (type[index][0] == huobiarr[key]['key']) {
			          pro = huobiarr[key]['id'];
			          pro_num = Number(huobiarr[key]['num']);
			          break;
			        }
			      }
			      obj['did'] = dinfo[index][0];
			      obj['uoa'] = (Number(dinfo[index][1]) / (10 ** pro_num)).toFixed(2);
			      obj['uma'] = (Number(dinfo[index][2]) / (10 ** bzjnum)).toFixed(2);
			      obj['mma'] = (Number(dinfo[index][3]) / (10 ** bzjnum)).toFixed(2);
			      obj['what'] = dinfo[index][4];
			      obj['arb'] = dinfo[index][5];
			      obj['time'] = Number(dinfo[index][8]);
			      obj['finish'] = dinfo[index][9];
			      obj['tima'] = Number(dinfo[index][6]);
			      obj['execone'] = dinfo[index][7];
			      //查询时间
			      var timc = 0;
			      var timd = 0;
			      await ArbTwo.methods.arbs(dinfo[index][0] + "").call((err, ret) => {
			        timc = ret['timc'];
			        timd = ret['timd'];
			      });
			      obj['timc'] = Number(timc);
			      obj['timd'] = Number(timd);
			      obj['pro'] = pro;
			      obj['mark'] = type[index][1];
			      obj['uad'] = addr[index][0];
			      obj['mad'] = addr[index][1];
			      obj['uad_b'] = addr[index][0].substring(0, 5) + "····" + addr[index][0].substring(addr[index][0].length - 5, addr[index][0].length);
			      obj['mad_b'] = addr[index][1].substring(0, 5) + "····" + addr[index][1].substring(addr[index][1].length - 5, addr[index][1].length);
			      //倒计时计算
			      if (obj.execone == 0 && obj.finish != 0) {
			        //第一轮
			        obj['djs_val'] = ((obj['tima'] + Number(tima)) - dqtime) * 1000;
			      } else {
			        obj['Timed'] = Number(Timd);
			        obj['Timec'] = Number(Timc);
			        obj['Timee'] = Number(Time);
			        //第二轮
			        if (obj['timc'] != 0 && obj['timd'] == 0) {
			          obj['djs_val'] = ((obj['timc'] + obj['Timec']) - dqtime) * 1000;
			        }
			        if (obj['timd'] != 0 && obj['time'] == 0) {
			          obj['djs_val'] = ((obj['timd'] + obj['Timed']) - dqtime) * 1000;
			        }
			        if (obj['time'] != 0 && obj['finish'] == 0) {
			          obj['djs_val'] = ((obj['time'] + obj['Timee']) - dqtime) * 1000;
			        }
			      }
			      //查询谁邀请我的
			      var can_user = await ArbOne.methods.can(obj['did'] + "", obj['what'] + "", address + "").call();
			      obj['can_user'] = can_user;
			      if (obj['tima'] != 0 && ((obj['tima'] + Number(tima)) > dqtime)) {
			        obj['code'] = 1;
			      }
			      if (obj['tima'] != 0 && ((obj['tima'] + Number(tima)) < dqtime) || obj['arb'] == 3) {
			        obj['code'] = 2;
			      }
			      if (obj['execone'] != 0) {
			        obj['code'] = 3;
			      }
			      listarr.push(obj);
			    }
			    this.my_ss_tlist = listarr;
			  } else {
			    var listarra = [];
			    for (let index = 0; index < dinfo.length; index++) {
			      var obja = {};
			      for (const key in MySqZcList) {
			        obja[key] = MySqZcList[key];
			      }
			      var prob = '';
			      var prob_num = 0;
			      for (const key in huobiarr) {
			        if (type[index][0] == huobiarr[key]['key']) {
			          prob = huobiarr[key]['id'];
			          prob_num = Number(huobiarr[key]['num']);
			          break;
			        }
			      }
			      obja['did'] = dinfo[index][0];
			      obja['uoa'] = (Number(dinfo[index][1]) / (10 ** prob_num)).toFixed(2);
			      obja['uma'] = (Number(dinfo[index][2]) / (10 ** bzjnum)).toFixed(2);
			      obja['mma'] = (Number(dinfo[index][3]) / (10 ** bzjnum)).toFixed(2);
			      obja['arb'] = dinfo[index][4];
			      obja['what'] = dinfo[index][5];
			      obja['finish'] = dinfo[index][7];
			      obja['execone'] = dinfo[index][6];
			      //查询时间
			      var timc_b = 0;
			      var timd_b = 0;
			      var time_b = 0;
			      await ArbTwo.methods.arbs(dinfo[index][0] + "").call((err, ret) => {
			        timc_b = ret['timc'];
			        timd_b = ret['timd'];
			        time_b = ret['time'];
			      });
			      obja['timc'] = timc_b;
			      obja['timd'] = timd_b;
			      obja['time'] = time_b;
			      obja['pro'] = prob;
			      obja['mark'] = type[index][1];
			      obja['uad'] = addr[index][0];
			      obja['mad'] = addr[index][1];
			      obja['uad_b'] = addr[index][0].substring(0, 5) + "····" + addr[index][0].substring(addr[index][0].length - 5, addr[index][0].length);
			      obja['mad_b'] = addr[index][1].substring(0, 5) + "····" + addr[index][1].substring(addr[index][1].length - 5, addr[index][1].length);
			      listarra.push(obja);
			    }
			    this.my_ss_tlist = listarra;
			  }
			  console.log(this.my_ss_tlist);
			
			},
			
			async open_dylzc(rows, openc) {
			  var row = {};
			  for (const key in rows) {
			    row[key] = rows[key];
			  }
			  if (openc == 2) {
			    console.log(rows);
			    row['can_user'] = '';
			    row['what'] = rows['what'];
			    row['did'] = rows['did'];
			    row['u_user'] = rows['uad'];
			    row['m_user'] = rows['mad'];
			    row['mma'] = rows['mma'];
			    row['uma'] = rows['uma'];
			    row['uoa'] = rows['uoa'];
			  }
			  //获取我的名称
			  var uname = await ArbOne.methods.message(address, 0 + "").call();
			  var zcy_user = await ArbOne.methods.ama(row.did + "", row['what'] + "", 0).call();
			  var zc_info = await ArbOne.methods.arbwhat(row.did + "", row['what'] + "").call();
			  var Tima = await ArbOne.methods.Tima().call();
			  var dqtime = Math.round(new Date() / 1000);
			  var ZcModela = ZcModel;
			  ZcModela['uadd'] = zc_info[0];
			  ZcModela['madd'] = zc_info[1];
			  ZcModela['tima'] = zc_info[2][0];
			  ZcModela['arb'] = zc_info[2][1];
			  ZcModela['execone'] = zc_info[2][2];
			  var ztitle = '';
			  if (row.m_user == row.can_user) {
			    ztitle = 'business';
			  } else if (row.u_user == row.can_user) {
			    ztitle = 'user';
			  }
			  //倒计时计算
			  if (Number(ZcModela['tima']) != 0) {
			    if ((Number(ZcModela['tima']) + Number(Tima)) >= dqtime) {
			      //倒计时
			      ZcModela['djs_val'] = ((Number(ZcModela['tima']) + Number(Tima)) - dqtime) * 1000;
			    } else {
			      ZcModela['djs_val'] = 1.1;
			    }
			  }
			  var arber = await ArbOne.methods.arber(address + "").call();
			  var peg = await ArbOne.methods.peg().call();
			  var lock = await ArbOne.methods.lock(address + "").call();
			  var balanceMar = await ArbOne.methods.balanceMar(address + "").call();
			  if (ZcModela['madd'] == '0x0000000000000000000000000000000000000000') {
			    ZcModela['madd'] = '';
			  }
			  if (ZcModela['uadd'] == '0x0000000000000000000000000000000000000000') {
			    ZcModela['uadd'] = '';
			  }
			  //时间大于当前时间
			  if (((Number(ZcModela['tima']) + Number(Tima)) > dqtime) || Number(ZcModela['tima']) == 0) {
			    //获取被邀请方
			    if (row.m_user == row.can_user) {
			      //business
			      if (!ZcModela['madd']) {
			        if (Number(arber) <= Number(peg) && lock == 0 && balanceMar >= (row['mma'] * (10 ** bzjnum))) {
			          ZcModela['an_code'] = false;
			        } else {
			          ZcModela['an_code'] = true;
			        }
			      }
			    } else if (row.u_user == row.can_user) {
			      //user
			      if (!ZcModela['uadd']) {
			        if (Number(arber) <= Number(peg) && lock == 0 && balanceMar >= (row['mma'] * (10 ** bzjnum))) {
			          ZcModela['an_code'] = false;
			        } else {
			          ZcModela['an_code'] = true;
			        }
			      }
			    }
			  }
			  var zhixingcode = true;
			  //执行按钮状态
			  console.log(ZcModela['arb']);
			  if (ZcModela['arb'] == 1 || ZcModela['arb'] == 2) {
			    //仲裁时间已结束
			    if ((Number(ZcModela['tima']) + Number(Tima)) <= dqtime) {
			      if (ZcModela['execone'] == 0) {
			        zhixingcode = false;
			      } else {
			        zhixingcode = true;
			      }
			    } else {
			      zhixingcode = true;
			    }
			  }
			  this.dyl_zc = {
			    code: true,
			    my_user: address,
			    my_name: uname ? Base64.decode(uname) : 'Not filled in yet',
			    did: row.did,
			    byqf: ztitle,
			    what: row['what'],
			    zccode: false,
			    zc_user: zcy_user,
			    ddifno: {
			      uoa: Number(row.uoa) + '' + row.pro,
			      uma: Number(row.uma),
			      mma: Number(row.mma),
			      uad: row.u_user,
			      mad: row.m_user
			    },
			    zhixingcode: zhixingcode,
			    zcinfo: ZcModela
			  };
			},
			
			//赞成提交
			agree() {
			  ArbOne.methods.arbAsse(this.dyl_zc.did + "", this.dyl_zc.what + "").send({
			    from: address
			  }, (err, ret) => {
			    console.log(ret);
			  });
			},
			// 执行
			async zhixingajax() {
			  // exAss 先查询user what
			  var user = await ArbOne.methods.user(this.dyl_zc['did'] + "").call();
			  ArbOne.methods.exAss(this.dyl_zc['did'] + "", user['what']).send({
			    from: address
			  }, (err, ret) => {
			    if (ret) {
			      Toast.clear();
			      Toast.success('仲裁已经执行，请稍后查看');
			    } else {
			      Toast.clear();
			      Toast.fail('请同意授权！');
			    }
			  });
			},
			
			
			
			async webinit() {
				var dq = this
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
			    dq.tabindex = "3";
			  }
			}
		}
	}
</script>

<style scoped="scoped">
	.list_nav {
		font-size: 12px;
		margin-top: 20px;
	}
	
	.list_item {
		padding: 5px 10px 5px 10px;
		box-shadow: 0 0 5px 0.1rem #dcdcdc;
		margin-top: 10px;
		border-radius: 4px;
	}
</style>
