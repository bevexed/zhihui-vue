<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {wxConfig} from './api'
export default {
  name: 'App',
  data(){
      return{}
  },
  methods:{
    async getWxConfig() {
      let url = window.location.href
      let result = await wxConfig(url)
      result = JSON.parse(result.data)
      let jssdkconfig = result
      wx.config({
        debug: false,
        appId: jssdkconfig.appId,
        timestamp: jssdkconfig.timestamp,
        nonceStr: jssdkconfig.nonceStr,
        signature: jssdkconfig.signature,
        jsApiList: [
          'getLocation',
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
            localStorage.longitude_latitude = latitude  + ',' +  longitude
            console.log(longitude_latitude);
          }
        });
      })
      wx.error(function (res) {
        console.log(`err:${res}`)
      });

    },
  },
  mounted(){
    this.getWxConfig()
    localStorage.longitude_latitude = '116.423816,40.00696'
    localStorage.area = '公主岭市'
    localStorage.area_id = '26332'
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
