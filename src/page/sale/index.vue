<template>
  <div>
    <Back
      :title="'狠优惠'"
    />
    <div class="business_list recommend_list" v-for="item in shopList" :key="item.id"
         @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})">
      <div>
        <div class="bus_top">
          <p style="margin-top: .1rem">{{item.shop_name}}</p>
          <div style="height: .1rem;"></div>
          <p class="colorWrap list_content">{{item.address}}</p>
        </div>
        <div class="bus_down">
          <p class="colorRed" style="font-size: .13rem" v-show="item.discount/1 !== 10">{{item.discount/1}}折</p>
          <p>已售{{item.sold_num}}</p>
          <p class="dollar">{{item.distance}}km</p>
        </div>
      </div>
      <img style="float: right" :src="`${baseImgUrl}${item.store_images}`" alt="">
    </div>

    <div>
      <div style="width: 100%;text-align: center;padding: .2rem 0" @click="loadingMore()" v-if="shopList.length !== 0">
        <span v-if="allLoaded">上拉或点击加载更多</span>
        <span v-else>没有更多了</span>
      </div>
      <div style="width: 100%;text-align: center;padding: .2rem 0" v-if="shopList.length === 0">
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl, firmDiscountList} from "../../api";
  import Back from '../../components/Back'

  export default {
    name: "sale",
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
        this.getStoreList(1)
      })
    },
    methods: {
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
            result = await firmDiscountList(localStorage.longitude_latitude, this.page, localStorage.area_id)
            if (result.code === 1) {//判断接受是否成功
              this.loading = false
              console.log(this.shopList, result.data.total)
              if (this.shopList.length === result.data.total) {
                return false
              } else {

                this.loading_more = true
                for (let [i,v] of Object.entries(result.data)){
                  if (i === 'total') {
                    continue
                  }
                  console.log(v);
                  this.shopList.push(v)
                }
                console.log(this.shopList);
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
      async getStoreList(page) {
        let result = await firmDiscountList(localStorage.longitude_latitude, page, localStorage.area_id)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          for (let [i,v] of Object.entries(result.data)){
            if (i === 'total') {
              continue
            }
            this.shopList.push(v)
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
