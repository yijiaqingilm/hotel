import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { pageSize as size } from '../../lib/const'
import { applyClientMiddleware } from 'src/main'

let state = {
  roomCalender: {},
}
let actions = {
  [native.getRoomCalender] ({state}, refs) {
    if (!state.roomCalender[refs.roomId]) {
      return applyClientMiddleware(api.getRoomCalender)(refs)
    }
  },
  [native.checkBook] (context, refs) {
    return applyClientMiddleware(api.checkBook)(refs)
  }
}
let mutations = {
  [mutationNames.getRoomCalender_pending] (state, refs) {},
  [mutationNames.getRoomCalender_success] (state, {data, refs}) {
    let {roomId} = refs
    state.roomCalender[roomId] = data
  },
  [mutationNames.getRoomCalender_faulure] (state, {error}) {},
  [mutationNames.checkBook_pending] (state, refs) {},
  [mutationNames.checkBook_success] (state, {data}) {
  },
  [mutationNames.checkBook_faulure] (state, {error}) {},
}
export {
  state,
  actions,
  mutations
}
