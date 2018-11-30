<template>
  <div style="background: #eeeeee">
    <searchShopHead/>
    <section class="cate" v-for="v in list">
      <section class="img">
        <header @click="$router.push({name:'seconderyClass',params:{id:v.id,status:0}})">
          <img :src="baseImgUrl+v.images" alt="">
          <span>{{v.catename}}</span>
        </header>
        <div>
          <p v-for="v1 in v.shopchild_cate" @click="$router.push({name: 'storeList', params: {id: v1.id, status: 0}})"> {{v1.catename}}</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import {moreShopCateList,ImgBaseUrl} from "../../api";
  import searchShopHead from '../../components/searchShopHead'
  export default {
    name: "allList",
    components:{
      searchShopHead
    },
    data() {
      return {
        baseImgUrl: ImgBaseUrl,
        address: '',
        list: [],
      }
    },
    methods: {
      async getList() {
        let result = await moreShopCateList()
        console.log(result);
        if (result.code === 1){
          this.list = result.data
        }
      },
    },
    created() {
        this.getList()
    },
  }
</script>

<style scoped>
  section.cate {
    padding: 0 .1rem;
  }

  section.cate section.img {
    padding: .08rem 0;
  }

  section.cate section.img header {
    color: #101010;
    font-size: .14rem;
    text-align: left;
    font-family: PingFangSC-regular, sans-serif;
    display: table;
    margin-bottom: .07rem;
  }

  section.cate section.img header img {
    display: table-cell;
    vertical-align: middle;
    width: .22rem;
    height: .22rem;
    border-radius: 50%;
    margin-right: .05rem;
  }

  section.cate section.img header span {
    display: table-cell;
    vertical-align: middle;
    padding-left: .07rem;
  }

  section.cate section.img div {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
  }

  section.cate section.img div > p {
    font-size: .12rem;
    background: #ffffff;
    width: 24%;
    text-align: center;
    margin-top: .01rem;
    margin-left: .01rem;
    height: .4rem;
    line-height: .4rem;
  }

  /*# sourceMappingURL=allList.css.map */

</style>
