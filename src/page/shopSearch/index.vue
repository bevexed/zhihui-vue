<template>
  <div @keyup.enter="goToSearch(search_key)">
    <form action="#" onsubmit="return false;" class="index_head" style="padding: 0 .1rem">
      <p class="iconfont icon-fanhui" @click="$router.go(-1)"></p>
      <el-input
        style="width: 2.5rem;margin-left: .14rem"
        type="search"
        placeholder="输入套餐名称"
        prefix-icon="el-icon-search"
        autofocus="true"
        v-model="search_key"
      >
      </el-input>
      <span @click="goToSearch(search_key)" class="button">搜索</span>
    </form>

    <div style="height: .01rem; background: #fff0d4"></div>

    <div class="search_div">
      <p>热门搜索</p>
      <div>
        <p v-for="(item,i) in hotSearchList" :style="[{background:'hsl('+color[i]+',62%,74%)'},{color:'#ffffff'}]"
           @click="goToSearch(item.hot_words)">{{item.hot_words}}</p>
      </div>
    </div>
    <div style="height: .08rem; background: #ededed;margin-top: .2rem" v-if="historysearchList"></div>
    <div class="" style="padding: .2rem .12rem 0;" v-if="historysearchList">
      <p style="font-size: .14rem;font-weight: bold;">历史搜索<i style="float: right;" class="el-icon-delete"
                                                             @click="deleteHistoryList()"></i></p>
      <div>
        <div style="padding: .14rem 0;border-bottom: .01rem solid #e6e6e6;font-size: .12rem;color: #666666;"
             v-for="item in historysearchList" @click="goToSearch(item.search_name)">{{item.search_name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {hotSearchList,historySearchList,deleteHistory} from '../../api'
  export default {
    name: "shopSearch",
    data() {
      return {
        historysearchList: '',
        search_key: '',
        hotSearchList: [],
        shopList: [],
      }
    },
    computed: {
      color() {
        let arr = []
        for (let i = 0; i < 30; i++) {
          let h = Math.floor(Math.random() * 255) + 1
          arr.push(h)
        }
        return arr
      }
    },
    methods: {
      goToSearch(search_key) {
        if (search_key === '') {
          this.$message({
            message: '搜索条件不能为空',
            type: 'error',
          })
          return
        }
        this.$router.push({name:'shopSearchResult',params:{search_key}})
      },

      async getHotSearchList() {
        let result = await hotSearchList()
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.hotSearchList = result.data
        }
      },
      async getHistorySearchList() {
        let result = await historySearchList(localStorage.uid)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.historysearchList = result.data
        }
      },
      async deleteHistoryList() {
        let uid = localStorage.uid
        let result = await deleteHistory(uid)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          window.history.go(0)
        }
      }

    },
    mounted() {
      this.getHotSearchList()
      this.getHistorySearchList()
    },
  }
</script>

<style scoped>

</style>
