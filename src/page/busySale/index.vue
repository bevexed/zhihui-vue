<template>
  <div>
    <Back
      :title="'优惠信息'"
    />


    <div class="business_list" v-for="item in shopList" :key="item.store_id"
         @click="$router.push({ name: 'detail', params: { id: item.store_id,status:1 }})">
      <img :src="`${baseImgUrl}${item.store_images}`" alt="">
      <div>
        <div class="bus_top">
          <p style="margin-top: .1rem;display: flex;justify-content: space-between;width: 100%;align-items: flex-end">{{item.shop_name}} <span style="font-size: .12rem">已售{{item.sold_num}}</span></p>
          <div style="height: .1rem;"></div>
          <p class="colorWrap nowrap">￥{{item.amount_money}}</p>
        </div>
        <div class="bus_down" style="padding-bottom: .05rem;">
          <p class="colorRed" v-if="item.discount/1 !== 10 && item.discount/1 !== 0">{{item.discount/1}}折</p>
          <p v-if="item.full"> 满{{item.full/1}}减{{item.reduce/1}}</p>
          <p style="color: #7e7e7e;">{{item.distance}}km</p>
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
  import {ImgBaseUrl, informationDiscountList} from "../../api";
  import Back from '../../components/Back'

  export default {
    name: "busySale",
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
    methods: {
      async getStoreList(page) {
        let result = await informationDiscountList(localStorage.longitude_latitude, this.page, localStorage.area_id)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.shopList = result.data
        }
      },
      async loadingMore() {
        if (this.allLoaded === false) {
          return
        }
        if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
          // alert(1)
          this.allLoaded = false
          this.loading = true;
          this.page++;
          let result
          if (this.loading_more) {
            this.loading_more = false //禁止浏览器发送ajax请求
            result = await informationDiscountList(localStorage.longitude_latitude, this.page, localStorage.area_id)
            if (result.code === 1) {//判断接受是否成功
              this.loading = false
              if (this.shopList.length === result.data.total) {
                return
              } else {

                this.loading_more = true
                this.shopList = [...this.shopList, ...result.data];
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
    },
    mounted() {
      this.getStoreList(this.$route.params.id, localStorage.longitude_latitude)
    },
  }
</script>

<style scoped>
  .bus_down > p {
    width: 30%;
  }
  .bus_down > p:last-child{
    font-size: .12rem;
  }
</style>
