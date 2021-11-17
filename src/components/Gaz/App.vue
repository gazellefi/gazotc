<template>
  <div id='app'>
    <div class="hidden-sm-and-up">
      <!-- 最顶部 -->
      <div class="Top">
        <div class="topDate">
          <van-icon @click="$router.push('/')" style="margin-top:2px" name="arrow-left" />
          <div class="left">GAZ crowdfunding</div>
          <div class="right">
            <div class="tips">
              Remaining until the end of the first round:
            </div>
            <div class="time">
              {{countdown.d}}<span>d</span>{{countdown.h}}<span>h</span>{{countdown.m}}<span>m</span>{{countdown.s}}<span>s</span>
            </div>
          </div>
        </div>
        <div class="midMoney">
          <div class="num">{{crowdTotal}}</div>
          <div class="rightTips">USDT</div>
          <div class="state">Raised funds</div>
        </div>
        <div class="info">
          <div class="itemTop" v-for="(v,i) in  TopinfoitemToplist" :key="i">
            <div class="value"> {{v.value}}</div>
            <div class="key"> {{v.key}}</div>
          </div>
          <div class="rightTips">USDT</div>
        </div>
      </div>
      <!-- 众筹轮次 -->
      <div class="Rounds">
        <Title title="Crowdfunding rounds"></Title>
        <table>
          <tr>
            <th></th>
            <th>Quantity (10000 pieces)</th>
            <th>Price(U)</th>
          </tr>
          <tr v-for="v in tableData" :key="v.name">
            <td>{{v.date}}</td>
            <td>{{v.name}}</td>
            <td>{{v.address}}</td>
          </tr>

        </table>
        <div class="info">
          <div class="one"><span>Current crowdfunding rounds：</span>Second round</div>
          <div class="one"><span>Subscription start time：</span>{{startSubscriptionTime}}</div>
          <div class="one"><span>Closing time：</span>{{endSubscriptionTime}}</div>
        </div>
      </div>
      <!-- 认购条件 -->
      <div class="condition">
        <Title title="Subscription conditions"></Title>
        <div class="listItem" v-for="(v,i) in conditionData" :key="i">{{v}}</div>
        <div class="countryList">{{countryList}}</div>
        <div class="other">Users from other countries are invited to participate in the project in compliance with their national laws</div>
      </div>
      <!-- 风险提示 -->
      <div class="RiskTips">
        <Title title="Risk statement"></Title>
        <div class="listItem" v-for="(v,i) in RiskTipsList" :key="i">
          <div v-html="v"></div>
          <van-button class="listItemBtn" v-show="i==2" size="mini" @click="$router.push('/suc')" type="primary">Order Search</van-button>
        </div>
        <!-- <div class="OrderSearch">
          <van-button size="mini" @click="$router.push('/suc')" type="primary">Order Search</van-button>
        </div> -->
        <div class="formContent" @failed="onFailed">
          <van-form label-width="96px">

            <div class="line2">
              <van-field clearable :border="true" v-model="form.a" name="a" label="Invitation code:" :rules="[{validator, required: true, message }]" />
              <div class="getSub" @click="getSub" size="mini" type="primary">verify</div>
            </div>

            <van-field v-model="form.b" class="readonly" readonly name="b" label="Maximum limit:" :rules="[{validator, required: true, message: 'Maximum limit is required' }]" />
            <van-field @blur="blurFn" clearable v-model="form.c" name="c" label="Claim limit:" :rules="[{validator, required: true, message: 'Claim limit is required' }]" />
            <van-field v-model="UsdtpayableValue" class="readonly" readonly name="d" placeholder="Please fill in first Claim limit" label="Usdt payable:" :rules="[{validator,required: true, message: 'Usdt payable limit is required' }]" />

            <div class="copy2">
              <van-field @click="copy" ref="copy" v-model="form.e" :class="['copy','readonly']" readonly name="e" label="Crowdfunding trc20 address:" :rules="[{ validator,required: true, message: 'Crowdfunding trc20 address is required' }]" />
              <van-icon @click="copy" name="label" class="label" />
            </div>

            <div class="formtips">
              *The Crowdfunding address cannot be the exchange address
            </div>
            <div class="add">
              <div class="line">
                <van-field clearable class="num" v-model="shoubiAddrNumObj.address" name="h" label="Receiving BEP20 address:" :rules="[{validator, required: true, message: 'Receiving BEP20 address is required' }]" />
                <van-icon @click="addshoubiAddrNumObj" name="add" color="#1989fa" />
              </div>
              <van-field clearable class="num" v-model="shoubiAddrNumObj.num" name="i" label="Number:" :rules="[{validator, required: true, message: 'Number is required' }]" />
            </div>
            <div class="add" v-for="(v,i) in shoubiAddrNumList" :key="i">
              <div class="line">
                <van-field clearable class="num" v-model="v.address" name="f" label="Receiving BEP20 address:" :rules="[{validator, required: true, message: 'Receiving BEP20 address is required' }]" />
                <van-icon @click="delshoubiAddrNumObj(v,i)" name="clear" color="#1989fa" />
              </div>
              <van-field clearable class="num" v-model="v.num" name="g" label="Number:" :rules="[{validator, required: true, message: 'Number is required' }]" />
            </div>

            <div style="margin: 16px;">
              <van-checkbox style="width:100%" icon-size="14px" v-model="checked">
                I have read <span style="color:#1989fa">(Risk statement)</span>,the order is kept for 1 hour. If the order is not received usdt within 1 hour, the order and quota will become invalid! If you have any questions, please contact your invitee.
              </van-checkbox>
              <van-button @click="onSubmit" :disabled="!checked" block type="info">Submit</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>
    <div class="hidden-sm-and-down">Please view this page on the mobile terminal</div>

  </div>
</template>
<script>

import Title from './Title'
export default {
  name: 'app',
  data() {
    return {
      message: 'Invitation code is required',
      crowdTotal: '',
      codeInfo: {},
      shoubiAddrNumList: [],
      shoubiAddrNumObj: {},
      startSubscriptionTime: '2021-10-27 00:00:00',
      endSubscriptionTime: '2021-11-11 00:00:00',
      RoundsTimes: 1,
      countdown: {
        d: '',
        m: '',
        h: '',
        s: '',
      },
      closingDate: '',
      TopinfoitemToplist: [
        { key: 'Target', value: '300W' },
        { key: 'Current progress', value: '10%' },
        { key: 'Number of crowdfunding', value: '630W' },
        { key: 'Proportion of crowdfunding', value: '10%' },
      ],
      tableData: [
        {
          date: 'First round',
          name: '200',
          address: '0.3'
        }, {
          date: 'Second round',
          name: '300',
          address: '0.5'
        }, {
          date: 'Third round',
          name: '130',
          address: '0.7'
        }
      ],
      conditionData: [
        '1. The crowdfunding of this project is not open to the public and is only for specific groups. The invitation code must be filled in when applying.',
        '2. When subscribing, the minimum quantity shall be ≥ 1000gaz, and the maximum shall not be higher than the maximum amount of invitees.',
        '3. The following countries or regions are not supported',
      ],
      countryList: `Afghanistan, Albania, Belarus, Bosnia and Herzegovina,
Burundi, Burma, Canada, Chinese mainland, Congo Democratic Republic (gold), Cuba, Ethiopia, Guinea Bissau, Guinea, Iran, Iraq,
Japan, North Korea, Liberia, Macedonia, Malaysia, New Zealand, Serbia,
Sri Lanka, Sudan, Somalia, Syria, Thailand, Trinidad and Tobago,
Tunisia, Uganda, Ukraine, United States, Venezuela, Yemen, Zimbabwe.`,
      RiskTipsList: [
        '1.The gazotc platform is still in its infancy, and there may be great online insurance in the operation of the project, the underlying technology of the project, the legal and regulatory environment, etc.',
        '2. Understanding gazoto and gazele finance foundation and assessing their inherent risks requires advanced technical and financial knowledge.',
        '3. Affected by technology, laws and regulations, market and other factors, the subscribed gaz price may fluctuate  violently, and the price may   be  greatly <br/> reduced  or  increased.',
      ],
      username: '',
      password: '',
      checked: '',
      form: {},
      danjiaPrice: 0
    };
  },
  mounted() {
    this.countTime()
    this.getCrowdInfo()
    this.getCode()
  },
  watch: {
  },
  computed: {
    UsdtpayableValue() {

      let val = this.form.c * this.danjiaPrice || ''
      return val && val.toFixed(2)
    }
  },
  methods: {
    async copy() {
      await this.$nextTick(e => { })
      var Url2 = document.querySelector(".copy .van-field__control");
      if (!Url2.value) return
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', Url2.value);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$toast('Crowdfunding trc20 address copied successfully')
      }
      document.body.removeChild(input);

    },
    async  getSub() {
      let res = await this.$api.getSub({ codeId: this.form.a })

      this.$toast(res.msg);
      this.message = res.msg;
      if (res.code == -1) this.form.a = ''
      this.form.b = res.data.gazTotal
      this.form.d = res.data.price
      this.form.e = res.data.crowdAddress
      this.danjiaPrice = res.data.price

    },
    async getCode() {
      let res = await this.$api.getCode({ codeId: 'IQO7LJ' })
      this.codeInfo = res.data

    },
    async getCrowdInfo() {
      let res = await this.$api.getCrowdInfo({ codeId: 'IQO7LJ' })
      this.crowdTotal = res.data.crowdTotal
    },
    addshoubiAddrNumObj() {
      this.shoubiAddrNumList.push({})
    },
    delshoubiAddrNumObj(v, i) {


      this.shoubiAddrNumList.splice(i, 1)

    },
    onFailed(val) {
      console.log('val: ', val);

    },
    validator(val) {
      console.log('val: ', val);
    },
    blurFn() {
      var reg = new RegExp("^[1-9][0-9]*$")

      // reg(this.form.c)
      console.log();

      let isNumber = reg.test(this.form.c)

      if (!isNumber) return this.$toast('Please enter a value greater than 0')


      // if (Number(this.form.c) < 0)
    },
    async onSubmit() {

      let params = {
        codeId: this.form.a,
        subGazTotal: this.form.c,
        gazTotal: this.form.b,
        status: 0,
        payPrice: this.UsdtpayableValue,
        addressinfo: JSON.stringify([...this.shoubiAddrNumList, this.shoubiAddrNumObj])
      }




      let arr = [...this.shoubiAddrNumList, this.shoubiAddrNumObj]

      let sum = 0
      arr.forEach(v => {



        sum += Number(v.num)
      })
      // 

      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].num || !arr[i].address) return this.$toast('Please complete the form')
      }


      // if (params.subGazTotal < 0) return this.$toast('Please enter a value greater than 0')


      if (!params.codeId || !params.subGazTotal || !params.gazTotal || !params.codeId || !params.payPrice) return this.$toast('Please complete the form')



      if (sum != params.subGazTotal) return this.$toast('The total amount of all receiving addresses is equal to the claim limit')


      let res = await this.$api.addSub(params)
      console.log('res: ', res);
      this.$toast(res.msg)
      if (res.code == 1) {
        setTimeout(() => {
          this.$router.push({
            path: '/suc',
            query: {
              code: params.codeId
            }

          })
        }, 1000);
      }



    },
    countTime() {
      //获取当前时间  
      var date = new Date();
      var now = date.getTime();
      //设置截止时间  
      var str = this.endSubscriptionTime;
      var endDate = new Date(str);
      var end = endDate.getTime();
      //时间差  
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间  
      var d, h, m, s;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
      }
      function addLing(str) {
        if (str < 10) return '0' + str
        return str
      }

      this.countdown.d = addLing(d)
      this.countdown.h = addLing(h)
      this.countdown.m = addLing(m)
      this.countdown.s = addLing(s)

      //递归每秒调用countTime方法，显示动态时间效果  
      setTimeout(this.countTime, 1000);
    }
  },
  components: { Title }
};
</script>
<style lang='less' scoped='scoped'>
#app {
  height: auto;
  padding-bottom: 15px;
  .Top {
    background: #004655;
    color: #fff;
    padding: 15px;
    .topDate {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      .left {
        font-size: 20px;
        align-self: flex-start;
        // margin-right: 60px;
        transform: translateX(-15px);
      }
      .right {
        font-size: 12px;
        display: flex;
        flex-direction: column;
        .time {
          font-size: 16px;
        }
        .tips {
          width: 120px;
          margin-bottom: 10px;
          line-height: 15px;
        }
        span {
          display: inline-block;
          transform: scale(0.8) translateY(2px);
          color: aquamarine;
          margin-right: 3px;
        }
      }
    }
    .midMoney {
      position: relative;
      text-align: center;
      margin-bottom: 30px;
      .num {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .rightTips {
        font-size: 12px;
        color: aquamarine;
        position: absolute;
        right: 60px;
        top: 20px;
      }
      .state {
        font-size: 14px;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      position: relative;
      height: 80px;
      .rightTips {
        position: absolute;
        top: 3px;
        left: 60px;
        font-size: 12px;
        color: aquamarine;
      }
      .itemTop {
        flex: 1;
        height: 100%;
        text-align: center;
        .value {
          margin-bottom: 30px;
        }
        .key {
          font-size: 12px;
        }
      }
    }
  }
  .OrderSearch {
    padding-right: 20px;
    padding-bottom: 10px;
    text-align: center;
  }
  .Rounds {
    table {
      margin: 0 auto;
      margin-bottom: 20px;
    }
    td,
    th {
      border: 1px solid #eee;
      padding: 15px 5px;
      text-align: center;
    }
    .info {
      .one {
        margin: 10px;
        color: #5d5d5d;
        line-height: 22px;
        font-size: 14px;
        span {
          display: inline-block;
          width: 200px;
          // text-align: right;
        }
      }
    }
  }
  .line2,
  .copy2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      width: 50px;
      margin-top: 0 !important;
      margin-right: 15px;
    }
    /deep/.van-icon {
      margin-right: 15px;
    }
  }
  .condition {
    .listItem {
      color: #5d5d5d;
      margin: 10px;

      line-height: 22px;
      font-size: 14px;
    }
    .countryList {
      color: red;
      margin: 10px;

      line-height: 20px;
      font-size: 12px;
    }
    .other {
      margin: 10px;

      margin-top: 15px;
      font-size: 12px;
      color: #5d5d5d;
    }
  }
  .RiskTips {
    .listItem {
      color: #5d5d5d;
      margin: 10px;

      line-height: 22px;
      font-size: 14px;
      position: relative;
      .listItemBtn {
        position: absolute;
        right: 30px;
        bottom: 10px;
      }
    }
    /deep/ .formContent {
      border: 1px solid #ccc;
      width: 90%;
      margin: 0 auto;
      .van-checkbox__label {
        font-size: 12px;
        line-height: 14px;
      }
      button {
        margin-top: 20px;
      }
      input {
        border: 1px solid #ccc;
      }
    }
  }
}
.formtips {
  margin: 0 16px;
  // text-align: right;
  font-size: 12px;
  color: red;
}
/deep/.readonly {
  input {
    background-color: #efecec;
  }
}
/deep/.van-field__body {
  input {
    padding-left: 5px;
  }
}
/deep/.add {
  .line {
    display: flex;
    align-items: center;
    // padding-right: 10px;
    .van-cell__value {
      margin: auto 0;
    }
  }
  .num {
    width: 92%;
  }
}
/deep/.van-cell__value {
  margin: auto;
}
.getSub {
  background: #07c160;
  padding: 5px 4px;
  border-radius: 2px;
  color: #fff;
  margin-right: 15px;
  font-size: 12px;
}
</style>