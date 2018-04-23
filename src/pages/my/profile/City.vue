<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="返回个人资料" sliding></f7-nav-left>
            <f7-nav-center>修改城市</f7-nav-center>
        </f7-navbar>
        <section>
            <input type="hidden" id="province">
            <input type="hidden" id="city">
            <f7-list>
                <f7-list-item title="省份" @click="openProvince" :after="city.provinceName"></f7-list-item>
                <f7-list-item title="城市" @click="openCity" :after="city.cityName"></f7-list-item>
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
        city: {
          provinceName: '',
          provinceId: '',
          cityName: '',
          cityId: '',
          pickerProvince: null,
          pickerCity: null
        }
      }
    },
    mixins: [globalMixin],
    async created () {
      let {dispatch, commit} = this.$store
      await dispatch({type: native.doLoadProfile})
      this.city.provinceId = this.profile.provinceId
      this.city.provinceName = this.profile.province
      this.city.cityId = this.profile.cityId
      this.city.cityName = this.profile.city
      await dispatch({
        type: native.doListProvince,
      })
      // 若为空 则默认province第一个为选中的值
      if (!this.city.provinceId && this.provinces && this.provinces.length > 0) {
        this.city.provinceId = this.provinces[0].id
        this.city.provinceName = this.provinces[0].province
      }
      commit(native.doSelectProvince, {
        provinceName: this.city.provinceName,
        provinceId: this.city.provinceId
      })
      commit(native.doSelectCity, {
        cityId: this.city.cityId,
        cityName: this.city.cityName
      })
      this.$nextTick(() => {
        let ids = []
        let values = []
        this.provinces.forEach((row) => {
          ids.push(row.id)
          values.push(row.province)
        })
        this.pickerProvince = this.$f7.picker({
          closeByOutsideClick: false,
          input: '#province',
          cols: [
            {
              textAlign: 'center',
              values: ids,
              value: this.city.provinceId + '',
              displayValues: values,
              dispalyValue: this.city.provinceName
            }
          ],
          onClose: ({cols}) => {
            if (this.city.provinceId !== cols[0].value) {
              this.city.provinceName = cols[0].displayValue
              this.city.provinceId = cols[0].value
              this.city.cityId = -1
              this.city.cityName = ''
              commit(native.doSelectProvince, {
                provinceName: cols[0].displayValue,
                provinceId: cols[0].value
              })
              dispatch({
                type: native.doListCity,
              }).then(() => {
                let ids = []
                let values = []
                this.cityList && this.cityList.forEach((row) => {
                  ids.push(row.id)
                  values.push(row.city)
                })
                this.pickerCity.cols[0].replaceValues(ids, values)
              })
            }
          }
        })
      })
      await dispatch({
        type: native.doListCity
      })
      this.$nextTick(() => {
        let ids = []
        let values = []
        this.cityList && this.cityList.forEach((row) => {
          ids.push(row.id)
          values.push(row.city)
        })
        this.pickerCity = this.$f7.picker({
          closeByOutsideClick: false,
          input: '#city',
          cols: [
            {
              textAlign: 'center',
              values: ids,
              displayValues: values
            }
          ],
          onClose: ({cols}) => {
            this.city.cityName = cols[0].displayValue
            this.city.cityId = cols[0].value
            commit(native.doSelectCity, {
              cityId: cols[0].value,
              cityName: cols[0].displayValue
            })
          }
        })
        // 手动初始化picker cols
        this.pickerCity.open()
        this.pickerCity.close()
      })

    },
    mounted () {

    },
    methods: {
      openProvince () {
        this.pickerProvince.open()
      },
      openCity () {
        this.pickerCity.open()
      },
      handleForm () {
        if (!this.city.provinceId || this.city.provinceId === -1) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '请选择省份'
          })
        } else if (!this.city.cityId || this.city.cityId === -1) {
          this.$f7.addNotification({
            media: '<span class=\'iconfont icon-warning\'></span>',
            title: '错误',
            message: '请选择城市'
          })
        } else {
          this.$store.dispatch({
            type: native.doSetCity,
            cityId: this.city.cityId
          }).then(() => {
            this.$store.commit(native.setCity, this.city)
            this.$f7.alert('修改城市成功', '友情提示', () => {
              this.$router.back()
            })
          })

        }
      }
    },
    computed: {
      ...mapState({
        provinces ({address}) {
          return address.provinces
        },
        cityList ({address}) {
          if (!this.city.provinceId || this.city.provinceId === -1) {
            return
          }
          return address.cities[`cities_${this.city.provinceId}`]
        },
        profile ({profile}) {
          return profile.profile
        },
        wechat (state) {
          return state.wechat
        }
      })
    },
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
