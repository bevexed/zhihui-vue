<template>
  <div class="pay">
    <div>
      <h1>{{store_name}}</h1>
    </div>
    <div>
      <span>消费金额：</span>
      <el-input v-model="money" type='number' value="number" pattern="[0-9]*" placeholder="请输入金额"></el-input>
    </div>

    <!--<div>-->
    <!--<span>优惠金额：</span>-->
    <!--<el-input v-model="cost" placeholder="请输入金额"></el-input>-->
    <!--</div>-->
    <div class="card">
      <span>
          购物卷：{{this.real.left}}元
      </span>
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="rgb(80,80,80)">
      </el-switch>
    </div>
    <footer>
      <div>
        实际支付金额{{this.real.realMoney}}元
      </div>

      <el-button type="primary" @click="getOrderId">立即支付</el-button>
    </footer>
  </div>
</template>

<script>
  import {addOrder, orderInfo} from '../../api'

  export default {
    name: "scan",
    data() {
      return {
        money: '', // 用户输入金额
        value1: true,
        value2: false,
        "store_id": '',
        "store_name": "",
        "rebatemoney": ""
      }
    },
    computed: {
      real() {
        let realMoneny; // 用户实际支付的钱
        let left; // 用户剩余优惠卷
        let all = this.money * 1000; // 用户输入金额
        let coupon = this.rebatemoney * 1000;

        if (this.value2) {
          if (all >= coupon) {
            left = 0;
            realMoneny = all - coupon
          } else {
            left = coupon - all;
            realMoneny = 0
          }
        } else {
          realMoneny = all;
          left = coupon
        }
        return {realMoney: realMoneny / 1000, left: left / 1000}
      }
    },
    methods: {
      async getOrderInfo() {
        let result = await orderInfo(this.$route.params.sjid, localStorage.uid);
        if (result.code === 1) {
          this.store_id = result.data.store_id;
          this.store_name = result.data.store_name;
          this.rebatemoney = result.data.rebatemoney;
          console.log(this.$data);
        } else {
          this.$message({
            message: result.message,
            type: 'error'
          })
        }
      },
      async getOrderId() {
        if (!this.money) {
          this.$message({
            message: "请输入金额",
            type: 'error'
          });
          return
        }
        let p = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!p.test(this.money)) {
          this.$message({
            message: "请检查输入的金额是否正确",
            type: 'error'
          });
          return
        }
        console.log(localStorage.uid, this.store_id, this.real.realMoney, this.rebatemoney - this.real.left);
        let result = await addOrder(localStorage.uid, this.store_id, this.real.realMoney, this.rebatemoney - this.real.left);
        if (result.code === 1) {
          this.$router.push({name: 'pay', params: {order_id: result.data.order_id}})
        }
      }
    },
    created() {
      this.getOrderInfo();
      this.$getWxConfig()
    },
    mounted() {

    }

  }
</script>

<style scoped>
  .pay {
    padding: .4rem;
    height: 100%;
  }

  .pay > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .2rem;
  }

  .pay > div > span {
    width: 1rem;
  }

  .pay > div.card {
    display: flex;
    justify-content: space-between;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 90%;
    position: absolute;
    left: .2rem;
    bottom: .2rem;
    right: .2rem;
  }
</style>
