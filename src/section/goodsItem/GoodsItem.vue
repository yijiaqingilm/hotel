<template>
    <section @click="detail(goods)">
        <f7-card>
            <f7-card-content class="g-goods" :inner="false">
                <img src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp" alt="">
                <div class='tags'>
                    <f7-badge color="red">xxx</f7-badge>
                    <f7-badge color="red">yyy</f7-badge>
                </div>
            </f7-card-content>
            <f7-card-footer>
                <div>
                    <div class='g-title'>
                        <i class="icon">此处可添加标签</i>
                        商品标商品标商品标商品标商品标商品标商品标商品标
                    </div>
                    <div><span>商品信息1</span><span>商品信息2</span></div>
                </div>
                <div><span class='price'>¥201</span>起</div>
            </f7-card-footer>
        </f7-card>
    </section>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {goods: {}},
    data () {
      return {}
    },
    created () {
    },
    methods: {
      detail (goods) {
        this.$router.loadPage(`/hotel/${goods.id}`)
      }
    },
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "./goodsItem.scss";
</style>
