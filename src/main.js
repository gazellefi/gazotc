import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/utils/modules/VueI18n'

import '@/utils'

// import * as IPFS from 'ipfs-core' //或 import {create} from 'ipfs-core'
// console.log(IPFS)
// Vue.prototype.$ipfs = IPFS.create(); // 或 Vue.prototype.$ipfs = create();





new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')