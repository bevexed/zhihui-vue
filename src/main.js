// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import wx from 'weixin-js-sdk';

wx.miniProgram.getEnv(function (res) {
  // alert(res.miniprogram)
  // true代表在小程序里
  //false代表在公众号里
  localStorage.isSmall = res.miniprogram
})
import './until'

let vConsole = new VConsole();
console.log('Hello world');

import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
})
