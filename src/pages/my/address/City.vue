<template>
    <keep-alive>
        <f7-page no-toolbar>
            <f7-navbar>
                <f7-nav-left back-link="返回"></f7-nav-left>
                <f7-nav-center>选择城市</f7-nav-center>
            </f7-navbar>
            <div>{{city}}</div>
            <br>
            <div>{{cities}}</div>
            <br>
            <div>{{currentCity}}</div>
            <f7-list>
                <f7-list-item v-if="currentCity"
                              v-for="(row,index) in currentCity" :key="index"
                              radio
                              :title="row.city"
                              :value="row.id"
                              :checked="city.cityId===row.id"
                              @click="selectCity(row)"
                              name='city'>

                </f7-list-item>
            </f7-list>
        </f7-page>
    </keep-alive>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import globalMixin from 'mixins/globalMixin'

  export default {
    data () {
      return {}
    },
    mixins: [globalMixin],
    created () {
      let {dispatch} = this.$store
      dispatch({
        type: native.doListCity
      })
    },
    methods: {
      selectCity ({id, city}) {
        let {commit} = this.$store
        commit(native.doSelectCity, {
          cityId: id, cityName: city
        })
      }
    },
    computed: {
      ...mapState({
        city ({address}) {
          return address.city
        },
        cities ({address}) {
          return address.cities
        }
      }),
      currentCity () {
        return this.cities[`cities_${this.city.provinceId}`]
      }
    },
    /* watch:{

    }*/
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
