<template>
  <div @touchmove="loadingMore()" @wheel="loadingMore()">
    <div class="pay_top">
      <p class="iconfont icon-fanhui comeback" @click="back()"></p>
      <p>{{$route.params.status == '0'? '商家推荐':'小编推荐' }}</p>
    </div>

    <div class="today_ul" v-for="item in shopList" :key="$route.params.status == '0'?item.store_id : item.id"
         @click="$router.push({name:'detail',params:{id:$route.params.status == '0'?item.store_id : item.id,status:1}})"
    >
      <div class="img">
        <img :src="`${baseImgUrl}${$route.params.status == '0'?item.meal_images:item.store_images}`" alt="">
      </div>
      <div class="content">
        <div class="bus_top" style="width: 100%">
          <p style="width: 100%">{{item.shop_name}}
            <span style="font-size:.12rem;float: right;margin-right: .08rem">已售数量{{item.sold_num}}</span>
          </p>
        </div>
        <p style="width: 100%" class="nowrap fontTen colorWrap">[{{$route.params.status != '0' ? item.address : item.meal_name}}]
          <span style="float: right;margin-right: 0.08rem;" v-show="item.amount_money">￥{{item.amount_money}}</span></p>
        <div class="bus_down">
          <p class="colorRed" v-show="item.discount !== '无折扣'">{{item.discount}}折起</p>
          <p>{{item.distance}}km</p>
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
  import {ImgBaseUrl, MoreRecommendList, moreShopGoodsList} from '../../api'

  export default {
    name: "moreRecommendList",
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
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
      setTimeout(() => {
        this.getStoreList(this.page)
      })
    },
    methods: {
      back() {
        history.go(-1)
      },
      async getStoreList(page) {
        let result;
        if (this.$route.params.status == '0') {
          result = await moreShopGoodsList(localStorage.longitude_latitude, page, localStorage.area_id);
          if (result.code === 1) {
            console.log(result.data);
            this.shopList = result.data;
            if (this.shopList.length === result.data.total + 1) {
              this.allLoaded = false
            }
          }
        } else {
          result = await MoreRecommendList(localStorage.longitude_latitude, page, localStorage.area_id);
          if (result.code === 1) {
            console.log(result.data);
            this.shopList = result.data.data;
            if (this.shopList.length === result.data.total + 1) {
              this.allLoaded = false
            }
          }
        }
        if (result.code === 0) {
          alert(result.message)
        }

      },
      async loadingMore() {
        if (this.allLoaded === false) {
          return
        }
        if ($(window).scrollTop() + $(window).height() + 200 >= $(document).height()) {
          this.allLoaded = false;
          this.loading = true;
          this.page++;
          let result;
          if (this.loading_more) {
            this.loading_more = false; //禁止浏览器发送ajax请求let result

            if (this.$route.params.status === 0) {
              result = await moreShopGoodsList(localStorage.longitude_latitude, this.page, localStorage.area_id)
            } else {
              result = await MoreRecommendList(localStorage.longitude_latitude, this.page, localStorage.area_id)
            }

            if (result.code === 1) {//判断接受是否成功
              this.loading = false;
              // console.log(this.allSortList.length, result.data.total)
              if (this.shopList.length === result.data.total + 1) {
                console.log('没有更多数据');

              } else {
                this.allLoaded = true;
                this.loading_more = true;
                this.shopList = [...this.shopList, ...res.data.data];
              }
            } else {
              setTimeout(() => {
                this.loading = false;
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
