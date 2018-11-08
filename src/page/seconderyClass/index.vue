<template>
  <div>
    <top/>

    <BooKList
      :shopCateListData="shopCateListData"
      :goTo="goTo"
      :level="level"
    />

    <h3 class="index_bottom_title">附近商家</h3>

    <ShopSort
      :getAllSort="getAllSort"
      :allSortList="allSortList"
    />
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
        allSortList:[]
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
        let result = await allSort(sort_status, localStorage.longitude_latitude,2,this.$GetQueryString('id'), 1,localStorage.area_id)
        if (result.code === 1) {
          console.log(result)
          this.allSortList = result.data.data
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
