import Vue from 'vue'


// 国际化处理
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let lang = localStorage.getItem('lang') || 'zh'


import messages from '@/assets/lang'
const i18n = new VueI18n({
  locale: lang, // 定义默认语言
  messages
});

export default i18n
