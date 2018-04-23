<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>{{shop&&shop.shopbanner?shop.shopbanner:'推荐商品'}}</f7-nav-center>
        </f7-navbar>
        <section>
            <form class="searchbar searchbar-init hybrid-background" action="javascript:return true;">
                <div class="searchbar-input">
                    <input type="search" @keyup.enter="onSearch" :value="searchValue" @input="updateSearchValue"
                           class="input-search"
                           placeholder="搜索">
                    <a href="#" class="searchbar-clear"></a>
                </div>
                <a href="#" class="searchbar-cancel">关闭</a>
            </form>
        </section>
        <section v-if="!recLoading && !recError">
            <header class="header">推荐商品</header>
            <f7-grid>
                <f7-col width="50" v-for="(skus,index) in recommend" :key="index">
                    <goods-items :skus="skus"></goods-items>
                </f7-col>
            </f7-grid>
        </section>
        <section v-if="!recLoading && recError">
            <f7-block class="text-center">
                获取推荐列表错误
            </f7-block>
        </section>
        <section v-if="!listLoading && !listError">
            <section v-for="(item,index) in catalogs" :key="index">
                <header class="header">
                    <div>{{item.name}}</div>
                    <div class='more' @click="moreCatalog(item)">更多</div>
                </header>
                <f7-grid>
                    <f7-col width="50" v-for="(skus,index) in skuTop[`sku4_${item.id}`]" :key="index">
                        <goods-items :skus="skus"></goods-items>
                    </f7-col>
                </f7-grid>
            </section>
        </section>
        <section v-if="!listLoading && listError">
            <f7-block class="text-center">
                获取商品列表错误
            </f7-block>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import GoodsItems from 'section/goodsItem/GoodsItem'
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'

  export default {
    data () {
      return {}
    },
    async created () {
      let {commit, dispatch} = this.$store
      commit('setActiveTabbarItem', 'home')
      dispatch({
        type: native.doRecommend
      })
      dispatch({
        type: native.doLoadJsConfig
      })
      await dispatch({
        type: native.doListCatalogs
      })
      this.catalogs.forEach((row) => {
        dispatch({
          type: native.top4Skus,
          catalogId: row.id
        })
      })
    },
    methods: {
      updateSearchValue (e) {
        this.$store.commit(native.updateSearchValue, e.target.value)
      },
      onClear () {

      },
      onSearch () {
        this.$store.dispatch(native.doSearch, {
          type: native.doSearch,
          keyword: this.searchValue,
        }).then(() => {
          this.$router.loadPage('/search')
        })
      },
      moreCatalog (catalog) {
        this.$router.loadPage(`/catalog/list/${catalog.id}`)
      }
    },
    computed: mapState({
      searchValue: ({catalogs}) => catalogs.searchValue,
      searchList: ({catalogs}) => catalogs.searchList,
      shop: ({catalogs}) => catalogs.shop,
      catalogs: ({catalogs}) => catalogs.catalogs,
      skuTop: ({catalogs}) => catalogs.skuTop,
      recommend: ({catalogs}) => catalogs.recommend,
      recLoading: ({catalogs}) => catalogs.recLoading,
      recError: ({catalogs}) => catalogs.recError,
      listLoading: ({catalogs}) => catalogs.listLoading,
      listError: ({catalogs}) => catalogs.listError
    }),
    components: {GoodsItems}
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
