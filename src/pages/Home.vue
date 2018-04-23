<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-center>首页</f7-nav-center>
        </f7-navbar>
        <!--1.banner， 2.展示分类列表数据， toolbar：首页 我的，订单-->
        <f7-swiper>
            <f7-swiper-slide>1</f7-swiper-slide>
            <f7-swiper-slide>2</f7-swiper-slide>
            <f7-swiper-slide>3</f7-swiper-slide>
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
    components: {GoodsItem}
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>