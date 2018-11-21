<template>
  <qriously :value="initQCode" :size="260"></qriously>
</template>

<script>
  export default {
    name: "Qriosly",
    props: {},
    data() {
      return {
        initQCode: '你自己定义的值'
      }
    }
  }
</script>

<style>
canvas{
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
