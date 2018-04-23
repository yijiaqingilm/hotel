<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回我的" sliding></f7-nav-left>
            <f7-nav-center>个人资料</f7-nav-center>
        </f7-navbar>
        <f7-list>
            <f7-list-item link="/my/profile/avatar" media="<span class='iconfont icon-pic' />" title="头像">
                <div slot="after" v-if="profile.avatar">
                    <img :src="profile.avatar" width="28" height="28"/>
                </div>
                <div slot="after" v-else>
                    未设置
                </div>
            </f7-list-item>
            <f7-list-item link="/my/profile/nickName" media="<span class='iconfont icon-profile' />" title="昵称">
                <div slot="after">{{profile.nickName || '未设置'}}</div>
            </f7-list-item>
            <f7-list-item link="/my/profile/sex" media="<span class='iconfont icon-like' />" title="性别">
                <div slot="after">{{(!profile.sex || profile.sex === 0) ? '未设置' : (profile.sex === 1 ? '男' : '女')}}
                </div>
            </f7-list-item>
            <f7-list-item link="/my/profile/mobile" media="<span class='iconfont icon-mobile' />" title="手机号码">
                <div slot="after">{{profile.mobile || '未设置'}}</div>
            </f7-list-item>
            <f7-list-item link="/my/profile/city" media="<span class='iconfont icon-location' />" title="城市">
                <div slot="after">{{(profile.city && profile.province) ? `${profile.province} ${profile.city}` :
                    '未设置'}}
                </div>
            </f7-list-item>
            <f7-list-item link @click="bindPen" media="<span class='iconfont icon-discover' />"
                          :title="(profile.imbCode) ? '已绑定点读笔' : '绑定点读笔'">
                <div slot="after">{{(profile.imbCode) ? `${profile.imbCode}` : '未绑定'}}</div>
            </f7-list-item>
        </f7-list>
        <f7-list v-if="profile && !wechat.init">
            <f7-list-item after="暂时无法扫描二维码"></f7-list-item>
        </f7-list>
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
      let {dispatch} = this.$store
      dispatch({
        type: native.doLoadProfile
      })
    },
    methods: {
      bindPen () {
        const {wechat} = this
        const {dispatch} = this.$store
        var self = this
        if (wechat.init) {
          wx.scanQRCode({
            needResult: 1,
            scanType: ['qrCode'],
            success: function (res) {
              var result = res.resultStr
              if (result.substr(0, 4) === 'http') {
                alert('请扫描第5步提示的二维码')
                return
              }
              var crypto = require('crypto')
              var imbcode = result.substring(3, result.indexOf('.', 0))
              var md5sum = crypto.createHash('md5')
              md5sum.update(imbcode)
              var crypstr = 'IMB' + imbcode + '.' + md5sum.digest('hex').substr(5)
              crypstr = crypstr.substr(0, 20)
              if (crypstr === result) {
                dispatch({
                  type: native.doBindImbcode,
                  imbCode: imbcode
                })
              } else {
                alert('非法点读笔序列号！')
              }
            }
          })
        } else {
          if (__DEBUG__) {
            var imbcode = '00002251889'
            dispatch({
              type: native.doBindImbcode,
              imbCode: imbcode
            })
          } else {
            alert('暂时无法绑定点读笔序列号！')
          }
        }
      }
    },
    computed: {
      ...mapState({
        profile ({profile}) {
          return profile.profile
        },
        wechat ({catalogs}) {
          return catalogs.wechat
        }
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
