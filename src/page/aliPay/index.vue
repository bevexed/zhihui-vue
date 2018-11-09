<template>
  <div>请在浏览器中打开</div>
</template>

<script>
  import {wxConfig} from "../../api";

  export default {
    name: "aliPay",
    methods: {
      async getWxConfig() {
        let url = window.location.href
        console.log(url)
        let result = await wxConfig(url)
        let jssdkconfig = JSON.parse(result.data)
        console.log(jssdkconfig)

        wx.config({
          debug: false,
          appId: jssdkconfig.appId,
          timestamp: jssdkconfig.timestamp,
          nonceStr: jssdkconfig.nonceStr,
          signature: jssdkconfig.signature,
          jsApiList: [
            'openLocation',
            'getLocation',
            'onMenuShareTimeline'
          ]
        });
        wx.ready(function () {
          wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage',
              'getLocation'
            ],
            success: function (res) {
              console.log(JSON.stringify(res));
            }
          });
        })

        wx.error(function (res) {
          console.log(`err:${res}`)
        });
      },
    },
    mounted() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        alert(1)
      } else {
        window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/public/index.php/api/alipay/pay?price=${this.$route.params.realprice}&ordernumber=${this.$route.params.ordernumber}`)
      }

    }
  }
</script>

<style scoped>

</style>
