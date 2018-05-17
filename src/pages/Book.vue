<template>
    <f7-page no-toolbar class="book">
        <f7-navbar>
            <f7-nav-left :back-link="true"></f7-nav-left>
            <f7-nav-center>订单填写</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-list media-list>
                <f7-list-item title="标题xxxx" after="$15" text="xx|yy|dd" :link="true">
                    <div slot='media'>
                        <img src="https://dimg04.c-ctrip.com/images/2B0f0g00000086i5h406E_R_750_560_Q80.jpg_.webp"
                             alt="">
                    </div>
                </f7-list-item>
            </f7-list>
            <div class='calendar-choice'>
                <div>
                    <div class='type'>入住</div>
                    <div><span class='date'>04-24</span><span class='week'>周二</span></div>
                </div>
                <div>
                    <div class='type'>离店</div>
                    <div><span>04-24</span><span>周二</span></div>
                </div>
                <div class='item-row'>共x晚</div>
            </div>
            <div class='hint'>惺惺惜惺惺想</div>
            <section class='client-choice'>
                <header>选择入住人</header>
                <!--入住人为空时-->
                <!--不为空时-->
                <div>
                    <span>一家清华</span>
                    <span>+更多</span>
                </div>
                <footer>
                    <f7-list>
                        <f7-list-item>
                            <f7-label>手机号</f7-label>
                            <f7-input type='text' placeholder="请输入用于联系的手机号"></f7-input>
                        </f7-list-item>
                        <f7-list-item title="优惠券" :link="true" after="2张可用的优惠券">
                        </f7-list-item>
                    </f7-list>
                </footer>
            </section>
        </section>
        <div slot="fixed" class="m-toolbar">
            <div class='total-info'>
                <div class='total-price'>
                    <div>总价：<span class='price'>￥300</span></div>
                    <div>(优惠已减￥30.00)</div>
                </div>
                <div class='total-detail' @click="doShowDetail">
                    明细
                </div>
                <div class='total-submit'>
                    <a href="#">提交</a>
                </div>
            </div>
            <div class="total-detail-info" v-if="showDetail">
                <section class='box'>
                    <header>
                        <div>房费</div>
                        <div>xx晚，共￥1200.00</div>
                    </header>
                    <div class='particulars-list'>
                        <div>
                            <div>2018-151-10</div>
                            <em>$300</em>
                        </div>
                        <div>
                            <div>2018-151-10</div>
                            <em>$300</em>
                        </div>
                    </div>
                </section>
                <section class='box one-px'>
                    <header>
                        <div>优惠</div>
                    </header>
                    <div class="particulars-list">
                        <div>
                            <div>连住优惠</div>
                            <em>-￥100</em>
                        </div>
                    </div>
                </section>
                <section class='box'>
                    <div class="particulars-list">
                        <div>
                            <div>线上支付</div>
                            <em>$1000</em>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <masking :showMask="showDetail" @click="doHideDetail"></masking>
    </f7-page>
</template>

<script>
  export default {
    name: 'book',
    data () {
      return {
        showDetail: false
      }
    },
    methods: {
      toPay () {
        console.log('pay')
      },
      doShowDetail () {
        this.showDetail = true
      },
      doHideDetail () {
        this.showDetail = false
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
    @import "../css/book.scss";
</style>