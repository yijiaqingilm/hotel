<template>
    <f7-page :toolBar="false">
        <f7-navbar>
            <f7-nav-left :link-back="true"></f7-nav-left>
            <f7-nav-center>商品名称</f7-nav-center>
        </f7-navbar>
        <f7-swiper>
            <f7-swiper-slide>1</f7-swiper-slide>
            <f7-swiper-slide>2</f7-swiper-slide>
            <f7-swiper-slide>3</f7-swiper-slide>
        </f7-swiper>

    </f7-page>
</template>

<script>
  export default {
    name: 'goodsItem'
  }
</script>

<style scoped>

</style>