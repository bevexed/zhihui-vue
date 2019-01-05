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
  if (to.name === 'index' || to.name === 'detail' || to.name === 'scan') {
    /*
    *  获取用户 UID
    *  1. 用户只有通过一期项目进入 才会携带 uid
    *  2. 当用户被分享进来时，链接内部不存在 UId 所以 uid 为 null
    * */
    if (to.name === "index") {
      localStorage.uid = getQuery('uid')
    }

    /*
    *  获取用户 MID
    *  1. 用户只有通过分享链接进入 才会携带 mid
    * */
    let mid = getQuery('mid');

    if (localStorage.uid) {
      /*
      * 先判断 uid 是否存在
      * 1. 用户通过 一期项目 正常登录 通过 localStorage.uid = getQuery('uid') 正常获取 UID
      * 2. 用户通过 点击 自己分享的链接登录 此时 使用的是 系统缓存中的 UID
      * */

      next()
    } else {
      // uid 不存在 ，mid 存在
      if (mid !== 'null') {  // 一定是被分享进来的
        window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=${getQuery('mid')}&do=shop&m=vslai_shop`) // 去拿授权
      } else {
        // 用户手动输入网址 或者其他原因
        window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop`)
      }
    }
  }

  if (!localStorage.uid) {  // 判断uid是否存在
    window.location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&do=shop&m=vslai_shop')
  } else {
    next()
  }
});

function getQuery(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export default router
