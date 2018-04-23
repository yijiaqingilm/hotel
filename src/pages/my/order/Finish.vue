<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回我的"></f7-nav-left>
            <f7-nav-center>已完成订单</f7-nav-center>
        </f7-navbar>
        <section v-if="!finishError">
            <f7-card v-for="(row,index) in orders" :key="index">
                <f7-card-header>
                    <div>
                        <div>{{row.createTime | dateFormat}}</div>
                        <div>订单号：{{row.orderNo}}</div>
                    </div>
                    <div>
                        <f7-badge v-if="row.status===3" color="green">已收货</f7-badge>
                        <f7-badge v-if="row.status===4" color="orange">已取消</f7-badge>
                    </div>
                </f7-card-header>
                <f7-card-content>
                    <f7-list media-list>
                        <f7-list-item v-for="(sku,index) in row.skus"
                                      :key="index"
                                      :title="sku.name"
                                      :after="`${sku.quality}${sku.unit}`"
                                      :subtitle="sku.material">
                            <div slot="media">
                                <img :src="getImgUrl(sku)" class="media_img" alt="">
                            </div>
                        </f7-list-item>
                    </f7-list>
                    <div class="column2">
                        <div>
                            <div v-if="row.status !== 0">
                                支付方式：微信
                            </div>
                            <div>城市：{{row.province}} {{row.city}}</div>
                            <div>地址：{{row.address}}</div>
                            <div>收货人：{{row.contact}}</div>
                            <div>电话：{{row.mobile}}</div>
                        </div>
                        <div>
                            <div>总价：{{row.price | toFixed}}元</div>
                            <div>邮费：{{row.logisticPrice | toFixed}}元</div>
                            <div v-if="row.stickfee > 0">贴书费：{{row.stickfee}}元</div>
                            <div v-if="row.score>0">积分：-{{row.score}}元</div>
                            <div v-if="row.gift>0">礼券：-{{row.gift}}元</div>
                            <div v-if="row.discount!==0">
                                改价：-{{row.discount | toFixed}}元
                            </div>
                            <div>应付：
                                {{(row.price + row.logisticPrice + row.stickfee - row.discount - row.score - row.gift) |
                                toFixed}}元
                            </div>
                        </div>
                    </div>
                    <div v-if="row.remark">
                        备注：{{row.remark}}
                    </div>
                </f7-card-content>
                <f7-card-footer v-if="row.status === 3">
                    <span>物流公司：<strong>{{row.logisticName}}</strong><br/>发货时间：<strong>{{row.logisticTime | dateFormat }}</strong></span>
                    <span>物流单号：<strong>{{row.logisticNo}}</strong><br/>收货时间：<strong>{{row.finishTime | dateFormat}}</strong></span>
                </f7-card-footer>
            </f7-card>
            <InfiniteLoading @infinite="loadData">
                <div slot="no-result">没有分类数据</div>
                <div slot="no-more">没有更多数据</div>
            </InfiniteLoading>
        </section>
        <section v-if="finishError">
            <f7-block class="text-center">
                获取完成订单失败!!!
            </f7-block>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import InfiniteLoading from 'vue-infinite-loading'
  import { getMediaUrl } from 'lib/common'
  import { globalConst as native, pageSize as size } from 'lib/const'
  import globalMixin from 'mixins/globalMixin'
  import { pageSize } from '../../../lib/const'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        pageIndex: 0,
        orders: []
      }
    },
    mixins: [globalMixin],
    created () {
    },
    methods: {
      async loadData ($state) {
        let {dispatch} = this.$store
        await dispatch({
          type: native.doListFinishOrder,
          index: this.pageIndex,
          pageSize: size
        }).then(({data}) => {
          if (Array.isArray(data) && data.length > 0) {
            this.orders = this.orders.concat(data)
            $state.loaded()
            this.pageIndex += size
          } else {
            $state.complete()
          }
          if (data.length < size) {
            $state.complete()
          }
        })
      },
      getImgUrl (sku) {
        return `${getMediaUrl()}sku_main_${sku.id}_0.jpg`
      },
    },
    computed: {
      ...mapState({
        finishLoading: ({order}) => order.finishLoading,
        finishError: ({order}) => order.finishError
      })
    }, components: {InfiniteLoading}
  }
</script>
<style lang="scss" scoped type="text/css">
    .column2 {
        display: flex;
        width: 100%;
        margin-top: 20px; /*no*/
    }

    .column2 > div {
        width: 40%;
        text-align: right;
    }

    .column2 > div:first-child {
        width: 60%;
        text-align: left;
    }
</style>
