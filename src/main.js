import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/utils/modules/VueI18n'

import '@/utils'





new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')