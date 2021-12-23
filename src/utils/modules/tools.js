
import Vue from 'vue'


Vue.config.productionTip = false


// 请求

import api from '@/api/api'
Vue.prototype.$api = api;


// 时间处理

import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.prototype.$date = (date) => {
  return moment(date).format('YYYY-MM-DD' + '  ' + 'HH:mm:ss');

}

import myDialog from '@/components/myDialog.vue'
Vue.component('myDialog', myDialog)

// 格式化长id
Vue.prototype.$getStr = (str) => {
  return str.substring(0, 5) + "····" + str.substring(str.length - 5, str.length);

}

//全局监听
var $Jt = new Vue();
Vue.prototype.$Jt = $Jt;