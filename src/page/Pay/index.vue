<template>
  <div>
    <div class="pay_top">
      <p class="iconfont icon-fanhui comeback"></p>
      <p>支付订单</p>
    </div>

    <div class="pay_top">
      <p class="comeback jine">金额</p>
      <p class="pay_price">￥128.00</p>
    </div>

    <div class="pay_mid">
      <div @click="choosePay(0)">
        <p>
          <i class="iconfont icon-money"></i>
          <span>余额</span>
        </p>
        <div class="circle" :class="checked==0 ? 'checked_icon' : ''"></div>
      </div>
      <div @click="choosePay(1)">
        <p>
          <i class="iconfont icon-weixin"></i>
          <span>微信</span>
        </p>
        <div class="circle" :class="checked==1 ? 'checked_icon' : ''"></div>
      </div>
      <div class="noneBorderBottom" @click="choosePay(2)">
        <p>
          <i class="iconfont icon-zhifubao"></i>
          <span>支付宝</span>
        </p>
        <div class="circle" :class="checked==2 ? 'checked_icon' : ''"></div>
      </div>
    </div>

    <div class="payButton" @click="pay">立即支付</div>
  </div>
</template>

<script>
  export default {
    name: "pay",
    data() {
      return {
        checked: -1,
      }
    },
    methods: {
      choosePay(i) {
        this.checked = i
      },
      pay(){
        // this
      },
      async wxPay() {
        if (result.code === 1) {
          wx.chooseWXPay({
            timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: '', // 支付签名随机串，不长于 32 位
            package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: '', // 支付签名
            success: function (res) {
              // 支付成功后的回调函数
            }
          });
        }

      },
      async getWxConfig() {
        let url = window.location.href
        let result = await wxConfig(url)
        result = JSON.parse(result.data)
        let jssdkconfig = result

        wx.config({
          debug: false,
          appId: jssdkconfig.appId,
          timestamp: jssdkconfig.timestamp,
          nonceStr: jssdkconfig.nonceStr,
          signature: jssdkconfig.signature,
          jsApiList: [
            'chooseWXPay',
          ]
        });

      },
    }
  }
</script>

<style scoped>

</style>
