import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/auth'
import * as catalogs from './modules/catalogs'
import * as cart from './modules/cart'
import * as address from './modules/address'
import * as dashboard from './modules/dashboard'
import * as profile from './modules/profile'
import * as order from './modules/order'

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
  modules: {auth, catalogs, cart, address, dashboard, profile, order}
})
