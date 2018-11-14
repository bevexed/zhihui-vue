<template>
  <div>
    <div class="pay_top" style="flex-direction: row;align-items: normal">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>评价</p>
      <span class="button" style="align-self: center;background: #F45252;font-size: .12rem" @click="custAddComment(shop_id, content, file, cost_effective, environment, service, order_id)">去发布</span>
    </div>

<div class="pf">
  <div class="block">
    <span class="demonstration"> 性价比评分：</span>
    <el-rate
      style="float: right"
      v-model="cost_effective"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
  <div class="block">
    <span class="demonstration"> 环境评分：</span>
    <el-rate
      style="float: right"
      v-model="environment"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
  <div class="block">
    <span class="demonstration"> 服务评分：</span>
    <el-rate
      style="float: right"
      v-model="service"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
</div>

    <div style="background: #BBBBBB ;height: 2px;margin: .4rem 0"></div>
    <div class="add_pic">
      <el-input
        style="width: 95%;"
        type="textarea"
        :rows="3"
        placeholder="  亲，对菜品味道如何，服务还满意吗？"
        v-model="content">
      </el-input>
      <div class="add">
        <input class="weui-uploader__input" type="file" name="file" accept="image/*">
        <i style="font-size: .4rem;color: #4f4f4f" class="el-icon-picture-outline"></i>

        <p>上传照片</p>
      </div>
    </div>

  </div>
</template>

<script>
  import {addComment} from  '../../api'
  export default {
    name: "toevaluation",
    data() {
      return {
        shop_id:'',
        content:'',
        file:'',
        uid:'',
        cost_effective:null, // 性价比评分
        environment:null, // 环境评分
        service:null, // 评分服务,
        order_id:'',
      }
    },
    methods:{
      async custAddComment(shop_id, content, file, cost_effective, environment, service, order_id){
        let result = await addComment(shop_id, content, file, localStorage.uid, cost_effective, environment, service, order_id)
        if (result.code ===1){
          this.$message({
            message:result.message,
            type:'success'
          })
        }else{
          this.$message({
            message:result.message,
            type:'error'
          })
        }
      }
    },
  }
</script>

<style scoped>
  .weui-uploader__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    -moz-opacity: 0.8;
    filter: alpha(opacity=50);
  }
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
    position: relative;
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
