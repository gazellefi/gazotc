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
			  <el-table-column :label="$t('message.arbitration.arbitrationState')">
			    <template slot-scope="scope">
			      <div v-if="scope.row.timc == 0">Not registered</div>
			      <div v-if="scope.row.timc != 0 && scope.row.timd == 0">{{$t('message.arbitration.signing')}}</div>
			  
			      <div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">{{$t('message.arbitration.voteing')}}</div>
			      <div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">{{$t('message.arbitration.waiting')}}</div>
			  
			      <div v-if="scope.row.finish != 0">{{$t('message.arbitration.executed')}}</div>
			  
			    </template>
			  </el-table-column>
			 <!-- <el-table-column align="center" :label="$t('message.arbitration.countdown')">
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
			  </el-table-column> -->
			  <el-table-column align="center" :label="$t('message.operation')">
				  <template slot-scope="scope">
					<div>
					  <el-button size="mini"  @click="openqb('openzcgl',scope.row.did)">{{$t('message.details')}}</el-button>
					</div>
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
				<div v-if="del_list.length<1" class="fc a_c">
					<div style="padding-top: 20px;">
						<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
					</div>
					<p :style="{'marginTop': '23px'}">{{$t('message.NoData')}}</p>
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
						<div class="f a_c" @click="openqb('openzcgl')">
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
		
		
		<!-- 第二轮仲裁管理 -->
		<el-dialog
		  :title="$t('message.arbitration.secondManagement')"
		  :visible.sync="zcgldata.code"
		  width=350px
		>
		<!-- <div v-if="zcgldata.tcode" class="zcglul"> -->
		<div class="zcglul">
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.account')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['myuser'].substring(0,7) }}....</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.nickName')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['myname'] }}</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.myCharacter')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['myjuese'] }}</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.idNum')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['ddid'] }}</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.orderDetail')}}：</div>
		    <div class="zcglul_li_r list">
		      <div class="zcglul_li_r_item">
		        {{$t('message.arbitration.merchants')}}：{{ zcgldata['info']['ddinfo']['mad'].substring(0,7) }}....
		      </div>
		      <div class="zcglul_li_r_item">
		        {{$t('message.arbitration.userAccount')}}：{{ zcgldata['info']['ddinfo']['uad'].substring(0,7) }}....
		      </div>
		      <div class="zcglul_li_r_item">
		        {{$t('message.arbitration.numberTransaction')}}：{{ zcgldata['info']['ddinfo']['uoa'] }}  {{ zcgldata['info']['ddinfo']['pro'] }}
		      </div>
		      <div class="zcglul_li_r_item">
		        {{$t('message.arbitration.merMargin')}}：{{ zcgldata['info']['ddinfo']['mma']  }}  USDT
		      </div>
		      <div class="zcglul_li_r_item">
		        {{$t('message.arbitration.userMargin')}}：{{ zcgldata['info']['ddinfo']['uma'] }}  USDT
		      </div>
		    </div>
		  </div>
		  <div class="zcglul_li title">{{$t('message.arbitration.arbitrationScheme')}}</div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.num')}}：</div>
		    <div class="zcglul_li_r maleftreft">
		      <div>
		        <el-select v-model="zcgldata.faid" :placeholder="$t('message.arbitration.choose')" size="mini">
		            <el-option
		              v-for="item in zcgldata['bhnum']"
		              :key="item"
		              :label="item"
		              :value="item">
		            </el-option>
		          </el-select>
		          <el-button type="text" style="margin-left: 5px;" @click="openqb('openbzcfanwin')"><i class="el-icon-circle-plus-outline"></i> {{$t('message.arbitration.new')}}</el-button>
		      </div>
		      <div style="margin-top: 5px;">{{$t('message.arbitration.voteNum')}} {{ !zcgldata['info']['tpjdu']?0:zcgldata['info']['tpjdu'] }}/5</div>
		    </div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.assetOwnership')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['zcguishu'] }}</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.bail')}}：</div>
		    <div class="zcglul_li_r">({{ zcgldata['info']['who'] == 1 ? $t('message.arbitration.merchantBail'):$t('message.arbitration.userBail') }}) <br> {{ zcgldata['info']['bzjnum'] }} USDT</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.M_arbitrator')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['sjnum'] }} GAZ</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.U_arbitrator')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['yhnum'] }} GAZ</div>
		  </div>
		  <div class="zcglul_li_item">
		    <div class="zcglul_li_l">{{$t('message.arbitration.secondArbitrationFee')}}：</div>
		    <div class="zcglul_li_r">{{ zcgldata['info']['delnum'] }} GAZ</div>
		  </div>
		  <div class="zcglul_li_item daojishi">
		    <div class="zcglul_li_l">{{$t('message.arbitration.votingCountDown')}}</div>
		    <div class="zcglul_li_r"><van-count-down :time="zcgldata['info'].djsval" format="DD 天 HH 时 mm 分 ss 秒" /></div>
		  </div>
		  <div class="zcglul_li coll">
		    <div class="zcglul_li_item_in">
		      <van-button type="danger"  :loading="zcgldata['loading']" @click="qxtoupiao">{{$t('message.arbitration.cancel')}}</van-button>
		      <van-button type="primary" style="margin-left: 10px;" @click="toupiaoajax" :loading="zcgldata.loading">{{$t('message.arbitration.vote')}}</van-button>
		    </div>
		    <div class="zcglul_li_item_in">
		      <van-button type="info" :loading="zcgldata.loading" @click="jieshoutoupiao">{{$t('message.arbitration.accept')}}</van-button>
		      <van-button type="default" style="margin-left: 10px;" :loading="zcgldata.loading">{{$t('message.arbitration.repeal')}}</van-button>
		    </div>
		    <div class="zcglul_li_item_in">
		      <van-button type="info" :loading="zcgldata.loading" @click="executeajax">{{$t('message.arbitration.execute')}}</van-button>
		      <van-button type="default" style="margin-left: 10px;" :loading="zcgldata.loading" @click="restartlArbajax">{{$t('message.arbitration.restart')}}</van-button>
		    </div>
		  </div>
		</div>
		</el-dialog>
		
		
		<!-- 设置仲裁方案 -->
		<el-dialog
		  :title="$t('message.arbitration.secondScheme')"
		  :visible.sync="bzj_fangan.code"
		  width=350px
		>
		  <span v-if="!bzj_fangan.data.code">
		    <el-input
		      v-model="bzj_fangan['ddid']"
		      :placeholder="$t('message.arbitration.enterNumber')"
		    ></el-input>
		  </span>
		
		  <div v-if="bzj_fangan.data.code" class="bzj_fangan_ul">
		    <div class="bzj_fangan_ul_li">
		      {{$t('message.arbitration.account')}}:{{ bzj_fangan.data["myuser"].substring(0, 8) }} ....
		    </div>
		    <div class="bzj_fangan_ul_li">
		      {{$t('message.arbitration.nickName')}}:{{ bzj_fangan.data["myname"] }}
		    </div>
		    <div class="bzj_fangan_ul_li">{{$t('message.arbitration.idNum')}}:{{ bzj_fangan.ddid }}</div>
		    <div class="bzj_fangan_ul_li ul">
		      <div class="bzj_fangan_ul_li_ul">{{$t('message.arbitration.orderDetail')}}：</div>
		      <div class="bzj_fangan_ul_li_ul_li">
		        {{$t('message.arbitration.merchants')}}：{{ bzj_fangan.data["mad"].substring(0, 8) }} ....
		      </div>
		      <div class="bzj_fangan_ul_li_ul_li">
		        {{$t('message.arbitration.userAccount')}}：{{ bzj_fangan.data["uad"].substring(0, 8) }} ....
		      </div>
		      <div class="bzj_fangan_ul_li_ul_li">
		        {{$t('message.arbitration.asset')}}：{{ bzj_fangan.data["uoa"].toFixed(2) }} 
		        {{ bzj_fangan.data["pro"] }}
		      </div>
		      <div class="bzj_fangan_ul_li_ul_li">
		        {{$t('message.arbitration.merMargin')}}：{{ bzj_fangan.data["mma"].toFixed(2) }}  USDT
		      </div>
		      <div class="bzj_fangan_ul_li_ul_li">
		        {{$t('message.arbitration.userMargin')}}：{{ bzj_fangan.data["uma"].toFixed(2) }}  USDT
		      </div>
		    </div>
		    <div class="bzj_fangan_ul_li title">{{$t('message.arbitration.arbitrationScheme')}}</div>
		
		    <div class="bzj_fangan_ul_li">
		      <span class="bzj_fangan_ul_lia">{{$t('message.arbitration.assetOwnership')}}：</span
		      ><el-radio v-model="bzj_fangan.from.who" label="1">{{$t('message.arbitration.merchant')}}</el-radio>
		      <el-radio v-model="bzj_fangan.from.who" label="2">{{$t('message.arbitration.user')}}</el-radio>
		      <el-radio v-model="bzj_fangan.from.who" label="0">{{$t('message.arbitration.hasReleased')}}</el-radio>
		    </div>
		    <div class="bzj_fangan_ul_li">
		      <span class="bzj_fangan_ul_lia">{{$t('message.arbitration.bail')}}：</span>
		      <el-select
		        size="mini"
		        :placeholder="$t('message.arbitration.choose')"
		        v-model="bzj_fangan.from.bzjt"
		      >
		        <el-option
		          v-for="item in [
		            { label: $t('message.arbitration.merchant'), value: '1' },
		            { label: $t('message.arbitration.user'), value: '2' },
		          ]"
		          :key="item.value"
		          :label="item.label"
		          :value="item.value"
		        >
		        </el-option>
		      </el-select>
		      <el-select
		        size="mini"
		        :placeholder="$t('message.arbitration.choose')"
		        style="margin-left: 5px"
		        v-model="bzj_fangan.from.bzjtb"
		      >
		        <el-option
		          v-for="item in [
		            { label: $t('message.arbitration.add'), value: '1' },
		            { label: $t('message.arbitration.reduce'), value: '2' },
		          ]"
		          :key="item.value"
		          :label="item.label"
		          :value="item.value"
		        >
		        </el-option>
		      </el-select>
		      <el-input
		        size="mini"
		        :placeholder="$t('message.arbitration.enterInput')"
		        style="margin-left: 5px"
		        v-model="bzj_fangan.from.bzjnum"
		      >
		        <template slot="append">USDT</template>
		      </el-input>
		    </div>
		    <div class="bzj_fangan_ul_li">
		      <span class="bzj_fangan_ul_lia">{{$t('message.arbitration.U_arbitrator')}}：</span
		      ><el-input
		        size="mini"
		        :placeholder="$t('message.arbitration.enterInput')"
		        v-model="bzj_fangan.from.sjzcy"
		      >
		        <template slot="append">GAZ</template>
		      </el-input>
		    </div>
		    <div class="bzj_fangan_ul_li">
		      <span class="bzj_fangan_ul_lia">{{$t('message.arbitration.M_arbitrator')}}：</span>
		      <el-input
		        size="mini"
		        :placeholder="$t('message.arbitration.enterInput')"
		        v-model="bzj_fangan.from.yhzcy"
		      >
		        <template slot="append">GAZ</template>
		      </el-input>
		    </div>
		    <div class="bzj_fangan_ul_li">
		      <span class="bzj_fangan_ul_lia">{{$t('message.arbitration.secondArbitrationFee')}}：</span
		      ><el-input
		        size="mini"
		        :placeholder="$t('message.arbitration.enterCost')"
		        v-model="bzj_fangan.from.zcfeiyong"
		      >
		        <template slot="append">GAZ</template>
		      </el-input>
		    </div>
		  </div>
		
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="bzj_fangan.code = false">{{$t('message.arbitration.cancel')}}</el-button>
		    <el-button
		      type="primary"
		      @click="ddinfoajax_fan"
		      :loading="bzj_fangan.loading"
		      v-if="!bzj_fangan.data.code"
		      >{{$t('message.arbitration.set')}}</el-button
		    >
		    <el-button plain v-if="bzj_fangan.data.code" @click="backsyb">{{$t('message.arbitration.backUp')}}</el-button>
		    <el-button
		      type="primary"
		      :loading="bzj_fangan.loading"
		      v-if="bzj_fangan.data.code"
		      @click="schemeajax"
		      >{{$t('message.arbitration.set')}}</el-button
		    >
		  </span>
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
	import tools from '@/api/public.js'
	import { Dialog, Toast } from 'vant';
	var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;
	var webtrue = false;
	var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];
	
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
				
				  bzj_fangan: {
				    loading: false,
				    ddid: "",
				    code: false,
				  
				    data: {
				      code: false,
				    },
				  
				    from: {
				      who: "",
				      bzjt: "1",
				      bzjtb: "1",
				      bzjnum: null,
				      sjzcy: null,
				      yhzcy: null,
				      zcfeiyong: null,
				    },
				  },
				  
				zcgldata:{
				  loading:false,
				  code:false,
				  tcode:false,
				  faid:1,
				  bhnum:0,
				  ddid:0,
				  arbs:{},
				  info:{
				    myuser:'',
				    myname:'',
				    myjuese:'',
				    ddid:'',
				    ddinfo:{
				      uad:'',
				      mad:'',
				      pro:'',
				      mma:'',
				      uma:'',
				      uoa:''
				    },
				    tpjdu:0,
				    zcguishu:'',
				    bzjnum:0,
				    who:0,
				    sjnum:0,
				    yhnum:0,
				    delnum:0,
				    djsval:0
				  }
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
		  tools.testMASK().then(res=>{
		  	let {web,id} = res
		  	web3 = web
		  	address = id
		  	ArbOne = new web3.eth.Contract(
		  	  config['hyue'][config['key']]['ArbOne']['abi'],
		  	  config['hyue'][config['key']]['ArbOne']['heyue']
		  	);
		  	ArbTwo = new web3.eth.Contract(
		  	  config['hyue'][config['key']]['arbTwo']['abi'],
		  	  config['hyue'][config['key']]['arbTwo']['heyue']
		  	);
		  	// GazConn = new web3.eth.Contract(
		  	//   config['hyue'][config['key']]['gaz']['abi'],
		  	//   config['hyue'][config['key']]['gaz']['heyue']
		  	// );
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
		  }).catch((err)=>{
			web3 = new Web3(config['hyue'][config['key']]['Url']);
		  	console.log(err);
		  })
		},
		methods:{
			openqb(e,d) {
			
			  this.wapcd = false;
			  console.log(e)
			  
			  if (e == "openbzcfanwin") {
			    if (!webtrue) {
			      this.$notify.error({
			        title: "未连接钱包",
			        duration: 2000,
			        message: "系统检测您未安装钱包插件！",
			      });
			      return;
			    }
			    this.bzj_fangan.code = true;
			    return;
			  }
			  if (e == "openzcgl") {
				
				if (!webtrue) {
					this.$notify.error({
					  title: "未连接钱包",
					  duration: 2000,
					  message: "系统检测您未安装钱包插件！",
					});
					return;
				}
				this.zcgldata['ddid']=d;
				this.getzcinfoajax();
			    this.zcgldata['code'] = true;
			    return;
			  }
			  this.$router.push(e);
			},
			
			//方案点击回退上一步
			backsyb(){
			  this.bzj_fangan = {
			    loading: false,
			    ddid: this.bzj_fangan.ddid,
			    code: true,
			
			    data: {
			      code: false,
			    },
			
			    from: {
			      who: "",
			      bzjt: "1",
			      bzjtb: "1",
			      bzjnum: null,
			      sjzcy: null,
			      yhzcy: null,
			      zcfeiyong: null,
			    },
			  };
			},
			//方案操作
			async ddinfoajax_fan() {
			  var dq = this;
			  dq.bzj_fangan.loading = true;
			  dq.bzj_fangan.data.code = false;
			  var ddinfo = await ArbOne.methods.user(dq.bzj_fangan.ddid).call();
			  if (
			    ddinfo["mark"] ==
			    "0x0000000000000000000000000000000000000000000000000000000000000000"
			  ) {
			    //初始化
			    var ddis = await Dotc.methods.users(this.bzj_fangan.ddid).call();
			    if (ddis["iorder"] == 0) {
			      dq.bzj_fangan.loading = false;
			      dq.$message({
			        message: "订单不存在",
			        type: "warning",
			      });
			      return;
			    }
			    initlx();
			  } else {
			    //组装数据
			    setobj(ddinfo);
			  }
			
			  //轮询查询是否初始化成功
			  function initlx() {
			    ArbOne.methods.user(dq.bzj_fangan.ddid).call((err, ret) => {
			      if (ret) {
			        if (
			          ret["mark"] !=
			          "0x0000000000000000000000000000000000000000000000000000000000000000"
			        ) {
			          setobj(ret);
			        } else {
			          setTimeout(() => {
			            initlx();
			          }, 3000);
			        }
			      } else {
			        dq.bzj_fangan.loading = false;
			        dq.$message({
			          message: "请点击同意！",
			          type: "warning",
			        });
			      }
			    });
			  }
			
			  //组装数据
			  async function setobj(data) {
			    var bzjnum = config["hyue"][config["key"]]["Bzj"]["num"];
			    var pro = {
			      num: 0,
			      pro: "",
			    };
			    var hbarr = config["hbi"][config["key"]];
			    for (const key in hbarr) {
			      if (data.pro == hbarr[key]["key"]) {
			        pro.num = hbarr[key]["num"];
			        pro.pro = hbarr[key]["id"];
			        break;
			      }
			    }
			    var username = await ArbOne.methods.message(address, "0").call();
			    dq.bzj_fangan.loading = false;
			    dq.bzj_fangan.data.code = true;
			    data.uma = Number(data.uma) / 10 ** bzjnum;
			    data.mma = Number(data.mma) / 10 ** bzjnum;
			    data.uoa = Number(data.uoa) / 10 ** pro.num;
			    data.pro = pro.pro;
			    data.myuser = address;
			    data.myname = username ? Base64.decode(username) : "暂未设置";
			    for (const key in data) {
			      dq.bzj_fangan.data[key] = data[key];
			    }
			  }
			},
			
			//提交方案
			async schemeajax() {
			  var dq = this;
			  dq.bzj_fangan.loading = true;
			  // 分配的数量之和必须等于交易双方及第一轮仲裁费之和
			  var _who = 1;
			  if (
			    this.bzj_fangan["from"]["bzjt"] == 1 &&
			    this.bzj_fangan["from"]["bzjtb"] == 1
			  ) {
			    _who = 2;
			  } else if (
			    this.bzj_fangan["from"]["bzjt"] == 1 &&
			    this.bzj_fangan["from"]["bzjtb"] == 2
			  ) {
			    _who = 1;
			  } else if (
			    this.bzj_fangan["from"]["bzjt"] == 2 &&
			    this.bzj_fangan["from"]["bzjtb"] == 1
			  ) {
			    _who = 1;
			  } else if (
			    this.bzj_fangan["from"]["bzjt"] == 2 &&
			    this.bzj_fangan["from"]["bzjtb"] == 2
			  ) {
			    _who = 2;
			  }
			  var meg = await ArbTwo.methods.meg().call();
			  var arat = await ArbTwo.methods.arat().call();
			  var arbs = await ArbTwo.methods.arbs(this.bzj_fangan["ddid"]).call();
			  var user = await ArbTwo.methods.user(this.bzj_fangan["ddid"]).call();
			  var arm = Number(arbs.arm);
			  var mma = Number(user.mma);
			  var uma = Number(user.uma);
			  var tol =
			    Number(this.bzj_fangan.from.sjzcy) * 10**bzj_num +
			    Number(this.bzj_fangan.from.yhzcy) * 10**bzj_num;
			  if (
			    add(tol, mul(Number(this.bzj_fangan.from.zcfeiyong) * 10**bzj_num, meg)) ==
			    mul(add(arm, mma), 2)
			  ) {
			    var numbbbbb = Number(this.bzj_fangan.from.bzjnum) * 10**bzj_num;
			    //第二轮仲裁员分配的仲裁费必须低于最高比例
			    if (
			      mul(Number(this.bzj_fangan.from.zcfeiyong) * 10**bzj_num, 10 ** 6) <=
			      mul(mma, Number(arat))
			    ) {
			      //设置保证金调整方案,@_who == 1 扣除商家的保证金,@_who == 2 扣除用户的保证金,
			      if (_who == 1) {
			        if (numbbbbb <= mma) {
			          getfanan();
			        } else {
			          dq.bzj_fangan.loading = false;
			          this.$message.error("设置金额不能大于商家保证金金额！");
			        }
			      } else {
			        if (numbbbbb <= uma) {
			          getfanan();
			        } else {
			          dq.bzj_fangan.loading = false;
			          this.$message.error("设置金额不能大于用户保证金金额！");
			        }
			      }
			    } else {
			      dq.bzj_fangan.loading = false;
			      this.$message.error("此方案设置失败");
			    }
			  } else {
			    dq.bzj_fangan.loading = false;
			    this.$message.error("此方案设置失败");
			  }
			
			  //提交本次设置方案
			  async function getfanan() {
			    var numbbbbb = tools.getnume(dq.bzj_fangan.from.bzjnum * 10 ** 12*10**6);
			    var zcfeiyong = tools.getnume(dq.bzj_fangan.from.zcfeiyong * 10 ** 12*10**6);
			    var sjzcy = tools.getnume(dq.bzj_fangan.from.sjzcy * 10 ** 12*10**6);
			    var yhzcy = tools.getnume(dq.bzj_fangan.from.yhzcy * 10 ** 12*10**6);
			    var array = new Array(4);
			    array[0] = 0;
			    array[1] = 0;
			    array[2] = sjzcy;
			    array[3] = yhzcy;
			    //查询编号是否存在
			    var shasing = await Arbdate.methods
			      .scheme(
			        dq.bzj_fangan["ddid"],
			        dq.bzj_fangan.from.who + "",
			        _who + "",
			        numbbbbb + "",
			        array,
			        zcfeiyong + ""
			      )
			      .call();
			    var isfanan = await ArbTwo.methods.plan(shasing).call();
			    if (isfanan != 0) {
			      dq.bzj_fangan.loading = false;
			      dq.$message.error(`您好，此方案已存在!,方案编号为${isfanan}`);
			      return;
			    }
			    ArbTwo.methods
			      .scheme(
			        dq.bzj_fangan["ddid"],
			        dq.bzj_fangan.from.who + "",
			        _who + "",
			        numbbbbb + "",
			        array,
			        zcfeiyong + ""
			      )
			      .send({ from: address }, (err, ret) => {
			        if (ret) {
			          dq.bzj_fangan.loading = false;
			          dq.$message({
			            message: "已经提交方案",
			            type: "success",
			          });
			        } else {
			          dq.bzj_fangan.loading = false;
			          dq.$message.error("请点击同意!");
			        }
			      });
			  }
			
			  function mul(z, y) {
			    return z * y;
			  }
			  function add(z, y) {
			    return z + y;
			  }
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
					  console.log(ret)
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
					for(let i=0;i<list.length;i++){
						for(let j=i+1;j<list.length;j++){
							if(list[i]['did']==list[j]['did']){
								list.splice(j,1);
								j--;
							}
						}
					}
			        dq.del_list = list;
					console.log(list)
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
			
			//仲裁方案查询 订单信息 方案列表 投票结果 资产归属信息
			async getzcinfoajax(){
				console.log(this.zcgldata.ddid)
			  if (!this.zcgldata.ddid  || this.zcgldata == 0) {
				  console.log(this.zcgldata)
			    this.$message.error('请输入订单号！');
			    return;
			  }
			  var dq = this;
			  var data = dq.zcgldata;
			  dq.zcgldata.loading = true;
			  //查询订单信息
			  var ddinfo = await ArbOne.methods.user(this.zcgldata.ddid).call();
			  if (ddinfo['mark'] == '0x0000000000000000000000000000000000000000000000000000000000000000') {
			    this.$message.error('订单不存在！');
			    dq.zcgldata.loading = false;
			    return;
			  }
			  getshuju();
			  //获取数据 并且组装
			  async function getshuju() {
			    //查询总票数量
			    var bhnum = await ArbTwo.methods.paus(data.ddid).call(); 
			    //查询仲裁数据库
			    var arbs = await ArbTwo.methods.arbs(data.ddid).call();
			    var Timc = await ArbTwo.methods.Timc().call();
			    //查询默认编号投票人数 以及信息
			    var guishu;
			    var slates = await ArbTwo.methods.slates(data.ddid,data['faid']).call();
			      if (slates['arb'] == 1) guishu =  '商家';
			      if (slates['arb'] == 2) guishu =  '用户';
			      if (slates['arb'] == 0) guishu =  '已释放';
			      console.log(34567)
			      console.log(data['faid'])
			      console.log(slates['comp'])
			    var weight = await ArbTwo.methods.weight(data.ddid,arbs['timc'],data['faid']).call();
			
			    var sjzcy_num = 0;
			    var yhzcy_num  = 0;
				console.log(data.ddid,data['faid'])
			    await ArbTwo.methods.slat(data.ddid,data['faid'],3).call((err,ret)=>{
			      if (ret) {
			        sjzcy_num = ret;
			      }
					console.log(ret)
			    });
			    await ArbTwo.methods.slat(data.ddid,data['faid'],2).call((err,ret)=>{
			      if (ret) {
			        yhzcy_num = ret;
			      }
					console.log(err)
			    });
			    var pro_num = 0;
			    var pro_id = '';
			    var huobi = config['hbi'][config['key']];
			    for (const key in huobi) {
			      if (ddinfo['pro'] == huobi[key]['key']) {
			        pro_num =  huobi[key]['num'];
			        pro_id =  huobi[key]['id'];
			        break;
			      }
			    }
			
			    //获取用户名
			    var username = await ArbOne.methods.message(address,0).call();
			
			    //倒计时
			    var dqtime = Math.round(new Date() / 1000);
			    var ensjc = Number(Timc) + Number(arbs['timc']);
			    var djsval = (dqtime - ensjc)*1000;
			    console.log("倒计时1")
			    console.log(dqtime)
			    console.log(ensjc)
			    console.log(djsval)
			    dq.zcgldata = {
			      code:data.code,
			      loading:false,
			      tcode:true,
			      faid:1,
			      bhnum:Number(bhnum),
			      ddid:data['ddid'],
			      arbs:arbs,
			      info:{
			        myuser:address,
			        myname:username ? Base64.decode(username):'暂未填写',
			        myjuese:'',
			        ddid:data['ddid'],
			        ddinfo:{
			          uad:ddinfo['uad'],
			          mad:ddinfo['mad'],
			          pro:pro_id,
			          mma:Number(ddinfo['mma']) / (10**bzj_num),
			          uma:Number(ddinfo['uma']) / (10**bzj_num),
			          uoa:Number(ddinfo['uoa']) / (10**pro_num)
			        },
			        tpjdu:weight,
			        zcguishu:guishu,
			        bzjnum:Number(slates['comp']) / (10**bzj_num),
			        who:slates['who'],
			        sjnum:Number(sjzcy_num) / (10**bzj_num),
			        yhnum:Number(yhzcy_num) / (10**bzj_num),
			        delnum:Number(slates['fees']) / (10**bzj_num),
			        djsval:djsval
			      }
			    }
			    //查询我是否双方交易之一
			    if (zmxiaoxie(JSON.stringify(ddinfo)).indexOf(zmxiaoxie(address)) != -1) {
			      if (zmxiaoxie(ddinfo['mad']) == zmxiaoxie(address)) {
			        dq.zcgldata.info.myjuese = '商家';
			      }else if (zmxiaoxie(ddinfo['uad']) == zmxiaoxie(address)) {
			        dq.zcgldata.info.myjuese = '用户';
			      }
			    }else{
			      //查询投票者
			        ArbTwo.methods.applySuceed(data.ddid).call((err,ret)=>{
			          if (ret) {
			            if (zmxiaoxie(JSON.stringify(ret)).indexOf(zmxiaoxie(address)) != -1) {
			              dq.zcgldata.info.myjuese = '投票者';
			            }else{
			              dq.zcgldata.info.myjuese = '其他';
			            }
			          }else{
			            dq.zcgldata.info.myjuese = '其他';
			          }
			        });
			    }
			    dq.zcgldata.loading = false;
			  }
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
			
			// 获取详情
			async open_dylzc(rows, openc) {
				console.log(rows)
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
			
			//取消投票
			async qxtoupiao(){
			  var dq  = this;
			  this.zcgldata.loading = true;
			  var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
			  var pau = await ArbTwo.methods.arbn(this.zcgldata.ddid,arbs['timc'],address).call();
			  console.log(999)
			  console.log(arbs['time'])
			  console.log(pau)
			  if (arbs['time'] == 0 && pau == this.zcgldata.faid) {
			    ArbTwo.methods.notVote(this.zcgldata.ddid,this.zcgldata.faid).send({
			      from:address
			    },(err,ret)=>{
			      dq.zcgldata.loading = false;
			      if (ret) {
			        console.log('ok');
			      }else{
			        dq.$message.error('请您点击同意！');
			      }
			    });
			  }else{
			    this.$message.error('你无法取消该投票');
			    this.zcgldata.loading = false;
			  }
			},
			
			//投票
			async toupiaoajax(){
			    var dq  = this;
			    this.zcgldata.loading = true;
			    var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
			    var Timd = await ArbTwo.methods.Timd().call();
			    var dqtime =  Math.round(new Date() / 1000);
			    if (Number(Timd) > dqtime - Number(arbs['timd']) && Number(arbs['timd']) != 0) {
			      var arbw = await ArbTwo.methods.arbw(this.zcgldata.ddid,address).call();
			      var arbn = await ArbTwo.methods.arbn(this.zcgldata.ddid,arbs['timc'],address).call();
			      if (arbw == 1 &&  arbn == 0 ) {
			        ArbTwo.methods.vote(this.zcgldata.ddid,this.zcgldata.faid).send({from:address},(err,ret)=>{
			          dq.zcgldata.loading = false;
			          if (ret) {
			            console.log('投票成功');
			          }else{
			            dq.$message.error('请点击同意！');
			          }
			        });
			      }else{
			        this.zcgldata.loading = false;
			        dq.$message.error('投票失败！');
			      }
			    }else{
			      this.zcgldata.loading = false;
			      this.$message.error('您无法投票！');
			    }
			},
			
			//接受投票 accept
			async jieshoutoupiao(){
			  /*
			    weight arbs leg
			  */
			  var dq = this;
			  this.zcgldata['loading'] = true;
			  var sing = this.zcgldata['info']['ddinfo']['mad']+','+this.zcgldata['info']['ddinfo']['uad'];
			  if (zmxiaoxie(sing).indexOf(zmxiaoxie(address)) == -1) {
			    this.zcgldata['loading'] = false;
			    this.$message.error('不是交易者之一！');
			    return;
			  }
			  var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
			  var weight = await ArbTwo.methods.weight(this.zcgldata.ddid,arbs['timc'],this.zcgldata['faid']).call();
			  var leg = await ArbTwo.methods.leg().call();
			  if (Number(weight) >= Number(leg) && Number(arbs['time']) == 0) {
			    ArbTwo.methods.accept(this.zcgldata.ddid,this.zcgldata['faid']).send({from:address},(err,ret)=>{
			      dq.zcgldata['loading'] = false;
			      if (ret) {
			        dq.$message({
			          message: '已提交接受！',
			          type: 'success'
			        });
			      }else{
			        dq.$message.error('操作失败1！');
			      }
			    });
			  }else{
			    this.zcgldata['loading'] = false;
			    this.$message.error('操作失败2！');
			  }
			},
			//执行投票 execute
			async executeajax(){
			  /*
			    weight leg arbs Time slates
			  */
			   var dq = this;
			   dq.zcgldata.loading = true;
			   var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
			   var weight = await ArbTwo.methods.weight(this.zcgldata.ddid,arbs['timc'],this.zcgldata['faid']).call();
			   var leg = await ArbTwo.methods.leg().call();
			   var Time = await ArbTwo.methods.Time().call();
			   var dqtime = Math.round(new Date() / 1000);
			   if (Number(weight) >= Number(leg) && Number(arbs['time']) != 0 && Number(Time) < dqtime - Number(arbs['time'])) {
			     if (Number(arbs['finish']) != 0) {
			       dq.zcgldata.loading = false;
			       this.$message.error('已执行！');
			       return;
			     }
			     ArbTwo.methods.execute(this.zcgldata.ddid,this.zcgldata['faid']).send({from:address},(err,ret)=>{
			       dq.zcgldata.loading = false;
			       if (ret) {
			          dq.$message({
			            message: '已提交执行操作！',
			            type: 'success'
			          });
			       }else{
			          dq.$message.error('请点击同意!');
			       }
			     });
			   }else{
			     dq.zcgldata.loading = false;
			     this.$message.error('执行失败！');
			   }
			},
			//重启投票 restartlArbajax
			async restartlArbajax(){
			  var dq = this;
			  this.zcgldata['loading'] = true;
			  var arbs = await ArbTwo.methods.arbs(this.zcgldata.ddid).call();
			  var Timd = await ArbTwo.methods.Timd().call();
			  var dqtime = 	 Math.round(new Date() / 1000);
			  if (arbs['time'] == 0 && Number(Timd) < (dqtime - Number(arbs['timd'])) && Number(arbs['timd']) != 0) {
			    //除交易双方外，本轮入选仲裁员均可撤销本次仲裁团
			    var uarr = [];
			    var ruxuanarr = await ArbTwo.methods.applySuceed(this.zcgldata.ddid).call();
			    for (let index = 0; index < ruxuanarr[0].length; index++) {
			      uarr.push(ruxuanarr[0][index]);
			    }
			    uarr.push(this.zcgldata['info']['ddinfo']['uad']);
			    uarr.push(this.zcgldata['info']['ddinfo']['mad']);
			    var sing = zmxiaoxie(JSON.stringify(uarr));
			    if (sing.indexOf(zmxiaoxie(address)) != -1) {
			      ArbTwo.methods.restartlArb(this.zcgldata.ddid).send({from:address},(err,ret)=>{
			        dq.zcgldata['loading'] = false;
			        if (ret) {
			          dq.$message({
			            message: '已提交重启操作！',
			            type: 'success'
			          });
			        }else{
			          dq.$message.error('请同意授权');
			        }
			      });
			    }else{
			      this.zcgldata['loading'] = false;
			      this.$message.error('不是交易者之一！');
			    }
			  }else{
			    this.zcgldata['loading'] = false;
			    this.$message.error('重启失败！');
			  }
			}
			
			
		},
		
	}
	function zmxiaoxie(da) {
	  return da.toLowerCase();
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
	.zcglul_li_item{
		display: flex;
		justify-content: flex-start;
		line-height: 20px;
	}
	.zcglul_li_r{
		/* float: right; */
		flex: 1;
	}
	.zcglul_li_l{
		/* float: left; */
		flex: 1;
	}
	.zc_user_li_item,.title{
		font-size: 20px;
		padding: 5px 0;
	}
	.zcglul_li_item_in{
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
		/* margin-right: 20px; */
	}
	.zcglul_li_item_in:first-child{
		margin-top: 30px;
	}
	.bzj_fangan_ul_li{
		
	}
</style>
