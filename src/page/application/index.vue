<template>
  <div v-show="show">
    <header>
      <div class="pay_top">
        <p class="iconfont icon-fanhui comeback" @click="$router.go(-1)"></p>
        <p>商家入驻</p>
      </div>
    </header>
    <section class="table">
      <table>
        <tr>
          <!--<td colspan="2"><a href="https://shop.zhihuimall.com.cn:443/zhihuishop/public/zhuihui-enter.doc" download>请点击此次下载协议，并将写好的协议上传拍照</a></td>-->
          <!--<td colspan="2" v-show="isa === 'a'"><a href="qq browser://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/zhuihui-enter.doc" download>请点击此次下载协议，并将写好的协议上传拍照</a>-->
          <td colspan="2" v-show="isa === 'a'"><a
            href="https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/alipay/bbk.html">请点击此次下载协议，并将写好的协议上传拍照</a>
          <td colspan="2" v-show="isa === 'i'"><a
            href="https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/zhihui-enter.pdf" download>请点击此次下载协议，并将写好的协议上传拍照</a>
          </td>
        </tr>
        <tr>
          <td><label for="shop_name">商店名称：</label></td>
          <td><input type="text" id="shop_name" v-model="shop_name" placeholder="请输入店铺名称"></td>
        </tr>
        <tr>
          <td><label for="master_name">联系人姓名：</label></td>
          <td><input type="text" id="master_name" v-model="name" placeholder="请输入联系人姓名"></td>
        </tr>
        <tr>
          <td><label for="telephone">联系电话:</label></td>
          <td><input type="text" id="telephone" v-model="phone" placeholder="请输入您的电话号码"></td>
        </tr>
        <tr>
          <td><label for="idCard">身份证号码：</label></td>
          <td><input type="text" id="idCard" v-model="id_card" placeholder="请输入您的身份证号码"></td>
        </tr>
        <tr>
          <td><label for="adderss">商店地址：</label></td>
          <td style="display: flex;flex-wrap: wrap;background: white">
            <select name="" id="adderss" @change="getCity(sProvince)" v-model="sProvince">
              <option disabled value="">请选择</option>
              <option v-for="v in province" :value="v.id">{{v.region_name}}</option>
            </select>
            <select name="" id="city" @change="getArea(sCity)" v-model="sCity" v-if="city.length !== 0">
              <!--<option disabled value="">请选择</option>-->
              <option v-for="v in city" :value="v.id">{{v.region_name}}</option>
            </select>
            <select name="" id="area" @change="getCountry(sArea)" v-model="sArea" v-if="area.length !== 0">
              <!--<option disabled value="">请选择</option>-->
              <option v-for="v in area" :value="v.id">{{v.region_name}}</option>
            </select>
            <select name="" id="country" @change="getAgency(sCountry)" v-model="sCountry" v-if="country.length !== 0">
              <!--<option disabled value="">请选择</option>-->
              <option value="" v-for="v in country" :value="v.id">{{v.region_name}}</option>
            </select>
            <select name="" id="agency" v-model="sAgency" v-if="agency.length !== 0">
              <!--<option disabled value="">请选择</option>-->
              <option value="" v-for="v in agency" :value="v.id">{{v.region_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="addd">详细地址：</label></td>
          <td style="background: white"><input type="text" id="addd" v-model="addresses" placeholder="请输入您的详细地址"></td>
        </tr>
        <tr>
          <td>行业分类：</td>
          <td style="display: flex;flex-wrap: wrap;background: white">
            <select name="" id="onecate" v-model="sOneCate" @change="getTwoCate(sOneCate)">
              <!--<option disabled value="">请选择</option>-->
              <option value="" v-for="v in oneCate" :value="v.id">{{v.catename}}</option>
            </select>
            <select name="" id="twocate" v-model="sTwoCate">
              <!--<option disabled value="">请选择</option>-->
              <option value="" v-for="v in twoCate" :value="v.id">{{v.catename}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>身份证照正面：</td>
          <td>
            <input class="weui-uploader__input" type="file" name="file" accept="image/*"
                   multiple="" @change="upLoadImg('front')">
            <img src="../../assets/add.png" alt="" v-if="!localId.front" style="width: .3rem">
            <!--<span @click="chooseImage('front')" v-if="!localId.front">请选择照片</span>-->
            <img :src="`${ImgBaseUrl}${localId.front}`" alt="" v-show="localId.front">
          </td>
        </tr>
        <tr>
          <td>身份证照背面：</td>
          <td>
            <input class="weui-uploader__input" type="file" name="file" accept="image/*"
                   multiple="" @change="upLoadImg('back')">
            <img src="../../assets/add.png" alt="" v-if="!localId.back" style="width: .3rem">
            <!--<span @click="chooseImage('back')" v-if="!localId.back">请选择照片</span>-->
            <img :src="`${ImgBaseUrl}${localId.back}`" alt="" v-show="localId.back"></td>
        </tr>
        <tr>
          <td>营业执照：</td>
          <td>
            <input class="weui-uploader__input" type="file" name="file" accept="image/*"
                   multiple="" @change="upLoadImg('card')">
            <img src="../../assets/add.png" alt="" v-if="!localId.card" style="width: .3rem">
            <!--<span @click="chooseImage('card')" v-if="!localId.card">请选择照片</span>-->
            <img :src="`${ImgBaseUrl}${localId.card}`" alt="" v-show="localId.card">
          </td>
        </tr>
        <tr>
          <td>协议：</td>
          <td>
            <input class="weui-uploader__input" type="file" name="file" accept="image/*"
                   multiple="" @change="upLoadImg('xieyi')">
            <img src="../../assets/add.png" alt="" v-if="!localId.xieyi" style="width: .3rem">
            <!--<span @click="chooseImage('card')" v-if="!localId.card">请选择照片</span>-->
            <img :src="`${ImgBaseUrl}${localId.xieyi}`" alt="" v-show="localId.xieyi">
          </td>
        </tr>
        <tr>
          <td>店铺头像：</td>
          <td>
            <input class="weui-uploader__input" type="file" name="file" accept="image/*"
                   multiple="" @change="upLoadImg('store_images')">
            <img src="../../assets/add.png" alt="" v-if="!localId.store_images" style="width: .3rem">
            <!--<span @click="chooseImage('card')" v-if="!localId.card">请选择照片</span>-->
            <img :src="`${ImgBaseUrl}${localId.store_images}`" alt="" v-show="localId.store_images">
          </td>
        </tr>
      </table>
    </section>
    <footer>
      <el-button type="success" @click="adds()">提交</el-button>
    </footer>
  </div>
</template>

<script>
  import {areaList, Base_url, ImgBaseUrl, oneCate, storeAdd, twoCate, userArealist} from "../../api/index";

  export default {
    name: "application",
    data() {
      return {
        show: true,
        ImgBaseUrl,
        Base_url: Base_url,
        shop_name: '',
        name: '',
        phone: '',
        id_card: '',
        address: '',
        province: [],
        sProvince: '27062',
        city: [],
        sCity: '27118',
        area: [],
        sArea: '27119',
        country: [],
        sCountry: '',
        agency: [],
        sAgency: [],
        addresses: [],
        localId: {
          front: '',
          back: '',
          card: '',
          xieyi: '',
          store_images: ''
        },
        oneCate: '',
        sOneCate: '',
        twoCate: '',
        sTwoCate: '',
        isa: ''
      }
    },
    methods: {
      is() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          this.isa = 'a'
        } else if (isiOS) {
          this.isa = 'i'
        }
      },
      async getWxConfig() {

        let that = this;
        let url = window.location.href;
        console.log(url);

        let result = await wxConfig(url);
        result = JSON.parse(result.data);
        this.jssdkconfig = result;
        console.log(result);
        jssdkconfig = this.jssdkconfig
      },
      upLoadImg(which) {
        console.log(event);
        var formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(event.target.files[0]);
        let url = this.Base_url + '/api/allarea/uploadimg';
        $.ajax({
          url,
          type: 'POST',
          data: formData,
          cache: false,
          contentType: false,    //不可缺
          processData: false,    //不可缺
          success: (res) => {
            console.log(res.data);
            this.localId[which] = res.data;
            // alert(JSON.stringify(this.localId))
          }
        });
      },
      async getProvince() {
        let result = await areaList(1, 0);
        console.log(result);
        this.province = result;
        // this.sProvince = result[0].id
        this.sProvince = 27062;
        this.getCity(this.sProvince)
      },
      async getCity(provinceId) {
        let result = await areaList(2, provinceId);
        if (result === false) {
          this.city = '';
          this.area = '';
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.city = result;
        // this.sCity = result[0].id
        this.sCity = result[0].id;
        this.getArea(result[0].id)
      },
      async getArea(CityId) {
        let result = await areaList(3, CityId);
        if (result === false) {
          this.area = '';
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.area = result;
        this.sArea = result[0].id;
        this.getCountry(result[0].id)
      },
      async getCountry(areaId) {
        let result = await areaList(4, areaId);
        if (result === false) {
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.country = result;
        this.sCountry = result[0].id;
        this.getAgency(result[0].id)
      },
      async getAgency(countryId) {
        let result = await areaList(5, countryId);
        if (result === false) {
          this.agency = '';
          return
        }
        this.sAgency = result[0].id;
        console.log(result);
        this.agency = result
      },

      async getProvince1() {
        let result = await areaList(1, 0);
        console.log(result);
        this.province = result;
        // this.sProvince = result[0].id
        this.sProvince = 27062;
        this.getCity1(this.sProvince)
      },

      async getCity1(provinceId) {
        let result = await areaList(2, provinceId);
        if (result === false) {
          this.city = '';
          this.area = '';
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.city = result;
        // this.sCity = result[0].id
        this.sCity = 27118;
        this.getArea1(this.sCity)
      },
      async getArea1(CityId) {
        let result = await areaList(3, CityId);
        if (result === false) {
          this.area = '';
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.area = result;
        this.sArea = 27119;
        this.getCountry1(this.sArea)
      },
      async getCountry1(areaId) {
        let result = await areaList(4, areaId);
        if (result === false) {
          this.country = '';
          this.agency = '';
          return
        }
        console.log(result);
        this.country = result;
        this.sCountry = 67850;
        this.getAgency1(this.sCountry)
      },
      async getAgency1(countryId) {
        let result = await areaList(5, countryId);
        if (result === false) {
          this.agency = '';
          return
        }
        this.sAgency = result[0].id;
        console.log(result);
        this.agency = result
      },

      async getOneCate() {
        let result = await oneCate();
        if (result.code === 1) {
          console.log(result);
          this.oneCate = result.data;
          this.sOneCate = result.data[0].id;
          this.getTwoCate(this.sOneCate)
        }
      },
      async getTwoCate(p_id) {
        let result = await twoCate(p_id);
        if (result.code === 1) {
          if (result.data === null) {
            this.twoCate = null;
            this.sTwoCate = null;
            return
          }
          console.log(result.data);
          this.twoCate = result.data;
          this.sTwoCate = result.data[0].id
        }
      },
      async adds() {
        let uid = localStorage.uid;
        let shopcate_id = this.sOneCate;
        let shopchildcate_id = this.sTwoCate;
        let province_id = this.sProvince;
        let city_id = this.sCity;
        let area_id = this.sArea;
        let street_id = this.sCountry;
        let community_id = this.sAgency;

        let province = this.province.filter((item) => item.id === province_id)[0].region_name;
        let city = this.city.filter((item) => item.id === city_id)[0].region_name;
        let area = this.area.filter((item) => item.id === area_id)[0].region_name;
        let street;
        if (this.country) {
          street = this.country.filter((item) => item.id === street_id)[0].region_name
        } else {
          street = ""
        }
        let community;
        if (this.agency) {
          community = this.agency.filter((item) => item.id === community_id)[0].region_name
        } else {
          community = ""
        }
        console.log(province);
        console.log(city);
        console.log(area);
        console.log(street);
        console.log(community);
        let address = province + city + area + street + community + this.addresses;
        console.log(address);
        let id_card_positive_photo = this.localId.back;
        let id_card_negative_photo = this.localId.front;
        let business_license = this.localId.card;
        let xieyi = this.localId.xieyi;
        let store_images = this.localId.store_images;
        let {shop_name, phone, name, id_card} = this;

        if (!shop_name) {
          this.$message({
            message: "请填写商铺名称",
            type: 'error',
            duration: 1000
          });
          return
        }
        // let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        // console.log(!uPattern.test(shop_name));
        // if (!uPattern.test(shop_name)) {
        //   this.$message({
        //     message: "商铺名字为4到16位,且不能包含特殊字符",
        //     type: 'error',
        //     duration: 1000
        //   })
        //   return
        // }

        if (!name) {
          this.$message({
            message: "请填写姓名",
            type: 'error',
            duration: 1000
          });
          return
        }

        if (!phone) {
          this.$message({
            message: "请填写手机号",
            type: 'error',
            duration: 1000
          });
          return
        }
        let phoneReg = /^1[0-9]{10}$/;
        if (!phoneReg.test(phone)) {
          this.$message({
            message: "请检查手机号码是否填写正确",
            type: 'error',
            duration: 1000
          });
          return
        }

        if (!id_card) {
          this.$message({
            message: "请填写身份证号码",
            type: 'error',
            duration: 1000
          });
          return
        }
        if (!id_card_positive_photo, !id_card_negative_photo , !business_license, !xieyi, !store_images) {
          console.log(id_card_positive_photo, id_card_negative_photo, business_license, xieyi, store_images);
          this.$message({
            message: "请上传照片",
            type: 'error',
            duration: 1000
          });
          return
        }
        let result = await storeAdd(uid, shopcate_id, shopchildcate_id, province_id, city_id, area_id, street_id, community_id, shop_name, phone, name, address, id_card, id_card_positive_photo, id_card_negative_photo, business_license, xieyi, store_images);
        if (result.code === 1) {
          this.$message({
            message: result.message,
            type: 'success',
            duration: 1000
          });
          window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/dist/index.html?uid=${localStorage.uid}#/index`)
        }
      },
      async come() {
        let result = await userArealist(localStorage.uid);
        if (result.code === 1) {
          this.show = false;
          this.$message({
            message: '正在审核中',
            type: 'error'
          });
          setTimeout(() => {
            window.location.assign(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/dist/index.html?uid=${localStorage.uid}#/index`)
          }, 3000)

        }
      }
    },
    created() {
      this.is();
      this.come();
      this.getProvince1();
      this.getOneCate()
    }
  }
</script>

<style scoped>
  * {
    -webkit-backface-visibility: unset;
  }

  header .pay_top {
    margin: 0;
  }

  section.table table {
    width: 100%;
    border-collapse: collapse;
  }

  section.table table tr {
    border: .01rem solid #cfcfcf;
    border-width: .01rem 0;
  }

  section.table table tr td {

    position: relative;
    padding: .13rem 0 .13rem .12rem;
  }

  section.table table tr td:nth-child(1) {
    width: 30%;
    font-weight: bold;
    font-size: .14rem;
  }

  section.table table tr td:nth-child(2) input {
    background: transparent;
    border: none;
    outline: none;
  }

  section.table table tr td:nth-child(2) input.weui-uploader__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    -moz-opacity: 0.8;
    filter: alpha(opacity=50);
  }

  section.table table tr td:nth-child(2) img {
    position: relative;
    z-index: -999;
    width: 80%;
  }

  section.table table tr td:nth-child(2) select {
    display: block;
    margin: .1rem;
    border-radius: 5px;
    width: 60%;
    border: solid 1px #000;
    padding: .02rem .3rem;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url("../../assets/arrow.png") no-repeat scroll 120px center transparent;
  }

  option {
    text-align: center;
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }

  section.table table tr td:nth-child(2) select::-ms-expand {
    display: none;
    background: none;
  }

  footer {
    text-align: center;
    padding: .3rem;
  }

  /*# sourceMappingURL=apllictation.css.map */

</style>
