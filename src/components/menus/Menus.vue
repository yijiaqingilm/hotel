<template>
    <div>
        <f7-toolbar bottom tabbar labels>
            <f7-link icon="iconfont icon-home" :active="activeTabbarItem==='home'" text="首页"
                     @click="loadPage('/home')"></f7-link>
            <f7-link icon="iconfont icon-similar" :active="activeTabbarItem==='catalog'" text="分类"
                     @click="loadPage('/catalog')"></f7-link>
            <f7-link icon="iconfont icon-cart" :active="activeTabbarItem==='cart'" text="购物车"
                     @click="loadPage('/cart')"></f7-link>
            <f7-link icon="iconfont icon-my" :active="activeTabbarItem==='my'" text="我的"
                     @click="loadPage({url:'/my'})"></f7-link>
        </f7-toolbar>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {
      loadPage (url) {
        this.$router.loadPage(url)
      }
    },
    computed: {
      activeTabbarItem () {
        return this.$store.state.activeTabbarItem
      }
    },
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
