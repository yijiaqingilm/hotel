<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>{{detail && detail.detail && detail.detail.name}}</f7-nav-center>
            <f7-nav-right>
                <cart-icon></cart-icon>
            </f7-nav-right>
        </f7-navbar>
        <section v-if="skuLoading">
            <preloader title="正在加载商品信息"></preloader>
        </section>
        <section v-if="!skuLoading && skuError">
            <err-panel @onRefresh="refresh" :msg="skuError"></err-panel>
        </section>
        <section class="wrap" v-if="!skuLoading && !skuError && detail && detail.detail">
            <section class="sku_detail">
                <img :src="mediaUrl()" class="goods_img" alt="">
                <div class="title">{{detail.detail.name}}</div>
                <div v-if="detail.detail.remake" class="remake">{{detail.detail.remake}}</div>
                <div v-if="detail.detail.daburl" class='remark'>点读包配套下载地址：{{detail.detail.daburl}}</div>
                <div v-if="!detail || !detail.detail.expireTime || detail.detail.expireTime === '0000-00-00 00:00:00'">

                </div>
                <div v-else class="time">
                    {{formatExpireTime(detail.detail.expireTime)}}
                </div>
                <div class='remarkcontainer'>
                    <div v-if="detail.detail.originalPrice" class='originalprice'>原价：<strike>¥{{detail.detail.originalPrice
                        | toFixed}}</strike></div>
                    <div class='price'>现价：¥{{detail.detail.price | toFixed}}</div>
                    <div v-if="detail.detail.vipprice > 0 && detail.detail.vipprice !== detail.detail.price"
                         class='vipprice'>VIP价：¥{{detail.detail.vipprice | toFixed}}
                    </div>
                    <span class='unit'>{{detail.detail.unit}}</span>
                    <div v-if="detail.detail.score > 0" class='score'>可用积分：{{detail.detail.score}}</div>
                    <!-- <div v-if="arrStock[material] < 10" class='stock'>仅剩余：{{arrStock[material]}}{{detail.detail.unit}}</div>-->
                </div>
            </section>
            <section class="tagcontainer" v-if="materialList && materialList.length>0">
                <header class="content-block-title">请选择规格</header>
                <f7-list>
                    <f7-list-item v-for="(item,index) in materialList" :key="index" radio
                                  name="material" :checked="index===material" @click="materialChange(index)"
                                  :value="index"
                                  :title="item"></f7-list-item>
                </f7-list>

                <div class='tagcontainer' v-if="detail.tags">
                    <span v-for="tag in detail.tags">{{tag.name}}</span>
                </div>
            </section>
            <section class="detailcontainer">
                <header class="header">商品详情</header>
                <div v-if="detail.detail.detailPicCount > 0">
                    <img v-for="(index,i) in detail.detail.detailPicCount" :key="i" :src="mediaUrlForPic(i)" alt=""
                         class="goods_img">
                </div>
                <div v-else>
                    <p class='text-center' key='nosku'>暂时未有商品详情</p>
                </div>
            </section>
        </section>
        <div slot="fixed" class="m-toolbar">
            <f7-grid class="toolbar-inner">
                <f7-col>
                    <f7-button active color="orange" @click="toCart">加入购物车</f7-button>
                </f7-col>
                <f7-col>
                    <f7-button active color="green" @click="toBuy">立即购买</f7-button>
                </f7-col>
            </f7-grid>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle } from 'lib/const'
  import { getMediaUrl } from 'lib/common'
  import moment from 'lib/moment'
  import globalMixin from 'mixins/globalMixin'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        skuId: -1,
        checked: true,
        material: 0
      }
    },
    mixins: [globalMixin],
    created () {
      if (this.$route.params && this.$route.params.id) {
        this.skuId = this.$route.params.id
      }
      let {dispatch} = this.$store
      dispatch({
        type: native.doGetDetail,
        skuId: this.skuId
      })
    },
    methods: {
      refresh () {
        let {dispatch} = this.$store
        dispatch({
          type: native.doGetDetail,
          skuId: this.skuId
        })
      },
      mediaUrl () {
        return `${getMediaUrl()}sku_main_${this.skuId}_0.jpg`
      },
      mediaUrlForPic (index) {
        return `${getMediaUrl()}sku_detail_${this.skuId}_${index}.jpg`
      },
      formatExpireTime (expireTime) {
        const now = moment()
        const expire = moment(expireTime)
        const duration = moment.duration(expire.diff(now))
        const days = duration.months() * 30 + duration.days()
        return `剩余${days}天${duration.hours()}小时`
      },
      materialChange (index) {
        this.material = index
      },
      addCart () {
        let {commit} = this.$store
        commit(native.doCartAddSku, {
          skuId: this.skuId,
          material: this.material
        })
      },
      toCart () {
        this.addCart()
        this.$f7.alert('加入购物车成功', modalTitle)
      },
      toBuy () {
        this.addCart()
        this.$router.load({url: '/cart'})
      }
    },
    computed: {
      ...mapState({
        skuLoading: ({catalogs}) => catalogs.skuLoading,
        skuError: ({catalogs}) => catalogs.skuError
      }),
      detail () {
        let {catalogs} = this.$store.state
        return catalogs.sku[`detail_${this.skuId}`]
      },
      materialList () {
        let {material} = this.detail.detail
        if (material.trim().length === 0) {
          return null
        }
        return this.detail.detail.material.trim().split(',')
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/sku.scss";
</style>
