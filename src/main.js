import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'


Vue.use(ElementUI, { locale })
import "@/assets/css/global.css";
import "@/assets/css/reset.css";
import './rem'
//vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import api from '@/api/api'
Vue.prototype.$api = api;

import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.prototype.$date = (date) => {
  return moment(date).format('YYYY-MM-DD' + '  ' + 'HH:mm:ss');
}


import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import messages from '@/assets/lang'
const i18n = new VueI18n({
  locale: 'en', // 定义默认语言
  messages
});


//全局监听
var $Jt = new Vue();
Vue.prototype.$Jt = $Jt;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')