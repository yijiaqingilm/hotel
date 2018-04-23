<template>
    <f7-page @page:init="init">
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>我的</f7-nav-center>
        </f7-navbar>
        <section v-if="profile && dashboard">
            <f7-list media-list v-if="profile.imbCode && (dashboard.auth === 1 || dashboard.auth === '')">
                <f7-list-item link="/my/profile"
                              :media="profileAvatar"
                              :subtitle="profileSubTitle"
                              text="陆续推出活动获取积分和礼券"
                              :title="profile.nickName || '未设置昵称'">

                </f7-list-item>
            </f7-list>
            <f7-list media-list v-if="profile.imbCode && dashboard.auth === -1">
                <f7-list-item link="/my/profile"
                              :media="profileAvatar"
                              subtitle="微信已绑定其他点读笔"
                              text="请联系客服更新状态"
                              :title="profile.nickName || '未设置昵称'">

                </f7-list-item>
            </f7-list>
            <f7-list media-list v-if="profile.imbCode && dashboard.auth === -2">
                <f7-list-item link="/my/profile"
                              :media="profileAvatar"
                              subtitle="点读笔已被其他微信绑定"
                              text="请联系客服更新状态"
                              :title="profile.nickName || '未设置昵称'">

                </f7-list-item>
            </f7-list>
            <f7-list media-list v-if="!profile.imbCode">
                <f7-list-item link="/my/profile"
                              :media="profileAvatar"
                              subtitle="绑定点读笔，获取积分和礼券享受更多优惠"
                              :title="profile.nickName || '未设置昵称'">

                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-item media="<span class='iconfont icon-deliver' />"
                              link="/my/order"
                              title="进行中订单">
                    <div slot="after">
                        <f7-badge v-if="dashboard.orderCount>0">{{dashboard.orderCount}}</f7-badge>
                    </div>
                </f7-list-item>
                <f7-list-item media="<span class='iconfont icon-ticket' />"
                              link="/my/order/finish"
                              title="已完成订单">
                </f7-list-item>
                <f7-list-item media="<span class='iconfont icon-addressbook' />"
                              link="/my/address/list"
                              title="我的收货地址">
                    <div slot="after">
                        <f7-badge v-if="dashboard.addressCount>0">{{dashboard.addressCount}}</f7-badge>
                    </div>
                </f7-list-item>
                <f7-list-item divider>

                </f7-list-item>
                <f7-list-item media="<span class='iconfont icon-more' />"
                              link="/my/more"
                              title="更多">
                </f7-list-item>
            </f7-list>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import globalMixin from 'mixins/globalMixin'

  export default {
    data () {
      return {}
    },
    mixins: [globalMixin],
    created () {
      this.$store.commit('setActiveTabbarItem', 'my')
      let {dispatch} = this.$store
      dispatch({
        type: native.doLoadProfile
      })
      dispatch({
        type: native.doLoadDashboard
      })
    },
    methods: {
      init () {
        this.$f7.showToolbar('.toolbar')
      }
    },
    computed: {
      profileAvatar () {
        let avatarUrl = this.profile.avatar || require('assets/avatar.png')
        return `<img src="${avatarUrl}" class="media_img">`
      },
      profileSubTitle () {
        if (!this.dashboard) {
          return ''
        }
        return `积分：${this.dashboard.point > -1 ? this.dashboard.point : 0} 礼券：${this.dashboard.gift > -1 ? this.dashboard.gift : 0}`
      },
      orderAfter (num) {
        return ''
      },
      ...mapState({
        profile ({profile}) {
          return profile.profile
        },
        dashboard ({dashboard}) {
          return dashboard.dashboard
        }
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
