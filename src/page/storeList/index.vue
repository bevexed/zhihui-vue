<template>
  <div @touchmove="loadingMore()" @wheel="loadingMore()">
    <div class="pay_top">
      <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
      <p>商品列表</p>
    </div>

    <div class="today_ul" v-for="item in shopList" :key="item.id"
         @click="goTo('./detail.html',item.id,longitude_latitude,1)">
      <img :src="`${baseImgUrl}${item.store_images}`" alt="">
      <div>
        <div class="bus_top">
          <p class="recomP">
            <span>{{item.shop_name}}</span>
            <span class="fontSm">{{item.distance}}km</span>
          </p>
        </div>
        <p class="nowrap fontTen colorWrap">[{{item.address}}]{{item.meal_name}}</p>
        <div class="bus_down">
          <p class="colorRed">{{item.discount}}折起</p>
          <p class="setNum">已售{{item.sold_num}}</p>
        </div>
      </div>
    </div>
    <div style="width: 100%;text-align: center">
      <span v-if="allLoaded" @click="loadingMore()">上拉加载更多</span>
      <span v-else>没有更多了</span>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl,storeList} from "../../api";
  export default {
    name: "storeList",
    data(){
      return{
        baseImgUrl:ImgBaseUrl,
        id:0,
        shopCateListData:[],
        shopList: [],
        page: 1,
        allLoaded: true,
        loading: false,//判断是否加载数据
        loading_more: true,//控制是否发送ajax请求
      }
    },
    mounted() {
      //路由拦截。。。
      if (!localStorage.longitude_latitude) {
        location.assign('./index.html')
      }
        this.getStoreList(this.$route.params.id,localStorage.longitude_latitude, this.page)
    },
    methods: {
      async getStoreList(id) {
        let result = await storeList(id,1,localStorage.longitude_latitude, this.page,localStorage.area_id)
        if (result.code === 0) {
          console.log(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.shopList = result.data.data
          if (this.shopList.length === result.data.total + 1) {
            this.allLoaded = false
          }
        }
      },
      async loadingMore() {
        if (this.allLoaded === false) {
          return
        }
        if ($(window).scrollTop() + $(window).height() + 10 >= $(document).height()) {
          this.allLoaded = false
          this.loading = true;
          this.page++;
          let result
          if (this.loading_more) {
            this.loading_more = false //禁止浏览器发送ajax请求
            result = await storeList(this.id,1, longitude_latitude, this.page,area_id)
            if (result.code === 1) {//判断接受是否成功
              this.loading = false
              // console.log(this.allSortList.length, result.data.total)
              if (this.shopList.length === result.data.total + 1) {
                console.log('没有更多数据')
                return
              } else {
                this.loading_more = true
                this.shopList = [...this.shopList, ...res.data.data];
              }
            } else {
              setTimeout(() => {
                this.loading = false
                this.loading_more = true
              }, 1000)
            }
          } else {
            this.loading = false
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
