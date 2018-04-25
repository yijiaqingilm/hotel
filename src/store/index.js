import Vue from 'vue'
import Vuex from 'vuex'
import * as hotel from './modules/hotel'

Vue.use(Vuex)

export default new Vuex.Store({
  /* actions,*/
  state: {
    showLoading: false,
    loadingMsg: 'Loading...',
    sessionkey: '',
    credential: {
      token: '',
      expireTime: ''
    },
    activeTabbarItem: 'home',
  },
  mutations: {
    setActiveTabbarItem (state, item = 'home') {
      state.activeTabbarItem = item
    },
    setCredential (state, nowCredential) {
      state.credential = nowCredential
    }
  },
  actions: {},
  modules: {hotel}
})
