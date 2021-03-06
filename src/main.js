import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import './lib/flexible.js'
import ApiClient from 'lib/client'
import clientMiddleware from 'lib/clientMiddleware'
// import FastClick from 'fastclick'

// FastClick.attach(document.body)

import Framework7Vue from 'lib/framework7-vue-v9'
import 'velocity-animate'

// require('src/css/global_loser.scss')
// Import F7 iOS Theme Styles
/* import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'*/
/* OR for Material Theme:
 import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
 import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
 */
import Routes from './router/router'
import App from './main.vue'
import VueResource from 'vue-resource'
import './directives/commonDirective.js'
import './filters/commonFilter'
import './lib/vueExends'

Vue.use(VueResource)
Vue.use(Framework7Vue)

import back from 'components/back/back.vue'
import mask from 'components/masking/masking.vue'
import ErrPanel from 'components/errorPanel/errorPanel'
import Preloader from 'components/preloader/Preloader'
import IIcon from 'components/iicon/IIcon'

Vue.component('back', back)
Vue.component('masking', mask)
Vue.component('errPanel', ErrPanel)
Vue.component('preloader', Preloader)
Vue.component('IIcon', IIcon)
let user_store = sessionStorage.getItem('user_store')
user_store && store.replaceState(Object.assign(store.state, JSON.parse(user_store)))
// Init App
let app = new Vue({
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    pushState: true,
    pushStateSeparator: '#',
    materialRipple: true,
    // fastClicks: false,
    activeState: true,
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    swipeBackPage: false,
    modalTitle: '',
    pushStatePreventOnLoad: false,
    pushStateNoAnimation: true,
    cache: true,
    preroute: function (view, options) {
      return true
    },
  },
  // Register App Component
  components: {
    app: App
  },
  create () {
    let user_store = sessionStorage.getItem('user_store')
    user_store && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(user_store)))
  },
  store
}).$mount('#app')
let client = new ApiClient()
let applyClientMiddleware = clientMiddleware(client)(store.commit)
window.store = store
/**
 * 添加 ajax 全局拦截器
 */
Vue.http.interceptors.push(function (request, next) {
  if (request.global) {app.$store.state.showLoading = true}
  next((response) => {
    if (request.global) {app.$store.state.showLoading = false}
    // 统一的错误 处理机制 ==> 未添加
    var resultCode = response.data && response.data.resultCode
    // if (resultCode === status_err_code.FAILURE) {
    // window.f7.alert(response.data.result);
    //  return
    // }
    return response
  })
})

window.addEventListener('popstate', function () {
  app.$f7.closeModal()

})
window.onbeforeunload = function () {
  sessionStorage.setItem('user_store', JSON.stringify(app.$store.state))
}
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function () {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded()
        // document.activeElement.scrollIntoView(false)
      }, 0)
    }
  })
}
export { app, applyClientMiddleware }


