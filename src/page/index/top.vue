<template>
  <div>
    <div class="index_head">
      <a href="https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=8811&do=shop&m=vslai_shop">
        <img src="@/assets/logo.png"
             style="margin-left:.04rem;height: .3rem;" alt="">
      </a>
      <router-link tag="a" :to="{path:'/selectAddress'}">
        <p style="font-weight:bold;font-size: .14rem;min-width: .7rem" :class="['title',{colorRed: address === ''}]">{{address === "" ? '定位失败' : address}}
          <img v-show="address !== ''" src="@/assets/s.png" alt="">
        </p>
      </router-link>
      <!--<i v-else class="iconfont icon-dingwei position_icon"></i>-->
      <form action="#" onsubmit="return false;">
        <el-input
          type="search"
          placeholder="输入商家名字、品类"
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
        <img
          style="border-radius:.2rem;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto; width: 80%;z-index: 9999"
          :src="`data:image/png;base64,${storeImg}`" alt="">
      </div>

      <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <i class="icon-add iconfont"></i>
             </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="getStoreListImg" v-if="isShop === 1">商家二维码</el-dropdown-item>
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
  import {ImgBaseUrl, isaShop, storeImg ,newsAdd } from "../../api/index";
  export default {
    name: "top",
    data() {
      return {
        storeImg: '',
        baseImgUrl: ImgBaseUrl,
        address: localStorage.area,
        isShop: '',
        dialogFormVisible: false,
        form:{
          name:''
        },

      }
    },
    methods: {
      handleCommand(command) {
        if (command === 'getStoreListImg') {
          this.getStoreListImg()
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
        let result = await storeImg(uid, longitude_latitude)
        console.log(result)
        this.storeImg = result.data
      },
      goToApp() {
        this.$router.push({path:'/application'})
      },
      async addNews(content) {
        if (content === "") {
          this.$message({
            message: '需求不能为空',
            type: 'error',
            duration: 1000
          })
          return
        }
        let uid = localStorage.uid
        let result = await newsAdd(uid, content)
        if (result.code === 1) {
          this.$message({
            message: result.message,
            type: 'success',
            duration: 1000
          })
        }

        this.dialogFormVisible = false
        console.log(result)
      },
      async getisShop() {
        let uid = localStorage.uid
        let result = await isaShop(uid)
        console.log(result)
        this.isShop = result.code
      },
      async getStoreListImg() {
        let result = await storeImg(uid, longitude_latitude)
        console.log(result)
        this.storeImg = result.data
      },

    },
    created() {
      this.getisShop()
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .store_img {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    position: absolute;
    z-index: 9998;
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
