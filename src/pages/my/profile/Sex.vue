<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回个人资料" sliding></f7-nav-left>
            <f7-nav-center>修改性别</f7-nav-center>
        </f7-navbar>
        <section>
            <header class="content-block-title">请选择性别</header>
            <f7-list form>
                <f7-list-item radio
                              name="sex"
                              title="男"
                              :checked="sex===1"
                              @change="changeSex(1)">
                </f7-list-item>
                <f7-list-item radio
                              name="sex"
                              title="女"
                              :checked="sex===2"
                              @change="changeSex(2)">
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
        sex: 0
      }
    },
    mixins: [globalMixin],
    async created () {
      let {dispatch} = this.$store
      await dispatch({
        type: native.doLoadProfile
      })
      this.sex = parseInt(this.profile.sex, 10)
    },
    methods: {
      changeSex (sex) {
        this.sex = sex
      },
      handleForm () {
        if (this.sex !== 1 && this.sex !== 2) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>)',
            title: '错误',
            message: '请选择性别'
          })
        } else {
          this.$store.dispatch({
            type: native.doSetSex,
            sex: this.sex,
          }).then(() => {
            this.$f7.alert('修改性别成功', '友情提示', () => {
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
