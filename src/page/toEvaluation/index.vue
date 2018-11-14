<template>
  <div>
    <div class="pay_top" style="flex-direction: row;align-items: normal">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>评价</p>
      <span class="button" style="align-self: center;background: #F45252;font-size: .12rem">去发布</span>
    </div>

<div class="pf">
  <div class="block">
    <span class="demonstration"> 性价比评分：</span>
    <el-rate
      style="float: right"
      v-model="xjb"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
  <div class="block">
    <span class="demonstration"> 环境评分：</span>
    <el-rate
      style="float: right"
      v-model="hjpf"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
  <div class="block">
    <span class="demonstration"> 服务评分：</span>
    <el-rate
      style="float: right"
      v-model="pffw"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
</div>

    <div style="background: #BBBBBB ;height: 2px;margin: .4rem 0"></div>
    <div class="add_pic">
       <span class="pfs">
      亲，对菜品味道如何，服务还满意吗？
    </span>
      <div class="add">
        <i style="font-size: .4rem;color: #4f4f4f" class="el-icon-picture-outline"></i>
        <p>上传照片</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "toevaluation",
    data() {
      return {
        xjb: null, // 性价比评分
        hjpf: null, // 环境评分
        pffw: null, // 评分服务
      }
    }
  }
</script>

<style scoped>
  .block {
    padding: .1rem .2rem;
    width: 60%;
  }
  .demonstration{
    font-size: .16rem;
    font-weight: bolder;
  }
  .pf{
    margin-top: .2rem;
  }
  .add_pic{
    margin-left: .2rem;
  }
  .pfs{
    left: 20px;
    top: 261px;
    width: 238px;
    height: 18px;
    color: rgba(200, 200, 200, 1);
    font-size: 14px;
    text-align: left;
  }
  .add{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: .32rem;
    left: 18px;
    top: 336px;
    width: 105px;
    height: 90px;
    line-height: 20px;
    border-radius: 10px 10px 10px 10px;
    background-color: rgba(240, 239, 239, 1);
    text-align: center;
    border: 2px solid rgba(187, 187, 187, 1);
  }
</style>
