import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { pageSize as size } from '../../lib/const'
import { applyClientMiddleware } from 'src/main'

let state = {
  catalogs: [],
  shop: {},
  wechat: {},
  skuTop: {},
  recommend: [],
  sku: {},
  searchValue: '',
  searchList: [],
  /* 错误处理信息*/
  recLoading: false,
  recError: null,
  listLoading: false,
  listError: null,

  skuLoading: false,
  skuError: null,
  skuListError: null
}
let getters = {}
let actions = {
  [native.doSearch] (context, refs) {
    return applyClientMiddleware(api.doSearch)(refs)
  },
  [native.doLoadJsConfig] ({state}, refs) {
    if (isEmptyObject(state.shop) || isEmptyObject(state.wechat)) {
      return applyClientMiddleware(api.doLoadJsConfig)(refs)
    }
  },
  [native.doListCatalogs] ({state}, refs) {
    if (isEmptyObject(state.catalogs)) {
      return applyClientMiddleware(api.doListCatalogs)(refs)
    }
  },
  [native.top4Skus] ({state}, refs) {
    let {catalogId} = refs
    if (!state.skuTop[`sku4_${catalogId}`]) {
      return applyClientMiddleware(api.doListTop4Skus)(refs)
    }
  },
  [native.doRecommend] ({commit, state}, refs) {
    if (state.recommend.length === 0) {
      return applyClientMiddleware(api.doRecommend)(refs)
    }
  },
  [native.doGetDetail] ({commit, state}, refs) {
    let {skuId} = refs
    if (!state.sku[`detail_${skuId}`]) {
      return applyClientMiddleware(api.doGetDetail)(refs)
    }
  },
  [native.doListSkus] ({commit, state}, refs) {
    return applyClientMiddleware(api.doListSkus)(refs)
  }
}
let mutations = {
  [native.updateSearchValue] (state, value) {
    state.searchValue = value
  },
  [mutationNames.doSearch_request] (state, refs) {},
  [mutationNames.doSearch_success] (state, {data}) {
    state.searchList = data
  },
  [mutationNames.doSearch_failure] (state, {error}) {
    Vue.set(state, 'listError', error)
  },
  [mutationNames.doListCatalogs_request] (state, refs) {
    state.listLoading = true
    state.listError = null
  },
  [mutationNames.doListCatalogs_success] (state, {data}) {
    state.catalogs = data
    state.listLoading = false
  },
  [mutationNames.doListCatalogs_failure] (state, {error}) {
    state.listError = error
    state.listLoading = false
  },
  [mutationNames.doLoadJsConfig_request] (state, refs) {},
  [mutationNames.doLoadJsConfig_success] (state, {data}) {
    let {shop, config} = data
    state.shop = {...shop}
    state.wechat = {...config, init: true}
    document.title = shop.shopname
    wx.config(state.wechat)
    wx.ready(() => {
    })
    wx.error((err) => {
      console.error(err)
    })
  },
  [mutationNames.doLoadJsConfig_failure] (state, {error}) {
    state.wechat = null
    state.shop = null
  },
  [mutationNames.top4Skus_request] (state, refs) {},
  [mutationNames.top4Skus_success] (state, {data}) {
    let {catalogId} = data
    Vue.set(state.skuTop, `sku4_${catalogId}`, data.data)
    state.topLoading = false
  },
  [mutationNames.top4Skus_failure] (state, {error}) {
    state.topLoading = false
    Vue.set(state, 'topError', error)
  },
  [mutationNames.doRecommend_request] (state, refs) {
    state.recLoading = true
  },
  [mutationNames.doRecommend_success] (state, {data}) {
    state.recommend = [...data]
    state.recLoading = false
    state.recError = null
  },
  [mutationNames.doRecommend_failure] (state, {error}) {
    state.recLoading = false
    state.recError = error
  },
  [mutationNames.doGetDetail_request] (state, refs) {
    state.skuLoading = true
    state.skuError = null
  },
  [mutationNames.doGetDetail_success] (state, {data}) {
    let {skuId} = data
    Vue.set(state.sku, `detail_${skuId}`, data.data)
    state.skuLoading = false
  },
  [mutationNames.doGetDetail_failure] (state, {error}) {
    state.skuLoading = false
    state.skuError = error
  },
  [mutationNames.doListSkus_request] (state, refs) {
    state.skuListError = null
  },
  [mutationNames.doListSkus_success] (state, {data}) {
  },
  [mutationNames.doListSkus_failure] (state, {error}) {
    state.skuListError = error
  }
}

export {
  state,
  getters,
  actions,
  mutations
}
