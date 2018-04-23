<template>
    <li>
        <label class="label-checkbox item-content">
            <input type="checkbox" name="my-checkbox" v-model="checkedItems" :value="val">
            <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
            </div>
            <div class="item-inner">
                <div class="item-title">{{title}}</div>
                <div class="item-subtitle">{{subtitle}}</div>
            </div>
        </label>
    </li>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      val: {
        type: String,
        title: String,
        subtitle: String
      }
    },
    data () {
      return {
        checkedItems: []
      }
    },
    methods: {
      inputChange: function (checked) {
        this.$emit('input', checked)
      }
    },
    computed: {}

  }
</script>
<style lang="scss" scoped type="text/css">
    @import "myCheckbox.scss";
</style>
