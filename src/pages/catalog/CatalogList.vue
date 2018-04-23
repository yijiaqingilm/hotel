<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回" sliding></f7-nav-left>
            <f7-nav-center>{{title}}</f7-nav-center>
        </f7-navbar>
        <section v-if="!skuListError">
            <f7-grid>
                <f7-col width="50" v-for="(sku,index) in skus" :key="index">
                    <goods-item :skus="sku"></goods-item>
                </f7-col>
            </f7-grid>
            <InfiniteLoading @infinite="loadData">
                <div slot="no-result">没有分类数据</div>
                <div slot="no-more">没有更多数据</div>
            </InfiniteLoading>
        </section>
        <section v-if="skuListError">
            <f7-block class="text-center">
                获取商品列表错误
            </f7-block>
        </section>

    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'
  import { mapState } from 'vuex'
  import GoodsItem from 'section/goodsItem/GoodsItem'
  import globalMixin from 'mixins/globalMixin'
  import { pageSize as size } from 'lib/const'

  export default {
    data () {
      return {
        pageIndex: 0,
        catalogId: -1,
        skus: [],
        title: '商品'
      }
    },
    mixins: [globalMixin],
    created () {
      if (this.$route.params && this.$route.params.id) {
        this.catalogId = this.$route.params.id
      }
      if (this.catalogs && this.catalogs.length > 0) {
        this.catalogs.some((row) => {
          if (row.id === this.catalogId >>> 0) {
            this.title = row.name
            return true
          }
          return false
        })
      }

    },
    methods: {
      async loadData ($state) {
        let {dispatch} = this.$store
        dispatch({
          type: native.doListSkus,
          catalogId: this.catalogId,
          index: this.pageIndex,
          pageSize: size
        }).then(({data}) => {
          let result = data.data
          if (Array.isArray(result) && result.length > 0) {
            this.skus = this.skus.concat(result)
            $state.loaded()
            this.pageIndex += size
          } else {
            $state.complete()
          }
          if (result.length < size) {
            $state.complete()
          }
        })
      }
    },
    computed: {
      ...mapState({
        skuListError: ({catalogs}) => catalogs.skuListError
      })
    },
    components: {InfiniteLoading, GoodsItem}
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
