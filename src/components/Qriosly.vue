<template>
  <qriously :value="initQCode" :size="260"></qriously>
</template>

<script>
  export default {
    name: "Qriosly",
    props: {},
    data() {
      return {
        initQCode: `https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/dist/index.html?mid=${localStorage.uid}#/scan/sjid/${localStorage.uid}`
      }
    }
  }
</script>

<style>
  canvas {
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
