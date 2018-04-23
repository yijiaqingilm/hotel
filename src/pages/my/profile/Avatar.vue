<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回个人资料"></f7-nav-left>
            <f7-nav-center>修改头像</f7-nav-center>
        </f7-navbar>
        <f7-card>
            <f7-card-content>
                <vue-dropzone id="dropzone"
                              class="dropzone"
                              ref="myVueDropzone"
                              @vdropzone-success="uploadSuccess"
                              :options="dropzoneOptions"></vue-dropzone>
            </f7-card-content>
            <f7-card-footer>
                <f7-link v-if="uploadStatus" @click="delFile">清除</f7-link>
            </f7-card-footer>
        </f7-card>
        <f7-block>
            <f7-button active color="green" @click="uploadFile">确定</f7-button>
        </f7-block>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import VueDropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import globalMixin from 'mixins/globalMixin'

  let test = require('assets/avatar.png')
  export default {
    data () {
      return {
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 200,
          addRemoveLinks: true,
          dictDefaultMessage: '尚未设置头像',
        },
        uploadStatus: false,
        file: null
      }
    },
    mixins: [globalMixin],
    async created () {
      let {dispatch} = this.$store
      await dispatch({
        type: native.doLoadProfile
      })
      if (this.profile && this.profile.avatar) {
        this.dropzoneOptions.dictDefaultMessage = `<img src="${this.profile.avatar}">`
      }
    },
    methods: {
      uploadSuccess (file) {
        this.uploadStatus = true
        this.file = file
        console.log(file)
      },
      delFile () {
        this.$refs.myVueDropzone.removeAllFiles()
        this.uploadStatus = false
      },
      uploadFile () {
        if (this.file === null) {
          this.$f7.addNotification({
            media: ' <span class = \'iconfont icon-profile\' > </span>',
            title: '提示',
            message: '请先上传头像图片'
          })
          return
        }
        const fileType = this.file.type
        if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
          this.$f7.addNotification({
            media: '<span class = \'iconfont icon-warning\' > </span>',
            title: '错误',
            message: '头像图片必须为jpg或png格式'
          })
          return
        }
        if (this.file.size > 100 * 1024) {
          this.$f7.addNotification({
            midia: '<span class= \'iconfont icon-warning\' > </span>',
            title: '错误',
            message: '头像图片文件必须小于100Kb'
          })
          return
        }

        this.$store.dispatch({
          type: native.doSetAvatar,
          avatarData: this.file.dataURL,
          contentType: fileType,
        }).then(() => {
          this.$f7.alert('设置头像成功', '友情提示', () => {
            this.$router.back()
          })
        }).catch((error) => {
          this.$f7.alert(error, '友情提示')
        })
      }
    },
    computed: {
      ...mapState({
        profile ({profile}) {
          return profile.profile
        }
      })

    },
    components: {VueDropzone}
  }
</script>
<style lang="scss" scoped type="text/css">
    .dropzone {
        text-align: center;
    }
</style>
