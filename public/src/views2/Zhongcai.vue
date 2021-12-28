<template>
  <el-container v-loading="loading">
    <el-dialog title="Registration for the second round of arbitration" :visible.sync="deldata['dialogcode']" width=350px>
      <div>
        <p>
          My account number:<span>{{  deldata.myuser.user }}</span>
        </p>
        <p>
          My nickname:<span>{{  deldata.myuser.name }}</span>
        </p>
        <p>
          order number:<span>{{ deldata.data.did }}</span>
        </p>
        <div>
          <p>Order details</p>
          <ul class="list-number">
            <li>Merchant address:{{deldata.data.mad_b}}</li>
            <li>User address:{{deldata.data.uad_b}}</li>
            <li>Total assets:{{deldata.data.uoa}} {{ deldata.data.pro }}</li>
            <li>Merchant deposit:{{deldata.data.mma}} USDT</li>
            <li>User deposit:{{deldata.data.uma}} USDT</li>
          </ul>
        </div>
        <p>Number of applicants:<span>{{deldata.Arbs.aid}} / {{deldata.renshunum}}</span></p>
        <p>Registration Countdown:<span>
            <van-count-down :time="deldata.data.djs_val" format="DD day HH h mm min SS s" /></span></p>
        <div>
          <p>Selected account</p>
          <ul class="list-number">
            <li v-for="(li,index) in deldata['Uarr']" :key="index">{{li}}</li>
          </ul>
        </div>
        <p v-if="deldata.ubmcode">You have signed up and been selected</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="kaishibaomingajax" :disabled="deldata.ubmcode" :loading="deldata.loading">sign up</el-button>
      </span>
    </el-dialog>
    <el-tabs type="border-card" class="table" v-model="tabindex">

      <el-tab-pane label="List of Arbitrators" name="3">
        <span slot="label"><i class="el-icon-suitcase"></i> List of Arbitrators</span>
        <template>
          <el-row class="con-title">
            <div class="con-title_auto"></div>
            <div class="res add" @click="sq_zcy_dialog">
              <i class="el-icon-circle-plus-outline"></i><span>Application to become an arbitrator</span>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['zc_list']" style="width: 100%">
              <el-table-column fixed prop="index" label="Serial number"></el-table-column>
              <el-table-column prop="store" label="Arbitrators">
                <template slot-scope="scope">
                  <div class="zcy_list_user">{{ scope.row.username }}</div>
                  <div class="zcy_list_username">{{ scope.row.user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="invite" label="Number of invitations"></el-table-column>
              <el-table-column prop="succeed" label="Number of arbitration orders"></el-table-column>
              <el-table-column prop="appl" label="Number of applications in the second round"></el-table-column>
              <el-table-column prop="balanceMar" label="margin balance">
                <template slot-scope="scope">
                  {{scope.row.balanceMar  }} GAZ
                </template>
              </el-table-column>
              <el-table-column prop="lock" label="Frozen state">
                <template slot-scope="scope">
                  {{scope.row.lock == 0 ? 'normal':'frozen'  }}
                </template>
              </el-table-column>
              <el-table-column label="operation">
                <template slot-scope="scope">
                  <el-button size="mini" :loading="scope.row.jiazai" :disabled="scope.row.lock == 1 ? true:false" @click="yaoqingajax(scope.row)">{{scope.row.lock == 0 ? 'invitation':'Frozen'  }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-files"></i> First round arbitration order</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="options_value" placeholder="Please select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="refresh data"></i>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['dyl_list']" style="width: 100%">
              <el-table-column fixed prop="did" label="Order ID"></el-table-column>
              <el-table-column prop="m_user_b" label="Merchant">
                <template slot-scope="scope">
                  <div :class="scope.row.m_user == scope.row.can_user ? 'userac':''">{{ scope.row.m_user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="u_user_b" label="User">
                <template slot-scope="scope">
                  <div :class="scope.row.u_user == scope.row.can_user ? 'userac':''">{{ scope.row.u_user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="uoa" label="Number of assets">
                <template slot-scope="scope">
                  <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mma" label="Merchant deposit">
                <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="uma" label="User deposit">
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="what" label="Type of appeal">
                <template slot-scope="scope">
                  <div v-if="scope.row.what == 1">assets</div>
                  <div v-if="scope.row.what == 2">bond</div>
                  <div v-if="scope.row.what == 3">other</div>
                </template>
              </el-table-column>

              <el-table-column prop="arb" label="Arbitration result" :filters="oneLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <div v-if="scope.row.arb == 1">User wins</div>
                  <div v-if="scope.row.arb == 2">Shang Jiasheng</div>
                  <div v-if="scope.row.arb == 3">Enter the second round of arbitration</div>
                  <div v-if="scope.row.arb == 0">Not started</div>
                </template>
              </el-table-column>
              <el-table-column prop="arb" label="Arbitration status" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <div v-if="scope.row.code == 0">
                    Not started
                  </div>
                  <div v-if="scope.row.code == 1">
                    In arbitration
                  </div>
                  <div v-if="scope.row.code == 2">
                    Conclusion of arbitration
                  </div>
                  <div v-if="scope.row.code == 3">
                    executed
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="countDown" label="Status countdown">
                <template slot-scope="scope">
                  <van-count-down :time="scope.row.djs_val" format="DD day HH h mm min SS s" />
                </template>
              </el-table-column>
              <el-table-column label="operation">
                <template slot-scope="scope">
                  <el-button type="text" @click="open_dylzc(scope.row)">details</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Second round arbitration order" name="2">
        <span slot="label"><i class="el-icon-files"></i> Second round arbitration order</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="options_value_b" placeholder="Please select">
              <el-option v-for="item in options_b" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="refresh data"></i>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['del_list']" style="width: 100%">
              <el-table-column fixed prop="did" label="Order ID"></el-table-column>
              <el-table-column prop="mad_b" label="Merchant"></el-table-column>
              <el-table-column prop="uad_b" label="User"></el-table-column>
              <el-table-column prop="uoa" label="Number of assets">
                <template slot-scope="scope">
                  {{ scope.row.uoa }} {{ scope.row.pro }}
                </template>
              </el-table-column>
              <el-table-column prop="mma" label="Merchant deposit">
                <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="uma" label="User deposit">
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="mad_b" label="Registration status" v-if="options_value_b == 1">
                <template slot-scope="scope">
                  {{ scope.row.arbw == 0 ? 'Not selected' : 'Successfully selected' }}
                </template>
              </el-table-column>
              <el-table-column label="state" :filters="towLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <div v-if="scope.row.timc == 0">Not registered</div>
                  <div v-if="scope.row.timc != 0 && scope.row.timd == 0">Registration in progress</div>

                  <div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">In arbitration</div>
                  <div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">Waiting for execution</div>

                  <div v-if="scope.row.finish != 0">executed</div>

                </template>
              </el-table-column>
              <el-table-column label="Effective countdown">
                <template slot-scope="scope">
                  <div v-if="scope.row.timc != 0 && scope.row.timd == 0">
                    <van-count-down :time="scope.row.djs_val" format="DD day HH h mm min SS s" />
                  </div>
                  <div v-if="scope.row.timd != 0 && scope.row.time == 0">
                    <van-count-down :time="scope.row.djs_val" format="DD day HH h mm min SS s" />
                  </div>
                  <div v-if="scope.row.time != 0 && scope.row.finish == 0">
                    <van-count-down :time="scope.row.djs_val" format="DD day HH h mm min SS s" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="operation">
                <template slot-scope="scope">
                  <div v-if="options_value_b == 0">
                    <el-button size="mini" :disabled="(scope.row.timc == 0 ? false:(scope.row.timc != 0 && scope.row.timd == 0) ? false:true)" @click="derlunbaomingajax(scope.row)">sign up</el-button>
                  </div>
                  <div v-if="options_value_b == 1">
                    <el-button size="mini" @click="openqb('openzcgl')">details</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>

      <el-tab-pane label="My order" name="4">
        <span slot="label"><i class="el-icon-suitcase"></i> I was involved</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="my_ss_tindex" placeholder="Please select">
              <el-option v-for="item in [{value:1,label:'My order'},{value:2,label:'I successfully arbitrated the order'}]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="refresh data"></i>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['my_ss_tlist']" style="width: 100%">
              <el-table-column fixed prop="did" label="Order ID"></el-table-column>
              <el-table-column prop="uad_b" label="Merchant">
                <template slot-scope="scope">
                  <div>{{ scope.row.uad_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mad_b" label="User">
                <template slot-scope="scope">
                  <div>{{ scope.row.mad_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="uoa" label="Number of assets">
                <template slot-scope="scope">
                  <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mma" label="Merchant deposit">
                <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="uma" label="User deposit">
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="what" label="Type of appeal">
                <template slot-scope="scope">
                  <div v-if="scope.row.what == 1">assets</div>
                  <div v-if="scope.row.what == 2">bond</div>
                  <div v-if="scope.row.what == 3">Second round of arbitration</div>
                </template>
              </el-table-column>
              <el-table-column prop="arb" label="Results of the first round of arbitration" :filters="oneLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <div v-if="scope.row.arb == 1">User wins</div>
                  <div v-if="scope.row.arb == 2">Shang Jiasheng</div>
                  <div v-if="scope.row.arb == 3">Enter the second round of arbitration</div>
                </template>
              </el-table-column>
              <el-table-column prop="arb" label="First round arbitration status" filter-placement="bottom-end" v-if="my_ss_tindex == 1">
                <template slot-scope="scope">
                  <div v-if="scope.row.code == 1">
                    In arbitration
                  </div>
                  <div v-if="scope.row.code == 2">
                    Conclusion of arbitration
                  </div>
                  <div v-if="scope.row.code == 3">
                    executed
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="arb" label="Status of the second round of arbitration" :filters="oneLeveThree" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <div v-if="scope.row.finish == 0">unexecuted</div>
                  <div v-if="scope.row.finish != 0">executed</div>
                </template>
              </el-table-column>

              <el-table-column prop="countDown" label="Status countdown" v-if="my_ss_tindex == 1">
                <template slot-scope="scope">
                  <van-count-down :time="scope.row.djs_val" format="DD day HH h mm min SS s" />
                </template>
              </el-table-column>
              <el-table-column label="operation">
                <template slot-scope="scope">
                  <el-button type="text" @click="open_dylzc(scope.row,2)">details</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>

    </el-tabs>
    <!-- 保证金管理 -->
    <el-dialog title="Second round of arbitration management" :visible.sync="manage" width="40%">
      <p>
        My account number:<span>{{ oxUser }}</span>
      </p>
      <p>
        My nickname:<span>{{ oxUser }}</span>
      </p>
      <p>
        order number:<span>{{ row.orderID }}</span>
      </p>
      <p>
        Order details:<span>{{ row.orderID }}</span>
      </p>
      <div class="case">Arbitration scheme 1</div>
      <div>
        <span>number</span>
        <el-input suffix-icon="el-icon-arrow-down" v-model="inputDevice"></el-input>
        <i class="el-icon-circle-plus-outline" @click="dailogSeting"></i><span>newly build</span>
      </div>
      <p>Asset ownership: Merchant</p>
      <p>Deposit: users reduced by 200ustd</p>
      <p>Commercial Arbitrator: 1000GAZ</pGAZ>
      <p>User Arbitrator: 100GAZ</p>
      <p>Second round arbitration fee: 90GAZ</p>
      <div class="time-out">Voting Countdown: 04:30:20</div>
      <div class="buttons">
        <el-button type="primary" @click="dailogCloser">cancel</el-button>
        <el-button type="primary" @click="dailogVote">vote</el-button>
        <el-button type="primary" @click="dailogAccept">receive</el-button>
        <el-button type="primary" @click="dailogUndo">Cancellation of application</el-button>
        <el-button type="primary" @click="dailogExecute">implement</el-button>
        <el-button type="primary" @click="dailogRestart">restart</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Margin distribution management" :visible.sync="margin" width="40%">
      <p>
        My account number:<span>{{ oxUser }}</span>
      </p>
      <p>
        My nickname:<span>{{ oxUser }}</span>
      </p>
      <p>
        order number:<span>{{ row.orderID }}</span>
      </p>
      <p>
        Order details:<span>{{ row.orderID }}</span>
      </p>
      <div>My deposit</div>
      <el-select v-model="countRepDefualt" placeholder="Please select">
        <el-option v-for="item in countRep" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <div>My settings</div>
      <el-button type="primary" @click="marginSeting">Submission 1</el-button>
    </el-dialog>
    <el-dialog title="sign up/sign out" :visible.sync="sq_zc_data['show']" width=300px>
      <div class="sq_zc_css">
        <p>My account number:{{ sq_zc_data['info']['user'] }}</p>
        <p>My nickname:{{ sq_zc_data['info']['username'] }}</p>
        <p>Number of orders I claim:{{ sq_zc_data['info']['sq_ddnum'] }}</p>
        <p>Number of orders I have been invited to:{{ sq_zc_data['info']['yq_ddnum'] }}</p>
        <p>Number of orders I participated in the second round of arbitration: {{ sq_zc_data['info']['del_ddnum'] }}</p>
        <p>Number of orders I successfully arbitrated: {{ sq_zc_data['info']['cg_zcddnum'] }}</p>
        <p>Arbitrator No.:{{ sq_zc_data['info']['cg_zcid'] }}</p>
        <p>Margin balance:{{ sq_zc_data['info']['user_bzj'].toFixed(2) }} GAZ</p>
        <el-select v-model="sq_zc_data.signDefualt" placeholder="Please select">
          <el-option v-for="item in sq_zc_data.sign" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="sq_zc_data['je']" v-if="sq_zc_data.signDefualt == 0"></el-input>
        <el-input v-model="sq_zc_data['je']" :disabled="sq_zc_data['info']['user_bzj'] > 0 ? false:true" v-if="sq_zc_data.signDefualt == 1"></el-input>
        <el-button type="primary" @click="sq_zcy_ajax">Submit</el-button>
      </div>
    </el-dialog>
    <el-dialog title="I participated in the first round of arbitration" :visible.sync="dyl_zc['code']" width=350px>
      <p>
        My account number:<span>{{ dyl_zc['my_user'] }}</span>
      </p>
      <p>
        My nickname:<span>{{ dyl_zc['my_name'] }}</span>
      </p>
      <p>
        order number:<span>{{ dyl_zc['did'] }}</span>
      </p>
      <div>
        Order details:
        <div class="dyl_zc_ul">
          <div class="dyl_zc_ul_item">
            assets:{{ dyl_zc['ddifno']['uoa'] }}
          </div>
          <div class="dyl_zc_ul_item">
            Merchant address:{{ dyl_zc['ddifno']['mad'] }}
          </div>
          <div class="dyl_zc_ul_item">
            User address:{{ dyl_zc['ddifno']['uad'] }}
          </div>
          <div class="dyl_zc_ul_item">
            Merchant deposit：{{ dyl_zc['ddifno']['mma'] }} USDT
          </div>
          <div class="dyl_zc_ul_item">
            User deposit:{{ dyl_zc['ddifno']['uma'] }} USDT
          </div>
        </div>
      </div>
      <p>Invitees:{{ dyl_zc['byqf'] }}</p>
      <p>Arbitration result:{{ dyl_zc['zcinfo']['arb'] == 0 ?'Arbitration has not started': dyl_zc['zcinfo']['arb'] == 1 ? 'User wins': dyl_zc['zcinfo']['arb'] == 2 ? 'Merchant wins':'Enter the second round of arbitration'}}</p>
      <p>Merchant Arbitrator:{{ dyl_zc['zcinfo']['madd'] }}</p>
      <p>User Arbitrator:{{ dyl_zc['zcinfo']['uadd'] }}</p>

      <div>Arbitration Countdown:
        <div v-if="dyl_zc.zcinfo.djs_val == 0">Not started</div>
        <div v-if="dyl_zc.zcinfo.djs_val == 1.1">Has ended</div>
        <div v-if="dyl_zc.zcinfo.djs_val != 0 && dyl_zc.zcinfo.djs_val != 1.1">
          <van-count-down :time="dyl_zc.zcinfo.djs_val" format="DD day HH h mm min SS s" />
        </div>
      </div>
      <el-button type="primary" @click="agree" :disabled="dyl_zc.zcinfo.an_code">favor</el-button>
      <el-button type="primary" :disabled="dyl_zc.zhixingcode" @click="zhixingajax">implement</el-button>
    </el-dialog>

    <el-dialog title="Inviting arbitrators" :visible.sync="zc_user_yq['show']" width=350px>
      <div class="zc_user_yq">
        <div class="zc_user_yq_ul">
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              My account number:
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['my_user'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              My nickname:
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['my_name'] }}
            </div>
          </div>

          <div class="zc_user_yq_ul_item sousou">
            <div class="zc_user_yq_ul_item_l">
              order number:
            </div>
            <div class="zc_user_yq_ul_item_r sousou_r">
              <el-input v-model="zc_user_yq['did']" placeholder="Please enter order ID"></el-input>
              <el-button icon="el-icon-search" circle @click="sousou_dd" :loading="loadingsoudd"></el-button>
            </div>
          </div>
          <div class="zc_user_yq_ul_item ddinfo" v-if="zc_user_yq.dinfo['sj_user']">
            <div class="zc_user_yq_ul_item_l">
              Order details:
            </div>
            <div class="zc_user_yq_ul_item_r">
              <div class="ddinfo_i" style="padding-top: 5px;">Merchant address:{{ zc_user_yq['dinfo']['sj_user']  }}</div>
              <div class="ddinfo_i">User address:{{ zc_user_yq['dinfo']['u_user']  }} </div>
              <div class="ddinfo_i">Merchant deposit:{{ zc_user_yq['dinfo']['sj_bzj']  }} USDT</div>
              <div class="ddinfo_i">User deposit:{{ zc_user_yq['dinfo']['u_bzj']  }} USDT</div>
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              My role:
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['juese'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              Arbitration fee paid by me:
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['zc_je'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              Subject matter of Arbitration:
            </div>
            <div class="zc_user_yq_ul_item_r">
              <el-radio v-model="zc_user_yq.zc_key" label="1" :disabled="zc_user_yq.zc_key!=0">assets</el-radio>
              <el-radio v-model="zc_user_yq.zc_key" label="2" :disabled="zc_user_yq.zc_key!=0">bond</el-radio>
            </div>
          </div>
          <div class="zc_user_yq_ul_item yaoqinga">
            <div class="zc_user_yq_ul_item_l">
              invitation:
            </div>
            <div class="zc_user_yq_ul_item_r">
              <el-input v-model="zc_user_yq['form_user']" placeholder="Please enter user address"></el-input>
            </div>
          </div>
          <div class="zc_user_yq_ul_item yaoqing_ul">
            <div class="zc_user_yq_ul_item_title">Invited arbitrators:</div>
            <div class="zc_user_yq_ul_item_yaoqing_ul">
              <div class="zc_user_yq_ul_item_yaoqing_ul_l" v-for="(li,index) in zc_user_yq.u_array" :key="index">
                <div class="zc_user_yq_ul_item_yaoqing_ul_l_a">{{ index+1 }}.{{ li.username }}</div>
                <div class="zc_user_yq_ul_item_yaoqing_ul_l_b">{{ li.user }}</div>
              </div>
            </div>
          </div>
          <div class="zc_user_yq_ul_item anniu">
            <van-button type="info" :disabled="zc_user_yq.jyong" @click="yq_zc_ajax">invitation</van-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>

    <el-dialog title="My complaint" :visible.sync="state" width="40%">
      <p>
        My nickname:<span>{{ oxUser }}</span>
      </p>
      <p>
        My account number:<span>{{ oxUser }}</span>
      </p>
      <p>
        order number:<span>{{ openOne.orderID }}</span>
      </p>
      <p>My role: user</p>
      <p>Arbitration fee paid by me:</p>
      <p>
        Order details:<span>{{ openOne.orderID }}</span>
      </p>
      <div>Arbitration result</div>
      <div class="state-flex">
        <div class="state-defualt green">Shang Jiasheng</div>
        <div class="state-right state-defualt">Civilian victory</div>
      </div>
      <div class="state-flex">
        <div class="state-defualt">User wins</div>
        <div class="state-time">
          <p>Execute countdown</p>
          <p>04：30：20</p>
        </div>
      </div>
      <el-button type="primary" @click="perform">implement</el-button>
      <el-button type="primary" @click="arbitrament">Second round of arbitration</el-button>
    </el-dialog>
  </el-container>

</template>

<script>

//新版配置 模块化
import config from "../../config";

import deldata from "./zhongcai.json";

//数据MODEL
import ZclistModel from "../../conn/zc/ZclistModel.json";
import ZcDylList from "../../conn/zc/ZcDylList.json";
import ZcDelList from "../../conn/zc/ZcDelList.json";
import MySqZcList from "../../conn/zc/MySqZcList.json";

import ZcModel from "../../conn/zc/ZcinfoModel.json";

var bzjnum = config['hyue'][config['key']]['Bzj']['num'];
//模块
let Base64 = require('js-base64').Base64;
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Dialog, Toast } from 'vant';
var address, web3, ArbOne, ArbTwo, GazConn, Dotc, Arbdate;

function Lettertolowercase(值) {
  var 需要返回的值 = 值.toLowerCase();
  return 需要返回的值;
}


export default {
  created() {
    var dq = this;
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
        dq.get_list_list_arbone();
        dq.user = address.toLowerCase();
        dq.tabindex = "3";
      }
    }
  },
  mounted() {

  },
  data() {
    return {

      user: address,
      tabindex: "1",
      listarr: {
        zc_list: [],
        dyl_list: [],
        del_list: [],
        my_ss_tlist: []
      },
      options: [
        { value: "0", label: "List of first round arbitration orders" },
        { value: "1", label: "Invite my order" },
      ],
      options_b: [
        { value: "0", label: "Second round arbitration order list" },
        { value: "1", label: "I participated in the second round of arbitration" },
      ],
      options_value: "0",
      options_value_b: "0",
      my_ss_tindex: 1,

      //I participated in the first round of arbitration
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

      deldata: deldata,

      //Inviting arbitrators
      loadingsoudd: false,
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
        did: 0,
        juese: '',
        zc_je: 0,
        zc_key: "1",
        form_user: '',
        u_array: [],
        index: 0,
        jiazai: false
      },
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
          user_bzj: 0
        },
        je: null
      },


      device: [
        { value: "0", label: "User" },
        { value: "2", label: "Merchant" },
      ],
      deviceDefualt: "User",
      countRep: [
        { value: "0", label: "reduce" },
        { value: "1", label: "increase" },
      ],

      inputDevice: 0,
      countRepDefualt: "reduce",
      openOne: "",
      loading: false,
      leveTowValue: "whole",
      leveThValue: "Winner",
      dailogSetingValue: false,
      manage: false,
      margin: false,
      put: false,
      onece: false,
      invitation: false,
      state: false,
      oneLeveTwo: [
        { value: "0", label: "whole" },
        { value: "1", label: "My order" },
        { value: "2", label: "Invite my order" },
      ],
      oneLeveThree: [
        { value: "1", text: "Merchant" },
        { value: "2", text: "User" },
        { value: "3", text: "it ends in a draw" },
      ],
      oxUser: "0xf56...",
      towLeveThree: [
        { value: "1", text: "Registration in progress" },
        { value: "2", text: "In voting" },
        { value: "3", text: "Execution waiting" },
        { value: "4", text: "executed" },
      ],
      openLabel: false,
      message: "",
      selectId: "",
      tabData: [
        {
          orderID: "112",
          store: "0xf123...789",
          user: "0xfeag...edc",
          assets: "4eth",
          storeAssure: "100 ustd",
          userAssure: "10 ustd",
          victory: "Merchant",
          countDown: "12:00:00",
        },
        {
          orderID: "113",
          store: "0xf123...789",
          user: "0xfeag...edc",
          assets: "4eth",
          storeAssure: "100 ustd",
          userAssure: "10 ustd",
          victory: "Merchant",
          countDown: "12:00:00",
        },
      ],
      dialogVisible: false,
      row: "",
    };
  },
  watch: {
    'zc_user_yq.did'() {
      this.zc_user_yq.dinfo = {
        sj_user: '',
        u_user: '',
        sj_bzj: 0,
        what: 0,
        u_bjz: 0
      };
      this.zc_user_yq['u_array'] = [];
    },
    'dyl_zc.zcinfo.djs_val'(e) {
      console.log(e);
    },
    tabindex(e) {
      if (e == 3) {
        if (this.listarr['zc_list'].length > 0) {
          return;
        }
        this.get_list_arbitrators();
      }
      if (e == 2) {
        if (this.listarr['del_list'].length > 0) {
          return;
        }
        this.get_list_arbtwo();
      }
      if (e == 1) {
        if (this.listarr['dyl_list'].length > 0) {
          return;
        }
        this.get_list_list_arbone();
      }
      if (e == 4) {
        this.listarr['my_ss_tlist'] = [];
        this.getmyzc_list();
      }
    },
    options_value(e) {
      if (e == 0) {
        this.listarr['dyl_list'] = [];
        this.get_list_list_arbone();
      } else {
        this.listarr['dyl_list'] = [];
        this.get_list_list_inviDeal();
      }
    },
    options_value_b(e) {
      if (e == 0) {
        this.listarr['del_list'] = [];
        this.get_list_arbtwo();
      } else {
        this.listarr['del_list'] = [];
        this.get_list_applDeal();
      }
    },
    my_ss_tindex() {
      this.getmyzc_list();
    }
  },
  onLoad() {
    //弹出错误提示
  },
  methods: {
    openqb(e) {
      this.wapcd = false;
      this.$router.push(e);
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
    //refresh data
    refresh: function () {
      console.log(this.selectId);
    },

    open: function (row) {
      this.row = row;
      this.dialogVisible = true;
    },
    filterTag: function () { },
    dailogSeting: function () {
      //第二轮仲裁设置
      this.dialogVisible = false;
      this.dailogSetingValue = true;
    },
    dailogManager: function () {
      //Second round of arbitration management
      this.dailogSetingValue = false;
      this.manage = true;
    },
    dailogCloser: function () {
      //仲裁管理取消
    },
    dailogVote: function () {
      //仲裁管理投票
    },
    dailogAccept: function () {
      //仲裁管理接受
    },
    dailogExecute: function () {
      //仲裁管理执行
    },
    dailogUndo: function () {
      //Cancellation of application
      this.manage = false;
      this.put = true;
    },

    dailogRestart: function () {
      //仲裁管理重启
      this.dailogSetingValue = false;
      this.manage = true;
    },
    marginSeting: function () {
      //Margin distribution management
      this.margin = false;
    },

    perform: function () {
      //我的申诉单
      this.state = true;
      this.state = false;
    },
    arbitrament: function () {
      //切换到第二轮仲裁
      this.state = false;
    },

    //获取仲裁员列表
    get_list_arbitrators() {
      var dq = this;
      var list = [];
      ArbOne.methods.list_arbitrators().call((err, ret) => {
        if (ret) {
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
            dq.listarr['zc_list'] = list;
          }
        }
      });
    },
    //获取第一轮仲裁列表
    async get_list_list_arbone() {
      var num = 25;
      var dq = this;
      //读取时间
      var tima = await ArbOne.methods.Tima().call((err, ret) => {
        return Number(ret);
      });
      var dqtime = Math.round(new Date() / 1000);
      ArbOne.methods.list_arbone(num).call((err, ret) => {
        if (ret) {
          if (ret[0].length > 0) {
            var list = [];
            var infoarr = ret[0];
            var typearr = ret[1];
            var userarr = ret[2];
            for (let index = 0; index < infoarr.length; index++) {
              var zc_num = null;
              var zc_id = '';
              var huobiarr = config['hbi'][config['key']];
              for (const key in huobiarr) {
                if (typearr[index][0] == huobiarr[key]['key']) {
                  zc_id = huobiarr[key]['id'];
                  zc_num = huobiarr[key]['num'];
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
            dq.listarr['dyl_list'] = list;
          }
        }
      });
    },
    //获取我被邀请到的
    async get_list_list_inviDeal() {
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
            dq.listarr['dyl_list'] = list;
          }
        }
      });
      var index = 0;
      function hope_userajax() {
        if (index >= dq.listarr['dyl_list'].length) {
          return;
        }
        var did = dq.listarr['dyl_list'][index]['did'];
        var what = dq.listarr['dyl_list'][index]['what'];
        ArbOne.methods.can(did + "", what + "", address + "").call((err, ret) => {
          dq.listarr['dyl_list'][index]['can_user'] = ret;
          index += 1;
          hope_userajax();
        });
      }
      hope_userajax();
    },
    //第二轮仲裁结果
    async get_list_arbtwo() {
      var num = 25;
      var dq = this;
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
      var dqtime = Math.round(new Date() / 1000);
      ArbOne.methods.list_arbtwo(num).call((err, ret) => {
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
              for (const key in ZcDelList) {
                obj[key] = ZcDelList[key];
              }
              obj['did'] = Number(infoarr[index][0]);
              obj['uoa'] = (Number(infoarr[index][1]) / (10 ** zc_num)).toFixed(2);
              obj['uma'] = (Number(infoarr[index][2]) / (10 ** bzjnum)).toFixed(2);
              obj['mma'] = (Number(infoarr[index][3]) / (10 ** bzjnum)).toFixed(2);
              obj['timc'] = Number(infoarr[index][4]);
              obj['timd'] = Number(infoarr[index][5]);
              obj['time'] = Number(infoarr[index][6]);
              obj['finish'] = Number(infoarr[index][7]);

              obj['pro'] = zc_id;
              obj['mark'] = typearr[index][1];

              obj['uad'] = userarr[index][0];
              obj['mad'] = userarr[index][1];

              var uad_b = userarr[index][0].substring(0, 5) + "····" + userarr[index][0].substring(userarr[index][0].length - 5, userarr[index][0].length);
              var mad_b = userarr[index][1].substring(0, 5) + "····" + userarr[index][1].substring(userarr[index][1].length - 5, userarr[index][1].length);
              obj['uad_b'] = uad_b;
              obj['mad_b'] = mad_b;


              obj['Timed'] = Number(Timd);
              obj['Timec'] = Number(Timc);
              obj['Timee'] = Number(Time);

              //倒计时获取
              if (obj['timc'] != 0 && obj['timd'] == 0) {
                obj['djs_val'] = ((obj['timc'] + obj['Timec']) - dqtime) * 1000;
              }
              if (obj['timd'] != 0 && obj['time'] == 0) {
                obj['djs_val'] = ((obj['timd'] + obj['Timed']) - dqtime) * 1000;
              }
              if (obj['time'] != 0 && obj['finish'] == 0) {
                obj['djs_val'] = ((obj['time'] + obj['Timee']) - dqtime) * 1000;
              }

              list.push(obj);
            }
            dq.listarr['del_list'] = list;
          }
        }
      });
    },
    //第二轮我参与的
    async get_list_applDeal() {
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
            dq.listarr['del_list'] = list;
          }
        }
      });

      //循环获取时间以及谁选我
      for (let index = 0; index < dq.listarr['del_list'].length; index++) {
        var timc = await ArbTwo.methods.arbs(dq.listarr['del_list'][index]['did'] + "").call();
        dq.listarr['del_list'][index]['timc'] = Number(timc['timc']);
        if (dq.listarr['del_list'][index]['timc'] != 0 && dq.listarr['del_list'][index]['timd'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['timc'] + dq.listarr['del_list'][index]['Timec']) - dqtime) * 1000;
        }
        if (dq.listarr['del_list'][index]['timd'] != 0 && dq.listarr['del_list'][index]['time'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['timd'] + dq.listarr['del_list'][index]['Timed']) - dqtime) * 1000;
        }
        if (dq.listarr['del_list'][index]['time'] != 0 && dq.listarr['del_list'][index]['finish'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['time'] + dq.listarr['del_list'][index]['Timee']) - dqtime) * 1000;
        }
      }

    },
    //我参与的仲裁列表
    async getmyzc_list() {
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
        this.listarr['my_ss_tlist'] = listarr;
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
        this.listarr['my_ss_tlist'] = listarra;
      }

    },

    //打开我参与的第一轮仲裁
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
    //邀请仲裁者
    async yaoqingajax(row) {
      var index = row['index'] - 1;
      var rows = this.listarr['zc_list'][index];
      this.zc_user_yq['show'] = true;
      this.zc_user_yq['my_user'] = address;
      var uname = await ArbOne.methods.message(address + "", "0").call();
      this.zc_user_yq['my_name'] = uname ? Base64.decode(uname) : 'Not filled in yet';
      this.zc_user_yq['form_user'] = rows['user'];
      this.zc_user_yq['index'] = index;
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
            title: 'Tip 3',
            message: 'The order is not initialized, please click OK!',
            confirmButtonText: 'determine',
            cancelButtonText: 'cancel',
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
		console.log(dq.zc_user_yq['zc_key']);

        if (ddinfo_obj['sj_user'] == address) {
          dq.zc_user_yq['juese'] = 'business';
          dq.zc_user_yq['jyong'] = false;
        } else if (ddinfo_obj['u_user'] == address) {
          dq.zc_user_yq['juese'] = 'user';
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
        for (let index = 0; index < zc_user_list[0].length; index++) {
          dq.zc_user_yq.u_array.push({
            user: zc_user_list[0][index],
            username: zc_user_list[1][index] ? Base64.decode(zc_user_list[1][index]) : 'Not filled in yet'
          });
        }
        for (let index = 0; index < dq.zc_user_yq.u_array.length; index++) {
          if (dq.zc_user_yq.u_array[index]['user'] == dq.zc_user_yq['form_user']) {
            dq.zc_user_yq['jyong'] = true;
            break;
          }
        }
      }
    },
    //邀请仲裁
    async yq_zc_ajax() {
      if (!this.zc_user_yq['form_user']) {
        return;
      }
      var dq = this;
      //查询授权状态与GAZ余额
      var gaz_sq = await GazConn.methods.allowance(address + "", config['hyue'][config['key']]['ArbOne']['heyue']).call();
      var gaz_sqa = Number(gaz_sq) / (10 ** bzjnum);
      if (gaz_sqa < 1000) {
        //需要先授权
        dq.loadingsoudd = true;
        Dialog.confirm({
          message: 'GAZ is not authorized. Is it authorized?',
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
    },
    //Application to become an arbitrator
    async sq_zcy_dialog() {
      this.sq_zc_data['info'] = {
        user: '',
        username: '',
        sq_ddnum: 0,
        yq_ddnum: 0,
        del_ddnum: 0,
        cg_zcddnum: 0,
        cg_zcid: 0,
        user_bzj: 0
      };
      this.sq_zc_data['show'] = true;
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
        console.log(tk_je)
        //执行提款AJAX exitArb
        ArbOne.methods.exitArb(address + "", tk_je + "").send({
          from: address
        }, (err, ret) => {
          if (ret) {
            Toast.clear();
            Toast.success('Withdrawal succeeded. Please check later');
          } else {
            Toast.clear();
            Toast.fail('Please agree to authorize!');
          }
        });
      } else {
        if (this.sq_zc_data['info']['cg_zcid'] != 0) {
          alert('Registered');
          return;
        }
        if (this.sq_zc_data['je'] <= 0) {
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
        if (gaz_sqa < this.sq_zc_data['je']) {
          //需要先授权
          Dialog.confirm({
            message: 'GAZ is not authorized. Is it authorized?',
            confirmButtonText: 'determine',
            cancelButtonText: 'cancel',
            cancelButtonColor: '',
            getContainer: 'body'
          }).then(() => {
            Toast.loading({
              message: 'GAZ is authorizing...',
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
            Toast.success('Registration succeeded, please check later');
          } else {
            Toast.clear();
            Toast.fail('Please agree to authorize!');
          }
        });
      }
    },
    //implement
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
    //赞成提交
    agree() {
      ArbOne.methods.arbAsse(this.dyl_zc.did + "", this.dyl_zc.what + "").send({
        from: address
      }, (err, ret) => {
        console.log(ret);
      });
    },


    //第二轮报名
    async derlunbaomingajax(row) {
      var Orderdetails = row;
      this.deldata['dialogcode'] = true;
      this.deldata['data'] = Orderdetails;
      var 仲裁详情 = await ArbTwo.methods.arbs(Orderdetails['did']).call();
      var user = await ArbTwo.methods.user(Orderdetails['did']).call();
      if (user.mma == 0) {
        Toast.loading({
          message: 'Order not initialized, please confirm first',
          forbidClick: true,
          loadingType: 'spinner',
        });
        inittwo();
      }
      var 报名人数列表 = await ArbTwo.methods.applySuceed(Orderdetails['did']).call();
      if (仲裁详情) {
        //查询最多人数
        var 总人数 = await ArbTwo.methods.neg().call();
        this.deldata['renshunum'] = 总人数;
        //查询我的昵称
        this.deldata['myuser']['user'] = address;
        var 我的名字 = await ArbOne.methods.message(address, "0").call();
        this.deldata['myuser']['name'] = 我的名字 ? Base64.decode(我的名字) : '暂未设置';
        this.deldata['Arbs'] = 仲裁详情;
        var 人员列表 = [];
        for (let index = 0; index < 报名人数列表[0].length; index++) {
          if (报名人数列表[0][index] != '0x0000000000000000000000000000000000000000') {
            人员列表.push(报名人数列表[0][index]);
          }
        }
        var 查询我是否报名 = Lettertolowercase(JSON.stringify(人员列表));
        if (查询我是否报名.indexOf(address) != -1) {
          this.deldata['ubmcode'] = true;
        }
        this.deldata['Uarr'] = 人员列表;
      } else {
        this.deldata['dialogcode'] = false;
      }

      async function inittwo() {
        ArbTwo.methods.init(Orderdetails['did']).send({
          from: address
        }, (err, ret) => {
          if (ret) {
            Toast.clear();
            Toast.success('The order has been initialized, please check later');
          } else {
            Toast.clear();
            Toast.fail('Please agree to authorize!');
          }
        });
      }
    },
    //第二轮报名提交
    async kaishibaomingajax() {
      var dq = this;
      dq.deldata.loading = true;
      var arber = await ArbOne.methods.arber(address).call();
      var peg = await ArbOne.methods.peg().call();
      var lock = await ArbOne.methods.lock(address).call();
      var balanceMar = await ArbOne.methods.balanceMar(address).call();
      var user = await ArbOne.methods.user(dq.deldata['data']['did']).call();
      console.log(user)
      if (this.deldata['Arbs']['arb'] == 3 && this.deldata['Arbs']['timd'] == 0) {
        if (Number(arber) <= Number(peg) && lock == 0 && Number(balanceMar) >= Number(user.mma)) {
          //获取加密字符串
          var arbTwoApply = await Arbdate.methods.arbTwoApply(address, this.deldata['Arbs']['timc']).call();
          //查询是否存在
          var slot = await ArbTwo.methods.slot(arbTwoApply).call();
          if (slot != 0) {
            dq.$message.error('You have successfully registered!');
            return;
          }

          ArbTwo.methods.arbTwoApply(this.deldata['data']['did']).send({ from: address }, (err, ret) => {
            if (ret) {
              bmlxsql();
            } else {
              dq.deldata.loading = false;
              dq.$message.error('Please click OK!');
            }
          });
        } else {
          dq.deldata.loading = false;
          this.$message.error('Registration failed');
        }

      } else {
        dq.deldata.loading = false;
        this.$message.error('Registration has been stopped');
      }
      //轮询查询是否报名成功
      async function bmlxsql() {
        var bmarr = await ArbTwo.methods.applySuceed(dq.deldata['data']['did']).call();
        var JSONS = Lettertolowercase(JSON.stringify(bmarr));
        if (JSONS.indexOf(address) != -1) {
          dq.$message({
            showClose: true,
            message: 'You have successfully signed up'
          });
          dq.deldata.loading = false;
          dq.deldata['ubmcode'] = true;
        } else {
          setTimeout(() => {
            bmlxsql();
          }, 3000);
        }
      }
    }
  }
};
</script>
<style lang="less" scope="scopod">
.state-flex {
  display: flex;
}
.state-defualt {
  width: 70px;
  height: 50px;
  border: 1px solid #e3e8ee;
  line-height: 50px;
  text-align: center;
  margin-top: 20px;
}
.state-right {
  margin-left: auto;
}
.green {
  background: #42b983;
  color: #fff;
}
.state-time {
  width: 70%;
  text-align: center;
}
.state-time p {
  padding: 0;
}
.con-title {
  /* width: 100%; */
  display: flex;
  flex-direction: row;
}
.el-dialog__header {
  border-bottom: 1px solid #e3e8ee;
}
.table {
  height: 100%;
}
.yaoqing {
  background: #42b983;
  color: #fff;
  border: none;
}

.p-input {
  line-height: 40px;
  display: flex;
}
.p-input input,
.p-input div {
  width: 100px;
}

.yaoqing2 {
  background: #f1f1f1;
  border: none;
  color: #525252;
}
.list-number {
  list-style-type: decimal;
  margin-left: 20px;
}
.list-number li {
  padding-left: 10px;
}
.hedaer {
  padding: 10px;
  border: 1px solid #f5f5f5;
}
.select input,
.res {
  border: none;
  color: #606266;
}
.res {
  cursor: pointer;
  font-size: 20px;
  margin-top: 10px;
  margin-left: auto;
}
.table {
  width: 100%;
}
.yaoqing:focus,
.yaoqing:hover {
  border: none;
  color: #fff;
  background-color: #42b983;
}
.yaoqing2:focus,
.yaoqing2:hover {
  background: #f1f1f1;
  border: none;
  color: #525252;
}
.el-table__row:hover,
.el-table__row:focus {
  background: none;
}
.el-input__inner::placeholder {
  color: #909399;
}
/* 谷歌 */
.el-input__inner::-webkit-input-placeholder {
  color: #909399;
}
/* 火狐 */
.el-input__inner:-moz-placeholder {
  color: #909399;
}
/*ie*/
.el-input__inner:-ms-input-placeholder {
  color: #909399;
}
.add {
  font-size: 14px;
}
.el-icon-circle-plus-outline {
  color: #409eff;
}
.zcy_list_user {
  font-size: 14px;
}
.zcy_list_username {
  font-size: 12px;
  padding-top: 3px;
  opacity: 0.8;
}
.con-title_auto {
  margin-right: auto;
}

.userac {
  /* background-color: #409eff; */
  color: #409eff;
  /* text-align: center; */
}

.zc_user_yq_ul {
  display: flex;
  flex-direction: column;
}

.zc_user_yq_ul_item {
  display: flex;
  flex-direction: row;
  padding: 5px 0;
}
.zc_user_yq_ul_item.yaoqing_ul {
  display: flex;
  flex-direction: column;
}
.zc_user_yq_ul_item_title {
  padding-top: 5px;
  font-size: 14px;
  opacity: 0.8;
  padding-bottom: 5px;
}
.zc_user_yq_ul_item_yaoqing_ul_l {
  padding: 5px 0;
}
.zc_user_yq_ul_item.yaoqinga {
  align-items: center;
}
.zc_user_yq_ul_item_r {
  align-items: center;
}
.zc_user_yq_ul_item.anniu {
  align-items: center;
  padding: 15px 0;
  justify-content: center;
}
.zc_user_yq_ul_item.anniu button {
  width: 120px;
}
.sq_zc_css {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
.sq_zc_css p {
  padding: 5px 0;
}
.sq_zc_css input {
  margin: 5px 0;
}
.zc_user_yq_ul_item.sousou {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.zc_user_yq_ul_item_r.sousou_r {
  display: flex;
  flex-direction: row;
}
.zc_user_yq_ul_item_r.sousou_r button {
  margin-left: 5px;
}

.zc_user_yq_ul_item.ddinfo {
  display: flex;
  flex-direction: column;
}
.zc_user_yq_ul_item.ddinfo .zc_user_yq_ul_item_r {
  margin-left: 15px;
  padding: 5px 0;
}
.ddinfo_i {
  padding: 5px 0;
}
</style>