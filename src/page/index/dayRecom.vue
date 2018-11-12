<template>
  <div class="day_recom">
    <div class="day_recom_top">
      <p>小编推荐</p>
      <p>
          <span class="fontSm"
                @click="$router.push({ name: 'moreRecommendList', params: { id: 'xbtj',status:'undefined' }})"
          >更多推荐
            <i class="iconfont icon-iconfontjiantou5 fontSm"></i></span>
      </p>
    </div>
    <div class="day_recom_bottom">
      <div class="swiper-container" id="recommend">
        <div class="swiper-wrapper day_recom_swiper">
          <div class="swiper-slide" v-for="item in recommendList" :key="item.id"
               @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})"
          >
            <img class="slide_img" :src="`${baseImgUrl}${item.store_images}`" alt="">
            <div class="slide_div">
              <p>{{item.shop_name}}</p>
              <p>{{item.address}}</p>
              <p style="display: flex;justify-content: space-between;align-items:baseline;width: 100%;">
                <!--<span class="dollar colorRed">￥</span>-->
                <span class="colorRed" style="font-size: .1rem"><span style="font-size: .16rem">{{item.discount/1}}</span>折起</span>
                <!--<span class="through_span">￥188</span>-->
                <span class="dollar">{{item.distance}}km</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl, recommendList} from '../../api'

  export default {
    name: "dayRecom",
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
        recommendList: [],
      }
    },
    methods: {
      async getRecommendList() {
        let result = await recommendList(localStorage.longitude_latitude, localStorage.area_id)
        if (result.code === 1) {
          this.recommendList = result.data.data
          console.log(result)
        }
      },
    },
    created() {
      this.getRecommendList()
    },
    mounted() {
      let recommend = new Swiper('#recommend', {
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
