<template>
  <div>
    <section class="detail_head">
      <p class="iconfont icon-fanhui back cursor_pointer" @click="back()"></p>
      <img v-if="detail.store_images" :src="`${baseImgUrl}${detail.store_images}`" alt="">
    </section>

    <section class="address">
      <header v-if="detail">
        {{detail.shop_name}}
      </header>
      <footer>
        <i class="iconfont icon-dingwei"></i>
        <div class="position_detail" @click="toMap()">
          <p>
            {{detail.address}}
          </p>
          <p class="distance dollar">
            距离您{{detail.distance}}千米
          </p>
        </div>
        <a :href="`tel:${detail.phone}`">
          <img src="../../assets/phone.svg" alt="">
        </a>
      </footer>
    </section>

    <section class="booking">
      <header v-if="detail.sold_num">
        预订
        <span style="margin-right: .1rem">
               <i class="el-icon-circle-check" style="color: green;font-size: .16rem"> </i> {{detail.sold_num}}人订过
            </span>
      </header>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class="{'active':index === dataSelect}" v-for="(i,index) in detail.week"
               @click="selectDate(index,i)">
            {{i.slice(-3)}}
            <p>{{i.slice(0,-3)}}</p>
          </div>
        </div>
      </div>
      <footer class="species">
            <span v-for="(v,i) in timeSel" @click="filterTime(v,i)" :class="{'active':i === selected}">
               {{v === ''? '不限时' : v}}
            </span>
      </footer>
    </section>

    <section class="booking_money">
      <ul>
        <li v-for="(v,i) in detail.shop_goods" :key="v.id" @click="showDetail(i)">
          <img style="height: .4rem" :src="`${baseImgUrl}${v.meal_images}`" alt="">
          <div>
            [{{v.rule === ''? '不限时' : v.rule}}] {{v.meal_name}}
            <span>￥{{v.amount_money}}  <b style="color: red;margin-left: .1rem;font-size: .14rem">满{{v.full}}减{{v.reduce}}</b></span>
          </div>
          <!--<a @click="alert = true">-->
          <span class="button"
                @click.stop="booking(v.store_id,v.id,v.rule,v.full+','+v.reduce,v.amount_money,detail.discount)">
            预订
          </span>

          <el-collapse-transition>
            <section v-show="show3 === i" style="border-top: .01rem solid #e6e6e6">
              <p style="float:right;font-weight: lighter;font-size: .12rem;color: #409eff">商品详情</p>
              <p v-html="v.details"></p>
            </section>
          </el-collapse-transition>
        </li>
        <li style="text-align: center">
          <!--更多 <i class="el-icon-arrow-down"></i>-->
        </li>
      </ul>
    </section>

    <section class="bus_information">
      <header>
        商户信息
        <!--<i class="el-icon-arrow-right"></i>-->
      </header>
      <footer v-html="detail.content">

      </footer>
    </section>

    <el-dialog title="请绑定手机号码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upPhone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {ImgBaseUrl, allShopGoodList, memberPhone, addmemberphone, wxConfig} from '../../api'
  import wx from 'weixin-js-sdk';

  export default {
    name: "detail",
    data() {
      return {
        dataSelect: -1,
        baseImgUrl: ImgBaseUrl,
        show3: 0,
        selected: -1,
        alert: false,
        detail: {},
        dialogFormVisible: false,
        formLabelWidth: '.6rem',
        form: {
          phone: '',
        },
        book: {}
      }
    },
    computed: {
      timeSel() {
        if (this.detail.shop_goods_time) {
          let arr = []
          arr = this.detail.shop_goods_time.map(item => item.rule)
          arr = this.$removeSameItem(arr)
          return arr
        }
      }
    },
    methods: {
      share() {
        this.$getWxConfig()
        let that = this
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: that.detail.shop_name, // 分享标题
            desc: that.detail.address, // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: that.detail.store_images, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
             this.$message({
               message:"分享成功",
               type:'success'
             })
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      },
      toMap() {
        let that = this
        wx.openLocation({
          latitude: that.detail.longitude_latitude.split(',')[1] - 0, // 纬度，浮点数，范围为90 ~ -90
          longitude: that.detail.longitude_latitude.split(',')[0] - 0, // 经度，浮点数，范围为180 ~ -180。
          name: that.detail.shop_name, // 位置名
          address: that.detail.address, // 地址详情说明
          scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      },
      selectDate(index, i) {
        this.dataSelect = index
        localStorage.preset_time = i
        console.log(localStorage.preset_time);
      },
      back() {
        history.go(-1)
      },
      showDetail(i) {
        this.show3 = i
      },
      async filterTime(v, i) {
        this.selected = i
        await this.getStoreList()
        if (this.detail.shop_goods) {
          this.detail.shop_goods = this.detail.shop_goods.filter(item => item.rule === v)
          console.log(this.detail.shop_goods);
        }

      },
      async getStoreList() {
        let result = await allShopGoodList(this.$route.params.id, localStorage.longitude_latitude, this.$route.params.status)
        if (result.code === 0) {
          alert(result.message)
        }
        if (result.code === 1) {
          console.log(result.data)
          this.detail = result.data
        }
      },
      async booking(...arr) {
        if (localStorage.preset_time === 'null') {
          this.$message({
            message: '请选择日期',
            type: 'error'
          })
          return
        }
        let result = await memberPhone(localStorage.uid)
        console.log(arr);
        localStorage.arr = JSON.stringify(arr)
        if (result.code === 1) {
          this.$router.push({
            name: 'booking',
            params: {store_id: this.$route.params.id, status: this.$route.params.status}
          })
          console.log(result);
        } else {
          this.dialogFormVisible = true
        }
      },
      async upPhone() {
        if (!this.form.phone) {
          this.$message({
            message: '请输入正确的手机号码',
            type: 'error',
          })
          return
        }
        let result = await addmemberphone(localStorage.uid, this.form.phone)
        if (result.code === 1) {
          this.dialogFormVisible = false
          this.$message({
            message: result.message,
            type: 'success',
          })
        } else {
          this.$message({
            message: result.message,
            type: 'error',
          })
        }

        console.log(result);
      },
    },

    mounted() {
      localStorage.arr = null
      localStorage.preset_time = null

      var mySwiper = new Swiper('.swiper-container', {
        width: innerWidth,
        slidesPerView: 6,
        freeMode: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
      })
      this.getStoreList()
      this.share()
    },

  }
</script>

<style scoped>
  html, body {
    position: relative;
  }

  ul li {
    list-style: none;
  }

  .detail_head {
    position: relative;
    width: 100%;
    height: 1.6rem;
    overflow: hidden;
  }

  .detail_head > img {
    position: absolute;
    width: 100%;
  }

  .detail_head > .back {
    position: absolute;
    top: .09rem;
    left: .14rem;
    z-index: 1;
  }

  .address {
    width: 100%;
    height: 1rem;
    background: #F0F0F0;
    margin-top: .18rem;
    padding: .11rem .24rem .17rem .14rem;
    box-sizing: border-box;

  }

  .address > header {
    font-weight: bold;
    font-size: .16rem;
    color: #101010;
  }

  .address > footer {
    margin-top: .08rem;
    font-size: .14rem;
  }

  .address > footer > i {
    float: left;
    font-size: .14rem;
    margin-top: .03rem;
  }

  .address > footer > div.position_detail {
    font-size: .14rem;
    float: left;
    margin-left: .04rem;
  }

  .address img {
    width: .24rem;
    float: right;
  }

  .address > footer > div > p.distance {
    margin-top: .08rem;
    font-size: .1rem;
  }

  .booking {
    width: 100%;
    /*height: 1.3rem;*/
    background: #F2F2F2;
    margin-top: .11rem;
  }

  .booking > header {
    padding: .11rem 0 .09rem .11rem;
    font-size: .14rem;
    border-bottom: .01rem solid #E6E6E6;
  }

  .booking > header > span {
    float: right;
    font-size: .1rem;
  }

  .swiper-container {
    margin-top: .06rem;
    width: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: .12rem;
    padding-top: .1rem;
    padding-bottom: .1rem;
  }

  footer.species {
    padding: .06rem .12rem;

  }

  .species > span {
    display: inline-block;
    padding: .04rem .02rem;
    text-align: center;
    background: #FFFFFF;
    margin-right: .08rem;
    font-size: .12rem;
    margin-top: .1rem;
  }

  .species > span:last-child {
    margin-right: 0;
  }

  .booking_money {
    margin-top: .09rem;
    width: 100%;
    background: #F2F2F2;
  }

  .booking_money li {
    padding: .11rem 0.11rem .06rem;
    border-bottom: .01rem solid #E6E6E6;
  }

  .booking_money li:last-child {
    padding: .11rem 0;
    border: none;
  }

  .booking_money div {
    display: inline-block;
  }

  .booking_money span {
    display: block;
    color: red;
    font-weight: bolder;
    font-size: .18rem;
  }

  .booking_money .button {
    float: right;
    display: inline-block;
    width: .57rem;
    height: .24rem;
    line-height: .24rem;
    text-align: center;
    background: #FFFFFF;
    text-decoration: none;
    border-radius: .04rem;
    font-size: .14rem;
    color: #000000;
  }

  .bus_information {
    margin-top: .09rem;
    width: 100%;
    background: #F2F2F2;
  }

  .bus_information header {
    padding: .07rem .11rem;
    border-bottom: .01rem solid #E6E6E6;
  }

  .bus_information header i {
    float: right;
  }

  .bus_information footer {
    padding: .02rem .07rem;
  }

  .bus_information footer img {
    /*width: .1rem;*/
  }

  .background {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(4, 4, 4, .2);
  }

  .alert {
    position: absolute;
    bottom: -0.1rem;
    width: 100%;
    padding: 0 .13rem .2rem;
    box-sizing: border-box;
    z-index: 1;
    max-height: 50rem;
    background: white;
    font-size: .14rem;
    color: #101010;
  }

  .v_header {
    padding: .11rem 0;
    border-bottom: .01rem solid #BBBBBB;
  }

  .v_header span {
    float: right;
  }

  .alert footer div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .alert footer div button {
    margin-top: .06rem;
    border: .01rem solid #BBBBBB;
    font-size: .14rem;
    width: .8rem;
    height: .3rem;
    line-height: .3rem;
    background: white;
    border-radius: .04rem;
  }

  .active {
    background: #ff481f !important;
    border-radius: .04rem;
    color: white !important;
  }
</style>
