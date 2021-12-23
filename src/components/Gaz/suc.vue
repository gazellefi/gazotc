<template>
  <div class='suc' v-loading="loading" element-loading-text="Getting, please wait...">
    <div class="head">
      <van-icon @click="$router.go(-1)" name="arrow-left" />
      <van-field label-width="88" clearable class="num" v-model="code" label="Invitation code:" name="code" placeholder="Please enter the invitation code:" />
      <van-button @click="getData" size="mini" type="primary">Search</van-button>
    </div>
    <div class="info">
      <div class="infoItem" v-for="(item, index) in infoData" :key="index">
        <van-cell-group>
          <van-cell title="GAZ Total" :value="item.gazTotal" />
          <van-cell title="Claim Gaz Total" :value="item.subGazTotal" />
          <van-cell @click="copy(item.crowdAddress)" title="Crowdfunding TRC20 Address" :value="item.crowdAddress">
            <template #right-icon>
              <van-icon style="margin-left:6px" size="20" @click="copy(item.crowdAddress)" name="label" class="label" />
            </template>
          </van-cell>
          <van-cell title="USDT Payable" :value="item.payPrice" />
          <van-cell title="Status" :class="[item.status==0?`Unpaid`:`Paid`]" :value="item.status==0?`Unpaid`:`Paid`" />
        </van-cell-group>
        <div class="top">
          <table>
            <tr>
              <th>Receiving BEP20 Address</th>
              <th>Number</th>
            </tr>
            <tr v-for="v in item.trans_list" :key="v.name">
              <td>{{v.address}}</td>
              <td>{{v.num}}</td>
            </tr>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'suc',
  data() {
    return {
      code: '',
      loading: false,
      infoData: []
    };
  },
  mounted() {
    this.code = this.$route.query.code || ''
    console.log(' this.code: ', this.code);
    if (this.code) {
      this.getData()
    }
  },
  watch: {},
  computed: {},
  methods: {
    async copy(value) {
      await this.$nextTick(e => { })
      // var Url2 = document.querySelector(".copy .van-field__control");
      if (!value) return
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', value);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$toast('TRC20地址复制成功')
      }
      document.body.removeChild(input);
    },
    async  getData() {
      this.loading = true
      if (!this.code) return
      let params = {
        codeId: this.code
      }
      let res = await this.$api.getData(params)
      console.log('res: ', res);
      this.loading = false
      this.infoData = res.data
      this.$toast(res.msg)
    }
  },
  components: {}
};
</script>
<style lang='less' scoped='scoped'>
/deep/.van-field__label {
  width: 50px;
}
/deep/.van-field__control {
  border: 1px solid #ddd;
  padding-left: 10px;
}
.suc {
  padding: 20px;
  .head {
    display: flex;
    align-items: center;
  }
  .info {
    margin-top: 20px;
    height: calc(100vh - 150px);
    overflow: auto;
    .infoItem {
      margin-bottom: 40px;
      // overflow: auto;
      .top {
        width: 100%;
        overflow: auto;
        td {
          white-space: nowrap;
        }
      }
      table {
        width: 100%;
        margin: 0 auto;
        // table-layout: fixed;
        border-spacing: 0;
        border-collapse: collapse;
        text-align: center;
      }
      td,
      th {
        border: 1px solid #eee;
        padding: 10px 10px;
        text-align: center;
        width: auto;
        white-space: nowrap;
      }

      .tab {
        // width: 100% !important;
        // overflow: auto;
        tr {
          width: 100% !important;
          overflow: auto;
        }
      }
    }
  }
}
/deep/.Paid {
  .van-cell__value {
    color: green;
  }
}
/deep/.Unpaid {
  .van-cell__value {
    color: red;
  }
}
</style>