<template>
  <div class="pay_top">
    <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
    <p>{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "back",
    props: ['title']
  }
</script>

<style scoped>

</style>
