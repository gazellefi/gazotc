
<template>
  <div class="ddlistaa">
    <div class="hidden-xs-only content">
      <!-- 表格 -->
      <div class="listul" v-loading="loading">
        <el-table :fixed="true" :data="dataList" style="width: 100%; overflow: auto">
          <el-table-column align="center" :label="$t('message.Initiator')">
            <template slot-scope="scope">
              <div class="listul_user">
                <div class="listul_user_name">{{ scope.row.username }}</div>
                <div class="listul_user_zh">
                  {{ scope.row.address }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="orderId" :label="$t('message.arbitration.order')">
          </el-table-column>
          <el-table-column align="center" :label="$t('message.dapp.amount')">
            <template slot-scope="scope">
              {{ scope.row.num }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('message.securedAssets')">
            <template slot-scope="scope">
              {{ scope.row.assets }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="address" :label="$t('message.operation')">
            <template slot-scope="scope">
              <van-button type="primary" color="#fdc500" @click="openmairu(scope.row.orderId)" :disabled="scope.row.user_u">{{$t("message.details")}}</van-button>
            </template>
          </el-table-column>
		  <div slot="empty">
		  	<div style="padding-top: 20px;" class="f a_c c_c">
		  		<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
		  	</div>
		  	<p>{{$t('message.NoData')}}</p>
		  </div>
        </el-table>

        <div class="listul_load" v-if="dataList.length > 0">
          <div class="listul_load_an">
            <el-button @click="loadajax">{{$t('message.loadMore')}}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- wap显示 -->
    <div class="hidden-sm-and-up" style="background:#fff">
	  <!-- 列表 -->
      <div class="ddlist_w_ddlist" v-loading="loading">
        <div class="ddlist_w_ddlist_ul">
			<div v-if="dataList.length<1" class="fc a_c">
				<div style="padding-top: 20px;" class="f a_c c_c">
					<img src="@/assets/img/empty.png" alt="" width="130" height="85" />
				</div>
				<p style="margin-top: 20px; color: #DCDCDC;">{{$t('message.NoData')}}</p>
			</div>
          <div class="ddlist_w_ddlist_ul_li" v-for="(li, index) in dataList" :key="index">
            <div class="ddlist_w_ddlist_ul_li_u">
              <div class="ddlist_w_ddlist_ul_li_u_username">
                {{ li.username }} <br/>
				<!-- {{ li.address}} -->
              </div>
              <span>{{ li.address }}</span>
              <span class="price-lab" style="margin-left: auto">{{$t('message.arbitration.order')}}:{{ li.orderId }}</span>
            </div>
			<div class="listul_user_zh mart-10">
			  {{ li.user }}
			</div>
            <div class="ddlist_w_ddlist_ul_li_conn">
              <div class="ddlist_w_ddlist_ul_li_conn_li mart-5">
                <span>{{$t('message.dapp.amount')}}:&nbsp;{{ li.num }}</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_li mart-5">
                <span>{{$t('message.securedAssets')}}:&nbsp;{{ li.assets }}</span>
              </div>
              <div class="ddlist_w_ddlist_ul_li_conn_lit c_r mart-5">
                  <div class="ddlist_w_ddlist_ul_li_conn_li">
                    <van-button size="small" style="background-color: #FDC500;color: #fff;" @click="openmairu(li.orderId)" :disabled="li.user_u">{{ $t("message.details")}}</van-button>
                  </div>
              </div>
            </div>
          </div>
          <div class="ddlist_w_ddlist_ul_append" v-if="dataList.length > 0">
            <van-button plain type="primary" :disabled="load" @click="loadajax">{{$t('message.loadMore')}}</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tools from '@/api/public.js'
import Web3 from "web3"
import config from "@/config";

let Base64 = require("js-base64").Base64;

var Address = "";
var web3 = "";
var dotsconn;
var dotc_abi = config["hyue"][config["key"]]["Arbdate"]["abi"];
var dotc_heyue = config["hyue"][config["key"]]["Arbdate"]["heyue"];
var huobiarr = config["hbi"][config["key"]];
var fabiarr = config["fabi"][config["key"]];
var bzj_num = config["hyue"][config["key"]]["Bzj"]["num"];

//import VConsole from "vconsole";

	
export default{
  created() {
    this.body_h = document.documentElement.clientHeight;
    //new VConsole();
  },
  mounted() {
    var dq = this;
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	  dq.isphone = true;
	  this.formLabelWidth = '100px'
	} else {
	  dq.isphone = false;
	}
    var hbarr = config["hbi"][config["key"]];
    for (const key in hbarr) {
      // console.log(hbarr[key])
      if(hbarr[key].id=='Gaz'){
        hbarr[key].id='GAZ';
        this.hbarr.push(hbarr[key]);
      }else{
        this.hbarr.push(hbarr[key]);
      }
    }
    var fbarr = config["fabi"][config["key"]];
    for (const key in fbarr) {
      this.fbarr.push(fbarr[key]);
    }

    // 监测用户是否安装MASK
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		Address = id
		dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
		dq.getlist(dq.tcode, dq.huobi, dq.fabi);
	}).catch((err)=>{
		web3 = new Web3(config["hyue"][config["key"]]["Url"]);
		dotsconn = new web3.eth.Contract(dotc_abi, dotc_heyue);
		dq.getlist(dq.tcode, dq.huobi, dq.fabi);
		console.log(err);
	})
  },
  data() {
    return {
      hbarr: [],
      tcode: 1,
      huobi: "USDT",
      fabi: "CNY",
      fbarr: [],
      count: 20,
      loading: false,
      body_h: 0,
      dataList: [],
      load: false,
      visibleDialogShow: false,
      did: '',
	  isphone:false,
	  arrList:[],
    };
  },
  methods: {
	getLists(e){
		console.log(e)
		this.arrList=e;
		// this.dataList=e;
	},
    xuanzehuobi(e) {
      this.huobi = e;
    },
    xuanzefabi(e) {
      this.fabi = e;
    },
    openfabu() {
      this.$Jt.$emit("fabu_dd", 1);
    },
    openmairu(e) {
	  this.$router.push({ name: 'detail', query: { did: e } })
    },

    /*
            获取列表数据
        */
    getlist() {
      var dq = this;
      dq.loading = true;
      var dataList = [];
	  dotsconn.methods.general(dq.count).call((err,res)=>{
		  // console.log(res)
		  dq.loading = false;
		  if(res){
			  // 确定数据长度
			  let length = false
			  for(let i = 0 ; i < res[0].length; i++){
				  if(Number(res[0][i][1])!=0){
					  length = true
					  let arr = res[3][i].split("|")
					  let assets_res = res[1][i]
					  var assets = ''
					  var num = ''
					  for (const key in huobiarr) {
					    if (assets_res == huobiarr[key]["key"]) {
					      assets = huobiarr[key]["id"];
						  num = res[0][i][1] / (10 ** huobiarr[key]["num"])
					      break;
					    }
					  }
					  var obj = {
						  // nick
						  username: Base64.decode(arr[0]),
						  // address
						  address: res[2][i].slice(0, 5) + '...' + res[2][i].slice(res[2][i].length - 5, res[2][i].length),
						  addressAll: res[2][i],
						  // orderId
						  orderId: res[0][i][0],
						  // num
						  num,
						  // assets
						  assets
					  }
					  dataList.push(obj);
				  }
			  }
			  if(length){
				  dq.dataList = dataList
				  // console.log(dq.count);
			  }else{
				  // 没数据
				  // dq.count -= 20;
				  console.log(dq.count);
			  }
		  }
	  })
    },

    loadajax() {
      if (this.loading) {
        return;
      }
      var dq = this;
      dq.loading = true;
	  if(dq.dataList.length>dq.count){
	  	dq.count += 20;
	  }
	  dq.getlist()
    },
	// 自定义表头 （保证金）
	marginNav(h,{column,$index}){
		let str = this.$t("message.arbitration.margin")
		let str1 = this.$t("message.arbitration.marginBalance")
		return h('div', [
		                h('span', str),
		                h(
		                    'el-tooltip',
		                    {
		                        props: {
		                            effect: 'dark',
		                            content: str1,
		                            placement: 'top',
		                        },
		                    },
		                    [
		                        h('i', {
		                            class: 'el-icon-question',
		                            style: 'color:#409eff;margin-left:5px;',
		                        }),
		                    ],
		                ),
		            ]);
	},
	// 自定义表头 （保证金比例）
	asknNav(h,{column,$index}){
		let str = this.$t("message.dapp.blandAsk")
		let str1 = this.$t("message.arbitration.payMar1")
		return h('div', [
		                h('span', str),
		                h(
		                    'el-tooltip',
		                    {
		                        props: {
		                            effect: 'dark',
		                            content: str1,
		                            placement: 'top',
		                        },
		                    },
		                    [
		                        h('i', {
		                            class: 'el-icon-question',
		                            style: 'color:#409eff;margin-left:5px;',
		                        }),
		                    ],
		                ),
		            ]);
	},
	
  },
};
</script>

<style lang='less' scoped>
.ddlistaa {
  width: auto;
  margin: 0 auto;
  // background-color: #fff;
  height: 100%;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
.ddlistaa_head {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 10px;
  background-color: #fff;
  .left {
    display: flex;
    .sell {
      background: #FFFFFF;
	  border: 1px solid #DCDCDC;
    }
    .purchase {
      background: #FFFFFF;
	  border: 1px solid #DCDCDC;
    }
	.bg{
		background: #0f79f1;
		color: #fff;
		border: none;
	}
  }
  .right {
    display: flex;
    .saixuan {
      margin-left: 15px;
      height: 30px;
      display: flex;
      align-items: center;
    }
  }
}

.listul {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .el-table {
    flex: 1;
    overflow: auto;
  }
}

.lxfsarr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 180px;
  overflow: hidden;
}
.lxfsarr_item {
  font-size: 24px;
}
.danjia {
  color: #339b98;
  font-weight: 900px;
  font-size: 14px;
}

button.anniu {
  width: 120px;
}

.ddlistaa_head_item {
  display: flex;
  border: 1px solid rgb(231, 230, 230);
  padding: 5px;
}
.ddlistaa_head_item_a {
  width: 75px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  /* opacity: 0.5; */
  margin-right: 10px;
  color: #ccc;
}
.ddlistaa_head_item_a.ac {
  // background-color: #2ead65;
  font-size: 14px;
  opacity: 1;
  color: #fff;
}
.ddlistaa_head_item_a.acc {
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
}

.el-dropdown-link {
  padding: 0 15px;
}

.ddlistaa_head_item.fabu {
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  margin-right: 0;
  border: 0;
}
.ddlistaa_head_item_an {
  margin-left: auto;
}

/* wap布局 */
.ddlist_w_head {
  display: flex;
  height: 50px;
  align-items: center;
  margin: 0 15px;
}
.ddlist_w_head_a {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.ddlist_w_head_a_item {
  margin-left: 15px;
  font-size: 15px;
}
.ddlist_w_head_a_item.ac {
  font-size: 24px;
  color: #2ead65;
}
.ddlist_w_head_b {
  margin-left: auto;
  font-size: 15px;
  min-width: 150px;
  text-align: right;
}

.ddlist_w_huobilist {
  line-height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /deep/.saixuan {
    display: flex;
    align-items: center;

    .el-select {
      width: 80px !important;
    }
  }
}
.ddlist_w_huobilist_ul {
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.ddlist_w_huobilist_ul_li {
  float: left;
  padding: 15px;
  text-align: center;
  position: relative;
  font-size: 14px;
}
.ddlist_w_huobilist_ul_li.ac {
  padding-bottom: 10px;
  color: #2ead65;
}
.ddlist_w_huobilist_ul_li.ac::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #2ead65;
  left: calc((100% - 40px) / 2);
  right: 0;
}

.ddlist_w_ddlist {
  width: 100%;
  margin-top: 15px;
}
.ddlist_w_ddlist_ul {
  display: flex;
  margin: 0 15px;
  flex-direction: column;
}
.ddlist_w_ddlist_ul_li {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.ddlist_w_ddlist_ul_li_u {
  display: flex;
  flex-direction: row;
  /* height: 50px; */
  align-items: center;
}
.ddlist_w_ddlist_ul_li_u_username {
  font-size: 16px;
}
.ddlist_w_ddlist_ul_li_u span {
  margin-left: 5px;
  opacity: 0.5;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn {
  display: flex;
  flex-direction: column;
}
.ddlist_w_ddlist_ul_li_conn_li {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn_lit {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-size: 14px;
}
.ddlist_w_ddlist_ul_li_conn_li span.price-lab {
  margin-left: auto;
  padding-top: 5px;
}
.ddlist_w_ddlist_ul_li_conn_li span.price-lab.jiage {
  font-size: 16px;
  color: #2ead65;
  font-weight: 900;
}
.ddlist_w_ddlist_ul_li_conn_li button {
  margin-left: auto;
  margin-top: 15px;
}
.listul_user {
  display: flex;
  flex-direction: column;
}
.listul_user_name {
  font-size: 16px;
}
.listul_user_conn {
  padding: 2px 0;
}
.listul_user_zh {
  opacity: 0.5;
  font-size: 14px;
}

.listul_load_an {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
}

.ddlist_w_ddlist_ul_append {
  display: flex;
  margin: 15px 0;
  justify-content: center;
}
div{
	/deep/ .tooltip_nav{
		border: none;
		padding: 0;
	}
}
</style>