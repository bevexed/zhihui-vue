<template>
  <div class="index_head" style="width: 90%;margin: 0 auto;">
    <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)" style="align-self: unset"></p>
    <!--<i v-else class="iconfont icon-dingwei position_icon"></i>-->
    <form action="#" onsubmit="return false;" style="width: 90%">
      <el-input
        type="search"
        placeholder="输入商家名字、品类"
        prefix-icon="el-icon-search"
        @focus="$router.push({path:'/shopSearch'})"
      >
      </el-input>
    </form>
  </div>
</template>

<script>
    export default {
        name: "top"
    }
</script>

<style scoped>

</style>
