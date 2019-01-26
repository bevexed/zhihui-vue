import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index/index'
import detail from '@/page/detail/index'
import seconderyClass from '@/page/seconderyClass/index'
import moreRecommendList from '@/page/moreRecommendList/index'
import shopSearch from '@/page/shopSearch/index'
import shopSearchResult from '@/page/shopSearchResult/index'
import application from '@/page/application/index'
import selectAddress from '@/page/selectAddress/index'
import allList from '@/page/allList/index'
import twoAllList from '@/page/twoAllList/index'
import storeList from '@/page/storeList/index'
import todaySale from '@/page/todaySale/index'
import sale from '@/page/sale/index'
import busySale from '@/page/busySale/index'
import booking from '@/page/booking/index'
import pay from '@/page/pay/index'
import aliPay from '@/page/aliPay/index'
import evaluation from '@/page/evaluation/index'
import toEvaluation from '@/page/toEvaluation/index'
import paySuccess from '@/page/paySuccess/index'
import scan from '@/page/scan/index'
import 'jquery'

Vue.use(Router);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // return savedPosition
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 200)
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      component: index,
      path: '/index',
      name: 'index',
    },
    {
      component: detail,
      path: '/detail/id/:id/status/:status',
      name: 'detail'
    },
    {
      component: seconderyClass,
      path: '/seconderyClass/id/:id/status/:status',
      name: 'seconderyClass'
    },
    {
      component: moreRecommendList,
      path: '/moreRecommendList/id/:id/status/:status',
      name: 'moreRecommendList'
    },
    {
      component: shopSearch,
      path: '/shopSearch',
      name: 'shopSearch'
    },
    {
      component: shopSearchResult,
      path: '/shopSearchResult/search_key/:search_key',
      name: 'shopSearchResult'
    },
    {
      component: application,
      path: '/application',
      name: 'application'
    },
    {
      component: selectAddress,
      path: '/selectAddress',
      name: 'selectAddress'
    },
    {
      component: allList,
      path: '/allList',
      name: 'allList'
    },
    {
      component: twoAllList,
      path: '/twoAllList/id/:id',
      name: 'twoAllList'
    },
    {
      component: storeList,
      path: '/storeList/id/:id/status/:status',
      name: 'storeList'
    },
    {
      component: todaySale,
      path: '/todaySale/id/:id/status/:status',
      name: 'todaySale'
    },
    {
      component: sale,
      path: '/sale/id/:id/status/:status',
      name: 'sale'
    },
    {
      component: busySale,
      path: '/busySale/id/:id/status/:status',
      name: 'busySale'
    },
    {
      component: booking,
      path: '/booking/store_id/:store_id/status/:status',
      name: 'booking'
    },
    {
      component: pay,
      path: '/pay/order_id/:order_id',
      name: 'pay'
    },
    {
      component: aliPay,
      path: '/aliPay/realprice/:realprice/ordernumber/:ordernumber',
      name: 'aliPay'
    },
    {
      component: paySuccess,
      path: '/paySuccess',
      name: 'paySuccess'
    },
    {
      component: evaluation,
      path: '/evaluation/store_id/:store_id',
      name: 'evaluation'
    },
    {
      component: toEvaluation,
      path: '/toevaluation/order_id/:order_id/store_id/:store_id',
      name: 'toevaluation'
    },
    {
      component: scan,
      path: '/scan/sjid/:sjid',
      name: 'scan'
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 获取 分享者 ID
  console.log(to);
  console.log(from);
  let mid = to.query.mid
  // 获取 code
  let code = getQuery('code');
  if (!localStorage.uid) {
    // 获取 Code
    if (!code) {
      window.location.assign(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6ae88e9a0dcb59b1&redirect_uri=${encodeURIComponent(`https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/test/dist/index.html#${to.fullPath}`)}&response_type=code&scope=snsapi_userinfo&state=${mid}#wechat_redirect`)
    }
    // 获取 UID
    getUid(code, mid).then(
      res => {
        localStorage.uid = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }

  // 检测 UID 是否存在
  existUid(localStorage.uid).then(
    result => {
      if (result.code === 0) {
        // UID 不存在时 移除 UID 重载页面
        localStorage.removeItem('uid');
        window.location.reload()
      }
    }, err => {
      localStorage.removeItem('uid');
    }
  );
  next()

});


// 获取 query
// query 不存在时返回 null ，当 null 存入 localStorage 中后 会转成 字符串null
function getQuery(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


import {existUid, getUid} from "../api";


export default router
