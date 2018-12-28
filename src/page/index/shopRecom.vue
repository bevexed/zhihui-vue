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
          <div class="swiper-slide" v-for="(item,i) in shopGoodList" :key="i"
               @click="$router.push({ name: 'detail', params: { id: item.store_id, status : 0 }})"
          >
            <img class="slide_img" :src="`${baseImgUrl}${item.meal_images}`" alt="">
            <div class="slide_div">
              <p>
                <span class="nowrap">{{item.shop_name}}</span>已售{{item.sold_num}}
              </p>
              <p>
                <span class="nowrap">{{item.meal_name}}</span>{{item.distance}}km</p>
              <p>
                <span class="dollar colorRed">￥</span><span class="colorRed">{{item.amount_money/1}}</span>
                <span class="">满{{item.full/1}}减{{item.reduce/1}}</span>
              </p>
              <!--<p>{{item.address}}</p>-->
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
        toJSON: ''
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
.nowrap{
  display: inline-block;
  width: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
