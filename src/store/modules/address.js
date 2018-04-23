import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { pageSize as size } from '../../lib/const'
import { applyClientMiddleware } from 'src/main'

var state = {
  listLoading: false,
  provinceLoading: false,
  cityLoading: false,
  actionLoading: false,
  address: [],
  pageIndex: 0,
  provinces: {},
  cities: {},
  noMore: false,
  delLoading: false,
  city: {
    cityId: -1,
    cityName: null,
    provinceId: -1,
    provinceName: null
  },
}
var getters = {}
var actions = {
  [native.doDelAddress] ({state}, refs) {
    return applyClientMiddleware(api.doDelAddress)(refs)
  },
  [native.doListAddress] ({state}, refs) {
    refs['index'] = state.pageIndex
    return applyClientMiddleware(api.doListAddress)({pageSize: size, ...refs})
  },
  [native.doListProvince] ({commit, state}, refs) {
    if (isEmptyObject(state.provinces)) {
      return applyClientMiddleware(api.doListProvince)(refs)
    }
  },
  [native.doListCity] ({commit, state}, refs) {
    let {provinceId} = state.city
    if (provinceId !== -1 && isEmptyObject(state.cities[`cities_${provinceId}`])) {
      return applyClientMiddleware(api.doListCity)({provinceId, ...refs})
    }
  },
  [native.doAddAddress] ({commit, state}, refs) {
    return applyClientMiddleware(api.doAddAddress)(refs)
  }
}
var mutations = {
  [mutationNames.doDelAddress_request] (state, refs) {},
  [mutationNames.doDelAddress_success] (state, {data}) {},
  [mutationNames.doDelAddress_failure] (state, {error}) {},
  [native.doDelAddress] (state, keys) {
    state.address = state.address.filter((row) => {
      if (keys.indexOf((row.id).toString()) !== -1) {
        return false
      } else {
        return true
      }
    })
  },
  [mutationNames.doAddAddress_request] (state, refs) {},
  [mutationNames.doAddAddress_success] (state, {data}) {
    state.address = []
    state.pageIndex = 0
  },
  [mutationNames.doAddAddress_failure] (state, {error}) {},
  [mutationNames.doListAddress_request] (state, refs) {},
  [mutationNames.doListAddress_success] (state, {data}) {
    state.address = state.address.concat(data)
    state.pageIndex += size
  },
  [mutationNames.doListAddress_failure] (state, {error}) {},
  [mutationNames.doListProvince_request] (state, refs) {},
  [mutationNames.doListProvince_success] (state, {data}) {
    state.provinces = data
  },
  [mutationNames.doListProvince_failure] (state, {error}) {},
  [native.doSelectProvince] (state, {provinceId, provinceName}) {
    state.city.provinceId = provinceId
    state.city.provinceName = provinceName
  },
  [mutationNames.doListCity_request] (state, refs) {},
  [mutationNames.doListCity_success] (state, {data}) {
    let {provinceId} = state.city
    Vue.set(state.cities, `cities_${provinceId}`, data.result)
  },
  [mutationNames.doListCity_failure] (state, {error}) {},
  [native.doSelectCity] (state, {cityId, cityName}) {
    state.city.cityId = cityId
    state.city.cityName = cityName
  },
  [native.resetCity] (state) {
    state.city.cityId = -1
    state.city.cityName = ''
  },
  [native.cliearAddressList] (state) {
    state.address = []
    state.pageIndex = 0
  }
}
export {
  state,
  getters,
  actions,
  mutations
}
