<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left>
                <f7-link @click="goMy"><i class="icon icon-back"></i><span>返回我的</span></f7-link>
            </f7-nav-left>
            <f7-nav-center>进行中的订单</f7-nav-center>
            <f7-nav-right>
                <f7-link @click="handleContact">联系客服</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <section v-if="listLoading">
            <preloader title="正在加载订单"></preloader>
        </section>
        <section v-if="!listLoading && listError">
            <err-panel @onRefresh="refresh" :msg="listError"></err-panel>
        </section>
        <section v-if="!listLoading && !listError && orders && orders.length>0">
            <f7-card v-for="(row,index) in orders" :key="index">
                <f7-card-header>
                    <div>
                        <div>{{row.createTime | dateFormat}}</div>
                        <div>订单号：{{row.orderNo}}</div>
                    </div>
                    <div>
                        <f7-badge v-if="row.status===2" color="green">已发货</f7-badge>
                        <f7-badge v-if="row.status===1" color="orange">未发货</f7-badge>
                        <f7-badge v-if="row.status===0" color="red">未付款</f7-badge>
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
                        </div>
                    </div>
                    <div v-if="row.remark">
                        备注：{{row.remark}}
                    </div>
                </f7-card-content>
                <f7-card-footer v-if="row.status === 2">
                    <span>物流公司：<strong>{{row.logisticName}}</strong><br/>物流单号：<strong>{{row.logisticNo}}</strong><br/>发货时间：<strong>{{row.logisticTime | dateFormat}}</strong></span>
                    <f7-button color='blue' active @click="handleReceipt(row)">确认收货</f7-button>
                </f7-card-footer>
                <f7-card-footer v-if="row.status === 1">
                    <span>已付：{{(row.price + row.logisticPrice + row.stickfee - row.discount - row.score - row.gift) | toFixed}}元</span>
                    <span>取消订单请联系在线客服</span>
                </f7-card-footer>
                <f7-card-footer v-if="row.status === 0">
                    <span>应付：{{(row.price + row.logisticPrice + row.stickfee - row.discount - row.score - row.gift) | toFixed}}元</span>
                    <f7-button color='green' active @click="handlePay(row.orderNo)">付款</f7-button>
                </f7-card-footer>
            </f7-card>
        </section>

    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { getMediaUrl, handleJump } from 'lib/common'
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import globalMixin from 'mixins/globalMixin'

  export default {
    data () {
      return {}
    },
    mixins: [globalMixin],
    created () {
      let {dispatch} = this.$store
      dispatch({
        type: native.doListOrder
      })
    },
    methods: {
      goMy () {
        this.$router.loadPage('/my')
      },
      refresh () {
        let {dispatch} = this.$store
        dispatch({
          type: native.doListOrder
        })
      },
      getImgUrl (sku) {
        return `${getMediaUrl()}sku_main_${sku.id}_0.jpg`
      },
      handleReceipt (row) {
        let {dispatch, commit} = this.$store
        dispatch({
          type: native.doReceipt,
          orderNo: row.orderNo
        }).then(() => {
          commit(native.delOrderById, row.orderNo)
        })
      },
      handlePay (orderNo) {
        let {commit} = this.$store
        commit(native.clearOrder)
        handleJump(orderNo)
      },
      handleContact () {
        window.location.href = 'tel:' + this.wechat.shopcontact
      }
    },
    computed: {
      ...mapState({
        orders: ({order}) => order.orders,
        listLoading: ({order}) => order.listLoading,
        listError: ({order}) => order.listError
      })
    }
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
