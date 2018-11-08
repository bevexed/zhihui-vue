<template>
  <div style="background: #f0f0f0">
    <header class="pay_top room">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>包房预订</p>
    </header>
    <section class="room_style">
      <header>
        <p>{{store.shop_name}}</p>
        <span>
               {{store.address}}
            </span>
      </header>
      <footer>
        购买数量
        <span>1</span>
      </footer>
    </section>

    <section class="real_pay room_style">
      <footer>
        <div>
          现有至惠购物卷
          <span>￥{{orderData.rebatemoney}}</span>
        </div>
        <div>
          使用至惠购物卷
          <span>
            <el-switch
              v-model="value2"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </span>
        </div>
        <div style="margin-top: 10px">
          实际支付
          <span class="colorRed">￥{{value2 === true ? (orderData.discountmoney - orderData.rebatemoney) : (orderData.discountmoney)}}</span>
        </div>
      </footer>
    </section>

    <section class="real_pay phone room_style">
      <footer>
        手机号码
        <span>{{orderData.phone}}</span>
      </footer>
    </section>

    <section class="real_pay ruler room_style">
      <footer>
        退订规则
        <p>1.开唱时间提前一小时（14:00）前可退</p>
        <p>2.开唱时间提前一小时至开唱时间（14:00-15:00）退款，则平台提取30%原实付金额的违约金</p>
        <p>3.开唱时间（15:00）后不可退</p>
      </footer>
    </section>

    <section class="real_pay pay room_style">
      <footer class="colorRed">
        ￥{{value2 === true ? (orderData.discountmoney - orderData.rebatemoney) : (orderData.discountmoney)}}
        <a>已减{{value2 === true ? (orderData.rebatemoney-0 + orderData.full_reducemoney) : orderData.full_reducemoney}}元</a>
        <span @click="pay">立即支付</span>
      </footer>
    </section>
  </div>
</template>

<script>
  import {orderList, allShopGoodList,orderActualList,shopOrderActualList} from "../../api";

  export default {
    name: "booking",
    data() {
      return {
        value1: true,
        value2: true,
        store: {},
        orderData: {},
      }
    },
    watch:{
      value2(curVal,oldVal){
        console.log(curVal, oldVal);
      }
    },
    methods: {
      async getOderList() {
        let result = await orderList(localStorage.uid, localStorage.preset_time, ...JSON.parse(localStorage.arr))
        if (result.code === 1) {
          this.orderData = result.data
        }
      },
      async getStoreList() {
        let result = await allShopGoodList(this.$route.params.store_id, localStorage.longitude_latitude, this.$route.params.status)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.store = result.data
        }
      },
      async pay(){
        let rebat = this.orderData.discountmoney
        if(this.value2 === true){
          let  result = await shopOrderActualList(this.orderData.order_id,this.orderData.discountmoney,this.orderData.rebatemoney)
          if (result.code === 1){
            rebat = result.data
          }
        }
        let result = await orderActualList(this.$route.params.store_id,rebat)
        console.log(result);
        if (result.code === 1){
          wx.chooseWXPay({
            timestamp: 1414723227,
            nonceStr: 'noncestr',
            package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',
            signType: 'SHA1', // 注意：新版支付接口使用 MD5 加密
            paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69'
          });
        }

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
    mounted() {
      this.getOderList()
      this.getStoreList()

    }
  }
</script>

<style scoped>
  .room {
    background: #F0F0F0;
  }

  .room_style {
    width: 100%;
    padding: .11rem;
    font-size: .14rem;
    box-sizing: border-box;
    background: #ffffff;
  }

  .room_style header {
    padding-bottom: .13rem;
    border-bottom: .01rem solid #ECEBEB;
  }

  .room_style header span {
    font-size: .1rem;
  }

  .room_style footer {
    font-size: .14rem;
    padding: .22rem .04rem .2rem;
  }

  .room_style footer span {
    float: right;
    margin-right: .1rem;
  }

  .real_pay {
    margin-top: .08rem;
  }

  .real_pay footer {
    padding: .08rem .04rem;
  }

  .pay {
    position: absolute;
    bottom: 0;
  }

  .pay footer {
    font-size: .2rem;
  }

  .pay footer a {
    font-size: .07rem;
    color: #4F4F4F;
  }

  .pay footer span {
    border-radius: .04rem;
    text-align: center;
    width: .8rem;
    height: .3rem;
    line-height: .3rem;
    font-size: .14rem;
    color: #101010;
    display: inline-block;
    background: #DfDFDF;
  }

</style>
