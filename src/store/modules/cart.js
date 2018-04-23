import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'
let state = {
  cart: {
    skus: []
  }
}
let getters = {}
let actions = {
  [native.doBuy] ({commit, state}, refs) {
    return applyClientMiddleware(api.doBuy)(refs)
  }
}
let mutations = {
  [native.clearCart] (state) {
    state.cart.skus = []
  },
  [mutationNames.doBuy_request] (state, refs) {},
  [mutationNames.doBuy_success] (state, {data}) {
  },
  [mutationNames.doBuy_failure] (state, {error}) {},
  [native.doCartAddSku] ({cart}, {skuId, material}) {
    let quality = 1
    const newSkus = cart.skus.filter((sku) => {
      if (sku.skuId === skuId && sku.material === material) {
        quality = sku.quality + 1
        return false
      }
      return true
    })
    newSkus.push({
      skuId,
      material,
      quality
    })
    cart.skus = newSkus
  },
  [native.doCartChangeSku] (state, {skuId, material, quality}) {
    let {skus} = state.cart
    const newSkus = skus.filter((sku) => {
      if (sku.skuId === skuId && sku.material === material) {
        return false
      }
      return true
    })
    if (quality > 0) {
      newSkus.push({
        skuId,
        material,
        quality
      })
    }
    state.cart.skus = newSkus

  }
}

export {
  state,
  getters,
  actions,
  mutations
}
