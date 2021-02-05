<template>
  <el-container v-loading="loading">
    <el-dialog title="第二轮仲裁报名" :visible.sync="deldata['dialogcode']" width="40%">
      <div>
        <p>
          我的账号：<span>{{  deldata.myuser.user }}</span>
        </p>
        <p>
          我的昵称：<span>{{  deldata.myuser.name }}</span>
        </p>
        <p>
          订单号：<span>{{ deldata.data.did }}</span>
        </p>
        <div>
          <p>订单详情</p>
          <ul class="list-number">
            <li>商家地址：{{deldata.data.mad_b}}</li>
            <li>用户地址：{{deldata.data.uad_b}}</li>
            <li>资产总数：{{deldata.data.uoa}} {{ deldata.data.pro }}</li>
            <li>商家保证金：{{deldata.data.mma}} USDT</li>
            <li>用户保证金：{{deldata.data.uma}} USDT</li>
          </ul>
        </div>
        <p>报名人数：<span>{{deldata.Arbs.aid}} / {{deldata.renshunum}}</span></p>
        <p>报名倒计时：<span><van-count-down :time="deldata.data.djs_val" format="DD 天 HH 时 mm 分 ss 秒" /></span></p>
        <div>
          <p>入选者账号</p>
          <ul class="list-number">
            <li v-for="(li,index) in deldata['Uarr']" :key="index">{{li}}</li>
          </ul>
        </div>
        <p v-if="deldata.ubmcode">你已报名，并入选</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="kaishibaomingajax" :disabled="deldata.ubmcode" :loading="deldata.loading">报名</el-button>
      </span>
    </el-dialog>
    <el-tabs type="border-card" class="table" v-model="tabindex">
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-files"></i> 第一轮仲裁订单</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="options_value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="刷新数据"></i>
            </div>
          </el-row>
          <el-container >
            <el-table
              :data="listarr['dyl_list']"
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="did"
                label="订单ID"
              ></el-table-column>
              <el-table-column prop="m_user_b" label="商家">
                <template slot-scope="scope">
                  <div :class="scope.row.m_user == scope.row.can_user ? 'userac':''">{{ scope.row.m_user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="u_user_b" label="用户">
                <template slot-scope="scope">
                  <div :class="scope.row.u_user == scope.row.can_user ? 'userac':''">{{ scope.row.u_user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="uoa" label="资产数">
                <template slot-scope="scope">
                  <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="mma"
                label="商家保证金"
              >
              <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column
                prop="uma"
                label="用户保证金"
              >
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column
                prop="what"
                label="申诉类型"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.what == 1">资产</div>
                  <div v-if="scope.row.what == 2">保证金</div>
                  <div v-if="scope.row.what == 3">其他</div>
                </template>
              </el-table-column>
              
              <el-table-column
                prop="arb"
                label="仲裁结果"
                :filters="oneLeveThree"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                  <div v-if="scope.row.arb == 1">用户胜</div>
                  <div v-if="scope.row.arb == 2">商家胜</div>
                  <div v-if="scope.row.arb == 3">进入第二轮仲裁</div>
                  <div v-if="scope.row.arb == 0">未开始</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="arb"
                label="仲裁状态"
                filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                <div v-if="scope.row.code == 0">
                  未开始
                </div>
                <div v-if="scope.row.code == 1">
                  仲裁中
                </div>
                <div v-if="scope.row.code == 2">
                  仲裁结束
                </div>
                <div v-if="scope.row.code == 3">
                  已执行
                </div>
              </template>
              </el-table-column>
              <el-table-column
                prop="countDown"
                label="状态倒计时"
              >
                <template slot-scope="scope">
                  <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒"/>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="open_dylzc(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>
      <el-tab-pane label="第二轮仲裁订单" name="2">
        <span slot="label"><i class="el-icon-files"></i> 第二轮仲裁订单</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="options_value_b" placeholder="请选择">
              <el-option
                v-for="item in options_b"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="刷新数据"></i>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['del_list']" style="width: 100%">
              <el-table-column
                fixed
                prop="did"
                label="订单ID"
              ></el-table-column>
              <el-table-column prop="mad_b" label="商家"></el-table-column>
              <el-table-column prop="uad_b" label="用户"></el-table-column>
              <el-table-column prop="uoa" label="资产数">
                <template slot-scope="scope">
                  {{ scope.row.uoa }} {{ scope.row.pro }}
                </template>
              </el-table-column>
              <el-table-column
                prop="mma"
                label="商家保证金"
              >
                <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column
                prop="uma"
                label="用户保证金"
              >
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="mad_b" label="报名状态" v-if="options_value_b == 1">
                <template slot-scope="scope">
                  {{ scope.row.arbw == 0 ? '未入选' : '成功入选' }}
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                :filters="towLeveThree"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.timc == 0" >未报名</div>
                  <div v-if="scope.row.timc != 0 && scope.row.timd == 0">报名中</div>

                  <div v-if="scope.row.timd != 0 && scope.row.time == 0 && scope.row.timc != 0">仲裁中</div>
                  <div v-if="scope.row.time != 0 && scope.row.finish == 0 && scope.row.timc != 0">等待执行</div>

                  <div v-if="scope.row.finish != 0">已执行</div>

                </template>
              </el-table-column>
              <el-table-column
                label="生效倒计时"
              >
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
              <el-table-column label="操作" >
                <template slot-scope="scope">
                 <el-button size="mini" :disabled="(scope.row.timc == 0 ? false:(scope.row.timc != 0 && scope.row.timd == 0) ? false:true)" @click="derlunbaomingajax(scope.row)">报名</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>
      <el-tab-pane label="仲裁员列表" name="3">
        <span slot="label"><i class="el-icon-suitcase"></i> 仲裁员列表</span>
        <template>
          <el-row class="con-title">
            <div class="con-title_auto"></div>
            <div class="res add" @click="sq_zcy_dialog">
              <i class="el-icon-circle-plus-outline"></i
              ><span>申请成为仲裁员</span>
            </div>
          </el-row>
          <el-container>
            <el-table :data="listarr['zc_list']" style="width: 100%">
              <el-table-column
                fixed
                prop="index"
                label="序号"
              ></el-table-column>
              <el-table-column prop="store" label="仲裁员">
                <template slot-scope="scope">
                  <div class="zcy_list_user">{{ scope.row.username }}</div>
                  <div class="zcy_list_username">{{ scope.row.user_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="invite" label="邀请次数"></el-table-column>
              <el-table-column prop="succeed" label="仲裁单数"></el-table-column>
              <el-table-column
                prop="appl"
                label="第二轮报名次数"
              ></el-table-column>
              <el-table-column
                prop="balanceMar"
                label="保证金额"
              >
                <template slot-scope="scope">
                  {{scope.row.balanceMar  }} USDT
                </template>
              </el-table-column>
              <el-table-column prop="lock" label="冻结状态">
                <template slot-scope="scope">
                  {{scope.row.lock == 0 ? '正常':'冻结'  }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    :loading="scope.row.jiazai"
                    :disabled="scope.row.lock == 1 ? true:false"
                    @click="yaoqingajax(scope.row)"
                    >{{scope.row.lock == 0 ? '邀请':'已冻结'  }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>

      <el-tab-pane label="我申述的订单" name="4">
        <span slot="label"><i class="el-icon-suitcase"></i> 我参与的</span>
        <template>
          <el-row class="con-title">
            <el-select v-model="my_ss_tindex" placeholder="请选择">
              <el-option
                v-for="item in [{value:1,label:'我申诉的订单'},{value:2,label:'我成功仲裁的订单'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="res">
              <i class="el-icon-refresh" title="刷新数据"></i>
            </div>
          </el-row>
          <el-container >
            <el-table
              :data="listarr['my_ss_tlist']"
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="did"
                label="订单ID"
              ></el-table-column>
              <el-table-column prop="uad_b" label="商家">
                <template slot-scope="scope">
                  <div>{{ scope.row.uad_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="mad_b" label="用户">
                <template slot-scope="scope">
                  <div>{{ scope.row.mad_b }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="uoa" label="资产数">
                <template slot-scope="scope">
                  <div>{{ scope.row.uoa }} - {{ scope.row.pro }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="mma"
                label="商家保证金"
              >
              <template slot-scope="scope">
                  {{ scope.row.mma }} USDT
                </template>
              </el-table-column>
              <el-table-column
                prop="uma"
                label="用户保证金"
              >
                <template slot-scope="scope">
                  {{ scope.row.uma }} USDT
                </template>
              </el-table-column>
              <el-table-column
                prop="what"
                label="申诉类型"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.what == 1">资产</div>
                  <div v-if="scope.row.what == 2">保证金</div>
                  <div v-if="scope.row.what == 3">第二轮仲裁</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="arb"
                label="第一轮仲裁结果"
                :filters="oneLeveThree"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                  <div v-if="scope.row.arb == 1" >用户胜</div>
                  <div v-if="scope.row.arb == 2">商家胜</div>
                  <div v-if="scope.row.arb == 3">进入第二轮仲裁</div>
              </template>
              </el-table-column>
              <el-table-column
                prop="arb"
                label="第一轮仲裁状态"
                filter-placement="bottom-end"
                v-if="my_ss_tindex == 1"
              >
              <template slot-scope="scope" >
                <div v-if="scope.row.code == 1">
                  仲裁中
                </div>
                <div v-if="scope.row.code == 2">
                  仲裁结束
                </div>
                <div v-if="scope.row.code == 3">
                  已执行
                </div>
              </template>
              </el-table-column>
              <el-table-column
                prop="arb"
                label="第二轮仲裁状态"
                :filters="oneLeveThree"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <div v-if="scope.row.finish == 0" >未执行</div>
                  <div v-if="scope.row.finish != 0">已执行</div>
                </template>
              </el-table-column>
              
              <el-table-column
                prop="countDown"
                label="状态倒计时"
                v-if="my_ss_tindex == 1"
              >
                <template slot-scope="scope">
                  <van-count-down :time="scope.row.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="open_dylzc(scope.row,2)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-container>
        </template>
      </el-tab-pane>
      
    </el-tabs>
    <!-- 保证金管理 -->
    <el-dialog title="第二轮仲裁管理" :visible.sync="manage" width="40%">
      <p>
        我的账号：<span>{{ oxUser }}</span>
      </p>
      <p>
        我的昵称：<span>{{ oxUser }}</span>
      </p>
      <p>
        订单号：<span>{{ row.orderID }}</span>
      </p>
      <p>
        订单详情：<span>{{ row.orderID }}</span>
      </p>
      <div class="case">仲裁方案</div>
      <div>
        <span>编号</span>
        <el-input
          suffix-icon="el-icon-arrow-down"
          v-model="inputDevice"
        ></el-input>
        <i class="el-icon-circle-plus-outline" @click="dailogSeting"></i
        ><span>新建</span>
      </div>
      <p>资产归属：商家</p>
      <p>保证金：用户减少200ustd</p>
      <p>商业仲裁员：1000gaz</p>
      <p>用户仲裁员：100gaz</p>
      <p>第二轮仲裁费：90gaz</p>
      <div class="time-out">投票倒计时：04：30：20</div>
      <div class="buttons">
        <el-button type="primary" @click="dailogCloser">取消</el-button>
        <el-button type="primary" @click="dailogVote">投票</el-button>
        <el-button type="primary" @click="dailogAccept">接收</el-button>
        <el-button type="primary" @click="dailogUndo">撤销申请</el-button>
        <el-button type="primary" @click="dailogExecute">执行</el-button>
        <el-button type="primary" @click="dailogRestart">重启</el-button>
      </div>
    </el-dialog>

    <el-dialog title="保证金分配管理" :visible.sync="margin" width="40%">
      <p>
        我的账号：<span>{{ oxUser }}</span>
      </p>
      <p>
        我的昵称：<span>{{ oxUser }}</span>
      </p>
      <p>
        订单号：<span>{{ row.orderID }}</span>
      </p>
      <p>
        订单详情：<span>{{ row.orderID }}</span>
      </p>
      <div>我的保证金</div>
      <el-select v-model="countRepDefualt" placeholder="请选择">
        <el-option
          v-for="item in countRep"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div>我的设置</div>
      <el-button type="primary" @click="marginSeting">提交</el-button>
    </el-dialog>
    <el-dialog title="报名/退出" :visible.sync="sq_zc_data['show']" width="40%">
    <div class="sq_zc_css">
      <p>我的账号：{{ sq_zc_data['info']['user'] }}</p>
      <p>我的昵称：{{ sq_zc_data['info']['username'] }}</p>
      <p>我的申述的订单数：{{ sq_zc_data['info']['sq_ddnum'] }}</p>
      <p>我被邀请的订单数：{{ sq_zc_data['info']['yq_ddnum'] }}</p>
      <p>我参与第二轮仲裁订单的订单数: {{ sq_zc_data['info']['del_ddnum'] }}</p>
      <p>我成功仲裁订单数: {{ sq_zc_data['info']['cg_zcddnum'] }}</p>
      <p>仲裁员编号：{{ sq_zc_data['info']['cg_zcid'] }}</p>
      <p>保证金余额：{{ sq_zc_data['info']['user_bzj'] }} USDT</p>
      <el-select v-model="sq_zc_data.signDefualt" placeholder="请选择">
        <el-option
          v-for="item in sq_zc_data.sign"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="sq_zc_data['je']" v-if="sq_zc_data.signDefualt == 0"></el-input>
      <el-input v-model="sq_zc_data['je']" :disabled="sq_zc_data['info']['user_bzj'] > 0 ? false:true" v-if="sq_zc_data.signDefualt == 1"></el-input>
      <el-button type="primary" @click="sq_zcy_ajax">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="我参与的第一轮仲裁" :visible.sync="dyl_zc['code']" width="40%">
      <p>
        我的账号：<span>{{ dyl_zc['my_user'] }}</span>
      </p>
      <p>
        我的昵称：<span>{{ dyl_zc['my_name'] }}</span>
      </p>
      <p>
        订单号：<span>{{ dyl_zc['did'] }}</span>
      </p>
      <div>
        订单详情：
        <div class="dyl_zc_ul">
          <div class="dyl_zc_ul_item">
            资产：{{ dyl_zc['ddifno']['uoa'] }}
          </div>
          <div class="dyl_zc_ul_item">
            商家地址：{{ dyl_zc['ddifno']['mad'] }}
          </div>
          <div class="dyl_zc_ul_item">
            用户地址：{{ dyl_zc['ddifno']['uad'] }}
          </div>
          <div class="dyl_zc_ul_item">
            商家保证金：{{ dyl_zc['ddifno']['mma'] }} USDT
          </div>
          <div class="dyl_zc_ul_item">
            用户保证金：{{ dyl_zc['ddifno']['uma'] }} USDT
          </div>
        </div>
      </div>
      <p>被邀请方：{{ dyl_zc['byqf'] }}</p>
      <p>仲裁结果：{{ dyl_zc['zcinfo']['arb'] == 0 ?'未开始仲裁': dyl_zc['zcinfo']['arb'] == 1 ? '用户获胜': dyl_zc['zcinfo']['arb'] == 2 ? '商家获胜':'进入第二轮仲裁'}}</p>
      <p>商家仲裁员：{{ dyl_zc['zcinfo']['uadd'] }}</p>
      <p>用户仲裁员：{{ dyl_zc['zcinfo']['madd'] }}</p>

      <div>仲裁倒计时：
        <div v-if="dyl_zc.zcinfo.djs_val == 0">未开始</div>
        <div v-if="dyl_zc.zcinfo.djs_val == 1.1">已结束</div>
        <div v-if="dyl_zc.zcinfo.djs_val != 0 && dyl_zc.zcinfo.djs_val != 1.1">
          <van-count-down :time="dyl_zc.zcinfo.djs_val" format="DD 天 HH 时 mm 分 ss 秒" />
        </div>
      </div>
      <el-button type="primary" @click="agree" :disabled="dyl_zc.zcinfo.an_code">赞成</el-button>
      <el-button type="primary" :disabled="dyl_zc.zhixingcode" @click="zhixingajax">执行</el-button>
    </el-dialog>

    <el-dialog title="邀请仲裁员" :visible.sync="zc_user_yq['show']" width="30%">
      <div class="zc_user_yq">
        <div class="zc_user_yq_ul">
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              我的账号：
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['my_user'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              我的昵称：
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['my_name'] }}
            </div>
          </div>

          <div class="zc_user_yq_ul_item sousou">
            <div class="zc_user_yq_ul_item_l">
              订单号：
            </div>
            <div class="zc_user_yq_ul_item_r sousou_r">
              <el-input v-model="zc_user_yq['did']" placeholder="请输入订单ID"></el-input> <el-button icon="el-icon-search" circle @click="sousou_dd" :loading="loadingsoudd"></el-button>
            </div>
          </div>
          <div class="zc_user_yq_ul_item ddinfo" v-if="zc_user_yq.dinfo['sj_user']">
            <div class="zc_user_yq_ul_item_l">
              订单详情：
            </div>
            <div class="zc_user_yq_ul_item_r">
              <div class="ddinfo_i" style="padding-top: 5px;">商家地址:{{ zc_user_yq['dinfo']['sj_user']  }}</div>
              <div class="ddinfo_i">用户地址:{{ zc_user_yq['dinfo']['u_user']  }} </div>
              <div class="ddinfo_i">商家保证金:{{ zc_user_yq['dinfo']['sj_bzj']  }} USDT</div>
              <div class="ddinfo_i">用户保证金:{{ zc_user_yq['dinfo']['u_bzj']  }} USDT</div>
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              我的角色：
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['juese'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              我缴纳的仲裁费：
            </div>
            <div class="zc_user_yq_ul_item_r">
              {{ zc_user_yq['zc_je'] }}
            </div>
          </div>
          <div class="zc_user_yq_ul_item">
            <div class="zc_user_yq_ul_item_l">
              仲裁标的：
            </div>
            <div class="zc_user_yq_ul_item_r">
              <el-radio v-model="zc_user_yq.zc_key" label="1" :disabled="zc_user_yq.zc_key!=0">资产</el-radio>
              <el-radio v-model="zc_user_yq.zc_key" label="2" :disabled="zc_user_yq.zc_key!=0">保证金</el-radio>
            </div>
          </div>
          <div class="zc_user_yq_ul_item yaoqinga">
            <div class="zc_user_yq_ul_item_l">
              邀请：
            </div>
            <div class="zc_user_yq_ul_item_r">
              <el-input v-model="zc_user_yq['form_user']"   placeholder="请输入用户地址"></el-input>
            </div>
          </div>
          <div class="zc_user_yq_ul_item yaoqing_ul">
            <div class="zc_user_yq_ul_item_title">已邀请的仲裁员：</div>
            <div class="zc_user_yq_ul_item_yaoqing_ul">
              <div class="zc_user_yq_ul_item_yaoqing_ul_l" v-for="(li,index) in zc_user_yq.u_array" :key="index">
                <div class="zc_user_yq_ul_item_yaoqing_ul_l_a">{{ index+1 }}.{{ li.username }}</div>
                <div class="zc_user_yq_ul_item_yaoqing_ul_l_b">{{ li.user }}</div>
              </div>
            </div>
          </div>
          <div class="zc_user_yq_ul_item anniu">
            <van-button type="info" :disabled="zc_user_yq.jyong" @click="yq_zc_ajax">邀请</van-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    
    <el-dialog title="我的申诉" :visible.sync="state" width="40%">
      <p>
        我的昵称：<span>{{ oxUser }}</span>
      </p>
      <p>
        我的账号：<span>{{ oxUser }}</span>
      </p>
      <p>
        订单号：<span>{{ openOne.orderID }}</span>
      </p>
      <p>我的角色：用户</p>
      <p>我缴纳的仲裁费：</p>
      <p>
        订单详情：<span>{{ openOne.orderID }}</span>
      </p>
      <div>仲裁结果</div>
      <div class="state-flex">
        <div class="state-defualt green">商家胜</div>
        <div class="state-right state-defualt">平民胜</div>
      </div>
      <div class="state-flex">
        <div class="state-defualt">用户胜</div>
        <div class="state-time">
          <p>执行倒计时</p>
          <p>04：30：20</p>
        </div>
      </div>
      <el-button type="primary" @click="perform">执行</el-button>
      <el-button type="primary" @click="arbitrament">第二轮仲裁</el-button>
    </el-dialog>
  </el-container>

</template>

<script>
import "./css/zclist.css";

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
var address, web3,ArbOne,ArbTwo,GazConn,Dotc,Arbdate;

function 字母转小写(值) {
  var 需要返回的值 =  值.toLowerCase();
  return 需要返回的值;
}


export default {
  created() {
    var dq = this;
    //监测用户是否安装MASK
    if (typeof ethereum === "undefined") {
      web3 =  new Web3(config['hyue'][config['key']]['Url']);
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
                if (window.ethereum.isImToken || window.ethereum.isMetaMask) {
                    var wlcode = window.ethereum.networkVersion;
                    //imtoken只能查看 无法操作 出发是ETF主网
                    if (window.ethereum.isImToken) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                    //MetaMask 钱包不等于4  进入专用网络 等于4使用本地钱包
                    if (window.ethereum.isMetaMask && wlcode != 4) {
                        web3.setProvider(config["hyue"][config["key"]]["Url"]);
                    }
                }else{
                    web3.setProvider(config["hyue"][config["key"]]["Url"]);
                }
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
  mounted(){
    
  },
  data() {
    return {
      
      user:address,
      tabindex: "1",
      listarr:{
        zc_list:[],
        dyl_list:[],
        del_list:[],
        my_ss_tlist:[]
      },
      options: [
        { value: "0", label: "第一轮仲裁订单列表" },
        { value: "1", label: "邀请我的订单" },
      ],
      options_b: [
        { value: "0", label: "第二轮仲裁订单列表" },
        { value: "1", label: "我参与的第二轮仲裁" },
      ],
      options_value:"0",
      options_value_b:"0",
      my_ss_tindex:1,

      //我参与的第一轮仲裁
      dyl_zc:{
        code:false,
        my_user:'',
        my_name: '',
        did:'',
        byqf:'',
        zccode:'',
        zc_user:'',
        ddifno:{
          uoa:'',
          uma:'',
          mma:'',
          uad:'',
          mad:''
        },
        zcinfo:ZcModel
      },

      deldata:deldata,

      //邀请仲裁员
      loadingsoudd:false,
      zc_user_yq:{
        dinfo:{
          sj_user:'',
          u_user:'',
          sj_bzj:0,
          what:0,
          u_bjz:0
        },
        jyong:true,
        show:false,
        my_user:'',
        my_name:'',
        did:0,
        juese:'',
        zc_je:0,
        zc_key:"1",
        form_user:'',
        u_array:[],
        index:0,
        jiazai:false
      },
      //申请仲裁者
      sq_zc_data:{
        show:false,
        sign: [
          { value: "0", label: "报名" },
          { value: "1", label: "提现" },
        ],
        signDefualt: "0",
        inputDevice:null,
        info:{
          user:'',
          username:'',
          sq_ddnum:0,
          yq_ddnum:0,
          del_ddnum:0,
          cg_zcddnum:0,
          cg_zcid:0,
          user_bzj:0
        },
        je:null
      },

      
      device: [
        { value: "0", label: "用户" },
        { value: "2", label: "商家" },
      ],
      deviceDefualt: "用户",
      countRep: [
        { value: "0", label: "减少" },
        { value: "1", label: "增加" },
      ],
      
      inputDevice:0,
      countRepDefualt: "减少",
      openOne: "",
      loading: false,
      leveTowValue: "全部",
      leveThValue: "获胜方",
      dailogSetingValue: false,
      manage: false,
      margin: false,
      put: false,
      onece: false,
      invitation: false,
      state: false,
      oneLeveTwo: [
        { value: "0", label: "全部" },
        { value: "1", label: "我申述的订单" },
        { value: "2", label: "邀请我的订单" },
      ],
      oneLeveThree: [
        { value: "1", text: "商家" },
        { value: "2", text: "用户" },
        { value: "3", text: "平局" },
      ],
      oxUser: "0xf56...",
      towLeveThree: [
        { value: "1", text: "报名中" },
        { value: "2", text: "投票中" },
        { value: "3", text: "执行等待中" },
        { value: "4", text: "已执行" },
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
          victory: "商家",
          countDown: "12:00:00",
        },
        {
          orderID: "113",
          store: "0xf123...789",
          user: "0xfeag...edc",
          assets: "4eth",
          storeAssure: "100 ustd",
          userAssure: "10 ustd",
          victory: "商家",
          countDown: "12:00:00",
        },
      ],
      dialogVisible: false,
      row: "",
    };
  },
  watch: {
    'zc_user_yq.did'(){
        this.zc_user_yq.dinfo = {
          sj_user:'',
          u_user:'',
          sj_bzj:0,
          what:0,
          u_bjz:0
        };
        this.zc_user_yq['u_array'] = [];
    },
    'dyl_zc.zcinfo.djs_val'(e){
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
    options_value(e){
      if (e == 0) {
        this.listarr['dyl_list'] = [];
        this.get_list_list_arbone();
      }else{
        this.listarr['dyl_list'] = [];
        this.get_list_list_inviDeal();
      }
    },
    options_value_b(e){
      if (e == 0) {
        this.listarr['del_list'] = [];
        this.get_list_arbtwo();
      }else{
        this.listarr['del_list'] = [];
        this.get_list_applDeal();
      }
    },
    my_ss_tindex(){
      this.getmyzc_list();
    }
  },
  onLoad() {
    //弹出错误提示
  },
  methods: {
    //刷新数据
    refresh: function () {
      console.log(this.selectId);
    },

    open: function (row) {
      this.row = row;
      this.dialogVisible = true;
    },
    filterTag: function () {},
    dailogSeting: function () {
      //第二轮仲裁设置
      this.dialogVisible = false;
      this.dailogSetingValue = true;
    },
    dailogManager: function () {
      //第二轮仲裁管理
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
      //撤销申请
      this.manage = false;
      this.put = true;
    },

    dailogRestart: function () {
      //仲裁管理重启
      this.dailogSetingValue = false;
      this.manage = true;
    },
    marginSeting: function () {
      //保证金分配管理
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
              var user = userarr[index].substring(0,5)+"····"+userarr[index].substring(userarr[index].length - 5,userarr[index].length);
              obj['index'] = index + 1;
              obj['user'] = userarr[index];
              obj['username'] = Base64.decode(namearr[index]);
              obj['user_b'] = user;
              obj['succeed'] = Number(infoarr[index][0]);
              obj['balanceMar'] = (Number(infoarr[index][1]) / (10**bzjnum)).toFixed(2);
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
    async get_list_list_arbone(){
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
              obj['uoa'] = (Number(infoarr[index][1]) / (10**zc_num)).toFixed(2);
              obj['uma'] = (Number(infoarr[index][2]) / (10**bzjnum)).toFixed(2);
              obj['mma'] = (Number(infoarr[index][3]) / (10**bzjnum)).toFixed(2);
              obj['u_user'] = userarr[index][0];
              obj['m_user'] = userarr[index][1];
              obj['u_user_b'] = userarr[index][0].substring(0,5)+"····"+userarr[index][0].substring(userarr[index][0].length - 5,userarr[index][0].length);
              obj['m_user_b'] = userarr[index][1].substring(0,5)+"····"+userarr[index][1].substring(userarr[index][1].length - 5,userarr[index][1].length);
              obj['what'] = Number(infoarr[index][4]);
              obj['tima'] = Number(infoarr[index][5]);
              obj['arb'] = Number(infoarr[index][6]);
              obj['execone'] = Number(infoarr[index][7]);
              obj['pro'] = zc_id;
              obj['mark'] = typearr[index][1];
              obj['djs_val'] = ((obj['tima']+Number(tima))- dqtime) * 1000;
              
              if (obj['tima'] == 0) {
                obj['code'] = 0;
              }
              if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) > dqtime)) {
                obj['code'] = 1;
              }
              if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) < dqtime) || obj['arb'] == 3) {
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
    async get_list_list_inviDeal(){
      var num = 25;
      var dq = this;
      //读取时间
      var tima = await ArbOne.methods.Tima().call((err, ret) => {
        return Number(ret);
      });
      var dqtime = Math.round(new Date() / 1000);

      await ArbOne.methods.inviDeal(address+"",num+"").call((err, ret) => {
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
              obj['uoa'] = (Number(infoarr[index][1]) / (10**zc_num)).toFixed(2);
              obj['uma'] = (Number(infoarr[index][2]) / (10**bzjnum)).toFixed(2);
              obj['mma'] = (Number(infoarr[index][3]) / (10**bzjnum)).toFixed(2);
              obj['u_user'] = userarr[index][0];
              obj['m_user'] = userarr[index][1];
              obj['u_user_b'] = userarr[index][0].substring(0,5)+"····"+userarr[index][0].substring(userarr[index][0].length - 5,userarr[index][0].length);
              obj['m_user_b'] = userarr[index][1].substring(0,5)+"····"+userarr[index][1].substring(userarr[index][1].length - 5,userarr[index][1].length);
              obj['what'] = Number(infoarr[index][4]);
              obj['tima'] = Number(infoarr[index][5]);
              obj['arb'] = Number(infoarr[index][6]);
              obj['execone'] = Number(infoarr[index][7]);
              obj['pro'] = zc_id;
              obj['mark'] = typearr[index][1];
              obj['djs_val'] = ((obj['tima']+Number(tima))- dqtime) * 1000;

              if (obj['tima'] == 0) {
                obj['code'] = 0;
              }
              if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) > dqtime)) {
                obj['code'] = 1;
              }
              if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) < dqtime) || obj['arb'] == 3) {
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
        ArbOne.methods.can(did+"",what+"",address+"").call((err, ret) => {
          dq.listarr['dyl_list'][index]['can_user'] = ret;
          index+=1;
          hope_userajax();
        });
      }
      hope_userajax();
    },
    //第二轮仲裁结果
    async get_list_arbtwo(){
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
                obj['uoa'] = (Number(infoarr[index][1]) / (10**bzjnum)).toFixed(2);
                obj['uma'] = (Number(infoarr[index][2]) / (10**zc_num)).toFixed(2);
                obj['mma'] = (Number(infoarr[index][3]) / (10**bzjnum)).toFixed(2);
                obj['timc'] = Number(infoarr[index][4]);
                obj['timd'] = Number(infoarr[index][5]);
                obj['time'] = Number(infoarr[index][6]);
                obj['finish'] = Number(infoarr[index][7]);

                obj['pro'] = zc_id;
                obj['mark'] = typearr[index][1];

                obj['uad'] = userarr[index][0];
                obj['mad'] = userarr[index][1];

                var uad_b = userarr[index][0].substring(0,5)+"····"+userarr[index][0].substring(userarr[index][0].length - 5,userarr[index][0].length);
                var mad_b = userarr[index][1].substring(0,5)+"····"+userarr[index][1].substring(userarr[index][1].length - 5,userarr[index][1].length);
                obj['uad_b'] = uad_b;
                obj['mad_b'] = mad_b;


                obj['Timed'] = Number(Timd);
                obj['Timec'] = Number(Timc);
                obj['Timee'] = Number(Time);

                //倒计时获取
                if (obj['timc'] !=0 && obj['timd'] == 0) {
                  obj['djs_val'] = ((obj['timc'] + obj['Timec']) - dqtime) * 1000;
                }
                if (obj['timd'] !=0 && obj['time'] == 0) {
                  obj['djs_val'] = ((obj['timd'] + obj['Timed']) - dqtime) * 1000;
                }
                if (obj['time'] !=0 && obj['finish'] == 0) {
                  obj['djs_val'] = ((obj['time'] + obj['Timee']) - dqtime ) * 1000;
                }
                
                list.push(obj);
              }
              dq.listarr['del_list'] = list;
            }
          }
      });
    },
    //第二轮我参与的
    async get_list_applDeal(){
      var num = 25;
      var dq = this;
      //读取时间
      var Timc = await ArbTwo.methods.Timc().call();
      var Timd = await ArbTwo.methods.Timd().call();
      var Time = await ArbTwo.methods.Timd().call();
      var dqtime = Math.round(new Date() / 1000);
      await ArbOne.methods.applDeal(address+"",num).call((err, ret) => {
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
                obj['uoa'] = (Number(infoarr[index][1]) / (10**bzjnum)).toFixed(2);
                obj['uma'] = (Number(infoarr[index][2]) / (10**zc_num)).toFixed(2);
                obj['mma'] = (Number(infoarr[index][3]) / (10**bzjnum)).toFixed(2);
                obj['timc'] = 0;
                obj['timd'] = Number(infoarr[index][5]);
                obj['time'] = Number(infoarr[index][6]);
                obj['finish'] = Number(infoarr[index][7]);

                obj['pro'] = zc_id;
                obj['mark'] = typearr[index][1];

                obj['uad'] = userarr[index][0];
                obj['mad'] = userarr[index][1];

                var uad_b = userarr[index][0].substring(0,5)+"····"+userarr[index][0].substring(userarr[index][0].length - 5,userarr[index][0].length);
                var mad_b = userarr[index][1].substring(0,5)+"····"+userarr[index][1].substring(userarr[index][1].length - 5,userarr[index][1].length);
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
        var timc = await ArbTwo.methods.arbs(dq.listarr['del_list'][index]['did']+"").call();
        dq.listarr['del_list'][index]['timc'] = Number(timc['timc']);
        if (dq.listarr['del_list'][index]['timc'] !=0 && dq.listarr['del_list'][index]['timd'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['timc'] + dq.listarr['del_list'][index]['Timec']) - dqtime) * 1000;
        }
        if (dq.listarr['del_list'][index]['timd'] !=0 && dq.listarr['del_list'][index]['time'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['timd'] + dq.listarr['del_list'][index]['Timed']) - dqtime) * 1000;
        }
        if (dq.listarr['del_list'][index]['time'] !=0 && dq.listarr['del_list'][index]['finish'] == 0) {
          dq.listarr['del_list'][index]['djs_val'] = ((dq.listarr['del_list'][index]['time'] + dq.listarr['del_list'][index]['Timee']) - dqtime ) * 1000;
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
        list = await ArbOne.methods.ownerappeal(address+"",num).call();
      }else{
        list = await ArbOne.methods.arbsucc(address+"",num).call();
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
          obj['uoa'] = (Number(dinfo[index][1]) / (10**pro_num)).toFixed(2);
          obj['uma'] = (Number(dinfo[index][2]) / (10**bzjnum)).toFixed(2);
          obj['mma'] = (Number(dinfo[index][3]) / (10**bzjnum)).toFixed(2);
          obj['what'] = dinfo[index][4];
          obj['arb'] = dinfo[index][5];
          obj['time'] = Number(dinfo[index][8]);
          obj['finish'] = dinfo[index][9];
          obj['tima'] = Number(dinfo[index][6]);
          obj['execone'] = dinfo[index][7];
          //查询时间
          var timc = 0;
          var timd = 0;
          await ArbTwo.methods.arbs(dinfo[index][0]+"").call((err,ret)=>{
            timc = ret['timc'];
            timd = ret['timd'];
          });
          obj['timc'] = Number(timc);
          obj['timd'] = Number(timd);
          obj['pro'] = pro;
          obj['mark'] = type[index][1];
          obj['uad'] = addr[index][0];
          obj['mad'] = addr[index][1];
          obj['uad_b'] = addr[index][0].substring(0,5)+"····"+addr[index][0].substring(addr[index][0].length - 5,addr[index][0].length);
          obj['mad_b'] = addr[index][1].substring(0,5)+"····"+addr[index][1].substring(addr[index][1].length - 5,addr[index][1].length);
          //倒计时计算
          if (obj.execone == 0 && obj.finish != 0) {
            //第一轮
            obj['djs_val'] = ((obj['tima']+Number(tima))- dqtime) * 1000;
          }else{
            obj['Timed'] = Number(Timd);
            obj['Timec'] = Number(Timc);
            obj['Timee'] = Number(Time);
            //第二轮
            if (obj['timc'] !=0 && obj['timd'] == 0) {
              obj['djs_val'] = ((obj['timc'] + obj['Timec']) - dqtime) * 1000;
            }
            if (obj['timd'] !=0 && obj['time'] == 0) {
              obj['djs_val'] = ((obj['timd'] + obj['Timed']) - dqtime) * 1000;
            }
            if (obj['time'] !=0 && obj['finish'] == 0) {
              obj['djs_val'] = ((obj['time'] + obj['Timee']) - dqtime ) * 1000;
            }
          }
          //查询谁邀请我的
          var can_user = await ArbOne.methods.can(obj['did']+"",obj['what']+"",address+"").call();
          obj['can_user'] = can_user;
          if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) > dqtime)) {
            obj['code'] = 1;
          }
          if (obj['tima'] != 0 && ((obj['tima']+Number(tima)) < dqtime) || obj['arb'] == 3) {
            obj['code'] = 2;
          }
          if (obj['execone'] != 0) {
            obj['code'] = 3;
          }
          listarr.push(obj);
        }
        this.listarr['my_ss_tlist'] = listarr;
      }else{
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
          obja['uoa'] = (Number(dinfo[index][1]) / (10**prob_num)).toFixed(2);
          obja['uma'] = (Number(dinfo[index][2]) / (10**bzjnum)).toFixed(2);
          obja['mma'] = (Number(dinfo[index][3]) / (10**bzjnum)).toFixed(2);
          obja['arb'] = dinfo[index][4];
          obja['what'] = dinfo[index][5];
          obja['finish'] = dinfo[index][7];
          obja['execone'] = dinfo[index][6];
          //查询时间
          var timc_b = 0;
          var timd_b = 0;
          var time_b = 0;
          await ArbTwo.methods.arbs(dinfo[index][0]+"").call((err,ret)=>{
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
          obja['uad_b'] = addr[index][0].substring(0,5)+"····"+addr[index][0].substring(addr[index][0].length - 5,addr[index][0].length);
          obja['mad_b'] = addr[index][1].substring(0,5)+"····"+addr[index][1].substring(addr[index][1].length - 5,addr[index][1].length);
          listarra.push(obja);
        }
        this.listarr['my_ss_tlist'] = listarra;
      }
      
    },

    //打开我参与的第一轮仲裁
    async open_dylzc(rows,openc){
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
      var uname = await ArbOne.methods.message(address,0+"").call();
      var zcy_user = await ArbOne.methods.ama(row.did+"",row['what']+"",0).call();
      var zc_info = await ArbOne.methods.arbwhat(row.did+"",row['what']+"").call();
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
        ztitle = '商家';
      }else if (row.u_user == row.can_user) {
        ztitle = '用户';
      }
      //倒计时计算
      if (Number(ZcModela['tima']) != 0) {
        if ((Number(ZcModela['tima']) + Number(Tima)) >= dqtime) {
          //倒计时
          ZcModela['djs_val'] = ((Number(ZcModela['tima']) + Number(Tima)) - dqtime) * 1000;
        }else{
          ZcModela['djs_val'] = 1.1;
        }
      }
      var arber =  await ArbOne.methods.arber(address+"").call();
      var peg =  await ArbOne.methods.peg().call();
      var lock =  await ArbOne.methods.lock(address+"").call();
      var balanceMar =  await ArbOne.methods.balanceMar(address+"").call();
      if (ZcModela['madd'] == '0x0000000000000000000000000000000000000000') {
        ZcModela['madd'] = '';
      }
      if (ZcModela['uadd'] == '0x0000000000000000000000000000000000000000') {
        ZcModela['uadd'] = '';
      }
      //时间大于当前时间
      if (((Number(ZcModela['tima']) + Number(Tima)) > dqtime) || Number(ZcModela['tima']) == 0 ) {
        //获取被邀请方
        if (row.m_user == row.can_user) {
          //商家
          if (!ZcModela['madd']) {
            if(Number(arber) <= Number(peg)  && lock == 0 && balanceMar >= (row['mma'] * (10**bzjnum))){
              ZcModela['an_code'] = false;
            }else{
              ZcModela['an_code'] = true;
            }
          }
        }else if (row.u_user == row.can_user) {
          //用户
          if (!ZcModela['uadd']) {
            if(Number(arber) <= Number(peg)  && lock == 0 && balanceMar >= (row['mma'] * (10**bzjnum))){
              ZcModela['an_code'] = false;
            }else{
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
          }else{
            zhixingcode = true;
          }
        }else{
          zhixingcode = true;
        }
      }
      this.dyl_zc = {
        code:true,
        my_user:address,
        my_name: uname ? Base64.decode(uname):'暂未填写',
        did:row.did,
        byqf:ztitle,
        what:row['what'],
        zccode:false,
        zc_user:zcy_user,
        ddifno:{
          uoa:Number(row.uoa) + '' + row.pro,
          uma:Number(row.uma),
          mma:Number(row.mma),
          uad:row.u_user,
          mad:row.m_user
        },
        zhixingcode:zhixingcode,
        zcinfo:ZcModela
      };
    },
    //邀请仲裁者
    async yaoqingajax(row){
      var index = row['index'] - 1;
      var rows = this.listarr['zc_list'][index];
      this.zc_user_yq['show'] = true;
      this.zc_user_yq['my_user'] = address;
      var uname = await ArbOne.methods.message(address+"","0").call();
      this.zc_user_yq['my_name'] = uname ? Base64.decode(uname):'暂未填写';
      this.zc_user_yq['form_user'] = rows['user'];
      this.zc_user_yq['index'] = index;
    },
    //订单搜索详情
    async sousou_dd(){
      if (this.zc_user_yq['did'] == 0) {
        return;
      }
      var dq = this;
      dq.loadingsoudd = true;
      this.zc_user_yq['dinfo'] = {
        sj_user:'',
        what:'',
        u_user:'',
        sj_bzj:0,
        u_bzj:0
      };
      var ddinfo = await ArbOne.methods.user(this.zc_user_yq['did']+"").call();
      //查询订单是否存在
      if (JSON.stringify(ddinfo).indexOf('0x0000000000000000000000000000000000000000') != -1) {
          var ddis = await Dotc.methods.users(this.zc_user_yq['did']).call();
          if(ddis['Madd'] == "0x0000000000000000000000000000000000000000"){
            this.$message.error('订单不存在！');
            dq.loadingsoudd = false;
          }else{
            dq.loadingsoudd = false;
            dq.$alert('订单未初始化，请点击确定！', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                ddinit();
              }
            });
          }
      }else{
        initdata();
      }

      //初始化订单
      async function ddinit() {
        dq.loadingsoudd = true;
        ArbOne.methods.init(dq.zc_user_yq['did']).send({from:address},(err,ret)=>{
          if (ret) {
            ddinitlx();
          }else{
            dq.loadingsoudd = false;
            dq.$message.error('请点击确定！');
          }
        });
        
      }

      //轮询查询是否已初始化
      async function ddinitlx() {
        ddinfo = await ArbOne.methods.user(dq.zc_user_yq['did']+"").call();
        if (JSON.stringify(ddinfo).indexOf('0x0000000000000000000000000000000000000000') == -1) {
          initdata();
        }else{
          setTimeout(() => {
            ddinitlx();
          }, 3000);
        }
      }
      

      async function initdata() {
        dq.loadingsoudd = false;
        var ddinfo_obj = {
          sj_user:ddinfo['mad'].toLowerCase(),
          what:ddinfo['what'],
          u_user:ddinfo['uad'].toLowerCase(),
          sj_bzj:Number(ddinfo['mma']) / (10**bzjnum),
          u_bzj:Number(ddinfo['uma']) / (10**bzjnum)
        };
        dq.zc_user_yq['zc_key'] = ddinfo['what'];

        if (ddinfo_obj['sj_user'] == address) {
          dq.zc_user_yq['juese'] = '商家';
          dq.zc_user_yq['jyong'] = false;
        }else if (ddinfo_obj['u_user'] == address){
          dq.zc_user_yq['juese'] = '用户';
          dq.zc_user_yq['jyong'] = false;
        }else{
          dq.zc_user_yq['juese'] = '';
          dq.zc_user_yq['jyong'] = true;
        }
        dq.zc_user_yq['dinfo'] = ddinfo_obj;
        //查询仲裁费用
        var zc_je = await ArbOne.methods.bma(dq.zc_user_yq['did']+"",ddinfo_obj['what']+"",address+"").call();
        dq.zc_user_yq.zc_je = Number(zc_je) / (10**bzjnum);
        //查询我邀请的列表
        dq.zc_user_yq.u_array = [];
        var zc_user_list = await ArbOne.methods.hopers(address+"",dq.zc_user_yq['did']+"",dq.zc_user_yq['zc_key']+"").call();
        for (let index = 0; index < zc_user_list[0].length; index++) {
          dq.zc_user_yq.u_array.push({
            user:zc_user_list[0][index],
            username:zc_user_list[1][index] ? Base64.decode(zc_user_list[1][index]):'暂未填写'
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
    yq_zc_ajax(){
      if (!this.zc_user_yq['form_user']) {
        return;
      }
      ArbOne.methods.hope(this.zc_user_yq['did']+"",this.zc_user_yq['zc_key'],this.zc_user_yq['form_user']+"").send({
        from:address
      },(err,ret)=>{
        console.log(ret);
      });
    },
    //申请成为仲裁员
    async sq_zcy_dialog(){
      this.sq_zc_data['info'] = {
        user:'',
        username:'',
        sq_ddnum:0,
        yq_ddnum:0,
        del_ddnum:0,
        cg_zcddnum:0,
        cg_zcid:0,
        user_bzj:0
      };
      this.sq_zc_data['show'] = true;
      ArbOne.methods.ownermess(address+"").call((err,ret)=>{
        this.sq_zc_data['info'] = {
          user:address,
          username:ret[0] ? Base64.decode(ret[0]):'暂未填写',
          sq_ddnum:ret[1][2],
          yq_ddnum:ret[1][3],
          del_ddnum:ret[1][4],
          cg_zcddnum:ret[1][5],
          cg_zcid:ret[1][1],
          user_bzj:Number(ret[1][0]) / (10**bzjnum),
          suo:ret[1][6]
        };
      });
    },
    //申请仲裁员或者提款
    async sq_zcy_ajax(){
      var dq = this;
      if (this.sq_zc_data['signDefualt'] == 1) {
        if (this.sq_zc_data['je'] == 0) {
          return;
        }
        if (this.sq_zc_data['je'] > this.sq_zc_data['info']['user_bzj']) {
          return;
        }
        if (this.sq_zc_data['info']['suo'] == 1) {
          dq.$confirm('冻结中, 不能提现！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {}).catch(() => {});
          return;
        }
        var tk_je = Number(this.sq_zc_data['je']) * (10**bzjnum);
        //执行提款AJAX exitArb
        ArbOne.methods.exitArb(address+"",tk_je+"").send({from:address});
      }else{
        if (this.sq_zc_data['info']['cg_zcid'] != 0) {
          alert('已报名');
          return;
        }
        if (this.sq_zc_data['je'] <= 0) {
          return;
        }
        var lea = await ArbOne.methods.lea().call();
        lea = Number(lea) / (10 ** 6);
        if (this.sq_zc_data['je'] < lea) {
          console.log(lea);
          return;
        }
        //查询授权状态与GAZ余额
        var gaz_sq = await GazConn.methods.allowance(address+"",config['hyue'][config['key']]['ArbOne']['heyue']).call();
        var gaz_sqa = Number(gaz_sq) / (10**bzjnum);
        if (gaz_sqa < this.sq_zc_data['je']) {
          //需要先授权
          this.$confirm('GAZ授权余额不足, 是否授权?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            GazConn.methods.approve(config['hyue'][config['key']]['ArbOne']['heyue']).send({from:address},()=>{
              Gazis();
            });
          }).catch(() => {});
          return;
        }

        add_sq_ajax();
        
      }


      //轮询检测授权是否成功
        function Gazis() {
          GazConn.methods.allowance(address+"",config['hyue'][config['key']]['ArbOne']['heyue']).call((err,ret)=>{
            if ((Number(ret) / (10**bzjnum)) > gaz_sqa) {
              add_sq_ajax();
            }else{
              setTimeout(() => {
                Gazis();
              }, 3000);
            }
          });
        }

        //提交申请
        function add_sq_ajax() {
          var num = Number(dq.sq_zc_data['je']) * (10**bzjnum);
          //执行报名 arbApply
          ArbOne.methods.arbApply(num+"").send({
            from:address
          },(err,ret)=>{
            console.log(ret);
          });
        }
    },
    //执行
    async zhixingajax(){
      // exAss 先查询user what
      var user = await ArbOne.methods.user(this.dyl_zc['did']+"").call();
      ArbOne.methods.exAss(this.dyl_zc['did']+"",user['what']).send({from:address});
    },
    //赞成提交
    agree() {
      ArbOne.methods.arbAsse(this.dyl_zc.did+"",this.dyl_zc.what+"").send({
        from:address
      },(err,ret)=>{
        console.log(ret);
      });
    },


    //第二轮报名
    async derlunbaomingajax(row){
      var 订单详情 = row;
      this.deldata['dialogcode'] = true;
      this.deldata['data'] = 订单详情;
      var 仲裁详情 = await ArbTwo.methods.arbs(订单详情['did']).call();
      var 报名人数列表 = await ArbTwo.methods.applySuceed(订单详情['did']).call();
      if (仲裁详情) {
        //查询最多人数
        var 总人数 = await ArbTwo.methods.neg().call();
        this.deldata['renshunum'] = 总人数;
        //查询我的昵称
        this.deldata['myuser']['user'] = address;
        var 我的名字 = await ArbOne.methods.message(address,"0").call();
        this.deldata['myuser']['name'] = 我的名字 ? Base64.decode(我的名字):'暂未设置';
        this.deldata['Arbs'] = 仲裁详情;
        var 人员列表 = [];
        for (let index = 0; index < 报名人数列表[0].length; index++) {
          if (报名人数列表[0][index] != '0x0000000000000000000000000000000000000000') {
            人员列表.push(报名人数列表[0][index]);
          }
        }
        var 查询我是否报名 = 字母转小写(JSON.stringify(人员列表));
        if (查询我是否报名.indexOf(address) != -1) {
          this.deldata['ubmcode'] = true;
        }
        this.deldata['Uarr'] = 人员列表;
      }else{
        this.deldata['dialogcode'] = false;
      }
    },
    //第二轮报名提交
    async kaishibaomingajax(){
      var dq = this;
      dq.deldata.loading = true;
      var arber = await ArbOne.methods.arber(address).call();
      var peg = await ArbOne.methods.peg().call();
      var lock = await ArbOne.methods.lock(address).call();
      var balanceMar = await ArbOne.methods.balanceMar(address).call();
      var user = await ArbOne.methods.user(dq.deldata['data']['did']).call();
      if (this.deldata['Arbs']['arb'] == 3 && this.deldata['Arbs']['timd'] == 0) {
        if (arber <= peg && lock == 0 &&  Number(balanceMar) >= Number(user.mma)) {
          //获取加密字符串
          var arbTwoApply = await Arbdate.methods.arbTwoApply(address,this.deldata['Arbs']['timc']).call();
          //查询是否存在
          var slot = await ArbTwo.methods.slot(arbTwoApply).call();
          if (slot) {
            dq.$message.error('你已成功报名！');
            return;
          }

          ArbTwo.methods.arbTwoApply(this.deldata['data']['did']).send({from:address},(err,ret)=>{
            if (ret) {
              bmlxsql();
            }else{
              dq.deldata.loading = false;
              dq.$message.error('请点击确定！');
            }
          });
        }else{
          dq.deldata.loading = false;
          this.$message.error('已停止报名 - error-code：10003');
        }
        
      }else{
        dq.deldata.loading = false;
        this.$message.error('已停止报名 - error-code：10002');
      }
      //轮询查询是否报名成功
      async function bmlxsql() {
         var bmarr = await ArbTwo.methods.applySuceed(dq.deldata['data']['did']).call();
         var JSONS = 字母转小写(JSON.stringify(bmarr));
         if (JSONS.indexOf(address) != -1) {
            dq.$message({
              showClose: true,
              message: '你已成功报名'
            });
            dq.deldata.loading = false;
            dq.deldata['ubmcode'] = true;
         }else{
           setTimeout(() => {
             bmlxsql();
           }, 3000);
         }
      }
    }
  }
};
</script>