<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>搜索结果</f7-nav-center>
        </f7-navbar>
        <section>
            <form class="searchbar searchbar-init hybrid-background" action="javascript:return true;">
                <div class="searchbar-input">
                    <input type="search" readonly :value="searchValue" @click="back"
                           class="input-search"
                           placeholder="搜索">
                    <a href="#" class="searchbar-clear"></a>
                </div>
                <a href="#" class="searchbar-cancel">关闭</a>
            </form>
        </section>
        <section>
            <f7-grid>
                <f7-col width="50" v-for="(skus,index) in searchList" :key="index">
                    <goods-items :skus="skus"></goods-items>
                </f7-col>
            </f7-grid>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import GoodsItems from 'section/goodsItem/GoodsItem'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    async created () {
      let {commit, dispatch} = this.$store
    },
    methods: {
      back () {
        this.$router.back()
      },
      moreCatalog (catalog) {
        this.$router.loadPage(`/catalog/list/${catalog.id}`)
      }
    },
    computed: mapState({
      searchValue: ({catalogs}) => catalogs.searchValue,
      searchList: ({catalogs}) => catalogs.searchList,
      catalogs: ({catalogs}) => catalogs.catalogs,
    }),
    components: {GoodsItems}
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
