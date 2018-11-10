<template>
  <div style="background: #f0f0f0">
    <header class="pay_top room">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>包房预订</p>
    </header>
    <section class="room_style">
      <header>
        <p>{{orderData.shop_name}}</p>
        <span>
               {{store.address}}
            </span>
      </header>
      <div style="margin-top: .2rem;">
        <img :src="ImgBaseUrl+orderData.meal_images" style="max-height: 1.4rem;max-width:.9rem;margin-top: .2rem"
             alt="">
        <footer style="width: 70%;float: right;">
          <p><b style="font-size: .2rem">{{orderData.meal_name}}</b></p>
          购买数量
          <span>1</span>
          <hr>
          商品原价
          <span>￥{{orderData.pretium}}</span>
          <hr>
        </footer>
        <div style="clear: both"></div>
      </div>
    </section>

    <section class="room_style" style="margin-top: .2rem;">
      <footer>
        商品折扣
        <span>{{orderData.discount - 0}}折</span>
        <hr>
        折后价
        <span>￥{{orderData.discountmoney}}</span>
        <hr>
        满减规则
        <span>{{orderData.full_reduce}}</span>
        <hr>
        满减后金额
        <span>￥{{orderData.full_reducemoney}}</span>
        <hr>
      </footer>
    </section>

    <section class="real_pay room_style">
      <footer>
        <div>
          现有至惠购物卷
          <span>￥{{payResult.leave}}</span>
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
          <span class="colorRed">￥{{payResult.real}}</span>
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

    <!--占位-->
    <section style="height:1rem;visibility: hidden">

    </section>
    <!--占位-->
    <section class="real_pay pay room_style" style="position: fixed;bottom: 0;">
      <footer class="colorRed">
        ￥{{payResult.real}}
        <span @click="pay">立即支付</span>
      </footer>
    </section>
  </div>
</template>

<script>
  import {ImgBaseUrl, orderList, allShopGoodList, orderActualList, shopOrderActualList} from "../../api";

  export default {
    name: "booking",
    data() {
      return {
        ImgBaseUrl,
        value1: true, //控制按钮
        value2: false,
        store: {},
        orderData: {},
      }
    },
    computed: {
      payResult() {
        let real // 实际支付金额(即折后价)
        let all = this.orderData.discountmoney // 总金额
        let reduce = this.orderData.rebatemoney // 总折扣卷
        let leave // 剩余的抵扣卷数量
        let used // 用掉的抵扣卷数量
        if (this.value2 === true) { // 用卷
          if (all >= reduce) {
            real = all - reduce
            leave = 0
          } else {
            real = 0
            leave = reduce - all
          }
        } else {  // 不用卷
          real = all
          leave = reduce
        }
        used = reduce - leave
        return {real, leave, used}
      },
      realReduce() {

      }
    },
    watch: {
      value2(curVal, oldVal) {
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
      async pay() {
        let rebat = this.payResult.real // 实付金额
        let order_id = this.orderData.order_id //订单ID
        if (this.value2 === true) {
          let result = await shopOrderActualList(order_id, rebat, this.payResult.used)
          if (result.code === 1) {
            rebat = result.data
          }else{
            this.$message({
              message:result.message,
              type:'error'
            })
            return
          }
        }
        let result = await orderActualList(order_id, rebat)
        console.log(result);
        if (result.code === 1) {
          this.$router.push({name: 'pay', params: {rebat, order_id}})
        }

      },
    },

    mounted() {
      this.getOderList()
      this.getStoreList()

    }
  }
</script>

<style scoped>
  hr {
    border: 0;
  }

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
