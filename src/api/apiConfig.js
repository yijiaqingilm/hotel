import { globalConst as native } from 'lib/const'

class ApiConfig {
  constructor (name, url, config, method = 'post') {
    this.name = name
    this.url = url
    this.method = method
    if (config && typeof config === 'object') {
      this.config = config
      this.method = method
    } else if (config && typeof config === 'string') {
      this.method = config
    } else {
      this.config = {}
    }

  }
}

let apiConfig = [
  new ApiConfig(native.doListCatalogs, '/shop/catalog/list'),
  new ApiConfig(native.doLoadJsConfig, '/wechat/config'),
  new ApiConfig(native.doListTop4Skus, '/shop/catalog/top4'),
  new ApiConfig(native.doRecommend, '/shop/catalog/recommend'),
  new ApiConfig(native.doGetDetail, '/shop/sku/detail'),
  new ApiConfig(native.doListSkus, '/shop/catalog/sku', {global: false}),
  new ApiConfig(native.doBuy, '/shop/order/buy'),
  new ApiConfig(native.doLoadDashboard, '/user/dashboard/main'),
  new ApiConfig(native.doListAddress, '/user/address/list'),
  new ApiConfig(native.doLoadProfile, '/user/profile/main'),
  new ApiConfig(native.doListProvince, '/common/city/provinces'),
  new ApiConfig(native.doListCity, '/common/city/cities'),
  new ApiConfig(native.doAddAddress, '/user/address/add'),
  new ApiConfig(native.doBindImbcode, '/user/profile/imbcode'),
  new ApiConfig(native.doSetNickName, '/user/profile/nickname'),
  new ApiConfig(native.doSetSex, '/user/profile/sex'),
  new ApiConfig(native.doSetMobile, '/user/profile/mobile'),
  new ApiConfig(native.doSetCity, '/user/profile/city'),
  new ApiConfig(native.doSetAvatar, '/user/profile/avatar'),
  new ApiConfig(native.doListOrder, '/user/order/list'),
  new ApiConfig(native.doReceipt, '/user/order/receipt'),
  new ApiConfig(native.doListFinishOrder, '/user/order/finish', {global: false}),
  new ApiConfig(native.doSearch, '/shop/search/list'),
  new ApiConfig(native.doDelAddress, '/user/address/del')
]
export default apiConfig
