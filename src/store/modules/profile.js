import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  profile: {}
}
let getters = {}
let actions = {
  [native.doLoadProfile] ({state}, refs) {
    if (isEmptyObject(state.profile)) {
      return applyClientMiddleware(api.doLoadProfile)(refs)
    }
  },
  [native.doSetNickName] ({commit, state}, refs) {
    return applyClientMiddleware(api.doSetNickName)(refs)
  },
  [native.doSetSex] ({commit, state}, refs) {
    return applyClientMiddleware(api.doSetSex)(refs)
  },
  [native.doSetMobile] ({commit, state}, refs) {
    return applyClientMiddleware(api.doSetMobile)(refs)
  },
  [native.doSetCity] ({commit, state}, refs) {
    return applyClientMiddleware(api.doSetCity)(refs)
  },
  [native.doBindImbcode] ({commit, state}, refs) {
    return applyClientMiddleware(api.doBindImbcode)(refs)
  },
  [native.doSetAvatar] ({commit, state}, refs) {
    return applyClientMiddleware(api.doSetAvatar)(refs)
  }

}
let mutations = {
  [mutationNames.doLoadProfile_request] (state, refs) {},
  [mutationNames.doLoadProfile_success] (state, {data}) {
    state.profile = {...data}
  },
  [mutationNames.doLoadProfile_failure] (state, {error}) {},
  [mutationNames.doSetNickName_request] (state, refs) {},
  [mutationNames.doSetNickName_success] (state, {data, refs}) {
    let {nickName} = refs
    state.profile.nickName = nickName
  },
  [mutationNames.doSetNickName_failure] (state, {error}) {},
  [mutationNames.doSetSex_request] (state, refs) {},
  [mutationNames.doSetSex_success] (state, {data, refs}) {
    let {sex} = refs
    state.profile.sex = sex
  },
  [mutationNames.doSetSex_failure] (state, {error}) {},
  [mutationNames.doSetMobile_request] (state, refs) {},
  [mutationNames.doSetMobile_success] (state, {data, refs}) {
    let {mobile} = refs
    state.profile.mobile = mobile
  },
  [mutationNames.doSetMobile_failure] (state, {error}) {},
  [native.setCity] (state, city) {
    const {cityId, cityName, provinceId, provinceName} = city
    state.profile.cityId = cityId
    state.profile.city = cityName
    state.profile.provinceId = provinceId
    state.profile.province = provinceName
  },
  [mutationNames.doSetCity_request] (state, refs) {},
  [mutationNames.doSetCity_success] (state, {data}) {},
  [mutationNames.doSetCity_failure] (state, {error}) {},
  [mutationNames.doBindImbcode_request] (state, refs) {},
  [mutationNames.doBindImbcode_success] (state, {data}) {
    state.profile = {...data}
  },
  [mutationNames.doBindImbcode_failure] (state, {error}) {},
  [mutationNames.doSetAvatar_request] (state, refs) {},
  [mutationNames.doSetAvatar_success] (state, {data}) {
    state.avatar = data
    // 这里需要处理 回调之后设置头像

  },
  [mutationNames.doSetAvatar_failure] (state, {error}) {}
}

export {
  state,
  getters,
  actions,
  mutations
}
