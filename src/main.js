// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously'
import wx from 'weixin-js-sdk';
import './until'
import './directive'
import router from './router'

Vue.use(ElementUI);

Vue.use(VueQriously);


wx.miniProgram.getEnv(function (res) {
  // alert(res.miniprogram)
  // true代表在小程序里
  //false代表在公众号里
  localStorage.isSmall = res.miniprogram
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});
