import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index/index'
import detail from '@/page/detail/index'
import seconderyClass from '@/page/seconderyClass/index'
import moreRecommendList from '@/page/moreRecommendList/index'
import 'jquery'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      component:index,
      path: '/',
      name:'index'
    },
    {
      component:detail,
      path:'/detail/id/:id/status/:status',
      name:'detail'
    },
    {
      component:seconderyClass,
      path:'/seconderyClass/id/:id/status/:status',
      name:'seconderyClass'
    },
    {
      component:moreRecommendList,
      path:'/moreRecommendList/id/:id/status/:status',
      name:'moreRecommendList'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由拦截
  // if(localStorage.uid === 'null' || !localStorage.uid || localStorage.uid ===undefined){
  //     location.assign('https://shop.zhihuimall.com.cn/app/index.php?i=1604&c=entry&mid=8811&do=shop&m=vslai_shop')
  // }

  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
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
