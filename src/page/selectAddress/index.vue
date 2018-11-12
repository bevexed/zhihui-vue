<template>
  <div @keydown.enter="getCitySearchSelectList(search_key)" style="background: #eeeeee">
    <form action="#" onsubmit="return false;" class="index_head" style="background: #ffffff">
      <p class="iconfont icon-fanhui" @click="$router.go(-1)"></p>
      <el-input
        style="width: 2.5rem;"
        type="search"
        placeholder="请输入城市名"
        prefix-icon="el-icon-search"
        v-model="search_key"
        @input="getCitySearchSelectList(search_key)"
      >
      </el-input>
      <span class="button" @click="getCitySearchSelectList(search_key)" v-show="!search_key">搜索</span>
      <span class="button" @click="search_key = ''" v-show="search_key">取消</span>

    </form>
    <section class="address">
      <div @click="reset">
        从新定位
      </div>
    </section>
    <section class="address" v-show="!search_key">
      <div v-for="v in citySelectLists" @click="changeAddress(v.lat_lng,v.area_id,v.area)">{{v.area}}</div>
    </section>
    <section class="address" v-show="search_key">
      <div v-for="v in citySearchSelectList" @click="changeAddress(v.lat_lng,v.area_id,v.area)">{{v.area}}</div>
    </section>
  </div>
</template>

<script>
  import {citySearchSelectList, citySelectList} from "../../api";

  export default {
    name: "selectAddress",
    data() {
      return {
        search_key: '',
        citySelectLists: '',
        citySearchSelectList: '',
      }
    },
    methods: {
      reset(){
        localStorage.removeItem('longitude_latitude')
        this.$router.push('/index')
        history.go(0)
      },
      back() {
        history.go(-1)
      },
      changeAddress(lat_lng, area_id, area) {
        localStorage.longitude_latitude = lat_lng
        localStorage.area_id = area_id
        localStorage.area = area
        this.$router.push({path: '/index'})
      },
      async getCitySelectList() {
        let result = await citySelectList()
        console.log(result)
        if (result.code === 1) {
          this.citySelectLists = result.data
        }
      },
      async getCitySearchSelectList(search_key) {
        let result = await citySearchSelectList(search_key)
        if (result.code === 1) {
          if (!result.data) {
            this.$message({
              message: "暂不支持此地址",
              type: 'error',
              duration: 1000
            })
            return
          }
          this.citySearchSelectList = result.data
          console.log(result);
        }
      }
    },
    mounted() {
      //路由拦截。。。
      // if (!localStorage.longitude_latitude) {
      //     location.assign('./index.html')
      // }

      setTimeout(() => {
        this.getCitySelectList()
      })

    },
  }
</script>

<style scoped>
  section.address {
    padding: 2%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  section.address div {
    margin-top: .1rem;
    margin-left: .1rem;
    width: 30%;
    text-align: center;
    background: #ffffff;
    height: .4rem;
    line-height: 0.4rem;
  }
</style>
