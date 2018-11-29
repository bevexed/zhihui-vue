<template>
  <div @touchmove="loadingMore()" @wheel="loadingMore()">
    <nav class="tab">
      <span><a @click="navBar(1)" class="button">至惠商城</a></span>
      <span><a class="button">至惠商联</a></span>
    </nav>
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
        <p @click="getAllSort(5)" :class="{'active':sort_status === 5}">
          好评排序</p>
      </div>

      <div class="index_foot_list" v-for="item in allSortList" :key="item.id"
           @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})">
        <img :src="`${baseImgUrl}${item.store_images}`" alt="">
        <div>
          <p class="list_name">{{item.shop_name}}</p>
          <p class="list_content">[{{item.address}}]</p>
          <p class="list_price" v-if="item.discount/1 !== 10">{{item.discount/1}}折起 </p>

        </div>
        <div class="align_self">
          <p class="fontSm">{{item.distance}}km</p>
          <span class="colorRed" v-show="item.amount_money">￥{{item.amount_money}}</span>
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
  import wx from 'weixin-js-sdk';
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
      top, // 头部搜索
      banner, //
      BooKList, // 一级分类
      dayRecom, // 小编推荐
      shopRecom, // 商家推荐
      ShopSort, //  商品分类
    },
    data() {
      return {
        uid:'',
        discountList: [],
        shopCateListData: [],
        allSortList: [],
        sort_status: 1,
        sortPage: 1,
        baseImgUrl: ImgBaseUrl,
        allLoaded: true,
        loading: false,//判断是否加载数据
        loading_more: true,//控制是否发送ajax请求
        toJSON: ''
      }
    },
    methods: {
      share() {
        let url = `${window.location.href.split('#')[0]}&mid=${localStorage.uid}#/index`
        this.$getWxConfig()
        let that = this
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: '至惠商联', // 分享标题
            desc: '扫码付款立返消费券', // 分享描述
            link: url, // 分享链接
            imgUrl: '@/assets/logo.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              that.$message({
                message: "分享成功",
                type: 'success'
              })
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      },
      navBar(index){
        if (index === 1){
          window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
        }
        if (index === 0){
          window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/dist/index.html?uid=${this.uid}#/index`)
        }
      },
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
            result = await allSort(this.sort_status, localStorage.longitude_latitude, '', '', this.sortPage, localStorage.area_id)
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
    },
    created() {
      console.log(window.location.href);
      let p = /=(\d*)#/
      let uid = window.location.href.match(p)[1]
      console.log(uid);
      localStorage.uid = uid
      this.uid = uid
    },
    mounted() {
      this.getDiscountList()
      this.getShopCateList()
      this.getAllSort(1)
      this.share()
    }
  }
</script>

<style scoped>
  a:active{
    text-underline: none;
  }
  .tab{
    width: 100%;
    box-sizing: border-box;
    border-bottom: 4px solid #e3e3e3;
  }

  .tab span {
    display: inline-block;
    width: 49%;
    text-align: center;
    height: .4rem;
    line-height: .4rem;
    box-sizing: border-box;
    border-radius: 5px;
  }
  nav.tab span:last-child{

    color: #FFFFFF !important;
  }

  nav.tab a{
    border-radius: 10px !important;
    color: #0f0f0f;
  }

  nav.tab span:first-child a{
    width: 1rem;
    background: #7a7573 !important;
    color: #FFFFFF !important;
  }

  nav.tab span:last-child a{
    width: 1rem;
    background: #f15353 !important;
    color: #FFFFFF !important;
  }


  div {
    background: #ffffff;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(101, 101, 101, .6) !important;
    color: #fff;
    text-align: center;
    line-height: .7rem;
    border-radius: .05rem;
  }
</style>
