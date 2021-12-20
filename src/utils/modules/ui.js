import Vue from 'vue'



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })



// vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)



import "@/assets/css/global.css";
import "@/assets/css/reset.css";