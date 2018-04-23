import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import { applyClientMiddleware } from 'src/main'

let state = {
  dashboard: {}
}
let getters = {}
let actions = {
  [native.doLoadDashboard] ({state}, refs) {
    if (isEmptyObject(state.dashboard)) {
      applyClientMiddleware(api.doLoadDashboard)(refs)
    }

  }
}
let mutations = {
  [mutationNames.doLoadDashboard_request] (state, refs) {},
  [mutationNames.doLoadDashboard_success] (state, {data}) {
    state.dashboard = {...data}
  },
  [mutationNames.doLoadDashboard_failure] (state, {error}) {},
  [native.clearDashboard] (state) {
    state.dashboard = null
  }
}
export {
  state,
  getters,
  actions,
  mutations
}
