import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI)

//vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)


//全局监听
var $Jt = new Vue();
Vue.prototype.$Jt = $Jt;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
