import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumb: [],
	lang: 'zh',
	morenkey: '', //网络
  },
  mutations: {
    breadcrumb(state, data) {
      state.breadcrumb = data
    },
  },
  actions: {
  },
  modules: {
  }
})
