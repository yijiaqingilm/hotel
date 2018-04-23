<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回更多"></f7-nav-left>
            <f7-nav-center>常见问题</f7-nav-center>
        </f7-navbar>
        <f7-block>
            <h3>怎样绑定点读笔？</h3>
            <p>请将点读笔连接到客户端，并切换到客户端商城界面，扫描二维码。</p>
            <img :src="getImgUrl()" class="qa_img"/>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { getMediaUrl } from 'lib/common'

  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {
      getImgUrl () {
        return `${getMediaUrl()}qrcode.jpg`
      }
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    .qa_img {
        margin: 0 auto;
        width: 180px; /*no*/
        height: 180px; /*no*/
    }
</style>
