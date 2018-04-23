<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回我的" sliding></f7-nav-left>
            <f7-nav-center>更多</f7-nav-center>
        </f7-navbar>
        <f7-list>
            <f7-list-item media="<span class='iconfont icon-question' />"
                          link="/my/more/qa"
                          title="常见问题">
            </f7-list-item>
            <f7-list-item media="<span class='iconfont icon-text' />"
                          link="/my/more/license"
                          title="用户协议">
            </f7-list-item>
            <f7-list-item divider></f7-list-item>
            <f7-list-item media="<span class='iconfont icon-group' />"
                          link="/my/more/about"
                          title="关于我们">
            </f7-list-item>
            <f7-list-item media="<span class='iconfont icon-phone' />"
                          link
                          @click="handleContact"
                          title="联系我们">
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {
      handleContact () {
        window.location.href = 'tel:' + this.wechat.shopcontact
      }
    },
    computed: {
      wechat () {
        return this.$store.state.catalogs.shop
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
