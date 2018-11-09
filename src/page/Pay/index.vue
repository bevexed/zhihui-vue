<template>
  <div>
    <div class="pay_top" style="background: #ffffff">
      <p class="iconfont icon-fanhui comeback"></p>
      <p>支付订单</p>
    </div>

    <div class="order_main">
      <div class="line">
        <div class="label">订单编号</div>
        <div class="info">
          <div class="inner">{{orderData.ordernumber}}</div>
        </div>
      </div>
      <div class="line">
        <div class="label">支付金额</div>
        <div class="info">
          <div class="inner">
            <div style='color:#ff6600'>{{orderData.realprice}}<span id="orderprice">

            </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pay_mid" style="margin-top: .2rem">
      <div @click="choosePay(3)">
        <p>
          <i class="iconfont icon-money"></i>
          <span>余额</span>
        </p>
        <div class="circle" :class="checked==3 ? 'checked_icon' : ''"></div>
      </div>
      <div @click="choosePay(2)">
        <p>
          <i class="iconfont icon-weixin"></i>
          <span>微信</span>
        </p>
        <div class="circle" :class="checked==2 ? 'checked_icon' : ''"></div>
      </div>
      <div class="noneBorderBottom" @click="choosePay(1)">
        <p>
          <i class="iconfont icon-zhifubao"></i>
          <span>支付宝</span>
        </p>
        <div class="circle" :class="checked==1 ? 'checked_icon' : ''"></div>
      </div>
    </div>

    <div class="payButton" @click="pay">立即支付</div>
  </div>
</template>

<script>
  import {shopOrderPayList,pay} from "../../api";
  export default {
    name: "pay",
    data() {
      return {
        orderData:{},
        checked: -1,
      }
    },
    methods: {
      choosePay(i) {
        this.checked = i
      },
      async pay() {
        if (this.checked === -1){
          this.$message({
            message:'请选择支付方式',
            type:'error'
          })
        }
        // 支付宝支付
        if (this.checked === 1){
          let result = await pay(this.checked,this.orderData.realprice,this.orderData.ordernumber)
          console.log(result);

          const div = document.createElement('div');
          div.innerHTML = result;
          document.body.appendChild(div);
          document.forms.alipaysubmit.submit();
        }

      },
      async getShopOrderPayList(){
        let result = await shopOrderPayList(this.$route.params.order_id)
        if  (result.code === 1){
          this.orderData = result.data
        }
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
    },
    created(){
      this.getShopOrderPayList()
    }
  }
</script>

<style scoped>
  .checked_icon{
    background: green;
  }
  body {
    margin: 0px;
    background: #efefef;
    font-family: '微软雅黑';
    -moz-appearance: none;
  }

  .order_main {
    height: auto;
    border-bottom: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    background: #fff;
    margin-top: 10px;
  }

  .order_main .line {
    height: .44rem;
    margin: 0 .16rem;
    border-bottom: 1px solid #f0f0f0;
    line-height: .44rem;
  }

  .order_main .line .label {
    float: left;
    width: 80px;
  }

  .order_main .line .info {
    float: right;
    width: 100%;
    margin-left: -85px;
    text-align: right;
    overflow: hidden;
    height: 44px;
  }

  .order_main .line .info .inner {
    color: #666;
    margin-left: 85px;
  }

  .order_main .line .nav {
    height: 22px;
    width: 40px;
    background: #ccc;
    margin: 10px 0px;
    float: right;
    border-radius: 40px;
  }

  .order_main .line .on {
    background: #4ad966;
  }

  .order_main .line .nav nav {
    height: 20px;
    width: 20px;
    background: #fff;
    margin: 1px;
    border-radius: 20px;
  }

  .order_main .line .nav .on {
    margin-left: 19px;
  }

  .order_main .line_pay {
    margin: 0 5px;
    border-bottom: 1px solid #f0f0f0;
  }

  .order_main .line_pay .button {
    height: 46px;
    padding: 10px 0;
  }

  .order_main .line_pay .btn_icon {
    float: left;
    width: 46px;
    height: 46px;
    text-align: center;
    border-radius: 5px;
  }

  .order_main .line_pay .btn_icon i {
    font-size: 34px;
    color: #fff;
  }

  .order_main .line_pay .btn_info {
    float: left;
    padding-left: 10px;
    line-height: 22px;
  }

  .order_main .line_pay .btn_info span {
    font-size: 12px;
    color: #666;
  }

  .order_main .line_pay .btn_right {
    float: right;
    height: 46px;
    line-height: 46px;
    display: list-item;
    list-style: none;
  }

  .order_main .line_pay .btn_right i {
    font-size: 22px;
    color: #999;
  }

  .order_sub1 .btn_icon {
    background: #31cd00;
  }

  .order_sub1 .btn_icon i {
    font-size: 32px !important;
  }

  .order_sub21 .btn_icon {
    background: #31cd00;
  }

  .order_sub21 .btn_icon i {
    font-size: 32px !important;
  }

  .order_sub2 .btn_icon {
    background: #00A0E9;
  }

  .order_sub3 .btn_icon {
    background: #e2cb04;
  }

  .order_sub10 .btn_icon {
    background: #31cd00;
  }

  .order_sub12 .btn_icon {
    background: #008800
  }
</style>
