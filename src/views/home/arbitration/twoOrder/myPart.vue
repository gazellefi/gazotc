<template>
	<el-container>
		<!-- pc -->
		<div class="hidden-sm-and-down" style="width: 100%;">
			<el-table :data="del_list" style="width: 100%">
			  <el-table-column align="center" fixed prop="did" :label="$t('message.arbitration.orderId')"></el-table-column>
			  <el-table-column align="center" prop="mad_b" :label="$t('message.arbitration.merchant')"></el-table-column>
			  <el-table-column align="center" prop="uad_b" :label="$t('message.arbitration.user')"> </el-table-column>
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
			  <el-table-column prop="mad_b" :label="$t('message.arbitration.singUpState')">
			    <template slot-scope="scope">
			      {{ scope.row.arbw == 0 ? 'Not selected' : 'Successfully selected' }}
			    </template>
			  </el-table-column>
			  <el-table-column :label="$t('message.arbitration.arbitrationState')" :filters="towLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
			    <template slot-scope="scope">
			      <div v-if="scope.row.timc == 0">Not registered</div>
			      <div v-if="scope.row.timc != 0 && scope.row.timd == 0">{{$t('message.arbitration.signing')}}</div>
			  
			      <div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">{{$t('message.arbitration.voteing')}}</div>
			      <div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">{{$t('message.arbitration.waiting')}}</div>
			  
			      <div v-if="scope.row.finish != 0">{{$t('message.arbitration.executed')}}</div>
			  
			    </template>
			  </el-table-column>
			  <el-table-column align="center" :label="$t('message.arbitration.countdown')">
				  <template slot-scope="scope">
				    <div v-if="scope.row.timc != 0 && scope.row.timd == 0">
				      <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
				    </div>
				    <div v-if="scope.row.timd != 0 && scope.row.time == 0">
				      <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
				    </div>
				    <div v-if="scope.row.time != 0 && scope.row.finish == 0">
				      <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
				    </div>
				  </template>
			  </el-table-column>
			  <el-table-column align="center" :label="$t('message.operation')">
				  <template slot-scope="scope">
					<div>
					  <el-button size="mini"  @click="open_dylzc(scope.row)">{{$t('message.details')}}</el-button>
					</div>
				  </template>
			  </el-table-column>
			  <div slot="empty">
			  	<div style="padding-top: 20px;" class="f a_c c_c">
			  		<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
			  	</div>
			  	<p>暂无数据</p>
			  </div>
			</el-table>
		</div>	
		
		<!-- wap -->
		<div class="hidden-sm-and-up" style="width: 100%;">
			<div class="list_nav">
				<div v-if="del_list.length<1" class="fc a_c">
					<div style="padding-top: 20px;">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p :style="{'marginTop': '23px'}">暂无数据</p>
				</div>
				<div class="list_item" v-for="(item,index) in del_list" :key="index">
					<div class="f" style="width: 100%;">
						<div class="fc a_c c_b" style="width: 50px;padding-top: 5px;">
							<span class="fwb">{{$t('message.arbitration.orderId')}}</span>
							<span class="fwb mart-10" style="font-size: 28px;">{{item.did}}</span>
							<span></span>
						</div>
						<div style="width: 100%;">
							<div class="f c_b top_first"
								style="padding-bottom: 10px;border-bottom: 2px solid #DCDCDC;padding-top: 6px;">
								<div class="fc a_c c_b marr-5 marl-5">
									<span class="fwb">{{$t('message.arbitration.merchant')}}</span>
									<span class="mart-10">{{ item.mad_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.user')}}</span>
									<span class="mart-10">{{ item.uad_b }}</span>
								</div>
								<div class="fc a_c c_b marr-5">
									<span class="fwb">{{$t('message.arbitration.assetsNum')}}</span>
									<span class="mart-10">{{ item.uoa }} - {{ item.pro }}</span>
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
									<span class="fwb">{{$t('message.arbitration.arbitrationState')}}</span>
									<div v-if="item.timc == 0">Not registered</div>
									<div v-if="item.timc != 0 && item.timd == 0">{{$t('message.arbitration.signing')}}
									</div>
			
									<div v-if="item.timd != 0 && item.time == 0 && item.timc != 0">
										{{$t('message.arbitration.voteing')}}</div>
									<div v-if="item.time != 0 && item.finish == 0 && item.timc != 0">
										{{$t('message.arbitration.waiting')}}</div>
			
									<div v-if="item.finish != 0">{{$t('message.arbitration.executed')}}</div>
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
		<el-dialog :title="$t('message.arbitration.myPartTitle')" :visible.sync="dyl_zc.code" center :show-close="false"  :width="isphone ? '90%':'50%'">
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
	import ZcDelList from "@/conn/zc/ZcDelList.json";
	
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
				del_list: [],
				towLeveThree: [
				  { value: "1", text: this.$t('message.arbitration.signing') },
				  { value: "2", text: this.$t('message.arbitration.voteing') },
				  { value: "3", text: this.$t('message.arbitration.waiting')  },
				  { value: "4", text: this.$t('message.arbitration.executed')  },
				],
				formLabelWidth: '150px',
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
			openqb(e) {
			  // this.wapcd = false;
			  this.$router.push(e);
			},
			//第二轮我参与的
			async getList() {
			  var num = 25;
			  var dq = this;
			  //读取时间
			  var Timc = await ArbTwo.methods.Timc().call();
			  var Timd = await ArbTwo.methods.Timd().call();
			  var Time = await ArbTwo.methods.Timd().call();
			
			  var dqtime = Math.round(new Date() / 1000);
			  await ArbOne.methods.applDeal(address + "", num).call((err, ret) => {
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
			          var arbw = ArbTwo.methods.arbw(infoarr[index][0], address + "").call();
			          var obj = {};
			          for (const key in ZcDelList) {
			            obj[key] = ZcDelList[key];
			          }
			          obj['did'] = Number(infoarr[index][0]);
			          obj['uoa'] = (Number(infoarr[index][1]) / (10 ** zc_num)).toFixed(2);
			          obj['uma'] = (Number(infoarr[index][2]) / (10 ** bzjnum)).toFixed(2);
			          obj['mma'] = (Number(infoarr[index][3]) / (10 ** bzjnum)).toFixed(2);
			          obj['timc'] = 0;
			          obj['timd'] = Number(infoarr[index][5]);
			          obj['time'] = Number(infoarr[index][6]);
			          obj['finish'] = Number(infoarr[index][7]);
			
			          obj['pro'] = zc_id;
			          obj['mark'] = typearr[index][1];
			          obj['arbw'] = arbw;
			
			          obj['uad'] = userarr[index][0];
			          obj['mad'] = userarr[index][1];
			
			          var uad_b = userarr[index][0].substring(0, 5) + "····" + userarr[index][0].substring(userarr[index][0].length - 5, userarr[index][0].length);
			          var mad_b = userarr[index][1].substring(0, 5) + "····" + userarr[index][1].substring(userarr[index][1].length - 5, userarr[index][1].length);
			          obj['uad_b'] = uad_b;
			          obj['mad_b'] = mad_b;
			
			          obj['Timed'] = Number(Timd);
			          obj['Timec'] = Number(Timc);
			          obj['Timee'] = Number(Time);
			          list.push(obj);
			        }
			        dq.del_list = list;
			      }
			    }
			  });
			
			  //循环获取时间以及谁选我
			  for (let index = 0; index < dq.del_list.length; index++) {
			    var timc = await ArbTwo.methods.arbs(dq.del_list[index]['did'] + "").call();
			    dq.del_list[index]['timc'] = Number(timc['timc']);
			    if (dq.del_list[index]['timc'] != 0 && dq.del_list[index]['timd'] == 0) {
			      dq.del_list[index]['djs_val'] = ((dq.del_list[index]['timc'] + dq.del_list[index]['Timec']) - dqtime) * 1000;
			    }
			    if (dq.del_list[index]['timd'] != 0 && dq.del_list[index]['time'] == 0) {
			      dq.del_list[index]['djs_val'] = ((dq.del_list[index]['timd'] + dq.del_list[index]['Timed']) - dqtime) * 1000;
			    }
			    if (dq.del_list[index]['time'] != 0 && dq.del_list[index]['finish'] == 0) {
			      dq.del_list[index]['djs_val'] = ((dq.del_list[index]['time'] + dq.del_list[index]['Timee']) - dqtime) * 1000;
			    }
			  }
			  console.log(this.del_list);
			
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
			      Toast.success('Arbitration has been executed, please check later');
			    } else {
			      Toast.clear();
			      Toast.fail('Please agree to authorize!');
			    }
			  });
			},
			
			filterTag () { },
			
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
			  console.log(this.dyl_zc);
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
	div >>> .el-dialog__header{
		background-color: #FDC500;
	}
	div >>> .el-dialog__title{
		color: #fff;
		font-size: 28px;
	}
	div >>> .el-form-item{
		margin-bottom: 20px;
	}
	div >>> .el-dialog--center .el-dialog__body{
		padding: 25px 50px 0;
	}
	div >>> .el-form--label-left .el-form-item__label{
		line-height: 180%;
	}
	div >>> .el-form-item__content{
		line-height: 180%;
	}
	.invitationBnt{
		color: #fff;
		border: none;
		width: 26%;
	}
	.favorBtn{
		background-color: #fdd62c;
	}
	.implementBtn{
		background-color: #489cfe;
	}
</style>
