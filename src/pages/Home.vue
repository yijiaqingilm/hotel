<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-center>首页</f7-nav-center>
        </f7-navbar>
        <!--1.banner， 2.展示分类列表数据， toolbar：首页 我的，订单-->
        <f7-swiper class="h-banner" pagination :init="false">
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
            <f7-swiper-slide><a href="#"><img
                    src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"></a>
            </f7-swiper-slide>
        </f7-swiper>
        <section>
            <header class="h-header">
                <i class="icon icon-xin"></i><span class="h-title">为您推荐</span>
            </header>
            <goods-item :goods="goods"></goods-item>
            <goods-item></goods-item>
        </section>
    </f7-page>
</template>

<script>
  import GoodsItem from 'section/goodsItem/GoodsItem'

  export default {
    name: 'home',
    data () {
      return {
        goods: {id: 1}
      }
    },
    mounted () {
      this.$nextTick(() => {
        const hBanner = this.$f7.swiper('.h-banner', {
          pagination: '.swiper-pagination',
          speed: 400,
          autoplay: 2000,
        })
      })
    },
    components: {GoodsItem}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>