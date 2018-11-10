<template>
  <div class="banner_list" style="border-bottom: .1rem solid rgb(242, 242, 242);">
    <div class="swiper-container" id="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banner"
             :key="item.id"
        >
          <div class="banner">
            <a :href="`${item.banner_url}&id=${item.shop_id}`">
              <img :src="`${baseImgUrl}${item.images}`" alt="">
            </a>
          </div>
        </div>

      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl, bannerList} from "../../api/index";

  export default {
    name: "banner",
    data() {
      return {
        banner: [],
        baseImgUrl: ImgBaseUrl,
      }
    },
    methods: {
      async getBanner() {
        let result = await bannerList()
        this.banner = result.data
        console.log(result)
      },
    },
    created() {
      this.getBanner()
    },
    mounted() {
      let t = null
      let banner = new Swiper('#banner', {
        init:false,
        autoplay: {
          delay: 3000,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          // slideChange: function () {
          //   if (banner.isEnd){
          //     setTimeout(t = ()=>{
          //       banner.slideTo(0, 0, false)
          //     },3000)
          //   }
          //   console.log(banner.slides.length);
          // },
        },
        width: innerWidth,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
      this.$nextTick(() => {
        banner.init()
      })
    }
  }
</script>

<style scoped>

</style>
