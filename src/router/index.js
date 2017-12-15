import Vue from 'vue'
import Router from 'vue-router'
import EnjoyList from '@/components/List/enjoyList'
import EnjoyDetail from '@/components/List/enjoyDetail'

Vue.use(Router)

export default new Router({
  // beforeRouteLeave (to, from, next) {
  //   let getScrollTop = () => {
  //     let scrollTop = 0
  //     if (document.documentElement && document.documentElement.scrollTop) {
  //       scrollTop = document.documentElement.scrollTop
  //     } else if (document.body) {
  //       scrollTop = document.body.scrollTop
  //     }
  //     return scrollTop
  //   }
  //   let scrollTop = getScrollTop()
  //   window.sessionStorage.setItem('scrollTop', scrollTop) // 离开路由时把位置存起来
  //   next(false)
  // },
  routes: [
    {path: '/', redirect: {name: 'enjoylist'}},
    {path: '/enjoylist', name: 'enjoylist', component: EnjoyList},
    {path: '/enjoydetail', name: 'enjoydetail', component: EnjoyDetail}
  ]
})
