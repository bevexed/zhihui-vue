<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {wxConfig, districts,citySearchList} from './api'
  import wx from 'weixin-js-sdk';
  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {
      async getDistrict() {
        let result = await districts(localStorage.longitude_latitude)
        this.address = result.result.ad_info.district
        localStorage.area = this.address
        this.getCitySearchList()
        console.log(result.result.ad_info.district)
      },
      async getCitySearchList() {
        let result = await citySearchList(localStorage.area)
        console.log(result);
        localStorage.area_id = result.data.id
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      },
      async getWxConfig() {
        let url = window.location.href.split('#')[0]
        let that = this
        let result = await wxConfig(url)
        result = JSON.parse(result.data)
        let jssdkconfig = result

        wx.config({
          debug: true,
          appId: jssdkconfig.appId,
          timestamp: jssdkconfig.timestamp,
          nonceStr: jssdkconfig.nonceStr,
          signature: jssdkconfig.signature,
          jsApiList: [
            'getLocation',
            'chooseWXPay',
            'openLocation'
          ]
        });

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

      // localStorage.uid = 100
      if (localStorage.longitude_latitude) {
        // localStorage.longitude_latitude = '116.423816,40.00696'
        // localStorage.area = '公主岭市'
        // localStorage.area_id = '26332'
      } else {
        this.getWxConfig()
        // history.go(0)


      }

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
