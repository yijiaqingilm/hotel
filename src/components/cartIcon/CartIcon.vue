<template>
    <f7-link icon-only href="/cart">
        <f7-icon class="iconfont icon-cart f7-icons icon-full">
            <f7-badge v-if="cart.skus && cart.skus.length >0" color="green">{{cart.skus.length}}</f7-badge>
        </f7-icon>
    </f7-link>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    created () {
    },
    computed: {
      ...mapState({
        cart: (state) => state.cart.cart
      })
    }
  }
</script>
<style lang="scss" scoped type="text/css">
</style>
