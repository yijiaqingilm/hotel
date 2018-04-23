const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  doSearch: 'doSearch',
  updateSearchValue: 'updateSearchValue',
  doLoadJsConfig: 'doLoadJsConfig',
  doListCatalogs: 'doListCatalogs',
  doRecommend: 'doRecommend',
  doGetDetail: 'doGetDetail',
  top4Skus: 'top4Skus',
  doListSkus: 'doListSkus',
  doListTop4Skus: 'doListTop4Skus',
  recommend: 'recommend',

  doCartAddSku: 'doCartAddSku',
  doLoadDashboard: 'doLoadDashboard',
  doListAddress: 'doListAddress',
  doCartChangeSku: 'doCartChangeSku',
  doBuy: 'doBuy',

  doLoadProfile: 'doLoadProfile',

  doListProvince: 'doListProvince',
  doListCity: 'doListCity',
  doSelectProvince: 'doSelectProvince',
  doSelectCity: 'doSelectCity',
  resetCity: 'resetCity',
  doAddAddress: 'doAddAddress',
  cliearAddressList: 'cliearAddressList',
  doDelAddress: 'doDelAddress',

  doSetNickName: 'doSetNickName',
  doSetSex: 'doSetSex',
  doSetMobile: 'doSetMobile',
  doSetCity: 'doSetCity',
  setCity: 'setCity',
  doBindImbcode: 'doBindImbcode',
  doSetAvatar: 'doSetAvatar',

  doListOrder: 'doListOrder',
  delOrderById: 'delOrderById',
  doReceipt: 'doReceipt',
  doListFinishOrder: 'doListFinishOrder',

  clearCart: 'clearCart',
  clearOrder: 'clearOrder',
  clearDashboard: 'clearDashboard'
}
let methods = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), REQUEST.toLowerCase()]
const mutationNames = {}
for (let actionName in globalConst) {
  if (globalConst.hasOwnProperty(actionName)) {
    methods.forEach((method) => {
      if (!mutationNames[`${actionName}_${method}`]) {
        mutationNames[`${actionName}_${method}`] = `${actionName}_${method}`
      }
    })
  }
}

const pageSize = 10
export {
  globalConst,
  modalTitle,
  pageSize,
  SUCCESS,
  FAILURE,
  REQUEST,
  ERROR_UNAUTHORIZED,
  mutationNames
}
