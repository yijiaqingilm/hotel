<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回个人资料" sliding></f7-nav-left>
            <f7-nav-center>修改手机号</f7-nav-center>
        </f7-navbar>
        <section>
            <header class="content-block-title">请设置手机号码</header>
            <f7-list>
                <f7-list-item>
                    <span slot="media" class='iconfont icon-people'></span>
                    <f7-input type="text" v-model="mobile"/>
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-button big active color="green" @click='handleForm'>确定</f7-button>
            </f7-block>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import globalMixin from 'mixins/globalMixin'

  export default {
    data () {
      return {
        mobile: ''
      }
    },
    mixins: [globalMixin],
    async created () {
      let {dispatch} = this.$store
      await dispatch({
        type: native.doLoadProfile
      })
      this.mobile = this.profile.mobile
    },
    methods: {
      handleForm () {
        if (!this.mobile) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '请设置手机号码'
          })
        } else if (/^1[34578]\d{9}$/.test(this.mobile)) {
          this.$store.dispatch({
            type: native.doSetMobile,
            mobile: this.mobile,
          }).then(() => {
            this.$f7.alert('修改手机号成功', '友情提示', () => {
              this.$router.back()
            })
          })
        } else {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '手机号码格式有误'
          })

        }
      }
    },
    computed: {
      ...mapState({
        profile ({profile}) {
          return profile.profile
        }
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
