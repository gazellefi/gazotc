<template>
  <div class='app'>

  </div>
</template>
<script>
import { Toast } from "vant";
import axios from "axios";
import { Base64 } from "js-base64";

export default {
  name: 'app',
  data() {
    return {
      regForm: {
        nickname: '',
        name: '',
        identity: '',
      },
    };
  },
  mounted() { },
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
    },
    async register() {
      // if(this.regForm.identity)
      // this.regForm.Web3
      // let arr = Object.values(this.regForm)
      //
      // if (arr.some(v => v == '')) return Toast.success(this.$t("message.activit.IncompleteParameters"));
      //
      //
      // let res = await axios({
      //   method: "post",
      //   url: "https://gazotc:8083/member/register",
      //   data: {
      //     idNo: this.regForm.identity, name: this.regForm.name, nickname: this.regForm.nickname, address: address,
      //     parentAddress: this.queryAddr || 0
      //   },
      // })
      // if (res.code != 0) return false
      Toast.loading({ message: "注册中..." });
      let nickname = Base64.encode(this.regForm.nickname);
      let name = Sha256(this.regForm.name).toString().substring(0, 10);
      let identity = Sha256(this.regForm.identity).toString().substring(0, 15);
      let data = `${nickname}|${name}|${identity}|${this.recommender}`;
      dotc.methods.commun(0, data).send(
        {
          from: address,
        },
        (err, ret) => {
          if (ret) {
            zcchaxun();
          } else {
            Toast.clear();
            Toast.fail("注册失败");
          }
        }
      );

      //轮询注册是否成功
      function zcchaxun() {
        setTimeout(() => {
          Toast.clear();
          Toast.success("注册成功");
        }, 3000);
      }

    },
  },
  components: {},
  props: []

};
</script>
<style lang='less' scoped='scoped'>
</style>