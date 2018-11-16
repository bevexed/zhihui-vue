<template>
  <div class="pay">
    <div>
      <span>消费金额：</span>
      <el-input v-model="money" placeholder="请输入金额"></el-input>
    </div>

    <div>
      <span>优惠金额：</span>
      <el-input v-model="cost" placeholder="请输入金额"></el-input>
    </div>
    <div class="card">
      <span>
          购物卷：100元
      </span>
      <el-switch
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <footer>
      <el-button type="primary">立即支付</el-button>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "scan",
    data() {
      return {
        money: '',
        cost: '',
        value1: true,
        value2: true
      }
    },
    methods: {},
    created() {

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
  .pay > div > span{
    width: 1rem;
  }
  .pay >div.card{
    display: flex;
    justify-content: space-between;
  }
  footer{
    position: absolute;
    bottom: .2rem;
    right: .2rem;
  }
</style>
