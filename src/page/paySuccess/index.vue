<template>
  <div style="text-align: center;margin-top: 1rem">



    <i class="el-icon-success" style="color:green;font-size: .2rem;"> 支付成功</i> <br>
    <h1 style="margin-top: .5rem;font-size: .16rem">
      {{orderData.shop_name}}
    </h1>
    <h4 style="font-size: .3rem">
      {{orderData.total}}  元
    </h4>

    <el-button type="success" size="medium" style="margin-top: 1rem" @click="to">完成</el-button>
    <!--<p style="padding-top: .2rem" @click="to">{{time}}s或点击后跳转到订单详情页</p>-->
  </div>

</template>

<script>
  import {getSuccess} from "../../api";

  export default {
    name: "paySuccess",
    data() {
      return {
        time: 5,
        orderData: ''
      }
    },
    methods: {
      goTo() {
        setInterval(() => {
          this.time--;
          if (this.time === 0) {
            this.time = 5;
            window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&p=list_shop&status=1&mid=${localStorage.uid}&do=order&m=vslai_shop`)
          }
        }, 1000)
      },
      to() {
        window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&p=list_shop&status=1&do=order&m=vslai_shop`)
      }
    },
    mounted() {
      getSuccess().then(
        res => {
          if (res.code === 1) {
            this.orderData = res.data
          }
          console.log(res);
        }
      ).then(
        // this.goTo()
      )
    },
    beforeRouteEnter(to, from, next) {
      if (from.name === 'pay') {
        next()
      } else {
         window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
      }
    }

  }
</script>

<style scoped>

</style>
