<template>
    <f7-page>
        <f7-block class="loading">
            <f7-preloader size="20px"></f7-preloader>
            <br>
            <div>加载中</div>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { setToken } from 'lib/common'
  import { commonApi } from 'api/api'

  export default {
    data () {
      return {}
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        const {token} = this.$route.query
        const {commit} = this.$store
        // 先注释
        if (!token) {
          this.$router.reloadPage(`/error?message=${encodeURIComponent('无效的访问来源，请从微信菜单进入')}`)
          return
        }
        const credential = {
          token,
          expireTime: (24 * 60 * 60 * 1000) + new Date().getTime()
        }
        setToken(token)
        commit('doAlreadyBind', credential)
        this.$router.reloadPage('/home')
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    .loading {
        text-align: center;
    }
</style>
