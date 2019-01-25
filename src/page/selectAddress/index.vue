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
    <section class="reset button">
        <div @click="reset">
          重新定位
        </div>
    </section>

    <div class="content">
      <section class="address" v-if="!search_key">
        <div v-for="(value,i) in citySelectLists" :key="i" :id="'anchor-'+i">
          <div class="initial" >{{value.key===""?'Top':value.key}}</div>
          <div v-for="v in value.value" @click="changeAddress(v.lat_lng,v.area_id,v.area)">{{v.area}}</div>
        </div>

      </section>
      <section class="address" v-else>
        <div v-for="">
          <div v-for="v in citySearchSelectList" @click="changeAddress(v.lat_lng,v.area_id,v.area)">{{v.area}}</div>
        </div>
      </section>
      <aside>
        <div v-anchor="index" v-for="(value,index) in addressInitial" :key="index">{{value===""?'Top':value}}</div>
      </aside>
    </div>

  </div>
</template>

<script>
  import {citySearchSelectList, getAddress} from "../../api";

  export default {
    name: "selectAddress",
    data() {
      return {
        search_key: '',
        citySelectLists: [],
        citySearchSelectList: '',
        addressInitial: [],
        time: true
      }
    },
    methods: {
      reset() {
        localStorage.removeItem('longitude_latitude');
        this.$router.push('/index');
        history.go(0)
      },
      back() {
        history.go(-1)
      },
      changeAddress(lat_lng, area_id, area) {
        localStorage.area_id = area_id;
        localStorage.area = area;
        location.href = location.href.split('#')[0]
      },
      async getAddressList() {
        await getAddress().then(
          result => {
            if (result.code === 1) {
              for (let [key, value] of Object.entries(result.data)) {
                this.addressInitial.push(key);
                this.citySelectLists.push({key,value})
              }
            }
          }
        )
      },
      async getCitySearchSelectList(search_key) {
        if (!this.time) {
          setTimeout(() => {
            this.time = true
          }, 1000);
          return
        }
        if (this.time) {
          this.time = false
        }
        let result = await citySearchSelectList(search_key);
        if (result.code === 1) {
          if (!result.data) {
            this.$message({
              message: "暂不支持此地址",
              type: 'error',
              duration: 1000
            });
            return
          }
          this.citySearchSelectList = result.data;
          console.log(result);
        }
      }
    },
    mounted() {
      this.getAddressList()
    },
  }
</script>

<style scoped>
  .initial{
    background: rgb(238,238,238) !important;
  }

  .content {
    margin-top: .1rem;
    background: white;
    position: relative;
  }

  .content .address {

  }

  .reset{
    padding: 0 .1rem;
    margin-top: .1rem;
    margin-left: .1rem;
  }

  .content aside {
    z-index: 999;
    position: fixed;
    top: 1rem;
    right: 0;
  }

  .content aside div {
    display: block;
    color: black;
    width: .4rem;
    height: .2rem;
    margin-top: 5px;
    text-align: center;
  }

  section.address {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  section.address > div {
    text-align: left;
    width: 100%;
  }

  section.address > div > div {
    text-indent: 1em;
    min-width: 30%;
    background: #ffffff;
    height: .4rem;
    line-height: 0.4rem;
    border-bottom: 1px solid rgb(238,238,238);
  }
  /*section.address > div > div {*/
    /*margin-top: .1rem;*/
    /*margin-left: .1rem;*/
    /*min-width: 30%;*/
    /*text-align: center;*/
    /*background: #ffffff;*/
    /*height: .4rem;*/
    /*line-height: 0.4rem;*/
  /*}*/


</style>
