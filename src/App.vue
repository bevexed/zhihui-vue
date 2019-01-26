<template>
  <div id="app">
    <keep-alive exclude="detail,pay,booking,aliPay,application,evaluation,paySuccess,scan,shopSearch,toevaluation">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import {citySearchList, districts} from './api'
  import wx from 'weixin-js-sdk';

  export default {
    name: 'App',
    data() {
      return {
        toJSON: ''
      }
    },
    methods: {
      async getDistrict() {
        let result = await districts(localStorage.longitude_latitude);
        localStorage.area = result.result.ad_info.district;
        localStorage.city = result.result.ad_info.city;
        this.getCitySearchList()
      },
      async getCitySearchList() {
        let result = await citySearchList(localStorage.area, localStorage.city);
        console.log(result);
        localStorage.area_id = result.data.id;
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      },
      async getWxConfig() {
        let that = this;
        this.$getWxConfig();
        wx.ready(function () {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log(JSON.stringify(res));
              // console.log(localStorage.jsdk)
              let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              if (!localStorage.longitude_latitude) {
                // 如果当前定位不存在
                localStorage.longitude_latitude = longitude + ',' + latitude
              } else {
                // 如果当前定位存在
                if (localStorage.longitude_latitude !== longitude + ',' + latitude) {
                  // 如果当前定位变了，重新定位，直到获取到准确定位为止
                  localStorage.longitude_latitude = longitude + ',' + latitude;
                  this.getWxConfig()
                } else {
                  // 定位相同时，终止定位
                  return false
                }
              }

              that.getDistrict()
            }
          });
        });
        wx.error(function (res) {
          console.log(`err:${res}`)
        });

      },
    },
    mounted() {
      this.getWxConfig()
    },
    watch: {
      $route(to, from) {
        console.log(from.name);
        console.log(to.name);
        // 从首页到 seconderyClass
        if (from.name === 'index' && to.name === 'seconderyClass') {
          location.reload()
        }

        // 从 seconderyClass 到 storeList
        if (from.name === 'seconderyClass' && to.name === 'storeList') {
          location.reload()
        }

        // 从 twoAllList 到 storeList
        if (from.name === 'twoAllList' && to.name === 'storeList') {
          location.reload()
        }


        // 从 shopSearch 到 shopSearchResult
        if (from.name === 'shopSearch' && to.name === 'shopSearchResult') {
          location.reload()
        }

      }
    }
  }
</script>

<style>
  #app {
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    overflow: hidden;
  }
</style>
