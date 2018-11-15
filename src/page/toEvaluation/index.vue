<template>
  <div>
    <div class="pay_top" style="flex-direction: row;align-items: normal">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>评价</p>
      <span class="button" style="align-self: center;background: #F45252;font-size: .12rem"
            @click="custAddComment(content, file, cost_effective, environment, service)">去发布</span>
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
        <input class="weui-uploader__input" id="f" type="file" name="file" accept="image/*" @change="getImg">
        <i style="font-size: .4rem;color: #4f4f4f" class="el-icon-picture-outline"></i>
        <p>上传照片</p>
      </div>
      <div style="margin-top: .2rem;position: relative;width: 3rem" v-if="img">
        <i class="el-icon-close" style="float: right" @click="img = null"></i>
        <img style="width: 2.8rem;position: absolute" id="imgs" :src="img" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import {addComment} from '../../api'

  export default {
    name: "toevaluation",
    data() {
      return {
        shop_id: '',
        content: '',
        file: '',
        uid: '',
        cost_effective: null, // 性价比评分
        environment: null, // 环境评分
        service: null, // 评分服务,
        order_id: '',
        img: null //上传图片预览
      }
    },
    methods: {
      getImg() {
        if (this.img != null){
          this.$message({
            message:'仅支持上传一张图片',
            type:'error'
          })
          return
        }
        let url;
        url = window.URL.createObjectURL(document.getElementById('f').files.item(0));
        console.log(url);
        this.img = url;
      },

      async custAddComment(content, file, cost_effective, environment, service) {
        if ($("#f").val()) {
          let animateImg = $("#f").val(); //获取上传的图片名 带//
          let imgArr = animateImg.split('\\'); //分割
          let myImg = imgArr[imgArr.length - 1]; //去掉 // 获取图片名
          let houZui = myImg.lastIndexOf('.'); //获取 . 出现的位置
          let ext = myImg.substring(houZui, myImg.length).toUpperCase();  //切割 . 获取文件后缀
          let img_file = $('#f').get(0).files[0]; //获取上传的文件
          let fileSize = img_file.size;           //获取上传的文件大小
          let maxSize = 1048576/2;              //最大500k
          if (ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG' && ext != '.BMP') {
            this.message({
              message: '文件类型错误,请上传图片类型',
              type: 'error'
            })
            return false;
          } else if (parseInt(fileSize) >= parseInt(maxSize)) {
            this.message({
              message: '上传的文件不能超过500K',
              type: 'error'
            })
            return false;
          } else {
            // let data = new FormData($('#form1')[0]);
            this.file = img_file
            console.log(img_file);
          }
        }

        if (!content){
          this.$message({
            message:'请填写评论',
            type:'error'
          })
          return
        }
        if(!cost_effective || !environment || !service){
          this.$message({
            message:"请为服务打分",
            type:'error'
          })
        }
        let result = await addComment(this.$route.params.store_id, content, file, localStorage.uid, cost_effective, environment, service, this.$route.params.order_id)
        if (result.code === 1) {
          this.$message({
            message: result.message,
            type: 'success'
          })
          window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
        } else {
          this.$message({
            message: result.message,
            type: 'error'
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

  .demonstration {
    font-size: .16rem;
    font-weight: bolder;
  }

  .pf {
    margin-top: .2rem;
  }

  .add_pic {
    position: relative;
    margin-left: .2rem;
  }

  .pfs {
    left: 20px;
    top: 261px;
    width: 238px;
    height: 18px;
    color: rgba(200, 200, 200, 1);
    font-size: 14px;
    text-align: left;
  }

  .add {
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
