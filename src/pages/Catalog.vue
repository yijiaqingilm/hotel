<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>所有分类</f7-nav-center>
        </f7-navbar>
        <section v-if="listLoading">
            <preloader title="加载分类商品中。。。"></preloader>
        </section>
        <section v-if="!listLoading &&listError">
            <err-panel @onRefresh="onRefresh" :msg="catalog.listError"></err-panel>
        </section>
        <section v-if="!listLoading && !listError && (!catalogs || catalogs.length === 0)">
            <err-panel @onRefresh="onRefresh" msg="抱歉，还未有任何商品分类"></err-panel>
        </section>
        <section v-if="!listLoading && !listError && catalogs && catalogs.length > 0">
            <div v-for="(catalog,index) in catalogs" :key="index" @click="moreCatalog(catalog)">
                <f7-card>
                    <f7-card-header>{{catalog.name}}</f7-card-header>
                    <f7-card-content :inner="false">
                        <img :src="mediaUrl(catalog.imgId)" alt="" class="goods_img">
                    </f7-card-content>
                    <f7-card-footer class="text-right">
                        <div></div>
                        <div>{{catalog.remark}}</div>
                    </f7-card-footer>
                </f7-card>
            </div>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { getMediaUrl } from 'lib/common'
  import globalMixin from 'mixins/globalMixin'
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'

  export default {
    data () {
      return {
        err: false
      }
    },
    mixins: [globalMixin],
    created () {
      let {commit, dispatch} = this.$store
      commit('setActiveTabbarItem', 'catalog')
    },
    methods: {
      mediaUrl (imgId) {
        return `${getMediaUrl()}catalog_${imgId}.jpg`
      },
      moreCatalog (catalog) {
        this.$router.loadPage(`/catalog/list/${catalog.id}`)
      },
      onRefresh () {
        this.$store.dispatch({
          type: native.doListCatalogs
        })
      }
    },
    computed: {
      ...mapState({
        listLoading: ({catalogs}) => catalogs.listLoading,
        listError: ({catalogs}) => catalogs.listError
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
