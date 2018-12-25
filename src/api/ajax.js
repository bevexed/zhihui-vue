const fly = require("flyio")
import {Loading} from 'element-ui';


// 添加请求拦截器
let loading
let jssdkconfig

// localStorage.longitude_latitude = '120,30'
// localStorage.uid = 1212

function makeFormData(obj, form_data) {
  const data = [];
  if (obj instanceof File) {
    data.push({key: "", value: obj});
  } else if (obj instanceof Array) {
    for (let j = 0, len = obj.length; j < len; j++) {
      let arr = makeFormData(obj[j]);
      for (let k = 0, l = arr.length; k < l; k++) {
        let key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
        data.push({key: key, value: arr[k].value})
      }
    }
  } else if (typeof obj == 'object') {
    for (let j in obj) {
      let arr = makeFormData(obj[j]);
      for (let k = 0, l = arr.length; k < l; k++) {
        let key = !!form_data ? j + arr[k].key : "[" + j + "]" + arr[k].key;
        data.push({key: key, value: arr[k].value})
      }
    }
  } else {
    data.push({key: "", value: obj});
  }
  if (!!form_data) {
    // 封装
    for (let i = 0, len = data.length; i < len; i++) {
      form_data.append(data[i].key, data[i].value)
    }
  } else {
    return data;
  }
}

fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  // request.headers['X-Tag'] = 'flyio'
  // request.headers['Content-Type'] = 'application/json'
  // 打印出请求体
  // console.log(request.body)
  // 终止请求
  // let err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  // 全局变量
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  //路由拦截
  // if(localStorage.uid === 'null' || !localStorage.uid || localStorage.uid ===undefined){
  //     location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=8811&do=shop&m=vslai_shop')
  // }
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    // wx.hideLoading()
    loading.close()
    return response
  }, (err) => {
    loading.close()
    // 发生网络错误后会走到这里
    // wx.showToast({
    //     title: '请求超时',
    //     icon: 'none'
    // })
    // return Promise.resolve("ssss")
  }
)

export default function ajax(url, data = {}, type = "POST") {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = fly.get(url)
    } else {
      // 发送post请求
      let form_data = new FormData();
      makeFormData(data, form_data)
      promise = fly.post(url, form_data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败了调用reject()
      reject(error)
    })
  })
}
