<template>
  <div class="index_list">
    <div class="swiper-container" id="shopCatelist">
      <div class="swiper-wrapper">
        <!--<div class="swiper-slide" v-for="i in cate">-->
        <div class="swiper-slide" v-for="i in cate">
          <div class="index_list_div" v-for="item in shopCateListData"
               :key="item.id"
               @click="goTo(item)"
          >
            <img
              :src="`${baseImgUrl}${item.images}`"
              alt="">
            <p>{{item.catename}}</p>
          </div>
          <div class="index_list_div" style="float: right" @click="level">
            <img src="../assets/more.png" alt="">
            <p>更多</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl} from "../api/index";

  export default {
    name: "BooKList",
    props: ['shopCateListData', 'goTo', 'level'],
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
        toJSON: ''
      }
    },
    computed: {
      cate() {
        let arr = [];
        let arr2 = [];
        if (this.shopCateListData) {
          this.shopCateListData.forEach(c => {
            if (arr2.length === 8) {
              arr2 = []
            }
            if (arr2.length === 0) {
              arr.push(arr2)
            }
            arr2.push(c)
          })
        }
        return arr
      }
    },
    methods: {},
    created() {

    }
  }
</script>

<style scoped>

</style>
