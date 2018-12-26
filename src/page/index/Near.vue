<template>
  <div>
    <div class="index_foot_list" v-for="(item,i) in allSortList" :key="i"
         @click="$router.push({ name: 'detail', params: { id: item.id,status:1 }})">
      <img :src="ImgBaseUrl+item.store_images" alt="">
      <div>
        <p class="list_name">{{item.shop_name}}</p>
        <p class="list_content">[{{item.address}}]</p>
        <p class="list_price" v-if="item.discount/1 !== 10">{{item.discount/1}}折起 </p>

      </div>
      <div class="align_self">
        <p class="fontSm">{{item.distance}}km</p>
        <span class="colorRed" v-show="item.amount_money">￥{{item.amount_money}}</span>
        <p style="color: #756b5e;font-size: .12rem">已售 {{item.sold_num}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {ImgBaseUrl} from "../../api";

  export default {
    name: "Near",
    props: ['allSortList'],
    data() {
      return {
        ImgBaseUrl
      }
    },
    components: {},
  }

</script>

<style scoped>

</style>
