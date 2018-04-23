<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回我的"></f7-nav-left>
            <f7-nav-center>收货地址</f7-nav-center>
            <f7-nav-right>
                <f7-link @click="edit">{{mode===modeType.edit?'编辑':'完成'}}</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <div class="wrap">
            <section v-if="address">
                <section v-if="mode===modeType.edit">
                    <f7-card v-for="(row,index) in address" :key="index">
                        <f7-card-header>{{title(row)}}</f7-card-header>
                        <f7-card-content>{{subTitle(row)}}</f7-card-content>
                    </f7-card>
                </section>
                <section v-else>
                    <f7-list media-list>
                        <f7-list-item v-for="(row,index) in address" :key="index" checkbox
                                      name="addressList"
                                      :title="title(row)"
                                      :subtitle="subTitle(row)"
                                      :value="row.id"
                                      @change="changeValue"
                        >
                        </f7-list-item>
                    </f7-list>
                </section>
                <InfiniteLoading @infinite="loadData">
                    <div slot="no-results"></div>
                    <div slot="no-more"></div>
                </InfiniteLoading>
            </section>
        </div>
        <div slot="fixed" class="m-toolbar">
            <f7-button active color="green" v-if="mode===modeType.edit" @click="$router.loadPage('/my/address/add')">
                增加新收货地址
            </f7-button>
            <f7-button active color="orange" v-else @click="delAddress">删除选中地址</f7-button>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import globalMixin from 'mixins/globalMixin'
  import InfiniteLoading from 'vue-infinite-loading'
  import { pageSize as size } from 'lib/const'

  const modeType = {
    'edit': true,
    'browse': false
  }
  export default {
    data () {
      return {
        modeType,
        mode: modeType.edit,
        checkedAddress: new Map(),
      }
    },
    mixins: [globalMixin],
    created () {
    },
    methods: {
      async loadData ($state) {
        let {dispatch} = this.$store
        await dispatch({
          type: native.doListAddress,
          pageSize: size
        }).then(({data}) => {
          if (Array.isArray(data) && data.length > 0) {
            $state.loaded()
          } else {
            $state.complete()
          }
          if (data.length < size) {
            $state.complete()
          }
        })
      },
      changeValue (e) {
        if (!this.checkedAddress.has(e.target.value)) {
          this.checkedAddress.set(e.target.value, e.target.value)
        } else {
          this.checkedAddress.delete(e.target.value)
        }
      },
      delAddress () {
        let {commit, dispatch} = this.$store
        if (this.checkedAddress.size === 0) {
          this.$f7.alert('请选择将要删除的地址', '友情提示')
          return
        }
        let keys = [...this.checkedAddress.keys()]
        dispatch({
          type: native.doDelAddress,
          addressIds: JSON.stringify(keys)
        }).then(() => {
          commit(native.doDelAddress, keys)
          this.checkedAddress.clear()
        }).catch((error) => {
          this.$f7.alert(error, '友情提示')
        })
        console.log('checkedAddress', this.checkedAddress)
      },
      title (row) {
        return `${row.contact}(${row.mobile})(${row.id})`
      },
      subTitle (row) {
        return `${row.province}${row.city}${row.address}`
      },
      edit () {
        this.mode = !this.mode
        if (this.mode) {
          this.checkedAddress.clear()
        }
      }
    },
    computed: {
      ...mapState({
        address: ({address}) => address.address
      })
    }, components: {InfiniteLoading}
  }
</script>
<style lang="scss" scoped type="text/css">
    .m-toolbar {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .m-toolbar > a {
        width: 90%;
    }
</style>
