<template>
  <div class="banner_list" style="border-bottom: .1rem solid rgb(242, 242, 242);">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in banner"
                    :key="item.id">
        <div class="banner">
          <!--<router-link :to="{ name: 'detail', params: { id: item.shop_id, status : 1 }}">-->
            <!--<img :src="`${baseImgUrl}${item.images}`" alt="">-->
          <!--</router-link>-->
          <a :href="item.banner_url">
            <img :src="`${baseImgUrl}${item.images}`" alt="">
          </a>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import {ImgBaseUrl, bannerList} from "../../api/index";

  export default {
    name: "banner",
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    data() {
      return {
        toJSON:'',
        swiperOption: {
          autoplay: {
            delay: 3000,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
          width: innerWidth,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        },
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
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
    }
  }
</script>

<style scoped>

</style>
