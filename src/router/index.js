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
import 'jquery'

Vue.use(Router)

const router = new Router({
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
      path: '/twoAllList',
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
      path: '/pay/rebat/:rebat/order_id/:order_id',
      name: 'pay'
    },
    {
      path:'/',
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由拦截
  // if(localStorage.uid === 'null' || !localStorage.uid || localStorage.uid ===undefined){
  //     location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=8811&do=shop&m=vslai_shop')
  // }

  if (!localStorage.uid) {  // 判断该路由是否需要登录权限
    if (1) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router
