<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回个人资料" sliding></f7-nav-left>
            <f7-nav-center>修改昵称</f7-nav-center>
        </f7-navbar>
        <f7-list>
            <f7-list-item>
                <span slot="media" class='iconfont icon-people'></span>
                <f7-label>请设置昵称</f7-label>
                <f7-input type="text" v-model="nickName"/>
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button big active color="green" @click='handleForm'>确定</f7-button>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import globalMixin from 'mixins/globalMixin'

  export default {
    data () {
      return {
        nickName: ''
      }
    },
    mixins: [globalMixin],
    async created () {
      let {dispatch} = this.$store
      await dispatch({
        type: native.doLoadProfile
      })
      this.nickName = this.profile.nickName
    },
    methods: {
      handleForm () {
        if (!this.nickName) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '请输入您的昵称'
          })
        } else if (this.nickName.length < 1 || this.nickName.length > 30) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '昵称长度必须小于30个字符'
          })
        } else {
          this.$store.dispatch({
            type: native.doSetNickName,
            nickName: this.nickName,
          }).then(() => {
            this.$f7.alert('修改昵称成功', '友情提示', () => {
              this.$router.back()
            })
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
