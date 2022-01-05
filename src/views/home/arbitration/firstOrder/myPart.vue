<template>
	<el-container>
		<!-- pc -->
		<div class="hidden-sm-and-down" style="width: 100%;">
			<el-table :data="dyl_list" style="width: 100%">
			  <el-table-column align="center" fixed prop="did" :label="$t('message.arbitration.orderId')"></el-table-column>
			  <el-table-column align="center" prop="m_user_b" :label="$t('message.arbitration.merchant')">
			    <template slot-scope="scope">
			      <div :class="scope.row.m_user == scope.row.can_user ? 'userac':''">{{ scope.row.m_user_b }}</div>
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="u_user_b" :label="$t('message.arbitration.user')">
			    <template slot-scope="scope">
			      <div :class="scope.row.u_user == scope.row.can_user ? 'userac':''">{{ scope.row.u_user_b }}</div>
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="uoa" :label="$t('message.arbitration.assetsNum')">
			    <template slot-scope="scope">
			      <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="mma" :label="$t('message.arbitration.merchantMargin')">
			    <template slot-scope="scope">
			      {{ scope.row.mma }} USDT
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="uma" :label="$t('message.arbitration.userMargin')">
			    <template slot-scope="scope">
			      {{ scope.row.uma }} USDT
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="what" :label="$t('message.arbitration.appealType')">
			    <template slot-scope="scope">
			      <div v-if="scope.row.what == 1">{{$t('message.arbitration.assets')}}</div>
			      <div v-if="scope.row.what == 2">{{$t('message.arbitration.margin')}}</div>
			      <div v-if="scope.row.what == 3">{{$t('message.other')}}</div>
			    </template>
			  </el-table-column>
			
			  <el-table-column align="center" prop="arb" :label="$t('message.arbitration.arbitrationResult')">
			    <template slot-scope="scope">
			      <div v-if="scope.row.arb == 1">{{$t('message.arbitration.userVictory')}}</div>
			      <div v-if="scope.row.arb == 2">{{$t('message.arbitration.MerchantsVictory')}}</div>
			      <div v-if="scope.row.arb == 3">{{$t('message.arbitration.nextArbitration')}}</div>
			      <div v-if="scope.row.arb == 0">{{$t('message.arbitration.NotStart')}}</div>
			    </template>
			  </el-table-column>
			  <el-table-column align="center" prop="arb" :label="$t('message.arbitration.arbitrationState')" filter-placement="bottom-end">
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
			  <!-- <el-table-column align="center" :label="$t('message.arbitration.countdown')">
			    <template slot-scope="scope">
			      <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
			    </template>
			  </el-table-column> -->
			  <el-table-column align="center" :label="$t('message.operation')">
			    <template slot-scope="scope">
			      <el-button type="text" @click="open_dylzc(scope.row)">{{$t('message.details')}}</el-button>
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
		
		<!-- wap -->
		<div class="hidden-sm-and-up" style="width: 100%;">
			<div class="list_nav">
				<div class="list_item" v-for="(item,index) in dyl_list" :key="index">
					<div class="f" style="width: 100%;">
						<div class="fc a_c c_b" style="width: 50px;padding-top: 5px;">
							<span class="fwb">{{$t('message.arbitration.orderId')}}</span>
							<span class="fwb mart-10" style="font-size: 28px;">{{item.did}}</span>
							<span></span>
						</div>
						<div style="width: 100%;">
							<div class="f c_b top_first" style="padding-bottom: 10px;border-bottom: 2px solid #DCDCDC;padding-top: 6px;">
								<div class="fc a_c c_b marr-5 marl-5">
									<span class="fwb">{{$t('message.arbitration.merchant')}}</span>
									<span class="mart-10" :class="item.m_user == item.can_user ? 'userac':''">{{ item.m_user_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.user')}}</span>
									<span class="mart-10" :class="item.u_user == item.can_user ? 'userac':''">{{ item.u_user_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.assetsNum')}}</span>
									<span class="mart-10">{{ item.uoa }} - {{ item.pro }}</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.appealType')}}</span>
									<span class="mart-10" v-if="item.what == 1">{{$t('message.arbitration.assets')}}</span>
									<span class="mart-10" v-if="item.what == 2">{{$t('message.arbitration.margin')}}</span>
									<span class="mart-10" v-if="item.what == 3">{{$t('message.other')}}</span>
								</div>
							</div>
							<div class="f c_b top_two" style="padding: 10px;">
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.merchantMargin')}}</span>
									<span class="mart-10">{{ item.mma }} USDT</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.userMargin')}}</span>
									<span class="mart-10">{{ item.uma }} USDT</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.arbitrationResult')}}</span>
									<span class="mart-10" v-if="item.arb == 1">{{$t('message.arbitration.userVictory')}}</span>
									<span class="mart-10" v-if="item.arb == 2">{{$t('message.arbitration.MerchantsVictory')}}</span>
									<span class="mart-10" v-if="item.arb == 3">{{$t('message.arbitration.nextArbitration')}}</span>
									<span class="mart-10" v-if="item.arb == 0">{{$t('message.arbitration.NotStart')}}</span>
								</div>
								<div class="fc a_c c_b">
									<span class="fwb">{{$t('message.arbitration.arbitrationState')}}</span>
									<div v-if="item.code == 0" class="mart-10">
									  <span>{{$t('message.arbitration.NotStart')}}</span>
									</div>
									<div v-if="item.code == 1" class="mart-10">
									  <span>{{$t('message.arbitration.arbitrationing')}}</span>
									</div>
									<div v-if="item.code == 2" class="mart-10">
									  <span>{{$t('message.arbitration.arbitrationEnd')}}</span>
									</div>
									<div v-if="item.code == 3" class="mart-10">
									   <span>{{$t('message.arbitration.executed')}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="f c_b a_c" style="padding: 10px 20px;">
						<van-count-down :time="item.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
						<div class="f a_c" @click="open_dylzc(item)">
							<span class="marr-10">查看详情</span>
							<i class="el-icon-arrow-right"></i>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<!-- 详情弹框 -->
		<el-dialog :title="$t('message.arbitration.myPartTitle')" :visible.sync="dyl_zc.code" center :show-close="false" :width="isphone ? '90%':'50%'">
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
		
	</el-container>
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
	import tools from '@/api/public.js'
	import { Dialog, Toast } from 'vant';
	var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;
	
	export default{
		data(){
			return {
				dyl_list: [],
				oneLeveThree: [
				  { value: "1", text: this.$t('message.arbitration.merchant') },
				  { value: "2", text: this.$t('message.arbitration.user')},
				  { value: "3", text: this.$t('message.arbitration.dogfall') },
				],
				formLabelWidth: '150px',
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
				isphone:false,
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
		  tools.testMASK().then(res=>{
		  	let {web,id} = res
		  	web3 = web
		  	address = id
			ArbOne = new web3.eth.Contract(
			  config['hyue'][config['key']]['ArbOne']['abi'],
			  config['hyue'][config['key']]['ArbOne']['heyue']
			);
			// ArbTwo = new web3.eth.Contract(
			//   config['hyue'][config['key']]['arbTwo']['abi'],
			//   config['hyue'][config['key']]['arbTwo']['heyue']
			// );
			// GazConn = new web3.eth.Contract(
			//   config['hyue'][config['key']]['gaz']['abi'],
			//   config['hyue'][config['key']]['gaz']['heyue']
			// );
			// Dotc = new web3.eth.Contract(
			//   config['hyue'][config['key']]['dotc']['abi'],
			//   config['hyue'][config['key']]['dotc']['heyue']
			// );
			// Arbdate = new web3.eth.Contract(
			//   config['hyue'][config['key']]['Arbdate']['abi'],
			//   config['hyue'][config['key']]['Arbdate']['heyue']
			// );
			dq.getList()
			dq.user = address.toLowerCase();
		  }).catch((err)=>{
			web3 = new Web3(config['hyue'][config['key']]['Url']);
		  	console.log(err);
		  })
		},
		methods:{
			//获取第一轮仲裁列表
			async getList() {
			  var num = 25;
			  var dq = this;
			  //读取时间
			  var tima = await ArbOne.methods.Tima().call((err, ret) => {
			    return Number(ret);
			  });
			  var dqtime = Math.round(new Date() / 1000);
			  await ArbOne.methods.inviDeal(address + "", num + "").call((err, ret) => {
			    if (ret) {
			      if (ret[0].length > 0) {
			        var list = [];
			        var infoarr = ret[0];
			        var typearr = ret[1];
			        var userarr = ret[2];
			        for (let index = 0; index < infoarr.length; index++) {
			          var zc_num = '';
			          var zc_id = '';
			          var huobiarr = config['hbi'][config['key']];
			          for (const key in huobiarr) {
			            if (typearr[index][0] == huobiarr[key]['key']) {
			              zc_id = huobiarr[key]['id'];
			              zc_num = Number(huobiarr[key]['num']);
			              break;
			            }
			          }
			          var obj = {};
			          for (const key in ZcDylList) {
			            obj[key] = ZcDylList[key];
			          }
			          obj['did'] = Number(infoarr[index][0]);
			          obj['uoa'] = (Number(infoarr[index][1]) / (10 ** zc_num)).toFixed(2);
			          obj['uma'] = (Number(infoarr[index][2]) / (10 ** bzjnum)).toFixed(2);
			          obj['mma'] = (Number(infoarr[index][3]) / (10 ** bzjnum)).toFixed(2);
			          obj['u_user'] = userarr[index][0];
			          obj['m_user'] = userarr[index][1];
			          obj['u_user_b'] = userarr[index][0].substring(0, 5) + "····" + userarr[index][0].substring(userarr[index][0].length - 5, userarr[index][0].length);
			          obj['m_user_b'] = userarr[index][1].substring(0, 5) + "····" + userarr[index][1].substring(userarr[index][1].length - 5, userarr[index][1].length);
			          obj['what'] = Number(infoarr[index][4]);
			          obj['tima'] = Number(infoarr[index][5]);
			          obj['arb'] = Number(infoarr[index][6]);
			          obj['execone'] = Number(infoarr[index][7]);
			          obj['pro'] = zc_id;
			          obj['mark'] = typearr[index][1];
			          obj['djs_val'] = ((obj['tima'] + Number(tima)) - dqtime) * 1000;
			
			          if (obj['tima'] == 0) {
			            obj['code'] = 0;
			          }
			          if (obj['tima'] != 0 && ((obj['tima'] + Number(tima)) > dqtime)) {
			            obj['code'] = 1;
			          }
			          if (obj['tima'] != 0 && ((obj['tima'] + Number(tima)) < dqtime) || obj['arb'] == 3) {
			            obj['code'] = 2;
			          }
			          if (obj['execone'] != 0) {
			            obj['code'] = 3;
			          }
			          list.push(obj);
			        }
			        dq.dyl_list = list;
			      }
			    }
			  });
			  var index = 0;
			  function hope_userajax() {
			    if (index >= dq.dyl_list.length) {
			      return;
			    }
			    var did = dq.dyl_list[index]['did'];
			    var what = dq.dyl_list[index]['what'];
			    ArbOne.methods.can(did + "", what + "", address + "").call((err, ret) => {
			      dq.dyl_list[index]['can_user'] = ret;
			      index += 1;
			      hope_userajax();
			    });
			  }
			  hope_userajax();
			},
			
			
			// 获取详情
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
			
			filterTag () { },
		}
	}
</script>

<style scoped="scoped">
	.list_nav{
		font-size: 12px;
		margin-top: 20px;
	}
	.list_item{
		padding: 5px 10px 5px 10px;
		box-shadow: 0 0 5px 0.1rem #dcdcdc;
		margin-top: 10px;
		border-radius: 4px;
	}
	.top_first{
		position: relative;
	}
	.top_first:before {
	        content: "";
	        position: absolute;
	        left: 0px;
	        bottom:0;
	        width: 2px;
	        height: 50%;
	        background-color: #DCDCDC
	}
	.top_two{
		position: relative;
	}
	.top_two:before {
	        content: "";
	        position: absolute;
	        left: 0px;
	        top:0;
	        width: 2px;
	        height: 50%;
	        background-color: #DCDCDC
	}
	.el-form-item{
		margin-bottom: 0px;
	}
</style>
