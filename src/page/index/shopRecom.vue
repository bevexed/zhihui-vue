<template>
  <div class="day_recom">
    <div class="day_recom_top">
      <p>商家推荐</p>
      <p>
        <span class="fontSm"
              @click="$router.push({ name: 'moreRecommendList', params: { id: 'xbtj',status:0 }})">更多推荐</span>
        <i class="iconfont icon-iconfontjiantou5 fontSm"></i>
      </p>
    </div>
    <div class="day_recom_bottom">
      <div class="swiper-container" id="shopGoodList">
        <div class="swiper-wrapper day_recom_swiper">
          <div class="swiper-slide" v-for="item in shopGoodList" :key="item.store_id"
               @click="$router.push({ name: 'detail', params: { id: item.store_id, status : 0 }})"
          >
            <img class="slide_img" :src="`${baseImgUrl}${item.store_images}`" alt="">
            <div class="slide_div">
              <p>{{item.shop_name}}</p>
              <p>{{item.meal_name}}</p>
              <p>
                <span class="dollar colorRed">￥</span><span class="colorRed">{{item.amount_money * ( 1 -item.discount/100)}}</span>
                <span class="through_span">原价{{item.amount_money}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl, shopGoodList} from '../../api'

  export default {
    name: "shopRecom",
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
        shopGoodList: [],
      }
    },
    methods: {
      async getRecommendList() {
        let result = await shopGoodList(localStorage.longitude_latitude, localStorage.area_id)
        if (result.code === 1) {
          this.shopGoodList = result.data
          console.log(result)
        }
      },
    },
    created() {
      this.getRecommendList()
    },
    mounted() {
      let recommend = new Swiper('#shopGoodList', {
        freeMode: true,
        slidesPerView: 1.3,
        spaceBetween: 20,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
    }
  }
</script>

<style scoped>

</style>
