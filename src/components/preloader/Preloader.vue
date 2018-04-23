<template>
    <f7-block class="text-center">
        <div>
            <f7-preloader></f7-preloader>
        </div>
        <div>{{title}}</div>
    </f7-block>
</template>

<script>
  export default {
    props: {
      title: ''
    },
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>