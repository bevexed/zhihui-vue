<template>
  <div>
    <div class="index_head">
      <a href="https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop">
        <img src="@/assets/logo.png"
             style="margin-left:.04rem;height: .3rem;" alt="">
      </a>
      <router-link tag="a" :to="{path:'/selectAddress'}">
        <p style="font-weight:bold;font-size: .14rem;min-width: .7rem" :class="['title',{colorRed: address === ''}]">
          {{address === "" ? '定位失败' : address}}
          <img v-show="address !== ''" src="@/assets/s.png" alt="">
        </p>
      </router-link>
      <!--<i v-else class="iconfont icon-dingwei position_icon"></i>-->
      <form action="#" onsubmit="return false;">
        <el-input
          type="search"
          placeholder="输入套餐名称"
          prefix-icon="el-icon-search"
          @focus="$router.push('shopSearch')"
        >
        </el-input>
      </form>

      <!--//商家二维码-->
      <div class="store_img"
           v-if="storeImg"
           @click="storeImg = ''"
           @wheel.prevent @tochmove.prevent>
        <img class="img_s" :src="`${baseImgUrl}${s_img}`" alt="">
        <img
          style="border-radius:.2rem;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto; width: 80%;z-index: 9999"
          :src="`data:image/png;base64,${storeImg}`" alt="">
        <p>推广码</p>
      </div>
      <!--商家付款二维码-->
      <div class="store_img"
           v-if="getCode"
           @click="getCode = ''"
           @wheel.prevent @tochmove.prevent>
        <img class="img_s" :src="`${baseImgUrl}${s_img}`" alt="">
        <Qriosly
          style="border-radius:.2rem;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto; width: 80%;z-index: 9999;height: 3rem;background: white"/>
        <p>收款码</p>
      </div>

      <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="icon-add iconfont"></i>
             </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="getStoreListImg" v-if="isShop === 1">商家二维码</el-dropdown-item>
          <div style="height: .01rem;background: #1a1a1a;width: 100%;" v-if="isShop === 1"></div>
          <el-dropdown-item command="getCode" v-if="isShop === 1">商家收款二维码</el-dropdown-item>
          <div style="height: .01rem;background: #1a1a1a;width: 100%;" v-if="isShop === 1"></div>
          <el-dropdown-item command="open3">发布需求</el-dropdown-item>
          <div style="height: .01rem;background: #1a1a1a;width: 100%;" v-if="isShop === 0"></div>
          <el-dropdown-item command="goToAPP" v-if="isShop === 0">商家入驻</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--//模态框-->
    <el-dialog title="发布需求" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input type="textarea" v-model="form.name" autocomplete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNews(form.name)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {img_s, ImgBaseUrl, isaShop, newsAdd, storeImgs} from "../../api/index";
  import Qriosly from "../../components/Qriosly"

  export default {
    name: "top",
    components: {
      Qriosly
    },
    data() {
      return {
        storeImg: '',
        baseImgUrl: ImgBaseUrl,
        address: localStorage.area,
        isShop: '',
        dialogFormVisible: false,
        form: {
          name: ''
        },
        toJSON: '',
        getCode: '',
        s_img: ''
      }
    },
    methods: {
      async getimg_s() {
        let result = await img_s(localStorage.uid);
        console.log(result);
        this.s_img = result.data
      },
      handleCommand(command) {
        if (command === 'getStoreListImg') {
          this.getStoreListImg()
        } else if (command === 'getCode') {
          this.getCode = true
        } else if (command === 'open3') {
          this.open3()
        } else {
          this.goToApp()
        }
      },
      open3() {
        this.dialogFormVisible = true
      },
      async getStoreListImg() {
        let result = await storeImgs(localStorage.uid, localStorage.longitude_latitude);
        console.log(result);
        this.storeImg = result.data
      },
      goToApp() {
        this.$router.push({path: '/application'})
      },
      async addNews(content) {
        if (content === "") {
          this.$message({
            message: '需求不能为空',
            type: 'error',
            duration: 1000
          });
          return
        }
        let uid = localStorage.uid;
        let result = await newsAdd(uid, content);
        if (result.code === 1) {
          this.$message({
            message: result.message,
            type: 'success',
            duration: 1000
          })
        }

        this.dialogFormVisible = false;
        console.log(result)
      },
      async getisShop() {
        if (localStorage.uid) {
          let result = await isaShop(localStorage.uid);
          console.log(result);
          if (result) { // 有结果说明有uid
            this.isShop = result.code
          }
        } else { // 没有uid 回到首页
          window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
        }
      },

    },
    created() {
      this.getisShop()
    },
    mounted() {
      this.getimg_s()
    }
  }
</script>

<style scoped>
  .store_img {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    z-index: 9998;
    top: 0;
  }

  .store_img img.img_s {
    border-radius: 5px;
    z-index: 99999;
    display: block;
    position: absolute;
    width: .5rem;
    height: .5rem;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
  }

  .store_img p {
    color: white;
    font-size: .2rem;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 1rem;
    right: 0;
    margin: auto;
    z-index: 99999999;
  }


  .index_head .el-input input {
    line-height: .3rem;
    height: .3rem;
    border-radius: .5rem;
    border: none;
    background: #eeeeee;
    min-width: 2.1rem;
  }
</style>
