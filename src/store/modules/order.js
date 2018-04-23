import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  orders: null,
  listLoading: false,
  listError: null,
  finishLoading: false,
  finishError: null
}
let getters = {}
let actions = {
  [native.doListOrder] ({commit, state}, refs) {
    if (isEmptyObject(state.orders)) {
      return applyClientMiddleware(api.doListOrder)(refs)
    }
  },
  [native.doReceipt] ({commit, state}, refs) {
    return applyClientMiddleware(api.doReceipt)(refs)
  },
  [native.doListFinishOrder] ({commit, state}, refs) {
    return applyClientMiddleware(api.doListFinishOrder)(refs)
  }
}
let mutations = {
  [native.clearOrder] (state) {
    state.orders = null
  },
  [mutationNames.doListFinishOrder_request] (state, refs) {
    state.finishLoading = true
    state.finishError = null
  },
  [mutationNames.doListFinishOrder_success] (state, {data}) {
    state.finishLoading = false
  },
  [mutationNames.doListFinishOrder_failure] (state, {error}) {
    state.finishLoading = false
    state.finishError = error
  },
  [mutationNames.doListOrder_request] (state, refs) {
    state.listLoading = true
    state.listError = null
  },
  [mutationNames.doListOrder_success] (state, {data}) {
    state.orders = data
    state.listLoading = false
  },
  [mutationNames.doListOrder_failure] (state, {error}) {
    state.listLoading = false
    state.listError = error
  },
  [native.delOrderById] (state, orderNo) {
    state.orders.find((row, index) => {
      if (row.orderNo === orderNo) {
        state.orders.splice(index, 1)
      }
    })
  },
  [native.doReceipt_request] (state, refs) {},
  [native.doReceipt_success] (state, {data}) {},
  [native.doReceipt_failure] (state, {error}) {}
}
export {
  state,
  getters,
  actions,
  mutations
}
