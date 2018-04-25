<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left :link-back="true"></f7-nav-left>
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
                    <div>入住</div>
                    <div><span>04-24</span><span>周二</span></div>
                </div>
                <div>
                    <div>离店</div>
                    <div><span>04-24</span><span>周二</span></div>
                </div>
                <div>共x晚</div>
            </div>
            <div class='hint'>惺惺惜惺惺想</div>
            <section>
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
                            <f7-input placeholder="请输入用于联系的手机号"></f7-input>
                        </f7-list-item>
                        <f7-list-item title="优惠券" :link="true" after="2张可用的优惠券">
                        </f7-list-item>
                    </f7-list>
                </footer>
            </section>
        </section>
        <div slot="fixed" class="m-toolbar">
            <f7-grid class="toolbar-inner">
                <f7-col width="70">
                    <div>
                        <div>总价：<span class='price'>￥300</span></div>
                        <div>(优惠已减￥30.00)</div>
                    </div>
                    <div>
                        明细《
                    </div>
                </f7-col>
                <f7-col width="30">
                    <f7-button active color="red" @click="toPay">提交</f7-button>
                </f7-col>
            </f7-grid>
        </div>
    </f7-page>
</template>

<script>
  export default {
    name: 'book',
    methods: {
      toPay () {
        console.log('pay')
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">

</style>