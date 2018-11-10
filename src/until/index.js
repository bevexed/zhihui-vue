import Vue from "vue";

Vue.prototype.$GetQueryString = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

Vue.prototype.$getRequest = function () {
  let url = window.location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

Vue.prototype.$isAndroid = function () {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    alert("android");
  } else if (isiOS) {
    alert("ios");
  } else {
  }
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    alert("微信");
  } else {
    alert("非微信");
  }
}

Vue.prototype.$removeSameItem = function (arr) {
  return Array.from(new Set(arr))
}
