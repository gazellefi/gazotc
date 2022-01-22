
<template>
  <el-row type="flex"  justify="center">
	  <el-col :sm="24" :md="12" :lg="8">
		<div class="fabu">
		  <!-- 表单 -->
		  <div class="add111">
		    <div class="add_form">
		      <div class="add_form_item_xuanze c_b">
		        <div class="add_form_item xz" style="margin: 0;width: 100%;">
				  <div class="add_form_item_t">{{$t('message.securedAssets')}}</div>
		          <div class="add_form_item_input">
		            <el-select v-model="pro" placeholder="Please select" :disabled="user['user'] ? false:true"  style="width: 100%;">
		              <el-option v-for="item in data['huobi']" :key="item.id" :label="item.id" :value="item.id">
		              </el-option>
		            </el-select>
		          </div>
		        </div>
		      </div>
		      <div class="add_form_item">
		        <div class="add_form_item_t">{{$t('message.dapp.guaranteeAmount')}}</div>
		        <div class="add_form_item_input">
		          <el-input :placeholder="$t('message.enterAmount')" v-model="form.num" :disabled="user['user'] ? false:true"></el-input>
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] > 0">
		          {{$t('message.exceedTips')}}（{{user['num']}}）, {{$t('message.rechargeTips1')}}
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.zcye && user['num'] <= 0">
		          {{$t('message.rechargeTips')}}
		        </div>
		        <div class="add_form_item_input errormsg" v-if="isform.num">
		          {{$t('message.contEmpty')}}
		        </div>
		      </div>
			  <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.FinancingParty')}}</div>
				 <div class="add_form_item_input f c_a" style="padding: 10px 0">
					<el-radio v-model="radio" label="0x73616c6500000000000000000000000000000000000000000000000000000000">{{$t('message.Initiator')}}</el-radio>
					<el-radio v-model="radio" label="0x6275790000000000000000000000000000000000000000000000000000000000">{{$t('message.Receiver')}}</el-radio>
				 </div>
				 
			   </div>
			  
		      <div class="add_form_item">
		        <div class="add_form_item_t">{{$t('message.SponsorMargin')}}</div>
		        <div class="add_form_item_input">
		          <el-input :placeholder="$t('message.enterMargin')" v-model="form.defaultMar" :disabled="true">
		            <template slot="append">
						<div style="width: 40px;text-align: center;">
							%
						</div>
					</template>
		          </el-input>
		        </div>
				<div class="add_form_item_input errormsg" v-if="form.num" style="color: #0d92f1;">
				  {{(form.num * (form.defaultMar / 100) / (pros.pri / 10**6)).toFixed(2) + ' Gaz'}}
				</div>
		      </div>
			  <div class="add_form_item">
			    <div class="add_form_item_t">{{$t('message.RecipientDeposit')}}</div>
			    <div class="add_form_item_input">
			      <el-input :placeholder="$t('message.enterMargin')" v-model="form.mar">
			        <template slot="append">
						<div style="width: 40px;text-align: center;">
						%
						</div>
					</template>
			      </el-input>
			    </div>
				<div class="add_form_item_input errormsg" v-if="form.sjbzj && form.num" style="color: #0d92f1;">
				  {{form.sjbzj + ' Gaz'}}
				</div>
			  </div>
			  <div class="add_form_item">
			    <div class="add_form_item_t">{{$t('message.Receiver')}}</div>
			    <div class="add_form_item_input">
			      <el-input :placeholder="$t('message.enterAdress')" v-model="form.dj">
			      </el-input>
			    </div>
			  </div>
		     <div class="add_form_item">
		        <div class="add_form_item_t">{{$t('message.ContractContent')}}</div>
		        <div class="add_form_item_input">
		          <el-input type="textarea" :placeholder="$t('message.enterContract')"  v-model="form.content" @blur="changeIsfc">
		          </el-input>
		        </div>
		      </div>
			  <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.ContractHash')}}</div>
			     <div class="add_form_item_input"  style="padding: 10px 0;word-break: break-word;">
			       <span class="c9 fz12">{{form.hash || $t('message.enterContract')}}</span>
			     </div>
			   </div>
			   <div class="add_form_item">
			     <div class="add_form_item_t">{{$t('message.remarks')}}</div>
			     <div class="add_form_item_input">
			       <el-input type="textarea" :placeholder="form.beizhu?form.beizhu:$t('message.notFill')" :disabled="maskDis" v-model="form.beizhu">
			       </el-input>
			     </div>
			     <p class="add_form_item_input_p" @click="maskDis = false" v-if="maskDis">
			   					<span class="cursor">{{$t('message.editremarks')}}</span>
			   				</p>
			   				<p class="add_form_item_input_p" v-else>
			   					<span class="cursor" @click="setNote">{{$t('message.complete')}}</span>
			   					<span class="marl-10 cursor" @click="maskDis = true">{{$t('message.return')}}</span>
			   				</p>
			   </div>
		      <el-button type="primary" style="margin-top: 30px;background:#fdc500;border:0" @click="tijiao" :disabled="isform.zcye ? true : user.user == '' ? true : false">{{$t('message.sumbmit')}}</el-button>
		      <br />
		    </div>
		  </div>
		</div> 
	  </el-col>
  </el-row>

</template>
<script>
import {create} from 'ipfs-core' //或 import {create} from 'ipfs-core'
import config from "@/config";
import tools from '@/api/public.js'
let Base64 = require('js-base64').Base64;
import { Dialog, Toast, Notify } from 'vant';
// import VConsole from "vconsole";
// new VConsole();
var ipfs
//公共变量
var web3 = "";
var address = "";
var ethereum = window.ethereum;

//定义新版相关配置
var dotc_abi = config['hyue'][config['key']]['dotc']['abi'];
var dotc_key = config['hyue'][config['key']]['dotc']['heyue'];
var huobi = config['hbi'][config['key']];
var fabi = config['fabi'][config['key']];
var huobi_arr = [];
var fabi_arr = [];
for (const key in huobi) {
  huobi_arr.push(huobi[key]);
}
for (const key in fabi) {
  fabi_arr.push(fabi[key]);
}
export default {
  //初始化WEB3
  created() {
    var dq = this;
	ipfs = create()
	// 监测用户是否安装MASK
	tools.testMASK().then(res=>{
		let {web,id} = res
		web3 = web
		address = dq.user['user'] = id
		var zichepros = config['hbi'][config['key']]['USDT']['key'];
		// console.log(zichepros)
		dq.getpros(zichepros)
	}).catch((err)=>{
		console.log(err);
	})
  },
  async beforeDestroy(){
	  // 关闭 ipfs 链接
	  const ipfs_n = await ipfs;
	  ipfs_n.stop()
  },
  mounted() {
    Toast.setDefaultOptions({
      overlay: true,
      forbidClick: true,
      closeOnClick: false,
      closeOnClickOverlay: false,
      duration: 0,
      getContainer: 'body'
    });
  },
  data() {
    return {
	  radio: '0x73616c6500000000000000000000000000000000000000000000000000000000',
      pro: huobi_arr[0]['id'],
      fi: fabi_arr[0]['id'],
      data: {
        huobi: huobi_arr,
        fabi: fabi_arr
      },
	  maskDis: true,

      //用户数据
      user: {
        user: '',
        balancemar: 0,
        balancepro: 0,
        num: 0
      },
	  pros: {
	    one: '',
	    uni: '',
	    pri: '',
	    mar: '',
	    rati: '',
	  
	  },

      hbi: {
        pri: 0, //保证金单价
        mara: 0,
        uni: 0,
        rati: 0,
        one: 0
      },

      //验证
      isform: {
        dj: false,
        zcye: false,
        num: false,
        sjbzj: false,
        zd_num: false,
        zg_num: false,
        user_bzj: false
      },
      //表单
      form: {
        dj: '',
        num: '',
		recipient: '',
        sjbzj: '',
		defaultMar: '20',
        zd_num: '',
        zg_num: '',
        user_bzj: '',
        beizhu: '',
		content: '',
		hash: '',
		mar_Gaz: '',
      },

      sq_code: 0, //0默认 1余额大于1 2直接授权
    }
  },
  //数据监听
  watch: {
    'm'() {
      //初始化表单
	  this.form = Object.assign(this.form,{
        dj: '',
        num: '',

        sjbzj: '',
        zd_num: '',
        zg_num: '',
        user_bzj: ''
      })
      this.isform = {
        dj: false,
        zcye: false,
        num: false,
        sjbzj: false,
        zd_num: false,
        zg_num: false,
        user_bzj: false
      }
    },
    'user.user'(e) {
      var dq = this;
      //读取会员资料
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
      dotsconn.methods.message(e + "", '6').call((err, ret) => {
        if (ret) {
          dq.form.beizhu = Base64.decode(ret);
        }
      });
      //获取查询条件所需数据
      dotsconn.methods.pri().call((err, ret) => {
        if (ret) {
          dq.hbi['pri'] = ret;
        }
      });
      dotsconn.methods.mara().call((err, ret) => {
        if (ret) {
          dq.hbi['mara'] = ret;
        }
      });
      var cpro = config['hbi'][config['key']][dq.pro]['key'];
      dotsconn.methods.pros(cpro).call((err, ret) => {
        if (ret) {
          dq.hbi['uni'] = ret['uni'];
          dq.hbi['rati'] = ret['rati'];
          dq.hbi['one'] = ret['one'];
        }
      });
      var zicheyue = config['hbi'][config['key']][dq.pro]['heyue'];
      // 如果发布卖单
      dotsconn.methods.balancemar(e).call((err, balancemar) => {
        //保证金
        if (balancemar) {
          var balancemarb = Number(balancemar);
          dotsconn.methods.balancepro(e, zicheyue).call((errb, balancepro) => {
            //用户资产余额
            if (balancepro) {
              var balanceprob = Number(balancepro);
              dq.user['balancepro'] = balanceprob;
              dq.user['balancemar'] = balancemarb;
            }
          });
        }
      });
    },
    // 'form.dj'(e) {
    //   if (!e || e == 0) {
    //     this.isform['dj'] = true;
    //   } else {
    //     this.isform['dj'] = false;
    //   }
    //   var result = e.indexOf(".");
    //   if (result != -1) {
    //     var eaa = e.substr((e.indexOf(".") + 1), e.length);
    //     if (eaa.length > 2) {
    //       var ea = parseFloat(e);
    //       this.form.dj = ea.toFixed(2);
    //     }
    //   }
    //   if (e && this.form.num) {
    //     this.jsbzj();
    //   }
    // },
    'form.num'(e) {
		var dq = this
		this.form.zd_num = e
		this.form.zg_num = tools.getnume(8888 * (10 ** 26))
		// console.log(this.form.zg_num)
		if(!this.form.mar){
			return
		}else{
			//计算保证金
			this.form.sjbzj = (this.form.num * (this.form.mar / 100) / (this.pros.pri / 10**6)).toFixed(2)
			var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
			if ((dq.user['balancemar'] / (10 ** bzj_num)) >= this.form.sjbzj) {
			  dq.isform['sjbzj'] = false;
			} else {
			  dq.isform['sjbzj'] = true;
			}
		}
    },
    'form.mar'(e) {
		var dq = this
		
	  this.pros.mar = tools.getnume(this.form.mar * 10 **18)
	  
      if(!this.form.num){
		  return
	  }else{
		function mul(x, y) {
		  var z = x * y;
		  return z;
		}
		//计算保证金
		this.form.sjbzj = (this.form.num * (this.form.mar / 100) / (this.pros.pri / 10**6)).toFixed(2)
		var bzj_num = config['hyue'][config['key']]['Bzj']['num'];
		if ((dq.user['balancemar'] / (10 ** bzj_num)) >= this.form.sjbzj) {
		  dq.isform['sjbzj'] = false;
		} else {
		  dq.isform['sjbzj'] = true;
		}
	  }
	  
	  
    },
    // 'form.user_bzj'(e) {
    //   if (!e || e == 0) {
    //     this.isform['user_bzj'] = true;
    //   } else {
    //     this.isform['user_bzj'] = false;
    //   }
    //   var result = e.indexOf(".");
    //   if (result != -1) {
    //     var eaa = e.substr((e.indexOf(".") + 1), e.length);
    //     if (eaa.length > 2) {
    //       var ea = parseFloat(e);
    //       this.form.user_bzj = ea.toFixed(2);
    //     }
    //   }
    // },
    'pro'(e) {
      var dq = this;
      //读取会员资料
      var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
      //获取查询条件所需数据
      dotsconn.methods.pri().call((err, ret) => {
        if (ret) {
          dq.hbi['pri'] = ret;
        }
      });
      dotsconn.methods.mara().call((err, ret) => {
        if (ret) {
          dq.hbi['mara'] = ret;
        }
      });
      var zichepros = config['hbi'][config['key']][e]['key'];
      dotsconn.methods.pros(zichepros + "").call((err, ret) => {
        if (ret) {
          dq.hbi['uni'] = ret['uni'];
          dq.hbi['rati'] = ret['rati'];
          dq.hbi['one'] = ret['one'];
        }
      });
      var zicheyue = config['hbi'][config['key']][e]['heyue'];
      // 如果发布卖单
      dotsconn.methods.balancemar(dq.user['user']).call((err, balancemar) => {
        //保证金
        if (balancemar) {
          var balancemarb = Number(balancemar);
          dotsconn.methods.balancepro(dq.user['user'], zicheyue).call((errb, balancepro) => {
            //用户资产余额
            if (balancepro) {
              var balanceprob = Number(balancepro);
              dq.user['balancepro'] = balanceprob;
              dq.user['balancemar'] = balancemarb;
            }
          });
        }
      });
	  // console.log(zichepros)
	  dq.getpros(zichepros)
	  
    }
  },
  methods: {
    //数字保留两位数
    getnumsing(num) {
      let numStr = num.toString()
      let index = numStr.indexOf('.')
      let result
      if (index != -1) {
        result = numStr.slice(0, index + 3);
      } else {
        result = num;
      }

      return Number(result);
    },
    tijiao() {
      if (!this.form['num']) {
        return;
      }
      if (!this.form['zd_num']) {
        return;
      }
      if (!this.form['zg_num']) {
        return;
      }
      if (!this.form['mar']) {
        return;
      }
	  // 保证金不能大于 100%
      if (Number(this.form['mar']) > 100) {
        Notify({ type: 'warning', message: this.$t('message.NotCannotDesposit') });
        return;
      }
      var dq = this;
	  // console.log(dq.isform.sjbzj)
	  // return
      if (dq.isform.sjbzj) {
        Dialog.confirm({
          title: dq.$t('message.prompt'),
          message: this.$t('message.MarginLowTips'),
          confirmButtonText: this.$t('message.SupMargin'),
          cancelButtonText: this.$t('message.dapp.ReleaseOrder'),
          cancelButtonColor: '',
          getContainer: 'body'
        })
          .then(() => {
			  // 此处要加个保证金
            dq.$router.push('/home/wallet/legalCoinWallet');
          })
          .catch(() => {
            isdingdan();
          });

        return;
      }
      isdingdan();

      function isdingdan() {
		var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
        //监听订单发布结果
        dotsconn.events.Merch("", (err, ret) => {
          console.log(err, ret)
          //结果
          if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
            Toast.clear();
            dq.sq_code = 0;
            //判断是购买还是出售
            if (dq.radio == '0x6275790000000000000000000000000000000000000000000000000000000000') {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            } else {
              Dialog.alert({
                title: 'Published successfully',
                message: 'The order number is:' + ret['returnValues']['order'] + '',
              }).then(() => {
                window.location.reload();
              });
            }

          }
        });
		getOrder()
        function getOrder(){
        	dotsconn.events.Taker("", (err, ret) => {
        	  //结果
        	  if (ret['returnValues']['owner'].toLowerCase() == dq.user['user']) {
        	    Toast.clear();
        	    dq.sq_code = 0;
        	    //判断是购买还是出售
        	    if (dq.radio == '0x6275790000000000000000000000000000000000000000000000000000000000') {
        	      Dialog.alert({
        	        title: 'Published successfully',
        	        message: 'The order number is:' + ret['returnValues']['order'] + '',
        	      }).then(() => {
        	        window.location.reload();
        	      });
        	    } else {
        	      Dialog.alert({
        	        title: 'Published successfully',
        	        message: 'The order number is:' + ret['returnValues']['order'] + '',
        	      }).then(() => {
        	        window.location.reload();
        	      });
        	    }
        	  }
        	});
        };
        Toast.loading({
          message: '提交中。。。',
          forbidClick: true,
          loadingType: 'spinner',
        });
        addajax();
      }
      //Release order
      function addajax() {
        Toast.loading({
          message: '请确认提交内容。。。',
          forbidClick: true,
          loadingType: 'spinner',
        });
		//  交易币种 key
        var postpro = ''
		// 交易哈希
        var postfi = dq.form.hash_s;
        var postd = '';
        var posta = '';
        var postb = '';
        var postc = '';
		//  几个 0
        var num_bs = 0;
		// 输入的 保证金比例  form.mar
		let mar = tools.getnume(dq.form.mar * (10 ** 16))
		
		for (let index = 0; index < huobi_arr.length; index++) {
		  if (huobi_arr[index]['id'] == dq.pro) {
		    num_bs = huobi_arr[index]['num'];
		    postpro = huobi_arr[index]['key'];
		    break;
		  }
		}
		//  接受方地址
        postd = dq.form['dj'].length>10 ? dq.form['dj'] : 0;
		// 交易数量
        posta = tools.getnume(dq.form['num'] * (10 ** num_bs));
		// 最小值
        postb = posta
		// 最大值
        postc = dq.form['zg_num']
		var dotsconn = new web3.eth.Contract(dotc_abi, dotc_key);
		// console.log(postpro)
		// console.log(dq.radio)
		// console.log(posta)
		// console.log(postb)
		// console.log(postc)
		// console.log(postfi)
		// console.log(postd)
		// console.log(mar)
		// return
        dotsconn.methods.setMerch(
          postpro,
          dq.radio,
          posta,
          postb,
          postc,
          postfi,
          postd,
          mar
        ).send({
          from: dq.user['user']
        }, (err, ret) => {
          console.log(err, ret, dq.user['user'])
          if (!ret) {
            Toast.clear();
            Toast({
              message: '请点击授权！',
              icon: 'cross',
              duration: 2000
            });
          } else {
            Toast.clear();
            Toast.loading({
              message: '发布订单中...',
              forbidClick: true,
              loadingType: 'spinner',
            });
            setTimeout(() => {              
				Toast.clear();
                Dialog.alert({
                title: '发布成功',
                message: '可以在我的订单页面修改',
              }).then(() => {
                // this.$router.push('./ddguanli');
              });
            }, 5000);
          }
        });
      }
    },
	// 合同 哈希
	async changeIsfc(e){
		const ipfs_n = await ipfs;
		let str = e.target.value
		if(!str) return
		try {
		  const added = await ipfs_n.add({
			  content: str,
			  mode: 'string', // implicit if not provided - 0644 for files, 0755 for directories
			});
		   let hash = added.cid.toString()
			// 获取上传文件hash值
			this.form.hash = 'https://ipfs.io/ipfs/' + hash;
			// 字符串到 Bytes32 和 Bytes32 到字符串。
			// Bytes32 的长度为 64 字节，字符串的最大长度为 32 个字符。
			this.form.hash_s = web3.utils.toHex(hash.substring(0,31))
			// 检测 释放为16进制字符串
			// console.log(web3.utils.isHexStrict(this.form.hash_s))
			
			console.log(this.form.hash_s)
			// 转回来
			// console.log(web3.utils.toUtf8(this.form.hash_s))
		} catch (err) {
			console.error(err);
		}
	},
	//查询 pros pri
	getpri() {
	  var pricon = new web3.eth.Contract(dotc_abi, dotc_key);
	  var dq = this
	  pricon.methods.pri().call((err, result) => {
	    dq.pros['pri'] = result;
		// console.log(dq.pros)
	  })
	},
	//pros
	getpros(zicheyue) {
	  var dq = this
	  var contracts = new web3.eth.Contract(dotc_abi, dotc_key);
	  contracts.methods.pros(zicheyue + "").call((err, result) => {
	    dq.pros['one'] = result['one'];
	    dq.pros['uni'] = result['uni'];
	    dq.pros['rati'] = Number(result['rati']);
	    dq.getpri();
	  })
	},
	// 提交 备注修改
	setNote(){
			  var that = this
			  var loading = Toast.loading({
			    message: '修改中... ',
			    closeOnClick: false,
			    closeOnClickOverlay: false,
			    loadingType: 'spinner',
			    getContainer: "body",
			    duration: 0
			  });
			  var beizhucon = new web3.eth.Contract(config['hyue'][config['key']]['dotc']['abi'], config['hyue'][config['key']]['dotc']['heyue']);
			  beizhucon.methods.commun(6 + "", Base64.encode(that.form.beizhu + "")).send({
			    from: address
			  }, (err, ret) => {
			    if (ret && !err) {
			      loading.clear();
				  that.maskDis = true
			      Dialog.alert({
			        title: that.$t('message.prompt'),
			        message: that.$t('message.success'),
			      }).then(() => {
			        // on close
			      });
			    } else {
			      loading.clear();
				  that.maskDis = true
			      Dialog.alert({
			        title: that.$t('message.prompt'),
			        message: that.$t('message.failed'),
			      }).then(() => {
			        // on close
			      });
			    }
			  
			  });
	}
  }
}
</script>

<style lang="less">
.fabu {
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  overflow: auto;
}
.fabu_head {
  width: calc(100% - 30px);
  height: 70px;
  font-size: 16px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fabu_head i {
  margin-left: auto;
  font-size: 20px;
}

.fabu_tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edf0fa;
  padding: 10px;
}
.fabu_tab_item {
  opacity: 0.5;
  transition: all 0.3s;
  text-align: center;
  flex: 1;
  cursor: pointer;
  line-height: 40px;
}
.fabu_tab_item.ac {
  opacity: 1;
  color: rgb(51, 75, 211);
  font-size: 22px;
  background: #fff;
}

/* 表单 */
.add111 {
  width: 100%;
  flex: 1;
  overflow: auto;
}

.add_form {
  display: flex;
  flex-direction: column;
}

.add_form_item {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.add_form_item_input {
  margin-top: 10px;
}
.add_form_item_input textarea {
  margin-top: 10px;
}

.add_form_item_xuanze {
  display: flex;
  flex-direction: row;
}

.add_form_item.xz {
  margin-left: 15px;
}

.errormsg {
  font-size: 14px;
  color: #f33;
}

.add_form_item_input_p {
  padding-top: 10px;
  font-size: 12px;
  color: #409eff;
}
.el-textarea{
	textarea{
		min-height: 100px !important;
	}
}
</style>