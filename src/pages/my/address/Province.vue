<template>
    <f7-page no-toolbar>
        <f7-navbar>
            <f7-nav-left back-link="返回"></f7-nav-left>
            <f7-nav-center>选择省份</f7-nav-center>
        </f7-navbar>
        <f7-list v-if="provinces">
            <f7-list-item v-for="(row,index) in provinces" v-if="index<=10"
                          radio
                          :key="index"
                          :value="row.id"
                          name="province"
                          :checked="city.provinceId === row.id"
                          @click="selectProvince(row)"
                          :title="row.province">

            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    created () {
      let {commit, dispatch} = this.$store
      dispatch(native.doListProvince)
    },
    methods: {
      selectProvince (province) {
        this.$store.commit(native.doSelectProvince, {
          provinceId: province.id, provinceName: province.province
        })
        this.$router.loadPage('/my/address/city')
      }
    },
    computed: {
      ...mapState({
        provinces ({address}) {
          return address.provinces
        },
        city ({address}) {
          return address.city
        }
      }),
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
