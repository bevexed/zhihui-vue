<template>
    <div>
      <form action="#" onsubmit="return false;" class="index_head" style="background: #ffffff">
        <p class="iconfont icon-fanhui" @click="$router.go(-1)"></p>
        <el-input
          style="width: 2.5rem;"
          type="search"
          placeholder="请输入商家名、品类"
          prefix-icon="el-icon-search"
          autofocus="true"
          v-model="search_key"
          @focus="$router.push({name:'shopSearch'})"
        >
        </el-input>
        <span class="button" @click="">搜索</span>
      </form>
    </div>
</template>

<script>
    export default {
        name: "searchShopHead",
      data(){
          return{
            search_key:''
          }
      }
    }
</script>

<style scoped>

</style>
