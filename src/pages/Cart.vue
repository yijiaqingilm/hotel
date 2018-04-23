<template>
    <f7-page @page:init="init">
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>购物车</f7-nav-center>
        </f7-navbar>
        <section class="cart" v-if="skuArray && skuArray.length>0">
            <f7-list media-list class="cart-list">
                <f7-list-item v-for="(row,index) in skuArray" :key="index"
                              :media="itemMedia(row)"
                              :title="detail(row).detail.name"
                              :subtitle="subtitleSku(row)">
                    <div slot="after">
                        <counter :max-value="1000" :min-value="0" theme-style="amount-max"
                                 v-model="row.quality" @changeValue="changeCounter" :baseData="row"></counter>
                    </div>
                </f7-list-item>
                <f7-list-label>
                    <div class="total price">
                        <span>合计：</span>
                        <strong>{{totalSku | toFixed}}</strong>
                        <span>元</span>
                    </div>
                </f7-list-label>
            </f7-list>
            <f7-list accordion>
                <f7-list-item accordion-item :title="addressTitle">
                    <f7-accordion-content>
                        <f7-list media-list v-if="addressByTop10 && addressByTop10.length > 0">
                            <f7-list-item v-for="(row,index) in addressByTop10" :key="index"
                                          radio
                                          :title="addressByTitle(row)"
                                          :subtitle="addressBySubTitle(row)"
                                          @change="checkAddress(row)"
                                          :checked="addressId === row.id"
                                          name="address">
                            </f7-list-item>
                        </f7-list>
                        <f7-block>
                            <f7-button @click="$router.loadPage('/my/address/add')" active big color="blue">增加新收货地址
                            </f7-button>
                        </f7-block>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>

            <f7-list media-list v-if="totalStickFee.totalStickFee>0">
                <f7-list-item radio name="stick"
                              :value="0"
                              :checked="isStick===0"
                              @click="stickChange(0)"
                              title="不贴书">

                </f7-list-item>
                <f7-list-item radio name="stick"
                              :value="1"
                              title="贴书"
                              :checked="isStick===1"
                              @click="stickChange(1)"
                              :subtitle="subtitleStick(totalStickFee.totalStickFee)">

                </f7-list-item>
            </f7-list>
            <f7-list media-list v-if="totalStickFee.total > 0 && dashboard.point > 0">
                <f7-list-item radio
                              name="score"
                              :value="0"
                              title="不使用积分"
                              @click="scorechange(0)"
                              :checked="score===0">

                </f7-list-item>
                <f7-list-item radio
                              name="score"
                              :value="-1"
                              title="使用最大积分"
                              :subtitle="`当前：${dashboard.point}分 本单可用：${totalStickFee.total}分`"
                              @click="scorechange(-1)"
                              :checked="score===-1">

                </f7-list-item>
            </f7-list>
            <f7-list media-list v-if="dashboard.gift>0">
                <f7-list-item radio
                              name="dashborad"
                              title="不使用礼券"
                              :checked="gift===0"
                              :value="0"
                              @click="giftChange(0)">
                </f7-list-item>
                <f7-list-item radio
                              name="dashborad"
                              title="使用礼券 (礼券不足可使用现金)"
                              :subtitle="`当前：${dashboard.gift}礼券`"
                              :checked="gift===-1"
                              :value="-1"
                              @click="giftChange(-1)">
                </f7-list-item>

            </f7-list>
            <f7-list>
                <f7-list-item>
                    <f7-label>备注</f7-label>
                    <f7-input type="text" v-model="remark"/>
                </f7-list-item>
            </f7-list>
            <section v-if="renderPrice && renderPrice.isAddress">
                <f7-block class="cartprice" v-if="renderPrice.isAddress && renderPrice.canBuy">
                    <p>总价:<strong>{{renderPrice.salePrice | toFixed}}</strong>元</p>
                    <p v-if="renderPrice.totalDiscount>0">累计购买减免：<strong>-{{renderPrice.totalDiscount |
                        toFixed}}</strong>元</p>
                    <p v-for="msg in renderPrice.totalDiscountMessage">{{msg}}</p>
                    <p v-if="renderPrice.perDiscount>0">单笔购买减免：<strong>-{{renderPrice.perDiscount |toFixed}}</strong>元
                    </p>
                    <p>邮费：<strong>{{renderPrice.logisticPrice | toFixed}}</strong>元</p>
                    <p v-if="renderPrice.totalStickPrice>0">贴书费：<strong>{{renderPrice.totalStickPrice |
                        toFixed}}</strong>元</p>
                    <p v-if="score === -1 && renderPrice.useScore > 0">积分减免：<strong>-{{renderPrice.useScore}}</strong>元
                    </p>
                    <p v-if="gift === -1 && renderPrice.useGift > 0">礼券减免：<strong>-{{renderPrice.useGift}}</strong>元</p>
                    <p>应付：<strong>{{renderPrice.totalPay | toFixed}}</strong>元</p>
                </f7-block>
                <f7-block class="cartprice" v-else>
                    <p>{{renderPrice.canBuyMessage}}</p>
                </f7-block>
            </section>
            <f7-block class="cartprice" v-else>
                <p>请先选择收货地址</p>
            </f7-block>
            <f7-block>
                <f7-button big active color="green" @click="pay">确定</f7-button>
            </f7-block>
        </section>
        <section v-else>
            <err-panel :showRefresh="false" msg="购物车还是空的哦～" iconName='iconfontgouwuchefuzhi'></err-panel>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import Counter from 'components/counter/Counter'
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import { getMediaUrl } from 'lib/common'
  import { round, isEmptyObject } from 'lib/utils'
  import globalMixin from 'mixins/globalMixin'
  import { handleJump } from 'lib/common'

  export default {
    data () {
      return {
        img: require('assets/test.jpg'),
        gift: 0,
        addressTitle: '选择收货地址',
        addressId: -1,
        score: -1,
        isStick: 0,
        remark: ''
      }
    },
    mixins: [globalMixin],
    created () {
      let {commit, dispatch} = this.$store
      commit('setActiveTabbarItem', 'cart')
      if (this.cart.skus.length > 0) {
        this.cart.skus.map((row) => {
          if (!this.sku[`detail_${row.skuId}`]) {
            dispatch({
              type: native.doGetDetail,
              skuId: row.skuId
            })
          }
        })
      }
      dispatch({
        type: native.doLoadDashboard
      })
      dispatch({
        type: native.doListAddress
      })
      dispatch({
        type: native.doLoadProfile
      })
    },
    methods: {
      init () {
        this.$f7.showToolbar('.toolbar')
      },
      addressByTitle (row) {
        return `${row.contact}(${row.mobile})`
      },
      addressBySubTitle (row) {
        return `${row.province}${row.city}${row.address}`
      },
      checkAddress (row) {
        this.$f7.accordionClose('.accordion-item')
        this.addressTitle = `${row.contact}(${row.mobile})`
        this.addressId = row.id
      },
      subtitleSku (row) {
        const arrMater = this.detail(row).detail.material.split(',')
        const material = arrMater[row.material]
        return `<span class="price"><span>单价：</span><strong>${round(this.profile.profile ? this.detail(row).detail.vipprice : this.detail(row).detail.price, 2)}</strong><span>元&nbsp;&nbsp;</span><span >${material}</span></span>`
      },
      subtitleStick (totalStickFee) {
        return `贴书价格：${round(totalStickFee, 2)}积分（积分不足可使用现金）`
      },
      giftChange (value) {
        this.gift = value
      },
      stickChange (value) {
        this.stick = value
      },
      scorechange (value) {
        this.score = value
      },
      // 单个商品详情
      detail (row) {
        return this.sku[`detail_${row.skuId}`]
      },
      itemMedia (row) {
        return `<img src='${getMediaUrl()}sku_main_${this.detail(row).detail.id}_0.jpg' class='media_img'>`
      },
      changeCounter ({baseData, value}) {
        this.$store.commit(native.doCartChangeSku, {
          skuId: baseData.skuId,
          material: baseData.material,
          quality: parseInt(value, 10)
        })
      },
      pay () {
        const {addressId, score, gift, isStick, remark} = this
        const {cart} = this
        let {dispatch, commit} = this.$store
        if (addressId === -1) {
          this.$f7.addNotification({
            media: '<span className=\'iconfont icon-error\'></span>',
            title: '错误',
            message: '请选择收货地址',
            closeOnClick: true
          })
          return
        }
        const values = {
          skus: JSON.stringify(cart.skus),
          addressId,
          isStick,
          score,
          gift,
          remark
        }
        dispatch(native.doBuy, {
          type: native.doBuy,
          ...values,
        }).then(({data}) => {
          commit(native.clearCart)
          commit(native.clearOrder)
          commit(native.clearDashboard)
          handleJump(data)
        }).catch((err) => {
          this.$f7.addNotification({
            media: '<span className=\'iconfont icon-error\'></span>',
            title: '错误',
            message: err,
            closeOnClick: true
          })
        })
      }
    },
    computed: {
      addressByTop10 () {
        if (!this.addrss && this.address.length === 0) {
          return
        }
        return this.address.slice(0, 10)
      },
      ...mapState({
        cart: ({cart}) => cart.cart,
        sku: ({catalogs}) => catalogs.sku,
        address: ({address}) => address.address,
        profile: ({profile}) => profile.profile,
        dashboard: ({dashboard}) => dashboard.dashboard
      }),
      skuArray () {
        if (this.cart && this.cart.skus && this.cart.skus.length > 0) {
          return this.cart.skus
        } else {
          return []
        }

      },
      /**
       * 商品总价格
       * @returns {number}
       */
      totalSku () {
        if (this.skuArray && this.skuArray.length > 0) {
          let total = 0
          this.skuArray.map((row) => {
            const detail = this.sku[`detail_${row.skuId}`]
            if (detail) {
              if (this.profile && this.profile.imbCode) {
                total += detail.detail.vipprice * row.quality
              } else {
                total += detail.detail.price * row.quality
              }
            }
          })
          return total
        } else {
          return 0
        }
      },
      /**
       * 贴书总价格
       * @return {{total: number, totalStickFee: number}}
       */
      totalStickFee () {
        let total = 0
        let totalStickFee = 0
        this.cart.skus.forEach((row) => {
          const detail = this.sku[`detail_${row.skuId}`]
          if (detail) {
            if (this.isStick) {
              total += (detail.detail.stickfee + detail.detail.score) * row.quality
            } else {
              total += detail.detail.score * row.quality
            }
            totalStickFee += detail.detail.stickfee * row.quality
          } else {
            // 需错误处理
            return {total, totalStickFee}
          }
        })
        return {total, totalStickFee}
      },
      renderPrice () {
        const address = this.address
        const dashboard = this.dashboard
        const profile = this.profile
        const cart = this.cart
        const sku = this.sku
        const {addressId, score, gift, isStick} = this
        const totalDiscountMessage = []
        let isAddress = true
        if (isEmptyObject(address) || isEmptyObject(profile) || isEmptyObject(dashboard)) {
          return
        }
        if (!address || !profile) {
          return
        }
        if (!dashboard || !profile) {
          return null
        }
        if (addressId === -1) {
          isAddress = false
        }
        let provinceId = -1
        address.map((row) => {
          if (row.id === addressId) {
            provinceId = row.provinceId
          }
        })
        let totalScore = 0
        let salePrice = 0
        let totalDiscount = 0
        let perDiscount = 0
        let inited = true
        let canBuy = true
        let canBuyMessage = ''
        let cartSize = 0
        let totalStickPrice = 0
        let totalExpressPrice = 0
        let skuprice = 0
        cart.skus.map((row) => {
          cartSize++
          const detail = sku[`detail_${row.skuId}`]
          if (detail) {
            if (profile.imbCode) {
              skuprice = detail.detail.vipprice
            } else {
              skuprice = detail.detail.price
            }
            // 计算贴书费用
            if (isStick) {
              totalScore += (detail.detail.score + detail.detail.stickfee) * row.quality
              totalStickPrice += detail.detail.stickfee * row.quality
            } else {
              totalScore += detail.detail.score * row.quality
            }
            // 计算运费价格
            if (detail.detail.freeExpress === 0) {
              totalExpressPrice += skuprice * row.quality
            }
            salePrice += skuprice * row.quality

            if (detail.detail.expireTime && detail.detail.expireTime < new Date()) {
              canBuy = false
              canBuyMessage = `抱歉，${detail.detail.name}已超过有效期`
              return
            }

            const arrStock = detail.detail.stock.split(',')
            const stock = arrStock[row.material]
            if (row.quality > stock) {
              const arrMater = detail.detail.material.split(',')
              const material = arrMater[row.material]
              canBuy = false
              canBuyMessage = `抱歉，${detail.detail.name} ${material}库存不足`
              return
            }

            const accorderquality = detail.orderedQuality + detail.orderedInit
            if ((row.quality + accorderquality) > detail.detail.accountLimit) {
              canBuy = false
              canBuyMessage = `抱歉，${detail.detail.name}商品已超过您的最大购买限额`
              return
            }

            if (detail.totalDiscounts && detail.totalDiscounts.length > 0) {
              for (let i = 0; i < detail.totalDiscounts.length; i++) {
                const tdrow = detail.totalDiscounts[i]
                if (accorderquality > tdrow.quality) {
                  totalDiscountMessage.push(`${detail.detail.name}已累计购买${accorderquality}${detail.detail.unit}`)
                  totalDiscount += tdrow.discount * row.quality
                  if (detail.detail.freeExpress === 0) {
                    totalExpressPrice = totalExpressPrice - tdrow.discount * row.quality
                  }
                  break
                }
              }
            }

            if (detail.perDiscounts && detail.perDiscounts.length > 0) {
              for (let j = 0; j < detail.perDiscounts.length; j++) {
                const pdrow = detail.perDiscounts[j]
                if (row.quality > pdrow.quality) {
                  perDiscount += pdrow.discount * row.quality
                  if (detail.detail.freeExpress === 0) {
                    totalExpressPrice = totalExpressPrice - pdrow.discount * row.quality
                  }
                  break
                }
              }
            }
          } else {
            inited = false
          }
        })
        if (!inited) {
          return null
        }
        const totalPrice = salePrice - totalDiscount - perDiscount
        // 计算邮费
        let logisticPrice = 0
        if (totalExpressPrice > 0) {
          let areaRule = 0
          if (provinceId === 6 || provinceId === 7 || provinceId === 8) {
            areaRule = 1  // 东三省
          } else if (provinceId === 5 || provinceId === 26 || provinceId === 28 || provinceId === 29 || provinceId === 30 || provinceId === 31) {
            areaRule = 2  // 新疆 内蒙 青海 甘肃 宁夏 西藏
          }
          if (totalExpressPrice > 100) {
            switch (areaRule) {
              case 1:
                logisticPrice = Math.floor(totalExpressPrice / 100) * 15
                break
              case 2:
                logisticPrice = Math.floor(totalExpressPrice / 100) * 20
                break
            }
          } else {
            switch (areaRule) {
              case 0:
                logisticPrice = 5
                break
              case 1:
                logisticPrice = 15
                break
              case 2:
                logisticPrice = 20
                break
            }
          }
        }
        // 计算应付
        let totalPay = totalPrice + logisticPrice + totalStickPrice
        let useScore = 0
        let useGift = 0
        if (score === -1) {
          useScore = dashboard.point > totalScore ? totalScore : dashboard.point
          totalPay = totalPay - useScore
        }
        if (gift === -1) {
          useGift = dashboard.gift > totalPay ? totalPay : dashboard.gift
          totalPay = totalPay - useGift
        }
        if (totalPay < 0) {
          totalPay = 0
        }
        if (!canBuy) {
          return {canBuy, isAddress, canBuyMessage}
        }
        return {
          canBuy,
          isAddress,
          salePrice,
          totalDiscount,
          totalDiscountMessage,
          perDiscount,
          logisticPrice,
          totalStickPrice,
          useScore,
          useGift,
          totalPay
        }
      },
    },
    destroyed () {
      console.log('cart component destroyed')
    },
    components: {Counter}
  }
</script>
<style lang="scss" type="text/css">
    @import "../css/cart.scss";
</style>
