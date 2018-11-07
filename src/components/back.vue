<template>
  <section class="detail_head">
    <p class="iconfont icon-fanhui back cursor_pointer" @click=""></p>
    <img v-if="detail.store_images" :src="`${baseImgUrl}${detail.store_images}`" alt="">
  </section>
</template>

<script>
    export default {
        name: "back"
    }
</script>

<style scoped>

</style>
