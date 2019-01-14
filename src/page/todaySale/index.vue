<template>
  <div>
    <Back
      :title="'今日优惠'"
    />

    <div class="today_ul" v-for="item in shopList" :key="item.store_id" v-if="shopList.length !== item+1"
         @click="$router.push({ name: 'detail', params: { id: item.store_id,status:1 }})"
    >
      <div class="img">
        <img :src="`${baseImgUrl}${item.meal_images}`" style="width: 100%" alt="">
      </div>

      <div class="content">
        <div class="bus_top">
          <p>{{item.shop_name}}</p>
        </div>
        <p class="nowrap fontTen colorWrap" style="display: flex;justify-content: space-between">
          <span v-show="item.meal_name">[{{item.meal_name}}] </span>
          <cite style="margin-right: .1rem;">已售数量：{{item.sold_num}}</cite>
          <!--<span-->
          <!--style="margin-left:.1rem;max-width: 1.4rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">-->
          <!--{{item.address}}</span>-->
        </p>
        <div class="bus_down">
          <p class="colorRed"><span class="list_price" v-if="item.discount-0 !== 10 && item.discount-0 !== 0">{{item.discount}}折</span>￥{{item.discount_amount}}起</p>
          <p class="dollar" style="text-align:right;flex-grow: 1">{{item.distance}}km &nbsp;</p>
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
  import {ImgBaseUrl, todayDiscountList} from "../../api";
  import Back from '../../components/Back'

  export default {
    name: "todaySale",
    components: {
      Back
    },
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
      async getStoreList(page) {
        let result = await todayDiscountList(localStorage.longitude_latitude, page, localStorage.area_id);
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data);
          let arr = [];
          for (let i in result.data) {
            arr.push(result.data[i])
          }
          this.shopList = arr;
          console.log(arr);
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
          this.allLoaded = false;
          this.loading = true;
          this.page++;
          let result;
          if (this.loading_more) {
            this.loading_more = false; //禁止浏览器发送ajax请求
            result = await todayDiscountList(localStorage.longitude_latitude, this.page, localStorage.area_id);
            if (result.code === 1) {//判断接受是否成功
              this.loading = false;
              // console.log(this.allSortList.length, result.data.total)
              if (this.shopList.length === result.data.total + 1) {
                console.log('没有更多数据');

              } else {
                this.loading_more = true;
                let arr = [];
                for (let i in result.data) {
                  arr.push(result.data[i])
                }
                this.shopList = arr;
                this.shopList = [...this.shopList, ...arr];
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
