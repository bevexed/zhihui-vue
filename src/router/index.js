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
  /*
  *  获取用户 UID
  *  1. 用户只有通过一期项目进入 才会携带 uid
  *  2. 当用户被分享进来时，链接内部不存在 UId 所以 uid 为 null
  * */

  uidExist()
  let mid = getQuery('mid');
  if (mid !== 'null') {  // 一定是被分享进来的
    if (!localStorage.uid) {
      window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=${mid}&do=shop&m=vslai_shop`) // 去拿授权
    }
    next()
  }

  if (!localStorage.uid) {
    window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=${mid}&do=shop&m=vslai_shop`) // 去拿授权
  }
  // window.location.assign(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6ae88e9a0dcb59b1&redirect_uri=${encodeURIComponent('https://shop.zhihuimall.com.cn/zhihuishop/zhihui-master/test/dist/index.html#/index')}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
  next()
});

function getQuery(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

import {existUid,getCode} from "../api";


async function uidExist() {
  await existUid(localStorage.uid).then(
    result => {
      if (result.code === 0) {
        // code 为零表示 uid 不存在
        let mid = getQuery('mid');
        window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=${mid}&do=shop&m=vslai_shop`)
        // // 去拿授权
      }
    }
  ).catch(err => {
      console.log(err);
      let mid = getQuery('mid');
      localStorage.removeItem('uid');
      window.location.assign(`https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=${mid}&do=shop&m=vslai_shop`)
    }
  )
}

export default router
