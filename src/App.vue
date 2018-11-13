<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {wxConfig, districts, citySearchList} from './api'
  import wx from 'weixin-js-sdk';

  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {
      async getDistrict() {
        let result = await districts(localStorage.longitude_latitude)
        localStorage.area = result.result.ad_info.district
        localStorage.city = result.result.ad_info.city
        this.getCitySearchList()
      },
      async getCitySearchList() {
        let result = await citySearchList(localStorage.area,localStorage.city)
        console.log(result);
        localStorage.area_id = result.data.id
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      },
      async getWxConfig() {
        let that = this
        this.$getWxConfig()
        wx.ready(function () {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log(JSON.stringify(res))
              // console.log(localStorage.jsdk)
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              localStorage.longitude_latitude = latitude + ',' + longitude
              that.getDistrict()
            }
          });
        })
        wx.error(function (res) {
          console.log(`err:${res}`)
        });

      },
    },
    mounted() {
      // 拦截 正常浏览器
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      } else {
        this.$message({
          message:"暂不支持除微信以外的平台打卡此页面",
          type:'error'
        })
        setTimeout(()=>{window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=8811&do=shop&m=vslai_shop')},3000)
      }


      if (localStorage.longitude_latitude) {
      } else {
        this.getWxConfig()
      }

    }
  }
</script>

<style>
  #app {

  }
</style>
