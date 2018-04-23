import { mapState } from 'vuex'
import { globalConst as native } from 'lib/const'
import { isEmptyObject } from 'lib/utils'

const globalMixin = {
  async created () {
    if (isEmptyObject(this.shop) || isEmptyObject(this.catalogs)) {
      let {dispatch} = this.$store
      dispatch({
        type: native.doLoadJsConfig
      })
      await dispatch({
        type: native.doListCatalogs
      })
    }

  },
  computed: mapState({
    shop: ({catalogs}) => catalogs.shop,
    catalogs: ({catalogs}) => catalogs.catalogs,
  }),
}
export default globalMixin
