<template>
  <div>
    <top/>

    <BooKList
      :shopCateListData="shopCateListData"
      :goTo="goTo"
      :level="level"
    />

    <h3 class="index_bottom_title">附近商家</h3>
    <div class="index_bottom">
      <div class="index_foot">
        <p @click="getAllSort(1)" :class="{'active':sort_status === 1}">
          离我最近</p>
        <p @click="getAllSort(2)" :class="{'active':sort_status === 2}">
          折扣最高</p>
        <p @click="getAllSort(3)" :class="{'active':sort_status === 3}">
          最新发布</p>
        <p @click="getAllSort(4)" :class="{'active':sort_status === 4}">
          价格排序</p>
      </div>

      <div class="index_foot_list" v-for="item in allSortList" :key="item.id"
           @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})">
        <img :src="`${baseImgUrl}${item.store_images}`" alt="">
        <div>
          <p class="list_name">{{item.shop_name}}</p>
          <p class="list_content">[{{item.address}}]</p>
          <p class="list_price">{{item.discount}}折起 </p>

        </div>
        <div class="align_self">
          <p class="fontSm">{{item.distance}}km</p>
          <span class="colorRed" v-show="sort_status === 4">￥{{item.amount_money}}</span>
          <p style="color: #756b5e;font-size: .12rem">已售 {{item.sold_num}}</p>
        </div>
      </div>
      <div>
        <div style="width: 100%;text-align: center;padding: .2rem 0" @click="loadingMore()"
             v-if="allSortList.length !== 0">
          <span v-if="allLoaded">上拉或点击加载更多</span>
          <span v-else>没有更多了</span>
        </div>
        <div style="width: 100%;text-align: center;padding: .2rem 0" v-if="allSortList.length === 0">
          没有更多了
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {twoShopCateList,ImgBaseUrl,allSort} from '../../api'
  import top from './top'
  import ShopSort from '../../components/ShopSort'
  import BooKList from '../../components/BooKList'
  export default {
    name: "seconderyClass",
    components: {
      top,
      BooKList,
      ShopSort
    },
    data(){
      return{
        baseImgUrl:ImgBaseUrl,
        shopCateListData:'',
        allSortList:[],
        sort_status: [],
        sortPage: 1,
        allLoaded: true,
        loading: false,//判断是否加载数据
        loading_more: true,//控制是否发送ajax请求
      }
    },
    methods:{
      goTo(item){
        this.$router.push({name: 'storeList', params: {id: item.id, status: 0}})
      },
      level(){
        this.$router.push({name:'twoAllList'})
      },
      async getAllSort(sort_status) {
        this.allLoaded = true
        this.sort_status = sort_status
        this.sortPage = 1
        let result = await allSort(sort_status, localStorage.longitude_latitude,1,this.$route.params.id, 1,localStorage.area_id)
        if (result.code === 1) {
          console.log(result)
          this.allSortList = result.data.data
        }
      },
      async loadingMore() {
        if (this.allLoaded === false) {
          return
        }
        if ($(window).scrollTop() + $(window).height() + 100 >= $(document).height()) {
          // console.log(1)
          this.allLoaded = false
          this.loading = true;
          this.sortPage++;
          let result
          if (this.loading_more) {
            this.loading_more = false //禁止浏览器发送ajax请求
            result = await allSort(this.sort_status, localStorage.longitude_latitude, 1,this.$route.params.id ,this.sortPage,localStorage.area_id)
            if (result.code === 1) {//判断接受是否成功
              this.loading = false
              console.log(this.allSortList.length, result.data.total)
              if (this.allSortList.length === result.data.total) {
                return
              } else {
                this.loading_more = true
                this.allSortList = [...this.allSortList, ...result.data.data];
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
      async getShopCateList() {
        let result = await twoShopCateList(this.$route.params.id)
        this.shopCateListData = result.data
        console.log(result)
      },
    },
    created(){
      this.getShopCateList()
      this.getAllSort(1)
    }
  }
</script>

<style scoped>

</style>
