import Vue from 'vue'
import Router from 'vue-router'
import EnjoyList from '@/components/List/enjoyList'
// import EnjoyDetail from '@/components/List/enjoyDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'enjoylist'}},
    {path: '/enjoylist', name: 'enjoylist', component: EnjoyList, meta: {title: '赳赳乐享'}}
    // {path: '/enjoydetail', name: 'enjoydetail', component: EnjoyDetail, meta: {title: '活动详情'}}
  ]
})
