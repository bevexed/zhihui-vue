<template>
  <div>
    <top/>
    <banner/>
    <BooKList
      :shopCateListData="shopCateListData"
      :goTo="goTo"
      :level="level"
    />
    <dayRecom/>
    <shopRecom/>

    <div class="index_mid">
      <div :style="`background: url(${baseImgUrl}${v.images}) 0 0 / 100% 100% no-repeat;`"
           v-for="(v,i) in discountList"
           :key="v.id"
           @click="goToSale(i,v.id)"
      >
        <div class="mask">{{v.name}}</div>
      </div>
    </div>

    <h3 class="index_bottom_title">附近商家</h3>
    <ShopSort
      :sortPage="sortPage"
      :getAllSort="getAllSort"
      :allSortList="allSortList"
      :sort_status="sort_status"
    />
  </div>
</template>

<script>
  import {ImgBaseUrl, discountList, shopCatelist, allSort} from '../../api'
  import top from './top'
  import banner from './banner'
  import BooKList from '../../components/BooKList'
  import ShopSort from '../../components/ShopSort'
  import dayRecom from './dayRecom'
  import shopRecom from './shopRecom'

  export default {
    name: "index",
    components: {
      top,
      banner,
      BooKList,
      dayRecom,
      shopRecom,
      ShopSort
    },
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
        discountList: [],
        shopCateListData: [],
        allSortList: [],
        sort_status: [],
        sortPage: 1
      }
    },
    methods: {
      level() {
        this.$router.push({name: 'allList'})
      },
      sortPageAdd(data) {
        this.sortPage = data
      },
      goTo(item) {
        this.$router.push({name: 'seconderyClass', params: {id: item.id, status: 0}})
      },
      goToSale(i, id) {
        if (i === 0) {
          this.$router.push({name: 'todaySale', params: {id, status: 0}})
        }
        if (i === 1) {
          this.$router.push({name: 'sale', params: {id, status: 0}})
        }
        if (i === 2) {
          this.$router.push({name: 'busySale', params: {id, status: 0}})
        }
        u
      },
      async getDiscountList() {
        let result = await discountList()
        if (result.code === 1) {
          console.log(result)
          this.discountList = result.data
        }
      },
      async getShopCateList() {
        let result = await shopCatelist()
        this.shopCateListData = result.data
        console.log(result)
      },
      async getAllSort(sort_status) {
        this.allLoaded = true
        this.sortPage = 1
        this.sort_status = sort_status
        let result = await allSort(sort_status, localStorage.longitude_latitude, '', '', 1, localStorage.area_id)
        if (result.code === 1) {
          console.log(result)
          this.allSortList = result.data.data
        }
      },
    },
    created() {
      this.getDiscountList()
      this.getShopCateList()
      this.getAllSort(1)
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
