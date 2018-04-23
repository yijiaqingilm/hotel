import { setToken } from 'lib/common'

const BIND_SUCCESS = 'hm/auth/BIND_SUCCESS'
const BIND_CLEARERROR = 'hm/auth/BIND_CLEARERROR'

const state = {
  loading: false,
  token: null,
  expiresIn: 0
}
const getters = {}
const actions = {}
const mutations = {
  doAlreadyBind (state, credential) {
    state.token = credential.token
    state.expiresIn = credential.expireTime - new Date().getTime()
  }
}
export {
  state,
  getters,
  actions,
  mutations
}
