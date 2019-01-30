<template>
  <div>
    <div class="pay_top" style="background: #ffffff">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
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
      <div @click="choosePay(2)" v-show="orderData.realprice - 0 != 0">
        <p>
          <i class="iconfont icon-weixin"></i>
          <span>微信</span>
        </p>
        <div class="circle" :class="checked==2 ? 'checked_icon' : ''"></div>
      </div>
      <div class="noneBorderBottom" @click="choosePay(1)" v-show="!isSmall && orderData.realprice - 0 != 0">
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
  import {balancepay, shopOrderPayList} from "../../api";
  import wx from 'weixin-js-sdk';

  export default {
    name: "pay",
    data() {
      return {
        orderData: {},
        checked: -1,
        isSmall: JSON.parse(localStorage.isSmall)
      }
    },
    methods: {
      choosePay(i) {
        this.checked = i
      },
      async pay() {
        let that = this;
        if (this.checked === -1) {
          this.$message({
            message: '请选择支付方式',
            type: 'error'
          })
        }
        // 支付宝支付
        if (this.checked === 1) {
          window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/alipay/aliPay.html?uid=${localStorage.uid}&realprice=${this.orderData.realprice}&ordernumber=${this.orderData.ordernumber}`)
          // window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/dist/aliPay.html?uid=${localStorage.uid}&realprice=${0.01}&ordernumber=${this.orderData.ordernumber}`)
        }
        // weixin
        if (this.checked === 2) {
          if (JSON.parse(localStorage.isSmall)) { //如果在小程序里
            $.ajax({
              type: 'POST',
              url: 'https://shop.zhihuimall.com.cn/zhihuishop/public/index.php/api/wxpay/pay',
              data: {
                uid: localStorage.uid,
                ordernumber: that.orderData.ordernumber,
                realprice: that.orderData.realprice,
                type: 2
                // realprice: 0.01
              },
              success: function (res) {
                if (res) {
                  let result;
                  console.log(JSON.parse(res));
                  result = JSON.parse(res);
                  console.log(result.timeStamp);
                  let test = window.location.href.split('#')[0];
                  let parameter = 'appId=' + result.appId
                    + '&timeStamp=' + result.timeStamp
                    + '&nonceStr=' + result.nonceStr
                    + '&package=' + result.package.split("=")[1]
                    + '&signType=' + result.signType
                    + '&paySign=' + result.paySign
                    + '&url=' + encodeURIComponent(test);
                  let url = '/pages/pay2/index?' + parameter;
                  wx.miniProgram.navigateTo({url});
                }
              }
            })
          } else {
            $.ajax({
              type: 'POST',
              url: 'https://shop.zhihuimall.com.cn/zhihuishop/public/index.php/api/wxpay/pay',
              data: {
                uid: localStorage.uid,
                ordernumber: that.orderData.ordernumber,
                realprice: that.orderData.realprice,
                type: 1
                // realprice: 0.01
              },
              success: function (res) {

                if (res) {
                  let result;
                  console.log(JSON.parse(res));
                  result = JSON.parse(res);
                  console.log(result);
                  // alert(result.appId)
                  wx.chooseWXPay({
                    appId: result.appId,
                    // appId: 'wx6ae88e9a0dcb59b1',
                    timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                    package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: result.paySign, // 支付签名
                    success: function (res) {
                      // 支付成功后的回调函数
                      if (res.errMsg === "chooseWXPay:ok") {
                        //支付成功
                        that.$message({
                          message: '支付成功',
                          type: 'success'
                        });
                        console.log(res);
                        that.$router.replace({name: 'paySuccess', params:{order: that.orderData.ordernumber}})
                      } else {
                        that.$message({
                          message: "支付失败",
                          type: 'error'
                        })
                      }
                    },
                    cancel: function (res) {
                      //支付取消
                      that.$message({
                        message: "您已取消支付"
                      })
                    }
                  });
                }

              }
            })
          }


        }
        // 平台
        if (this.checked === 3) {
          let result = await balancepay(localStorage.uid, that.orderData.ordernumber);
          console.log(result);
          if (result.code === 1) {
            this.$message({
              message: result.message,
              type: 'success'
            });
            that.$router.push({name: 'paySuccess', params:{order: that.orderData.ordernumber}})
          } else {
            this.$message({
              message: result.message,
              type: 'error'
            })
          }
        }

      },
      async getShopOrderPayList() {
        let result = await shopOrderPayList(this.$route.params.order_id);
        if (result.code === 1) {
          this.orderData = result.data
        }
      },
    },
    created() {
      this.getShopOrderPayList();
      this.$getWxConfig()
    },
    beforeRouteEnter(to, from, next) {
      if (from.name === null) { // 从外部直接进来
        next(vm => {
          localStorage.uid = vm.$getRequest().uid;
          vm.$getWxConfig()
        })
      } else {
        if (from.name === 'booking' || from.name === 'scan') {
          next();
          this.$getWxConfig()
        } else {
          window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
        }
      }
    }
  }
</script>

<style scoped>
  .checked_icon {
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
