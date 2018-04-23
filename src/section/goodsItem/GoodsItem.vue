<template>
    <section @click="skuDetail(skus)">
        <f7-card>
            <f7-card-content>
                <div>
                    <img :src="mediaUrl(skus.id)" class="goods_img" alt="">
                </div>
                <div>{{skus.name}}</div>
                <div>原价：<strike>¥{{skus.originalPrice | toFixed}}</strike></div>
                <div class="content">
                    <div class="price">现价：¥{{skus.price | toFixed}}</div>
                    <div class="unit">/{{skus.unit}}</div>
                </div>
                <div class="vipprice">VIP价：¥{{skus.vipprice | toFixed}}</div>
            </f7-card-content>
        </f7-card>
    </section>
</template>

<script type="text/ecmascript-6">
  import { getMediaUrl } from 'lib/common'

  export default {
    props: {
      skus: Object
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      mediaUrl (id) {
        return `${getMediaUrl()}sku_main_${id}_0.jpg`
      },
      skuDetail (skus) {
        this.$router.loadPage(`/catalog/sku/${skus.id}`)
      }
    },
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "./goodsItem.scss";
</style>
