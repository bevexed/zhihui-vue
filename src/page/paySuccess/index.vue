<template>
  <div style="text-align: center;margin: 1rem">

    <i class="el-icon-success" style="color:green;font-size: .2rem;"> 支付成功</i> <br>
    <p style="padding-top: .2rem" @click="to">{{time}}s或点击后跳转到订单详情页</p>
  </div>

</template>

<script>
  export default {
    name: "paySuccess",
    data() {
      return {
        time: 5
      }
    },
    methods: {
      goTo() {
        setInterval(() => {
          this.time--
          if (this.time === 0) {
            this.time = 5
            window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&p=list_shop&status=1&mid=${localStorage.uid}&do=order&m=vslai_shop`)
          }
        }, 1000)
      },
        to(){
          window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&p=list_shop&status=1&mid=${localStorage.uid}&do=order&m=vslai_shop`)
        }
    },
    mounted() {
      this.goTo()
    }

  }
</script>

<style scoped>

</style>
