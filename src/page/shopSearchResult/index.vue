<template>
  <div @touchmove="loadingMore()" @wheel="loadingMore()">
    <back
      :title="'搜索结果'"
    />
    <h3 class="index_bottom_title">搜索结果</h3>
    <div class="index_bottom">
      <!--<div class="index_foot">-->
      <!--<p @click="getAllSort(1,longitude_latitude,1)" :class="{'active':index_foot[0] === 1}">-->
      <!--离我最近</p>-->
      <!--<p @click="getAllSort(2,longitude_latitude,1)" :class="{'active':index_foot[1] === 1}">-->
      <!--折扣最高</p>-->
      <!--<p @click="getAllSort(3,longitude_latitude,1)" :class="{'active':index_foot[2] === 1}">-->
      <!--最新发布</p>-->
      <!--</div>-->
      <div class="index_foot_list" v-for="item in allSortList" :key="item.id"
           @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})"
      >
        <img :src="`${baseImgUrl}${item.store_images}`" alt="">
        <div>
          <p class="list_name">{{item.shop_name}}</p>
          <p class="list_content">[{{item.address}}]</p>
          <p class="list_price">{{item.discount}}折起</p>
        </div>
        <div class="align_self">
          <p class="fontSm">{{item.distance}}km</p>
          <p>已售{{item.sold_num}}</p>
        </div>
      </div>
      <div v-if="!allSortList" style="text-align: center">没有相关项目请重新搜索</div>
      <!--<div style="width: 100%;text-align: center">-->
      <!--<span v-if="allLoaded">上拉加载更多</span>-->
      <!--<span v-else>没有更多了</span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import back from '../../components/Back'
  import {ImgBaseUrl, shopGoodsSearchList} from "../../api";

  export default {
    name: "shopSearchResult",
    components: {back},
    data() {
      return {
        jssdkconfig: '',
        baseImgUrl: ImgBaseUrl,
        allSortList: [],
        sort_status: 1,
        sortPage: 1,
        index_foot: [1, 0, 0],
        address: '',
        allLoaded: true,
        loading: false,//判断是否加载数据
        loading_more: true,//控制是否发送ajax请求
      }
    },
    methods: {
      async getShopGoodsSearchList() {
        let search_key = this.$route.params.search_key
        let uid = localStorage.uid
        let result = await shopGoodsSearchList(search_key, localStorage.longitude_latitude, uid, localStorage.area_id)
        if (result.code === 1) {
          if (result.data !== null) {
            let obj = {}
            let arr = []
            for (let i = 0; i < result.data.length; i++) {
              // console.log(result.data[i]);
              if (result.data[i] !== null) {
                for (let a in result.data[i]) {
                  // console.log(a);
                  // console.log(result.data[i][a]);
                  obj[a] = result.data[i][a]
                  // console.log(`obj:${JSON.stringify(obj)}`);
                }
                arr.push(obj)
                // console.log(arr);
              }
            }
            this.allSortList = arr
            console.log(this.allSortList);
            console.log(typeof result.data[0])
          }

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
            result = await allSort(this.sort_status, longitude_latitude, this.sortPage)
            if (result.code === 1) {//判断接受是否成功
              this.loading = false
              console.log(this.allSortList.length, result.data.total)
              if (this.allSortList.length === result.data.total) {
                return
              } else {
                this.loading_more = true
                let obj = {}
                let arr = []
                if (result.code === 1) {
                  if (result.data !== null) {
                    for (let i = 0; i < result.data.length; i++) {
                      // console.log(result.data[i]);
                      if (result.data[i] !== null) {
                        for (let a in result.data[i]) {
                          // console.log(a);
                          // console.log(result.data[i][a]);
                          obj[a] = result.data[i][a]
                          // console.log(`obj:${JSON.stringify(obj)}`);
                        }
                        arr.push(obj)
                        // console.log(arr);
                      }
                    }
                    this.allSortList = arr
                    console.log(this.allSortList);
                    console.log(typeof result.data[0])
                  }
                }
                this.allSortList = [...this.allSortList, ...arr];
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
      goTo(url, id, longitude_latitude, status) {
        location.assign(`${url}?id=${id}&status=${status}`)
      },
      getRequest() {
        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },
    },
    created() {
      this.getShopGoodsSearchList()

    },
  }
</script>

<style scoped>

</style>
