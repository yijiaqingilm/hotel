<template>
    <img :src="icons[type]" alt="" class="icon" :class="iconClass">
</template>

<script>
  import xin from 'assets/xin.png'

  const iconSizeType = {
    default: 'default',
    small: 'small',
    big: 'big'
  }
  // 先简单处理
  export default {
    // size :default ,small ,big
    props: {
      type: {type: String, default: 'xin'},
      big: {type: Boolean, default: false},
      small: {type: Boolean, default: false}
    },
    name: '',
    data () {
      return {
        icons: {
          'xin': xin
        }
      }
    },
    computed: {
      iconClass () {
        return {
          big: this.big,
          small: this.small
        }
      }
    }
  }
</script>

<style scoped>
    .icon {
        display: inline-block;
        width: 24px; /*no*/
        height: 24px; /*no*/
    }
</style>